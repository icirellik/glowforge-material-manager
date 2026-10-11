import fs from 'fs';
import path from 'path';

/**
 * Runs public/bridge.js and public/content.js against a fake Glowforge page
 * and a fake extension API. In Chrome they run in separate worlds, but they
 * only talk with window messages, so here they share one.
 */

const PUBLIC = path.join(__dirname, '..', 'public');
const BRIDGE = fs.readFileSync(path.join(PUBLIC, 'bridge.js'), 'utf8');
const CONTENT = fs.readFileSync(path.join(PUBLIC, 'content.js'), 'utf8');

// Like the GFUI's Immutable maps.
class FakeMap {
  entries: Map<string, unknown>;

  constructor(entries: [string, unknown][] = []) {
    this.entries = new Map(entries);
  }

  get(key: string) { return this.entries.get(key); }

  has(key: string) { return this.entries.has(key); }

  set(key: string, value: unknown) {
    const copy = new FakeMap([...this.entries]);
    copy.entries.set(key, value);
    return copy;
  }

  map(update: (value: any, key: string) => unknown) {
    return new FakeMap([...this.entries].map(([key, value]) => [key, update(value, key)]));
  }

  getIn(keys: string[]): unknown {
    return keys.reduce((value: any, key) => (value && value.get ? value.get(key) : undefined), this);
  }
}

/**
 * A store with the GFUI's material reducers: adding a material replaces it,
 * and selecting one marks it selected. Materials can be dropped instead of
 * added, though adding them still makes a new list.
 */
function fakeGlowforge() {
  const dispatched: any[] = [];
  const listeners: (() => void)[] = [];
  const dropped = new Set<string>();
  const catalog = () => new FakeMap([['Glowforge:1', new FakeMap([['id', 'Glowforge:1']])]]);
  let materialList = catalog();
  let machines = new FakeMap([['selectedMachineSerial', 'SN-1'], ['machineMap', new FakeMap([['SN-1', new FakeMap()]])]]);
  const notify = () => listeners.forEach((listener) => listener());
  const store = {
    getState: () => new FakeMap([['materials', new FakeMap([['materialList', materialList]])], ['machines', machines]]),
    subscribe: (listener: () => void) => {
      listeners.push(listener);
      return () => listeners.splice(listeners.indexOf(listener), 1);
    },
    dispatch: (action: any) => {
      dispatched.push(action);
      if (action.type === 'ADD_MATERIALS') {
        materialList = new FakeMap([...materialList.entries]);
        for (const material of action.materials) {
          if (!dropped.has(material.id)) {
            materialList = materialList.set(material.id, new FakeMap(Object.entries(material)));
          }
        }
      } else if (action.type === 'SET_MATERIAL') {
        materialList = materialList.map((material, id) => material.set('selected', id === action.id));
      }
      notify();
    },
  };
  return {
    store,
    dispatched: (type: string) => dispatched.filter((action) => action.type === type),
    ids: () => [...materialList.entries.keys()],
    selected: () => [...materialList.entries].filter(([, material]: any) => material.get('selected')).map(([id]) => id),
    drop: (id: string) => dropped.add(id),
    // Glowforge reloads its catalog, which removes the custom materials.
    refreshCatalog: () => {
      materialList = catalog();
      notify();
    },
    setLidImage: (url: string) => {
      machines = new FakeMap([['selectedMachineSerial', 'SN-1'], ['machineMap', new FakeMap([['SN-1', new FakeMap([['lidImage', url]])]])]]);
      notify();
    },
  };
}

/**
 * The extension API that the scripts use, with storage, the background's
 * replies to lid images, and the popup's messages.
 */
function fakeExtension(items: Record<string, unknown>) {
  const changeListeners: ((changes: any, area: string) => void)[] = [];
  const messageListeners: ((request: any, sender: any, respond: (response: unknown) => void) => boolean)[] = [];
  const lidImageReplies: unknown[] = [];
  const chrome = {
    runtime: {
      getManifest: () => ({ update_url: 'https://example.com' }),
      sendMessage: async (message: any) => (message.type === 'lidImage' ? lidImageReplies.shift() : undefined),
      onMessage: { addListener: (listener: any) => messageListeners.push(listener) },
    },
    storage: {
      local: {
        get: async (key: string) => ({ [key]: items[key] }),
        set: async (values: Record<string, unknown>) => {
          const changes = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, { oldValue: items[key], newValue: value }]));
          Object.assign(items, values);
          changeListeners.forEach((listener) => listener(changes, 'local'));
        },
      },
      onChanged: { addListener: (listener: any) => changeListeners.push(listener) },
    },
  };
  return {
    chrome,
    replyToLidImage: (reply: unknown) => lidImageReplies.push(reply),
    // A message from the popup, to whichever copy of the bridge answers.
    fromPopup: (request: any) => new Promise((resolve) => {
      for (const listener of messageListeners) listener({ target: 'bridge', ...request }, {}, resolve);
      setTimeout(() => resolve(undefined), 0);
    }),
  };
}

const MATERIALS = [
  { id: 'Custom:aaaaaaa', title: 'Thin Birch', nominal_thickness: 0.125 },
  { id: 'Custom:bbbbbbb', title: 'Thick Walnut', nominal_thickness: 0.25 },
];

const settle = () => new Promise((resolve) => { setTimeout(resolve, 20); });
// content.js looks for the store every 250 ms.
const findStore = () => new Promise((resolve) => { setTimeout(resolve, 300); });

describe('page scripts', () => {
  let page: ReturnType<typeof fakeGlowforge>;
  let extension: ReturnType<typeof fakeExtension>;
  const run = (source: string) => new Function(source)(); // eslint-disable-line no-new-func

  beforeEach(async () => {
    // jsdom leaves out the message's source, which the scripts check.
    window.postMessage = (data: unknown) => {
      setTimeout(() => window.dispatchEvent(new MessageEvent('message', { data, source: window as any })), 0);
    };
    page = fakeGlowforge();
    extension = fakeExtension({ materials: MATERIALS.map((material) => ({ ...material })) });
    vi.stubGlobal('chrome', extension.chrome);
    (window as any).store = page.store;
    run(BRIDGE);
    run(CONTENT);
    await findStore();
    await settle();
  });

  afterEach(() => {
    // Newer copies stop older ones.
    (window as any).glowforgeMaterialManagerBridge = null;
    (window as any).glowforgeMaterialManagerContent = null;
    vi.unstubAllGlobals();
  });

  it('adds the materials and reports the tab synchronized', async () => {
    expect(page.dispatched('ADD_MATERIALS')).toHaveLength(1);
    expect(await extension.fromPopup({ type: 'status' })).toEqual({
      ready: true, synchronized: true, serial: 'SN-1', designId: null,
    });
  });

  it('only adds materials again when they change', async () => {
    await extension.chrome.storage.local.set({
      materials: [MATERIALS[0], { ...MATERIALS[1], title: 'Thick Walnut v2' }],
    });
    await settle();
    const adds = page.dispatched('ADD_MATERIALS');
    expect(adds).toHaveLength(2);
    expect(adds[1].materials.map((material: any) => material.id)).toEqual(['Custom:bbbbbbb']);
  });

  it('adds every material on each sync request, even repeated ones', async () => {
    await extension.chrome.storage.local.set({ syncRequestedAt: 1 });
    await settle();
    await extension.chrome.storage.local.set({ syncRequestedAt: 2 });
    await settle();
    const adds = page.dispatched('ADD_MATERIALS');
    expect(adds).toHaveLength(3);
    expect(adds[2].materials).toHaveLength(2);
  });

  it('keeps a selected material selected when it changes', async () => {
    page.store.dispatch({ type: 'SET_MATERIAL', id: 'Custom:aaaaaaa' });
    await extension.chrome.storage.local.set({ materials: [{ ...MATERIALS[0], title: 'Thin Birch v2' }, MATERIALS[1]] });
    await settle();
    expect(page.selected()).toEqual(['Custom:aaaaaaa']);
  });

  it('doesn\'t select a material that is already selected', async () => {
    await extension.fromPopup({ type: 'selectMaterial', materialId: 'Custom:aaaaaaa' });
    await settle();
    await extension.fromPopup({ type: 'selectMaterial', materialId: 'Custom:aaaaaaa' });
    await settle();
    expect(page.dispatched('SET_MATERIAL')).toHaveLength(1);
    expect(page.selected()).toEqual(['Custom:aaaaaaa']);
  });

  it('selects a sticker\'s material when it appears, not in every image after', async () => {
    const lidImage = async (index: number, reply: unknown) => {
      extension.replyToLidImage(reply);
      page.setLidImage(`https://storage.googleapis.com/gf-app-imgl/${index}.jpg?sig=${index}`);
      await settle();
    };
    await lidImage(1, { read: true, materialId: 'Custom:aaaaaaa' });
    expect(page.selected()).toEqual(['Custom:aaaaaaa']);

    // The user picks another material with the sticker still on the bed.
    page.store.dispatch({ type: 'SET_MATERIAL', id: 'Custom:bbbbbbb' });
    await lidImage(2, { read: true, materialId: 'Custom:aaaaaaa' });
    // An image that couldn't be read changes nothing.
    await lidImage(3, { read: false, materialId: null });
    expect(page.selected()).toEqual(['Custom:bbbbbbb']);

    // Taking the sticker off and putting it back selects it again.
    await lidImage(4, { read: true, materialId: null });
    await lidImage(5, { read: true, materialId: 'Custom:aaaaaaa' });
    expect(page.selected()).toEqual(['Custom:aaaaaaa']);
  });

  it('reports a tab that doesn\'t have the latest materials', async () => {
    // A page that ignores new materials.
    const { dispatch } = page.store;
    page.store.dispatch = (action: any) => (action.type === 'ADD_MATERIALS' ? undefined : dispatch(action));
    await extension.chrome.storage.local.set({ materials: [...MATERIALS, { id: 'Custom:ccccccc', title: 'Cherry' }] });
    await settle();
    expect(await extension.fromPopup({ type: 'status' })).toMatchObject({ synchronized: false });
  });

  it('adds the materials back after a catalog refresh', async () => {
    page.refreshCatalog();
    await settle();
    expect(page.ids()).toEqual(['Glowforge:1', 'Custom:aaaaaaa', 'Custom:bbbbbbb']);
    expect(await extension.fromPopup({ type: 'status' })).toMatchObject({ synchronized: true });
  });

  it('stops adding a material that the page drops until new materials arrive', async () => {
    page.drop('Custom:ccccccc');
    const addsOfDropped = () => page.dispatched('ADD_MATERIALS')
      .filter((action: any) => action.materials.some((material: any) => material.id === 'Custom:ccccccc'))
      .length;

    await extension.chrome.storage.local.set({ materials: [...MATERIALS, { id: 'Custom:ccccccc', title: 'Cherry' }] });
    await settle();
    expect(addsOfDropped()).toEqual(1);
    expect(await extension.fromPopup({ type: 'status' })).toMatchObject({ synchronized: false });

    // A catalog refresh still brings back the others, and tries it once more.
    page.refreshCatalog();
    await settle();
    expect(page.ids()).toEqual(['Glowforge:1', 'Custom:aaaaaaa', 'Custom:bbbbbbb']);
    expect(addsOfDropped()).toEqual(2);

    // So do new materials.
    await extension.chrome.storage.local.set({ syncRequestedAt: 1 });
    await settle();
    expect(addsOfDropped()).toEqual(3);
  });

  it('lets only the newest copy of the scripts run', async () => {
    run(BRIDGE);
    run(CONTENT);
    await findStore();
    await settle();
    const before = page.dispatched('ADD_MATERIALS').length;
    await extension.chrome.storage.local.set({ materials: [{ ...MATERIALS[0], title: 'Thin Birch v3' }, MATERIALS[1]] });
    await settle();
    expect(page.dispatched('ADD_MATERIALS').length - before).toEqual(1);
  });

  it('keeps its own errors out of the page', async () => {
    const { dispatch } = page.store;
    page.store.dispatch = (action: any) => {
      if (action.type === 'SET_MATERIAL') throw new Error('Glowforge broke');
      return dispatch(action);
    };
    const errors: unknown[] = [];
    const onError = (event: ErrorEvent) => errors.push(event.error);
    window.addEventListener('error', onError);
    await extension.fromPopup({ type: 'selectMaterial', materialId: 'Custom:bbbbbbb' });
    await settle();
    window.removeEventListener('error', onError);
    expect(errors).toEqual([]);
  });
});
