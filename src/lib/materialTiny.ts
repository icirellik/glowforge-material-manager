/**
 * A tiny material is the compacted form of the raw material, this reduces the
 * size of the keys so that we can minimize the amount of space used when sync'd
 * with the cloud.
 */
export type TinyMaterial = {
  // name
  n: string;
  // thickName
  t: string;
  // thickness
  d: any;
  // cut
  c: TinyCutSetting;
  // scores
  s: TinyScoreSetting[];
  // vectors
  v: TinyVectorEngraveSetting[];
  // bitmaps
  b: TinyBitmapEngraveSetting[];
}

export type TinyCutSetting = {
  // focalOffset
  f: number | null;
  // passes
  a: number;
  // power
  p: number;
  // speed
  s: number;
}

export type TinyScoreSetting = {
  // focalOffset
  f: number | null;
  // name
  n: string;
  // passes
  a: number;
  // power
  p: number;
  // speed
  s: number;
}

export type TinyVectorEngraveSetting = {
  // focalOffset
  f: number | null;
  // name
  n: string;
  // passes
  a: number;
  // power
  p: number;
  // scanGap
  g: number;
  // speed
  s: number;
}

export type TinyBitmapEngraveSetting = {
  // power
  p: number;
  // speed
  s: number;
  // passes
  a: number;
  // focalOffset
  f: number | null;
  // scanGap
  g: number;
  // name
  n: string;
  // renderMethod
  rm: 'FloydSteinbergDitherMethod' | 'RiemersmaDitherMethod' | null;
  // rescaleMethod
  re: 'LagrangeFilter';
  // minimumGrayPercent
  ip: null;
  // maximumGrayPercent
  ap: null;
  // horizontalTiming
  t: null;
}
