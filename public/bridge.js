/**
 * Relays messages between the extension and content.js. content.js runs in the
 * Glowforge page so that it can use the page's Redux store, but it can't use
 * the extension APIs, so this isolated content script does that for it.
 */
const CHANNEL = 'glowforge-material-manager';

/**
 * Only log messages in development mode.
 */
const DEV_MODE = !('update_url' in chrome.runtime.getManifest());
function log(message) {
  if (DEV_MODE) {
    // eslint-disable-next-line
    console.log(message);
  }
}

/**
 * Sends a message to content.js.
 */
function postToPage(type, data = {}) {
  window.postMessage({
    channel: CHANNEL,
    to: 'page',
    type,
    devMode: DEV_MODE,
    ...data,
  }, window.location.origin);
}

/**
 * Sends a message to the background service worker.
 */
function sendToBackground(type, data) {
  return chrome.runtime.sendMessage({
    target: 'background',
    type,
    ...data,
  });
}

function asFloat(number) {
  return Number.parseFloat(number, 10);
}

/**
 * Fixes up materials saved by older versions. Thicknesses were stored as
 * strings and some ids had the `Custom:` prefix twice.
 */
function normalizeMaterial(material) {
  return Object.assign({}, material, {
    id: `Custom:${String(material.id).replace(/^(Custom:)+/, '')}`,
    nominal_thickness: asFloat(material.nominal_thickness),
  });
}

/**
 * Sends the custom materials to the page to be added to the GFUI.
 */
async function sendMaterials() {
  const { materials = [] } = await chrome.storage.local.get('materials');
  log(`sending materials: total ${materials.length}`);
  postToPage('materials', {
    materials: materials.map(normalizeMaterial),
  });
}

/**
 * Marks the GFUI as synchronized once the page has every custom material.
 */
async function markSynchronized() {
  const { shouldUpdate } = await chrome.storage.local.get('shouldUpdate');
  if (shouldUpdate) {
    await chrome.storage.local.set({
      shouldUpdate: false,
    });
  }
}

/**
 * Handles a message from content.js.
 *
 * ready - The page's store is available, send it the materials.
 * materialsApplied - Every custom material is in the GFUI.
 * machineSerial - The selected machine changed.
 * designId - The open design changed.
 * lidImage - The lid camera image changed, check it for a QR code.
 */
async function handlePageMessage(message) {
  if (message.type === 'ready') {
    await sendMaterials();
  } else if (message.type === 'materialsApplied') {
    await markSynchronized();
  } else if (message.type === 'machineSerial') {
    await sendToBackground('machineSerial', { serial: message.serial });
  } else if (message.type === 'designId') {
    await sendToBackground('designId', { designId: message.designId });
  } else if (message.type === 'lidImage') {
    const materialId = await sendToBackground('lidImage', { image: message.image });
    if (materialId) {
      postToPage('selectMaterial', { materialId });
    }
  }
}

window.addEventListener('message', (event) => {
  const message = event.data;
  if (
    event.source !== window
    || !message
    || message.channel !== CHANNEL
    || message.to !== 'extension'
  ) {
    return;
  }
  handlePageMessage(message).catch(error => log(error));
});

/**
 * Send the materials again whenever they change or a synchronization is forced.
 */
chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== 'local') {
    return;
  }
  if (changes.materials || (changes.shouldUpdate && changes.shouldUpdate.newValue)) {
    sendMaterials().catch(error => log(error));
  }
});

/**
 * Handle messages from the popup.
 */
chrome.runtime.onMessage.addListener((request) => {
  if (request.target === 'bridge' && request.type === 'selectMaterial') {
    postToPage('selectMaterial', { materialId: request.materialId });
  }
  return false;
});

// content.js may have found the store before this script loaded, ask again.
postToPage('hello');
