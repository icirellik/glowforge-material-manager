import {
  PluginBitmapEngraveSetting,
  PluginScoreSetting,
  PluginVectorEngraveSetting,
  RawMaterial,
} from './material';

export type TempMaterial = RawMaterial;

export const EMPTY_MATERIAL: TempMaterial = {
  name: '',
  thickName: '',
  thickness: null,
  cut: {
    power: 99,
    speed: 100,
    passes: 1,
    focalOffset: null,
  },
  scores: [],
  vectors: [],
  bitmaps: [],
};

export const EMPTY_SCORE: PluginScoreSetting = {
  name: '',
  power: 99,
  speed: 100,
  passes: 1,
  focalOffset: null,
};

export const EMPTY_VECTOR_ENGRAVE: PluginVectorEngraveSetting = {
  name: '',
  power: 99,
  speed: 100,
  passes: 1,
  focalOffset: null,
  scanGap: -1,
};

export const EMPTY_BITMAP_ENGRAVE: PluginBitmapEngraveSetting = {
  name: '',
  power: 99,
  speed: 100,
  passes: 1,
  focalOffset: null,
  scanGap: -1,
  renderMethod: null,
  rescaleMethod: 'LagrangeFilter',
  minimumGrayPercent: null,
  maximumGrayPercent: null,
  horizontalTiming: null,
};
