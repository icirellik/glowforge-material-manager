import * as pako from 'pako';
import {
  toFullMaterial,
  toTinyMaterial,
} from './material';
import { RawMaterial } from './chromeWrappers';

/**
 * A helper function that rounds to the nearest 5.
 * @param {*} number
 */
export function roundToNearest5(number: number) {
  return 5 * Math.round(number / 5)
}

/**
 * A helper function to assist with rounding to a specific precision.
 * @param {*} number
 * @param {*} precision
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

export function compress(json: any) {
  return pako.deflate(JSON.stringify(json), { to: 'string' });
}

export function decompress(binaryJson: any) {
  return JSON.parse(pako.inflate(binaryJson, { to: 'string' }));
}

export async function sha1(message: string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
}

export async function hashTitle(rawMaterial: RawMaterial) {
  return await sha1(`${rawMaterial.thickName} ${rawMaterial.name}`);
}

export async function hashRawMaterial(rawMaterial: RawMaterial) {
  return await sha1(JSON.stringify(toFullMaterial(toTinyMaterial(rawMaterial))));
}
