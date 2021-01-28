import * as pako from 'pako';
import {
  toFullMaterial,
  toTinyMaterial,
} from '../material/materialConversion';
import type { PluginMaterial } from '../material/materialPlugin';
import { sha1 } from './crypto';

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
  return sha1(`${material.thickName} ${material.name}`);
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
  return sha1(JSON.stringify(toFullMaterial(toTinyMaterial(material))));
}

/**
 * Checks to see if two objects are equivalant.
 */
export function isEquivalentObject(obj1: { [key: string]: unknown }, obj2: { [key: string]: unknown }): boolean {
  // Create arrays of property names
  const obj1Props = Object.getOwnPropertyNames(obj1);
  const obj2Props = Object.getOwnPropertyNames(obj2);

  // If number of properties is different,
  // objects are not equivalent
  if (obj1Props.length !== obj2Props.length) {
    return false;
  }

  for (let i = 0; i < obj1Props.length; i += 1) {
    const propName = obj1Props[i];

    // If values of same property are not equal,
    // objects are not equivalent
    if (obj1[propName] !== obj2[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}
