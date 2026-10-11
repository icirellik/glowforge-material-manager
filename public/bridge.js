/**
 * Relays messages between the extension and content.js. content.js runs in the
 * Glowforge page so that it can use the page's Redux store, but it can't use
 * the extension APIs, so this isolated content script does that for it.
 *
 * It also keeps this tab's status for the popup.
 *
 * The extension adds this script again to open tabs when it is installed or
 * updated, so it is wrapped in a function and stops when a newer copy starts.
 */
(() => {
  const CHANNEL = 'glowforge-material-manager';

  const instance = {};
  window.glowforgeMaterialManagerBridge = instance;
  const isCurrent = () => window.glowforgeMaterialManagerBridge === instance;

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

  // This tab's status, which the popup asks for.
  const status = {
    // The page's store was found, so materials can be added.
    ready: false,
    // The page has the latest custom materials.
    synchronized: false,
    // The selected machine.
    serial: null,
    // The open design.
    designId: null,
  };

  // Counts the materials sent to the page, so that a confirmation from the
  // page can be matched to the latest ones.
  let materialsVersion = 0;

  // Machine serials and design ids come from the page, so only accept values
  // that look like ids.
  const IDENTIFIER = /^[A-Za-z0-9_-]{1,64}$/;
  function asIdentifier(value) {
    return typeof value === 'string' && IDENTIFIER.test(value) ? value : null;
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
    materialsVersion += 1;
    status.synchronized = false;
    postToPage('materials', {
      materials: materials.map(normalizeMaterial),
      version: materialsVersion,
    });
  }

  /**
   * Marks this tab as synchronized once the page has the latest custom
   * materials, and clears the request to synchronize every tab.
   */
  async function markSynchronized(version) {
    if (version !== materialsVersion) {
      return;
    }
    status.synchronized = true;
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
      status.ready = true;
      await sendMaterials();
    } else if (message.type === 'materialsApplied') {
      await markSynchronized(message.version);
    } else if (message.type === 'machineSerial') {
      status.serial = asIdentifier(message.serial);
    } else if (message.type === 'designId') {
      status.designId = asIdentifier(message.designId);
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
      !isCurrent()
      || event.source !== window
      || !message
      || message.channel !== CHANNEL
      || message.to !== 'extension'
    ) {
      return;
    }
    handlePageMessage(message).catch(error => log(error));
  });

  /**
   * Send the materials again whenever they change or a synchronization is
   * forced.
   */
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (!isCurrent() || areaName !== 'local') {
      return;
    }
    if (changes.materials || (changes.shouldUpdate && changes.shouldUpdate.newValue)) {
      sendMaterials().catch(error => log(error));
    }
  });

  /**
   * Handle messages from the popup.
   *
   * status - Reply with this tab's status.
   * selectMaterial - Select a material in the GFUI.
   */
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (!isCurrent() || request.target !== 'bridge') {
      return false;
    }
    if (request.type === 'status') {
      sendResponse(status);
    } else if (request.type === 'selectMaterial') {
      postToPage('selectMaterial', { materialId: request.materialId });
    }
    return false;
  });

  // content.js may have found the store before this script loaded, ask again.
  postToPage('hello');
})();
