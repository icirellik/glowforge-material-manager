import QrScanner from './qr-scanner.min.js';
QrScanner.WORKER_PATH = './qr-scanner-worker.min.js';

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
function store(data, cb = null) {
  chrome.storage.local.set(data, cb);
}

/**
 * Helper function to load all data from local storage.
 */
function load(cb) {
  chrome.storage.local.get(null, cb);
}

/**
 * Stores new ui settings.
 */
function storeUISettings(settings) {
  load((results) => {
    if (!results.ui) {
      store({
        ui: settings,
      }, () => {
        log('UI Settings Created');
      });
    } else {
      const ui = {
        ...results.ui,
        ...settings,
      };
      store({
        ui,
      }, () => {
        log('UI Settings Updated');
      });
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


// QR Code
// ===================================================================
const QR_IMAGE_SCALES = [1, 0.9, 0.87, 0.75, 0.6, 0.5, 0.4, 0.25, 0.2, 0.1, 0.05];

/**
 * Takes an image url and converts it to an image data at a 0.25 scale.
 *
 * @param imageUrl The image url to load.
 */
async function urlToImageData(imageUrl, scale) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();

    image.addEventListener('load', () => {
      canvas.width = image.naturalWidth * scale;
      canvas.height = image.naturalHeight * scale;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas);
    }, false);
    image.src = imageUrl;
  });
}

/**
 * Try to read a QR code from an image.
 *
 * @param imageUrl  The image url to scan.
 */
async function readQrCode(imageUrl) {
  return new Promise(async (resolve) => {
    // Worst QR Library ever.
    const imageDataPromises = QR_IMAGE_SCALES.map(scale => Promise.resolve()
      .then(() => urlToImageData(imageUrl, scale))
      .then(imageData => QrScanner.scanImage(imageData))
      .catch(error => console.log(error || 'No QR code found.')));

    const resolvedCodes = await Promise.all(imageDataPromises);
    log(resolvedCodes);

    const code = resolvedCodes.reduce((prev, cur) => ((prev !== null) ? prev : cur), null);
    log(code);
    if (code) {
      resolve(code);
    }
  });
}

// Message Handlers
// ===================================================================

/**
 * Gets the materials from local storage and sends them the to UI for
 * installation.
 */
function refreshMaterials() {
  load((result) => {
    if (result && result.materials && result.shouldUpdate) {
      store({
        shouldUpdate: false,
      }, () => {
        const message = {
          type: 'addMaterials',
          materials: result.materials.map(verifyTypes),
        };

        window.inboundQueue.push(message);
        log(`sending materials: total ${message.materials.length}`);
      });
    } else if (result && result.shouldUpdate) {
      log('clearing shouldUpdate');
      store({
        shouldUpdate: false,
      });
    }
  });
}

/**
 * Forces the should update flag to be true, creates a one time refresh.
 */
function forceRefresh() {
  store({
    shouldUpdate: true,
  });
}

/**
 * Updates the currently selected machine.
 */
function handleMachineSerial(message) {
  if (message.serial) {
    storeUISettings({
      serial: message.serial,
    });
  } else {
    storeUISettings({
      serial: null,
    });
  }
}

/**
 * Updates the list of design ids in local storage.
 */
function handleDesignIdsMessage(message) {
  if (message.designIds && message.designIds.length > 0) {
    storeUISettings({
      loadedDesignId: message.designIds[0],
    });
  } else {
    storeUISettings({
      loadedDesignId: null,
    });
  }
}

/**
 * Check to see if there is a QR Code in the current image and queues a message
 * that will set the materil if one is detected.
 */
async function checkForQRCode(message) {
  const image = `https://app.glowforge.com${message.image}`;

  const qrCodeData = await readQrCode(image);
  log('QR Code Results');
  log(qrCodeData);

  if (qrCodeData && qrCodeData.startsWith('Glowforge')) {
    log('PG Material detected');
  } else if (qrCodeData && qrCodeData.startsWith('Custom')) {
    log('Custom Material detected');
    window.inboundQueue.push({
      type: 'selectMaterial',
      materialId: qrCodeData,
    });
  }
}

/**
 * Handle messaging with the Glowforge UI.
 *
 * If you need to return data from an async method then you must
 * return true from this handler and manually call `sendResponse` with
 * the results.
 *
 * lidImage - Inbound
 * loadedDesignIds - Inbound
 * forceRefresh - Inbound
 *
 * checkMessages - pulls messages from inboundQueu
 */
chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    let data;
    log(`message: ${request.type}`);
    if (request.type === 'lidImage') {
      checkForQRCode(request);
    } else if (request.type === 'machineSerial') {
      handleMachineSerial(request);
    } else if (request.type === 'loadedDesignIds') {
      handleDesignIdsMessage(request);
    } else if (request.type === 'checkMessages') {
      // One check messages call refresh materials to see if we need to queue a
      // material sync message.
      refreshMaterials();

      // Only when checking messages should we relay and inbound message to the
      // GFUI, the other handlers will not nescisarilly respect the response.
      const relayMessages = window.inboundQueue.splice(0);
      if (relayMessages.length > 0) {
        data = {
          messages: relayMessages,
        };
      }
    } else if (request.type === 'forceRefresh') {
      forceRefresh();
    }

    // Always call send response
    sendResponse(data);
    return false;
  },
);

/**
 * Initialize the background process and local storage. If local
 * storage has already been initialized then we set `shouldUpdate` to
 * true to force UI sync.
 */
load((result) => {
  log('verifying local storage.');
  if (result && result.materials) {
    log('local storage previously initialized.');
    forceRefresh();
  } else {
    log('initalizing local storage.');
    store({
      materials: [],
      rawMaterials: [],
      shouldUpdate: false,
    }, () => {
      log('local storage is initialized.');
    });
  }
});

// Handle messaging with the react app.

// Basic message queue for allowing request to come in from the app.
window.inboundQueue = [];

// Basic message queue for holding messages to be sent to the app.
window.outboundQueue = [];
