import migrate from './3-update-ids';

const exampleStorage = {
  materials: [
    {
      id: 'Custom:1',
      nominal_thickness: 3.2,
      settings: [
        {
          active_date: '2017-04-06T00:00-07:00',
          bitmap_engrave_settings: [],
          cut_setting: {
            focal_offset: null,
            passes: 1,
            power: 99,
            speed: 100,
          },
          description: 'Test One Settings',
          environment: [
            'production',
          ],
          score_settings: [],
          tube_type: 'basic',
          vector_engrave_settings: [],
        },
        {
          active_date: '2017-04-06T00:00-07:00',
          bitmap_engrave_settings: [],
          cut_setting: {
            focal_offset: null,
            passes: 1,
            power: 99,
            speed: 100,
          },
          description: 'Test One Settings',
          environment: [
            'production',
          ],
          score_settings: [],
          tube_type: 'pro',
          vector_engrave_settings: [],
        },
      ],
      sku: '',
      thickness_name: 'Test',
      title: 'Test One',
      variety: {
        common_name: 'Test One',
        display_options: null,
        name: 'test-one',
        thumbnails: [
          'chrome-extension://ikjgmgfhgelagijhaagpdbcbkmpckpda/custom-material.png',
        ],
        type_name: 'One',
      },
    },
    {
      id: 'Custom:2',
      nominal_thickness: 3.2,
      settings: [
        {
          active_date: '2017-04-06T00:00-07:00',
          bitmap_engrave_settings: [],
          cut_setting: {
            focal_offset: null,
            passes: 1,
            power: 9.9,
            speed: 4000,
          },
          description: 'Test Two Settings',
          environment: [
            'production',
          ],
          score_settings: [],
          tube_type: 'basic',
          vector_engrave_settings: [],
        },
        {
          active_date: '2017-04-06T00:00-07:00',
          bitmap_engrave_settings: [],
          cut_setting: {
            focal_offset: null,
            passes: 1,
            power: 9.9,
            speed: 4000,
          },
          description: 'Test Two Settings',
          environment: [
            'production',
          ],
          score_settings: [],
          tube_type: 'pro',
          vector_engrave_settings: [],
        },
      ],
      sku: '',
      thickness_name: 'Test',
      title: 'Test Two',
      variety: {
        common_name: 'Test Two',
        display_options: null,
        name: 'test-two',
        thumbnails: [
          'chrome-extension://ikjgmgfhgelagijhaagpdbcbkmpckpda/custom-material.png',
        ],
        type_name: 'Two',
      },
    },
  ],
  rawMaterials: [
    {
      bitmaps: [],
      cut: {
        focalOffset: null,
        passes: 1,
        power: 99,
        speed: 100,
      },
      name: 'One',
      scores: [],
      thickName: 'Test',
      thickness: 3.2,
      vectors: [],
    },
    {
      bitmaps: [],
      cut: {
        focalOffset: null,
        passes: 1,
        power: 9.9,
        speed: 4000,
      },
      name: 'Two',
      scores: [],
      thickName: 'Test',
      thickness: 3.2,
      vectors: [],
    },
  ],
  shouldUpdate: false,
  tempMaterial: null,
  ui: {
    loadedDesignId: 'MJ5yk3K1',
  },
};

const expected = {
  materials: [
    {
      id: 'Custom:00',
      nominal_thickness: 3.2,
      settings: [
        {
          active_date: '2017-04-06T00:00-07:00',
          bitmap_engrave_settings: [],
          cut_setting: {
            focal_offset: null,
            passes: 1,
            power: 99,
            speed: 100,
          },
          description: 'Test One Settings',
          environment: [
            'production',
          ],
          score_settings: [],
          tube_type: 'basic',
          vector_engrave_settings: [],
        },
        {
          active_date: '2017-04-06T00:00-07:00',
          bitmap_engrave_settings: [],
          cut_setting: {
            focal_offset: null,
            passes: 1,
            power: 99,
            speed: 100,
          },
          description: 'Test One Settings',
          environment: [
            'production',
          ],
          score_settings: [],
          tube_type: 'pro',
          vector_engrave_settings: [],
        },
      ],
      sku: '',
      thickness_name: 'Test',
      title: 'Test One',
      variety: {
        common_name: 'Test One',
        display_options: null,
        name: 'test-one',
        thumbnails: [
          'chrome-extension://ikjgmgfhgelagijhaagpdbcbkmpckpda/custom-material.png',
        ],
        type_name: 'One',
      },
    },
    {
      id: 'Custom:0000',
      nominal_thickness: 3.2,
      settings: [
        {
          active_date: '2017-04-06T00:00-07:00',
          bitmap_engrave_settings: [],
          cut_setting: {
            focal_offset: null,
            passes: 1,
            power: 9.9,
            speed: 4000,
          },
          description: 'Test Two Settings',
          environment: [
            'production',
          ],
          score_settings: [],
          tube_type: 'basic',
          vector_engrave_settings: [],
        },
        {
          active_date: '2017-04-06T00:00-07:00',
          bitmap_engrave_settings: [],
          cut_setting: {
            focal_offset: null,
            passes: 1,
            power: 9.9,
            speed: 4000,
          },
          description: 'Test Two Settings',
          environment: [
            'production',
          ],
          score_settings: [],
          tube_type: 'pro',
          vector_engrave_settings: [],
        },
      ],
      sku: '',
      thickness_name: 'Test',
      title: 'Test Two',
      variety: {
        common_name: 'Test Two',
        display_options: null,
        name: 'test-two',
        thumbnails: [
          'chrome-extension://ikjgmgfhgelagijhaagpdbcbkmpckpda/custom-material.png',
        ],
        type_name: 'Two',
      },
    },
  ],
  rawMaterials: [
    {
      bitmaps: [],
      cut: {
        focalOffset: null,
        passes: 1,
        power: 99,
        speed: 100,
      },
      name: 'One',
      scores: [],
      thickName: 'Test',
      thickness: 3.2,
      vectors: [],
    },
    {
      bitmaps: [],
      cut: {
        focalOffset: null,
        passes: 1,
        power: 9.9,
        speed: 4000,
      },
      name: 'Two',
      scores: [],
      thickName: 'Test',
      thickness: 3.2,
      vectors: [],
    },
  ],
  shouldUpdate: true,
  tempMaterial: null,
  ui: {
    loadedDesignId: 'MJ5yk3K1',
  },
};

describe('migration #3', () => {
  let testData: any = null;
  let id = 0;

  (<any>global).TextEncoder = function () {
    return {
      encode: () => { },
    };
  };

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

  (<any>global).crypto = {
    subtle: {
      digest: async () => {
        id += 1;
        return new ArrayBuffer(id);
      },
    },
  };

  /**
   * TODO: Update to properly test crypto if ever possible.
   */
  it('should migrate correctly', async () => {
    testData = exampleStorage;
    await migrate();
    expect(testData).toEqual(expected);

    id = 0;
    await migrate();
    expect(testData).toEqual(expected);
  });
});
