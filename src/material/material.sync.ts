import {
  getGlowforgeMaterials,
  getRawMaterials,
  getSynchronizedMaterials,
  storeGlowforgeMaterials,
  storeRawMaterials,
} from '../lib/chromeWrappers';
import {
  createMaterial,
  removeMaterialTitle,
  removeRawMaterial,
  toFullMaterial,
} from './material';
import {
  decompress,
  hashMaterial,
  hashTitle,
} from '../lib/utils';
import { sha1 } from '../lib/crypto';
import { PluginMaterial } from './materialPlugin';

/**
 * Handles cloud synchronization.
 *
 * @param remove If true enables destructive changes to occur from cloud sync.
 */
export async function syncronizeMaterials(remove=false): Promise<boolean> {
  // console.log(`Synchronizing Full remove=${remove}`);
  const synchronizedMaterials = await getSynchronizedMaterials();
  const rawMaterials = await getRawMaterials();

  // console.log(synchronizedMaterials);
  const currentTitleHashes: string[] = [];
  const currentDataHashes: string[] = [];
  const titleHashToPluginMaterialMap: {[key: string]: PluginMaterial} = {};
  const dataHashToPluginMaterialMap: {[key: string]: PluginMaterial} = {};
  for (let i = 0; i < rawMaterials.length; i++) {
    const material = rawMaterials[i];
    const titleHash = await hashTitle(material);
    const dataHash = await hashMaterial(material);
    currentTitleHashes.push(titleHash);
    currentDataHashes.push(dataHash);
    titleHashToPluginMaterialMap[titleHash] = material;
    dataHashToPluginMaterialMap[dataHash] = material;
  }

  // console.log('Current:');
  // console.log(currentTitleHashes);
  // console.log(currentDataHashes);
  // console.log(titleHashToPluginMaterialMap);
  // console.log(dataHashToPluginMaterialMap);

  // These are items that no longer exist in the cloud but still exist locally
  // that we may want to delete.
  const removableTitleHashes = currentTitleHashes.filter(titleHash => {
    return !synchronizedMaterials.hasOwnProperty(titleHash);
  });
  // console.log('Removable:');
  // console.log(removableTitleHashes);

  // These are items in the cloud that need to be added locally.
  const newTitleHashes = Object.keys(synchronizedMaterials).filter(titleHash => {
    return currentTitleHashes.indexOf(titleHash) === -1;
  });
  // console.log('Added:');
  // console.log(newTitleHashes);

  // These are items that are both in the cloud and are local.
  const sharedTitleHashes = currentTitleHashes.filter(titleHash => {
    return synchronizedMaterials.hasOwnProperty(titleHash);
  });
  // console.log('Shared:');
  // console.log(sharedTitleHashes);

  // If there are hashes locally that are not in the cloud remove them. By
  // default syncronization does not make destructive actions so local removals
  // are typically not done.
  let modified = false;
  if (remove) {
    const removablePluginMaterials = removableTitleHashes.map(hash => {
      return titleHashToPluginMaterialMap[hash];
    });
    // console.log(removablePluginMaterials)
    for (let i = 0; i < removablePluginMaterials.length; i++) {
      const { thickName, name } = removablePluginMaterials[i];
      const title = `${thickName} ${name}`;
      // console.log(`Removing ${title}`);
      await removeMaterialTitle(title);
      await removeRawMaterial(title);
      modified = true;
    }
  }

  // Create new.
  for (let i = 0; i < newTitleHashes.length; i++) {
    const titleHash = newTitleHashes[i];
    const binaryData = synchronizedMaterials[titleHash];
    const pluginMaterial = toFullMaterial(decompress(binaryData));

    const id = `Custom:${titleHash.substring(0, 7)}`;
    // console.log(`Adding '${pluginMaterial.thickName} ${pluginMaterial.name}'`);

    const glowforgeMaterials = await getGlowforgeMaterials();
    const pluginMaterials = await getRawMaterials();

    const glowforgeMaterial = await createMaterial(pluginMaterial, id);
    await storeGlowforgeMaterials([...glowforgeMaterials, glowforgeMaterial]);
    await storeRawMaterials([...pluginMaterials, pluginMaterial]);
    modified = true;
  }

  // Check for modifications.
  for (let i = 0; i < sharedTitleHashes.length; i++) {
    const titleHash = sharedTitleHashes[i];
    const binaryData = synchronizedMaterials[titleHash];
    const pluginMaterial = toFullMaterial(decompress(binaryData));
    const pluginMaterialDataHash = await hashMaterial(pluginMaterial);
    // console.log(`Verifying ${titleHash} -> ${pluginMaterialDataHash}`);

    // If the local mateiral has sync disabled.
    if (!titleHashToPluginMaterialMap[titleHash].sync) {
      // console.log('Not Updating: Local Sync Disabled');
      continue;
    }

    // If the remote data hash is different from the local hash update the local
    // material.
    if (!dataHashToPluginMaterialMap.hasOwnProperty(pluginMaterialDataHash)) {
      // Remove
      const title = `${pluginMaterial.thickName} ${pluginMaterial.name}`;
      // console.log(`Updating '${title}'`);
      await removeMaterialTitle(title);
      await removeRawMaterial(title);

      // Hash the title and take the first seven for the id.
      const titleHash = await sha1(title);
      const id = `Custom:${titleHash.substring(0, 7)}`;

      // Replace
      const glowforgeMaterials = await getGlowforgeMaterials();
      const pluginMaterials = await getRawMaterials();

      const glowforgeMaterial = await createMaterial(pluginMaterial, id);
      await storeGlowforgeMaterials([...glowforgeMaterials, glowforgeMaterial]);
      await storeRawMaterials([...pluginMaterials, pluginMaterial]);
      modified = true;
    }
  }
  console.log(`Synchronized remove=${remove} modified=${modified}`);
  return modified;
}
