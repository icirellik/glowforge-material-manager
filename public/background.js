/**
 * Only log messages in development mode.
 */
function log(message) {
  if (!('update_url' in chrome.runtime.getManifest())) {
    console.log(message);
  }
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
 * Deprecated.
 */
function verifyTypes(material) {
  return Object.assign({}, material, {
    nominal_thickness: asFloat(material.nominal_thickness),
  });
}

/**
 * Gets the materials from local storage and sends them the to UI for
 * installation.
 */
function refreshMaterials(relayMessages, callback) {
  chrome.storage.local.get(null, (result) => {
    const response = {
      messages: relayMessages,
    };
    if (result && result.materials && result.shouldUpdate) {
      const message = {
        type: 'setMaterials',
        materials: result.materials.map(verifyTypes),
      };
      response.messages.push(message);
      chrome.storage.local.set({
        shouldUpdate: false,
      });
      log(`sending materials: ${message.materials.length}`);
    } else if (result && result.shouldUpdate) {
      log('clearing shouldUpdate');
      chrome.storage.local.set({
        shouldUpdate: false,
      });
    }
    if (callback) {
      callback(response);
    }
  });
}

/**
 * Forces the should update flag to be true, creates a one time refresh.
 */
function forceRefresh() {
  // Set a one time refresh on content injection. New tabs, refreshes.
  chrome.storage.local.set({
    shouldUpdate: true,
  });
}

/**
 * Handle messaging with the Glowforge UI.
 */
chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    const relayMessages = window.inboundQueue.splice(0);

    if (request.type === 'lidImage') {
      log('lidImage message');
      window.outboundQueue.push(request);
    } else if (request.type === 'materialCheck') {
      log('refreshMaterials message');
      refreshMaterials(relayMessages, sendResponse);
      return true;
    } else if (request.type === 'forceRefresh') {
      log('forceRefresh message');
      forceRefresh();
    } else {
      log('unknown message');
    }

    if (relayMessages.length > 0) {
      sendResponse({
        messages: relayMessages,
      });
    } else {
      sendResponse();
    }
    return false;
  },
);

/**
 * Initialize the background process and local storage.
 */
chrome.storage.local.get(null, (result) => {
  if (result && result.materials) {
    // Set a one time load refresh on browser restart.
    chrome.storage.local.set({
      shouldUpdate: true,
    });
    log('Storage already initialized.');
  } else {
    log('Initalizing storage.');
    chrome.storage.local.set({
      materials: [],
      rawMaterials: [],
      shouldUpdate: false,
    }, () => {
      log('Storage is initialized.');
    });
  }
  log('Storage loaded.');
});

// Handle messaging with the react app.

// Basic message queue for allowing request to come in from the app.
window.inboundQueue = [];

// Basic message queue for holding messages to be sent to the app.
window.outboundQueue = [];
