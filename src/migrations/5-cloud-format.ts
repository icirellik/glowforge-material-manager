import {
  getSynchronizedMaterials,
  getSynchronizedValues,
  storeSynchronizedValues,
} from '../lib/chromeWrappers';
import type { SynchronizedMaterials } from '../lib/chromeWrappers';
import { syncItemCost } from '../lib/syncQuota';
import {
  decodeCloudMaterial,
  encodeCloudMaterial,
  isLegacyValue,
} from '../material/materialCloudFormat';

/**
 * Rewrites the cloud's materials from 0.4.10 and earlier in the smaller
 * format, about a quarter of the size.
 *
 * Each value is rewritten from what's in the cloud, not from this computer's
 * copy, so materials this computer doesn't have, or doesn't sync, stay as
 * they are. Values it can't read, and values from newer versions, are left
 * alone. Everything is written at once, so it's one of Chrome's write
 * operations, and every value shrinks, so it can't go over a quota.
 *
 * An edit made on another computer that hasn't reached this one yet can be
 * overwritten with the material as it was, if Chrome sync keeps the newer
 * write. Values that change while this runs are left alone.
 */
export async function migration5(): Promise<boolean> {
  const snapshot = await getSynchronizedMaterials();

  const updates: SynchronizedMaterials = {};
  for (const [key, value] of Object.entries(snapshot)) {
    if (typeof value !== 'string' || !isLegacyValue(value)) {
      continue;
    }
    const legacy = decodeCloudMaterial(value);
    if (legacy.status !== 'ok') {
      continue;
    }
    let rewritten: string;
    try {
      // Checks it reads back exactly, or throws.
      rewritten = encodeCloudMaterial(legacy.material);
    } catch (error) {
      console.error(`Couldn't rewrite cloud material ${key}`, error);
      continue;
    }
    if (syncItemCost(key, rewritten) < syncItemCost(key, value)) {
      updates[key] = rewritten;
    }
  }

  // Leave values that another computer changed since the snapshot.
  const keys = Object.keys(updates);
  if (keys.length > 0) {
    const current = await getSynchronizedValues(keys);
    for (const key of keys) {
      if (current[key] !== snapshot[key]) {
        delete updates[key];
      }
    }
  }

  const count = Object.keys(updates).length;
  if (count === 0) {
    return false;
  }
  await storeSynchronizedValues(updates);
  console.log(`migration '#5' applied to ${count} cloud materials`);
  return true;
}
