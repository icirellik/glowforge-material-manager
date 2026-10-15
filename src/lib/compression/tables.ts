/**
 * The constants of DEFLATE, RFC 1951 section 3.2.5 and 3.2.7.
 */

// A block's literal/length alphabet: 256 literals, end of block and 29 length
// codes. Fixed blocks give 286 and 287 codes too, but they never appear.
export const END_OF_BLOCK = 256;
export const LENGTH_CODES = 29;
export const DISTANCE_CODES = 30;
export const MAX_BITS = 15;
export const MAX_DISTANCE = 32768;
export const MIN_MATCH = 3;
export const MAX_MATCH = 258;

// Length codes 257–285: the shortest length of each and its extra bits.
export const LENGTH_BASE = new Uint16Array([
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67,
  83, 99, 115, 131, 163, 195, 227, 258,
]);
export const LENGTH_EXTRA = new Uint8Array([
  0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5,
  5, 5, 0,
]);

// Distance codes 0–29: the shortest distance of each and its extra bits.
export const DISTANCE_BASE = new Uint16Array([
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769,
  1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577,
]);
export const DISTANCE_EXTRA = new Uint8Array([
  0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11,
  11, 12, 12, 13, 13,
]);

// The order a dynamic block lists the code length code's lengths in.
export const CODE_LENGTH_ORDER = new Uint8Array([
  16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15,
]);

/**
 * The code lengths of a fixed block's literal/length code.
 */
export function fixedLiteralLengths(): Uint8Array {
  const lengths = new Uint8Array(288);
  lengths.fill(8, 0, 144);
  lengths.fill(9, 144, 256);
  lengths.fill(7, 256, 280);
  lengths.fill(8, 280, 288);
  return lengths;
}

/**
 * The code lengths of a fixed block's distance code. All 32 are 5 bits,
 * though only 30 are valid.
 */
export function fixedDistanceLengths(): Uint8Array {
  return new Uint8Array(32).fill(5);
}
