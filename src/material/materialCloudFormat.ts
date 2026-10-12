import {
  deflateRaw,
  fromBase92,
  inflateRaw,
  toBase92,
  zlibInflate,
} from '../lib/compression';
import { MATERIAL_DICTIONARY_1 } from './materialDictionary';
import { packMaterial, unpackMaterial } from './materialPack';
import type { TinyMaterial } from './materialTiny';

/**
 * How a material is stored in Chrome's cloud storage, `chrome.storage.sync`.
 *
 * Chrome counts an item as its key plus its value as JSON, in UTF-8, so the
 * value is base-92 text, which JSON writes one byte per character. The first
 * character says how the rest is written:
 *
 * - `A`: the packed material (materialPack.ts), compressed with raw DEFLATE
 *   and dictionary 1.
 * - `B`: the material as JSON, compressed the same way. For materials that
 *   can't be packed.
 * - Legacy, from 0.4.10 and earlier: a zlib stream of the JSON, from pako, one
 *   character per byte. These start with the zlib header, whose first byte is
 *   always 8 more than a multiple of 16, so a tag never can.
 *
 * Anything else was written by a newer version and is skipped, never
 * changed, so a format can be added without breaking older versions.
 */

export type CloudFormat = 'legacy' | 'packed-1' | 'json-1';

export type CloudDecodeResult =
  | { status: 'ok'; format: CloudFormat; material: TinyMaterial }
  // Written by a newer version.
  | { status: 'unsupported' }
  | { status: 'invalid'; error: string };

// No material comes close, this only stops a broken value using up memory.
const MAX_LENGTH = 65536;

const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8', { fatal: true, ignoreBOM: true });

/**
 * Whether a value was written by pako, in 0.4.10 or earlier: a zlib header
 * whose check works out.
 */
export function isLegacyValue(value: string): boolean {
  if (value.length < 6) {
    return false;
  }
  const method = value.charCodeAt(0);
  const flags = value.charCodeAt(1);
  return (
    (method & 0x0f) === 8 &&
    method >> 4 <= 7 &&
    flags <= 0xff &&
    (method * 256 + flags) % 31 === 0
  );
}

function isObject(value: unknown): value is { [key: string]: unknown } {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Whether a decoded value has what turning it into a full material and a
 * Glowforge material needs.
 */
function isTinyMaterial(value: unknown): value is TinyMaterial {
  const settings = (list: unknown) =>
    Array.isArray(list) &&
    list.every((setting) => isObject(setting) && typeof setting.n === 'string');
  return (
    isObject(value) &&
    typeof value.n === 'string' &&
    typeof value.t === 'string' &&
    isObject(value.c) &&
    settings(value.s) &&
    settings(value.v) &&
    settings(value.b)
  );
}

function decodeLegacy(value: string): unknown {
  const bytes = new Uint8Array(value.length);
  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i);
    if (code > 0xff) {
      throw new RangeError('A legacy value has a character above 0xFF');
    }
    bytes[i] = code;
  }
  const json = zlibInflate(bytes, { maxOutputLength: MAX_LENGTH });
  return JSON.parse(decoder.decode(json));
}

function decompress(body: string): Uint8Array {
  return inflateRaw(fromBase92(body), {
    dictionary: MATERIAL_DICTIONARY_1,
    maxOutputLength: MAX_LENGTH,
  });
}

/**
 * Reads a material from the cloud. Never throws.
 */
export function decodeCloudMaterial(value: unknown): CloudDecodeResult {
  if (typeof value !== 'string' || value.length === 0) {
    return { status: 'unsupported' };
  }
  try {
    let format: CloudFormat;
    let material: unknown;
    if (isLegacyValue(value)) {
      format = 'legacy';
      material = decodeLegacy(value);
    } else if (value[0] === 'A') {
      format = 'packed-1';
      material = unpackMaterial(decompress(value.slice(1)));
    } else if (value[0] === 'B') {
      format = 'json-1';
      material = JSON.parse(decoder.decode(decompress(value.slice(1))));
    } else {
      return { status: 'unsupported' };
    }
    if (!isTinyMaterial(material)) {
      return { status: 'invalid', error: "It isn't shaped like a material" };
    }
    return { status: 'ok', format, material };
  } catch (error) {
    return {
      status: 'invalid',
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Writes a material for the cloud, packed when it can be. The value is
 * decoded again before it's returned, and must give back exactly the same
 * JSON, so sync never sees a difference that isn't there.
 */
export function encodeCloudMaterial(material: TinyMaterial): string {
  // As JSON gives it back: no undefined, NaN or -0.
  const json = JSON.stringify(material);
  const canonical = JSON.parse(json);
  const same = (value: string) => {
    const decoded = decodeCloudMaterial(value);
    return decoded.status === 'ok' && JSON.stringify(decoded.material) === json;
  };

  const packed = packMaterial(canonical);
  if (packed) {
    const value = `A${toBase92(deflateRaw(packed, { dictionary: MATERIAL_DICTIONARY_1 }))}`;
    if (same(value)) {
      return value;
    }
  }
  const value = `B${toBase92(deflateRaw(encoder.encode(json), { dictionary: MATERIAL_DICTIONARY_1 }))}`;
  if (same(value)) {
    return value;
  }
  throw new Error("The material couldn't be written for the cloud");
}
