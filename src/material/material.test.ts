import {
  createMaterial,
} from './material';
import {
  EMPTY_MATERIAL,
} from '../lib/constants'

describe('material', () => {
  const dataCallback = jest.fn();

  (<any>global).chrome = {
    extension: {
      getURL: dataCallback,
    },
  };

  it('creates a custom material', () => {
    dataCallback.mockReturnValueOnce('image.png');

    const id = 4;
    const rawMaterial = {
      ...EMPTY_MATERIAL,
    };

    expect(createMaterial(rawMaterial, id)).toMatchSnapshot();
  });
});
