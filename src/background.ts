import type { StorageLocal } from './lib/chromeWrappers';
import { readQrCodeFromImage } from './lib/qr';

/**
 * The extension's background service worker. It reads QR codes from the lid
 * camera image and sets up the Glowforge tabs.
 */

/**
 * Only log messages in development mode.
 */
const PROD_MODE = ('update_url' in chrome.runtime.getManifest());
function log(message: unknown) {
  if (!PROD_MODE) {
    // eslint-disable-next-line
    console.log(message);
  }
}

/**
 * Helper function to store data in local storage.
 */
function store(data: Partial<StorageLocal>) {
  return chrome.storage.local.set(data);
}

/**
 * Helper function to load all data from local storage.
 */
function load(): Promise<StorageLocal> {
  return chrome.storage.local.get(null);
}

// QR Code
// ===================================================================

// Matches both kinds of material QR code, `Custom:<id>` and
// `Custom:<id>|<settings>`.
const CUSTOM_MATERIAL_QR_CODE = /^(Custom:[0-9a-f]{7})(\|[\s\S]*)?$/;

// Give up on slow lid image downloads.
const LID_IMAGE_TIMEOUT_MS = 10000;

/**
 * Downloads an image and reads a QR code from it.
 */
async function readQrCodeFromUrl(imageUrl: string): Promise<string | null> {
  const response = await fetch(imageUrl, {
    credentials: 'omit',
    signal: AbortSignal.timeout(LID_IMAGE_TIMEOUT_MS),
  });
  if (!response.ok) {
    log(`Could not load the lid image: ${response.status}`);
    return null;
  }

  const code = await readQrCodeFromImage(await response.blob());
  return code && code.text;
}

/**
 * Checks the lid camera image for a custom material QR code.
 *
 * @param image The lid image url.
 * @returns The id of the material to select, or null.
 */
async function checkForQRCode(image: string): Promise<string | null> {
  // Older versions of the GFUI used a path on app.glowforge.com, newer ones use
  // a full url.
  const imageUrl = new URL(image, 'https://app.glowforge.com');
  if (imageUrl.protocol !== 'https:') {
    return null;
  }

  const qrCodeData = await readQrCodeFromUrl(imageUrl.href);
  log('QR Code Results');
  log(qrCodeData);

  if (qrCodeData && qrCodeData.startsWith('Glowforge')) {
    log('PG Material detected');
    return null;
  }

  const match = qrCodeData && qrCodeData.match(CUSTOM_MATERIAL_QR_CODE);
  if (match) {
    log('Custom Material detected');
    return match[1];
  }
  return null;
}

// Message Handlers
// ===================================================================

interface BridgeMessage {
  target: 'background';
  type: string;
  image?: unknown;
}

/**
 * Forces the should update flag to be true, creates a one time refresh.
 */
function forceRefresh() {
  return store({
    shouldUpdate: true,
  });
}

/**
 * Handles a message from bridge.js in a Glowforge tab.
 *
 * lidImage - The lid camera image changed.
 *
 * @returns The response, the material to select for `lidImage`.
 */
async function handleBridgeMessage(request: BridgeMessage): Promise<string | null> {
  log(`message: ${request.type}`);
  if (request.type === 'lidImage' && typeof request.image === 'string') {
    return checkForQRCode(request.image);
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

/**
 * Initialize local storage. If local storage has already been initialized then
 * we set `shouldUpdate` to true to force UI sync.
 */
async function initializeStorage() {
  log('verifying local storage.');
  // Older versions stored the last tab's machine and design here, the popup
  // now asks the tab.
  await chrome.storage.local.remove('ui');
  const result = await load();
  if (result && result.materials) {
    log('local storage previously initialized.');
    await forceRefresh();
  } else {
    log('initalizing local storage.');
    await store({
      materials: [],
      rawMaterials: [],
      shouldUpdate: false,
    });
    log('local storage is initialized.');
  }
}

/**
 * Adds the content scripts to the Glowforge tabs that are already open. Chrome
 * only adds them to pages loaded after the extension is installed or updated,
 * and the copies from before an update can no longer reach the extension.
 */
async function addScriptsToOpenTabs() {
  const tabs = await chrome.tabs.query({ url: '*://app.glowforge.com/*' });
  await Promise.all(tabs.map(async (tab) => {
    // Discarded tabs reload, with the scripts, when they are opened.
    if (tab.id === undefined || tab.discarded) {
      return;
    }
    try {
      // The bridge first, so that it hears content.js say it's ready.
      await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['bridge.js'] });
      await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'], world: 'MAIN' });
    } catch (error) {
      log(error);
    }
  }));
}

// The service worker starts and stops many times per browser session, so only
// initialize when the extension is installed or updated and when the browser
// starts.
chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  await initializeStorage();
  if (reason === 'install' || reason === 'update') {
    await addScriptsToOpenTabs();
  }
});
chrome.runtime.onStartup.addListener(() => initializeStorage());
