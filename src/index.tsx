import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  getPlatform,
  inGlowforgeTab,
  storeGlowforgeMaterials,
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
import { GFMaterial } from './lib/materialGlowforge';
import { PluginMaterial } from './lib/materialRaw';
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

      const _rawMaterials = result.rawMaterials.map((rawMaterial: PluginMaterial) => {
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
        await storeGlowforgeMaterials(_materials);
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
  // Verify the glowforge tab.
  const glowforgeConnected = await inGlowforgeTab();

  // Get the platform we are on.
  const platform = await getPlatform();

  // Attempt to run any ugrade scripts.
  await upgrade();

  // Run a full syncronization with remote storage. This is kept fast because
  // chrome caches this data locally is it hasn't changed.
  await fullSynchronizedMaterials();

  ReactDOM.render(<App
    connected={glowforgeConnected}
    platform={platform}
  />, document.getElementById('root'));

  if (platform === 'mac') {
    setTimeout(() => {
      document.body.style.width = `${document.body.clientWidth + 1}px`;
    }, 250);
  }
})();

// registerServiceWorker();
