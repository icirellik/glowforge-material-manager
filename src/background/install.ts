import type { StorageLocal } from '../lib/chromeWrappers';
import { requestSync } from '../lib/sync';

/**
 * Sets up local storage when the extension is installed or updated and when
 * the browser starts, and asks the Glowforge tabs to add the materials again.
 */
export async function initializeStorage(): Promise<void> {
  // Older versions kept the last tab's machine and design and a flag for
  // changes here, the tabs now report their own.
  await chrome.storage.local.remove(['ui', 'shouldUpdate']);
  const { materials }: StorageLocal =
    await chrome.storage.local.get('materials');
  if (materials) {
    await requestSync();
  } else {
    await chrome.storage.local.set({
      materials: [],
      rawMaterials: [],
    });
  }
}
