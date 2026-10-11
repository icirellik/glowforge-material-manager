import {
  getGlowforgeMaterials,
  getTabStatus,
} from './chromeWrappers';

describe('chromeWrappers', () => {
  const dataCallback = vi.fn();

  (<any>global).chrome = {
    storage: {
      local: {
        get: (key: any, cb: any) => {
          cb(dataCallback());
        },
      },
    },
  };

  it('should fetch materials', async () => {
    const resp = {
      materials: [],
    };

    dataCallback.mockReturnValueOnce(resp);
    const actual = await getGlowforgeMaterials();
    expect(actual).toEqual([]);
  });
});

describe('getTabStatus', () => {
  const status = {
    ready: true, synchronized: false, serial: 'SN-1', designId: 'abc123',
  };
  const originalChrome = (<any>global).chrome;

  function activeTab(url: string, sendMessage: (...args: any[]) => Promise<unknown>) {
    (<any>global).chrome = {
      tabs: {
        query: (query: any, cb: any) => cb([{ id: 7, url }]),
        sendMessage,
      },
    };
  }

  afterEach(() => {
    (<any>global).chrome = originalChrome;
  });

  it('asks the active Glowforge tab', async () => {
    const sendMessage = vi.fn().mockResolvedValue(status);
    activeTab('https://app.glowforge.com/designs/abc123/edit', sendMessage);
    expect(await getTabStatus()).toEqual(status);
    expect(sendMessage).toHaveBeenCalledWith(7, { target: 'bridge', type: 'status' });
  });

  it('is null for other tabs', async () => {
    const sendMessage = vi.fn().mockResolvedValue(status);
    activeTab('https://example.com/', sendMessage);
    expect(await getTabStatus()).toBeNull();
    expect(sendMessage).not.toHaveBeenCalled();
  });

  it('is null when the scripts are not running in the tab', async () => {
    activeTab('https://app.glowforge.com/', () => Promise.reject(new Error('Receiving end does not exist.')));
    expect(await getTabStatus()).toBeNull();
  });
});
