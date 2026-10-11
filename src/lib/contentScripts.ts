/**
 * Adds the extension's content scripts to Glowforge tabs that are already
 * open. Chrome only adds them to pages loaded after the extension is installed
 * or updated, and the copies from before an update can no longer reach the
 * extension. The scripts stop when a newer copy starts.
 */

const GLOWFORGE_TABS = '*://app.glowforge.com/*';

/**
 * Adds the content scripts to one tab.
 *
 * @returns Whether they were added.
 */
export async function addContentScripts(tabId: number): Promise<boolean> {
  try {
    // The bridge first, so that it hears content.js say it's ready.
    await chrome.scripting.executeScript({ target: { tabId }, files: ['bridge.js'] });
    await chrome.scripting.executeScript({ target: { tabId }, files: ['content.js'], world: 'MAIN' });
    return true;
  } catch {
    // The tab closed or navigated away from Glowforge.
    return false;
  }
}

/**
 * Adds the content scripts to every open Glowforge tab.
 */
export async function addContentScriptsToOpenTabs(): Promise<void> {
  const tabs = await chrome.tabs.query({ url: GLOWFORGE_TABS });
  await Promise.all(tabs.map((tab) => {
    // Discarded tabs reload, with the scripts, when they are opened.
    if (tab.id === undefined || tab.discarded) {
      return false;
    }
    return addContentScripts(tab.id);
  }));
}
