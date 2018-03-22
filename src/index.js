/* global chrome:true */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  getBytesInUse,
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
    await fullSynchronizedMaterials();
    const cloudStorageBytesUsed = await getBytesInUse();
    chrome.storage.local.get(null, result => {
      ReactDOM.render(<App
        connected={glowforgeConnected}
        cloudStorageBytesUsed={cloudStorageBytesUsed}
        materials={result.materials}
        rawMaterials={result.rawMaterials}
        shouldUpdate={result.shouldUpdate}
        tempMaterial={result.tempMaterial}
      />, document.getElementById('root'));
    });
  });
})();

// registerServiceWorker();
