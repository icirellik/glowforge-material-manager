import { syncronizeMaterials } from './material.sync';
import { createEmptyMaterial } from '../lib/materialHelpers';
import { hashTitle } from '../lib/utils';
import {
  createMaterial,
  removeCloudMaterial,
  sendCloudMaterial,
} from './material';
import {
  storeGlowforgeMaterials,
  storeRawMaterials,
  StorageLocal,
} from '../lib/chromeWrappers';
import { toFullMaterial } from './materialConversion';
import { decodeCloudMaterial } from './materialCloudFormat';
import type { TinyMaterial } from './materialTiny';
import { encodeCloudMaterial } from './materialCloudFormat';
import { editorMaterials } from './testing/corpus';
import * as pako from 'pako';

vi.mock('../lib/crypto', async (importOriginal) => {
  const original = await importOriginal<typeof import('../lib/crypto')>();
  let counter = 0;
  const hashes: Map<string, string> = new Map();
  return {
    ...original,
    sha1: vi.fn(async (data: string) => {
      const message = JSON.stringify(data);
      if (hashes.has(message)) {
        return hashes.get(message)!;
      }
      counter += 1;
      hashes.set(message, `${counter}`);
      return Promise.resolve(`${counter}`);
    }),
  };
});

describe('Synchronization', () => {
  let testLocalData: StorageLocal = {
    materials: [],
    rawMaterials: [],
  };
  let testSyncData: { [key: string]: string } = {};
  let localWrites = 0;

  vi.stubGlobal('chrome', {
    runtime: {
      getURL: (itemName: string) => itemName,
    },
    storage: {
      local: {
        get: (key: keyof StorageLocal, cb: (items: unknown) => void) => {
          if (key) {
            cb(testLocalData![key]);
            return;
          }
          cb(testLocalData);
        },
        set: (data: Partial<StorageLocal>, cb: () => void) => {
          localWrites += 1;
          testLocalData = {
            ...testLocalData,
            ...data,
          };
          cb();
        },
      },
      sync: {
        get: (key: string, cb: (items: object) => void) => {
          cb(testSyncData);
        },
        set: (data: { [key: string]: string }, cb: () => void) => {
          testSyncData = {
            ...testSyncData,
            ...data,
          };
          cb();
        },
        remove: (key: string, cb: () => void) => {
          delete testSyncData[key];
          cb();
        },
        getBytesInUse: (key: null, cb: (bytes: number) => void) => {
          cb(-1);
        },
      },
    },
  });

  beforeEach(() => {
    testLocalData = {
      materials: [],
      rawMaterials: [],
    };
    testSyncData = {};
  });

  it('Upload to Cloud', async () => {
    const pluginMaterial = createEmptyMaterial();
    pluginMaterial.thickName = 'Thin';
    pluginMaterial.name = 'Birch';
    pluginMaterial.thickness = 1;

    // Create empty local data.
    testLocalData.rawMaterials!.push(pluginMaterial);

    const titleHash = await hashTitle(pluginMaterial);

    // Test
    await sendCloudMaterial(pluginMaterial);

    expect(Object.keys(testSyncData).length).toEqual(1);
    expect(Object.keys(testSyncData)).toEqual([titleHash]);
  });

  it('Upload to Cloud - Sync Disabled', async () => {
    const pluginMaterial = createEmptyMaterial();
    pluginMaterial.thickName = 'Thin';
    pluginMaterial.name = 'Birch';
    pluginMaterial.thickness = 1;
    pluginMaterial.sync = false;

    // Create local data.
    testLocalData.rawMaterials!.push(pluginMaterial);

    // Test
    await sendCloudMaterial(pluginMaterial);

    expect(Object.keys(testSyncData).length).toEqual(0);
    expect(Object.keys(testSyncData)).toEqual([]);
  });

  it('Remove from Cloud', async () => {
    const pluginMaterial = createEmptyMaterial();
    pluginMaterial.thickName = 'Thin';
    pluginMaterial.name = 'Birch';
    pluginMaterial.thickness = 1;

    // Create local data.
    testLocalData.rawMaterials!.push(pluginMaterial);

    await sendCloudMaterial(pluginMaterial);

    // Test
    await removeCloudMaterial(pluginMaterial);

    expect(Object.keys(testSyncData).length).toEqual(0);
    expect(Object.keys(testSyncData)).toEqual([]);
  });

  it('1 Local, 0 Cloud = Local Stays', async () => {
    const pluginMaterial = createEmptyMaterial();
    pluginMaterial.thickName = 'Thin';
    pluginMaterial.name = 'Birch';
    pluginMaterial.thickness = 1;

    const glowforgeMaterial = createMaterial(pluginMaterial, 1);

    // Create local data.
    await storeGlowforgeMaterials([glowforgeMaterial]);
    await storeRawMaterials([pluginMaterial]);

    // Test
    await syncronizeMaterials();

    expect(Object.keys(testSyncData).length).toEqual(0);
    expect(Object.keys(testSyncData)).toEqual([]);
    expect(Object.keys(testLocalData.rawMaterials!).length).toEqual(1);
  });

  it('1 Local, 0 Cloud = Remove Local', async () => {
    const pluginMaterial = createEmptyMaterial();
    pluginMaterial.thickName = 'Thin';
    pluginMaterial.name = 'Birch';
    pluginMaterial.thickness = 1;

    const glowforgeMaterial = createMaterial(pluginMaterial, 1);

    // Create local data.
    await storeGlowforgeMaterials([glowforgeMaterial]);
    await storeRawMaterials([pluginMaterial]);

    // Test
    await syncronizeMaterials(true);

    expect(Object.keys(testSyncData).length).toEqual(0);
    expect(Object.keys(testSyncData)).toEqual([]);
    expect(Object.keys(testLocalData.rawMaterials!).length).toEqual(0);
  });

  it('0 Local, 1 Cloud = Add Local', async () => {
    // Setup
    const material = createEmptyMaterial();
    material.thickName = 'Thin';
    material.name = 'Birch';
    material.thickness = 1;

    const titleHash = await hashTitle(material);

    await sendCloudMaterial(material);

    // Test
    await syncronizeMaterials();

    expect(Object.keys(testSyncData).length).toEqual(1);
    expect(Object.keys(testSyncData)).toEqual([titleHash]);
    expect(testLocalData.rawMaterials!.length).toEqual(1);
    expect(testLocalData.materials!.map((m) => m.id)).toEqual([
      `Custom:${titleHash.substring(0, 7)}`,
    ]);
  });

  it('1 Local, 1 Cloud, Same Ids, Same Data = Do Nothing', async () => {
    const pluginMaterial = createEmptyMaterial();
    pluginMaterial.thickName = 'Thin';
    pluginMaterial.name = 'Birch';
    pluginMaterial.thickness = 1;

    const glowforgeMaterial = createMaterial(pluginMaterial, 1);

    // Create local data.
    await storeGlowforgeMaterials([glowforgeMaterial]);
    await storeRawMaterials([pluginMaterial]);

    const titleHash = await hashTitle(pluginMaterial);

    // Create cloud data.
    await sendCloudMaterial(pluginMaterial);

    // Test
    await syncronizeMaterials();

    expect(Object.keys(testSyncData).length).toEqual(1);
    expect(Object.keys(testSyncData)).toEqual([titleHash]);
    expect(testLocalData.rawMaterials!.length).toEqual(1);
  });

  it('1 Local, 1 Cloud, Same Ids, Different Data = Update', async () => {
    const pluginMaterial = createEmptyMaterial();
    pluginMaterial.thickName = 'Thin';
    pluginMaterial.name = 'Birch';
    pluginMaterial.thickness = 1;

    const pluginMaterialModified = createEmptyMaterial();
    pluginMaterialModified.thickName = 'Thin';
    pluginMaterialModified.name = 'Birch';
    pluginMaterialModified.thickness = 2;

    const glowforgeMaterial = createMaterial(pluginMaterial, 1);

    // Create local data.
    await storeGlowforgeMaterials([glowforgeMaterial]);
    await storeRawMaterials([pluginMaterial]);

    const titleHash = await hashTitle(pluginMaterial);

    // Create cloud data.
    await sendCloudMaterial(pluginMaterialModified);

    // Test
    await syncronizeMaterials();

    expect(Object.keys(testSyncData).length).toEqual(1);
    expect(Object.keys(testSyncData)).toEqual([titleHash]);
    expect(testLocalData.rawMaterials!.length).toEqual(1);
    expect(testLocalData.materials!.map((m) => m.id)).toEqual([
      `Custom:${titleHash.substring(0, 7)}`,
    ]);
  });

  it('1 Local, 1 Cloud, Same Ids, Different Data, Local Sync Disabled = No Change', async () => {
    const pluginMaterial = createEmptyMaterial();
    pluginMaterial.thickName = 'Thin';
    pluginMaterial.name = 'Birch';
    pluginMaterial.thickness = 1;
    pluginMaterial.sync = false;

    const pluginMaterialModified = createEmptyMaterial();
    pluginMaterialModified.thickName = 'Thin';
    pluginMaterialModified.name = 'Birch';
    pluginMaterialModified.thickness = 2;

    const glowforgeMaterial = createMaterial(pluginMaterial, 1);

    // Create local data.
    await storeGlowforgeMaterials([glowforgeMaterial]);
    await storeRawMaterials([pluginMaterial]);

    const titleHash = await hashTitle(pluginMaterial);

    // Create cloud data.
    await sendCloudMaterial(pluginMaterialModified);

    // Test
    await syncronizeMaterials();

    // Verify cloud data.
    expect(Object.keys(testSyncData).length).toEqual(1);
    expect(Object.keys(testSyncData)).toEqual([titleHash]);

    // Verify local data.
    const testLocalDataTitleHashesPromises = testLocalData.rawMaterials!.map(
      async (pluginMaterial) => hashTitle(pluginMaterial),
    );
    const testLocalDataTitleHashes = await Promise.all(
      testLocalDataTitleHashesPromises,
    );
    expect(testLocalData.rawMaterials!.length).toEqual(1);
    expect(testLocalDataTitleHashes).toEqual(['1']);
    expect(testLocalDataTitleHashes).toEqual(Object.keys(testSyncData));

    // Verify different property.
    expect(testLocalData.rawMaterials![0].thickness).toEqual(1);
    const decoded = decodeCloudMaterial(testSyncData['1']);
    const remoteMaterial = toFullMaterial(
      (decoded.status === 'ok' && decoded.material) as TinyMaterial,
    );
    expect(remoteMaterial.thickness).toEqual(2);
  });

  describe('Formats', () => {
    // Distinct titles, as the cloud has one material per title.
    const tinies = editorMaterials(3).map((tiny, i) => ({
      ...tiny,
      n: `${tiny.n} ${i}`,
    }));
    const keyFor = (tiny: TinyMaterial) => hashTitle(toFullMaterial(tiny));

    it('reads legacy and new values, and skips newer ones', async () => {
      testSyncData = {
        [await keyFor(tinies[0])]: pako.deflate(JSON.stringify(tinies[0]), {
          to: 'string',
        }),
        [await keyFor(tinies[1])]: encodeCloudMaterial(tinies[1]),
        newer: 'Zfrom a newer version',
      };

      expect(await syncronizeMaterials()).toBe(true);
      expect(testLocalData.rawMaterials!.map((m) => m.name)).toEqual([
        tinies[0].n,
        tinies[1].n,
      ]);
      // Nothing left to change.
      expect(await syncronizeMaterials()).toBe(false);
    });

    it('keeps a material whose cloud value is from a newer version', async () => {
      const pluginMaterial = toFullMaterial(tinies[2]);
      await storeGlowforgeMaterials([createMaterial(pluginMaterial, 1)]);
      await storeRawMaterials([pluginMaterial]);
      testSyncData = { [await hashTitle(pluginMaterial)]: 'Znewer' };

      expect(await syncronizeMaterials(true)).toBe(false);
      expect(testLocalData.rawMaterials).toEqual([pluginMaterial]);
    });

    it('adds every new cloud material in one write', async () => {
      const many = editorMaterials(60).filter(
        (tiny, i, all) =>
          all.findIndex((other) => other.n === tiny.n && other.t === tiny.t) ===
          i,
      );
      for (const tiny of many) {
        testSyncData[await keyFor(tiny)] = encodeCloudMaterial(tiny);
      }
      localWrites = 0;

      expect(await syncronizeMaterials()).toBe(true);
      expect(testLocalData.rawMaterials).toHaveLength(many.length);
      // The Glowforge materials and the raw materials.
      expect(localWrites).toBe(2);
    });
  });
});
