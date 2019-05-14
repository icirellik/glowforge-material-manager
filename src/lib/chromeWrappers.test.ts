import {
  getMaterials,
} from './chromeWrappers';

describe('chromeWrappers', () => {
  const dataCallback = jest.fn();

  (<any>global).chrome = {
    storage: {
      local: {
        get: (key: any, cb: any) => {
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
