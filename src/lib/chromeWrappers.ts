import { GFMaterial } from './materialGlowforge';
import { PluginMaterial } from './materialRaw';

export type SyncId = string;
export type SyncData = string;

export type SynchronizedMaterials = {
  [key in SyncId]: SyncData;
}

interface StorageLocal {
  // The Glowforge formatted materials.
  materials?: GFMaterial[];
  // The raw material data that is used to generated Glowforge materials.
  rawMaterials?: PluginMaterial[];
  // Should the list in the glowforge app be updated?
  shouldUpdate?: boolean;
  // A material that was saved due to the popup window being dismissed without
  // clicking the save button.
  tempMaterial?: PluginMaterial | null;
}

// Local Storage
// ===================================================================

/**
 * Gets all the data from local storage.
 */
export async function getLocalStorage(): Promise<StorageLocal> {
  return new Promise(resolve => {
    window.chrome.storage.local.get(null, (result: StorageLocal) => {
      resolve(result);
    });
  });
}

/**
 * Gets the Glowforge materials from local storage.
 */
export async function getGlowforgeMaterials(): Promise<GFMaterial[]> {
  return new Promise(resolve => {
    window.chrome.storage.local.get(null, (result: StorageLocal) => {
      if (result && result.materials) {
        resolve(result.materials);
      } else {
        resolve([]);
      }
    });
  });
}

/**
 * Saves the Glowforge materials and forces the Glowforge UI to synchronize.
 *
 * @param materials
 */
export async function storeGlowforgeMaterials(materials: GFMaterial[]): Promise<GFMaterial[]> {
  return new Promise(resolve => {
    window.chrome.storage.local.set({
      'materials': materials,
      'shouldUpdate': true,
    }, () => {
      resolve(materials);
    });
  });
}

/**
 * Gets the raw materials from local storage.
 */
export async function getRawMaterials(): Promise<PluginMaterial[]> {
  return new Promise(resolve => {
    window.chrome.storage.local.get(null, (result: StorageLocal) => {
      if (result && result.rawMaterials) {
        resolve(result.rawMaterials);
      } else {
        resolve([]);
      }
    });
  });
}

/**
 * Saves the raw materials and forces the glowforge app to synchronize.
 *
 * TODO: Is the synchronization here required, raw materials don't hold new
 * information.
 *
 * @param materials
 */
export async function storeRawMaterials(materials: PluginMaterial[]): Promise<PluginMaterial[]> {
  return new Promise(resolve => {
    window.chrome.storage.local.set({
      'rawMaterials': materials,
      'shouldUpdate': true,
    }, () => {
      resolve(materials);
    });
  });
}

/**
 * Removes and stored temporary material.
 */
export async function clearTempMaterial(): Promise<boolean> {
  return new Promise(resolve => {
    window.chrome.storage.local.set({
      'tempMaterial': null,
    }, () => {
      resolve(true);
    });
  });
}

/**
 * Get a temporary material from local storage is was being created when the
 * plugin was closed.
 */
export async function getTempMaterial(): Promise<PluginMaterial | object> {
  return new Promise(resolve => {
    window.chrome.storage.local.get(null, (result: StorageLocal) => {
      if (result && result.tempMaterial) {
        resolve(result.tempMaterial);
      } else {
        resolve({});
      }
    });
  });
}

/**
 * Stores the current material state in case the plugin is closed so that it can
 * be reloaded.
 *
 * @param material
 */
export async function storeTempMaterial(material: PluginMaterial): Promise<PluginMaterial> {
  return new Promise(resolve => {
    window.chrome.storage.local.set({
      'tempMaterial': material,
    }, () => {
      resolve(material);
    });
  });
}

/**
 * Gets the status of the force update flag.
 */
export async function getShouldUpdate(): Promise<boolean> {
  return new Promise(resolve => {
    window.chrome.storage.local.get(null, (result: StorageLocal) => {
      if (result && result.shouldUpdate) {
        resolve(result.shouldUpdate);
      } else {
        resolve(false);
      }
    });
  });
}

/**
 * Forces the glowforge application to synchronize with any material changes.
 */
export async function forceSync(): Promise<boolean> {
  return new Promise(resolve => {
    window.chrome.storage.local.set({
      'shouldUpdate': true,
    }, () => {
      resolve(true);
    });
  });
}

// Synchronized Storage
// ===================================================================

/**
 * The number of bytes of free chrome cloud storage that are currently in use by
 * the plugin.
 */
export async function getBytesInUse(): Promise<number> {
  return new Promise(resolve => {
    window.chrome.storage.sync.getBytesInUse(null, bytesInUse => {
      resolve(bytesInUse);
    });
  });
}

/**
 * Returns a list of materials that have been synchronized by the hashed title
 * of the RawMaterial -> compressed RawMaterial data.
 */
export async function getSynchronizedMaterials(): Promise<SynchronizedMaterials> {
  return new Promise(resolve => {
    window.chrome.storage.sync.get(null, (result: SynchronizedMaterials) => {
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
    window.chrome.storage.sync.remove(hash, () => {
      resolve(hash);
    });
  });
}

/**
 *
 * @param hash The hashed title of the RawMaterial that is being stored.
 * @param material Compressed material as a base64? encoded string.
 * @returns The hash that was stored.
 */
export async function storeSynchronizedMaterial(hash: string, material: string): Promise<string> {
  return new Promise(resolve => {
    window.chrome.storage.sync.set({
      [hash]: material,
    }, () => {
      window.chrome.storage.sync.getBytesInUse(null, bytesInUse => {
        console.log(`cloud bytes in use ${bytesInUse}`);
        resolve(hash);
      });
    });
  });
}

// Tab Management
// ===================================================================

/**
 * Gets the URL for some content that is packaged in the extension.
 *
 * @param itemName The content name.
 */
export function getUrl(itemName: string): string {
  return window.chrome.extension.getURL(itemName);
}

export async function inGlowforgeTab(): Promise<boolean> {
  return new Promise(resolve => {
    window.chrome.tabs.query({
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

/**
 * Reloads the current GlowForge application tab.
 */
export async function reloadGlowForgeTab(): Promise<void> {
  return new Promise(async resolve => {
    if (await inGlowforgeTab()) {
      // tabId is optional as per the docs
      window.chrome.tabs.reload(null as any, { bypassCache: true }, () => {
        resolve();
      });
    } else {
      resolve();
    }
  });
}

/**
 * Reloads the current tab.
 */
export async function reload(): Promise<void> {
  return new Promise(async resolve => {
    window.chrome.tabs.reload(null as any, { bypassCache: true }, () => {
      resolve();
    });
  });
}

// Misc.
// ===================================================================

/**
 * Gets the operation system that the plugin is running on.
 */
export async function getPlatform(): Promise<string> {
  return new Promise(resolve => {
    window.chrome.runtime.getPlatformInfo(info => {
      resolve(info.os);
    });
  });
}
