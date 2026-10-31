import {
  getGlowforgeMaterials,
  getRawMaterials,
  getUrl,
  removeSynchronizedMaterial,
  storeGlowforgeMaterials,
  storeRawMaterials,
  storeSynchronizedMaterial,
} from '../lib/chromeWrappers';
import { hashTitle } from '../lib/utils';
import type {
  PluginBitmapEngraveSetting,
  PluginCutSetting,
  PluginMaterial,
  PluginMaterialId,
  PluginScoreSetting,
  PluginVectorEngraveSetting,
} from './materialPlugin';
import type {
  GFBitmapEngraveSetting,
  GFCutSetting,
  GFEngraveSetting,
  GFMaterial,
  GFMaterialSettings,
  GFMaterialTubeType,
  GFScoreSetting,
} from './materialGlowforge';
import { clamp } from '../lib/glowforgeUnits';
import { toTinyMaterial } from './materialConversion';
import { encodeCloudMaterial } from './materialCloudFormat';

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
    rawMaterials.filter(
      (material) => `${material.thickName} ${material.name}` !== title,
    ),
  );
  return newRawMaterials;
}

/**
 * Stores a material in the cloud. Rejects when Chrome refuses, like when the
 * cloud storage is full.
 *
 * @param material The material to syncronize with the cloud.
 */
export async function sendCloudMaterial(material: PluginMaterial) {
  if (!material.sync) {
    return;
  }

  const hash = await hashTitle(material);
  const value = encodeCloudMaterial(toTinyMaterial(material));

  await storeSynchronizedMaterial(hash, value);
}

/**
 * Stores a material in the cloud in place of its previous version, if it had
 * one. Rejects when Chrome refuses, like when the cloud storage is full.
 *
 * A renamed material's old copy is removed first, so a rename works when the
 * cloud is full. When the new copy is refused, the copy under its title is
 * removed too: sync prefers the cloud's copy, so an old one left there would
 * undo the change. The material is then only on this computer until it's
 * saved again, and other computers keep the copies they have.
 *
 * @param material The material as it is now.
 * @param previous The material before the change, if it was saved before.
 */
export async function replaceCloudMaterial(
  material: PluginMaterial,
  previous?: PluginMaterial,
) {
  const hash = await hashTitle(material);
  if (previous) {
    const previousHash = await hashTitle(previous);
    if (previousHash !== hash || !material.sync) {
      await removeSynchronizedMaterial(previousHash);
    }
  }
  if (!material.sync) {
    return;
  }

  try {
    const value = encodeCloudMaterial(toTinyMaterial(material));
    await storeSynchronizedMaterial(hash, value);
  } catch (error) {
    await removeSynchronizedMaterial(hash);
    throw error;
  }
}

/**
 * Removes a material from the cloud.
 *
 * @param material The material to remove from the cloud.
 */
export async function removeCloudMaterial(material: PluginMaterial) {
  const hash = await hashTitle(material);
  return removeSynchronizedMaterial(hash);
}

/**
 * Removes the `Custom:` prefix from a material id. Older versions could save
 * ids with the prefix twice.
 */
export function stripCustomPrefix(id: string): string {
  return id.replace(/^(Custom:)+/, '');
}

/**
 * Creates a new custom material.
 */
export function createMaterial(
  material: PluginMaterial,
  id: number | string,
): GFMaterial {
  return {
    id: `Custom:${stripCustomPrefix(String(id))}`,
    title: `${material.thickName} ${material.name}`,
    sku: '',
    nominal_thickness: material.thickness,
    thickness_name: material.thickName,
    variety: {
      name: `${material.thickName.toLowerCase().replace(/[ ]/g, '-')}-${material.name.toLowerCase().replace(/[ ]/g, '-')}`,
      common_name: `${material.thickName} ${material.name}`,
      type_name: material.name,
      thumbnails: [getUrl('custom-material.png')],
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
function createSettings(
  material: PluginMaterial,
  tubeType: GFMaterialTubeType,
): GFMaterialSettings {
  return {
    description: `${material.thickName} ${material.name} Settings`,
    active_date: '2017-04-06T00:00-07:00',
    environment: ['production'],
    tube_type: tubeType,
    cut_setting: createCutSettings(material.cut),
    score_settings: material.scores.map((score) => createScoreSettings(score)),
    vector_engrave_settings: material.vectors.map((vector) =>
      createVectorEngraveSettings(vector),
    ),
    bitmap_engrave_settings: material.bitmaps.map((bitmap) =>
      createBitmapEngraveSettings(bitmap),
    ),
  };
}

// Speeds are kept from going below the slowest a machine allows, but not
// above a fastest, which depends on the machine: a Pro allows cuts up to
// 30000. The GFUI takes material speeds above a machine's range, as some of
// Glowforge's own materials have.
const MINIMUM_SPEED = 100;

/**
 * Creates a new set of cut settings.
 */
function createCutSettings(cut: PluginCutSetting): GFCutSetting {
  return {
    power: clamp(cut.power, 0, 100),
    speed: Math.max(cut.speed, MINIMUM_SPEED),
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
    speed: Math.max(score.speed, MINIMUM_SPEED),
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
function createVectorEngraveSettings(
  vectorEngrave: PluginVectorEngraveSetting,
): GFEngraveSetting {
  return {
    power: clamp(vectorEngrave.power, 0, 100),
    speed: Math.max(vectorEngrave.speed, MINIMUM_SPEED),
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
function createBitmapEngraveSettings(
  bitmapEngrave: PluginBitmapEngraveSetting,
): GFBitmapEngraveSetting {
  return {
    power: clamp(bitmapEngrave.power, 0, 100),
    speed: Math.max(bitmapEngrave.speed, MINIMUM_SPEED),
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
