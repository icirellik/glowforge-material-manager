/**
 * The preset dictionaries for materials in the cloud: bytes that materials
 * are likely to repeat, so the first time a material uses a word or a setting
 * costs a short reference instead of the bytes themselves.
 *
 * A dictionary is frozen once it's released. Values in the cloud were
 * compressed against these exact bytes and must decompress in every later
 * version, and a test checks their SHA-256. Make a new dictionary with a new
 * format tag rather than changing one.
 *
 * DEFLATE's references are cheaper the closer they are, so the parts that
 * help most come last.
 */

// A material as JSON, for the rare material that can't be packed.
const JSON_MATERIAL =
  '{"n":"Birch Plywood","t":"Medium","d":3.175,"c":{"p":100,"s":1562.5,"a":1,"f":null},"s":[{"n":"Score","p":49.5,"s":2050,"a":1,"f":null}],"v":[{"n":"SD Graphic","p":100,"s":3833.333333333333,"a":1,"f":null,"g":5}],"b":[{"n":"HD Graphic","p":33.66,"s":2433.3333333333335,"a":1,"f":null,"g":3,"rm":"FloydSteinbergDitherMethod","re":"LagrangeFilter","ip":null,"ap":null,"t":null},{"n":"Draft Graphic","p":100,"s":8500,"a":1,"f":null,"g":7,"rm":null,"re":"LagrangeFilter","ip":null,"ap":null,"t":null}]}';

// Words from material names, from Glowforge's catalog and other common
// laser materials.
const WORDS =
  'Birch Baltic Plywood Hardwood Cast Extruded Acrylic Clear Black White ' +
  'Mirror Gold Silver Leather Cork Felt Cardstock Paper Cardboard MDF ' +
  'Bamboo Basswood Balsa Walnut Maple Cherry Oak Mahogany Padauk Poplar ' +
  'Alder Pine Cedar Veneer Draftboard Proofgrade Anodized Aluminum Slate ' +
  'Glass Marble Granite Tile Stone Rubber Stamp Fabric Cotton Denim Canvas ' +
  'Wool Foam Coaster Ornament Laminate Two-Tone Matte Glossy Frosted ' +
  'Fluorescent Natural Red Blue Green Yellow Orange Purple Pink Teal Brown ' +
  'Grey Engraving';

// Whole thickness and setting names, as packed strings: length, then UTF-8.
const THICKNESSES = [
  'Thin',
  'Medium',
  'Thick',
  'Extra Thick',
  '1/16"',
  '1/8"',
  '3/16"',
  '1/4"',
  '1/2"',
  '1.5mm',
  '2mm',
  '3mm',
  '4mm',
  '5mm',
  '6mm',
  '12mm',
];
const SETTING_NAMES = [
  'Default',
  'Score',
  'Light Score',
  'Deep Score',
  'Cut',
  'Engrave',
  'Light Engrave',
  'Deep Engrave',
  'Text',
  'Fill',
  'Photo',
  'High Quality',
  'Draft',
  'Draft Graphic',
  'SD Graphic',
  'HD Graphic',
  'Draft Photo',
  'SD Photo',
  'HD Photo',
  '3D Engrave',
  'Deep 3D Engrave',
];

// Three packed materials with typical settings: SAMPLE_MATERIALS in
// materialDictionary.test.ts, which checks they still pack to these bytes.
const PACKED_MATERIALS =
  '0c4361737420416372796c696304312f3822040609640a6e0404050a00010745' +
  '6e677261766509320be8070402010402010550686f746f094b0bac0204020104' +
  '041000074c656174686572045468696e0106c664048420040201020b4c696768' +
  '742053636f7265090a04e6100402010a446565702053636f7265096405e65b04' +
  '020100000d426972636820506c79776f6f64064d656469756d07ce310a640afa' +
  '01040201010553636f72650932048420040201010a534420477261706869630a' +
  '640bf403040201040a020a4844204772617068696306cc340bde020402010406' +
  '0f000d447261667420477261706869630a640be807040201040e0100';

function buildDictionary(): Uint8Array {
  const encoder = new TextEncoder();
  const bytes: number[] = [];
  const text = (value: string) => bytes.push(...encoder.encode(value));
  const packed = (value: string) => {
    const utf8 = encoder.encode(value);
    bytes.push(utf8.length, ...utf8);
  };

  text(JSON_MATERIAL);
  text(WORDS);
  THICKNESSES.forEach(packed);
  SETTING_NAMES.forEach(packed);
  for (let i = 0; i < PACKED_MATERIALS.length; i += 2) {
    bytes.push(parseInt(PACKED_MATERIALS.slice(i, i + 2), 16));
  }
  return new Uint8Array(bytes);
}

/**
 * Dictionary 1, for format tags A and B.
 */
export const MATERIAL_DICTIONARY_1 = buildDictionary();
