/**
 * Chrome's limits on cloud storage, `chrome.storage.sync`, and how it counts
 * bytes against them.
 */

export const SYNC_QUOTA_BYTES = 102400;
export const SYNC_QUOTA_BYTES_PER_ITEM = 8192;
export const SYNC_MAX_ITEMS = 512;

function isLowSurrogate(value: string, at: number): boolean {
  const code = value.charCodeAt(at);
  return code >= 0xdc00 && code < 0xe000;
}

/**
 * The bytes an item counts for: its key plus its value written as JSON, in
 * UTF-8. Chrome's JSON writer escapes control characters, `"`, `\`, `<`,
 * U+2028 and U+2029, and writes everything else as it is.
 */
export function syncItemCost(key: string, value: string): number {
  let bytes = new TextEncoder().encode(key).length + 2;
  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i);
    if (code === 0x22 || code === 0x5c) {
      bytes += 2;
    } else if (
      code === 8 ||
      code === 9 ||
      code === 10 ||
      code === 12 ||
      code === 13
    ) {
      bytes += 2;
    } else if (
      code < 0x20 ||
      code === 0x3c ||
      code === 0x2028 ||
      code === 0x2029
    ) {
      bytes += 6;
    } else if (code < 0x80) {
      bytes += 1;
    } else if (code < 0x800) {
      bytes += 2;
    } else if (
      code >= 0xd800 &&
      code < 0xdc00 &&
      isLowSurrogate(value, i + 1)
    ) {
      // A surrogate pair is one 4 byte character.
      bytes += 4;
      i += 1;
    } else {
      // Including a lone surrogate, which Chrome writes as U+FFFD.
      bytes += 3;
    }
  }
  return bytes;
}
