/**
 * The Adler-32 checksum that ends a zlib stream, RFC 1950 section 8.
 */

const BASE = 65521;
// The most bytes that can be added before the sums might pass 2^32, so
// the modulo is only needed once per run.
const RUN = 5552;

/**
 * Computes the Adler-32 checksum of the data, or continues one when given the
 * checksum so far.
 */
export function adler32(data: Uint8Array, start = 1): number {
  let a = start & 0xffff;
  let b = (start >>> 16) & 0xffff;
  for (let i = 0; i < data.length;) {
    const end = Math.min(i + RUN, data.length);
    for (; i < end; i += 1) {
      a += data[i];
      b += a;
    }
    a %= BASE;
    b %= BASE;
  }
  return ((b << 16) | a) >>> 0;
}
