import type { GFMaterial } from '../material/materialGlowforge';
import { requestSync } from './sync';
import type { PluginMaterial } from '../material/materialPlugin';
import type { TempMaterial } from './materialHelpers';
import type { SpeedSpace } from './glowforgeUnits';
import type { MachineModel } from './machineModel';

export type SyncId = string;
export type SyncData = string;

export type SynchronizedMaterials = {
  [key in SyncId]: SyncData;
};

export interface StorageLocal {
  // Stores material backups by version number before a major release occurs.
  backup?: { [key: string]: StorageLocal };
  // The Glowforge formatted materials.
  materials?: GFMaterial[];
  // The raw material data that is used to generated Glowforge materials.
  rawMaterials?: PluginMaterial[];
  // The model of the machine last selected in a Glowforge tab.
  machineModel?: MachineModel;
  // The speed limits of the machine last selected in a Glowforge tab.
  speedSpace?: SpeedSpace;
  // When every Glowforge tab was last asked to add the materials again.
  syncRequestedAt?: number;
  // A material that was saved due to the popup window being dismissed without
  // clicking the save button.
  tempMaterial?: TempMaterial | null;
}

// Local Storage
// ===================================================================

/**
 * Gets all the data from local storage.
 */
export async function getLocalStorage(): Promise<StorageLocal> {
  return new Promise((resolve) => {
    window.chrome.storage.local.get(null, (result: StorageLocal) => {
      if (!result.materials) {
        result.materials = [];
      }
      if (!result.rawMaterials) {
        result.rawMaterials = [];
      }
      resolve(result);
    });
  });
}

/**
 * Gets all the backups.
 */
export async function getBackups(): Promise<{
  [key: string]: StorageLocal;
} | void> {
  return new Promise((resolve) => {
    window.chrome.storage.local.get(null, (result: StorageLocal) => {
      if (result && result.backup) {
        resolve(result.backup);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Gets a backup from local storage.
 *
 * @param backupName
 */
export async function getBackup(
  backupName: string,
): Promise<StorageLocal | void> {
  return new Promise((resolve) => {
    window.chrome.storage.local.get(null, (result: StorageLocal) => {
      if (result && result.backup && result.backup[backupName]) {
        resolve(result.backup[backupName]);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Saves a copy of the current local storage as a backup.
 *
 * @param backupName
 * @param backup
 */
export async function storeBackup(
  backupName: string,
  backup: StorageLocal,
): Promise<boolean> {
  return new Promise((resolve) => {
    window.chrome.storage.local.get(null, (results: StorageLocal) => {
      const previousBackups = results.backup;
      delete backup.backup;

      const backups = {
        ...previousBackups,
        [backupName]: backup,
      };
      console.log(backups);
      window.chrome.storage.local.set(
        {
          backup: backups,
        },
        () => {
          resolve(true);
        },
      );
    });
  });
}

/**
 * Gets the Glowforge materials from local storage.
 */
export async function getGlowforgeMaterials(): Promise<GFMaterial[]> {
  return new Promise((resolve) => {
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
 * Saves the Glowforge materials, which the Glowforge tabs pick up.
 *
 * @param materials
 */
export async function storeGlowforgeMaterials(
  materials: GFMaterial[],
): Promise<GFMaterial[]> {
  return new Promise((resolve) => {
    window.chrome.storage.local.set(
      {
        materials,
      },
      () => {
        resolve(materials);
      },
    );
  });
}

/**
 * Gets the raw materials from local storage.
 */
export async function getRawMaterials(): Promise<PluginMaterial[]> {
  return new Promise((resolve) => {
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
 * Saves the raw materials. The Glowforge tabs only use the Glowforge
 * materials, which are saved with them.
 *
 * @param materials
 */
/**
 * Remembers the model of the machine selected in a Glowforge tab, for when
 * the popup is opened somewhere else.
 */
export async function storeMachineModel(
  machineModel: MachineModel,
): Promise<void> {
  return new Promise((resolve) => {
    window.chrome.storage.local.set({ machineModel }, () => resolve());
  });
}

/**
 * Remembers the speed limits of the machine selected in a Glowforge tab, for
 * when the popup is opened somewhere else.
 */
export async function storeSpeedSpace(speedSpace: SpeedSpace): Promise<void> {
  return new Promise((resolve) => {
    window.chrome.storage.local.set({ speedSpace }, () => resolve());
  });
}

export async function storeRawMaterials(
  materials: PluginMaterial[],
): Promise<PluginMaterial[]> {
  return new Promise((resolve) => {
    window.chrome.storage.local.set(
      {
        rawMaterials: materials,
      },
      () => {
        resolve(materials);
      },
    );
  });
}

/**
 * Removes and stored temporary material.
 */
export async function clearTempMaterial(): Promise<boolean> {
  return new Promise((resolve) => {
    window.chrome.storage.local.set(
      {
        tempMaterial: null,
      },
      () => {
        resolve(true);
      },
    );
  });
}

/**
 * Get a temporary material from local storage is was being created when the
 * plugin was closed.
 */
export async function getTempMaterial(): Promise<PluginMaterial | object> {
  return new Promise((resolve) => {
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
export async function storeTempMaterial(
  material: PluginMaterial,
): Promise<PluginMaterial> {
  return new Promise((resolve) => {
    window.chrome.storage.local.set(
      {
        tempMaterial: material,
      },
      () => {
        resolve(material);
      },
    );
  });
}

/**
 * Asks every Glowforge tab to add the materials again.
 */
export async function forceSync(): Promise<void> {
  return requestSync();
}

// Synchronized Storage
// ===================================================================

/**
 * The number of bytes of free chrome cloud storage that are currently in use by
 * the plugin.
 */
export async function getBytesInUse(): Promise<number> {
  return new Promise((resolve) => {
    window.chrome.storage.sync.getBytesInUse(null, (bytesInUse) => {
      resolve(bytesInUse);
    });
  });
}

/**
 * The number of items in the cloud, one per material. Chrome allows 512, so
 * that's the most materials that can sync, however small they are.
 */
export async function getSynchronizedItemCount(): Promise<number> {
  return Object.keys(await getSynchronizedMaterials()).length;
}

/**
 * Returns a list of materials that have been synchronized by the hashed title
 * of the RawMaterial -> the material as encodeCloudMaterial wrote it.
 */
export async function getSynchronizedMaterials(): Promise<SynchronizedMaterials> {
  return new Promise((resolve) => {
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
  return new Promise((resolve) => {
    window.chrome.storage.sync.remove(hash, () => {
      resolve(hash);
    });
  });
}

/**
 * Stores a material in the cloud.
 *
 * @param hash The hashed title of the RawMaterial that is being stored.
 * @param material The material as encodeCloudMaterial writes it.
 * @returns The hash that was stored. Rejects when Chrome refuses the write,
 * like when the cloud storage is full.
 */
export async function storeSynchronizedMaterial(
  hash: string,
  material: string,
): Promise<string> {
  await storeSynchronizedValues({ [hash]: material });
  return hash;
}

/**
 * Gets some of the cloud's values. Keys it doesn't have are left out.
 */
export async function getSynchronizedValues(
  keys: string[],
): Promise<SynchronizedMaterials> {
  return new Promise((resolve) => {
    window.chrome.storage.sync.get(keys, (result: SynchronizedMaterials) => {
      resolve(result ?? {});
    });
  });
}

/**
 * Stores several cloud values in one write, which Chrome counts as one
 * operation against its per minute and per hour limits. Rejects when Chrome
 * refuses the write, and then nothing is stored.
 */
export async function storeSynchronizedValues(
  items: SynchronizedMaterials,
): Promise<void> {
  return new Promise((resolve, reject) => {
    window.chrome.storage.sync.set(items, () => {
      const error = window.chrome.runtime?.lastError;
      if (error) {
        reject(new Error(error.message));
      } else {
        resolve();
      }
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
  return window.chrome.runtime.getURL(itemName);
}

/**
 * Gets the active tab if it is a Glowforge tab.
 */
async function getGlowforgeTab(): Promise<chrome.tabs.Tab | null> {
  return new Promise((resolve) => {
    window.chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true,
      },
      (tabs) => {
        if (
          !!tabs &&
          !!tabs[0] &&
          tabs[0].url &&
          tabs[0].url.indexOf('app.glowforge.com') !== -1
        ) {
          resolve(tabs[0]);
        } else {
          resolve(null);
        }
      },
    );
  });
}

export async function inGlowforgeTab(): Promise<boolean> {
  return !!(await getGlowforgeTab());
}

// What the extension's scripts in a Glowforge tab report.
export interface TabStatus {
  // The GFUI's store was found, so materials can be added.
  ready: boolean;
  // The tab has the latest custom materials.
  synchronized: boolean;
  // The selected machine.
  serial: string | null;
  // The selected machine's model and laser tube, like pro and pro.
  model?: string | null;
  tubeType?: string | null;
  // The selected machine's speed limits, as the page gave them.
  speeds?: unknown;
  // The open design.
  designId: string | null;
}

// The active tab, as far as the popup is concerned: not Glowforge, Glowforge
// without the extension's scripts running in it, or connected.
export type TabConnection =
  | { state: 'none' }
  | { state: 'disconnected'; tabId: number }
  | { state: 'connected'; tabId: number; status: TabStatus };

/**
 * Asks the active Glowforge tab for its status.
 */
export async function getTabConnection(): Promise<TabConnection> {
  const tab = await getGlowforgeTab();
  if (!tab || tab.id === undefined) {
    return { state: 'none' };
  }

  try {
    const status = await window.chrome.tabs.sendMessage(tab.id, {
      target: 'bridge',
      type: 'status',
    });
    if (status && typeof status === 'object') {
      return { state: 'connected', tabId: tab.id, status };
    }
  } catch {
    // Nothing is listening: the scripts couldn't be added after an update, or
    // the tab is still loading.
  }
  return { state: 'disconnected', tabId: tab.id };
}

/**
 * Reloads the current GlowForge application tab.
 */
export async function reloadGlowForgeTab(): Promise<void> {
  if (await inGlowforgeTab()) {
    await reload();
  }
}

/**
 * Reloads the current tab.
 */
export async function reload(): Promise<void> {
  return new Promise((resolve) => {
    // tabId is optional as per the docs
    window.chrome.tabs.reload(undefined, { bypassCache: true }, () => {
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
  return new Promise((resolve) => {
    window.chrome.runtime.getPlatformInfo((info) => {
      resolve(info.os);
    });
  });
}

/**
 * Sends a message to the extension's content script in the active Glowforge
 * tab, which forwards it to the GFUI.
 *
 * @param message The message to send.
 * @returns Whether a Glowforge tab got it.
 */
export async function sendMessage(message: object): Promise<boolean> {
  const tab = await getGlowforgeTab();
  if (!tab || tab.id === undefined) {
    return false;
  }

  try {
    await window.chrome.tabs.sendMessage(tab.id, {
      target: 'bridge',
      ...message,
    });
    return true;
  } catch {
    // The extension's scripts aren't running in the tab.
    return false;
  }
}
