import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from './App';
import { createEmptyMaterial } from './lib/materialHelpers';

// What a Pro with the faster speeds reports.
const PRO = {
  cut: { speed_minimum: 100, speed_maximum: 30000 },
  engrave: { speed_minimum: 100, speed_maximum: 36500 },
  vector_engrave: { speed_minimum: 100, speed_maximum: 30000 },
  bitmap_engrave: { speed_minimum: 100, speed_maximum: 36500 },
  display: { speed_minimum: 100, scale: 0.10714285714285714, tick: 100 },
};

describe('Speeds in the popup', () => {
  let local: { [key: string]: unknown } = {};
  let activeTab: { id: number; url: string } | null = null;
  let tabSpeeds: unknown = null;
  let tabModel: { model: string; tubeType: string } | null = null;
  let container: HTMLDivElement;

  beforeEach(() => {
    vi.useFakeTimers();
    local = {};
    activeTab = null;
    tabSpeeds = null;
    tabModel = null;
    vi.stubGlobal('chrome', {
      runtime: { getURL: (name: string) => name },
      storage: {
        local: {
          get: (keys: unknown, cb: (items: object) => void) => cb({ ...local }),
          set: (items: object, cb: () => void) => {
            local = { ...local, ...items };
            cb();
          },
        },
        sync: {
          get: (keys: unknown, cb: (items: object) => void) => cb({}),
          getBytesInUse: (keys: unknown, cb: (bytes: number) => void) => cb(0),
        },
      },
      tabs: {
        query: (query: unknown, cb: (tabs: object[]) => void) =>
          cb(activeTab ? [activeTab] : []),
        sendMessage: async () => ({
          ready: true,
          synchronized: true,
          serial: 'SN-1',
          model: tabModel?.model ?? null,
          tubeType: tabModel?.tubeType ?? null,
          speeds: tabSpeeds,
          designId: null,
        }),
      },
      permissions: { contains: async () => false },
    });
    container = document.createElement('div');
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  // The popup's storage and tab reads are promises, with the timers faked.
  async function settle() {
    for (let i = 0; i < 100; i += 1) await Promise.resolve();
  }

  async function openEditor(cutSpeed = 4000) {
    let app: App | null = null;
    act(() => {
      ReactDOM.render(
        <App
          platform="linux"
          ref={(instance) => {
            app = instance;
          }}
        />,
        container,
      );
    });
    await settle();
    await app!.setEditorModeAdd({
      ...createEmptyMaterial(),
      cut: { power: 99, speed: cutSpeed, passes: 1, focalOffset: null },
      scores: [
        {
          name: 'Score',
          power: 24.75,
          speed: 2050,
          passes: 1,
          focalOffset: null,
        },
      ],
      propValidation: {},
    });
    await settle();
    const labels = [...container.querySelectorAll('label')].map(
      (label) => label.textContent,
    );
    const speeds = [...container.querySelectorAll('input')]
      .filter((input) => input.parentElement?.textContent?.startsWith('Speed'))
      .map((input) => input.value);
    return { labels, speeds };
  }

  it("shows speeds in the Glowforge tab machine's range, and remembers it", async () => {
    activeTab = { id: 1, url: 'https://app.glowforge.com/' };
    tabSpeeds = PRO;
    const { labels, speeds } = await openEditor();

    expect(labels).toContain('Speed * (100 - 3300)');
    expect(labels).not.toContain('Speed * (100 - 500)');
    // What the GFUI shows for 4000 and 2050 on a Pro.
    expect(speeds).toEqual(['517', '309']);
    expect(local.speedSpace).toEqual(PRO);
  });

  it('uses the last machine when the popup is opened somewhere else', async () => {
    local.speedSpace = PRO;
    const { labels, speeds } = await openEditor();

    expect(labels).toContain('Speed * (100 - 3300)');
    expect(speeds).toEqual(['517', '309']);
  });

  it('flags a speed the new range leaves out when the machine changes', async () => {
    local.speedSpace = PRO;
    await openEditor(30000);
    // The first speed field is the cut's.
    const cutSpeed = () =>
      [...container.querySelectorAll('input')].find((input) =>
        input.parentElement?.textContent?.startsWith('Speed'),
      )!;
    expect(cutSpeed().value).toBe('3300');
    expect(cutSpeed().className).toBe('');

    // A Glowforge tab with a machine without the faster limits.
    activeTab = { id: 1, url: 'https://app.glowforge.com/' };
    tabSpeeds = {
      cut: { speed_minimum: 100, speed_maximum: 4000 },
      engrave: { speed_minimum: 100, speed_maximum: 8500 },
      display: { speed_minimum: 100, scale: 0.10714285714285714, tick: 100 },
    };
    await vi.advanceTimersByTimeAsync(750);
    await settle();
    expect(cutSpeed().value).toBe('3167');
    expect(cutSpeed().className).toBe('invalid');
  });

  it('uses the default range before any machine is seen, or for a bad one', async () => {
    activeTab = { id: 1, url: 'https://app.glowforge.com/' };
    tabSpeeds = { cut: 'fast' };
    const { labels, speeds } = await openEditor();

    expect(labels).toContain('Speed * (100 - 500)');
    expect(speeds).toEqual(['500', '300']);
    expect(local.speedSpace).toBeUndefined();
  });

  describe('the machine model', () => {
    const badge = () => container.querySelector('.header__model');

    it("shows the Glowforge tab's machine, and remembers it", async () => {
      activeTab = { id: 1, url: 'https://app.glowforge.com/' };
      tabModel = { model: 'pro', tubeType: 'pro' };
      await openEditor();

      expect(badge()!.textContent).toBe('Pro');
      expect(badge()!.className).toBe('header__model header__model--pro');
      expect(badge()!.getAttribute('title')).toBe(
        'The selected machine is a Glowforge Pro, tube type pro.',
      );
      expect(local.machineModel).toEqual({ model: 'pro', tubeType: 'pro' });
    });

    it('shows the last machine on other tabs', async () => {
      local.machineModel = { model: 'plus', tubeType: 'basic' };
      await openEditor();

      expect(badge()!.textContent).toBe('Plus');
      expect(badge()!.className).toBe('header__model');
      expect(badge()!.getAttribute('title')).toBe(
        'The last machine selected is a Glowforge Plus, tube type basic.',
      );
    });

    it('shows nothing before a machine is seen', async () => {
      activeTab = { id: 1, url: 'https://app.glowforge.com/' };
      await openEditor();

      expect(badge()).toBeNull();
      expect(local.machineModel).toBeUndefined();
    });
  });
});
