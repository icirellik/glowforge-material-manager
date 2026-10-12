import {
  getGlowforgeMaterials,
  getRawMaterials,
  getSynchronizedMaterials,
  storeGlowforgeMaterials,
  storeRawMaterials,
} from '../lib/chromeWrappers';
import type { SynchronizedMaterials } from '../lib/chromeWrappers';
import {
  createMaterial,
  removeMaterialTitle,
  removeRawMaterial,
} from './material';
import { hashMaterial, hashTitle } from '../lib/utils';
import { materialIdForTitle } from './materialId';
import type { PluginMaterial } from './materialPlugin';
import { toFullMaterial } from './materialConversion';
import { decodeCloudMaterial } from './materialCloudFormat';
import type { CloudDecodeResult } from './materialCloudFormat';
import type { TinyMaterial } from './materialTiny';

// The cloud values decoded in the last sync, by key. The popup syncs every
// 750 ms, so only values that changed are decoded again.
let decodedValues = new Map<
  string,
  { value: string; result: CloudDecodeResult }
>();

/**
 * Decodes the cloud's materials by key. Values that a newer version wrote,
 * or that are broken, are left out, with a warning the first time.
 */
function decodeCloudMaterials(
  synchronizedMaterials: SynchronizedMaterials,
): Map<string, TinyMaterial> {
  const previous = decodedValues;
  decodedValues = new Map();
  const materials = new Map<string, TinyMaterial>();
  for (const [key, value] of Object.entries(synchronizedMaterials)) {
    // Newer versions might store something other than a string.
    const text =
      typeof value === 'string' ? value : (JSON.stringify(value) ?? '');
    const cached = previous.get(key);
    let result = cached?.value === text ? cached.result : undefined;
    if (!result) {
      result = decodeCloudMaterial(value);
      if (result.status === 'unsupported') {
        console.warn(`Skipped cloud material ${key}, from a newer version`);
      } else if (result.status === 'invalid') {
        console.warn(`Skipped cloud material ${key}: ${result.error}`);
      }
    }
    decodedValues.set(key, { value: text, result });
    if (result.status === 'ok') {
      materials.set(key, result.material);
    }
  }
  return materials;
}

/**
 * Handles cloud synchronization.
 *
 * @param remove If true enables destructive changes to occur from cloud sync.
 */
export async function syncronizeMaterials(remove = false): Promise<boolean> {
  const synchronizedMaterials = await getSynchronizedMaterials();
  const cloudMaterials = decodeCloudMaterials(synchronizedMaterials);
  const rawMaterials = await getRawMaterials();

  const currentTitleHashes: string[] = [];
  const titleHashToPluginMaterialMap: { [key: string]: PluginMaterial } = {};
  const dataHashToPluginMaterialMap: { [key: string]: PluginMaterial } = {};
  for (let i = 0; i < rawMaterials.length; i += 1) {
    const material = rawMaterials[i];
    const titleHash = await hashTitle(material);
    const dataHash = await hashMaterial(material);
    currentTitleHashes.push(titleHash);
    titleHashToPluginMaterialMap[titleHash] = material;
    dataHashToPluginMaterialMap[dataHash] = material;
  }

  // These are items that no longer exist in the cloud but still exist locally
  // that we may want to delete. A value this version can't read still counts
  // as being in the cloud.
  const removableTitleHashes = currentTitleHashes.filter(
    (titleHash) => !Object.hasOwn(synchronizedMaterials, titleHash),
  );

  // These are items in the cloud that need to be added locally.
  const newTitleHashes = [...cloudMaterials.keys()].filter(
    (titleHash) => currentTitleHashes.indexOf(titleHash) === -1,
  );

  // These are items that are both in the cloud and are local.
  const sharedTitleHashes = currentTitleHashes.filter((titleHash) =>
    cloudMaterials.has(titleHash),
  );

  // If there are hashes locally that are not in the cloud remove them. By
  // default syncronization does not make destructive actions so local removals
  // are typically not done.
  let modified = false;
  if (remove) {
    const removablePluginMaterials = removableTitleHashes.map(
      (hash) => titleHashToPluginMaterialMap[hash],
    );
    for (let i = 0; i < removablePluginMaterials.length; i += 1) {
      const { thickName, name } = removablePluginMaterials[i];
      const title = `${thickName} ${name}`;
      await removeMaterialTitle(title);
      await removeRawMaterial(title);
      modified = true;
    }
  }

  // New and changed materials are collected and stored together, so a new
  // computer with hundreds of materials in the cloud writes them once.
  const replacedTitles = new Set<string>();
  const added: { pluginMaterial: PluginMaterial; id: string }[] = [];

  // Create new.
  for (const titleHash of newTitleHashes) {
    const pluginMaterial = toFullMaterial(cloudMaterials.get(titleHash)!);
    added.push({ pluginMaterial, id: titleHash.substring(0, 7) });
  }

  // Check for modifications.
  for (const titleHash of sharedTitleHashes) {
    const pluginMaterial = toFullMaterial(cloudMaterials.get(titleHash)!);
    const pluginMaterialDataHash = await hashMaterial(pluginMaterial);

    // If the local mateiral has sync disabled.
    if (!titleHashToPluginMaterialMap[titleHash].sync) {
      continue;
    }

    // If the remote data hash is different from the local hash update the local
    // material.
    if (!Object.hasOwn(dataHashToPluginMaterialMap, pluginMaterialDataHash)) {
      const title = `${pluginMaterial.thickName} ${pluginMaterial.name}`;
      replacedTitles.add(title);
      added.push({ pluginMaterial, id: await materialIdForTitle(title) });
    }
  }

  if (added.length > 0) {
    const glowforgeMaterials = (await getGlowforgeMaterials()).filter(
      (material) => !replacedTitles.has(material.title),
    );
    const pluginMaterials = (await getRawMaterials()).filter(
      (material) =>
        !replacedTitles.has(`${material.thickName} ${material.name}`),
    );
    for (const { pluginMaterial, id } of added) {
      glowforgeMaterials.push(createMaterial(pluginMaterial, id));
      pluginMaterials.push(pluginMaterial);
    }
    await storeGlowforgeMaterials(glowforgeMaterials);
    await storeRawMaterials(pluginMaterials);
    modified = true;
  }

  console.log(`Synchronized remove=${remove} modified=${modified}`);
  return modified;
}
