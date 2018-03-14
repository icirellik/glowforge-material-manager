function onResponse(response) {
  console.log(response)
  if (response.material) {
    window.store.dispatch({
      type: "ADD_MATERIAL",
      material: response.material
    });
  }
}

chrome.runtime.sendMessage(
  "mncodmmfhiaolnkmjdjdemghkbcbiing",
  {  },
  onResponse
);

/**
 * Request the materials created by the user in the extension.
 */
setInterval(function() {

}, 3000);
