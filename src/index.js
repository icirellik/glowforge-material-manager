/* global chrome:true */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  getBytesInUse,
  getPlatform,
  inGlowforgeTab,
  storeMaterials,
  storeRawMaterials,
} from './lib/chromeWrappers';
import {
  fullSynchronizedMaterials,
  removeCloudMaterial,
  sendCloudMaterial,
} from './lib/material';
import {
  asFloat,
} from './lib/utils';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';

async function upgrade() {
  return new Promise (resolve => {
    chrome.storage.local.get(null, async result => {
      let upgraded = false;
      const _materials = result.materials.map(material => {
        if (material.nominal_thickness === null ||
            material.nominal_thickness === parseFloat(material.nominal_thickness)
        ) {
          return material;
        }
        upgraded = true;
        return {
          ...material,
          nominal_thickness: asFloat(material.nominal_thickness),
        };
      });

      const _rawMaterials = result.rawMaterials.map(rawMaterial => {
        if (rawMaterial.thickness === null ||
            rawMaterial.thickness === parseFloat(rawMaterial.thickness)
        ) {
          return rawMaterial;
        }
        upgraded = true;
        return {
          ...rawMaterial,
          thickness: asFloat(rawMaterial.thickness),
        };
      });

      if (upgraded) {
        console.log('upgraded');
        await storeMaterials(_materials);
        await storeRawMaterials(_rawMaterials);

        for (const rawMaterial of result.rawMaterials) {
          await removeCloudMaterial(rawMaterial);
        }
        for (const _rawMaterial of _rawMaterials) {
          await sendCloudMaterial(_rawMaterial);
        }
      }

      resolve();
    });
  });
}

(async () => {
  chrome.tabs.query({
    'active': true,
    'lastFocusedWindow': true
  }, async (tabs) => {
    const glowforgeConnected = await inGlowforgeTab();
    const platform = await getPlatform();
    await upgrade();
    await fullSynchronizedMaterials();
    const cloudStorageBytesUsed = await getBytesInUse();

    chrome.storage.local.get(null, async result => {
      ReactDOM.render(<App
        cloudStorageBytesUsed={cloudStorageBytesUsed}
        connected={glowforgeConnected}
        materials={result.materials}
        platform={platform}
        rawMaterials={result.rawMaterials}
        shouldUpdate={result.shouldUpdate}
        tempMaterial={result.tempMaterial}
      />, document.getElementById('root'));
    });

    if (platform === 'mac') {
      setTimeout(() => {
        document.body.style.width = `${document.body.clientWidth + 1}px`;
      }, 250);
    }
  });
})();

// registerServiceWorker();
