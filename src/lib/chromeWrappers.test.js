import {
  getMaterials,
} from './chromeWrappers';

describe('chromeWrappers', () => {
  const dataCallback = jest.fn();

  global.chrome = {
    storage: {
      local: {
        get: (key, cb) => {
          cb(dataCallback());
        }
      },
    },
  };

  it('should fetch materials', async () => {
    const resp = {
      materials: []
    };

    dataCallback.mockReturnValueOnce(resp);
    const actual = await getMaterials();
    expect(actual).toEqual([]);
  });
});
