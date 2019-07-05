import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  getPlatform,
  inGlowforgeTab,
} from './lib/chromeWrappers';
import {
  fullSynchronizedMaterials,
} from './material/material';
import './index.css';
import {default as migration3 } from './migrations/3-update-ids';

async function applyMigrations() {
  await migration3();
}

(async () => {
  // Verify the glowforge tab.
  const glowforgeConnected = await inGlowforgeTab();

  // Get the platform we are on.
  const platform = await getPlatform();

  // Attempt to run any ugrade scripts.
  await applyMigrations();

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
