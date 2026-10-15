/**
 * Helpers for the tests and benchmarks.
 */

/**
 * A seeded random number generator, xorshift32, giving unsigned integers.
 */
export function random(seed: number): () => number {
  let state = seed >>> 0 || 1;
  return () => {
    state ^= state << 13;
    state >>>= 0;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state;
  };
}

/**
 * Checks two byte arrays are equal, and where they first differ. Vitest's
 * toEqual compares typed arrays an element at a time, which takes seconds on
 * the larger inputs.
 */
export function expectBytes(actual: Uint8Array, expected: Uint8Array) {
  expect(actual.length, 'length').toBe(expected.length);
  const index = actual.findIndex((byte, i) => byte !== expected[i]);
  expect(index, 'first byte that differs').toBe(-1);
}

/**
 * Inputs that between them need every kind of block: empty, tiny, text, runs,
 * random bytes and long text across several blocks.
 */
export function sampleInputs(): Uint8Array[] {
  const encoder = new TextEncoder();
  const next = random(1);
  const text = (length: number) => {
    const words = [
      'laser',
      'cut',
      'score',
      'engrave',
      'birch',
      'acrylic',
      '3.175',
      '1562.5',
      '{"p":100,',
      '"s":2771.5}',
    ];
    let result = '';
    while (result.length < length) result += `${words[next() % words.length]} `;
    return encoder.encode(result.slice(0, length));
  };
  return [
    new Uint8Array(0),
    new Uint8Array([0x41]),
    encoder.encode(
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    ),
    text(100),
    text(1000),
    text(70000),
    new Uint8Array(100000),
    new Uint8Array(3000).map(() => next() & 0xff),
    new Uint8Array(70000).map(() => next() & 0xff),
    new Uint8Array(5000).map((_, i) => (i * 7) & 0xff),
  ];
}

/**
 * Writes DEFLATE bits by hand, to make streams no encoder would.
 */
export class BitWriter {
  private readonly output: number[] = [];
  private buffer = 0;
  private count = 0;

  /**
   * Writes a value's low bits, least significant first.
   */
  bits(value: number, count: number): this {
    for (let i = 0; i < count; i += 1) {
      this.buffer |= ((value >> i) & 1) << this.count;
      this.count += 1;
      if (this.count === 8) {
        this.output.push(this.buffer);
        this.buffer = 0;
        this.count = 0;
      }
    }
    return this;
  }

  /**
   * Writes a Huffman code, most significant bit first.
   */
  code(code: number, length: number): this {
    for (let i = length - 1; i >= 0; i -= 1) this.bits((code >> i) & 1, 1);
    return this;
  }

  bytes(): Uint8Array {
    return new Uint8Array(
      this.count ? [...this.output, this.buffer] : this.output,
    );
  }
}
