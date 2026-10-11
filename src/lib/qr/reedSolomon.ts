/**
 * Reed-Solomon error correction for QR codes.
 *
 * QR codes use GF(256) with the primitive polynomial x^8 + x^4 + x^3 + x^2 + 1
 * and generator roots starting at α^0. A block with n error correction
 * codewords can fix up to n / 2 wrong codewords.
 */

const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);
for (let i = 0, value = 1; i < 255; i += 1) {
  EXP[i] = value;
  LOG[value] = i;
  value <<= 1;
  if (value & 0x100) value ^= 0x11d;
}
// Doubled, so products never need a modulo.
for (let i = 255; i < 512; i += 1) EXP[i] = EXP[i - 255];

function multiply(a: number, b: number): number {
  return a === 0 || b === 0 ? 0 : EXP[LOG[a] + LOG[b]];
}

function divide(a: number, b: number): number {
  return a === 0 ? 0 : EXP[LOG[a] + 255 - LOG[b]];
}

/**
 * Evaluates a polynomial stored lowest power first.
 */
function evaluate(polynomial: number[], x: number): number {
  let result = 0;
  for (let i = polynomial.length - 1; i >= 0; i -= 1) {
    result = multiply(result, x) ^ polynomial[i];
  }
  return result;
}

const generators = new Map<number, Uint8Array>();

/**
 * The generator polynomial (x - α^0)(x - α^1)…(x - α^(count - 1)), highest
 * power first.
 */
function generator(count: number): Uint8Array {
  const cached = generators.get(count);
  if (cached) {
    return cached;
  }
  let polynomial = new Uint8Array([1]);
  for (let i = 0; i < count; i += 1) {
    const next = new Uint8Array(polynomial.length + 1);
    next.set(polynomial);
    for (let j = 0; j < polynomial.length; j += 1) {
      next[j + 1] ^= multiply(polynomial[j], EXP[i]);
    }
    polynomial = next;
  }
  generators.set(count, polynomial);
  return polynomial;
}

/**
 * Computes a block's error correction codewords: the remainder of the data,
 * with the first codeword the highest power, shifted up by ecCount and
 * divided by the generator.
 */
export function errorCorrectionCodewords(data: Uint8Array, ecCount: number): Uint8Array {
  const divisor = generator(ecCount);
  const remainder = new Uint8Array(ecCount);
  for (const value of data) {
    const factor = value ^ remainder[0];
    remainder.copyWithin(0, 1);
    remainder[ecCount - 1] = 0;
    if (factor) {
      for (let i = 0; i < ecCount; i += 1) remainder[i] ^= multiply(divisor[i + 1], factor);
    }
  }
  return remainder;
}

/**
 * The block's syndromes, all zero when there are no errors.
 */
function syndromes(block: Uint8Array, ecCount: number): number[] {
  const result = new Array<number>(ecCount);
  for (let i = 0; i < ecCount; i += 1) {
    // The first codeword is the highest power.
    let value = 0;
    for (let j = 0; j < block.length; j += 1) {
      value = multiply(value, EXP[i]) ^ block[j];
    }
    result[i] = value;
  }
  return result;
}

/**
 * Finds the error locator polynomial with Berlekamp-Massey.
 */
function errorLocator(syndrome: number[]): number[] {
  let locator = [1];
  let previous = [1];
  let errors = 0;
  let shift = 1;
  let previousDiscrepancy = 1;
  for (let n = 0; n < syndrome.length; n += 1) {
    let discrepancy = syndrome[n];
    for (let i = 1; i <= errors; i += 1) {
      discrepancy ^= multiply(locator[i] || 0, syndrome[n - i]);
    }
    if (discrepancy === 0) {
      shift += 1;
    } else {
      const scale = divide(discrepancy, previousDiscrepancy);
      const next = locator.slice();
      for (let i = 0; i < previous.length; i += 1) {
        next[i + shift] = (next[i + shift] || 0) ^ multiply(scale, previous[i]);
      }
      if (2 * errors <= n) {
        previous = locator;
        errors = n + 1 - errors;
        previousDiscrepancy = discrepancy;
        shift = 1;
      } else {
        shift += 1;
      }
      locator = next;
    }
  }
  return locator.slice(0, errors + 1);
}

/**
 * Corrects a block of data and error correction codewords in place.
 *
 * @returns False when the block has more errors than can be corrected.
 */
export function correctErrors(block: Uint8Array, ecCount: number): boolean {
  const syndrome = syndromes(block, ecCount);
  if (syndrome.every((value) => value === 0)) {
    return true;
  }

  const locator = errorLocator(syndrome);
  const errorCount = locator.length - 1;
  if (errorCount * 2 > ecCount) {
    return false;
  }

  // The roots of the locator are the inverses of the error positions, where a
  // position is the power of its codeword.
  const positions: number[] = [];
  for (let power = 0; power < block.length; power += 1) {
    if (evaluate(locator, EXP[(255 - power) % 255]) === 0) {
      positions.push(power);
    }
  }
  if (positions.length !== errorCount) {
    return false;
  }

  // Forney's algorithm for the error values, using the error evaluator
  // syndrome * locator mod x^ecCount and the locator's formal derivative.
  const evaluator = new Array<number>(ecCount).fill(0);
  for (let i = 0; i < ecCount; i += 1) {
    for (let j = 0; j <= i && j < locator.length; j += 1) {
      evaluator[i] ^= multiply(syndrome[i - j], locator[j]);
    }
  }
  const derivative = locator.slice(1).map((value, index) => (index % 2 === 0 ? value : 0));
  for (const power of positions) {
    const inverse = EXP[(255 - power) % 255];
    const slope = evaluate(derivative, inverse);
    if (slope === 0) {
      return false;
    }
    block[block.length - 1 - power] ^= multiply(EXP[power], divide(evaluate(evaluator, inverse), slope));
  }

  // Too many errors can look like a few different ones, so check the result.
  return syndromes(block, ecCount).every((value) => value === 0);
}
