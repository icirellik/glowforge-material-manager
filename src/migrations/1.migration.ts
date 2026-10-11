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
 * Original migrations, #1 and #2. Deprecated and Disabled.
 */
export default async function migrate(): Promise<boolean> {
  let upgraded = false;

  const localStorage = await getLocalStorage();

  const _materials = localStorage.materials!.map((material: GFMaterial) => {
    if (
      !Object.hasOwn(material, 'nominal_thickness') ||
      material.nominal_thickness === null ||
      material.nominal_thickness ===
        parseFloat(String(material.nominal_thickness))
    ) {
      return material;
    }
    upgraded = true;
    return {
      ...material,
      nominal_thickness: asFloat(String(material.nominal_thickness)),
    };
  });

  const _rawMaterials = localStorage.rawMaterials!.map(
    (rawMaterial: PluginMaterial) => {
      if (
        !Object.hasOwn(rawMaterial, 'thickness') ||
        rawMaterial.thickness === null ||
        rawMaterial.thickness === parseFloat(String(rawMaterial.thickness))
      ) {
        return rawMaterial;
      }
      upgraded = true;
      return {
        ...rawMaterial,
        thickness: asFloat(String(rawMaterial.thickness)),
      };
    },
  );

  if (upgraded) {
    console.log("migration '#1' applied");
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
