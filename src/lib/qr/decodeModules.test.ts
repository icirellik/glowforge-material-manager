// @vitest-environment node
import { decodeModules, readVersion } from './decodeModules';
import {
  alphanumericSegment, byteSegment, encodeQrCode, encodeSegments, writeBits,
} from './encodeQrCode';
import type { EncodeOptions, Segment } from './encodeQrCode';
import {
  ECI, FNC1_FIRST, FNC1_SECOND, FORMAT_WORDS, KANJI, STRUCTURED_APPEND, dataModuleOrder, formatPositions,
} from './spec';
import type { Modules } from './spec';

const LEVELS = ['L', 'M', 'Q', 'H'] as const;

/**
 * Encodes the longest text that fits, so every block is full of data.
 */
function encodeFull(options: EncodeOptions) {
  const fill = (length: number) => Array.from({ length }, (_, i) => String.fromCharCode(33 + ((i * 7) % 94))).join('');
  let low = 1;
  let high = 3000;
  while (low < high) {
    const middle = Math.ceil((low + high) / 2);
    try {
      encodeQrCode(fill(middle), options);
      low = middle;
    } catch {
      high = middle - 1;
    }
  }
  const text = fill(low);
  return { text, modules: encodeQrCode(text, options) };
}

/**
 * Modules drawn as rows of # for dark and . for light.
 */
function fromRows(rows: string[]): Modules {
  return { size: rows.length, data: Uint8Array.from(rows.join(''), (module) => (module === '#' ? 1 : 0)) };
}

// Codes made by the qrcode package (1.4.4), in modes the encoder doesn't use:
// 漢字 in kanji mode, and 123ABCxyz as numeric, alphanumeric and byte
// segments.
const KANJI_CODE = fromRows([
  '#######..##...#######',
  '#.....#.#.##..#.....#',
  '#.###.#..####.#.###.#',
  '#.###.#..#.##.#.###.#',
  '#.###.#.#.###.#.###.#',
  '#.....#..###..#.....#',
  '#######.#.#.#.#######',
  '.........#...........',
  '#.#.#.#..##.#...#..#.',
  '.#.###..#.##.#.#.##.#',
  '##..#.####.#.###...#.',
  '###..#...#####.####..',
  '##..#.#..###.###..#..',
  '........##....#.....#',
  '#######...#.#...#...#',
  '#.....#...#...#..####',
  '#.###.#.#.#.#.#.#.#.#',
  '#.###.#..###.#.#.#.#.',
  '#.###.#.##.#.###..#.#',
  '#.....#....###.###.#.',
  '#######.#..#.###..#..',
]);
const MIXED_CODE = fromRows([
  '#######.#..##.#######',
  '#.....#.....#.#.....#',
  '#.###.#.####..#.###.#',
  '#.###.#..####.#.###.#',
  '#.###.#..#..#.#.###.#',
  '#.....#.###...#.....#',
  '#######.#.#.#.#######',
  '.........###.........',
  '#.#...##.####..#..#.#',
  '##.##...#.......#..##',
  '......#..##...#..#.#.',
  '.#..##..###.####...##',
  '####.##......#...##.#',
  '........#..#.#.......',
  '#######.##.##.###.#..',
  '#.....#..###.##...#..',
  '#.###.#..#.###.##.###',
  '#.###.#..#....##.##..',
  '#.###.#.##...########',
  '#.....#..##.#..#####.',
  '#######.#....####.###',
]);

/**
 * Flips the modules at the given positions.
 */
function damage({ size, data }: Modules, positions: [number, number][]): Modules {
  const copy = data.slice();
  for (const [row, column] of positions) copy[row * size + column] ^= 1;
  return { size, data: copy };
}

describe('decodeModules', () => {
  it('decodes every version, error correction level and mask', () => {
    for (let version = 1; version <= 40; version += 1) {
      for (let index = 0; index < LEVELS.length; index += 1) {
        const { text, modules } = encodeFull({ version, level: LEVELS[index], mask: (version + index) % 8 });
        expect(decodeModules(modules)?.text, `version ${version}, level ${LEVELS[index]}`).toEqual(text);
      }
    }
  });

  it('decodes every mode', () => {
    for (const text of ['0123456789012', '01234567890123', 'HELLO WORLD $%*+-./:', 'ODD', 'Birch – 3mm, ø 🙂']) {
      expect(decodeModules(encodeQrCode(text))?.text).toEqual(text);
    }
    expect(decodeModules(KANJI_CODE)?.text).toEqual('漢字');
    expect(decodeModules(MIXED_CODE)?.text).toEqual('123ABCxyz');
  });

  it('corrects damaged modules', () => {
    const settings = `Custom:abc1234|${JSON.stringify({ n: 'Birch', t: 'Thin', c: { p: 100, s: 180 } })}`;
    const modules = encodeQrCode(settings, { level: 'M' });
    const { size } = modules;
    // Data modules near the bottom right, and one bit of each format copy.
    const damaged = damage(modules, [
      [size - 1, size - 1], [size - 2, size - 3], [size - 5, size - 2], [size - 9, size - 1],
      [8, 2], [size - 3, 8],
    ]);
    expect(decodeModules(damaged)?.text).toEqual(settings);
  });

  it('decodes mirrored codes', () => {
    const { size, data } = encodeQrCode('Custom:abc1234');
    const mirrored = data.map((_, index) => data[(index % size) * size + Math.floor(index / size)]);
    expect(decodeModules({ size, data: mirrored })).toMatchObject({ text: 'Custom:abc1234', mirrored: true, version: 1 });
    expect(decodeModules({ size, data })).toMatchObject({ mirrored: false });
  });

  it('rejects modules that are not a readable code', () => {
    const { size, data } = encodeQrCode('Custom:abc1234', { level: 'L' });
    // Wipe out the bottom half.
    const wiped = data.slice();
    wiped.fill(0, Math.floor(size / 2) * size);
    expect(decodeModules({ size, data: wiped })).toBeNull();

    let seed = 1;
    const random = Uint8Array.from({ length: 25 * 25 }, () => {
      seed = (seed * 16807) % 2147483647;
      return seed & 1;
    });
    expect(decodeModules({ size: 25, data: random })).toBeNull();
    expect(decodeModules({ size: 22, data: new Uint8Array(22 * 22) })).toBeNull();
  });
});

/**
 * Encodes raw segments, to make codes our encoder doesn't write.
 */
function encodeRaw(segments: Segment[], options: EncodeOptions = {}): Modules {
  return encodeSegments(() => segments, options);
}

function bitsOf(...fields: [number, number][]): number[] {
  const bits: number[] = [];
  for (const [value, count] of fields) writeBits(bits, value, count);
  return bits;
}

const eci = (...bytes: number[]): Segment => ({ mode: ECI, bits: bitsOf(...bytes.map((byte): [number, number] => [byte, 8])) });
const bytes = (...values: number[]) => byteSegment(Uint8Array.from(values));

/**
 * A kanji segment from Shift JIS codes, packed into 13 bits the way the
 * standard describes.
 */
function kanji(...codes: number[]): Segment {
  const bits = codes.flatMap((code) => {
    const offset = code - (code >= 0xe040 ? 0xc140 : 0x8140);
    return bitsOf([(offset >> 8) * 0xc0 + (offset & 0xff), 13]);
  });
  return { mode: KANJI, count: codes.length, bits };
}

/**
 * Flips the modules at the given indexes.
 */
function flip({ size, data }: Modules, indexes: number[]): Modules {
  const copy = data.slice();
  for (const index of indexes) copy[index] ^= 1;
  return { size, data: copy };
}

describe('decodeModules, beyond the encoder', () => {
  it('uses ECI character sets', () => {
    const decode = (...segments: Segment[]) => decodeModules(encodeRaw(segments))?.text;
    const utf8 = Array.from(new TextEncoder().encode('é漢'));
    expect(decode(eci(26), bytes(...utf8))).toEqual('é漢');
    // ISO-8859-1 is 1:1 with the first 256 code points, unlike windows-1252.
    expect(decode(eci(3), bytes(0x41, 0x96, 0xe9))).toEqual('A\u0096é');
    expect(decode(eci(1), bytes(0x96))).toEqual('\u0096');
    // Code page 437, for ECI 0 and 2.
    expect(decode(eci(0), bytes(0x41, 0x80, 0xe1, 0xfe))).toEqual('AÇß■');
    expect(decode(eci(2), bytes(0x80))).toEqual('Ç');
    expect(decode(eci(20), bytes(0x8a, 0xbf))).toEqual('漢');
    // Designators can also take two or three bytes.
    expect(decode(eci(0x80, 26), bytes(...utf8))).toEqual('é漢');
    expect(decode(eci(0xc0, 0x00, 26), bytes(...utf8))).toEqual('é漢');
    // The character set can change part way through.
    expect(decode(eci(3), bytes(0xe9), eci(26), bytes(0xc3, 0xa9))).toEqual('éé');
    // Without an ECI, bytes that aren't UTF-8 are ISO-8859-1.
    expect(decode(bytes(0xe9, 0x96))).toEqual('é\u0096');
    // An ECI cut short isn't readable.
    expect(decodeModules(encodeRaw([{ mode: ECI, bits: [1, 0] }]))).toBeNull();
  });

  it('decodes kanji from both Shift JIS ranges', () => {
    const codes = [0x8abf, 0x889f, 0xe040, 0xeaa4];
    const expected = new TextDecoder('shift_jis').decode(Uint8Array.from(codes.flatMap((code) => [code >> 8, code & 0xff])));
    expect(expected).toEqual('漢亜漾熙');
    expect(decodeModules(encodeRaw([kanji(...codes)]))?.text).toEqual(expected);
  });

  it('reports structured append', () => {
    const header: Segment = { mode: STRUCTURED_APPEND, bits: bitsOf([2, 4], [4, 4], [0x5a, 8]) };
    expect(decodeModules(encodeRaw([header, bytes(0x70, 0x33)]))).toMatchObject({
      text: 'p3',
      structuredAppend: { index: 2, total: 5, parity: 0x5a },
    });
    expect(decodeModules(encodeQrCode('p3'))?.structuredAppend).toBeUndefined();
  });

  it('separates FNC1 fields with GS', () => {
    const decode = (...segments: Segment[]) => decodeModules(encodeRaw(segments))?.text;
    expect(decode({ mode: FNC1_FIRST, bits: [] }, alphanumericSegment('01%%A%B'))).toEqual('01%A\x1dB');
    // The application indicator isn't part of the text.
    expect(decode({ mode: FNC1_SECOND, bits: bitsOf([37, 8]) }, alphanumericSegment('A%B'))).toEqual('A\x1dB');
    expect(decode(alphanumericSegment('01%%A%B'))).toEqual('01%%A%B');
  });

  it('uses whichever copy of the format information reads best', () => {
    const modules = encodeQrCode('Custom:abc1234', { level: 'M', mask: 3 });
    const [first, second] = formatPositions(modules.size);
    expect(decodeModules(flip(modules, first.slice(0, 5)))?.text).toEqual('Custom:abc1234');
    expect(decodeModules(flip(modules, second.slice(0, 5)))?.text).toEqual('Custom:abc1234');
    expect(decodeModules(flip(modules, [...first.slice(0, 5), ...second.slice(0, 5)]))).toBeNull();

    // A first copy damaged into something closer to another format, with an
    // intact second copy, still reads as the second copy says.
    const word = FORMAT_WORDS[3];
    const other = FORMAT_WORDS.find((candidate) => {
      let distance = 0;
      for (let diff = candidate ^ word; diff; diff &= diff - 1) distance += 1;
      return distance === 7;
    })!;
    const differing = first.filter((_, bit) => ((word ^ other) >> bit) & 1);
    expect(decodeModules(flip(modules, differing.slice(0, 4)))?.text).toEqual('Custom:abc1234');
  });

  it('corrects no more errors than the standard allows', () => {
    // Small codes keep some error correction codewords back to detect wrong
    // corrections: version 1 L corrects 2 of its 7, version 1 M 4 of 10.
    const damageCodewords = (modules: Modules, count: number) => {
      const order = dataModuleOrder((modules.size - 17) / 4);
      return flip(modules, Array.from({ length: count }, (_, codeword) => order[codeword * 8]));
    };
    const low = encodeQrCode('Custom:abc1234', { level: 'L', version: 1 });
    expect(decodeModules(damageCodewords(low, 2))?.text).toEqual('Custom:abc1234');
    expect(decodeModules(damageCodewords(low, 3))).toBeNull();
    const medium = encodeQrCode('Custom:abc1234', { level: 'M', version: 1 });
    expect(decodeModules(damageCodewords(medium, 4))?.text).toEqual('Custom:abc1234');
    expect(decodeModules(damageCodewords(medium, 5))).toBeNull();
    // Larger codes correct half their error correction codewords.
    const larger = encodeQrCode('Custom:abc1234', { level: 'M', version: 2 });
    expect(decodeModules(damageCodewords(larger, 8))?.text).toEqual('Custom:abc1234');
  });
});

describe('readVersion', () => {
  it('reads the version information of large codes', () => {
    expect(readVersion(encodeQrCode('x', { version: 7 }))).toEqual(7);
    expect(readVersion(encodeQrCode('x', { version: 40 }))).toEqual(40);
    expect(readVersion(encodeQrCode('x', { version: 6 }))).toBeNull();
  });
});
