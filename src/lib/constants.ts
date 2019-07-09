import {
  PluginBitmapEngraveSetting,
  PluginScoreSetting,
  PluginVectorEngraveSetting,
  PluginMaterial,
} from '../material/materialPlugin';

export interface TempMaterial extends PluginMaterial {
  propValidation: {
    [key: string]: boolean,
  };
}

export function createEmptyMaterial(): TempMaterial {
  return {
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
}

export function createEmptyScore():PluginScoreSetting {
  return {
    name: '',
    power: 99,
    speed: 100,
    passes: 1,
    focalOffset: null,
  };
}

export function createEmptyVectorEngrave(): PluginVectorEngraveSetting {
  return {
    name: '',
    power: 99,
    speed: 100,
    passes: 1,
    focalOffset: null,
    scanGap: 3,
  };
}



export function createEmptyBitmapEngrave(): PluginBitmapEngraveSetting {
  return {
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
}

/**
 * The individual properies that may have multiple settings methods.
 */

export interface MultiSettings {
  'bitmaps': PluginBitmapEngraveSetting;
  'scores': PluginScoreSetting;
  'vectors': PluginVectorEngraveSetting;
}

export interface MultiSettingFunctions {
  'bitmaps': typeof createEmptyBitmapEngrave;
  'scores': typeof createEmptyScore;
  'vectors': typeof createEmptyVectorEngrave;
}

export const MultiSettingFunctionsDefaults: MultiSettingFunctions = {
  'bitmaps': createEmptyBitmapEngrave,
  'scores': createEmptyScore,
  'vectors': createEmptyVectorEngrave,
};
