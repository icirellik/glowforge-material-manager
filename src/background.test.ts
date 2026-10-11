// @vitest-environment node
import { checkLidImage } from './background/lidImageQrCode';
import { initializeStorage } from './background/install';
import { addContentScriptsToOpenTabs } from './lib/contentScripts';

vi.mock('./background/lidImageQrCode', () => ({
  checkLidImage: vi.fn(async () => ({
    read: true,
    materialId: 'Custom:abc1234',
  })),
}));
vi.mock('./background/install', () => ({
  initializeStorage: vi.fn(async () => {}),
}));
vi.mock('./lib/contentScripts', () => ({
  addContentScriptsToOpenTabs: vi.fn(async () => {}),
}));

const listeners: Record<string, (...args: unknown[]) => unknown> = {};
const event = (name: string) => ({
  addListener: (listener: (...args: unknown[]) => unknown) => {
    listeners[name] = listener;
  },
});

describe('background', () => {
  beforeAll(async () => {
    vi.stubGlobal('chrome', {
      runtime: {
        getManifest: () => ({ update_url: 'https://example.com' }),
        onMessage: event('message'),
        onInstalled: event('installed'),
        onStartup: event('startup'),
      },
    });
    await import('./background');
  });
  afterAll(() => {
    vi.unstubAllGlobals();
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('checks lid images that the tabs send', async () => {
    const response = await new Promise((resolve) => {
      expect(
        listeners.message(
          { target: 'background', type: 'lidImage', image: 'https://lid' },
          {},
          resolve,
        ),
      ).toBe(true);
    });
    expect(checkLidImage).toHaveBeenCalledWith('https://lid');
    expect(response).toEqual({ read: true, materialId: 'Custom:abc1234' });
  });

  it('ignores other messages', async () => {
    expect(
      listeners.message({ target: 'bridge', type: 'lidImage' }, {}, () => {}),
    ).toBe(false);
    const response = await new Promise((resolve) => {
      listeners.message(
        { target: 'background', type: 'lidImage', image: 42 },
        {},
        resolve,
      );
    });
    expect(response).toBeNull();
    expect(checkLidImage).not.toHaveBeenCalled();
  });

  it('adds the scripts to open tabs when installed or updated', async () => {
    await listeners.installed({ reason: 'update' });
    expect(initializeStorage).toHaveBeenCalled();
    expect(addContentScriptsToOpenTabs).toHaveBeenCalled();

    vi.clearAllMocks();
    await listeners.installed({ reason: 'chrome_update' });
    await listeners.startup();
    expect(initializeStorage).toHaveBeenCalledTimes(2);
    expect(addContentScriptsToOpenTabs).not.toHaveBeenCalled();
  });
});
