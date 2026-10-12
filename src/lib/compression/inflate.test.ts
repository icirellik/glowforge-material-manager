// @vitest-environment node
import * as zlib from 'zlib';
import * as pako from 'pako';
import { InflateError, inflateRaw, zlibInflate } from './inflate';
import { adler32 } from './adler32';
import { BitWriter, expectBytes, random, sampleInputs } from './testing';

const LEVELS = [0, 1, 6, 9];
const STRATEGIES = [
  zlib.constants.Z_DEFAULT_STRATEGY,
  zlib.constants.Z_FIXED,
  zlib.constants.Z_HUFFMAN_ONLY,
  zlib.constants.Z_RLE,
];

const bytes = (buffer: Uint8Array) => new Uint8Array(buffer);

describe('inflateRaw', () => {
  it("decodes zlib's output at every level and strategy", () => {
    for (const input of sampleInputs()) {
      for (const level of LEVELS) {
        for (const strategy of STRATEGIES) {
          const compressed = zlib.deflateRawSync(input, { level, strategy });
          expectBytes(inflateRaw(bytes(compressed)), input);
        }
      }
    }
  });

  it('decodes with a preset dictionary', () => {
    const dictionary = new TextEncoder().encode(
      '{"n":"Birch Plywood","t":"Medium","c":{"p":100,"s":180,"a":1}}'.repeat(
        4,
      ),
    );
    for (const input of sampleInputs()) {
      const compressed = zlib.deflateRawSync(input, { level: 9, dictionary });
      expectBytes(inflateRaw(bytes(compressed), { dictionary }), input);
    }
  });

  it('uses the last 32 KB of a longer dictionary', () => {
    const next = random(7);
    const dictionary = new Uint8Array(40000).map(() => next() & 0xff);
    const input = dictionary.slice(39000, 39500);
    const compressed = zlib.deflateRawSync(input, { level: 9, dictionary });
    expect(compressed.length).toBeLessThan(20);
    expectBytes(inflateRaw(bytes(compressed), { dictionary }), input);
  });

  it('rejects a distance before the start of the output', () => {
    const dictionary = new TextEncoder().encode('hello hello hello');
    const compressed = zlib.deflateRawSync('hello hello', { dictionary });
    expect(() => inflateRaw(bytes(compressed))).toThrow(InflateError);
  });

  it('rejects truncated data and bytes after the end', () => {
    const compressed = bytes(zlib.deflateRawSync('some text to compress'));
    expect(() => inflateRaw(compressed.subarray(0, -1))).toThrow(
      'The data ends too soon',
    );
    expect(() => inflateRaw(new Uint8Array([...compressed, 0]))).toThrow(
      'There are bytes after the end of the stream',
    );
    expect(() => inflateRaw(new Uint8Array(0))).toThrow(InflateError);
  });

  it('rejects malformed blocks', () => {
    // Block type 3.
    expect(() => inflateRaw(new Uint8Array([0x07]))).toThrow('invalid type');
    // A stored block whose length doesn't match its check.
    expect(() => inflateRaw(new Uint8Array([1, 1, 0, 0, 0, 0]))).toThrow(
      "doesn't match",
    );

    // Fixed blocks: length code 286, and distance code 30.
    expect(() =>
      inflateRaw(new BitWriter().bits(1, 1).bits(1, 2).code(0xc6, 8).bytes()),
    ).toThrow('length code is out of range');
    expect(() =>
      inflateRaw(
        new BitWriter()
          .bits(1, 1)
          .bits(1, 2)
          .code(0x30 + 0x41, 8)
          .code(0x01, 7)
          .code(0x1e, 5)
          .bytes(),
      ),
    ).toThrow('distance code is out of range');

    // Dynamic blocks with 257 literal/length codes, 1 distance code and the
    // first 4 or 5 code length codes: 16, 17, 18, 0, 8.
    const dynamic = (lengths: number[]) => {
      const writer = new BitWriter().bits(1, 1).bits(2, 2);
      writer
        .bits(0, 5)
        .bits(0, 5)
        .bits(lengths.length - 4, 4);
      for (const length of lengths) writer.bits(length, 3);
      return writer;
    };
    // Codes 16 and 17 have one bit each, then the first is a repeat.
    expect(() => inflateRaw(dynamic([1, 1, 0, 0]).code(0, 1).bytes())).toThrow(
      'nothing to repeat',
    );
    // A single one bit code length code is incomplete.
    expect(() => inflateRaw(dynamic([1, 0, 0, 0]).bytes())).toThrow(
      'code length code is incomplete',
    );
    // Code 18 has one bit, 0 and 8 two. Every literal gets 8 bits and the
    // end of block code none.
    const noEnd = dynamic([0, 0, 1, 2, 2]);
    for (let i = 0; i < 256; i += 1) noEnd.code(0b11, 2);
    noEnd.code(0b10, 2).code(0b10, 2);
    expect(() => inflateRaw(noEnd.bytes())).toThrow('no end of block code');
  });

  it('stops at the maximum output length', () => {
    const compressed = bytes(zlib.deflateRawSync(new Uint8Array(100000)));
    expect(() => inflateRaw(compressed, { maxOutputLength: 1000 })).toThrow(
      'The output is too long',
    );
    expect(inflateRaw(compressed, { maxOutputLength: 100000 }).length).toBe(
      100000,
    );
  });

  it('agrees with zlib on damaged streams', () => {
    const next = random(42);
    const inputs = sampleInputs().filter((input) => input.length < 5000);
    let checked = 0;
    for (let round = 0; round < 3000; round += 1) {
      const input = inputs[round % inputs.length];
      const strategy = STRATEGIES[round % STRATEGIES.length];
      const damaged = bytes(zlib.deflateRawSync(input, { strategy }));
      if (damaged.length === 0) continue;
      const flips = 1 + (next() % 3);
      for (let i = 0; i < flips; i += 1) {
        damaged[next() % damaged.length] ^= 1 << (next() % 8);
      }

      let expected: Uint8Array | null;
      try {
        expected = bytes(
          zlib.inflateRawSync(damaged, { maxOutputLength: 1 << 20 }),
        );
      } catch {
        expected = null;
      }
      let actual: Uint8Array | Error;
      try {
        actual = inflateRaw(damaged, { maxOutputLength: 1 << 20 });
      } catch (error) {
        actual = error as Error;
      }

      if (actual instanceof Error) {
        expect(actual).toBeInstanceOf(InflateError);
        // zlib doesn't mind bytes after the end.
        if (expected !== null) {
          expect(actual.message).toMatch(/after the end/);
        }
      } else {
        expect(expected).not.toBeNull();
        expectBytes(actual, expected!);
        checked += 1;
      }
    }
    expect(checked).toBeGreaterThan(100);
  });
});

describe('zlibInflate', () => {
  it("decodes zlib's output", () => {
    for (const input of sampleInputs()) {
      for (const level of LEVELS) {
        expectBytes(
          zlibInflate(bytes(zlib.deflateSync(input, { level }))),
          input,
        );
      }
    }
  });

  it('decodes a stream that needs a dictionary', () => {
    const dictionary = new TextEncoder().encode('Thick Maple Plywood Settings');
    const input = new TextEncoder().encode('Thin Maple Plywood Settings');
    const compressed = bytes(zlib.deflateSync(input, { dictionary }));
    expect(compressed[1] & 0x20).toBe(0x20);
    expect(zlibInflate(compressed, { dictionary })).toEqual(input);
    expect(() => zlibInflate(compressed)).toThrow('different dictionary');
    expect(() =>
      zlibInflate(compressed, { dictionary: new Uint8Array([1, 2, 3]) }),
    ).toThrow('different dictionary');
  });

  it('decodes the binary strings pako 1.0.6 made for the cloud', () => {
    const material = {
      n: 'Cuero café 🐄',
      t: 'Thin',
      d: 3.175,
      c: { p: 100, s: 1562.5, a: 1, f: null },
      s: [{ n: 'Score', p: 31.68, s: 2771.5, a: 1, f: null }],
      v: [],
      b: [],
    };
    const json = JSON.stringify(material);
    const stored: string = pako.deflate(json, { to: 'string' });
    const compressed = Uint8Array.from(stored, (c) => c.charCodeAt(0));
    expect([compressed[0], compressed[1]]).toEqual([0x78, 0x9c]);
    expect(new TextDecoder().decode(zlibInflate(compressed))).toEqual(json);
  });

  it('rejects bad headers, checksums and lengths', () => {
    const good = bytes(zlib.deflateSync('a material'));
    expect(zlibInflate(good)).toEqual(new TextEncoder().encode('a material'));

    const method = good.slice();
    method[0] = 0x79;
    expect(() => zlibInflate(method)).toThrow('unknown method');
    const check = good.slice();
    check[1] ^= 1;
    expect(() => zlibInflate(check)).toThrow("check doesn't match");
    const checksum = good.slice();
    checksum[checksum.length - 1] ^= 1;
    expect(() => zlibInflate(checksum)).toThrow("checksum doesn't match");
    expect(() => zlibInflate(good.subarray(0, -1))).toThrow('ends too soon');
    expect(() => zlibInflate(new Uint8Array([...good, 0]))).toThrow(
      'after the end',
    );
    expect(() => zlibInflate(good.subarray(0, 5))).toThrow('too short');
  });
});

describe('adler32', () => {
  it("matches the checksums at the end of zlib's streams", () => {
    for (const input of sampleInputs()) {
      const stream = zlib.deflateSync(input);
      expect(adler32(input)).toBe(stream.readUInt32BE(stream.length - 4));
    }
  });

  it('matches known values and continues a checksum', () => {
    expect(adler32(new Uint8Array(0))).toBe(1);
    const wikipedia = new TextEncoder().encode('Wikipedia');
    expect(adler32(wikipedia)).toBe(0x11e60398);
    expect(
      adler32(wikipedia.subarray(4), adler32(wikipedia.subarray(0, 4))),
    ).toBe(0x11e60398);
  });
});
