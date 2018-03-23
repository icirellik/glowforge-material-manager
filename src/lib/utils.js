import pako from 'pako';
import {
  toFullMaterial,
  toTinyMaterial,
} from './material';

export function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

export function compress(json) {
  return pako.deflate(JSON.stringify(json), { to: 'string' });
}

export function decompress(binaryJson) {
  return JSON.parse(pako.inflate(binaryJson, { to: 'string' }));
}

export async function sha1(message) {
  const msgBuffer = new TextEncoder('utf-8').encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
}

export async function hashTitle(rawMaterial) {
  return await sha1(`${rawMaterial.thickName} ${rawMaterial.name}`);
}

export async function hashRawMaterial(rawMaterial) {
  return await sha1(JSON.stringify(toFullMaterial(toTinyMaterial(rawMaterial))));
}
