import { getLocalStorage, storeGlowforgeMaterials } from '../lib/chromeWrappers';
import { sha1 } from '../lib/utils';

/**
 * Upgrades any legacy ids to the latest revision.
 *
 * Only glowforge materials need to be updated in this migration.
 */
export default async function migrate(): Promise<boolean> {
  let upgraded = false;

  const localStorage = await getLocalStorage();

  const _materials = [];
  for (let i = 0; i < localStorage.materials!.length; i += 1) {
    // Update hashes
    const material = localStorage.materials![i];
    const hash = await sha1(material.title);
    const id = hash.substring(0, 7);

    if (`Custom:${id}` !== material.id) {
      upgraded = true;
      _materials.push({
        ...material,
        id: `Custom:${id}`,
      });
    } else {
      _materials.push(material);
    }
  }

  if (upgraded) {
    console.log('migration \'#3\' applied');
    await storeGlowforgeMaterials(_materials);
  }

  return upgraded;
}
