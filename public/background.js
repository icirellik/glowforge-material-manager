/**
 * Browser background task to syncronize the GFUI with the custom materials.
 */

function refreshMaterials(callback) {
  chrome.storage.local.get(null, result => {
    if (result && result.materials && result.shouldUpdate) {
      if (callback) {
        callback({
          materials: result.materials
        });
        chrome.storage.local.set({
          'shouldUpdate': false,
        });
        console.log('Refreshed materials: ' + result.materials.length);
      }
    } else if (result && result.shouldUpdate) {
      chrome.storage.local.set({
        'shouldUpdate': false,
      });
    }
  });
}

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    refreshMaterials(sendResponse);
    return true;
  }
);

chrome.storage.local.get(null, result => {
  if (result && result.materials) {
    // Set a one time load refresh.
    chrome.storage.local.set({
      'shouldUpdate': true,
    });
    console.log('Storage already initialized.');
  } else {
    console.log('Initalizing storage.');
    chrome.storage.local.set({
      'materials': [],
      'rawMaterials': [],
      'shouldUpdate': false,
    }, function() {
      console.log('Storage is initialized.');
    });
  }
  console.log('Storage loaded.');
});
