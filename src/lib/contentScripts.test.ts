// @vitest-environment node
import {
  addContentScripts,
  addContentScriptsToOpenTabs,
} from './contentScripts';

describe('content scripts', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('adds the bridge, then content.js in the page', async () => {
    const executeScript = vi.fn().mockResolvedValue([]);
    vi.stubGlobal('chrome', { scripting: { executeScript } });
    expect(await addContentScripts(7)).toBe(true);
    expect(executeScript.mock.calls).toEqual([
      [{ target: { tabId: 7 }, files: ['bridge.js'] }],
      [{ target: { tabId: 7 }, files: ['content.js'], world: 'MAIN' }],
    ]);
  });

  it("says when they couldn't be added", async () => {
    vi.stubGlobal('chrome', {
      scripting: {
        executeScript: vi.fn().mockRejectedValue(new Error('No tab')),
      },
    });
    expect(await addContentScripts(7)).toBe(false);
  });

  it('adds them to open Glowforge tabs, except discarded ones', async () => {
    const executeScript = vi.fn().mockResolvedValue([]);
    const query = vi
      .fn()
      .mockResolvedValue([
        { id: 1 },
        { id: 2, discarded: true },
        { id: 3 },
        {},
      ]);
    vi.stubGlobal('chrome', { scripting: { executeScript }, tabs: { query } });
    await addContentScriptsToOpenTabs();
    expect(query).toHaveBeenCalledWith({ url: '*://app.glowforge.com/*' });
    expect(
      executeScript.mock.calls.map(([{ target }]) => target.tabId),
    ).toEqual([1, 3, 1, 3]);
  });
});
