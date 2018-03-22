// What a raw empty material looks like, this form is smaller and easier to work
// with then the generated material for the Glowforge UI.
export const EMPTY_MATERIAL = {
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

export const EMPTY_SCORE = {
  name: '',
  power: 99,
  speed: 100,
  passes: 1,
  focalOffset: null,
};

export const EMPTY_VECTOR_ENGRAVE = {
  name: '',
  power: 99,
  speed: 100,
  passes: 1,
  focalOffset: null,
  scanGap: null,
};

export const EMPTY_BITMAP_ENGRAVE = {
  name: '',
  power: 99,
  speed: 100,
  passes: 1,
  focalOffset: null,
  scanGap: null,
  renderMethod: null,
  rescaleMethod: "LagrangeFilter",
  minimumGrayPercent: null,
  maximumGrayPercent: null,
  horizontaTiming: null,
};
