// @vitest-environment node
import { decodeModules, readVersion } from './decodeModules';
import { encodeQrCode } from './encodeQrCode';
import type { EncodeOptions } from './encodeQrCode';
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
const KANJI = fromRows([
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
const MIXED = fromRows([
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
        expect(decodeModules(modules), `version ${version}, level ${LEVELS[index]}`).toEqual(text);
      }
    }
  });

  it('decodes every mode', () => {
    for (const text of ['0123456789012', '01234567890123', 'HELLO WORLD $%*+-./:', 'ODD', 'Birch – 3mm, ø 🙂']) {
      expect(decodeModules(encodeQrCode(text))).toEqual(text);
    }
    expect(decodeModules(KANJI)).toEqual('漢字');
    expect(decodeModules(MIXED)).toEqual('123ABCxyz');
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
    expect(decodeModules(damaged)).toEqual(settings);
  });

  it('decodes mirrored codes', () => {
    const { size, data } = encodeQrCode('Custom:abc1234');
    const mirrored = data.map((_, index) => data[(index % size) * size + Math.floor(index / size)]);
    expect(decodeModules({ size, data: mirrored })).toEqual('Custom:abc1234');
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

describe('readVersion', () => {
  it('reads the version information of large codes', () => {
    expect(readVersion(encodeQrCode('x', { version: 7 }))).toEqual(7);
    expect(readVersion(encodeQrCode('x', { version: 40 }))).toEqual(40);
    expect(readVersion(encodeQrCode('x', { version: 6 }))).toBeNull();
  });
});
