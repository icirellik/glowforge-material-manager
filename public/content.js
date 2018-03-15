const extensionId = 'mncodmmfhiaolnkmjdjdemghkbcbiing';

function onResponse(response) {
  console.log('Checking for materials');
  console.log(response)
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
}, 3000);
