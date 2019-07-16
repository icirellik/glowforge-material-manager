// Internal Plugin Data Structure
export type PluginMaterial = {
  name: string;
  thickName: string;
  thickness: any;
  bitmaps: PluginBitmapEngraveSetting[];
  cut: PluginCutSetting;
  scores: PluginScoreSetting[];
  vectors: PluginVectorEngraveSetting[];
  sync: boolean;
};

// Glowforge Redux Material Shape
export type PluginMaterialId = string;

export type PluginCutSetting = {
  focalOffset: number | null;
  passes: number;
  power: number;
  speed: number;
}

export type PluginScoreSetting = {
  focalOffset: number | null;
  name: string;
  passes: number;
  power: number;
  speed: number;
}

export type PluginVectorEngraveSetting = {
  focalOffset: number | null;
  name: string;
  passes: number;
  power: number;
  scanGap: number;
  speed: number;
}

export type PluginBitmapEngraveSetting = {
  power: number;
  speed: number;
  passes: number;
  focalOffset: number | null;
  scanGap: number;
  name: string;
  renderMethod: 'FloydSteinbergDitherMethod' | 'RiemersmaDitherMethod' | null;
  rescaleMethod: 'LagrangeFilter';
  minimumGrayPercent: null;
  maximumGrayPercent: null;
  horizontalTiming: null;
}
