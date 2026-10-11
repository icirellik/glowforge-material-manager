import { getLocalStorage, storeRawMaterials } from '../lib/chromeWrappers';
import { sendCloudMaterial } from '../material/material';

/**
 * Upgrades any legacy materials to support the sync property.
 */
export async function migration4(): Promise<boolean> {
  let upgraded = false;

  const localStorage = await getLocalStorage();

  const _rawMaterials = [];
  const _upgradedMaterials = [];
  for (let i = 0; i < localStorage.rawMaterials!.length; i += 1) {
    const rawMaterial: any = localStorage.rawMaterials![i];
    // Only legacy materials are missing the property, `false` means the user
    // turned sync off.
    if (rawMaterial.sync === undefined) {
      upgraded = true;
      const upgradedMaterial = {
        ...rawMaterial,
        sync: true,
      };
      _rawMaterials.push(upgradedMaterial);
      _upgradedMaterials.push(upgradedMaterial);
    } else {
      _rawMaterials.push(rawMaterial);
    }
  }

  if (upgraded) {
    console.log("migration '#4' applied");

    await storeRawMaterials(_rawMaterials);

    // Storing replaces the cloud copy, so there's no need to remove it first.
    for (const _upgradedMaterial of _upgradedMaterials) {
      await sendCloudMaterial(_upgradedMaterial);
    }
  }

  return upgraded;
}
