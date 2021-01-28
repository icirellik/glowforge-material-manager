import { syncronizeMaterials } from './material.sync';
import { createEmptyMaterial } from '../lib/materialHelpers';
import { hashTitle, decompress } from '../lib/utils';
import {
  createMaterial, removeCloudMaterial, sendCloudMaterial,
} from './material';
import {
  storeGlowforgeMaterials, storeRawMaterials, StorageLocal,
} from '../lib/chromeWrappers';
import { toFullMaterial } from './materialConversion';

function mockFunctions() {
  const original = require.requireActual('../lib/crypto');
  let counter = 0;
  const hashes: Map<string, string> = new Map();
  return {
    ...original,
    sha1: jest.fn(async (data: string) => {
      const message = JSON.stringify(data);
      if (hashes.has(message)) {
        return hashes.get(message)!;
      }
      counter += 1;
      hashes.set(message, `${counter}`);
      return Promise.resolve(`${counter}`);
    }),
  };
}
jest.mock('../lib/crypto', () => mockFunctions());
require('../lib/crypto');

describe('Synchronization', () => {
  let testLocalData: StorageLocal = {
    materials: [],
    rawMaterials: [],
    shouldUpdate: false,
  };
  let testSyncData: any = null;

  (<any>window).chrome = {
    extension: {
      getURL: (itemName: string) => itemName,
    },
    storage: {
      local: {
        get: (key: keyof StorageLocal, cb: any) => {
          if (key) {
            cb(testLocalData![key]);
            return;
          }
          cb(testLocalData);
        },
        set: (data: any, cb: any) => {
          testLocalData = {
            ...testLocalData,
            ...data,
          };
          cb();
        },
      },
      sync: {
        get: (key: string, cb: any) => {
          cb(testSyncData);
        },
        set: (data: any, cb: any) => {
          testSyncData = {
            ...testSyncData,
            ...data,
          };
          cb();
        },
        remove: (key: string, cb: any) => {
          delete testSyncData[key];
          cb();
        },
        getBytesInUse: (key: null, cb: any) => {
          cb(-1);
        },
      },
    },
  };

  beforeEach(() => {
    testLocalData = {
      materials: [],
      rawMaterials: [],
      shouldUpdate: false,
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
    const testLocalDataTitleHashesPromises = testLocalData.rawMaterials!.map(async (pluginMaterial) => hashTitle(pluginMaterial));
    const testLocalDataTitleHashes = await Promise.all(testLocalDataTitleHashesPromises);
    expect(testLocalData.rawMaterials!.length).toEqual(1);
    expect(testLocalDataTitleHashes).toEqual(['1']);
    expect(testLocalDataTitleHashes).toEqual(Object.keys(testSyncData));

    // Verify different property.
    expect(testLocalData.rawMaterials![0].thickness).toEqual(1);
    const remoteMaterial = toFullMaterial(decompress(testSyncData['1']));
    expect(remoteMaterial.thickness).toEqual(2);
  });
});
