/* global chrome:true */

async function getMaterials() {
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

async function getRawMaterials() {
  return new Promise(resolve => {
    chrome.storage.local.get(null, result => {
      if (result && result.rawMaterials) {
        resolve(result.rawMaterials);
      } else {
        resolve([])
      }
    });
  });
}

async function storeMaterials(materials) {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'materials': materials,
      'shouldUpdate': true,
    }, function() {
      resolve(materials);
    });
  });
}

async function storeRawMaterials(rawMaterials) {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'rawMaterials': rawMaterials,
      'shouldUpdate': true,
    }, function() {
      resolve(rawMaterials);
    });
  });
}


async function reload() {
  return new Promise(resolve => {
    chrome.tabs.reload(null, { bypassCache: true }, () => {
      resolve();
    });
  })
}

export {
  getMaterials,
  getRawMaterials,
  storeMaterials,
  storeRawMaterials,
  reload,
}
