// Develop:
// Automatically set using your the runtime.
//
// Webstore Test:
// const extensionId = 'oehpknagabkobfeijndckpapicmfoknn';
//
// Webstore Prod:
// const extensionId = 'adabmafjmdcjnihkmggljljeopjfghii';
const { extensionId } = window;

function log(message) {
  if (window.extensionDevMode) {
    console.log(message);
  }
}

/**
 * Leverage the redux actions to inject custom materials.
 */
function handleMaterialCheck(response) {
  log('material check response');
  if (!response) {
    return;
  }

  if (response.materials) {
    log('updating materials');
    window.store.dispatch({
      type: 'ADD_MATERIALS',
      materials: response.materials,
    });
  } else if (response.material) {
    log('updating material');
    window.store.dispatch({
      type: 'ADD_MATERIAL',
      material: response.material,
    });
  }
}

/**
 * Additional tasks to execute after the first refresh.
 */
function handleForceRefresh() {
  log('force refresh response');
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
 * Request the materials created by the user in the extension.
 */
setInterval(() => {
  chrome.runtime.sendMessage(
    extensionId, {
      materialCheck: true,
    },
    (response) => {
      handleMaterialCheck(response);
      checkLastRuntimeError();
    },
  );
}, 5000);

/**
 * Set a one-time refresh on content injection. New tabs, refreshes.
 *
 * Sets shouldUpdate to true.
 */
setTimeout(() => {
  chrome.runtime.sendMessage(
    extensionId, {
      forceRefresh: true,
    },
    (response) => {
      handleForceRefresh(response);
      checkLastRuntimeError();
    },
  );
}, 0);
