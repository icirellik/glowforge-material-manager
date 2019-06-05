import {
  getGlowforgeMaterials,
  getRawMaterials,
  getSynchronizedMaterials,
  getUrl,
  removeSynchronizedMaterial,
  storeGlowforgeMaterials,
  storeRawMaterials,
  storeSynchronizedMaterial,
} from './chromeWrappers';
import {
  compress,
  decompress,
  hashMaterial,
  hashTitle,
  sha1,
} from './utils';
import {
  PluginBitmapEngraveSetting,
  PluginCutSetting,
  PluginMaterial,
  PluginMaterialId,
  PluginScoreSetting,
  PluginVectorEngraveSetting,
} from './materialRaw';
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

/**
 *
 * @param materialId
 */
export async function removeMaterial(materialId: PluginMaterialId) {
  const materials = await getGlowforgeMaterials();
  const newMaterials = await storeGlowforgeMaterials(
    materials.filter(material => material.id !== materialId)
  );
  console.log(`Material removed ${materialId}`);
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
    materials.filter(material => material.title !== title)
  );
  console.log(`Material removed ${title}`);
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
    rawMaterials.filter(material => `${material.thickName} ${material.name}` !== title)
  );
  console.log(`Raw material removed ${title}`);
  return newRawMaterials;
}

/**
 * Stores a material in the cloud.
 *
 * @param material The material to syncronize with the cloud.
 */
export async function sendCloudMaterial(material: PluginMaterial) {
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

export async function fullSynchronizedMaterials(remove=false) {
  console.log(`Synchronizing Full ${remove}`);
  const synchronizedMaterials = await getSynchronizedMaterials();
  const rawMaterials = await getRawMaterials();

  console.log(synchronizedMaterials);
  const currentTitleHashes: string[] = [];
  const currentDataHashes = [];
  const rawMaterialTitleMap: any = {};
  const rawMaterialDataMap: any = {};
  for (let i = 0; i < rawMaterials.length; i++) {
    const material = rawMaterials[i];
    const titleHash = await hashTitle(material);
    const dataHash = await hashMaterial(material);
    currentTitleHashes.push(titleHash);
    currentDataHashes.push(dataHash);
    rawMaterialTitleMap[titleHash] = material;
    rawMaterialDataMap[dataHash] = material;
  }

  console.log('Current:');
  console.log(currentTitleHashes);
  console.log(currentDataHashes);
  console.log(rawMaterialTitleMap);
  console.log(rawMaterialDataMap);

  const removeableHashes = currentTitleHashes.filter(hash => {
    return !synchronizedMaterials.hasOwnProperty(hash);
  });
  console.log('Removeable:');
  console.log(removeableHashes);

  const newHashes = Object.keys(synchronizedMaterials).filter(hash => {
    return currentTitleHashes.indexOf(hash) === -1;
  });
  console.log('Added:');
  console.log(newHashes);

  const updatedHashes = currentTitleHashes.filter(hash => {
    return synchronizedMaterials.hasOwnProperty(hash);
  });
  console.log('Existing:');
  console.log(updatedHashes);

  // Remove old.
  if (remove) {
    const removable = removeableHashes.map(hash => {
      return rawMaterialTitleMap[hash];
    });
    console.log(removable)
    for (let i = 0; i < removable.length; i++) {
      const material = await removable[i];
      const title = `${material.thickName} ${material.name}`;
      console.log(`Will remove ${title}`);
      await removeMaterialTitle(title);
      await removeRawMaterial(title);
    }
  }

  // Create new.
  for (let i = 0; i < newHashes.length; i++) {
    const hash = newHashes[i];
    const binaryData = synchronizedMaterials[hash];
    const json = toFullMaterial(decompress(binaryData));
    console.log(`Adding ${json.thickName} ${json.name}`);

    // Hash the title and take the first seven for the id.
    const { thickName, name } = json;
    const title = `${thickName} ${name}`
    const titleHash = await sha1(title);
    const id = `Custom:${titleHash.substring(0, 7)}`;

    const full = await getGlowforgeMaterials();
    const raw = await getRawMaterials();
    const newMaterial = await createMaterial(json, id);

    await storeGlowforgeMaterials([...full, newMaterial]);
    await storeRawMaterials([...raw, json]);
  }

  // Update existing.
  for (let i = 0; i < updatedHashes.length; i++) {
    const hash = updatedHashes[i];
    const binaryData = synchronizedMaterials[hash];
    const json = toFullMaterial(decompress(binaryData));
    const dataHash = await hashMaterial(json);
    console.log(`Updating ${hash} -> ${dataHash}`);

    if (!rawMaterialDataMap.hasOwnProperty(dataHash)) {
      // Remove
      const title = `${json.thickName} ${json.name}`;
      await removeMaterialTitle(title);
      await removeRawMaterial(title);

      // Hash the title and take the first seven for the id.
      const titleHash = await sha1(title);
      const id = `Custom:${titleHash.substring(0, 7)}`;

      // Replace
      const full = await getGlowforgeMaterials();
      const raw = await getRawMaterials();
      const newMaterial = await createMaterial(json, id);

      await storeGlowforgeMaterials([...full, newMaterial]);
      await storeRawMaterials([...raw, json]);

      console.log('Modified');
    }
  }
  console.log('Synchronized');
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
      display_options: null
    },
    settings: [
      createSettings(material, 'basic'),
      createSettings(material, 'pro')
    ]
  };
}

/**
 * Creates the settings for a given tube type.
 */
function createSettings(material: PluginMaterial, tubeType: GFMaterialTubeType): GFMaterialSettings {
  return {
    description: `${material.thickName} ${material.name} Settings`,
    active_date: "2017-04-06T00:00-07:00",
    environment: [
      'production'
    ],
    tube_type: tubeType,
    cut_setting: createCutSettings(material.cut),
    score_settings: material.scores.map((score: any) => {
      return createScoreSettings(score);
    }),
    vector_engrave_settings: material.vectors.map((vector: any) => {
      return createVectorEngraveSettings(vector);
    }),
    bitmap_engrave_settings: material.bitmaps.map((bitmap: any) => {
      return createBitmapEngraveSettings(bitmap);
    }),
  }
}

/**
 * Creates a new set of cut settings.
 */
function createCutSettings(cut: PluginCutSetting): GFCutSetting {
  return {
    power: cut.power,
    speed: cut.speed,
    passes: cut.passes,
    focal_offset: cut.focalOffset,
  };
}

/**
 * Creates a new set of score settings.
 */
function createScoreSettings(score: PluginScoreSetting): GFScoreSetting {
  return {
    power: score.power,
    speed: score.speed,
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
    power: vectorEngrave.power,
    speed: vectorEngrave.speed,
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
    power: bitmapEngrave.power,
    speed: bitmapEngrave.speed,
    passes: bitmapEngrave.passes,
    focal_offset: bitmapEngrave.focalOffset,
    scangap: bitmapEngrave.scanGap,
    render_method: null,
    rescale_method: "LagrangeFilter",
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
    s: material.scores.map(score => toTinyScore(score)),
    v: material.vectors.map(vector => toTinyVectorEngrave(vector)),
    b: material.bitmaps.map(bitmap => toTinyBitmmapEngrave(bitmap)),
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
    scores: tinyMaterial.s.map(score => toFullScore(score)),
    vectors: tinyMaterial.v.map(vector => toFullVectorEngrave(vector)),
    bitmaps: tinyMaterial.b.map(bitmap => toFullBitmapEngrave(bitmap)),
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
