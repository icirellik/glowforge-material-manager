import {
  getMaterials,
  getRawMaterials,
  getSynchronizedMaterials,
  getUrl,
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

// Internal Plugin Data Structure
export type RawMaterial = {
  name: string;
  thickName: string;
  thickness: any;
  bitmaps: PluginBitmapEngraveSetting[];
  cut: PluginCutSetting;
  scores: PluginScoreSetting[];
  vectors: PluginVectorEngraveSetting[];
};

// Glowforge Redux Material Shape
export type MaterialId = any;

export type PluginCutSetting = {
  focalOffset: number | null;
  passes: number;
  power: number;
  speed: number;
}

export type PluginScoreSetting = {
  focalOffset: number | null;
  name: string;
  passes: number;
  power: number;
  speed: number;
}

export type PluginVectorEngraveSetting = {
  focalOffset: number | null;
  name: string;
  passes: number;
  power: number;
  scanGap: number;
  speed: number;
}

export type PluginBitmapEngraveSetting = {
  power: number;
  speed: number;
  passes: number;
  focalOffset: number | null;
  scanGap: number;
  name: string;
  renderMethod: 'FloydSteinbergDitherMethod' | 'RiemersmaDitherMethod' | null;
  rescaleMethod: 'LagrangeFilter';
  minimumGrayPercent: null;
  maximumGrayPercent: null;
  horizontaTiming: null;
}

export type TinyMaterial = {
  // name
  n: string;
  // thickName
  t: string;
  // thickness
  d: any;
  // cut
  c: TinyCutSetting;
  // scores
  s: TinyScoreSetting[];
  // vectors
  v: TinyVectorEngraveSetting[];
  // bitmaps
  b: TinyBitmapEngraveSetting[];
}

export type TinyCutSetting = {
  // focalOffset
  f: number | null;
  // passes
  a: number;
  // power
  p: number;
  // speed
  s: number;
}

export type TinyScoreSetting = {
  // focalOffset
  f: number | null;
  // name
  n: string;
  // passes
  a: number;
  // power
  p: number;
  // speed
  s: number;
}

export type TinyVectorEngraveSetting = {
  // focalOffset
  f: number | null;
  // name
  n: string;
  // passes
  a: number;
  // power
  p: number;
  // scanGap
  g: number;
  // speed
  s: number;
}

export type TinyBitmapEngraveSetting = {
  // power
  p: number;
  // speed
  s: number;
  // passes
  a: number;
  // focalOffset
  f: number | null;
  // scanGap
  g: number;
  // name
  n: string;
  // renderMethod
  rm: 'FloydSteinbergDitherMethod' | 'RiemersmaDitherMethod' | null;
  // rescaleMethod
  re: 'LagrangeFilter';
  // minimumGrayPercent
  ip: null;
  // maximumGrayPercent
  ap: null;
  // horizontaTiming
  t: null;
}

export type GFMaterialEnvironment = 'production';
export type GFMaterialTubeType = 'basic' | 'pro';

export type GFMaterial = {
  // Format "Custom:0"
  id: string;
  nominal_thickness: null | number;
  sku: string;
  thickness_name: string;
  title: string;
  settings: GFMaterialSettings[];
  variety: GFMaterialVariety;
};

export type GFMaterialSettings = {
  active_date: string;
  bitmap_engrave_settings: GFBitmapEngraveSetting[];
  cut_setting: GFCutSetting;
  description: string;
  environment: GFMaterialEnvironment[];
  score_settings: GFScoreSetting[];
  tube_type: GFMaterialTubeType;
  vector_engrave_settings: GFEngraveSetting[];
}

export type GFMaterialVariety = {
  common_name: string;
  display_options: null;
  name: string;
  thumbnails: string[];
  type_name: string;
}

export type GFOutcome = {
  name: string;
  dev_id: string;
}

export type GFCutSetting = {
  power: number;
  speed: number;
  passes: number;
  focal_offset: number | null;
}

export type GFScoreSetting = {
  power: number;
  speed: number;
  passes: number;
  focal_offset: number | null;
  uses: null;
  display_color_mask: null;
  outcome: GFOutcome;
}

export type GFEngraveSetting = {
  power: number;
  speed: number;
  passes: number;
  focal_offset: number | null;
  scangap: number;
  uses: null;
  display_color_mask: null;
  outcome: GFOutcome;
}

export type GFBitmapEngraveSetting = {
  power: number;
  speed: number;
  passes: number;
  focal_offset: number | null;
  scangap: number;
  render_method: 'FloydSteinbergDitherMethod' | 'RiemersmaDitherMethod' | null;
  rescale_method: 'LagrangeFilter';
  minimum_gray_percent: null;
  maximum_gray_percent: null;
  horizontal_timing: null;
  uses: null;
  display_color_mask: null;
  outcome: GFOutcome;
}

/**
 * Gets the next material id.
 */
export async function getNextMaterialId(): Promise<number> {
  const materials = await getMaterials();
  return materials.map(material => material.id.split(':')[1])
    .reduce((prev: number, cur: string) => {
      const curInt = parseInt(cur, 10);
      return prev > curInt ? prev : curInt;
    }, -1) + 1;
}

export async function removeMaterial(materialId: MaterialId) {
  const materials = await getMaterials();
  const newMaterials = await storeMaterials(
    materials.filter(material => material.id !== materialId)
  );
  console.log(`Material removed ${materialId}`);
  return newMaterials;
}

export async function removeMaterialTitle(title: string) {
  const materials = await getMaterials();
  const newMaterials = await storeMaterials(
    materials.filter(material => material.title !== title)
  );
  console.log(`Material removed ${title}`);
  return newMaterials;
}

export async function removeRawMaterial(title: string) {
  const rawMaterials = await getRawMaterials();
  const newRawMaterials = await storeRawMaterials(
    rawMaterials.filter(material => `${material.thickName} ${material.name}` !== title)
  );
  console.log(`Raw material removed ${title}`);
  return newRawMaterials;
}

export async function sendCloudMaterial(rawMaterial: RawMaterial) {
  const hash = await hashTitle(rawMaterial);
  const compressed = compress(toTinyMaterial(rawMaterial));

  // Sync , check hashes for changes.
  await storeSynchronizedMaterial(hash, compressed);
}

export async function removeCloudMaterial(rawMaterial: RawMaterial) {
  const hash = await hashTitle(rawMaterial);
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
    const nextId = await getNextMaterialId();
    const newMaterial = await createMaterial(json, nextId);

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
      const nextId = await getNextMaterialId();
      const newMaterial = await createMaterial(json, nextId);

      await storeMaterials([...full, newMaterial]);
      await storeRawMaterials([...raw, json]);

      console.log('Modified');
    }
  }
  console.log('Synchronized');
}

/**
 * Creates a new custom material.
 */
export function createMaterial(tempMaterial: RawMaterial, id: number | string): GFMaterial {
  return {
    id: `Custom:${id}`,
    title: `${tempMaterial.thickName} ${tempMaterial.name}`,
    sku: '',
    nominal_thickness: tempMaterial.thickness,
    thickness_name: tempMaterial.thickName,
    variety: {
      name: `${tempMaterial.thickName.toLowerCase().replace(/[ ]/g, '-')}-${tempMaterial.name.toLowerCase().replace(/[ ]/g, '-')}`,
      common_name: `${tempMaterial.thickName} ${tempMaterial.name}`,
      type_name: tempMaterial.name,
      thumbnails: [
        getUrl('custom-material.png'),
      ],
      display_options: null
    },
    settings: [
      createSettings(tempMaterial, 'basic'),
      createSettings(tempMaterial, 'pro')
    ]
  };
}

/**
 * Creates the settings for a given tube type.
 */
function createSettings(tempMaterial: RawMaterial, tubeType: GFMaterialTubeType): GFMaterialSettings {
  return {
    description: `${tempMaterial.thickName} ${tempMaterial.name} Settings`,
    active_date: "2017-04-06T00:00-07:00",
    environment: [
      'production'
    ],
    tube_type: tubeType,
    cut_setting: createCutSettings(tempMaterial.cut),
    score_settings: tempMaterial.scores.map((score: any) => {
      return createScoreSettings(score);
    }),
    vector_engrave_settings: tempMaterial.vectors.map((vector: any) => {
      return createVectorEngraveSettings(vector);
    }),
    bitmap_engrave_settings: tempMaterial.bitmaps.map((bitmap: any) => {
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

export function toTinyMaterial(fullMaterial: RawMaterial): TinyMaterial {
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

export function toFullMaterial(tinyMaterial: TinyMaterial): RawMaterial {
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
    t: bitmapEngrave.horizontaTiming,
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
    horizontaTiming: bitmapEngrave.t,
  };
}
