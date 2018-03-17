import { getStoredMaterials, setStoredMaterials, reload } from './chromeWrappers';

/**
 * Stores a new material.
 */
async function storeMaterial(material) {
  console.log('Storing materials.');
  const materials = await getStoredMaterials();
  await setStoredMaterials([ ...materials, material ]);
  console.log('New material added:');
  console.log(material)
  return material;
}

/**
 * Removes a material.
 */
async function removeMaterial(materialId) {
  console.log(`Removing material ${materialId}`);
  const materials = await getStoredMaterials();
  const newMaterials = await setStoredMaterials(materials.filter(material => material.id !== materialId));
  console.log(`Material removed ${materialId}`);
  await reload();
  return newMaterials;
}

/**
 * Creates a brand new custom material.
 */
function createMaterial(params, id) {
  console.log(params)
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
        "//images.ctfassets.net/ljtyf78xujn2/LPH1C4ibUkQimYKuA6iAq/c5abd83cffd111e8366daa2c137e6f19/Leather-1.png"
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
    cut_setting: createCutSettings(params),
    score_settings: [
      createScoreSettings('High Quality', params),
      createScoreSettings('Shallow', params)
    ],
    vector_engrave_settings: [

    ],
    bitmap_engrave_settings: [

    ]
  }
  return settings;
}

/**
 * Creates a new set of cut settings.
 */
function createCutSettings(params) {
  return {
    power: params.cut.power,
    speed: params.cut.speed,
    passes: params.cut.passes,
    focal_offset: params.cut.focalOffset
  };
}

/**
 * Creates a new set of score settings.
 */
function createScoreSettings(name, params) {
  return {
    power: params.score.power,
    speed: params.score.speed,
    passes: params.score.passes,
    focal_offset: params.score.focalOffset,
    uses: [
      "default"
    ],
    display_color_mask: null,
    outcome: {
      name: name,
      dev_id: name.toLowerCase().replace(/[ ]/g, '-')
    }
  };
}

export {
  createMaterial,
  storeMaterial,
  removeMaterial,
};
