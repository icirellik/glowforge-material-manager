/** @typedef {import("./types").Store} Store */
/** @typedef {import("./types").Window} WindowExt */
/** @typedef {Window & WindowExt} ExtendedWindow */

/**
 * Runs in the Glowforge page so that it can use the page's Redux store. It
 * talks to the extension through bridge.js.
 *
 * The extension adds this script again to open tabs when it is installed or
 * updated, so it is wrapped in a function and stops when a newer copy starts.
 */
(() => {
  /** @type {ExtendedWindow} */
  const localWindow = window;

  const CHANNEL = 'glowforge-material-manager';

  const instance = {};
  localWindow.glowforgeMaterialManagerContent = instance;
  const isCurrent = () =>
    localWindow.glowforgeMaterialManagerContent === instance;

  // The GFUI creates its store after this script runs.
  const STORE_POLL_MS = 250;
  const STORE_TIMEOUT_MS = 60000;

  let extensionDevMode = false;
  function log(message) {
    if (extensionDevMode) {
      // eslint-disable-next-line
      console.log(message);
    }
  }

  /**
   * Sends a message to the extension through bridge.js.
   */
  function postToExtension(type, data = {}) {
    window.postMessage(
      {
        channel: CHANNEL,
        to: 'extension',
        type,
        ...data,
      },
      window.location.origin,
    );
  }

  /**
   * Gets the GFUI's Redux store, or null if it hasn't been created yet.
   *
   * @returns {Store | null}
   */
  function getStore() {
    const { store } = localWindow;
    if (store && store.getState && store.dispatch && store.subscribe) {
      return store;
    }
    return null;
  }

  // The custom materials that should be in the GFUI, and their version, which
  // is sent back to the extension to confirm they were added.
  let materials = [];
  let materialsVersion = null;

  /**
   * Reads a field of a material in the GFUI's list. They're Immutable maps.
   */
  function field(material, key) {
    if (!material) {
      return undefined;
    }
    return typeof material.get === 'function'
      ? material.get(key)
      : material[key];
  }

  // Each custom material as it was last added, so that unchanged ones aren't
  // added again. Adding a material replaces it, which also unselects it.
  const added = new Map();

  // The ids of the custom materials that were still missing right after they
  // were last added, because the GFUI dropped them. They aren't restored
  // again, which could loop, until new materials arrive.
  let droppedIds = new Set();

  /**
   * Finds the custom materials that are missing from the GFUI's material list.
   */
  function missingMaterials(materialList) {
    return materials.filter(
      (material) => !materialList || !materialList.has(material.id),
    );
  }

  /**
   * Adds the custom materials that are missing from the GFUI or have changed.
   * A selected material that's added again stays selected.
   *
   * @param force Add every material again.
   * @returns Whether every custom material is now in the GFUI.
   */
  function addMaterials(force) {
    const store = getStore();
    if (!store) {
      return false;
    }

    const materialList = store.getState().getIn(['materials', 'materialList']);
    const toAdd = materials.filter(
      (material) =>
        force ||
        !materialList ||
        !materialList.has(material.id) ||
        added.get(material.id) !== JSON.stringify(material),
    );
    if (toAdd.length > 0) {
      log(`adding ${toAdd.length} custom materials`);
      const selected = toAdd.find(
        (material) =>
          materialList && field(materialList.get(material.id), 'selected'),
      );
      store.dispatch({
        type: 'ADD_MATERIALS',
        materials: toAdd,
      });
      toAdd.forEach((material) =>
        added.set(material.id, JSON.stringify(material)),
      );
      if (selected) {
        store.dispatch({
          type: 'SET_MATERIAL',
          id: selected.id,
        });
      }
    }
    const missing = missingMaterials(
      store.getState().getIn(['materials', 'materialList']),
    );
    droppedIds = new Set(missing.map((material) => material.id));
    return missing.length === 0;
  }

  /**
   * Sets the selected material.
   *
   * @param materialId The material id.
   */
  function selectMaterial(materialId) {
    const store = getStore();
    if (!store || typeof materialId !== 'string') {
      return;
    }

    addMaterials(false);
    const materialList = store.getState().getIn(['materials', 'materialList']);
    if (!materialList || !materialList.has(materialId)) {
      log(`unknown material: ${materialId}`);
      return;
    }
    // Selecting it again would override Glowforge's own material detection.
    if (field(materialList.get(materialId), 'selected')) {
      return;
    }

    log('setting the selected material');
    store.dispatch({
      type: 'SET_MATERIAL',
      id: materialId,
    });
  }

  /**
   * Checks whether custom materials have gone missing from the GFUI's
   * material list, other than ones it dropped.
   */
  function needsRestore(materialList) {
    return missingMaterials(materialList).some(
      (material) => !droppedIds.has(material.id),
    );
  }

  /**
   * Re-adds the custom materials that have gone missing.
   */
  let restoreScheduled = false;
  function restoreMaterials() {
    restoreScheduled = false;
    try {
      const store = getStore();
      // Adding them may have dropped some since this was scheduled.
      if (
        !isCurrent() ||
        !store ||
        !needsRestore(store.getState().getIn(['materials', 'materialList']))
      ) {
        return;
      }
      log('restoring missing custom materials');
      if (addMaterials(false)) {
        postToExtension('materialsApplied', { version: materialsVersion });
      }
    } catch (e) {
      // Don't send my errors to GlowForge.
      log(`restore error: ${e}`);
    }
  }

  /**
   * Re-adds the custom materials if they go missing from the GFUI's material
   * list. Only checks when the list changes.
   */
  let checkedMaterialList = null;
  function checkMaterials(state) {
    const materialList = state.getIn(['materials', 'materialList']);
    if (materialList === checkedMaterialList) {
      return;
    }
    checkedMaterialList = materialList;

    if (!restoreScheduled && needsRestore(materialList)) {
      restoreScheduled = true;
      // Don't dispatch from inside the store's own update.
      setTimeout(restoreMaterials, 0);
    }
  }

  /**
   * Informs the extension when the selected machine changes, and when its lid
   * camera image changes so it can be checked for a QR code.
   */
  let prevMachineSerial = null;
  let prevSpeedSpace = null;
  let prevLidImagePath = null;
  function checkMachine(state) {
    const serial = state.getIn(['machines', 'selectedMachineSerial']);
    if (!serial) {
      prevMachineSerial = null;
      prevSpeedSpace = null;
      return;
    }

    if (serial !== prevMachineSerial) {
      log('message - machineSerial');
      postToExtension('machineSerial', { serial });
      prevMachineSerial = serial;
    }

    // The machine's speed limits, which set the speeds the GFUI shows. The
    // store keeps the same object until they change.
    const speedSpace = state.getIn([
      'machines',
      'machineMap',
      serial,
      'printSettingsSpace',
    ]);
    if (
      speedSpace &&
      typeof speedSpace.toJS === 'function' &&
      speedSpace !== prevSpeedSpace
    ) {
      log('message - machineSpeeds');
      postToExtension('machineSpeeds', { speeds: speedSpace.toJS() });
      prevSpeedSpace = speedSpace;
    }

    // A signed `storage.googleapis.com/gf-app-imgl/<serial>/<id>/corrected.jpg`
    // URL. `preloadedLidImage` is the GFUI's own `corrected_bed_image` URL for
    // the same image, which the extension can't download.
    const lidImage = state.getIn([
      'machines',
      'machineMap',
      serial,
      'lidImage',
    ]);
    if (typeof lidImage !== 'string') {
      return;
    }

    // The signed query string changes whenever the URL is refreshed, the path
    // only changes with the image.
    const lidImagePath = lidImage.split('?')[0];
    if (lidImagePath !== prevLidImagePath) {
      log('message - lidImage');
      postToExtension('lidImage', { image: lidImage });
      prevLidImagePath = lidImagePath;
    }
  }

  /**
   * Informs the extension when the open design changes, so that the trace can be
   * downloaded.
   */
  let prevDesignId;
  function checkDesignId() {
    const match = window.location.pathname.match(/^\/designs\/([^/]+)/);
    const designId = match ? match[1] : null;
    if (designId !== prevDesignId) {
      log('message - designId');
      postToExtension('designId', { designId });
      prevDesignId = designId;
    }
  }

  let unsubscribe = null;
  function storeListener() {
    if (!isCurrent()) {
      if (typeof unsubscribe === 'function') unsubscribe();
      return;
    }
    try {
      const state = getStore().getState();
      checkMaterials(state);
      checkMachine(state);
      checkDesignId();
    } catch (e) {
      // Don't send my errors to GlowForge.
      log(`store error: ${e}`);
    }
  }

  /**
   * Handles a message from the extension.
   *
   * hello - bridge.js loaded, reply if the store is ready.
   * materials - The custom materials, add them to the GFUI.
   * selectMaterial - Select a material in the GFUI.
   */
  window.addEventListener('message', (event) => {
    const message = event.data;
    if (
      !isCurrent() ||
      event.source !== window ||
      !message ||
      message.channel !== CHANNEL ||
      message.to !== 'page'
    ) {
      return;
    }

    extensionDevMode = message.devMode === true;
    try {
      if (message.type === 'hello') {
        if (getStore()) {
          postToExtension('ready');
        }
      } else if (message.type === 'materials') {
        materials = Array.isArray(message.materials) ? message.materials : [];
        materialsVersion = message.version;
        if (addMaterials(message.force === true)) {
          postToExtension('materialsApplied', { version: materialsVersion });
        }
      } else if (message.type === 'selectMaterial') {
        selectMaterial(message.materialId);
      }
    } catch (e) {
      // Don't send my errors to GlowForge.
      log(`message error: ${e}`);
    }
  });

  /**
   * Wait for the GFUI to create its store, then subscribe to changes and ask the
   * extension for the materials.
   */
  const startedAt = Date.now();
  const storeTimer = setInterval(() => {
    const store = getStore();
    if (!isCurrent()) {
      clearInterval(storeTimer);
    } else if (store) {
      clearInterval(storeTimer);
      unsubscribe = store.subscribe(storeListener);
      storeListener();
      postToExtension('ready');
    } else if (Date.now() - startedAt > STORE_TIMEOUT_MS) {
      clearInterval(storeTimer);
      log('Glowforge store not found');
    }
  }, STORE_POLL_MS);
})();
