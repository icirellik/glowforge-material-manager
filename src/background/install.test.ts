// @vitest-environment node
import { initializeStorage } from './install';

function fakeStorage(initial: Record<string, unknown>) {
  const items = { ...initial };
  const local = {
    get: vi.fn(async (key: string) =>
      key in items ? { [key]: items[key] } : {},
    ),
    set: vi.fn(async (values: Record<string, unknown>) => {
      Object.assign(items, values);
    }),
    remove: vi.fn(async (keys: string[]) => {
      keys.forEach((key) => delete items[key]);
    }),
  };
  vi.stubGlobal('chrome', { storage: { local } });
  return items;
}

describe('initializeStorage', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sets up storage on a new install', async () => {
    const items = fakeStorage({});
    await initializeStorage();
    expect(items).toEqual({ materials: [], rawMaterials: [] });
  });

  it('asks the tabs to add the materials again, and drops old keys', async () => {
    const items = fakeStorage({
      materials: [{ id: 'Custom:abc1234' }],
      ui: { serial: 'SN-1' },
      shouldUpdate: true,
    });
    await initializeStorage();
    expect(items.ui).toBeUndefined();
    expect(items.shouldUpdate).toBeUndefined();
    expect(items.syncRequestedAt).toEqual(expect.any(Number));
    expect(items.materials).toEqual([{ id: 'Custom:abc1234' }]);
  });
});
