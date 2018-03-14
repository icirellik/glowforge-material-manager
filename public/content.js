function onAccessApproved(response) {
  if (response.material) {
    window.store.dispatch({
      type: "ADD_MATERIAL",
      material: response.material
    });
  }
}

chrome.runtime.sendMessage(
  "mncodmmfhiaolnkmjdjdemghkbcbiing",
  { greeting: "yes" },
  onAccessApproved
);
