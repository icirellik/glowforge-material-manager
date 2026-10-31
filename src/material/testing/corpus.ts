/**
 * Materials for the cloud format's tests and benchmarks.
 *
 * - proofgrade: Glowforge's own materials from data/materials.json, one per
 *   tube type. Larger than most custom materials, with whole numbers.
 * - editor: custom materials as the editor made them in 0.4.10, with values
 *   from its unit conversions, so floats like 2881.3333333333335.
 * - unseen: the same, with names and thicknesses that aren't in the
 *   dictionary, to show what a user's own words cost.
 */
import catalog from '../../../data/materials.json';
import { toRealPower } from '../../lib/glowforgeUnits';
import type { TinyMaterial } from '../materialTiny';

/**
 * Speeds as the editor made them in 0.4.10, before it followed the machine's
 * speed ranges, which materials already stored have.
 */
export function legacyCutSpeed(display: number) {
  return ((display - 100) / 400) * 3900 + 100;
}

export function legacyEngraveSpeed(display: number) {
  return ((display - 100) / 900) * 8400 + 100;
}

interface CatalogSetting {
  power: number;
  speed: number;
  passes: number | null;
  focal_offset: number | null;
  scangap?: number;
  render_method?: string | null;
  rescale_method?: string | null;
  outcome?: { name: string } | null;
}

interface CatalogMaterial {
  thickness_name: string;
  nominal_thickness: number;
  variety: { common_name: string };
  settings: {
    cut_setting: CatalogSetting;
    score_settings: CatalogSetting[];
    vector_engrave_settings: CatalogSetting[];
    bitmap_engrave_settings: CatalogSetting[];
  }[];
}

export function proofgradeMaterials(): TinyMaterial[] {
  const name = (setting: CatalogSetting) => setting.outcome?.name ?? 'Default';
  const materials: TinyMaterial[] = [];
  for (const material of catalog as unknown as CatalogMaterial[]) {
    for (const settings of material.settings) {
      const cut = settings.cut_setting;
      materials.push({
        n: material.variety.common_name,
        t: material.thickness_name,
        d: material.nominal_thickness,
        c: {
          p: cut.power,
          s: cut.speed,
          a: cut.passes ?? 1,
          f: cut.focal_offset,
        },
        s: settings.score_settings.map((score) => ({
          n: name(score),
          p: score.power,
          s: score.speed,
          a: score.passes ?? 1,
          f: score.focal_offset,
        })),
        v: settings.vector_engrave_settings.map((vector) => ({
          n: name(vector),
          p: vector.power,
          s: vector.speed,
          a: vector.passes ?? 1,
          f: vector.focal_offset,
          g: vector.scangap ?? 1,
        })),
        b: settings.bitmap_engrave_settings.map((bitmap) => ({
          n: name(bitmap),
          p: bitmap.power,
          s: bitmap.speed,
          a: bitmap.passes ?? 1,
          f: bitmap.focal_offset,
          g: bitmap.scangap ?? 1,
          rm: (bitmap.render_method ?? null) as TinyMaterial['b'][number]['rm'],
          re: 'LagrangeFilter',
          ip: null,
          ap: null,
          t: null,
        })),
      });
    }
  }
  return materials;
}

const EDITOR_NAMES = {
  materials: [
    'Birch Plywood',
    'Baltic Birch',
    'Cast Acrylic',
    'Black Acrylic',
    'Walnut Hardwood',
    'Cherry',
    'Leather',
    'Cardstock',
    'Cork Sheet',
    'MDF',
    'Bamboo',
    'Felt',
    'Basswood',
    'Draftboard',
    'Mirror Acrylic',
    'Anodized Aluminum',
    'Slate Coaster',
    'Glass',
    'Poplar',
    'Oak Veneer',
  ],
  thicknesses: ['Thin', 'Medium', 'Thick', '1/8"', '1/4"', '3mm', '6mm'],
  scores: ['Light Score', 'Score', 'Deep Score', 'Default'],
  engraves: [
    'SD Graphic',
    'HD Graphic',
    'Draft Graphic',
    'Light Engrave',
    'Deep Engrave',
    'Photo',
  ],
};

// None of these words are in the dictionary.
const UNSEEN_NAMES = {
  materials: [
    'Purpleheart',
    'Corian Countertop',
    'Delrin Sheet',
    'Sapele Offcut',
    'Kydex',
    'Chipboard',
    'Zebrawood Burl',
    'Yupo Synthetic',
    'Tagboard',
    "Tim's Jatoba",
    'Cuero café',
    'Pfirsichholz',
    'Smoked Lucite',
    'Rosé Plexi 🌸',
    'Hemp Twill',
    'Quilted Sycamore',
  ],
  thicknesses: ['2.7 mm', '0.09"', 'Skinny', 'Doubled', '5/32 in', 'No. 4'],
  scores: ['Crease', 'Kiss Line', 'Hairline', 'Outline A'],
  engraves: [
    'Fill Pass',
    'Shading',
    'Logo Fill',
    'Grayscale Ramp',
    'Text Etch',
    'Stipple',
  ],
};

/**
 * A seeded random number generator, so the materials are the same each run.
 */
function random(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

function editorStyle(names: typeof EDITOR_NAMES, seed: number, count: number) {
  const next = random(seed);
  const pick = <T>(items: T[]) => items[Math.floor(next() * items.length)];
  const between = (low: number, high: number) =>
    low + Math.floor(next() * (high - low + 1));
  const focalOffset = () =>
    next() < 0.8 ? null : Math.round((next() * 6 - 3) * 1000) / 1000;
  const power = () => (next() < 0.3 ? 100 : toRealPower(between(1, 99)));

  const materials: TinyMaterial[] = [];
  for (let i = 0; i < count; i += 1) {
    materials.push({
      n: pick(names.materials),
      t: pick(names.thicknesses),
      d:
        next() < 0.15
          ? null
          : pick([1, 1.5, 3, 3.175, 3.3, 5.3, 6, 6.35, 12.7]),
      c: {
        p: power(),
        s: legacyCutSpeed(between(100, 500)),
        a: pick([1, 1, 1, 2, 3]),
        f: focalOffset(),
      },
      s: Array.from({ length: between(0, 2) }, () => ({
        n: pick(names.scores),
        p: toRealPower(between(1, 99)),
        s: legacyCutSpeed(between(100, 500)),
        a: 1,
        f: focalOffset(),
      })),
      v: Array.from({ length: between(0, 3) }, () => ({
        n: pick(names.engraves),
        p: power(),
        s: legacyEngraveSpeed(between(100, 1000)),
        a: 1,
        f: focalOffset(),
        g: pick([1, 2, 3, 4, 5, 7, 10]),
      })),
      b: Array.from({ length: between(0, 3) }, () => ({
        n: pick(names.engraves),
        p: power(),
        s: legacyEngraveSpeed(between(100, 1000)),
        a: 1,
        f: focalOffset(),
        g: pick([1, 2, 3, 4, 5, 7, 10]),
        rm: pick([
          null,
          'FloydSteinbergDitherMethod',
          'RiemersmaDitherMethod',
        ] as const),
        re: 'LagrangeFilter' as const,
        ip: null,
        ap: null,
        t: null,
      })),
    });
  }
  return materials;
}

export function editorMaterials(count = 300): TinyMaterial[] {
  return editorStyle(EDITOR_NAMES, 12345, count);
}

export function unseenMaterials(count = 300): TinyMaterial[] {
  return editorStyle(UNSEEN_NAMES, 54321, count);
}
