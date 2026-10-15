// @vitest-environment node
import * as zlib from 'zlib';
import { codeLengths, deflateRaw } from './deflate';
import { inflateRaw } from './inflate';
import { expectBytes, random, sampleInputs } from './testing';

const bytes = (buffer: Uint8Array) => new Uint8Array(buffer);
const encoder = new TextEncoder();

describe('deflateRaw', () => {
  it('round trips through zlib and our inflate', () => {
    for (const input of sampleInputs()) {
      const compressed = deflateRaw(input);
      expectBytes(bytes(zlib.inflateRawSync(compressed)), input);
      expectBytes(inflateRaw(compressed), input);
    }
  });

  it('round trips with a preset dictionary', () => {
    const dictionary = encoder.encode(
      '{"n":"Birch Plywood","t":"Medium","d":3.175,"c":{"p":100,"s":180}}',
    );
    for (const input of [
      ...sampleInputs(),
      encoder.encode('{"n":"Birch Plywood","t":"Thick","d":6.35}'),
    ]) {
      const compressed = deflateRaw(input, { dictionary });
      expectBytes(
        bytes(zlib.inflateRawSync(compressed, { dictionary })),
        input,
      );
      expectBytes(inflateRaw(compressed, { dictionary }), input);
    }
  });

  it('round trips random data of every size up to a few blocks', () => {
    const next = random(9);
    for (let round = 0; round < 200; round += 1) {
      const length = next() % (round < 150 ? 600 : 70000);
      // Mostly small alphabets, so there are matches.
      const alphabet = 1 + (next() % 255);
      const input = new Uint8Array(length).map(() => next() % alphabet);
      const compressed = deflateRaw(input);
      expectBytes(bytes(zlib.inflateRawSync(compressed)), input);
    }
  });

  it('is as small as zlib at level 9', () => {
    let ours = 0;
    let theirs = 0;
    for (const input of sampleInputs()) {
      ours += deflateRaw(input).length;
      theirs += zlib.deflateRawSync(input, { level: 9 }).length;
    }
    expect(ours).toBeLessThanOrEqual(theirs * 1.01);
  });

  it('writes an empty input as one fixed block', () => {
    expect(deflateRaw(new Uint8Array(0))).toEqual(new Uint8Array([3, 0]));
  });

  it('gives the same output every time', () => {
    const input = sampleInputs()[4];
    expect(deflateRaw(input)).toEqual(deflateRaw(input));
  });
});

describe('codeLengths', () => {
  it('makes complete codes no longer than the limit', () => {
    const next = random(5);
    for (let round = 0; round < 200; round += 1) {
      const symbols = 2 + (next() % 285);
      // Fibonacci-like frequencies force long codes without a limit.
      const frequencies = new Uint32Array(symbols).map((_, i) =>
        round % 2
          ? 1 + (next() % 1000)
          : Math.min(2 ** 31, Math.round(1.6 ** (i % 40))),
      );
      const lengths = codeLengths(frequencies, 15);
      let kraft = 0;
      for (const length of lengths) {
        expect(length).toBeGreaterThan(0);
        expect(length).toBeLessThanOrEqual(15);
        kraft += 2 ** -length;
      }
      expect(kraft).toBe(1);
    }
  });

  it('gives a lone symbol one bit and unused symbols none', () => {
    expect(codeLengths([0, 5, 0], 7)).toEqual(new Uint8Array([0, 1, 0]));
    expect(codeLengths([3, 0, 1, 1], 7)).toEqual(new Uint8Array([1, 0, 2, 2]));
  });
});
