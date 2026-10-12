// @vitest-environment node
import { MATERIAL_DICTIONARY_1 } from './materialDictionary';
import { packMaterial } from './materialPack';
import { toRealEngraveSpeed } from '../lib/glowforgeUnits';
import type { TinyMaterial } from './materialTiny';

// The materials at the end of dictionary 1, packed.
const SAMPLE_MATERIALS: TinyMaterial[] = [
  {
    n: 'Cast Acrylic',
    t: '1/8"',
    d: 3,
    c: { p: 99, s: 197.5, a: 2, f: 0.5 },
    s: [],
    v: [{ n: 'Engrave', p: 49.5, s: 8500, a: 1, f: null, g: 1 }],
    b: [
      {
        n: 'Photo',
        p: 74.25,
        s: toRealEngraveSpeed(300),
        a: 1,
        f: null,
        g: 2,
        rm: 'RiemersmaDitherMethod',
        re: 'LagrangeFilter',
        ip: null,
        ap: null,
        t: null,
      },
    ],
  },
  {
    n: 'Leather',
    t: 'Thin',
    d: null,
    c: { p: 64.35, s: 2050, a: 1, f: null },
    s: [
      { n: 'Light Score', p: 9.9, s: 1075, a: 1, f: null },
      { n: 'Deep Score', p: 99, s: 587.5, a: 1, f: null },
    ],
    v: [],
    b: [],
  },
  {
    n: 'Birch Plywood',
    t: 'Medium',
    d: 3.175,
    c: { p: 100, s: 1562.5, a: 1, f: null },
    s: [{ n: 'Score', p: 49.5, s: 2050, a: 1, f: null }],
    v: [
      {
        n: 'SD Graphic',
        p: 100,
        s: toRealEngraveSpeed(500),
        a: 1,
        f: null,
        g: 5,
      },
    ],
    b: [
      {
        n: 'HD Graphic',
        p: 33.66,
        s: toRealEngraveSpeed(350),
        a: 1,
        f: null,
        g: 3,
        rm: 'FloydSteinbergDitherMethod',
        re: 'LagrangeFilter',
        ip: null,
        ap: null,
        t: null,
      },
      {
        n: 'Draft Graphic',
        p: 100,
        s: 8500,
        a: 1,
        f: null,
        g: 7,
        rm: null,
        re: 'LagrangeFilter',
        ip: null,
        ap: null,
        t: null,
      },
    ],
  },
];

describe('MATERIAL_DICTIONARY_1', () => {
  it('never changes', async () => {
    const digest = await crypto.subtle.digest(
      'SHA-256',
      new Uint8Array(MATERIAL_DICTIONARY_1),
    );
    const hex = Array.from(new Uint8Array(digest), (byte) =>
      byte.toString(16).padStart(2, '0'),
    ).join('');
    expect(hex).toBe(
      '099c3ea88eb5b5a3683fd966440dd52e0814d16fc1d011beb3c28210899b41a1',
    );
  });

  it('starts with a sample material as JSON and ends with them packed', () => {
    const text = new TextDecoder().decode(MATERIAL_DICTIONARY_1);
    expect(text.startsWith(JSON.stringify(SAMPLE_MATERIALS[2]))).toBe(true);

    const packed = SAMPLE_MATERIALS.flatMap((material) => [
      ...packMaterial(material)!,
    ]);
    expect(Array.from(MATERIAL_DICTIONARY_1.subarray(-packed.length))).toEqual(
      packed,
    );
  });
});
