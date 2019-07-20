import * as pako from 'pako';
import {
  toFullMaterial,
  toTinyMaterial,
} from '../material/material';
import { PluginMaterial } from '../material/materialPlugin';
import { sha1 } from './crypto';

/**
 * A helper function that rounds to the nearest 5.
 *
 * @param number
 */
export function roundToNearest5(number: number) {
  return 5 * Math.round(number / 5)
}

/**
 * A helper function to assist with rounding to a specific precision.
 * @param number
 * @param precision
 */
export function precisionRound(number: number, precision: number) {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

export function asInteger(number: string) {
  // if (number === null) {
  //   return null;
  // }
  return Number.parseInt(number, 10);
}

export function asFloat(number: string) {
  // if (number === null) {
  //   return null;
  // }
  return Number.parseFloat(number);
}

export function asFloatWithPrecision(number: string, precision: number) {
  if (number === null) {
    return null;
  }
  return Number.parseFloat(number).toPrecision(precision);
}

/**
 * Compresses JSON data.
 *
 * @param json The object to compress.
 */
export function compress(json: object | Array<unknown>) {
  return pako.deflate(JSON.stringify(json), { to: 'string' });
}

/**
 * Decompresses a compressed JSON buffer.
 *
 * @param binaryJson A compressed JSON buffer.
 */
export function decompress(binaryJson: any) {
  return JSON.parse(pako.inflate(binaryJson, { to: 'string' }));
}

/**
 * Hashes a materials title: `${material.thickName} ${material.name}`
 *
 * @param material The material to hash.
 * @returns The material title hash.
 */
export async function hashTitle(material: PluginMaterial) {
  return await sha1(`${material.thickName} ${material.name}`);
}

/**
 * Hashes the full contents of a material.
 *
 * The material is converted between tiny and full to remove and additional
 * properties that may have been added.
 *
 * @param material The material to hash.
 */
export async function hashMaterial(material: PluginMaterial) {
  return await sha1(JSON.stringify(toFullMaterial(toTinyMaterial(material))));
}
