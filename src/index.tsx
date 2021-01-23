import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  getPlatform,
  inGlowforgeTab,
} from './lib/chromeWrappers';
import {
  syncronizeMaterials,
} from './material/material.sync';
import './index.css';
import { default as migration2 } from './migrations/2-backup-materials';
import { default as migration3 } from './migrations/3-update-ids';
import { default as migration4 } from './migrations/4-add-sync-property';

async function applyMigrations() {
  await migration2();
  await migration3();
  await migration4();
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
  await syncronizeMaterials();

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
