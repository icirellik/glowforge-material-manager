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

/**
 * Browser background task to synchronize the GFUI with the custom materials.
 */
function asFloat(number) {
  return Number.parseFloat(number, 10);
}

/**
 * Used to convert old floats stored as a string to real floats.
 *
 * TODO: Deprecated can be removed one 0.4.x is released.
 */
function verifyTypes(material) {
  return Object.assign({}, material, {
    nominal_thickness: asFloat(material.nominal_thickness),
  });
}

// Message Queue
// ===================================================================

// The service worker is stopped when idle, so messages waiting to be relayed
// to the GFUI are kept in session storage instead of memory.
const runInboundQueueUpdate = createSerialRunner();

/**
 * Replaces the queued messages with the result of `update`.
 *
 * @returns The messages that were queued before the update.
 */
function updateInboundQueue(update) {
  return runInboundQueueUpdate(async () => {
    const { inboundQueue = [] } = await chrome.storage.session.get('inboundQueue');
    await chrome.storage.session.set({
      inboundQueue: update(inboundQueue),
    });
    return inboundQueue;
  });
}

/**
 * Queues a message to be relayed to the GFUI.
 */
function queueMessage(message) {
  return updateInboundQueue(queue => [...queue, message]);
}

/**
 * Removes and returns all of the queued messages.
 */
function takeQueuedMessages() {
  return updateInboundQueue(() => []);
}

// QR Code
// ===================================================================
const OFFSCREEN_DOCUMENT_PATH = 'offscreen.html';
let offscreenDocumentReady = null;

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

// Message Handlers
// ===================================================================

/**
 * Gets the materials from local storage and queues them for the UI for
 * installation.
 */
async function refreshMaterials() {
  const result = await load();
  if (result && result.materials && result.shouldUpdate) {
    await store({
      shouldUpdate: false,
    });
    const message = {
      type: 'addMaterials',
      materials: result.materials.map(verifyTypes),
    };

    await queueMessage(message);
    log(`sending materials: total ${message.materials.length}`);
  } else if (result && result.shouldUpdate) {
    log('clearing shouldUpdate');
    await store({
      shouldUpdate: false,
    });
  }
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
 * Updates the currently selected machine.
 */
function handleMachineSerial(message) {
  if (message.serial) {
    return storeUISettings({
      serial: message.serial,
    });
  }
  return storeUISettings({
    serial: null,
  });
}

/**
 * Updates the list of design ids in local storage.
 */
function handleDesignIdsMessage(message) {
  if (message.designIds && message.designIds.length > 0) {
    return storeUISettings({
      loadedDesignId: message.designIds[0],
    });
  }
  return storeUISettings({
    loadedDesignId: null,
  });
}

/**
 * Check to see if there is a QR Code in the current image and queues a message
 * that will set the materil if one is detected.
 */
async function checkForQRCode(message) {
  const imageUrl = `https://app.glowforge.com${message.image}`;
  const qrCodeData = await decodeQrCode(imageUrl);
  log('QR Code Results');
  log(qrCodeData);

  if (qrCodeData && qrCodeData.startsWith('Glowforge')) {
    log('PG Material detected');
  } else if (qrCodeData && qrCodeData.startsWith('Custom')) {
    log('Custom Material detected');
    await queueMessage({
      type: 'selectMaterial',
      materialId: qrCodeData,
    });
  }
}

/**
 * Handles a message from the Glowforge UI.
 *
 * lidImage - Inbound
 * loadedDesignIds - Inbound
 * forceRefresh - Inbound
 *
 * checkMessages - pulls messages from inboundQueue
 *
 * @returns The response to send back to the GFUI.
 */
async function handleExternalMessage(request) {
  log(`message: ${request.type}`);
  if (request.type === 'lidImage') {
    // Decoding can be slow, don't hold up the response.
    checkForQRCode(request).catch(error => log(error));
  } else if (request.type === 'machineSerial') {
    await handleMachineSerial(request);
  } else if (request.type === 'loadedDesignIds') {
    await handleDesignIdsMessage(request);
  } else if (request.type === 'checkMessages') {
    // One check messages call refresh materials to see if we need to queue a
    // material sync message.
    await refreshMaterials();

    // Only when checking messages should we relay and inbound message to the
    // GFUI, the other handlers will not nescisarilly respect the response.
    const relayMessages = await takeQueuedMessages();
    if (relayMessages.length > 0) {
      return {
        messages: relayMessages,
      };
    }
  } else if (request.type === 'forceRefresh') {
    await forceRefresh();
  }
  return undefined;
}

/**
 * Handle messaging with the Glowforge UI.
 *
 * The handlers are async, so we must return true and call `sendResponse`
 * once they finish.
 */
chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    handleExternalMessage(request)
      .catch((error) => {
        log(error);
        return undefined;
      })
      // Always call send response
      .then(sendResponse);
    return true;
  },
);

/**
 * Handle messaging with the react app.
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.target !== 'background') {
    return false;
  }

  if (request.type === 'queueMessage') {
    queueMessage(request.message)
      .catch(error => log(error))
      .then(() => sendResponse());
    return true;
  }
  return false;
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
