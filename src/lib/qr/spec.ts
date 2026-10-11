/**
 * The layout of QR codes from ISO/IEC 18004, shared by the encoder and the
 * decoder.
 */

export interface Modules {
  // The code is size x size modules.
  size: number;
  // 1 for dark modules, row by row.
  data: Uint8Array;
}

// Error correction levels, in the order of the tables below.
export const L = 0;
export const M = 1;
export const Q = 2;
export const H = 3;

// Format information stores the level as two bits: 00 is M, 01 L, 10 H and
// 11 Q.
export const LEVEL_FROM_FORMAT = [M, L, H, Q];
export const FORMAT_FROM_LEVEL = [1, 0, 3, 2];

// Error correction codewords in each block, by level and version.
const EC_CODEWORDS_PER_BLOCK = [
  [7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28, 28,
    28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  [10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26, 26,
    26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28],
  [13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26, 30,
    28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
  [17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26, 28,
    30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
];

// The number of blocks, by level and version.
const EC_BLOCKS = [
  [1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8,
    8, 9, 9, 10, 12, 12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25],
  [1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16,
    17, 17, 18, 20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49],
  [1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20,
    23, 23, 25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68],
  [1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25,
    25, 34, 30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81],
];

// Every valid format information word, indexed by its 5 data bits: a BCH
// code, masked so it is never all light.
export const FORMAT_WORDS = Array.from({ length: 32 }, (_, data) => {
  let remainder = data;
  for (let i = 0; i < 10; i += 1) remainder = (remainder << 1) ^ ((remainder >>> 9) * 0x537);
  return ((data << 10) | remainder) ^ 0x5412;
});

// Every valid version information word, indexed by version. Only versions 7
// and up have one.
export const VERSION_WORDS = Array.from({ length: 41 }, (_, version) => {
  let remainder = version;
  for (let i = 0; i < 12; i += 1) remainder = (remainder << 1) ^ ((remainder >>> 11) * 0x1f25);
  return (version << 12) | remainder;
});

export const MASKS: ((row: number, column: number) => boolean)[] = [
  (row, column) => (row + column) % 2 === 0,
  (row) => row % 2 === 0,
  (_, column) => column % 3 === 0,
  (row, column) => (row + column) % 3 === 0,
  (row, column) => (Math.floor(row / 2) + Math.floor(column / 3)) % 2 === 0,
  (row, column) => ((row * column) % 2) + ((row * column) % 3) === 0,
  (row, column) => (((row * column) % 2) + ((row * column) % 3)) % 2 === 0,
  (row, column) => (((row + column) % 2) + ((row * column) % 3)) % 2 === 0,
];

export function sizeOf(version: number): number {
  return 17 + 4 * version;
}

/**
 * Where the two copies of the 15 format information bits are, least
 * significant bit first: around the top left finder, and split between the
 * other two.
 */
export function formatPositions(size: number): [number[], number[]] {
  const first: number[] = [];
  const second: number[] = [];
  for (let i = 0; i < 15; i += 1) {
    if (i < 6) first.push(i * size + 8);
    else if (i < 8) first.push((i + 1) * size + 8);
    else if (i === 8) first.push(8 * size + 7);
    else first.push(8 * size + 14 - i);
    second.push(i < 8 ? 8 * size + size - 1 - i : (size - 15 + i) * size + 8);
  }
  return [first, second];
}

/**
 * Where the two copies of the 18 version information bits are, least
 * significant bit first: next to the top right and bottom left finders.
 */
export function versionPositions(size: number): [number[], number[]] {
  const topRight: number[] = [];
  const bottomLeft: number[] = [];
  for (let i = 0; i < 18; i += 1) {
    topRight.push(Math.floor(i / 3) * size + size - 11 + (i % 3));
    bottomLeft.push((size - 11 + (i % 3)) * size + Math.floor(i / 3));
  }
  return [topRight, bottomLeft];
}

/**
 * The rows and columns of a version's alignment patterns.
 */
export function alignmentPositions(version: number): number[] {
  if (version === 1) {
    return [];
  }
  const count = Math.floor(version / 7) + 2;
  const last = 4 * version + 10;
  // Evenly spaced from the last one, on even positions, except version 32.
  const step = version === 32 ? 26 : Math.ceil((last - 6) / (count - 1) / 2) * 2;
  const positions = [6];
  for (let i = count - 2; i >= 0; i -= 1) positions.push(last - i * step);
  return positions;
}

/**
 * The alignment pattern centres, leaving out the ones where the finders are.
 */
export function alignmentCenters(version: number): [number, number][] {
  const positions = alignmentPositions(version);
  const last = positions[positions.length - 1];
  const centers: [number, number][] = [];
  for (const row of positions) {
    for (const column of positions) {
      if (!(row === 6 && (column === 6 || column === last)) && !(row === last && column === 6)) {
        centers.push([row, column]);
      }
    }
  }
  return centers;
}

const functionPatternCache = new Map<number, Uint8Array>();

/**
 * Marks the modules that don't hold data: finders and their separators,
 * timing and alignment patterns, and format and version information.
 */
export function functionPatterns(version: number): Uint8Array {
  const cached = functionPatternCache.get(version);
  if (cached) {
    return cached;
  }

  const size = sizeOf(version);
  const patterns = new Uint8Array(size * size);
  const fill = (top: number, left: number, height: number, width: number) => {
    for (let row = top; row < top + height; row += 1) {
      patterns.fill(1, row * size + left, row * size + left + width);
    }
  };
  // Finders with their separators and format information, which also covers
  // the always dark module.
  fill(0, 0, 9, 9);
  fill(0, size - 8, 9, 8);
  fill(size - 8, 0, 8, 9);
  // Timing patterns.
  fill(6, 0, 1, size);
  fill(0, 6, size, 1);
  for (const [row, column] of alignmentCenters(version)) {
    fill(row - 2, column - 2, 5, 5);
  }
  if (version >= 7) {
    fill(0, size - 11, 6, 3);
    fill(size - 11, 0, 3, 6);
  }

  functionPatternCache.set(version, patterns);
  return patterns;
}

const dataOrderCache = new Map<number, Int32Array>();

/**
 * The data modules in the order the codewords fill them, most significant bit
 * first: two module wide columns from the right, zigzagging up and down,
 * skipping function patterns. Modules left over after the last whole codeword
 * are remainder bits.
 */
export function dataModuleOrder(version: number): Int32Array {
  const cached = dataOrderCache.get(version);
  if (cached) {
    return cached;
  }

  const size = sizeOf(version);
  const patterns = functionPatterns(version);
  const order: number[] = [];
  let upward = true;
  for (let right = size - 1; right > 0; right -= 2) {
    // Skip the vertical timing pattern.
    if (right === 6) right -= 1;
    for (let step = 0; step < size; step += 1) {
      const row = upward ? size - 1 - step : step;
      for (let column = right; column > right - 2; column -= 1) {
        if (!patterns[row * size + column]) order.push(row * size + column);
      }
    }
    upward = !upward;
  }

  const result = Int32Array.from(order);
  dataOrderCache.set(version, result);
  return result;
}

/**
 * How a version and level split the codewords into error correction blocks.
 * When the data doesn't divide evenly, the last blocks have one more data
 * codeword.
 */
export function blockLayout(version: number, level: number) {
  const total = Math.floor(dataModuleOrder(version).length / 8);
  const ecPerBlock = EC_CODEWORDS_PER_BLOCK[level][version - 1];
  const blockCount = EC_BLOCKS[level][version - 1];
  const dataTotal = total - ecPerBlock * blockCount;
  return {
    total,
    ecPerBlock,
    blockCount,
    dataTotal,
    shortData: Math.floor(dataTotal / blockCount),
    shortBlocks: blockCount - (dataTotal % blockCount),
  };
}

export const NUMERIC = 1;
export const ALPHANUMERIC = 2;
export const STRUCTURED_APPEND = 3;
export const BYTE = 4;
export const FNC1_FIRST = 5;
export const ECI = 7;
export const KANJI = 8;
export const FNC1_SECOND = 9;

// Bits in each mode's character count, for versions 1-9, 10-26 and 27-40.
const COUNT_BITS: Record<number, number[]> = {
  [NUMERIC]: [10, 12, 14],
  [ALPHANUMERIC]: [9, 11, 13],
  [BYTE]: [8, 16, 16],
  [KANJI]: [8, 10, 12],
};

/**
 * The bits in a mode's character count, or undefined for modes without one.
 */
export function countBits(mode: number, version: number): number | undefined {
  let sizeClass = 2;
  if (version < 10) sizeClass = 0;
  else if (version < 27) sizeClass = 1;
  return COUNT_BITS[mode]?.[sizeClass];
}

export const ALPHANUMERIC_CHARACTERS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';
