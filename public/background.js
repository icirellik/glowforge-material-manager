let materials;

function refreshMaterials() {
  chrome.storage.local.get(null, result => {
    console.log('Refreshing materials.');
    console.log(result);
    if (result && result.materials) {
      materials = result.materials;
    }
  });
}

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    sendResponse({
      materials: materials
    });

    // Refresh incase anything new was added in the app.
    refreshMaterials();
  }
);

chrome.storage.local.get(null, result => {
  console.log('Verifying Storage');
  console.log(result);
  if (result && result.materials) {
    materials = result.materials;
  } else {
    console.log('Initalizing storage.');
    chrome.storage.local.set({
      'materials': [],
      'rawMaterials': []
    }, function() {
      console.log('Storage is initialized.');
    });
    return;
  }
  console.log('Storage is initialized ' + result.materials);
});
