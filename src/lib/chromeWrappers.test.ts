import {
  getGlowforgeMaterials,
  getTabConnection,
  sendMessage,
} from './chromeWrappers';

describe('chromeWrappers', () => {
  const dataCallback = vi.fn();

  vi.stubGlobal('chrome', {
    storage: {
      local: {
        get: (key: unknown, cb: (items: unknown) => void) => {
          cb(dataCallback());
        },
      },
    },
  });

  it('should fetch materials', async () => {
    const resp = {
      materials: [],
    };

    dataCallback.mockReturnValueOnce(resp);
    const actual = await getGlowforgeMaterials();
    expect(actual).toEqual([]);
  });
});

describe('Glowforge tabs', () => {
  const status = {
    ready: true,
    synchronized: false,
    serial: 'SN-1',
    designId: 'abc123',
  };
  const originalChrome = window.chrome;

  function activeTab(
    url: string,
    sendTo: (...args: unknown[]) => Promise<unknown>,
  ) {
    vi.stubGlobal('chrome', {
      tabs: {
        query: (
          query: unknown,
          cb: (tabs: { id: number; url: string }[]) => void,
        ) => cb([{ id: 7, url }]),
        sendMessage: sendTo,
      },
    });
  }

  afterEach(() => {
    vi.stubGlobal('chrome', originalChrome);
  });

  it('asks the active Glowforge tab for its status', async () => {
    const sendTo = vi.fn().mockResolvedValue(status);
    activeTab('https://app.glowforge.com/designs/abc123/edit', sendTo);
    expect(await getTabConnection()).toEqual({
      state: 'connected',
      tabId: 7,
      status,
    });
    expect(sendTo).toHaveBeenCalledWith(7, {
      target: 'bridge',
      type: 'status',
    });
  });

  it('leaves other tabs alone', async () => {
    const sendTo = vi.fn().mockResolvedValue(status);
    activeTab('https://example.com/', sendTo);
    expect(await getTabConnection()).toEqual({ state: 'none' });
    expect(await sendMessage({ type: 'selectMaterial' })).toBe(false);
    expect(sendTo).not.toHaveBeenCalled();
  });

  it('notices Glowforge tabs without the extension running', async () => {
    activeTab('https://app.glowforge.com/', () =>
      Promise.reject(new Error('Receiving end does not exist.')),
    );
    expect(await getTabConnection()).toEqual({
      state: 'disconnected',
      tabId: 7,
    });
    expect(await sendMessage({ type: 'selectMaterial' })).toBe(false);
  });

  it('says whether a message was delivered', async () => {
    const sendTo = vi.fn().mockResolvedValue(undefined);
    activeTab('https://app.glowforge.com/', sendTo);
    expect(
      await sendMessage({
        type: 'selectMaterial',
        materialId: 'Custom:abc1234',
      }),
    ).toBe(true);
    expect(sendTo).toHaveBeenCalledWith(7, {
      target: 'bridge',
      type: 'selectMaterial',
      materialId: 'Custom:abc1234',
    });
  });
});
