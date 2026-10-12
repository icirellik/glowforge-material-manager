/**
 * Base-92: bytes as text made of the 92 printable ASCII characters other than
 * `"`, `<` and `\`.
 *
 * Those three are the printable characters that JSON writers escape (Chrome
 * writes `<` as `<`), so in JSON every character of base-92 text is one
 * byte. That makes it the densest text for storage that's measured as JSON,
 * like `chrome.storage.sync`: 6.52 bits per byte, against 6 for base64.
 *
 * The bytes, after a 0x01 byte that keeps leading zeros, are read as one big
 * number and written in base 92, most significant digit first. Every byte
 * string has exactly one encoding.
 */

export const BASE92_ALPHABET = (() => {
  let alphabet = '';
  for (let code = 0x20; code <= 0x7e; code += 1) {
    const character = String.fromCharCode(code);
    if (character !== '"' && character !== '<' && character !== '\\') {
      alphabet += character;
    }
  }
  return alphabet;
})();

const DIGIT = new Int8Array(128).fill(-1);
for (let i = 0; i < BASE92_ALPHABET.length; i += 1) {
  DIGIT[BASE92_ALPHABET.charCodeAt(i)] = i;
}

// The big number is kept in limbs of 4 digits or 3 bytes, small enough that
// a limb times the base plus a carry stays exact in a double.
const DIGITS_PER_LIMB = 4;
const DIGIT_LIMB = 92 * 92 * 92 * 92;
const BYTES_PER_LIMB = 3;
const BYTE_LIMB = 256 * 256 * 256;

/**
 * Writes bytes as base-92 text.
 */
export function toBase92(bytes: Uint8Array): string {
  // Least significant limb first.
  const limbs = [1];
  for (let i = 0; i < bytes.length; i += 1) {
    let carry = bytes[i];
    for (let j = 0; j < limbs.length; j += 1) {
      carry += limbs[j] * 256;
      limbs[j] = carry % DIGIT_LIMB;
      carry = Math.floor(carry / DIGIT_LIMB);
    }
    while (carry > 0) {
      limbs.push(carry % DIGIT_LIMB);
      carry = Math.floor(carry / DIGIT_LIMB);
    }
  }

  const characters: string[] = [];
  for (let j = limbs.length - 1; j >= 0; j -= 1) {
    let limb = limbs[j];
    const digits: string[] = [];
    for (let k = 0; k < DIGITS_PER_LIMB; k += 1) {
      digits.push(BASE92_ALPHABET[limb % 92]);
      limb = Math.floor(limb / 92);
    }
    // The most significant limb has no leading zeros.
    let top = DIGITS_PER_LIMB;
    if (j === limbs.length - 1) {
      while (top > 1 && digits[top - 1] === BASE92_ALPHABET[0]) top -= 1;
    }
    for (let k = top - 1; k >= 0; k -= 1) characters.push(digits[k]);
  }
  return characters.join('');
}

/**
 * Reads base-92 text written by `toBase92`. Throws a RangeError for text it
 * couldn't have written.
 */
export function fromBase92(text: string): Uint8Array {
  if (text.length === 0) {
    throw new RangeError('Base-92 text is never empty');
  }
  const digits = new Uint8Array(text.length);
  for (let i = 0; i < text.length; i += 1) {
    const code = text.charCodeAt(i);
    const digit = code < 128 ? DIGIT[code] : -1;
    if (digit < 0) {
      throw new RangeError(`"${text[i]}" isn't a base-92 character`);
    }
    digits[i] = digit;
  }
  if (digits[0] === 0) {
    throw new RangeError('Base-92 text never starts with a zero');
  }

  // Least significant limb first. The first group of digits takes up the
  // remainder, so the rest are whole limbs.
  const limbs: number[] = [];
  let group = text.length % DIGITS_PER_LIMB || DIGITS_PER_LIMB;
  for (let i = 0; i < digits.length; i += group, group = DIGITS_PER_LIMB) {
    let carry = 0;
    let multiplier = 1;
    for (let k = i; k < i + group; k += 1) {
      carry = carry * 92 + digits[k];
      multiplier *= 92;
    }
    for (let j = 0; j < limbs.length; j += 1) {
      carry += limbs[j] * multiplier;
      limbs[j] = carry % BYTE_LIMB;
      carry = Math.floor(carry / BYTE_LIMB);
    }
    while (carry > 0) {
      limbs.push(carry % BYTE_LIMB);
      carry = Math.floor(carry / BYTE_LIMB);
    }
  }

  const bytes = new Uint8Array(limbs.length * BYTES_PER_LIMB);
  for (let j = 0; j < limbs.length; j += 1) {
    let limb = limbs[j];
    for (let k = 0; k < BYTES_PER_LIMB; k += 1) {
      bytes[bytes.length - 1 - j * BYTES_PER_LIMB - k] = limb % 256;
      limb = Math.floor(limb / 256);
    }
  }
  let start = 0;
  while (start < bytes.length && bytes[start] === 0) start += 1;
  if (bytes[start] !== 1) {
    throw new RangeError("Base-92 text doesn't start with its marker");
  }
  return bytes.slice(start + 1);
}
