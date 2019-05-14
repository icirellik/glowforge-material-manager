import { RawMaterial } from "./chromeWrappers";
import { ScoreSetting, VectorEngraveSetting, BitmapEngraveSetting } from "./material";

// What a raw empty material looks like, this form is smaller and easier to work
// with then the generated material for the Glowforge UI.
type MaterialId = {
  // id: string;
  // title: string;
}

export type TempMaterial = RawMaterial & MaterialId;

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

export const EMPTY_SCORE: ScoreSetting = {
  name: '',
  power: 99,
  speed: 100,
  passes: 1,
  focalOffset: null,
};

export const EMPTY_VECTOR_ENGRAVE: VectorEngraveSetting = {
  name: '',
  power: 99,
  speed: 100,
  passes: 1,
  focalOffset: null,
  scanGap: null,
};

export const EMPTY_BITMAP_ENGRAVE: BitmapEngraveSetting = {
  name: '',
  power: 99,
  speed: 100,
  passes: 1,
  focalOffset: null,
  scanGap: null,
  renderMethod: null,
  rescaleMethod: 'LagrangeFilter',
  minimumGrayPercent: null,
  maximumGrayPercent: null,
  horizontaTiming: null,
};
