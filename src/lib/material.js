/* global chrome:true */

import {
  getMaterials,
  getRawMaterials,
  getSynchronizedMaterials,
  removeSynchronizedMaterial,
  storeMaterials,
  storeRawMaterials,
  storeSynchronizedMaterial,
} from './chromeWrappers';
import {
  compress,
  decompress,
  hashRawMaterial,
  hashTitle,
} from './utils';

export async function removeMaterial(materialId) {
  const materials = await getMaterials();
  const newMaterials = await storeMaterials(
    materials.filter(material => material.id !== materialId)
  );
  console.log(`Material removed ${materialId}`);
  return newMaterials;
}

export async function removeMaterialTitle(title) {
  const materials = await getMaterials();
  const newMaterials = await storeMaterials(
    materials.filter(material => material.title !== title)
  );
  console.log(`Material removed ${title}`);
  return newMaterials;
}

export async function removeRawMaterial(title) {
  const rawMaterials = await getRawMaterials();
  const newRawMaterials = await storeRawMaterials(
    rawMaterials.filter(material => `${material.thickName} ${material.name}` !== title)
  );
  console.log(`Raw material removed ${title}`);
  return newRawMaterials;
}

export async function sendCloudMaterial(rawMaterial) {
  const hash = await hashTitle(rawMaterial);
  const compressed = compress(toTinyMaterial(rawMaterial));

  // Sync , check hashes for changes.
  await storeSynchronizedMaterial(hash, compressed);
}

export async function removeCloudMaterial(rawMaterial) {
  const hash = await hashTitle(rawMaterial);
  return await removeSynchronizedMaterial(hash);
}

export async function fullSynchronizedMaterials(remove=false) {
  console.log(`Synchronizing Full ${remove}`);
  const synchronizedMaterials = await getSynchronizedMaterials();
  const rawMaterials = await getRawMaterials();

  console.log(synchronizedMaterials);
  const currentTitleHashes = [];
  const currentDataHashes = [];
  const rawMaterialTitleMap = {};
  const rawMaterialDataMap = {};
  for (let i = 0; i < rawMaterials.length; i++) {
    const material = rawMaterials[i];
    const titleHash = await hashTitle(material);
    const dataHash = await hashRawMaterial(material);
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

    const full = await getMaterials();
    const raw = await getRawMaterials();
    const newMaterial = createMaterial(json, raw.length);

    await storeMaterials([...full, newMaterial]);
    await storeRawMaterials([...raw, json]);
  }

  // Update existing.
  for (let i = 0; i < updatedHashes.length; i++) {
    const hash = updatedHashes[i];
    const binaryData = synchronizedMaterials[hash];
    const json = toFullMaterial(decompress(binaryData));
    const dataHash = await hashRawMaterial(json);
    console.log(`Updating ${hash} -> ${dataHash}`);

    if (!rawMaterialDataMap.hasOwnProperty(dataHash)) {
      // Remove
      const title = `${json.thickName} ${json.name}`;
      await removeMaterialTitle(title);
      await removeRawMaterial(title);

      // Replace
      const full = await getMaterials();
      const raw = await getRawMaterials();
      const newMaterial = createMaterial(json, raw.length);

      await storeMaterials([...full, newMaterial]);
      await storeRawMaterials([...raw, json]);
    }

  }
  console.log('Synchronized');
}

/**
 * Creates a new custom material.
 */
export function createMaterial(params, id) {
  let material = {
    id: `Custom:${id}`,
    title: `${params.thickName} ${params.name}`,
    sku: '',
    nominal_thickness: params.thickness,
    thickness_name: params.thickName,
    variety: {
      name: `${params.thickName.toLowerCase().replace(/[ ]/g, '-')}-${params.name.toLowerCase().replace(/[ ]/g, '-')}`,
      common_name: `${params.thickName} ${params.name}`,
      type_name: params.name,
      thumbnails: [
        chrome.extension.getURL('custom-material.png'),
      ],
      display_options: null
    },
    settings: [
      createSettings(params, 'basic'),
      createSettings(params, 'pro')
    ]
  };

  return material;
}

/**
 * Creates the settings for a given tube type.
 */
function createSettings(params, tubeType) {
  let settings = {
    description: `${params.thickName} ${params.name} Settings`,
    active_date: "2017-04-06T00:00-07:00",
    environment: [
      "production"
    ],
    tube_type: tubeType,
    cut_setting: createCutSettings(params.cut),
    score_settings: params.scores.map(score => {
      return createScoreSettings(score);
    }),
    vector_engrave_settings: params.vectors.map(vector => {
      return createVectorEngraveSettings(vector);
    }),
    bitmap_engrave_settings: params.bitmaps.map(bitmap => {
      return createBitmapEngraveSettings(bitmap);
    }),
  }
  return settings;
}

/**
 * Creates a new set of cut settings.
 */
function createCutSettings(cut) {
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
function createScoreSettings(score) {
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
function createVectorEngraveSettings(vectorEngrave) {
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
function createBitmapEngraveSettings(bitmapEngrave) {
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

export function toTinyMaterial(fullMaterial) {
  return {
    n: fullMaterial.name,
    t: fullMaterial.thickName,
    d: fullMaterial.thickness,
    c: {
      p: fullMaterial.cut.power,
      s: fullMaterial.cut.speed,
      a: fullMaterial.cut.passes,
      f: fullMaterial.cut.focalOffset,
    },
    s: fullMaterial.scores.map(score => toTinyScore(score)),
    v: fullMaterial.vectors.map(vector => toTinyVectorEngrave(vector)),
    b: fullMaterial.bitmaps.map(bitmap => toTinyBitmmapEngrave(bitmap)),
  };
}

export function toFullMaterial(tinyMaterial) {
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

function toTinyScore(score) {
  return {
    n: score.name,
    p: score.power,
    s: score.speed,
    a: score.passes,
    f: score.focalOffset,
  };
}

function toFullScore(score) {
  return {
    name: score.n,
    power: score.p,
    speed: score.s,
    passes: score.a,
    focalOffset: score.f,
  };
}

function toTinyVectorEngrave(vectorEngrave) {
  return {
    n: vectorEngrave.name,
    p: vectorEngrave.power,
    s: vectorEngrave.speed,
    a: vectorEngrave.passes,
    f: vectorEngrave.focalOffset,
    g: vectorEngrave.scanGap,
  };
}

function toFullVectorEngrave(vectorEngrave) {
  return {
    name: vectorEngrave.n,
    power: vectorEngrave.p,
    speed: vectorEngrave.s,
    passes: vectorEngrave.a,
    focalOffset: vectorEngrave.f,
    scanGap: vectorEngrave.g,
  };
}

function toTinyBitmmapEngrave(bitmapEngrave) {
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
    t: bitmapEngrave.horizontaTiming,
  };
}

function toFullBitmapEngrave(bitmapEngrave) {
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
    horizontaTiming: bitmapEngrave.t,
  };
}
