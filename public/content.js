// Develop
const extensionId = 'mncodmmfhiaolnkmjdjdemghkbcbiing';

// Webstore
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
    extensionId,
    {  },
    onResponse
  );
}, 5000);
