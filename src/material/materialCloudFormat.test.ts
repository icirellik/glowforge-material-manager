// @vitest-environment node
import * as pako from 'pako';
import {
  decodeCloudMaterial,
  encodeCloudMaterial,
  isLegacyValue,
} from './materialCloudFormat';
import {
  editorMaterials,
  proofgradeMaterials,
  unseenMaterials,
} from './testing/corpus';
import { toFullMaterial } from './materialConversion';
import { hashMaterial } from '../lib/utils';
import { syncItemCost } from '../lib/syncQuota';
import type { TinyMaterial } from './materialTiny';

// Values as this version wrote them. They must decode the same in every
// later version, so never change these. Add new ones instead.
const GOLDEN: { value: string; material: object }[] = [
  {
    value:
      "A(0rGyL#Z&yNa,lto?>ChdQ`E0f%vM]kQs*#-htK.fNyIuz`VbY%In>c3.6n3K)`;]TzKA&EQbGHM9at~r'+y7~q1B",
    material: {
      n: 'Cork Sheet',
      t: 'Thin',
      d: 6,
      c: { p: 78.21000000000001, s: 3990.25, a: 1, f: -1.156 },
      s: [],
      v: [
        {
          n: 'Light Engrave',
          p: 67.32000000000001,
          s: 5746.666666666667,
          a: 1,
          f: null,
          g: 5,
        },
      ],
      b: [
        {
          n: 'Deep Engrave',
          p: 100,
          s: 4888,
          a: 1,
          f: null,
          g: 5,
          rm: 'FloydSteinbergDitherMethod',
          re: 'LagrangeFilter',
          ip: null,
          ap: null,
          t: null,
        },
        {
          n: 'HD Graphic',
          p: 35.64,
          s: 3264,
          a: 1,
          f: null,
          g: 3,
          rm: null,
          re: 'LagrangeFilter',
          ip: null,
          ap: null,
          t: null,
        },
        {
          n: 'Light Engrave',
          p: 69.3,
          s: 4449.333333333333,
          a: 1,
          f: 1.8,
          g: 3,
          rm: 'FloydSteinbergDitherMethod',
          re: 'LagrangeFilter',
          ip: null,
          ap: null,
          t: null,
        },
      ],
    },
  },
  {
    value:
      "B%%v:&gtY47N/`X.?mYRm%Ej/Q]U9pNO8yL!H4JF2{,#9#:/),kJ_XV{A,bzg0Y0{&>1/(z:MGe:%q4LXYIh):b5p+e68OMFbG@T[+Jp:qnzb wb:,Igz7=Wy},xy+5jPS5?_If =QB)t]'N#H}agN|Zo k](;ySt~kynhD0:L6bs{|:xB`!3HZG,G`|UUAP:ZETnJvB_:7'*EwY`,cxFkdor=?~~+qj?",
    material: {
      n: 'Anodized Aluminum',
      t: '1/4"',
      d: 3.175,
      c: { p: 100, s: 1933, a: 3, f: null },
      s: [],
      v: [
        {
          n: 'Draft Graphic',
          p: 22.77,
          s: 2190.6666666666665,
          a: 1,
          f: null,
          g: 10,
        },
        {
          n: 'HD Graphic',
          p: 30.69,
          s: 6978.666666666667,
          a: 1,
          f: null,
          g: 4,
        },
        {
          n: 'Deep Engrave',
          p: 68.30999999999999,
          s: 5840,
          a: 1,
          f: null,
          g: 1,
        },
      ],
      b: [
        {
          n: 'SD Graphic',
          p: 100,
          s: 4244,
          a: 1,
          f: null,
          g: 3,
          rm: 'RiemersmaDitherMethod',
          re: 'LagrangeFilter',
          ip: null,
          ap: null,
          t: null,
        },
        {
          n: 'Light Engrave',
          p: 34.65,
          s: 3740,
          a: 1,
          f: null,
          g: 5,
          rm: null,
          re: 'LagrangeFilter',
          ip: null,
          ap: null,
          t: null,
        },
        {
          n: 'Photo',
          p: 60.39,
          s: 3478.6666666666665,
          a: 1,
          f: -1.38,
          g: 1,
          rm: 'FloydSteinbergDitherMethod',
          re: 'LagrangeFilter',
          ip: null,
          ap: null,
          t: null,
        },
      ],
      extra: 'not packable',
    },
  },
];

// The binary strings 0.4.10 stored, made by pako 1.0.6.
function legacyValue(material: unknown): string {
  return pako.deflate(JSON.stringify(material), { to: 'string' });
}

const KEY = 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3';

function averageCost(
  materials: TinyMaterial[],
  encode: (m: TinyMaterial) => string,
) {
  const total = materials.reduce(
    (sum, m) => sum + syncItemCost(KEY, encode(m)),
    0,
  );
  return total / materials.length;
}

describe('decodeCloudMaterial', () => {
  it('reads the golden values', () => {
    for (const { value, material } of GOLDEN) {
      const decoded = decodeCloudMaterial(value);
      expect(decoded.status).toBe('ok');
      expect(JSON.stringify(decoded.status === 'ok' && decoded.material)).toBe(
        JSON.stringify(material),
      );
    }
  });

  it('reads legacy values', () => {
    for (const material of [...editorMaterials(50), ...proofgradeMaterials()]) {
      const value = legacyValue(material);
      expect(isLegacyValue(value)).toBe(true);
      const decoded = decodeCloudMaterial(value);
      expect(decoded).toEqual({ status: 'ok', format: 'legacy', material });
    }
  });

  it('skips values from newer versions', () => {
    for (const value of ['C123', 'Zabc', '~', '{}']) {
      expect(decodeCloudMaterial(value)).toEqual({ status: 'unsupported' });
    }
    for (const value of ['', 1, null, undefined, {}, []]) {
      expect(decodeCloudMaterial(value)).toEqual({ status: 'unsupported' });
    }
  });

  it("calls broken values invalid, and doesn't throw", () => {
    const good = encodeCloudMaterial(editorMaterials(1)[0]);
    const broken = [
      'A',
      'A<',
      `${good}!`,
      `B${good.slice(1)}`,
      good.slice(0, -3),
      // A zlib header with nothing after it.
      'x\u009c\u0000\u0000\u0000\u0000',
      // Legacy JSON that isn't a material.
      legacyValue({ n: 'No settings' }),
      legacyValue([1, 2, 3]),
      legacyValue({ n: 'x', t: 'y', c: {}, s: [{ p: 1 }], v: [], b: [] }),
      // A legacy value with a character above 0xFF.
      `${legacyValue(editorMaterials(1)[0]).slice(0, -1)}\u0100`,
    ];
    for (const value of broken) {
      expect(decodeCloudMaterial(value).status).toBe('invalid');
    }
  });

  it("doesn't read a tag as a legacy value", () => {
    // A zlib header's first byte is 8 more than a multiple of 16.
    for (const tag of ['A', 'B']) {
      expect(tag.charCodeAt(0) % 16).not.toBe(8);
      expect(isLegacyValue(`${tag}${'x'.repeat(10)}`)).toBe(false);
    }
  });
});

describe('encodeCloudMaterial', () => {
  it('gives back exactly the same material, with the same hash', async () => {
    const materials = [
      ...editorMaterials(),
      ...unseenMaterials(100),
      ...proofgradeMaterials(),
    ];
    for (const material of materials) {
      const decoded = decodeCloudMaterial(encodeCloudMaterial(material));
      expect(decoded.status === 'ok' && decoded.format).toBe('packed-1');
      expect(decoded.status === 'ok' && JSON.stringify(decoded.material)).toBe(
        JSON.stringify(material),
      );
    }
    for (const material of materials.slice(0, 20)) {
      const decoded = decodeCloudMaterial(encodeCloudMaterial(material));
      expect(decoded.status).toBe('ok');
      if (decoded.status === 'ok') {
        expect(await hashMaterial(toFullMaterial(decoded.material))).toBe(
          await hashMaterial(toFullMaterial(material)),
        );
      }
    }
  });

  it("uses JSON for materials it can't pack", () => {
    const material = { ...editorMaterials(1)[0], extra: 1 } as TinyMaterial;
    const value = encodeCloudMaterial(material);
    expect(value[0]).toBe('B');
    const decoded = decodeCloudMaterial(value);
    expect(decoded.status === 'ok' && JSON.stringify(decoded.material)).toBe(
      JSON.stringify(material),
    );
  });

  it('writes the same as when it was released', () => {
    // If this fails on purpose, update it, but leave GOLDEN alone.
    for (const { value, material } of GOLDEN) {
      expect(encodeCloudMaterial(material as TinyMaterial)).toBe(value);
    }
  });

  it('writes only characters that cost a byte each', () => {
    for (const material of editorMaterials(100)) {
      const value = encodeCloudMaterial(material);
      expect(syncItemCost('', value)).toBe(value.length + 2);
    }
  });

  it('is a quarter of the legacy size or less', () => {
    const corpora = {
      editor: [editorMaterials(), 120],
      unseen: [unseenMaterials(), 160],
      proofgrade: [proofgradeMaterials(), 155],
    } as const;
    for (const [materials, limit] of Object.values(corpora)) {
      const cost = averageCost([...materials], encodeCloudMaterial);
      expect(cost).toBeLessThan(limit);
      expect(cost).toBeLessThan(averageCost([...materials], legacyValue) / 3);
    }
  });
});
