import { errorCorrectionCodewords } from './reedSolomon';
import {
  ALPHANUMERIC, ALPHANUMERIC_CHARACTERS, BYTE, FORMAT_FROM_LEVEL, FORMAT_WORDS, H, L, M, MASKS, NUMERIC, Q,
  VERSION_WORDS, alignmentCenters, blockLayout, countBits, dataModuleOrder, formatPositions, functionPatterns,
  sizeOf, versionPositions,
} from './spec';
import type { Modules } from './spec';

/**
 * Encodes text as a QR code, following ISO/IEC 18004.
 *
 * The text is one segment, in the most compact mode that holds all of it:
 * numeric, alphanumeric or UTF-8 bytes. Like most encoders, the code is the
 * smallest version that fits, with the mask that scores the lowest penalty.
 */

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface EncodeOptions {
  // How much of the code can be damaged and still read: about 7%, 15%, 25%
  // or 30%. M by default.
  level?: ErrorCorrectionLevel;
  // A version from 1 to 40, instead of the smallest that fits.
  version?: number;
  // A mask from 0 to 7, instead of the one with the lowest penalty.
  mask?: number;
}

const LEVELS: Record<ErrorCorrectionLevel, number> = {
  L, M, Q, H,
};

interface Segment {
  mode: number;
  count: number;
  bits: number[];
}

function writeBits(bits: number[], value: number, count: number) {
  for (let i = count - 1; i >= 0; i -= 1) bits.push((value >>> i) & 1);
}

function toSegment(text: string): Segment {
  const bits: number[] = [];
  if (/^[0-9]*$/.test(text)) {
    // Three digits in 10 bits, and the last one or two in 4 or 7.
    for (let i = 0; i < text.length; i += 3) {
      const digits = text.slice(i, i + 3);
      writeBits(bits, Number(digits), [0, 4, 7, 10][digits.length]);
    }
    return { mode: NUMERIC, count: text.length, bits };
  }
  if (/^[0-9A-Z $%*+\-./:]*$/.test(text)) {
    // Two characters in 11 bits, and the last one in 6.
    for (let i = 0; i < text.length; i += 2) {
      const first = ALPHANUMERIC_CHARACTERS.indexOf(text[i]);
      if (i + 1 < text.length) {
        writeBits(bits, first * 45 + ALPHANUMERIC_CHARACTERS.indexOf(text[i + 1]), 11);
      } else {
        writeBits(bits, first, 6);
      }
    }
    return { mode: ALPHANUMERIC, count: text.length, bits };
  }
  const bytes = new TextEncoder().encode(text);
  for (const byte of bytes) writeBits(bits, byte, 8);
  return { mode: BYTE, count: bytes.length, bits };
}

function fits(segment: Segment, version: number, level: number): boolean {
  const lengthBits = countBits(segment.mode, version)!;
  return segment.count < 2 ** lengthBits
    && 4 + lengthBits + segment.bits.length <= blockLayout(version, level).dataTotal * 8;
}

/**
 * The data codewords: the segment, a terminator and padding.
 */
function dataCodewords(segment: Segment, version: number, level: number): Uint8Array {
  const { dataTotal } = blockLayout(version, level);
  const bits: number[] = [];
  writeBits(bits, segment.mode, 4);
  writeBits(bits, segment.count, countBits(segment.mode, version)!);
  for (const bit of segment.bits) bits.push(bit);
  // Up to four zeros end the data, then more fill the last codeword.
  writeBits(bits, 0, Math.min(4, dataTotal * 8 - bits.length));
  writeBits(bits, 0, (8 - (bits.length % 8)) % 8);

  const codewords = new Uint8Array(dataTotal);
  for (let i = 0; i < bits.length; i += 1) codewords[i >> 3] |= bits[i] << (7 - (i & 7));
  // The rest alternates between two pad codewords.
  for (let i = bits.length / 8; i < dataTotal; i += 1) {
    codewords[i] = (i - bits.length / 8) % 2 === 0 ? 0xec : 0x11;
  }
  return codewords;
}

/**
 * Splits the data into blocks, adds each block's error correction and
 * interleaves them.
 */
function interleave(data: Uint8Array, version: number, level: number): Uint8Array {
  const {
    total, ecPerBlock, blockCount, shortData, shortBlocks,
  } = blockLayout(version, level);
  const blocks: Uint8Array[] = [];
  const ecBlocks: Uint8Array[] = [];
  let offset = 0;
  for (let index = 0; index < blockCount; index += 1) {
    const length = shortData + (index < shortBlocks ? 0 : 1);
    const block = data.subarray(offset, offset + length);
    blocks.push(block);
    ecBlocks.push(errorCorrectionCodewords(block, ecPerBlock));
    offset += length;
  }

  const result = new Uint8Array(total);
  let next = 0;
  for (let i = 0; i <= shortData; i += 1) {
    for (const block of blocks) {
      if (i < block.length) {
        result[next] = block[i];
        next += 1;
      }
    }
  }
  for (let i = 0; i < ecPerBlock; i += 1) {
    for (const ec of ecBlocks) {
      result[next] = ec[i];
      next += 1;
    }
  }
  return result;
}

/**
 * Draws the finders, timing and alignment patterns, the always dark module
 * and the version information.
 */
function drawFunctionPatterns(data: Uint8Array, version: number) {
  const size = sizeOf(version);
  // Squares of rings around a centre, by how far each ring is from it.
  const square = (centerRow: number, centerColumn: number, radius: number, isDark: (ring: number) => boolean) => {
    for (let row = -radius; row <= radius; row += 1) {
      for (let column = -radius; column <= radius; column += 1) {
        const ring = Math.max(Math.abs(row), Math.abs(column));
        data[(centerRow + row) * size + centerColumn + column] = isDark(ring) ? 1 : 0;
      }
    }
  };
  square(3, 3, 3, (ring) => ring !== 2);
  square(3, size - 4, 3, (ring) => ring !== 2);
  square(size - 4, 3, 3, (ring) => ring !== 2);
  for (let i = 8; i < size - 8; i += 1) {
    data[6 * size + i] = (i + 1) % 2;
    data[i * size + 6] = (i + 1) % 2;
  }
  for (const [row, column] of alignmentCenters(version)) {
    square(row, column, 2, (ring) => ring !== 1);
  }
  data[(size - 8) * size + 8] = 1;
  if (version >= 7) {
    const word = VERSION_WORDS[version];
    for (const positions of versionPositions(size)) {
      positions.forEach((position, i) => { data[position] = (word >> i) & 1; });
    }
  }
}

function drawFormat(data: Uint8Array, size: number, level: number, mask: number) {
  const word = FORMAT_WORDS[(FORMAT_FROM_LEVEL[level] << 3) | mask];
  for (const positions of formatPositions(size)) {
    positions.forEach((position, i) => { data[position] = (word >> i) & 1; });
  }
}

function applyMask(data: Uint8Array, version: number, mask: number) {
  const size = sizeOf(version);
  const patterns = functionPatterns(version);
  const isMasked = MASKS[mask];
  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      const index = row * size + column;
      if (!patterns[index] && isMasked(row, column)) data[index] ^= 1;
    }
  }
}

/**
 * Scores how hard a code is to read: long runs and blocks of one colour,
 * patterns that look like finders and an uneven balance of dark and light.
 * The scores match the standard, and other encoders.
 */
function penalty({ size, data }: Modules): number {
  let points = 0;
  for (let line = 0; line < size; line += 1) {
    // Rows and columns at once.
    const runs = [0, 0];
    const colors = [-1, -1];
    const windows = [0, 0];
    for (let along = 0; along < size; along += 1) {
      const modules = [data[line * size + along], data[along * size + line]];
      for (let direction = 0; direction < 2; direction += 1) {
        const module = modules[direction];
        if (module === colors[direction]) {
          runs[direction] += 1;
        } else {
          if (runs[direction] >= 5) points += runs[direction] - 2;
          colors[direction] = module;
          runs[direction] = 1;
        }
        // Dark, light, three dark, light, dark, with four light on one side.
        windows[direction] = ((windows[direction] << 1) & 0x7ff) | module;
        if (along >= 10 && (windows[direction] === 0x5d0 || windows[direction] === 0x05d)) points += 40;
      }
    }
    for (const run of runs) {
      if (run >= 5) points += run - 2;
    }
  }

  let dark = 0;
  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      const index = row * size + column;
      dark += data[index];
      if (row < size - 1 && column < size - 1) {
        const block = data[index] + data[index + 1] + data[index + size] + data[index + size + 1];
        if (block === 0 || block === 4) points += 3;
      }
    }
  }
  return points + Math.abs(Math.ceil((dark * 100) / data.length / 5) - 10) * 10;
}

/**
 * Encodes text as the modules of a QR code.
 *
 * @throws When the text doesn't fit, or the options aren't valid.
 */
export function encodeQrCode(text: string, { level = 'M', version, mask }: EncodeOptions = {}): Modules {
  const levelIndex = LEVELS[level];
  if (levelIndex === undefined) {
    throw new Error(`Unknown error correction level: ${level}`);
  }
  if (version !== undefined && !(Number.isInteger(version) && version >= 1 && version <= 40)) {
    throw new Error(`Versions are 1 to 40: ${version}`);
  }
  if (mask !== undefined && !(Number.isInteger(mask) && mask >= 0 && mask <= 7)) {
    throw new Error(`Masks are 0 to 7: ${mask}`);
  }

  const segment = toSegment(text);
  const versions = version ? [version] : Array.from({ length: 40 }, (_, index) => index + 1);
  const chosen = versions.find((candidate) => fits(segment, candidate, levelIndex));
  if (!chosen) {
    throw new Error(version ? `The text doesn't fit in a version ${version} QR code` : 'The text is too long for a QR code');
  }

  const size = sizeOf(chosen);
  const data = new Uint8Array(size * size);
  drawFunctionPatterns(data, chosen);
  const codewords = interleave(dataCodewords(segment, chosen, levelIndex), chosen, levelIndex);
  const order = dataModuleOrder(chosen);
  // Leftover modules are remainder bits, which stay light.
  for (let bit = 0; bit < codewords.length * 8; bit += 1) {
    data[order[bit]] = (codewords[bit >> 3] >> (7 - (bit & 7))) & 1;
  }

  const masked = (candidate: number) => {
    const copy = data.slice();
    applyMask(copy, chosen, candidate);
    drawFormat(copy, size, levelIndex, candidate);
    return { size, data: copy };
  };
  if (mask !== undefined) {
    return masked(mask);
  }
  let best = masked(0);
  let bestPenalty = penalty(best);
  for (let candidate = 1; candidate < 8; candidate += 1) {
    const modules = masked(candidate);
    const score = penalty(modules);
    if (score < bestPenalty) {
      best = modules;
      bestPenalty = score;
    }
  }
  return best;
}
