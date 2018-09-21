/**
 * Browser background task to syncronize the GFUI with the custom materials.
 */
function asFloat(number) {
  return Number.parseFloat(number, 10);
}

function verifyTypes(material) {
  return Object.assign({},
    material, {
      nominal_thickness: asFloat(material.nominal_thickness)
    });
}

function refreshMaterials(callback) {
  chrome.storage.local.get(null, result => {
    if (result && result.materials && result.shouldUpdate) {
      if (callback) {
        callback({
          materials: result.materials.map(verifyTypes),
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

/**
 * Forces the should update flag to be true, creates a one time refresh.
 */
function forceRefresh() {
  // Set a one time refresh on content injection. New tabs, refreshes.
  chrome.storage.local.set({
    'shouldUpdate': true,
  });
}

/**
 * Handle messaging with the Glowforge UI.
 */
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (request.materialCheck) {
      refreshMaterials(sendResponse);
      return true;
    } else if (request.forceRefresh) {
      forceRefresh();
    }
  }
);

chrome.storage.local.get(null, result => {
  if (result && result.materials) {
    // Set a one time load refresh on browser restart.
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
