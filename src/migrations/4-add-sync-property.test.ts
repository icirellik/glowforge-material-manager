import { migration4 } from './4-add-sync-property';
import { sendCloudMaterial } from '../material/material';

vi.mock('../material/material', () => ({
  sendCloudMaterial: vi.fn(async () => undefined),
}));

describe('migration #4', () => {
  let testData: any = null;

  (<any>global).chrome = {
    storage: {
      local: {
        get: (key: any, cb: any) => {
          cb(testData);
        },
        set: (data: any, cb: any) => {
          testData = {
            ...testData,
            ...data,
          };
          cb();
        },
      },
    },
  };

  beforeEach(() => {
    vi.mocked(sendCloudMaterial).mockClear();
    testData = {
      materials: [],
      rawMaterials: [
        { name: 'Legacy' },
        { name: 'Synced', sync: true },
        { name: 'Not Synced', sync: false },
      ],
    };
  });

  it('turns sync on for legacy materials only', async () => {
    expect(await migration4()).toEqual(true);

    expect(testData.rawMaterials.map((m: any) => [m.name, m.sync])).toEqual([
      ['Legacy', true],
      ['Synced', true],
      ['Not Synced', false],
    ]);
    expect(vi.mocked(sendCloudMaterial).mock.calls.map(([m]: any) => m.name)).toEqual(['Legacy']);
  });

  it('does nothing once every material has the property', async () => {
    await migration4();
    vi.mocked(sendCloudMaterial).mockClear();

    expect(await migration4()).toEqual(false);
    expect(sendCloudMaterial).not.toHaveBeenCalled();
  });
});
