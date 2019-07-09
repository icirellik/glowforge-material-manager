import {
  createMaterial,
} from './material';
import {
  createEmptyMaterial, createEmptyScore, createEmptyBitmapEngrave, createEmptyVectorEngrave,
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
      ...createEmptyMaterial(),
    };

    expect(createMaterial(rawMaterial, id)).toMatchSnapshot();
  });

  it('creates a new score', () => {
    expect(createEmptyScore()).toMatchSnapshot();
  });

  it('creates a new bitmap engrave', () => {
    expect(createEmptyBitmapEngrave()).toMatchSnapshot();
  });

  it('creates a new vector engrave', () => {
    expect(createEmptyVectorEngrave()).toMatchSnapshot();
  });
});
