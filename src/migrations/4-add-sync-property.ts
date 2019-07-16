import { getLocalStorage, storeRawMaterials } from '../lib/chromeWrappers';
import { removeCloudMaterial, sendCloudMaterial } from '../material/material';

/**
 * Upgrades any legacy materials to support the sync property.
 */
export default async function migrate(): Promise<boolean> {
  let upgraded = false;

  const localStorage = await getLocalStorage();

  const _rawMaterials = [];
  for (let i = 0; i < localStorage.rawMaterials!.length; i += 1) {
    const rawMaterial: any = localStorage.rawMaterials![i];
    if (!rawMaterial.sync) {
      rawMaterial.sync = true;
      upgraded = true;
      _rawMaterials.push({
        ...rawMaterial,
        sync: true,
      });
    } else {
      _rawMaterials.push(rawMaterial);
    }
  }

  if (upgraded) {
    console.log('migration \'#4\' applied');

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
