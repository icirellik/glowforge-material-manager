/* global chrome:true */
/**
 * Stores a new material.
 */
function storeMaterial(props) {
  const newMaterial = createMaterial(props);
  chrome.storage.local.get(null, result => {
    console.log('Refreshing materials.');
    console.log(result);
    if (result && result.materials) {
      const materials = result.materials;

      chrome.storage.local.set({
        'materials': [ ...materials, newMaterial ]
      }, function() {
        console.log('New material added:');
        console.log(newMaterial)
      });
    } else {
      console.log('Things ain\'t right');
    }
  });
  return newMaterial;
}

/**
 * Creates a brand new custom material.
 */
function createMaterial(props) {
  let material = {
    id: `${props.thickName.toLowerCase().replace(/[ ]/g, '-')}-${props.name.toLowerCase().replace(/[ ]/g, '-')}`,
    title: `${props.thickName} ${props.name}`,
    sku: '',
    nominal_thickness: props.thickness,
    thickness_name: props.thickName,
    variety: {
      name: `${props.thickName.toLowerCase().replace(/[ ]/g, '-')}-${props.name.toLowerCase().replace(/[ ]/g, '-')}`,
      common_name: `${props.thickName} ${props.name}`,
      type_name: props.name,
      thumbnails: [
        "//images.ctfassets.net/ljtyf78xujn2/LPH1C4ibUkQimYKuA6iAq/c5abd83cffd111e8366daa2c137e6f19/Leather-1.png"
      ],
      display_options: null
    },
    settings: [
      createSettings(props, 'basic'),
      createSettings(props, 'pro')
    ]
  };

  return material;
}

/**
 * Creates the settings for a given tube type.
 */
function createSettings(props, tubeType) {
  let settings = {
    description: `${props.thickName} ${props.name} Settings`,
    active_date: "2017-04-06T00:00-07:00",
    environment: [
      "production"
    ],
    tube_type: tubeType,
    cut_setting: createCutSettings(props),
    score_settings: [
      createScoreSettings(props)
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
function createCutSettings(props) {
  return {
    power: props.cut.power,
    speed: props.cut.speed,
    passes: props.cut.passes,
    focal_offset: props.cut.focalOffset
  };
}

/**
 * Creates a new set of score settings.
 */
function createScoreSettings(props) {
  return {
    power: props.score.power,
    speed: props.score.speed,
    passes: props.score.passes,
    focal_offset: props.score.focalOffset,
    uses: [
      "default"
    ],
    display_color_mask: null,
    outcome: {
      name: "High Quality",
      dev_id: "high-quality"
    }
  };
}

export default storeMaterial;
