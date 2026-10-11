import { checkLidImage } from './background/lidImageQrCode';
import type { LidImageCheck } from './background/lidImageQrCode';
import { initializeStorage } from './background/install';
import { log } from './background/log';
import { addContentScriptsToOpenTabs } from './lib/contentScripts';

/**
 * The extension's background service worker. It reads material stickers from
 * lid camera images and sets up the Glowforge tabs.
 */

interface BridgeMessage {
  target: 'background';
  type: string;
  image?: unknown;
}

/**
 * Handles a message from bridge.js in a Glowforge tab.
 *
 * lidImage - The lid camera image changed, reply with the sticker in it.
 */
export async function handleBridgeMessage(
  request: BridgeMessage,
): Promise<LidImageCheck | null> {
  log(`message: ${request.type}`);
  if (request.type === 'lidImage' && typeof request.image === 'string') {
    return checkLidImage(request.image);
  }
  return null;
}

/**
 * Handle messaging with the Glowforge tabs.
 *
 * The handlers are async, so we must return true and call `sendResponse`
 * once they finish.
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!request || request.target !== 'background') {
    return false;
  }

  handleBridgeMessage(request)
    .catch((error) => {
      log(error);
      return null;
    })
    // Always call send response
    .then(sendResponse);
  return true;
});

// The service worker starts and stops many times per browser session, so only
// initialize when the extension is installed or updated and when the browser
// starts.
chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  await initializeStorage();
  if (reason === 'install' || reason === 'update') {
    await addContentScriptsToOpenTabs();
  }
});
chrome.runtime.onStartup.addListener(() => initializeStorage());
