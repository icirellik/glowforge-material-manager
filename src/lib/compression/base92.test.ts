// @vitest-environment node
import { BASE92_ALPHABET, fromBase92, toBase92 } from './base92';
import { expectBytes, random } from './testing';

/**
 * The same encoding with BigInt, written as simply as possible.
 */
function referenceBase92(bytes: Uint8Array): string {
  let number = BigInt(1);
  for (const byte of bytes) number = number * BigInt(256) + BigInt(byte);
  let text = '';
  while (number > BigInt(0)) {
    text = BASE92_ALPHABET[Number(number % BigInt(92))] + text;
    number /= BigInt(92);
  }
  return text;
}

describe('base-92', () => {
  it('is the printable ASCII characters JSON writes as themselves', () => {
    expect(BASE92_ALPHABET).toHaveLength(92);
    for (const character of BASE92_ALPHABET) {
      expect(JSON.stringify(character)).toBe(`"${character}"`);
      expect(character).not.toBe('<');
    }
  });

  it('round trips and matches the reference', () => {
    const next = random(3);
    for (let length = 0; length <= 300; length += 1) {
      for (const fill of ['random', 'zeros', 'ones']) {
        const bytes = new Uint8Array(length).map(() =>
          fill === 'random' ? next() & 0xff : fill === 'zeros' ? 0 : 0xff,
        );
        const text = toBase92(bytes);
        expect(text).toBe(referenceBase92(bytes));
        expectBytes(fromBase92(text), bytes);
      }
    }
  });

  it('takes about 1.23 characters per byte', () => {
    expect(toBase92(new Uint8Array(100).fill(0xff))).toHaveLength(123);
    expect(toBase92(new Uint8Array(0))).toBe('!');
  });

  it('handles the largest Chrome sync item quickly', () => {
    const bytes = new Uint8Array(6600).map((_, i) => (i * 31) & 0xff);
    const started = performance.now();
    const text = toBase92(bytes);
    const back = fromBase92(text);
    // About 250 ms in Vitest, with room for a busy machine.
    expect(performance.now() - started).toBeLessThan(2000);
    expect(text.length).toBeLessThan(8192);
    expectBytes(back, bytes);
  });

  it("rejects text it couldn't have written", () => {
    expect(() => fromBase92('')).toThrow(RangeError);
    expect(() => fromBase92('"ab')).toThrow(RangeError);
    expect(() => fromBase92('ab<')).toThrow(RangeError);
    expect(() => fromBase92('é')).toThrow(RangeError);
    // A leading zero digit.
    expect(() => fromBase92(` ${toBase92(new Uint8Array([1, 2]))}`)).toThrow(
      RangeError,
    );
    // Numbers without the marker byte.
    expect(() => fromBase92('~')).toThrow(RangeError);
    expect(() => fromBase92('~~~~~~')).toThrow(RangeError);
  });
});
