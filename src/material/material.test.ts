import { createMaterial } from './material';
import {
  createEmptyMaterial,
  createEmptyScore,
  createEmptyBitmapEngrave,
  createEmptyVectorEngrave,
} from '../lib/materialHelpers';

describe('material', () => {
  const dataCallback = vi.fn();

  vi.stubGlobal('chrome', {
    runtime: {
      getURL: dataCallback,
    },
  });

  it('creates a custom material', () => {
    dataCallback.mockReturnValueOnce('image.png');

    const id = 4;
    const rawMaterial = {
      ...createEmptyMaterial(),
    };

    expect(createMaterial(rawMaterial, id)).toMatchSnapshot();
  });

  it('removes doubled custom prefixes from the id', () => {
    dataCallback.mockReturnValueOnce('image.png');

    const rawMaterial = {
      ...createEmptyMaterial(),
    };

    expect(createMaterial(rawMaterial, 'Custom:Custom:ce00539').id).toEqual(
      'Custom:ce00539',
    );
    expect(createMaterial(rawMaterial, 'ce00539').id).toEqual('Custom:ce00539');
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
