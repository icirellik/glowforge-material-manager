/* global chrome:true */

async function getMaterials() {
  return new Promise(resolve => {
    chrome.storage.local.get(null, result => {
      if (result && result.materials) {
        resolve(result.materials);
      } else {
        resolve([]);
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
        resolve([]);
      }
    });
  });
}

async function getTempMaterial() {
  return new Promise(resolve => {
    chrome.storage.local.get(null, result => {
      if (result && result.tempMaterial) {
        resolve(result.tempMaterial);
      } else {
        resolve({});
      }
    });
  });
}

async function getShouldUpdate() {
  return new Promise(resolve => {
    chrome.storage.local.get(null, result => {
      if (result && result.shouldUpdate) {
        resolve(result.shouldUpdate);
      } else {
        resolve(false);
      }
    });
  });
}
async function storeMaterials(materials) {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'materials': materials,
      'shouldUpdate': true,
    }, () => {
      resolve(materials);
    });
  });
}

async function storeRawMaterials(rawMaterials) {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'rawMaterials': rawMaterials,
      'shouldUpdate': true,
    }, () => {
      resolve(rawMaterials);
    });
  });
}

async function storeTempMaterial(material) {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'tempMaterial': material,
    }, () => {
      resolve(material);
    });
  });
}

async function clearTempMaterial() {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'tempMaterial': null,
    }, () => {
      resolve(true);
    });
  });
}

async function forceSync() {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'shouldUpdate': true,
    }, () => {
      resolve(true);
    });
  });
}

async function inGlowforgeTab() {
  return new Promise(resolve => {
    chrome.tabs.query({
      'active': true,
      'lastFocusedWindow': true
    }, (tabs) => {
      resolve(tabs[0].url.indexOf('app.glowforge.com') !== -1);
    });
  });
}

async function reload() {
  return new Promise(async resolve => {
    if (await inGlowforgeTab()) {
      chrome.tabs.reload(null, { bypassCache: true }, () => {
        resolve();
      });
    } else {
      resolve();
    }
  });
}

export {
  clearTempMaterial,
  forceSync,
  getMaterials,
  getRawMaterials,
  getShouldUpdate,
  getTempMaterial,
  reload,
  storeMaterials,
  storeRawMaterials,
  storeTempMaterial,
}
