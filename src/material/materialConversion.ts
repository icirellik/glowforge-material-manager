import type {
  PluginBitmapEngraveSetting,
  PluginMaterial,
  PluginScoreSetting,
  PluginVectorEngraveSetting,
} from './materialPlugin';
import type {
  TinyBitmapEngraveSetting,
  TinyMaterial,
  TinyScoreSetting,
  TinyVectorEngraveSetting,
} from './materialTiny';

export function toTinyMaterial(material: PluginMaterial): TinyMaterial {
  return {
    n: material.name,
    t: material.thickName,
    d: material.thickness,
    c: {
      p: material.cut.power,
      s: material.cut.speed,
      a: material.cut.passes,
      f: material.cut.focalOffset,
    },
    s: material.scores.map((score) => toTinyScore(score)),
    v: material.vectors.map((vector) => toTinyVectorEngrave(vector)),
    b: material.bitmaps.map((bitmap) => toTinyBitmmapEngrave(bitmap)),
  };
}

export function toFullMaterial(tinyMaterial: TinyMaterial): PluginMaterial {
  return {
    name: tinyMaterial.n,
    thickName: tinyMaterial.t,
    thickness: tinyMaterial.d,
    cut: {
      power: tinyMaterial.c.p,
      speed: tinyMaterial.c.s,
      passes: tinyMaterial.c.a,
      focalOffset: tinyMaterial.c.f,
    },
    scores: tinyMaterial.s.map((score) => toFullScore(score)),
    vectors: tinyMaterial.v.map((vector) => toFullVectorEngrave(vector)),
    bitmaps: tinyMaterial.b.map((bitmap) => toFullBitmapEngrave(bitmap)),
    sync: true,
  };
}

function toTinyScore(score: PluginScoreSetting): TinyScoreSetting {
  return {
    n: score.name,
    p: score.power,
    s: score.speed,
    a: score.passes,
    f: score.focalOffset,
  };
}

function toFullScore(score: TinyScoreSetting): PluginScoreSetting {
  return {
    name: score.n,
    power: score.p,
    speed: score.s,
    passes: score.a,
    focalOffset: score.f,
  };
}

function toTinyVectorEngrave(vectorEngrave: PluginVectorEngraveSetting): TinyVectorEngraveSetting {
  return {
    n: vectorEngrave.name,
    p: vectorEngrave.power,
    s: vectorEngrave.speed,
    a: vectorEngrave.passes,
    f: vectorEngrave.focalOffset,
    g: vectorEngrave.scanGap,
  };
}

function toFullVectorEngrave(vectorEngrave: TinyVectorEngraveSetting): PluginVectorEngraveSetting {
  return {
    name: vectorEngrave.n,
    power: vectorEngrave.p,
    speed: vectorEngrave.s,
    passes: vectorEngrave.a,
    focalOffset: vectorEngrave.f,
    scanGap: vectorEngrave.g,
  };
}

function toTinyBitmmapEngrave(bitmapEngrave: PluginBitmapEngraveSetting): TinyBitmapEngraveSetting {
  return {
    n: bitmapEngrave.name,
    p: bitmapEngrave.power,
    s: bitmapEngrave.speed,
    a: bitmapEngrave.passes,
    f: bitmapEngrave.focalOffset,
    g: bitmapEngrave.scanGap,
    rm: bitmapEngrave.renderMethod,
    re: bitmapEngrave.rescaleMethod,
    ip: bitmapEngrave.minimumGrayPercent,
    ap: bitmapEngrave.maximumGrayPercent,
    t: bitmapEngrave.horizontalTiming,
  };
}

function toFullBitmapEngrave(bitmapEngrave: TinyBitmapEngraveSetting): PluginBitmapEngraveSetting {
  return {
    name: bitmapEngrave.n,
    power: bitmapEngrave.p,
    speed: bitmapEngrave.s,
    passes: bitmapEngrave.a,
    focalOffset: bitmapEngrave.f,
    scanGap: bitmapEngrave.g,
    renderMethod: bitmapEngrave.rm,
    rescaleMethod: bitmapEngrave.re,
    minimumGrayPercent: bitmapEngrave.ip,
    maximumGrayPercent: bitmapEngrave.ap,
    horizontalTiming: bitmapEngrave.t,
  };
}
