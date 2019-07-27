/** @typedef {import("./types").ReduxStore} ReduxStore */
/** @typedef {import("./types").Window} WindowExt */
/** @typedef {Window & WindowExt} ExtendedWindow */

/**
 * @type {ExtendedWindow}
 */
const localWindow = (window);

// Develop:
// Automatically set using your the runtime.
//
// Webstore Test:
// const extensionId = 'oehpknagabkobfeijndckpapicmfoknn';
//
// Webstore Prod:
// const extensionId = 'adabmafjmdcjnihkmggljljeopjfghii';
const { extensionId } = localWindow;

function log(message) {
  if (localWindow.extensionDevMode) {
    // eslint-disable-next-line
    console.log(message);
  }
}

/**
 * Sets the units in the GF UI
 *
 * @param unitType Either `METRIC` or `IMPERIAL`
 */
function setUnits(unitType) {
  localWindow.store.dispatch({
    type: 'SET_UNITS',
    unitType,
  });
}

/**
 * Sets the selected material.
 *
 * @param materialId The material id.
 */
function setMaterial(materialId) {
  localWindow.store.dispatch({
    type: 'SET_MATERIAL',
    id: materialId,
  });
}

/**
 * Adds a single material to the UI.
 *
 * @param material The material to add.
 */
function addMaterial(material) {
  localWindow.store.dispatch({
    type: 'ADD_MATERIAL',
    material,
  });
}

/**
 * Add many materials to the UI.
 *
 * @param materials An array of materials to add.
 */
function addMaterials(materials) {
  localWindow.store.dispatch({
    type: 'ADD_MATERIALS',
    materials,
  });
}

/**
 * Leverage the redux actions to inject custom materials.
 */
function handleMessages(response) {
  if (!response || !response.messages) {
    return;
  }

  for (let i = 0; i < response.messages.length; i += 1) {
    const message = response.messages[i];
    if (!message) {
      return;
    }

    if (message.type === 'addMaterials') {
      log('adding custom materials');
      addMaterials(message.materials);
    } else if (message.type === 'addMaterial') {
      log('adding custom material');
      addMaterial(message.material);
    } else if (message.type === 'clone') {
      log('cloning design');
      // TODO: Clone design
    } else if (message.type === 'toggleUnits') {
      log('toggle units');
      setUnits(message.unitType);
    } else if (message.type === 'selectMaterial') {
      log('setting the selected material');
      setMaterial(message.materialId);
    } else {
      log('unknown message');
    }
  }
}

/**
 * Checks and displays any runtime errors.
 */
function checkLastRuntimeError() {
  if (chrome.runtime.lastError) {
    log(`Last seen error: ${chrome.runtime.lastError.message}`);
    chrome.runtime.lastError = null;
  }
}

/**
 * Sends a message to the chrome background process.
 *
 * @param message The message.
 * @param callback The response handler.
 */
function sendBackgroundMessage(message, callback) {
  chrome.runtime.sendMessage(
    extensionId,
    message,
    (response) => {
      callback(response);
    },
  );
}

/**
 * Request the materials created by the user in the extension.
 */
setInterval(() => {
  log('message - checkMessages');
  sendBackgroundMessage({
    type: 'checkMessages',
  }, (response) => {
    handleMessages(response);
    checkLastRuntimeError();
  });
}, 750);

/**
 * Set a one-time refresh on content injection. New tabs, refreshes.
 *
 * Sets shouldUpdate to true.
 */
setTimeout(() => {
  log('message - forceRefresh');
  sendBackgroundMessage({
    type: 'forceRefresh',
  }, () => {
    log('force refresh response');
    checkLastRuntimeError();
  });
}, 0);

/**
 *
 */
let prevMachineSerial = null;
function checkMachineSerial(machineSerial) {
  if (!machineSerial) {
    prevMachineSerial = null;
    return;
  }

  if (machineSerial !== prevMachineSerial) {
    log('message - machineSerial');
    sendBackgroundMessage({
      type: 'machineSerial',
      serial: machineSerial,
    }, () => {
      log('machineSerial - success');
      checkLastRuntimeError();
    });
    prevMachineSerial = machineSerial;
  }
}

/**
 * Checks if the lid image has changed and if so, informs the app.
 *
 * Always check when the page loads, then only check when the image bed is
 * invalidated.
 */
let prevPreloadedLidImage = null;
let lidImageFirstLoad = true;
function checkLidImage(preloadedLidImage, isInvalidated) {
  if (!lidImageFirstLoad && !isInvalidated) {
    prevPreloadedLidImage = null;
    return;
  }
  if (!preloadedLidImage) {
    prevPreloadedLidImage = null;
    return;
  }

  if (preloadedLidImage !== prevPreloadedLidImage) {
    log('message - lidImage');
    sendBackgroundMessage({
      type: 'lidImage',
      image: preloadedLidImage,
    }, () => {
      log('lidImage - success');
      checkLastRuntimeError();
    });
    prevPreloadedLidImage = preloadedLidImage;
    lidImageFirstLoad = false;
  }
}

/**
 * checks is the loaded designs have changed and if so informs the app.
 */
let prevLoadedDesignIds = [];
function checkLoadedDesignIds(loadedDesignIds) {
  if (!loadedDesignIds || loadedDesignIds.length === 0) {
    prevLoadedDesignIds = [];
    return;
  }

  let diff = false;
  if (loadedDesignIds.length === prevLoadedDesignIds.length) {
    for (let i = 0; i < loadedDesignIds.length; i += 1) {
      if (loadedDesignIds[i] !== prevLoadedDesignIds[i]) {
        diff = true;
        break;
      }
    }
  } else {
    diff = true;
  }

  if (diff) {
    log('message - loadedDesignIds');
    sendBackgroundMessage({
      type: 'loadedDesignIds',
      designIds: loadedDesignIds,
    }, () => {
      log('loadedDesignIds - success');
      checkLastRuntimeError();
    });
    prevLoadedDesignIds = Array.from(loadedDesignIds);
  }
}


function storeListener() {
  try {
    const state = localWindow.store.getState().toJSON();

    // Detect selected machine changes.
    if (
      state.machines
      && state.machines.selectedMachineSerial
    ) {
      checkMachineSerial(state.machines.selectedMachineSerial);
    }

    // If there is at least on machine attempt to detect a QR code in the bed.
    if (
      state.machines
      && state.machines.selectedMachineSerial
      && Object.keys(state.machines.machineMap).length > 0
    ) {
      const { selectedMachineSerial } = state.machines;
      const { preloadedLidImage, bedImage } = state.machines.machineMap[selectedMachineSerial];
      checkLidImage(preloadedLidImage, bedImage.isInvalidated);
    }

    // Track the different loaded designs so that we can download the trace.
    if (
      state.workspace
      && state.workspace.present
    ) {
      const present = state.workspace.present.toJSON();
      if (present.loadedDesignIds.length > 0) {
        checkLoadedDesignIds(present.loadedDesignIds);
      }
    }
  } catch (e) {
    // Don't send my errors to GlowForge.
    log(`store error: ${e}`);
  }
}

/**
 * Subscribe to redux store changes.
 */
localWindow.store.subscribe(storeListener);
