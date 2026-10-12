// @vitest-environment node
import * as pako from 'pako';
import * as zlib from 'zlib';
import { test } from 'vitest';
import {
  decodeCloudMaterial,
  encodeCloudMaterial,
} from './materialCloudFormat';
import { MATERIAL_DICTIONARY_1 } from './materialDictionary';
import { packMaterial } from './materialPack';
import { deflateRaw } from '../lib/compression';
import {
  SYNC_MAX_ITEMS,
  SYNC_QUOTA_BYTES,
  syncItemCost,
} from '../lib/syncQuota';
import {
  editorMaterials,
  proofgradeMaterials,
  unseenMaterials,
} from './testing/corpus';
import type { TinyMaterial } from './materialTiny';

/**
 * How much cloud storage materials take, before and after, and how fast
 * they're written and read. Run with `npm run bench`.
 *
 * Vitest's module runner makes every use of an imported constant a getter
 * call, so the timings here read 2 to 3 times slow for our code, not pako's.
 * Built into the extension, reading takes about as long as pako and writing
 * about twice as long, around 0.1 ms per material.
 */

// Keys are the SHA-1 of the title in hex.
const KEY = 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3';

const CORPORA: { [name: string]: TinyMaterial[] } = {
  editor: editorMaterials(),
  'unseen names': unseenMaterials(),
  proofgrade: proofgradeMaterials(),
};

const legacy = (material: TinyMaterial): string =>
  pako.deflate(JSON.stringify(material), { to: 'string' });

function sizes(encode: (material: TinyMaterial) => string) {
  const rows: { [corpus: string]: string } = {};
  for (const [name, materials] of Object.entries(CORPORA)) {
    const costs = materials
      .map((material) => syncItemCost(KEY, encode(material)))
      .sort((a, b) => a - b);
    const mean = costs.reduce((sum, cost) => sum + cost, 0) / costs.length;
    const p95 = costs[Math.floor(costs.length * 0.95)];
    const byBytes = Math.floor(SYNC_QUOTA_BYTES / mean);
    rows[name] =
      `mean ${mean.toFixed(1)}, p95 ${p95}, max ${costs[costs.length - 1]}, ` +
      `fit ${Math.min(byBytes, SYNC_MAX_ITEMS)} (${byBytes} by bytes)`;
  }
  return rows;
}

// The bytes each item counts for in chrome.storage.sync, key included.
console.log('\nCloud storage per material, bytes including the 40 byte key');
console.table({
  'legacy (pako, binary string)': sizes(legacy),
  'new (packed, DEFLATE + dictionary, base-92)': sizes(encodeCloudMaterial),
});

// Our DEFLATE against zlib's best, on the same packed bytes.
const compressed: { [corpus: string]: string } = {};
for (const [name, materials] of Object.entries(CORPORA)) {
  let ours = 0;
  let theirs = 0;
  for (const material of materials) {
    const packed = packMaterial(material)!;
    ours += deflateRaw(packed, { dictionary: MATERIAL_DICTIONARY_1 }).length;
    theirs += zlib.deflateRawSync(packed, {
      level: 9,
      dictionary: MATERIAL_DICTIONARY_1,
    }).length;
  }
  compressed[name] = `ours ${ours}, zlib -9 ${theirs}`;
}
console.log('Compressed bytes, all materials');
console.table(compressed);

const materials = CORPORA.editor;
const legacyValues = materials.map(legacy);
const newValues = materials.map(encodeCloudMaterial);

test('writing 300 materials', async ({ bench }) => {
  await bench.compare(
    bench('legacy, pako', () => {
      for (const material of materials) legacy(material);
    }),
    bench('new', () => {
      for (const material of materials) encodeCloudMaterial(material);
    }),
  );
});

test('reading 300 materials', async ({ bench }) => {
  await bench.compare(
    bench('legacy, pako', () => {
      for (const value of legacyValues) {
        JSON.parse(pako.inflate(value, { to: 'string' }));
      }
    }),
    bench('legacy, ours', () => {
      for (const value of legacyValues) decodeCloudMaterial(value);
    }),
    bench('new', () => {
      for (const value of newValues) decodeCloudMaterial(value);
    }),
  );
});
