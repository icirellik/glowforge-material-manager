/* global chrome:true */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';

chrome.tabs.query({
  'active': true,
  'lastFocusedWindow': true
}, (tabs) => {
  const glowforgeConnected = tabs[0].url.indexOf('app.glowforge.com') !== -1;
  chrome.storage.local.get(null, result => {
    console.log('Refreshing materials.');
    console.log(result);
    ReactDOM.render(<App
      connected={glowforgeConnected}
      materials={result.materials}
      rawMaterials={result.rawMaterials}
    />, document.getElementById('root'));
  });
});

// registerServiceWorker();
