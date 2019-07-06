import {
  getLocalStorage,
  storeGlowforgeMaterials,
  storeRawMaterials,
} from '../lib/chromeWrappers';
import { GFMaterial } from '../material/materialGlowforge';
import { PluginMaterial } from '../material/materialPlugin';
import { asFloat } from '../lib/utils';
import { removeCloudMaterial, sendCloudMaterial } from '../material/material';

/**
 * Original migrations, #1 and #2. Deprecated.
 */
export default async function migrate(): Promise<boolean> {
  let upgraded = false;

  const localStorage = await getLocalStorage();

  const _materials = localStorage.materials!.map((material: GFMaterial) => {
    if (!material.hasOwnProperty('nominal_thickness') ||
        material.nominal_thickness === null ||
        material.nominal_thickness === parseFloat((material.nominal_thickness as any))
    ) {
      return material;
    }
    upgraded = true;
    return {
      ...material,
      nominal_thickness: asFloat(material.nominal_thickness as any),
    };
  });

  const _rawMaterials = localStorage.rawMaterials!.map((rawMaterial: PluginMaterial) => {
    if (!rawMaterial.hasOwnProperty('thickness') ||
        rawMaterial.thickness === null ||
        rawMaterial.thickness === parseFloat(rawMaterial.thickness)
    ) {
      return rawMaterial;
    }
    upgraded = true;
    return {
      ...rawMaterial,
      thickness: asFloat(rawMaterial.thickness),
    };
  });

  if (upgraded) {
    console.log('migration \'#1\' applied');
    await storeGlowforgeMaterials(_materials);
    await storeRawMaterials(_rawMaterials);

    for (const rawMaterial of localStorage.rawMaterials!) {
      await removeCloudMaterial(rawMaterial);
    }
    for (const _rawMaterial of _rawMaterials) {
      await sendCloudMaterial(_rawMaterial);
    }
  }

  return upgraded;
}
