/* global chrome:true */

/**
 * Promisify getting materials.
 */
async function getStoredMaterials() {
  return new Promise(resolve => {
    chrome.storage.local.get(null, result => {
      if (result && result.materials) {
        resolve(result.materials);
      } else {
        resolve([])
      }
    });
  });
}

/**
 * Promisify storage.
 */
async function setStoredMaterials(materials) {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'materials': materials
    }, function() {
      resolve(materials);
    });
  });
}

/**
 * Reloads the main page.
 */
async function reload() {
  return new Promise(resolve => {
    chrome.tabs.reload(null, { bypassCache: true }, () => {
      resolve();
    });
  })
}

export {
  getStoredMaterials,
  setStoredMaterials,
  reload,
}
