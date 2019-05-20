import {
  PluginBitmapEngraveSetting,
  PluginCutSetting,
  GFBitmapEngraveSetting,
  GFCutSetting,
  GFEngraveSetting,
  GFScoreSetting,
  PluginScoreSetting,
  PluginVectorEngraveSetting,
} from './material';

/* global chrome:true */

// Internal Plugin Data Structure
export type RawMaterial = {
  name: string;
  thickName: string;
  thickness: any;

  bitmaps: PluginBitmapEngraveSetting[];
  cut: PluginCutSetting;
  scores: PluginScoreSetting[];
  vectors: PluginVectorEngraveSetting[];
};

// Glowforge Redux Material Shape
export type MaterialEnvironment = 'production';
export type MaterialTubeType = 'basic' | 'pro';

export type MaterialSettings = {
  active_date: string;
  bitmap_engrave_settings: GFBitmapEngraveSetting[];
  cut_setting: GFCutSetting;
  description: string;
  environment: MaterialEnvironment[];
  score_settings: GFScoreSetting[];
  tube_type: MaterialTubeType;
  vector_engrave_settings: GFEngraveSetting[];
}

export type MaterialVariety = {
  common_name: string;
  display_options: null;
  name: string;
  thumbnails: string[];
  type_name: string;
}

export type Material = {
  // Format "Custom:0"
  id: string;
  nominal_thickness: null | number;
  sku: string;
  thickness_name: string;
  title: string;
  settings: MaterialSettings[];
  variety: MaterialVariety;
};

export type SynchronizedMaterials = {
  [key: string]: any;
}

export async function clearTempMaterial(): Promise<boolean> {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'tempMaterial': null,
    }, () => {
      resolve(true);
    });
  });
}

export async function getBytesInUse(): Promise<number> {
  return new Promise(resolve => {
    chrome.storage.sync.getBytesInUse(null, bytesInUse => {
      resolve(bytesInUse);
    });
  });
}

export async function getMaterials(): Promise<Material[]> {
  return new Promise(resolve => {
    chrome.storage.local.get(null, result => {
      if (result && result.materials) {
        resolve(result.materials);
      } else {
        resolve([]);
      }
    });
  });
}

export async function getPlatform(): Promise<string> {
  return new Promise(resolve => {
    chrome.runtime.getPlatformInfo(info => {
      resolve(info.os);
    });
  });
}

export async function getRawMaterials(): Promise<RawMaterial[]> {
  return new Promise(resolve => {
    chrome.storage.local.get(null, result => {
      if (result && result.rawMaterials) {
        resolve(result.rawMaterials);
      } else {
        resolve([]);
      }
    });
  });
}

export async function getTempMaterial(): Promise<RawMaterial | object> {
  return new Promise(resolve => {
    chrome.storage.local.get(null, result => {
      if (result && result.tempMaterial) {
        resolve(result.tempMaterial);
      } else {
        resolve({});
      }
    });
  });
}

export async function getShouldUpdate(): Promise<boolean> {
  return new Promise(resolve => {
    chrome.storage.local.get(null, result => {
      if (result && result.shouldUpdate) {
        resolve(result.shouldUpdate);
      } else {
        resolve(false);
      }
    });
  });
}

export function getUrl(itemName: string) {
  return chrome.extension.getURL(itemName);
}

export async function storeMaterials(materials: Material[]): Promise<Material[]> {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'materials': materials,
      'shouldUpdate': true,
    }, () => {
      resolve(materials);
    });
  });
}

export async function storeRawMaterials(rawMaterials: RawMaterial[]): Promise<RawMaterial[]> {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'rawMaterials': rawMaterials,
      'shouldUpdate': true,
    }, () => {
      resolve(rawMaterials);
    });
  });
}

/**
 * Returns a list of materials that have been synchronized by the hashed title
 * of the RawMaterial -> compressed RawMaterial data.
 */
export async function getSynchronizedMaterials(): Promise<SynchronizedMaterials> {
  return new Promise(resolve => {
    chrome.storage.sync.get(null, result => {
      if (result) {
        resolve(result);
      } else {
        resolve({});
      }
    });
  });
}

/**
 *
 * @param hash The hashed title of the RawMaterial to remove.
 */
export async function removeSynchronizedMaterial(hash: string) {
  return new Promise(resolve => {
    chrome.storage.sync.remove(hash, () => {
      resolve(hash);
    });
  });
}

/**
 *
 * @param hash The hashed title of the RawMaterial that is being stored.
 * @param material Compressed material as a base64? encoded string.
 */
export async function storeSynchronizedMaterial(hash: string, material: string): Promise<string> {
  return new Promise(resolve => {
    chrome.storage.sync.set({
      [hash]: material,
    }, () => {
      chrome.storage.sync.getBytesInUse(null, bytesInUse => {
        console.log(`cloud bytes in use ${bytesInUse}`);
        resolve(hash);
      });
    });
  });
}

export async function storeTempMaterial(material: RawMaterial) {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'tempMaterial': material,
    }, () => {
      resolve(material);
    });
  });
}

export async function forceSync() {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'shouldUpdate': true,
    }, () => {
      resolve(true);
    });
  });
}

export async function inGlowforgeTab(): Promise<boolean> {
  return new Promise(resolve => {
    chrome.tabs.query({
      'active': true,
      'lastFocusedWindow': true
    }, (tabs) => {
      if (!!tabs && !!tabs[0] && tabs[0].url && tabs[0].url.indexOf('app.glowforge.com') !== -1) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

export async function reload() {
  return new Promise(async resolve => {
    if (await inGlowforgeTab()) {
      // tabId is optional as per the docs
      chrome.tabs.reload(null as any, { bypassCache: true }, () => {
        resolve();
      });
    } else {
      resolve();
    }
  });
}
