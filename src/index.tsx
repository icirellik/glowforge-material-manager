import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  getBytesInUse,
  getPlatform,
  inGlowforgeTab,
  storeMaterials,
  storeRawMaterials,
  getLocalStorage,
} from './lib/chromeWrappers';
import {
  fullSynchronizedMaterials,
  removeCloudMaterial,
  sendCloudMaterial,
  GFMaterial,
  RawMaterial,
} from './lib/material';
import {
  asFloat,
} from './lib/utils';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';

// TODO: Add upgrade to deterministic ids
async function upgrade() {
  return new Promise (resolve => {
    window.chrome.storage.local.get(null, async result => {
      let upgraded = false;
      const _materials = result.materials.map((material: GFMaterial) => {
        if (!material.hasOwnProperty('nominal_thickness') ||
            material.nominal_thickness === null ||
            material.nominal_thickness === parseFloat((material.nominal_thickness as any))
        ) {
          return material;
        }
        upgraded = true;
        return {
          ...material,
          nominal_thickness: asFloat(material.nominal_thickness as any),
        };
      });

      const _rawMaterials = result.rawMaterials.map((rawMaterial: RawMaterial) => {
        if (!rawMaterial.hasOwnProperty('thickness') ||
            rawMaterial.thickness === null ||
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
  const glowforgeConnected = await inGlowforgeTab();
  const platform = await getPlatform();
  await upgrade();
  await fullSynchronizedMaterials();
  const cloudStorageBytesUsed = await getBytesInUse();

  const localStorage = await getLocalStorage();

  ReactDOM.render(<App
    cloudStorageBytesUsed={cloudStorageBytesUsed}
    connected={glowforgeConnected}
    materials={localStorage.materials!}
    platform={platform}
    rawMaterials={localStorage.rawMaterials!}
    shouldUpdate={localStorage.shouldUpdate!}
    tempMaterial={localStorage.tempMaterial}
  />, document.getElementById('root'));

  if (platform === 'mac') {
    setTimeout(() => {
      document.body.style.width = `${document.body.clientWidth + 1}px`;
    }, 250);
  }
})();

// registerServiceWorker();
