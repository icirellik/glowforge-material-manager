/**
 * This is a sample migration function, e.g. an old one that is dated.
 *
async function upgrade() {
  return new Promise (resolve => {
    window.chrome.storage.local.get(null, async (result: StorageLocal) => {
      let upgraded = false;

      // Apply any fixed material upgrades.
      const _materials = [];
      for (let i = 0; i < result.materials!.length; i += 1) {
        // Update hashes
        const material = result.materials![i];
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

      // Apply any setting upgrades.
      const _rawMaterials = [];
      for (let i = 0; i < result.rawMaterials!.length; i += 1) {
        const rawMaterial = result.rawMaterials![i];
        _rawMaterials.push(rawMaterial);
      }

      if (upgraded) {
        console.log('upgraded');
        await storeGlowforgeMaterials(_materials);
        await storeRawMaterials(_rawMaterials);

        for (const rawMaterial of result.rawMaterials!) {
          await removeCloudMaterial(rawMaterial);
        }
        for (const _rawMaterial of _rawMaterials) {
          await sendCloudMaterial(_rawMaterial);
        }
      }

      resolve();
    });
  });
}

*/

export default async function() {

}
