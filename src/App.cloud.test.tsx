import App from './App';
import { createMaterial } from './material/material';
import { syncronizeMaterials } from './material/material.sync';
import { createEmptyMaterial } from './lib/materialHelpers';
import { hashTitle } from './lib/utils';
import type { PluginMaterial } from './material/materialPlugin';
import { encodeCloudMaterial } from './material/materialCloudFormat';
import { toTinyMaterial } from './material/materialConversion';

describe('Editing a synced material', () => {
  let local: { [key: string]: unknown } = {};
  let cloud: { [key: string]: unknown } = {};
  let refuse = false;
  let lastError: { message: string } | undefined;

  beforeEach(() => {
    vi.useFakeTimers();
    local = {};
    cloud = {};
    refuse = false;
    lastError = undefined;
    vi.stubGlobal('chrome', {
      runtime: {
        getURL: (name: string) => name,
        get lastError() {
          return lastError;
        },
      },
      storage: {
        local: {
          get: (keys: unknown, cb: (items: object) => void) => cb({ ...local }),
          set: (items: object, cb: () => void) => {
            local = { ...local, ...items };
            cb();
          },
        },
        sync: {
          get: (keys: unknown, cb: (items: object) => void) => cb({ ...cloud }),
          // Like Chrome, refuses a write that would go over 512 items.
          set: (items: object, cb: () => void) => {
            const next = { ...cloud, ...items };
            if (refuse) {
              lastError = { message: 'QUOTA_BYTES quota exceeded' };
            } else if (Object.keys(next).length > 512) {
              lastError = { message: 'MAX_ITEMS quota exceeded' };
            } else {
              cloud = next;
            }
            cb();
            lastError = undefined;
          },
          remove: (key: string, cb: () => void) => {
            delete cloud[key];
            cb();
          },
        },
      },
      tabs: {
        query: (query: unknown, cb: (tabs: object[]) => void) => cb([]),
      },
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  function material(name: string, thickness: number): PluginMaterial {
    return { ...createEmptyMaterial(), thickName: 'Thin', name, thickness };
  }

  async function editing(before: PluginMaterial, after: PluginMaterial) {
    const app = new App({ platform: 'linux' });
    vi.spyOn(app, 'setState').mockImplementation((update) => {
      app.state = {
        ...app.state,
        ...(typeof update === 'function'
          ? update(app.state, app.props)
          : update),
      };
    });
    app.state = {
      ...app.state,
      materials: [createMaterial(before, 'abcdef0')],
      rawMaterials: [before],
      tempMaterial: { ...after, propValidation: {} },
    };
    cloud[await hashTitle(before)] = encodeCloudMaterial(
      toTinyMaterial(before),
    );
    await app.editMaterial(`Thin ${before.name}`);
    return app;
  }

  const localThicknesses = () =>
    (local.rawMaterials as PluginMaterial[]).map((m) => m.thickness);

  it('keeps the edit on this computer when the cloud refuses it', async () => {
    refuse = true;
    const app = await editing(material('Birch', 3), material('Birch', 6));

    expect(cloud).toEqual({});
    expect(app.state.message?.message).toBe(
      'Saved on this computer only, the cloud refused it: QUOTA_BYTES quota exceeded',
    );
    expect(localThicknesses()).toEqual([6]);
    // Sync has no old copy to bring back.
    await syncronizeMaterials();
    expect(localThicknesses()).toEqual([6]);
  });

  it('replaces the cloud copy of a material that keeps its title', async () => {
    const before = material('Birch', 3);
    const app = await editing(before, material('Birch', 6));

    const key = await hashTitle(before);
    expect(Object.keys(cloud)).toEqual([key]);
    expect(cloud[key]).not.toBe(encodeCloudMaterial(toTinyMaterial(before)));
    expect(app.state.message).toBeNull();
    await syncronizeMaterials();
    expect(localThicknesses()).toEqual([6]);
  });

  it('moves a renamed material to its new key, with the cloud full', async () => {
    for (let i = 0; i < 511; i += 1) cloud[`other${i}`] = 'Zanother material';
    const after = material('Maple', 3);
    const app = await editing(material('Birch', 3), after);

    expect(Object.keys(cloud)).toHaveLength(512);
    expect(cloud[await hashTitle(after)]).toMatch(/^A/);
    expect(app.state.message).toBeNull();
    expect(app.state.action).toBe('SELECTED');

    await syncronizeMaterials();
    expect((local.rawMaterials as PluginMaterial[]).map((m) => m.name)).toEqual(
      ['Maple'],
    );
  });
});
