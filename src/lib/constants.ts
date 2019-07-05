import {
  PluginBitmapEngraveSetting,
  PluginScoreSetting,
  PluginVectorEngraveSetting,
  PluginMaterial,
} from './materialRaw';

export interface TempMaterial extends PluginMaterial {
  propValidation: {
    [key: string]: boolean,
  };
}

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
  propValidation: {},
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
  scanGap: 3,
};

export const EMPTY_BITMAP_ENGRAVE: PluginBitmapEngraveSetting = {
  name: '',
  power: 99,
  speed: 100,
  passes: 1,
  focalOffset: null,
  scanGap: 3,
  renderMethod: null,
  rescaleMethod: 'LagrangeFilter',
  minimumGrayPercent: null,
  maximumGrayPercent: null,
  horizontalTiming: null,
};

/**
 * The individual properies that may have multiple settings methods.
 */

export interface MultiSettings {
  'bitmaps': typeof EMPTY_BITMAP_ENGRAVE;
  'scores': typeof EMPTY_SCORE;
  'vectors': typeof EMPTY_VECTOR_ENGRAVE;
}

export const MultiSettingsDefaults: MultiSettings = {
  'bitmaps': EMPTY_BITMAP_ENGRAVE,
  'scores': EMPTY_SCORE,
  'vectors': EMPTY_VECTOR_ENGRAVE,
};

export type MultiSettingsEmpty =
  typeof EMPTY_BITMAP_ENGRAVE |
  typeof EMPTY_SCORE |
  typeof EMPTY_VECTOR_ENGRAVE;
