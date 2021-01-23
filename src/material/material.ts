import {
  getGlowforgeMaterials,
  getRawMaterials,
  getUrl,
  removeSynchronizedMaterial,
  storeGlowforgeMaterials,
  storeRawMaterials,
  storeSynchronizedMaterial,
} from '../lib/chromeWrappers';
import {
  compress,
  hashTitle,
} from '../lib/utils';
import {
  PluginBitmapEngraveSetting,
  PluginCutSetting,
  PluginMaterial,
  PluginMaterialId,
  PluginScoreSetting,
  PluginVectorEngraveSetting,
} from './materialPlugin';
import {
  GFBitmapEngraveSetting,
  GFCutSetting,
  GFEngraveSetting,
  GFMaterial,
  GFMaterialSettings,
  GFMaterialTubeType,
  GFScoreSetting,
} from './materialGlowforge';
import {
  TinyBitmapEngraveSetting,
  TinyMaterial,
  TinyScoreSetting,
  TinyVectorEngraveSetting,
} from './materialTiny';
import { clamp } from '../lib/glowforgeUnits';

/**
 *
 * @param materialId
 */
export async function removeMaterial(materialId: PluginMaterialId) {
  const materials = await getGlowforgeMaterials();
  const newMaterials = await storeGlowforgeMaterials(
    materials.filter((material) => material.id !== materialId),
  );
  return newMaterials;
}

/**
 * Removes a GF Material from local storage by its title.
 *
 * @param title Is of the following format `${material.thickName} ${material.name}`
 */
export async function removeMaterialTitle(title: string) {
  const materials = await getGlowforgeMaterials();
  const newMaterials = await storeGlowforgeMaterials(
    materials.filter((material) => material.title !== title),
  );
  return newMaterials;
}

/**
 * Removes an internal material from local storage by its title.
 *
 * @param title Is of the following format `${material.thickName} ${material.name}`
 */
export async function removeRawMaterial(title: string) {
  const rawMaterials = await getRawMaterials();
  const newRawMaterials = await storeRawMaterials(
    rawMaterials.filter((material) => `${material.thickName} ${material.name}` !== title),
  );
  return newRawMaterials;
}

/**
 * Stores a material in the cloud.
 *
 * @param material The material to syncronize with the cloud.
 */
export async function sendCloudMaterial(material: PluginMaterial) {
  if (!material.sync) {
    return;
  }

  const hash = await hashTitle(material);
  const compressed = compress(toTinyMaterial(material));

  await storeSynchronizedMaterial(hash, compressed);
}

/**
 * Removes a material from the cloud.
 *
 * @param material The material to remove from the cloud.
 */
export async function removeCloudMaterial(material: PluginMaterial) {
  const hash = await hashTitle(material);
  return await removeSynchronizedMaterial(hash);
}

/**
 * Creates a new custom material.
 */
export function createMaterial(material: PluginMaterial, id: number | string): GFMaterial {
  return {
    id: `Custom:${id}`,
    title: `${material.thickName} ${material.name}`,
    sku: '',
    nominal_thickness: material.thickness,
    thickness_name: material.thickName,
    variety: {
      name: `${material.thickName.toLowerCase().replace(/[ ]/g, '-')}-${material.name.toLowerCase().replace(/[ ]/g, '-')}`,
      common_name: `${material.thickName} ${material.name}`,
      type_name: material.name,
      thumbnails: [
        getUrl('custom-material.png'),
      ],
      display_options: null,
    },
    settings: [
      createSettings(material, 'basic'),
      createSettings(material, 'pro'),
    ],
  };
}

/**
 * Creates the settings for a given tube type.
 */
function createSettings(material: PluginMaterial, tubeType: GFMaterialTubeType): GFMaterialSettings {
  return {
    description: `${material.thickName} ${material.name} Settings`,
    active_date: '2017-04-06T00:00-07:00',
    environment: [
      'production',
    ],
    tube_type: tubeType,
    cut_setting: createCutSettings(material.cut),
    score_settings: material.scores.map((score: any) => createScoreSettings(score)),
    vector_engrave_settings: material.vectors.map((vector: any) => createVectorEngraveSettings(vector)),
    bitmap_engrave_settings: material.bitmaps.map((bitmap: any) => createBitmapEngraveSettings(bitmap)),
  };
}

/**
 * Creates a new set of cut settings.
 */
function createCutSettings(cut: PluginCutSetting): GFCutSetting {
  return {
    power: clamp(cut.power, 0, 100),
    speed: clamp(cut.speed, 100, 4000),
    passes: cut.passes,
    focal_offset: cut.focalOffset,
  };
}

/**
 * Creates a new set of score settings.
 */
function createScoreSettings(score: PluginScoreSetting): GFScoreSetting {
  return {
    power: clamp(score.power, 0, 100),
    speed: clamp(score.speed, 100, 4000),
    passes: score.passes,
    focal_offset: score.focalOffset,
    uses: null,
    display_color_mask: null,
    outcome: {
      name: score.name,
      dev_id: score.name.toLowerCase().replace(/[ ]/g, '-'),
    },
  };
}

/**
 * Creates a new set of vector engrave settings.
 */
function createVectorEngraveSettings(vectorEngrave: PluginVectorEngraveSetting): GFEngraveSetting {
  return {
    power: clamp(vectorEngrave.power, 0, 100),
    speed: clamp(vectorEngrave.speed, 100, 8500),
    passes: vectorEngrave.passes,
    focal_offset: vectorEngrave.focalOffset,
    scangap: vectorEngrave.scanGap,
    uses: null,
    display_color_mask: null,
    outcome: {
      name: vectorEngrave.name,
      dev_id: vectorEngrave.name.toLowerCase().replace(/[ ]/g, '-'),
    },
  };
}

/**
 * Creates a new set of bitmap engrave settings.
 */
function createBitmapEngraveSettings(bitmapEngrave: PluginBitmapEngraveSetting): GFBitmapEngraveSetting {
  return {
    power: clamp(bitmapEngrave.power, 0, 100),
    speed: clamp(bitmapEngrave.speed, 100, 8500),
    passes: bitmapEngrave.passes,
    focal_offset: bitmapEngrave.focalOffset,
    scangap: bitmapEngrave.scanGap,
    render_method: null,
    rescale_method: 'LagrangeFilter',
    minimum_gray_percent: null,
    maximum_gray_percent: null,
    horizontal_timing: null,
    uses: null,
    display_color_mask: null,
    outcome: {
      name: bitmapEngrave.name,
      dev_id: bitmapEngrave.name.toLowerCase().replace(/[ ]/g, '-'),
    },
  };
}

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
