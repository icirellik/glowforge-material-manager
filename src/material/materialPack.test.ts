// @vitest-environment node
import { packMaterial, unpackMaterial } from './materialPack';
import {
  editorMaterials,
  legacyCutSpeed,
  legacyEngraveSpeed,
  proofgradeMaterials,
  unseenMaterials,
} from './testing/corpus';
import { toRealPower } from '../lib/glowforgeUnits';
import type { TinyMaterial } from './materialTiny';

const hex = (bytes: Uint8Array | null) =>
  bytes
    ? Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join(' ')
    : null;

function material(overrides: Partial<TinyMaterial> = {}): TinyMaterial {
  return {
    n: 'Birch',
    t: 'Thin',
    d: 1,
    c: { p: 99, s: 100, a: 1, f: null },
    s: [],
    v: [],
    b: [],
    ...overrides,
  };
}

function roundTrip(value: unknown) {
  const json = JSON.stringify(value);
  const packed = packMaterial(JSON.parse(json));
  expect(packed).not.toBeNull();
  expect(JSON.stringify(unpackMaterial(packed!))).toBe(json);
  return packed!;
}

describe('packMaterial', () => {
  it('writes the fields in order, without keys', () => {
    // Birch, Thin, 1 as a whole number, power 99 as the editor's 100, speed
    // 100 as the editor's cut speed 100, 1 pass, no focal offset and no
    // settings.
    expect(hex(packMaterial(material()))).toBe(
      '05 42 69 72 63 68 04 54 68 69 6e 04 02 09 64 0a 64 04 02 01 00 00 00',
    );
  });

  it('round trips every material in the corpora', () => {
    for (const tiny of [
      ...editorMaterials(),
      ...unseenMaterials(),
      ...proofgradeMaterials(),
    ]) {
      roundTrip(tiny);
    }
  });

  it("stores the editor's powers and speeds as the numbers typed", () => {
    const tagged = (value: number) => {
      const packed = roundTrip(material({ d: value }));
      // n and t take 11 bytes, then d's tag and data.
      return { tag: packed[11], length: packed.length - 23 + 2 };
    };
    for (let display = 0; display <= 100; display += 1) {
      const { tag, length } = tagged(toRealPower(display));
      // Whole numbers and short decimals may be as short or shorter.
      expect(length).toBeLessThanOrEqual(2);
      if (![0x04, 0x05, 0x06].includes(tag)) expect(tag).toBe(0x09);
    }
    for (let display = 100; display <= 500; display += 1) {
      expect(tagged(legacyCutSpeed(display)).length).toBeLessThanOrEqual(3);
    }
    for (let display = 100; display <= 1000; display += 1) {
      expect(tagged(legacyEngraveSpeed(display)).length).toBeLessThanOrEqual(3);
    }
    // The editor now makes whole numbers, up to a Pro's 36500.
    for (let speed = 100; speed <= 36500; speed += 1) {
      expect(tagged(speed).length).toBeLessThanOrEqual(speed < 8192 ? 3 : 4);
    }
  });

  it('keeps every number exactly', () => {
    const numbers = [
      0,
      -0,
      1,
      -1,
      0.1,
      0.0125,
      3.175,
      -2.535,
      2881.3333333333335,
      51.480000000000004,
      1e21,
      1e-7,
      5e-324,
      Number.MAX_VALUE,
      Number.MAX_SAFE_INTEGER,
      2 ** 53 + 2,
      -(2 ** 52),
      NaN,
      Infinity,
      -Infinity,
    ];
    for (const value of numbers) {
      roundTrip(
        material({ d: value, c: { p: value, s: value, a: value, f: value } }),
      );
    }
    const view = new DataView(new ArrayBuffer(8));
    let seed = 7;
    for (let i = 0; i < 2000; i += 1) {
      for (let byte = 0; byte < 8; byte += 1) {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        view.setUint8(byte, seed >> 16);
      }
      roundTrip(material({ d: view.getFloat64(0) }));
    }
  });

  it('keeps any JSON value in a value field', () => {
    for (const value of [
      null,
      true,
      false,
      '3.175',
      '',
      'LagrangeFilter',
      [1, 2],
      { a: 1 },
    ]) {
      roundTrip(material({ d: value as unknown as number }));
    }
    roundTrip(
      material({
        b: [
          {
            n: 'Photo',
            p: 100,
            s: 8500,
            a: 1,
            f: null,
            g: 3,
            rm: 'Unknown' as 'RiemersmaDitherMethod',
            re: 'LagrangeFilter',
            ip: 20 as unknown as null,
            ap: null,
            t: null,
          },
        ],
      }),
    );
  });

  it('keeps names exactly', () => {
    for (const name of ['', 'é', 'Rosé Plexi 🌸', '﻿BOM', 'x'.repeat(500)]) {
      roundTrip(material({ n: name, t: name }));
    }
  });

  it('leaves out absent fields', () => {
    const tiny = JSON.parse(
      JSON.stringify(material()),
    ) as Partial<TinyMaterial>;
    delete tiny.d;
    delete (tiny.c as Partial<TinyMaterial['c']>).f;
    roundTrip(tiny);
  });

  it("gives null for materials it can't pack exactly", () => {
    const tiny = material();
    expect(packMaterial({ ...tiny, extra: 1 })).toBeNull();
    expect(
      packMaterial({
        t: tiny.t,
        n: tiny.n,
        d: 1,
        c: tiny.c,
        s: [],
        v: [],
        b: [],
      }),
    ).toBeNull();
    expect(packMaterial({ ...tiny, n: 1 })).toBeNull();
    expect(packMaterial({ ...tiny, b: undefined })).toBeNull();
    expect(packMaterial({ ...tiny, s: [null] })).toBeNull();
    expect(packMaterial({ ...tiny, s: [{ p: 1, n: 'Score' }] })).toBeNull();
    expect(packMaterial(null)).toBeNull();
    expect(packMaterial([])).toBeNull();
  });
});

describe('unpackMaterial', () => {
  const good = packMaterial(material())!;

  it("rejects bytes it couldn't have written", () => {
    expect(() => unpackMaterial(new Uint8Array([...good, 0]))).toThrow(
      'after the packed',
    );
    expect(() => unpackMaterial(good.subarray(0, -1))).toThrow('ends too soon');
    const tag = good.slice();
    tag[11] = 0x12;
    expect(() => unpackMaterial(tag)).toThrow('unknown tag');
    // A length with an extra zero byte.
    expect(() => unpackMaterial(new Uint8Array([0x81, 0x00]))).toThrow(
      'out of range',
    );
    // A setting count longer than the bytes left.
    const count = good.slice();
    count[20] = 50;
    expect(() => unpackMaterial(count)).toThrow('ends too soon');
    // Invalid UTF-8.
    expect(() => unpackMaterial(new Uint8Array([1, 0xff]))).toThrow(TypeError);
  });
});
