// @vitest-environment node
import { encodeQrCode } from './encodeQrCode';
import type { EncodeOptions } from './encodeQrCode';
import { decodeModules } from './decodeModules';
import type { Modules } from './spec';

const LEVELS = ['L', 'M', 'Q', 'H'] as const;

// Fingerprints of the modules that the qrcode package (1.4.4) made for the
// fullest text in every version, by level, with mask (version + level) % 8.
// Matching them shows the encoder agrees with another implementation.
const FULL_CODES: Record<typeof LEVELS[number], string[]> = {
  L: [
    '07273721', '7acd9f47', '229734ab', 'c01370b5', '9bf23412', '2690107f', '7856eed3', '372952db',
    '92fc1506', 'a8c5fdc1', '0c344da7', '97e65ea1', 'd421cf5d', '04c8d2a1', '56a11b16', '58480ed3',
    '06552a34', '70562e01', 'd219445f', '5bbe07f7', 'a5da4bf2', '5016d4a7', '98c8089f', '3b8c38a7',
    'fe00d0a4', '501ecb15', '4fed4f9f', '9720ecd0', '4283c7bc', '16023682', '68f99a02', '687cdd8f',
    '85af1022', 'f4cfd7ed', '76c4c231', '4764d38d', '0ff137ed', '3b23ff63', 'ad36ec8e', '120d58fd',
  ],
  M: [
    '109a934b', 'fed6fdb7', '66ebf5c8', '6b98bdbb', '1e7ce641', '1aace777', 'fa44c087', '1e2feaf4',
    'bab4bf65', '12b9a9c1', '8acdb87f', '5c8475e2', '6d9c4e69', '6dfcceb7', '1b32e589', 'c6da70bc',
    'e771886b', '2bc77848', 'ed74f603', '59725f30', '4a1c615f', '97d4cb89', '8b731305', '9c4f26a4',
    '412db68f', 'd552d1d1', '487f6f1d', 'bfacc3bb', '36c50f29', '344e03c0', 'c26c1151', '5f5142cc',
    'e409baa4', '338b5edd', 'ab135e93', '43f53a3e', '20352de5', 'e7a008ff', 'cb4476c5', 'fbae2e96',
  ],
  Q: [
    'c542660b', '3774d0e1', 'b5481b9e', 'ab9a1f4c', '123e889f', '259e97a7', '6f9269e2', '08e52723',
    '5711978e', '01a49823', '5445966c', '4b996c88', '8301c303', '955a680b', '70caaba4', '64659516',
    '6750630b', 'dcf4ff6e', 'a34d6145', '24c4114d', 'f91aa0e7', 'd31592d1', '6b48e6d8', '833a603b',
    '58f792ca', 'd8841021', 'f3d45ea6', '2a950b82', '7a8a0c91', 'e3e6be87', 'e1ff6a66', 'c83e002a',
    '7874b3a9', 'd53d4eca', 'a22a3c5e', '0ec9edac', '1f081901', '07a4e871', 'f9dfc8b2', '2970c0cd',
  ],
  H: [
    'b991d75f', 'bc7f4866', 'bb1df4f1', 'b433bc6e', '040032e1', '3d060db1', '99b78a35', 'edb57d0f',
    '2bbb8805', 'eb660079', 'c165c34b', 'b46adfb8', '7a3a6567', 'a873e098', 'a00c0b0d', '9da44cb0',
    '403e9bd0', '83077196', '454ce213', '240ecc0b', '3c5ccc07', '5ba9a2e4', '219a0667', '458f9d4d',
    '200d04cf', 'c472e42e', '12c9fd3d', 'f21e5974', 'cae40aef', '0b18bf16', '49ba6dd6', 'ec6c3780',
    '119764f4', '70b6dbad', '2ba657f1', 'd99b72a4', '0760caf1', '966010ee', 'c83e3655', '8a0f4eff',
  ],
};

/**
 * FNV-1a, which is plenty to tell codes apart.
 */
function fingerprint({ data }: Modules): string {
  let hash = 0x811c9dc5;
  for (const value of data) hash = Math.imul(hash ^ value, 0x01000193);
  return (hash >>> 0).toString(16).padStart(8, '0');
}

const fill = (length: number) => Array.from({ length }, (_, i) => String.fromCharCode(33 + ((i * 7) % 94))).join('');

/**
 * The longest text that fits.
 */
function fullestText(options: EncodeOptions): string {
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
  return fill(low);
}

const settings = `Custom:abc1234|${JSON.stringify({ n: 'Birch', t: 'Thin', c: { p: 100, s: 180 } })}`;
const longSettings = `Custom:abc1234|${JSON.stringify({
  n: 'Baltic Birch Plywood – 3mm',
  c: [{ p: 100, s: 180, n: 1 }, { p: 90, s: 160, n: 2 }],
  e: [{ p: 60, s: 1000, l: 270 }, { p: 40, s: 1000, l: 340 }, { p: 80, s: 800, l: 195 }],
})}`;

describe('encodeQrCode', () => {
  it('matches the qrcode package for every version, level and mask', () => {
    for (let version = 1; version <= 40; version += 1) {
      for (let index = 0; index < LEVELS.length; index += 1) {
        const level = LEVELS[index];
        const options = { version, level, mask: (version + index) % 8 };
        const modules = encodeQrCode(fullestText(options), options);
        expect(fingerprint(modules), `version ${version}, level ${level}`).toEqual(FULL_CODES[level][version - 1]);
      }
    }
  });

  it('picks the same version and mask as the qrcode package', () => {
    const codes: [string, number, string][] = [
      ['Custom:abc1234', 1, '333ebecd'],
      [settings, 4, '81c5f6d4'],
      [longSettings, 10, '09335bd3'],
      ['HELLO WORLD $%*+-./:', 1, '1f3a40d5'],
      ['01234567890123', 1, '303539f9'],
      [fill(400), 15, '8382234d'],
      [fill(1200), 29, 'e172d8e1'],
    ];
    for (const [text, version, expected] of codes) {
      const modules = encodeQrCode(text);
      expect(modules.size).toEqual(17 + 4 * version);
      expect(fingerprint(modules), text).toEqual(expected);
      expect(decodeModules(modules)).toEqual(text);
    }
  });

  it('uses the most compact mode', () => {
    // A version 1 L code holds 41 digits, 25 alphanumeric characters or 17
    // bytes.
    for (const text of ['1'.repeat(41), 'A'.repeat(25), 'a'.repeat(17), '']) {
      const modules = encodeQrCode(text, { level: 'L' });
      expect(modules.size, text).toEqual(21);
      expect(decodeModules(modules)).toEqual(text);
    }
    expect(encodeQrCode('1'.repeat(42), { level: 'L' }).size).toEqual(25);
  });

  it('rejects text that does not fit, and invalid options', () => {
    expect(() => encodeQrCode('a'.repeat(2954), { level: 'L' })).toThrow('too long');
    expect(encodeQrCode('a'.repeat(2953), { level: 'L' }).size).toEqual(177);
    expect(() => encodeQrCode('a'.repeat(18), { level: 'L', version: 1 })).toThrow("doesn't fit");
    expect(() => encodeQrCode('a', { version: 41 })).toThrow('Versions');
    expect(() => encodeQrCode('a', { mask: 8 })).toThrow('Masks');
    expect(() => encodeQrCode('a', { level: 'X' as 'L' })).toThrow('level');
  });
});
