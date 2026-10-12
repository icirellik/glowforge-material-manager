import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { getPlatform } from './lib/chromeWrappers';
import { syncronizeMaterials } from './material/material.sync';
import './index.css';
import { migration2 } from './migrations/2-backup-materials';
import { migration3 } from './migrations/3-update-ids';
import { migration4 } from './migrations/4-add-sync-property';
import { migration5 } from './migrations/5-cloud-format';

async function applyMigrations() {
  await migration2();
  await migration3();
  await migration4();
  // The cloud format can't stop the popup opening. It tries again next
  // time.
  try {
    await migration5();
  } catch (error) {
    console.error("migration '#5' failed", error);
  }
}

(async () => {
  // Get the platform we are on.
  const platform = await getPlatform();

  // Attempt to run any ugrade scripts.
  await applyMigrations();

  // Run a full syncronization with remote storage. This is kept fast because
  // chrome caches this data locally is it hasn't changed.
  await syncronizeMaterials();

  ReactDOM.render(<App platform={platform} />, document.getElementById('root'));

  if (platform === 'mac') {
    setTimeout(() => {
      document.body.style.width = `${document.body.clientWidth + 1}px`;
    }, 250);
  }
})();
