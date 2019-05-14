import { CutSetting, ScoreSetting, VectorEngraveSetting, BitmapEngraveSetting } from "./material";

/* global chrome:true */

// Internal Plugin Data Structure
export type RawMaterial = {
  name: string;
  thickName: string;
  thickness: any;

  bitmaps: BitmapEngraveSetting[];
  cut: CutSetting;
  scores: ScoreSetting[];
  vectors: VectorEngraveSetting[];
};

// Glowforge Redux Material Shape
export type MaterialEnvironment = 'production';
export type MaterialTubeType = 'basic' | 'pro';

export type MaterialSettings = {
  active_date: string;
  bitmap_engrave_settings: any[];
  cut_setting: CutSetting;
  description: string;
  environment: MaterialEnvironment[];
  score_settings: any[];
  tube_type: MaterialTubeType;
  vector_engrave_setting: any[];
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

export async function clearTempMaterial() {
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

export async function getTempMaterial() {
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

export async function removeSynchronizedMaterial(materialHash: string) {
  return new Promise(resolve => {
    chrome.storage.sync.remove(materialHash, () => {
      resolve(materialHash);
    });
  });
}

export async function storeMaterials(materials: Material[]) {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'materials': materials,
      'shouldUpdate': true,
    }, () => {
      resolve(materials);
    });
  });
}

export async function storeRawMaterials(rawMaterials: RawMaterial[]) {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'rawMaterials': rawMaterials,
      'shouldUpdate': true,
    }, () => {
      resolve(rawMaterials);
    });
  });
}

export async function storeSynchronizedMaterial(hash: string, material: Material) {
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

export async function storeTempMaterial(material: Material) {
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
