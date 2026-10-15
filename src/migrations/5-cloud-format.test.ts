import * as pako from 'pako';
import { migration5 } from './5-cloud-format';
import {
  decodeCloudMaterial,
  encodeCloudMaterial,
} from '../material/materialCloudFormat';
import { editorMaterials } from '../material/testing/corpus';

type Items = { [key: string]: unknown };

const legacy = (material: unknown) =>
  pako.deflate(JSON.stringify(material), { to: 'string' });

describe("migration '#5'", () => {
  let cloud: Items = {};
  let localWrites = 0;
  let setCalls: Items[] = [];
  let removeCalls = 0;
  let lastError: { message: string } | undefined;
  // Runs between the snapshot and the write, like another computer would.
  let beforeRead: (() => void) | null = null;

  vi.stubGlobal('chrome', {
    runtime: {
      get lastError() {
        return lastError;
      },
    },
    storage: {
      local: {
        set: () => {
          localWrites += 1;
        },
      },
      sync: {
        get: (keys: string[] | null, cb: (items: Items) => void) => {
          if (keys === null) {
            cb({ ...cloud });
            return;
          }
          beforeRead?.();
          cb(
            Object.fromEntries(
              keys.filter((k) => k in cloud).map((k) => [k, cloud[k]]),
            ),
          );
        },
        set: (items: Items, cb: () => void) => {
          setCalls.push(items);
          if (!lastError) cloud = { ...cloud, ...items };
          cb();
        },
        remove: () => {
          removeCalls += 1;
        },
      },
    },
  });

  const materials = editorMaterials(6);

  beforeEach(() => {
    cloud = {
      // Legacy, from this computer or others, synced or not here.
      a: legacy(materials[0]),
      b: legacy(materials[1]),
      c: legacy(materials[2]),
      // Already rewritten.
      d: encodeCloudMaterial(materials[3]),
      // From a newer version.
      e: 'Zsomething newer',
      // Legacy, but broken.
      f: `${legacy(materials[4]).slice(0, -2)}xx`,
    };
    localWrites = 0;
    setCalls = [];
    removeCalls = 0;
    lastError = undefined;
    beforeRead = null;
  });

  it('rewrites legacy values in one write, from the cloud copies', async () => {
    const before = { ...cloud };
    expect(await migration5()).toBe(true);

    expect(setCalls).toHaveLength(1);
    expect(Object.keys(setCalls[0]).sort()).toEqual(['a', 'b', 'c']);
    expect(removeCalls).toBe(0);
    expect(localWrites).toBe(0);
    for (const [key, index] of [
      ['a', 0],
      ['b', 1],
      ['c', 2],
    ] as const) {
      expect((cloud[key] as string)[0]).toBe('A');
      expect(decodeCloudMaterial(cloud[key])).toEqual({
        status: 'ok',
        format: 'packed-1',
        material: materials[index],
      });
      expect((cloud[key] as string).length).toBeLessThan(
        (before[key] as string).length / 2,
      );
    }
    // The rest are left alone.
    expect(cloud.d).toBe(before.d);
    expect(cloud.e).toBe(before.e);
    expect(cloud.f).toBe(before.f);
  });

  it('does nothing the second time', async () => {
    await migration5();
    setCalls = [];
    expect(await migration5()).toBe(false);
    expect(setCalls).toHaveLength(0);
  });

  it('leaves values that changed after it read them', async () => {
    const edited = encodeCloudMaterial({ ...materials[1], n: 'Edited' });
    beforeRead = () => {
      cloud.b = edited;
    };
    expect(await migration5()).toBe(true);
    expect(Object.keys(setCalls[0]).sort()).toEqual(['a', 'c']);
    expect(cloud.b).toBe(edited);
  });

  it('rejects when Chrome refuses the write, and changes nothing', async () => {
    const before = { ...cloud };
    lastError = { message: 'QUOTA_BYTES quota exceeded' };
    await expect(migration5()).rejects.toThrow('QUOTA_BYTES');
    expect(cloud).toEqual(before);
  });
});
