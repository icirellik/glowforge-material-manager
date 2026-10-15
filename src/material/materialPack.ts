import type { TinyMaterial } from './materialTiny';

/**
 * A compact binary form of a tiny material, for cloud sync.
 *
 * The fields are written in a fixed order without their keys. Strings are a
 * length and UTF-8. Every other field is a value: a tag byte, then its data.
 * Numbers get the shortest tag that gives back exactly the same double:
 *
 * - a decimal with up to 4 places, as a whole number of 1/10^k;
 * - a power or speed the editor made, as the whole number the user typed,
 *   since the editor's unit conversions turn those into long floats like
 *   2881.3333333333335;
 * - otherwise the 8 bytes of the double.
 *
 * Only materials shaped exactly like `toTinyMaterial` makes them, keys in the
 * same order, can be packed. Strings are UTF-8, so a lone surrogate comes back
 * as U+FFFD; encodeCloudMaterial checks for that and uses JSON instead. The format is frozen: values in the cloud must
 * read the same in every later version, so change it only by adding tags.
 *
 * material = STR n, STR t, VAL d, VAL c.p, VAL c.s, VAL c.a, VAL c.f,
 *            UINT count, count × (STR n, VAL p, VAL s, VAL a, VAL f),
 *            UINT count, count × (STR n, VAL p, VAL s, VAL a, VAL f, VAL g),
 *            UINT count, count × (STR n, VAL p, VAL s, VAL a, VAL f, VAL g,
 *                                 VAL rm, TAIL)
 * UINT     = unsigned LEB128, at most 2^53 - 1, no extra bytes
 * STR      = UINT byte length, UTF-8
 * TAIL     = 0, for re 'LagrangeFilter' and ip, ap, t null,
 *            or 1, VAL re, VAL ip, VAL ap, VAL t
 */

// Value tags.
const ABSENT = 0x00;
const NULL = 0x01;
const FALSE = 0x02;
const TRUE = 0x03;
// 0x04 to 0x08: a decimal with 0 to 4 places, zigzag UINT.
const DECIMAL = 0x04;
// UINT d, (d / 100) * 99, as toRealPower.
const POWER = 0x09;
// UINT d, ((d - 100) / 400) * 3900 + 100, as toRealCutSpeed.
const CUT_SPEED = 0x0a;
// UINT d, ((d - 100) / 900) * 8400 + 100, as toRealEngraveSpeed.
const ENGRAVE_SPEED = 0x0b;
// 8 bytes, little endian.
const FLOAT = 0x0c;
const STRING = 0x0d;
// UINT byte length, UTF-8 of JSON.stringify(value).
const JSON_VALUE = 0x0e;
const NAMED: { [tag: number]: string } = {
  0x0f: 'FloydSteinbergDitherMethod',
  0x10: 'RiemersmaDitherMethod',
  0x11: 'LagrangeFilter',
};

// Literals, not Math.pow, so the arithmetic is exact the same everywhere.
const POWERS_OF_TEN = [1, 10, 100, 1000, 10000];
const MAX_UINT = Number.MAX_SAFE_INTEGER;
// The largest whole number a decimal can be, so its zigzag fits a UINT.
const MAX_DECIMAL = 2 ** 52 - 1;

const FORMULAS: {
  tag: number;
  value: (d: number) => number;
  guess: (v: number) => number;
}[] = [
  { tag: POWER, value: (d) => (d / 100) * 99, guess: (v) => v / 0.99 },
  {
    tag: CUT_SPEED,
    value: (d) => ((d - 100) / 400) * 3900 + 100,
    guess: (v) => ((v - 100) / 3900) * 400 + 100,
  },
  {
    tag: ENGRAVE_SPEED,
    value: (d) => ((d - 100) / 900) * 8400 + 100,
    guess: (v) => ((v - 100) / 8400) * 900 + 100,
  },
];

const MATERIAL_KEYS = ['n', 't', 'd', 'c', 's', 'v', 'b'];
const CUT_KEYS = ['p', 's', 'a', 'f'];
const SCORE_KEYS = ['n', 'p', 's', 'a', 'f'];
const VECTOR_KEYS = ['n', 'p', 's', 'a', 'f', 'g'];
const BITMAP_KEYS = ['n', 'p', 's', 'a', 'f', 'g', 'rm', 're', 'ip', 'ap', 't'];
const TAIL_KEYS = ['re', 'ip', 'ap', 't'];

const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true });

type JsonObject = { [key: string]: unknown };

function isObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Whether the object's keys are the given keys, in order, with only the
 * optional ones left out.
 */
function hasKeys(object: JsonObject, keys: string[], required: string[]) {
  const actual = Object.keys(object);
  let at = 0;
  for (const key of keys) {
    if (actual[at] === key) {
      at += 1;
    } else if (required.includes(key)) {
      return false;
    }
  }
  return at === actual.length;
}

function uintLength(value: number): number {
  let length = 1;
  while (value >= 128) {
    value = Math.floor(value / 128);
    length += 1;
  }
  return length;
}

class Writer {
  readonly bytes: number[] = [];

  byte(value: number) {
    this.bytes.push(value);
  }

  uint(value: number) {
    while (value >= 128) {
      this.bytes.push((value % 128) + 128);
      value = Math.floor(value / 128);
    }
    this.bytes.push(value);
  }

  string(value: string) {
    const utf8 = encoder.encode(value);
    this.uint(utf8.length);
    for (const byte of utf8) this.bytes.push(byte);
  }

  number(value: number) {
    // The shortest encoding, the lowest tag when two are as short.
    let bestTag = FLOAT;
    let bestData = 0;
    let bestLength = 8;
    for (let places = 0; places < POWERS_OF_TEN.length; places += 1) {
      const whole = Math.round(value * POWERS_OF_TEN[places]);
      if (
        Math.abs(whole) <= MAX_DECIMAL &&
        whole / POWERS_OF_TEN[places] === value
      ) {
        const zigzag = whole < 0 ? -2 * whole - 1 : 2 * whole;
        // A decimal as long as the double wins, as its tag is lower.
        if (uintLength(zigzag) <= bestLength) {
          bestTag = DECIMAL + places;
          bestData = zigzag;
          bestLength = uintLength(zigzag);
        }
        break;
      }
    }
    for (const formula of FORMULAS) {
      const guess = Math.round(formula.guess(value));
      // The guess can be one off. Past 2^53, guess + 1 is guess, so the
      // candidates are listed rather than counted.
      for (const d of [guess - 1, guess, guess + 1]) {
        if (d >= 0 && d <= MAX_UINT && formula.value(d) === value) {
          if (
            uintLength(d) < bestLength ||
            (uintLength(d) === bestLength && formula.tag < bestTag)
          ) {
            bestTag = formula.tag;
            bestData = d;
            bestLength = uintLength(d);
          }
          break;
        }
      }
    }

    this.byte(bestTag);
    if (bestTag === FLOAT) {
      const view = new DataView(new ArrayBuffer(8));
      view.setFloat64(0, value, true);
      for (let i = 0; i < 8; i += 1) this.bytes.push(view.getUint8(i));
    } else {
      this.uint(bestData);
    }
  }

  value(value: unknown) {
    if (value === undefined) {
      this.byte(ABSENT);
    } else if (value === null) {
      this.byte(NULL);
    } else if (value === false) {
      this.byte(FALSE);
    } else if (value === true) {
      this.byte(TRUE);
    } else if (typeof value === 'number') {
      this.number(value);
    } else if (typeof value === 'string') {
      const named = Object.keys(NAMED).find((tag) => NAMED[+tag] === value);
      if (named) {
        this.byte(+named);
      } else {
        this.byte(STRING);
        this.string(value);
      }
    } else {
      this.byte(JSON_VALUE);
      this.string(JSON.stringify(value));
    }
  }

  values(object: JsonObject, keys: string[]) {
    for (const key of keys) this.value(object[key]);
  }
}

/**
 * Packs a tiny material, or gives null when it isn't shaped like one. It
 * expects a material as JSON gives it back: no undefined, NaN or -0.
 */
export function packMaterial(material: unknown): Uint8Array | null {
  if (
    !isObject(material) ||
    !hasKeys(material, MATERIAL_KEYS, ['n', 't', 'c', 's', 'v', 'b'])
  ) {
    return null;
  }
  const { n, t, c, s, v, b } = material;
  if (
    typeof n !== 'string' ||
    typeof t !== 'string' ||
    !isObject(c) ||
    !hasKeys(c, CUT_KEYS, []) ||
    !Array.isArray(s) ||
    !Array.isArray(v) ||
    !Array.isArray(b)
  ) {
    return null;
  }
  const settings = (list: unknown[], keys: string[]) =>
    list.every(
      (setting) =>
        isObject(setting) &&
        typeof setting.n === 'string' &&
        hasKeys(setting, keys, ['n']),
    );
  if (
    !settings(s, SCORE_KEYS) ||
    !settings(v, VECTOR_KEYS) ||
    !settings(b, BITMAP_KEYS)
  ) {
    return null;
  }

  const writer = new Writer();
  writer.string(n);
  writer.string(t);
  writer.value(material.d);
  writer.values(c, CUT_KEYS);
  for (const [list, keys] of [
    [s, SCORE_KEYS],
    [v, VECTOR_KEYS],
    [b, BITMAP_KEYS.slice(0, 7)],
  ] as [JsonObject[], string[]][]) {
    writer.uint(list.length);
    for (const setting of list) {
      writer.string(setting.n as string);
      writer.values(setting, keys.slice(1));
      if (list === b) {
        const usual =
          setting.re === 'LagrangeFilter' &&
          setting.ip === null &&
          setting.ap === null &&
          setting.t === null;
        writer.byte(usual ? 0 : 1);
        if (!usual) writer.values(setting, TAIL_KEYS);
      }
    }
  }
  return new Uint8Array(writer.bytes);
}

class Reader {
  private at = 0;

  constructor(private readonly bytes: Uint8Array) {}

  get remaining(): number {
    return this.bytes.length - this.at;
  }

  byte(): number {
    if (this.at >= this.bytes.length) {
      throw new RangeError('The packed material ends too soon');
    }
    const byte = this.bytes[this.at];
    this.at += 1;
    return byte;
  }

  uint(): number {
    let value = 0;
    let scale = 1;
    for (let i = 0; i < 8; i += 1) {
      const byte = this.byte();
      value += (byte % 128) * scale;
      if (byte < 128) {
        if ((byte === 0 && i > 0) || value > MAX_UINT) {
          throw new RangeError('A packed number is out of range');
        }
        return value;
      }
      scale *= 128;
    }
    throw new RangeError('A packed number is too long');
  }

  string(): string {
    const length = this.uint();
    if (length > this.remaining) {
      throw new RangeError('The packed material ends too soon');
    }
    const text = decoder.decode(this.bytes.subarray(this.at, this.at + length));
    this.at += length;
    return text;
  }

  count(): number {
    const count = this.uint();
    // Every setting takes at least a byte.
    if (count > this.remaining) {
      throw new RangeError('The packed material ends too soon');
    }
    return count;
  }

  value(): unknown {
    const tag = this.byte();
    if (tag === ABSENT) return undefined;
    if (tag === NULL) return null;
    if (tag === FALSE) return false;
    if (tag === TRUE) return true;
    if (tag >= DECIMAL && tag < DECIMAL + POWERS_OF_TEN.length) {
      const zigzag = this.uint();
      const whole = zigzag % 2 === 0 ? zigzag / 2 : -(zigzag + 1) / 2;
      return whole / POWERS_OF_TEN[tag - DECIMAL];
    }
    const formula = FORMULAS.find((f) => f.tag === tag);
    if (formula) return formula.value(this.uint());
    if (tag === FLOAT) {
      const view = new DataView(new ArrayBuffer(8));
      for (let i = 0; i < 8; i += 1) view.setUint8(i, this.byte());
      return view.getFloat64(0, true);
    }
    if (tag === STRING) return this.string();
    if (tag === JSON_VALUE) return JSON.parse(this.string());
    if (NAMED[tag] !== undefined) return NAMED[tag];
    throw new RangeError(`A packed value has an unknown tag, ${tag}`);
  }

  /**
   * Reads values into an object, leaving absent ones out.
   */
  values(object: JsonObject, keys: string[]) {
    for (const key of keys) {
      const value = this.value();
      if (value !== undefined) object[key] = value;
    }
  }

  end() {
    if (this.remaining !== 0) {
      throw new RangeError('There are bytes after the packed material');
    }
  }
}

/**
 * Unpacks a material packed by `packMaterial`. Throws a RangeError, or a
 * TypeError for bad UTF-8, when the bytes aren't one.
 */
export function unpackMaterial(bytes: Uint8Array): TinyMaterial {
  const reader = new Reader(bytes);
  const material: JsonObject = { n: reader.string(), t: reader.string() };
  reader.values(material, ['d']);
  const cut: JsonObject = {};
  reader.values(cut, CUT_KEYS);
  material.c = cut;

  const lists: [string, string[]][] = [
    ['s', SCORE_KEYS],
    ['v', VECTOR_KEYS],
    ['b', BITMAP_KEYS.slice(0, 7)],
  ];
  for (const [field, keys] of lists) {
    const count = reader.count();
    const list: JsonObject[] = [];
    for (let i = 0; i < count; i += 1) {
      const setting: JsonObject = { n: reader.string() };
      reader.values(setting, keys.slice(1));
      if (field === 'b') {
        const tail = reader.byte();
        if (tail === 0) {
          Object.assign(setting, {
            re: 'LagrangeFilter',
            ip: null,
            ap: null,
            t: null,
          });
        } else if (tail === 1) {
          reader.values(setting, TAIL_KEYS);
        } else {
          throw new RangeError('A packed bitmap setting has an unknown tail');
        }
      }
      list.push(setting);
    }
    material[field] = list;
  }
  reader.end();
  return material as unknown as TinyMaterial;
}
