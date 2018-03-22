/* global chrome:true */

export async function clearTempMaterial() {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'tempMaterial': null,
    }, () => {
      resolve(true);
    });
  });
}

export async function getBytesInUse() {
  return new Promise(resolve => {
    chrome.storage.sync.getBytesInUse(null, bytesInUse => {
      resolve(bytesInUse);
    });
  });
}

export async function getMaterials() {
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

export async function getRawMaterials() {
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

export async function getSynchronizedMaterials() {
  return new Promise(resolve => {
    chrome.storage.sync.get(null, result => {
      if (result) {
        resolve(result);
      } else {
        resolve([]);
      }
    });
  });
}

export async function getTempMaterial() {
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

export async function getShouldUpdate() {
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

export async function removeSynchronizedMaterial(materialHash) {
  return new Promise(resolve => {
    chrome.storage.sync.remove(materialHash, () => {
      resolve(materialHash);
    });
  });
}

export async function storeMaterials(materials) {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'materials': materials,
      'shouldUpdate': true,
    }, () => {
      resolve(materials);
    });
  });
}

export async function storeRawMaterials(rawMaterials) {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'rawMaterials': rawMaterials,
      'shouldUpdate': true,
    }, () => {
      resolve(rawMaterials);
    });
  });
}

export async function storeSynchronizedMaterial(hash, material) {
  return new Promise(resolve => {
    chrome.storage.sync.set({
      [hash]: material,
    }, () => {
      chrome.storage.sync.getBytesInUse(null, bytesInUse => {
        console.log(`cloud bytes in use ${bytesInUse}`);
        resolve(hash);
      });
    });
  });
}

export async function storeTempMaterial(material) {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'tempMaterial': material,
    }, () => {
      resolve(material);
    });
  });
}

export async function forceSync() {
  return new Promise(resolve => {
    chrome.storage.local.set({
      'shouldUpdate': true,
    }, () => {
      resolve(true);
    });
  });
}

export async function inGlowforgeTab() {
  return new Promise(resolve => {
    chrome.tabs.query({
      'active': true,
      'lastFocusedWindow': true
    }, (tabs) => {
      resolve(tabs[0].url.indexOf('app.glowforge.com') !== -1);
    });
  });
}

export async function reload() {
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
