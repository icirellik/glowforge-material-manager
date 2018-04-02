/* global chrome:true */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  getBytesInUse,
  getPlatform,
  inGlowforgeTab,
} from './lib/chromeWrappers';
import {
  fullSynchronizedMaterials,
} from './lib/material';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';

(async () => {
  chrome.tabs.query({
    'active': true,
    'lastFocusedWindow': true
  }, async (tabs) => {
    const glowforgeConnected = await inGlowforgeTab();
    const platform = await getPlatform();
    await fullSynchronizedMaterials();
    const cloudStorageBytesUsed = await getBytesInUse();

    chrome.storage.local.get(null, result => {
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
