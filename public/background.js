/**
 * Only log messages in development mode.
 */
const PROD_MODE = ('update_url' in chrome.runtime.getManifest());
function log(message) {
  if (!PROD_MODE) {
    // eslint-disable-next-line
    console.log(message);
  }
}

/**
 * Helper function to store data in local storage.
 */
function store(data) {
  return chrome.storage.local.set(data);
}

/**
 * Helper function to load all data from local storage.
 */
function load() {
  return chrome.storage.local.get(null);
}

/**
 * Creates a function that runs async tasks one at a time. Storage updates read,
 * modify and then write, so concurrent message handlers would otherwise
 * overwrite each other's changes.
 */
function createSerialRunner() {
  let previous = Promise.resolve();
  return (task) => {
    const result = previous.then(task);
    // The caller handles the error, the next task should still run.
    previous = result.catch(() => {});
    return result;
  };
}

const runUISettingsUpdate = createSerialRunner();

/**
 * Stores new ui settings.
 */
function storeUISettings(settings) {
  return runUISettingsUpdate(async () => {
    const results = await load();
    if (!results.ui) {
      await store({
        ui: settings,
      });
      log('UI Settings Created');
    } else {
      const ui = {
        ...results.ui,
        ...settings,
      };
      await store({
        ui,
      });
      log('UI Settings Updated');
    }
  });
}

// QR Code
// ===================================================================
const OFFSCREEN_DOCUMENT_PATH = 'offscreen.html';
let offscreenDocumentReady = null;

// Matches both kinds of material QR code, `Custom:<id>` and
// `Custom:<id>|<settings>`.
const CUSTOM_MATERIAL_QR_CODE = /^(Custom:[0-9a-f]{7})(\|[\s\S]*)?$/;

/**
 * Opens the offscreen document that decodes QR codes, unless it is already
 * open. Only one offscreen document may exist at a time.
 */
function setupOffscreenDocument() {
  if (!offscreenDocumentReady) {
    offscreenDocumentReady = (async () => {
      const contexts = await chrome.runtime.getContexts({
        contextTypes: ['OFFSCREEN_DOCUMENT'],
        documentUrls: [chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH)],
      });
      if (contexts.length === 0) {
        await chrome.offscreen.createDocument({
          url: OFFSCREEN_DOCUMENT_PATH,
          reasons: ['WORKERS'],
          justification: 'Decode QR codes in the Glowforge lid camera image using canvas and a web worker.',
        });
      }
    })().finally(() => {
      offscreenDocumentReady = null;
    });
  }
  return offscreenDocumentReady;
}

/**
 * Decodes a QR code from an image in the offscreen document.
 *
 * @param {string} imageUrl The image url to scan.
 */
async function decodeQrCode(imageUrl) {
  await setupOffscreenDocument();
  return chrome.runtime.sendMessage({
    target: 'offscreen',
    type: 'decodeQrCode',
    imageUrl,
  });
}

/**
 * Checks the lid camera image for a custom material QR code.
 *
 * @param {string} image The lid image url.
 * @returns The id of the material to select, or null.
 */
async function checkForQRCode(image) {
  // Older versions of the GFUI used a path on app.glowforge.com, newer ones use
  // a full url.
  const imageUrl = new URL(image, 'https://app.glowforge.com');
  if (imageUrl.protocol !== 'https:') {
    return null;
  }

  const qrCodeData = await decodeQrCode(imageUrl.href);
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

// Machine serials and design ids come from the page, so only accept values
// that look like ids.
const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;

/**
 * Forces the should update flag to be true, creates a one time refresh.
 */
function forceRefresh() {
  return store({
    shouldUpdate: true,
  });
}

/**
 * Updates the currently selected machine.
 */
function handleMachineSerial(message) {
  return storeUISettings({
    serial: IDENTIFIER.test(message.serial) ? message.serial : null,
  });
}

/**
 * Updates the design that is open in the GFUI.
 */
function handleDesignId(message) {
  return storeUISettings({
    loadedDesignId: IDENTIFIER.test(message.designId) ? message.designId : null,
  });
}

/**
 * Handles a message from bridge.js in a Glowforge tab.
 *
 * machineSerial - The selected machine changed.
 * designId - The open design changed.
 * lidImage - The lid camera image changed.
 *
 * @returns The response, the material to select for `lidImage`.
 */
async function handleBridgeMessage(request) {
  log(`message: ${request.type}`);
  if (request.type === 'machineSerial') {
    await handleMachineSerial(request);
  } else if (request.type === 'designId') {
    await handleDesignId(request);
  } else if (request.type === 'lidImage' && typeof request.image === 'string') {
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
  if (request.target !== 'background') {
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

// The service worker starts and stops many times per browser session, so only
// initialize when the extension is installed or updated and when the browser
// starts.
chrome.runtime.onInstalled.addListener(() => initializeStorage());
chrome.runtime.onStartup.addListener(() => initializeStorage());
