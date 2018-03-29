// Develop
// afnbdebmdlcboemglocadnfefkmcobfn
// mncodmmfhiaolnkmjdjdemghkbcbiing
const extensionId = 'afnbdebmdlcboemglocadnfefkmcobfn';

// Webstore Test
// const extensionId = 'oehpknagabkobfeijndckpapicmfoknn';

// Webstore Prod
// const extensionId = 'adabmafjmdcjnihkmggljljeopjfghii';

/**
 * Leverage the redux actions to inject custom materials.
 */
function onResponse(response) {
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
 * Request the materials created by the user in the extension.
 */
setInterval(() => {
  chrome.runtime.sendMessage(
    extensionId, {
      materialCheck: true,
    },
    onResponse
  );
}, 5000);

/**
 * Set a one-time refresh on content injection. New tabs, refreshes.
 */
setTimeout(() => {
  chrome.runtime.sendMessage(
    extensionId, {
      forceRefresh: true,
    },
    () => {}
  );
})
