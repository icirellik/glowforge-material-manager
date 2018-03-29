// Develop:
// Automatically set using your the runtime.
//
// Webstore Test:
// const extensionId = 'oehpknagabkobfeijndckpapicmfoknn';
//
// Webstore Prod:
// const extensionId = 'adabmafjmdcjnihkmggljljeopjfghii';
const extensionId = window.extensionId;

/**
 * Leverage the redux actions to inject custom materials.
 */
function handleMaterialCheck(response) {
  if (!response) {
    return;
  }

  if (response.materials) {
    window.store.dispatch({
      type: "ADD_MATERIALS",
      materials: response.materials
    });
  } else if (response.material) {
    window.store.dispatch({
      type: "ADD_MATERIAL",
      material: response.material
    });
  }
}

/**
 * Additional tasks to execute after the first refresh.
 */
function handleForceRefresh(response) {
  if (!response) {
    return;
  }
}

/**
 * Checks and displays any runtime errors.
 */
function lastRuntimeError() {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError);
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
    handleMaterialCheck,
  );
  lastRuntimeError();
}, 5000);

/**
 * Set a one-time refresh on content injection. New tabs, refreshes.
 */
setImmediate(() => {
  chrome.runtime.sendMessage(
    extensionId, {
      forceRefresh: true,
    },
    handleForceRefresh,
  );
  lastRuntimeError();
});
