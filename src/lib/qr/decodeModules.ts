import { correctErrors } from './reedSolomon';
import {
  ALPHANUMERIC,
  ALPHANUMERIC_CHARACTERS,
  BYTE,
  ECI,
  FNC1_FIRST,
  FNC1_SECOND,
  FORMAT_WORDS,
  LEVEL_FROM_FORMAT,
  MASKS,
  NUMERIC,
  STRUCTURED_APPEND,
  VERSION_WORDS,
  blockLayout,
  countBits,
  dataModuleOrder,
  formatPositions,
  versionPositions,
} from './spec';
import type { Modules } from './spec';

/**
 * Decodes the modules of a QR code into its text, following ISO/IEC 18004.
 *
 * The modules come from a straightened code, so this only deals with the
 * standard's layout: format and version information, masking, the order of
 * the codewords, error correction and the data segments.
 */

export interface DecodedQrCode {
  text: string;
  version: number;
  // The code was read from behind, or in a reflection.
  mirrored: boolean;
  // Codes that are one part of a longer message say which part they are.
  structuredAppend?: {
    // From 0.
    index: number;
    total: number;
    // The XOR of every byte of the whole message.
    parity: number;
  };
}

// Both codes can correct three wrong bits.
const MAX_INFO_ERRORS = 3;

function bitCount(value: number): number {
  let count = 0;
  for (let rest = value; rest; rest &= rest - 1) count += 1;
  return count;
}

/**
 * Finds the valid word closest to any of the read words.
 *
 * @returns The index of the valid word, or -1 if none are close enough.
 */
function closestWord(words: number[], read: number[], first = 0): number {
  let best = -1;
  let bestDistance = MAX_INFO_ERRORS + 1;
  for (let index = first; index < words.length; index += 1) {
    for (const value of read) {
      const distance = bitCount(words[index] ^ value);
      if (distance < bestDistance) {
        best = index;
        bestDistance = distance;
      }
    }
  }
  return best;
}

/**
 * Reads the error correction level and mask, which are stored twice: around
 * the top left finder, and split between the other two.
 */
function readFormat({
  size,
  data,
}: Modules): { level: number; mask: number } | null {
  const [first, second] = formatPositions(size).map((positions) =>
    positions.reduce((word, position, i) => word | (data[position] << i), 0),
  );

  const format = closestWord(FORMAT_WORDS, [first, second]);
  if (format < 0) {
    return null;
  }
  return { level: LEVEL_FROM_FORMAT[format >> 3], mask: format & 7 };
}

/**
 * Reads the version from a code's version information, which only codes of
 * version 7 and up have. It is stored twice, next to the top right and bottom
 * left finders.
 *
 * @returns The version, or null if it can't be read.
 */
export function readVersion({ size, data }: Modules): number | null {
  if (size < 45) {
    return null;
  }
  const [topRight, bottomLeft] = versionPositions(size).map((positions) =>
    positions.reduce((word, position, i) => word | (data[position] << i), 0),
  );
  const version = closestWord(VERSION_WORDS, [topRight, bottomLeft], 7);
  return version < 0 ? null : version;
}

/**
 * Reads the codewords, unmasked.
 */
function readCodewords(
  { size, data }: Modules,
  version: number,
  mask: number,
): Uint8Array {
  const order = dataModuleOrder(version);
  // Leftover modules are remainder bits.
  const codewords = new Uint8Array(Math.floor(order.length / 8));
  const isMasked = MASKS[mask];
  for (let bit = 0; bit < codewords.length * 8; bit += 1) {
    const index = order[bit];
    const column = index % size;
    const value =
      data[index] ^ (isMasked((index - column) / size, column) ? 1 : 0);
    codewords[bit >> 3] |= value << (7 - (bit & 7));
  }
  return codewords;
}

/**
 * Splits the interleaved codewords into blocks, corrects each block and joins
 * their data.
 *
 * @returns The data codewords, or null if there are too many errors.
 */
function correctCodewords(
  codewords: Uint8Array,
  version: number,
  level: number,
): Uint8Array | null {
  const {
    ecPerBlock,
    blockCount,
    dataTotal,
    shortData,
    shortBlocks,
    maxErrors,
  } = blockLayout(version, level);
  const blocks = Array.from(
    { length: blockCount },
    (_, index) =>
      new Uint8Array(shortData + (index < shortBlocks ? 0 : 1) + ecPerBlock),
  );

  let next = 0;
  for (let i = 0; i <= shortData; i += 1) {
    for (const block of blocks) {
      if (i < block.length - ecPerBlock) {
        block[i] = codewords[next];
        next += 1;
      }
    }
  }
  for (let i = 0; i < ecPerBlock; i += 1) {
    for (const block of blocks) {
      block[block.length - ecPerBlock + i] = codewords[next];
      next += 1;
    }
  }

  const result = new Uint8Array(dataTotal);
  let offset = 0;
  for (const block of blocks) {
    if (!correctErrors(block, ecPerBlock, maxErrors)) {
      return null;
    }
    result.set(block.subarray(0, block.length - ecPerBlock), offset);
    offset += block.length - ecPerBlock;
  }
  return result;
}

function bitReader(bytes: Uint8Array) {
  let offset = 0;
  return {
    available: () => bytes.length * 8 - offset,
    read: (count: number) => {
      let value = 0;
      for (let i = 0; i < count; i += 1) {
        value = (value << 1) | ((bytes[offset >> 3] >> (7 - (offset & 7))) & 1);
        offset += 1;
      }
      return value;
    },
  };
}

// The character sets that ECI designators select, by the names TextDecoder
// knows them by.
const ECI_CHARSETS: Record<number, string> = {
  0: 'cp437',
  1: 'iso-8859-1',
  2: 'cp437',
  3: 'iso-8859-1',
  4: 'iso-8859-2',
  5: 'iso-8859-3',
  6: 'iso-8859-4',
  7: 'iso-8859-5',
  8: 'iso-8859-6',
  9: 'iso-8859-7',
  10: 'iso-8859-8',
  11: 'iso-8859-9',
  12: 'iso-8859-10',
  13: 'iso-8859-11',
  15: 'iso-8859-13',
  16: 'iso-8859-14',
  17: 'iso-8859-15',
  18: 'iso-8859-16',
  20: 'shift_jis',
  21: 'windows-1250',
  22: 'windows-1251',
  23: 'windows-1252',
  24: 'windows-1256',
  25: 'utf-16be',
  26: 'utf-8',
  27: 'us-ascii',
  28: 'big5',
  29: 'gb18030',
  30: 'euc-kr',
};

// The upper half of code page 437, the character set of ECI 0 and 2.
const CP437 =
  'ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■\u00a0';

/**
 * Turns bytes into text. Without an ECI, most encoders, including ours, write
 * UTF-8, so that's tried before the standard's default of ISO-8859-1.
 */
function decodeBytes(bytes: number[], charset: string | null): string {
  // TextDecoder treats ISO-8859-1 as windows-1252, which differs from 0x80 to
  // 0x9F, and doesn't know code page 437.
  if (charset === 'iso-8859-1') {
    return bytes.map((byte) => String.fromCharCode(byte)).join('');
  }
  if (charset === 'cp437') {
    return bytes
      .map((byte) =>
        byte < 0x80 ? String.fromCharCode(byte) : CP437[byte - 0x80],
      )
      .join('');
  }
  if (charset) {
    try {
      return new TextDecoder(charset).decode(Uint8Array.from(bytes));
    } catch {
      // The browser doesn't know this character set.
    }
  }
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(
      Uint8Array.from(bytes),
    );
  } catch {
    return decodeBytes(bytes, 'iso-8859-1');
  }
}

/**
 * Reads an ECI designator, which is one to three bytes long.
 */
function readEci(reader: ReturnType<typeof bitReader>): number | null {
  if (reader.available() < 8) {
    return null;
  }
  const first = reader.read(8);
  if ((first & 0x80) === 0) {
    return first;
  }
  if ((first & 0xc0) === 0x80 && reader.available() >= 8) {
    return ((first & 0x3f) << 8) | reader.read(8);
  }
  if ((first & 0xe0) === 0xc0 && reader.available() >= 16) {
    return ((first & 0x1f) << 16) | reader.read(16);
  }
  return null;
}

/**
 * Reads the text from the data codewords, which hold a list of segments that
 * each start with a 4 bit mode.
 *
 * @returns The text, or null if the data is malformed.
 */
function readSegments(
  bytes: Uint8Array,
  version: number,
): Pick<DecodedQrCode, 'text' | 'structuredAppend'> | null {
  const reader = bitReader(bytes);
  let structuredAppend: DecodedQrCode['structuredAppend'];
  // In GS1 and other FNC1 data, % in alphanumeric segments separates fields.
  let fnc1 = false;

  let text = '';
  let charset: string | null = null;
  // Consecutive byte segments are decoded together, as a character can be
  // split between them.
  let pending: number[] = [];
  const flush = () => {
    if (pending.length > 0) {
      text += decodeBytes(pending, charset);
      pending = [];
    }
  };

  // The terminator can be left out, or cut short, when the code is full.
  while (reader.available() >= 4) {
    const mode = reader.read(4);
    if (mode === 0) {
      break;
    }

    if (mode === ECI) {
      flush();
      const designator = readEci(reader);
      if (designator === null) {
        return null;
      }
      charset = ECI_CHARSETS[designator] || null;
    } else if (mode === STRUCTURED_APPEND) {
      if (reader.available() < 16) {
        return null;
      }
      const index = reader.read(4);
      const total = reader.read(4) + 1;
      structuredAppend = { index, total, parity: reader.read(8) };
    } else if (mode === FNC1_FIRST) {
      fnc1 = true;
    } else if (mode === FNC1_SECOND) {
      // The application indicator, which isn't part of the text.
      if (reader.available() < 8) {
        return null;
      }
      reader.read(8);
      fnc1 = true;
    } else {
      const bits = countBits(mode, version);
      if (!bits || reader.available() < bits) {
        return null;
      }
      const count = reader.read(bits);

      if (mode === BYTE) {
        if (reader.available() < count * 8) {
          return null;
        }
        for (let i = 0; i < count; i += 1) pending.push(reader.read(8));
      } else {
        flush();
        if (mode === NUMERIC) {
          // Three digits in 10 bits, and the last one or two in 4 or 7.
          for (let remaining = count; remaining > 0; remaining -= 3) {
            const digits = Math.min(3, remaining);
            const bits = [0, 4, 7, 10][digits];
            if (reader.available() < bits) {
              return null;
            }
            const value = reader.read(bits);
            if (value >= 10 ** digits) {
              return null;
            }
            text += String(value).padStart(digits, '0');
          }
        } else if (mode === ALPHANUMERIC) {
          // Two characters in 11 bits, and the last one in 6.
          let segment = '';
          for (let remaining = count; remaining > 0; remaining -= 2) {
            const pair = remaining >= 2;
            if (reader.available() < (pair ? 11 : 6)) {
              return null;
            }
            const value = reader.read(pair ? 11 : 6);
            if (value >= (pair ? 45 * 45 : 45)) {
              return null;
            }
            segment += pair
              ? ALPHANUMERIC_CHARACTERS[Math.floor(value / 45)] +
                ALPHANUMERIC_CHARACTERS[value % 45]
              : ALPHANUMERIC_CHARACTERS[value];
          }
          // A single % is the field separator, GS, and %% is a %.
          text += fnc1
            ? segment.replace(/%%|%/g, (match) =>
                match === '%%' ? '%' : '\x1d',
              )
            : segment;
        } else {
          // Kanji are Shift JIS characters, compacted into 13 bits.
          if (reader.available() < count * 13) {
            return null;
          }
          const shiftJis: number[] = [];
          for (let i = 0; i < count; i += 1) {
            const value = reader.read(13);
            const compacted = (Math.floor(value / 0xc0) << 8) | (value % 0xc0);
            const character =
              compacted + (compacted < 0x1f00 ? 0x8140 : 0xc140);
            shiftJis.push(character >> 8, character & 0xff);
          }
          text += decodeBytes(shiftJis, 'shift_jis');
        }
      }
    }
  }
  flush();
  return { text, structuredAppend };
}

function decode(
  modules: Modules,
  version: number,
): Pick<DecodedQrCode, 'text' | 'structuredAppend'> | null {
  const format = readFormat(modules);
  if (!format) {
    return null;
  }
  const codewords = readCodewords(modules, version, format.mask);
  const data = correctCodewords(codewords, version, format.level);
  return data && readSegments(data, version);
}

/**
 * Swaps rows and columns, which turns a mirrored code the right way around.
 */
function transpose({ size, data }: Modules): Modules {
  const transposed = new Uint8Array(data.length);
  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      transposed[column * size + row] = data[row * size + column];
    }
  }
  return { size, data: transposed };
}

/**
 * Decodes a QR code's modules into its text. Mirrored codes, seen from behind
 * or in a reflection, are read too.
 *
 * @returns The decoded code, or null if the modules aren't a readable QR code.
 */
export function decodeModules(modules: Modules): DecodedQrCode | null {
  const version = (modules.size - 17) / 4;
  if (!Number.isInteger(version) || version < 1 || version > 40) {
    return null;
  }
  const decoded = decode(modules, version);
  if (decoded) {
    return { ...decoded, version, mirrored: false };
  }
  const mirrored = decode(transpose(modules), version);
  return mirrored && { ...mirrored, version, mirrored: true };
}
