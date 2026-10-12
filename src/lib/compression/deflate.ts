import {
  CODE_LENGTH_ORDER,
  DISTANCE_BASE,
  DISTANCE_CODES,
  DISTANCE_EXTRA,
  END_OF_BLOCK,
  LENGTH_BASE,
  LENGTH_EXTRA,
  MAX_BITS,
  MAX_DISTANCE,
  MAX_MATCH,
  MIN_MATCH,
  fixedDistanceLengths,
  fixedLiteralLengths,
} from './tables';

/**
 * Compresses data as a raw DEFLATE stream, RFC 1951.
 *
 * Matches are found like zlib at level 9: hash chains of three byte strings
 * and lazy matching, which checks whether the next byte starts a longer
 * match before taking one. Each block is written in whichever of the fixed,
 * dynamic and stored forms is smallest. The output is the same for the same
 * input, every time.
 */

export interface DeflateOptions {
  // A preset dictionary, bytes the data is likely to repeat. The same bytes
  // must be given to inflate. Only the last 32 KB are used.
  dictionary?: Uint8Array;
}

// zlib's settings for level 9.
const MAX_CHAIN = 4096;
const GOOD_LENGTH = 32;
const NICE_LENGTH = MAX_MATCH;
const MAX_LAZY = MAX_MATCH;
// Three byte matches further back than this cost more than three literals.
const TOO_FAR = 4096;

const HASH_BITS = 15;
const HASH_SIZE = 1 << HASH_BITS;
const HASH_MASK = HASH_SIZE - 1;

// Symbols per block, as zlib's default.
const BLOCK_SYMBOLS = 16383;
const MAX_STORED = 65535;
// The longest code length code.
const MAX_CODE_LENGTH_BITS = 7;

const LENGTH_CODE = new Uint8Array(MAX_MATCH + 1);
for (let code = 0; code < LENGTH_BASE.length; code += 1) {
  const end = code + 1 < LENGTH_BASE.length ? LENGTH_BASE[code + 1] : 259;
  for (let length = LENGTH_BASE[code]; length < end; length += 1) {
    LENGTH_CODE[length] = code;
  }
}
// 258 has its own code, rather than being the last of code 284's range.
LENGTH_CODE[MAX_MATCH] = LENGTH_BASE.length - 1;

function distanceCode(distance: number): number {
  let low = 0;
  let high = DISTANCE_CODES - 1;
  while (low < high) {
    const middle = (low + high + 1) >> 1;
    if (DISTANCE_BASE[middle] <= distance) {
      low = middle;
    } else {
      high = middle - 1;
    }
  }
  return low;
}

/**
 * Writes bits least significant first, as DEFLATE packs them.
 */
class BitWriter {
  private output = new Uint8Array(256);
  private length = 0;
  private buffer = 0;
  private count = 0;

  private push(byte: number) {
    if (this.length === this.output.length) {
      const grown = new Uint8Array(this.output.length * 2);
      grown.set(this.output);
      this.output = grown;
    }
    this.output[this.length] = byte;
    this.length += 1;
  }

  bits(value: number, count: number) {
    this.buffer |= value << this.count;
    this.count += count;
    while (this.count >= 8) {
      this.push(this.buffer & 0xff);
      this.buffer >>>= 8;
      this.count -= 8;
    }
  }

  /**
   * Pads to a byte with zeros.
   */
  align() {
    if (this.count > 0) {
      this.push(this.buffer & 0xff);
    }
    this.buffer = 0;
    this.count = 0;
  }

  bytes(data: Uint8Array) {
    for (const byte of data) this.push(byte);
  }

  result(): Uint8Array {
    this.align();
    return this.output.slice(0, this.length);
  }
}

/**
 * The code lengths of a Huffman code for the frequencies, at most maxBits
 * long, by package-merge. Ties go to the lower symbol, so it's deterministic.
 */
export function codeLengths(
  frequencies: ArrayLike<number>,
  maxBits: number,
): Uint8Array {
  const lengths = new Uint8Array(frequencies.length);
  const leaves: { weight: number; symbols: number[] }[] = [];
  for (let symbol = 0; symbol < frequencies.length; symbol += 1) {
    if (frequencies[symbol] > 0) {
      leaves.push({ weight: frequencies[symbol], symbols: [symbol] });
    }
  }
  if (leaves.length === 0) {
    return lengths;
  }
  if (leaves.length === 1) {
    lengths[leaves[0].symbols[0]] = 1;
    return lengths;
  }
  if (leaves.length > 1 << maxBits) {
    throw new RangeError('Too many symbols for the code length limit');
  }
  // Stable, so equal weights stay in symbol order.
  leaves.sort((a, b) => a.weight - b.weight);

  let list = leaves;
  for (let bits = 1; bits < maxBits; bits += 1) {
    const packages: { weight: number; symbols: number[] }[] = [];
    for (let i = 0; i + 1 < list.length; i += 2) {
      packages.push({
        weight: list[i].weight + list[i + 1].weight,
        symbols: list[i].symbols.concat(list[i + 1].symbols),
      });
    }
    // Merge, leaves first on equal weights.
    const merged: { weight: number; symbols: number[] }[] = [];
    let a = 0;
    let b = 0;
    while (a < leaves.length || b < packages.length) {
      if (
        b >= packages.length ||
        (a < leaves.length && leaves[a].weight <= packages[b].weight)
      ) {
        merged.push(leaves[a]);
        a += 1;
      } else {
        merged.push(packages[b]);
        b += 1;
      }
    }
    list = merged;
  }

  for (let i = 0; i < 2 * leaves.length - 2; i += 1) {
    for (const symbol of list[i].symbols) lengths[symbol] += 1;
  }
  return lengths;
}

/**
 * The canonical codes for code lengths, RFC 1951 section 3.2.2, with their
 * bits reversed so they can be written least significant bit first.
 */
function canonicalCodes(lengths: Uint8Array): Uint16Array {
  const count = new Uint16Array(MAX_BITS + 1);
  for (const length of lengths) count[length] += 1;
  count[0] = 0;
  const next = new Uint16Array(MAX_BITS + 1);
  for (let bits = 1, code = 0; bits <= MAX_BITS; bits += 1) {
    code = (code + count[bits - 1]) << 1;
    next[bits] = code;
  }
  const codes = new Uint16Array(lengths.length);
  for (let symbol = 0; symbol < lengths.length; symbol += 1) {
    const length = lengths[symbol];
    if (length === 0) continue;
    let code = next[length];
    next[length] += 1;
    let reversed = 0;
    for (let i = 0; i < length; i += 1) {
      reversed = (reversed << 1) | (code & 1);
      code >>= 1;
    }
    codes[symbol] = reversed;
  }
  return codes;
}

interface Block {
  // Per symbol: the match length, or 0 for a literal.
  lengths: Uint16Array;
  // Per symbol: the distance, or the literal.
  values: Uint16Array;
  size: number;
  // The data the block covers.
  start: number;
  end: number;
}

/**
 * Splits the data into literals and matches, in blocks.
 */
function findMatches(window: Uint8Array, start: number): Block[] {
  const end = window.length;
  const head = new Int32Array(HASH_SIZE).fill(-1);
  const previous = new Int32Array(end);
  const hash = (at: number) =>
    ((window[at] << 10) ^ (window[at + 1] << 5) ^ window[at + 2]) & HASH_MASK;
  // Adds a position to its chain and returns the previous head.
  const insert = (at: number) => {
    if (at + MIN_MATCH > end) return -1;
    const key = hash(at);
    const before = head[key];
    previous[at] = before;
    head[key] = at;
    return before;
  };

  // The dictionary's strings can be matched from the start.
  for (let at = 0; at < start; at += 1) insert(at);

  let matchStart = 0;
  const longestMatch = (
    at: number,
    candidate: number,
    previousLength: number,
  ) => {
    let chain = previousLength >= GOOD_LENGTH ? MAX_CHAIN >> 2 : MAX_CHAIN;
    const limit = at - MAX_DISTANCE;
    const longest = Math.min(MAX_MATCH, end - at);
    let best = previousLength;
    while (candidate >= 0 && candidate >= limit && chain > 0) {
      if (window[candidate + best] === window[at + best]) {
        let length = 0;
        while (
          length < longest &&
          window[candidate + length] === window[at + length]
        ) {
          length += 1;
        }
        if (length > best) {
          best = length;
          matchStart = candidate;
          if (length >= NICE_LENGTH || length === longest) break;
        }
      }
      candidate = previous[candidate];
      chain -= 1;
    }
    return best;
  };

  const blocks: Block[] = [];
  let block: Block = newBlock(start);
  const literal = (at: number) => {
    block.lengths[block.size] = 0;
    block.values[block.size] = window[at];
    block.size += 1;
  };
  const match = (length: number, distance: number) => {
    block.lengths[block.size] = length;
    block.values[block.size] = distance;
    block.size += 1;
  };
  const endBlockAt = (at: number) => {
    if (block.size >= BLOCK_SYMBOLS) {
      block.end = at;
      blocks.push(block);
      block = newBlock(at);
    }
  };

  // zlib's deflate_slow.
  let at = start;
  let matchLength = MIN_MATCH - 1;
  let matchAvailable = false;
  while (at < end) {
    const candidate = insert(at);
    const previousLength = matchLength;
    const previousMatch = matchStart;
    matchLength = MIN_MATCH - 1;
    if (
      candidate >= 0 &&
      previousLength < MAX_LAZY &&
      at - candidate <= MAX_DISTANCE
    ) {
      // Only a match longer than the previous one is worth finding.
      matchLength = longestMatch(at, candidate, previousLength);
      if (matchLength < MIN_MATCH) {
        matchLength = MIN_MATCH - 1;
      } else if (matchLength === MIN_MATCH && at - matchStart > TOO_FAR) {
        matchLength = MIN_MATCH - 1;
      }
    }

    if (previousLength >= MIN_MATCH && matchLength <= previousLength) {
      // The match at the previous byte is at least as long, take it.
      const matchEnd = at - 1 + previousLength;
      match(previousLength, at - 1 - previousMatch);
      for (at += 1; at < matchEnd; at += 1) insert(at);
      matchAvailable = false;
      matchLength = MIN_MATCH - 1;
      endBlockAt(at);
    } else if (matchAvailable) {
      literal(at - 1);
      at += 1;
      endBlockAt(at - 1);
    } else {
      matchAvailable = true;
      at += 1;
    }
  }
  if (matchAvailable) {
    literal(at - 1);
  }
  block.end = end;
  blocks.push(block);
  return blocks;
}

function newBlock(start: number): Block {
  return {
    lengths: new Uint16Array(BLOCK_SYMBOLS + 1),
    values: new Uint16Array(BLOCK_SYMBOLS + 1),
    size: 0,
    start,
    end: start,
  };
}

interface Codes {
  literalLengths: Uint8Array;
  distanceLengths: Uint8Array;
}

const FIXED: Codes = {
  literalLengths: fixedLiteralLengths(),
  distanceLengths: fixedDistanceLengths(),
};

/**
 * The bits a block's symbols take with the codes, not counting the header.
 */
function symbolBits(block: Block, codes: Codes): number {
  let bits = codes.literalLengths[END_OF_BLOCK];
  for (let i = 0; i < block.size; i += 1) {
    const length = block.lengths[i];
    if (length === 0) {
      bits += codes.literalLengths[block.values[i]];
    } else {
      const code = LENGTH_CODE[length];
      const distance = distanceCode(block.values[i]);
      bits += codes.literalLengths[257 + code] + LENGTH_EXTRA[code];
      bits += codes.distanceLengths[distance] + DISTANCE_EXTRA[distance];
    }
  }
  return bits;
}

/**
 * A dynamic block's codes and its header, the code lengths written with the
 * code length code.
 */
interface DynamicHeader extends Codes {
  literalCount: number;
  distanceCount: number;
  // Code length symbols, with the repeat count in the next entry for 16–18.
  run: number[];
  codeLengthLengths: Uint8Array;
  codeLengthCount: number;
  bits: number;
}

function dynamicHeader(block: Block): DynamicHeader {
  const literalFrequencies = new Uint32Array(286);
  const distanceFrequencies = new Uint32Array(DISTANCE_CODES);
  literalFrequencies[END_OF_BLOCK] = 1;
  for (let i = 0; i < block.size; i += 1) {
    const length = block.lengths[i];
    if (length === 0) {
      literalFrequencies[block.values[i]] += 1;
    } else {
      literalFrequencies[257 + LENGTH_CODE[length]] += 1;
      distanceFrequencies[distanceCode(block.values[i])] += 1;
    }
  }
  // Like zlib, give each code at least two symbols, so no code is a single
  // one bit code, which some decoders reject.
  for (const frequencies of [literalFrequencies, distanceFrequencies]) {
    for (let symbol = 0, used = countUsed(frequencies); used < 2; symbol += 1) {
      if (frequencies[symbol] === 0) {
        frequencies[symbol] = 1;
        used += 1;
      }
    }
  }

  const literalLengths = codeLengths(literalFrequencies, MAX_BITS);
  const distanceLengths = codeLengths(distanceFrequencies, MAX_BITS);
  let literalCount = 286;
  while (literalCount > 257 && literalLengths[literalCount - 1] === 0) {
    literalCount -= 1;
  }
  let distanceCount = DISTANCE_CODES;
  while (distanceCount > 1 && distanceLengths[distanceCount - 1] === 0) {
    distanceCount -= 1;
  }

  // Run length encode the code lengths, as zlib's scan_tree.
  const all = new Uint8Array(literalCount + distanceCount);
  all.set(literalLengths.subarray(0, literalCount));
  all.set(distanceLengths.subarray(0, distanceCount), literalCount);
  const run: number[] = [];
  for (let i = 0; i < all.length;) {
    const length = all[i];
    let repeat = 1;
    while (i + repeat < all.length && all[i + repeat] === length) repeat += 1;
    i += repeat;
    if (length === 0) {
      while (repeat >= 11) {
        const count = Math.min(repeat, 138);
        run.push(18, count);
        repeat -= count;
      }
      if (repeat >= 3) {
        run.push(17, repeat);
        repeat = 0;
      }
    } else {
      run.push(length);
      repeat -= 1;
      while (repeat >= 3) {
        const count = Math.min(repeat, 6);
        run.push(16, count);
        repeat -= count;
      }
    }
    for (; repeat > 0; repeat -= 1) run.push(length);
  }

  const codeLengthFrequencies = new Uint32Array(19);
  for (let i = 0; i < run.length; i += 1) {
    codeLengthFrequencies[run[i]] += 1;
    if (run[i] >= 16) i += 1;
  }
  const codeLengthLengths = codeLengths(
    codeLengthFrequencies,
    MAX_CODE_LENGTH_BITS,
  );
  let codeLengthCount = 19;
  while (
    codeLengthCount > 4 &&
    codeLengthLengths[CODE_LENGTH_ORDER[codeLengthCount - 1]] === 0
  ) {
    codeLengthCount -= 1;
  }

  let bits = 5 + 5 + 4 + 3 * codeLengthCount;
  for (let i = 0; i < run.length; i += 1) {
    const symbol = run[i];
    bits += codeLengthLengths[symbol];
    if (symbol >= 16) {
      bits += symbol === 16 ? 2 : symbol === 17 ? 3 : 7;
      i += 1;
    }
  }
  return {
    literalLengths,
    distanceLengths,
    literalCount,
    distanceCount,
    run,
    codeLengthLengths,
    codeLengthCount,
    bits,
  };
}

function countUsed(frequencies: Uint32Array): number {
  let used = 0;
  for (const frequency of frequencies) if (frequency > 0) used += 1;
  return used;
}

function writeSymbols(writer: BitWriter, block: Block, codes: Codes) {
  const literalCodes = canonicalCodes(codes.literalLengths);
  const distanceCodes = canonicalCodes(codes.distanceLengths);
  const { literalLengths, distanceLengths } = codes;
  for (let i = 0; i < block.size; i += 1) {
    const length = block.lengths[i];
    const value = block.values[i];
    if (length === 0) {
      writer.bits(literalCodes[value], literalLengths[value]);
      continue;
    }
    const code = LENGTH_CODE[length];
    writer.bits(literalCodes[257 + code], literalLengths[257 + code]);
    writer.bits(length - LENGTH_BASE[code], LENGTH_EXTRA[code]);
    const distance = distanceCode(value);
    writer.bits(distanceCodes[distance], distanceLengths[distance]);
    writer.bits(value - DISTANCE_BASE[distance], DISTANCE_EXTRA[distance]);
  }
  writer.bits(literalCodes[END_OF_BLOCK], literalLengths[END_OF_BLOCK]);
}

function writeDynamic(writer: BitWriter, block: Block, header: DynamicHeader) {
  writer.bits(header.literalCount - 257, 5);
  writer.bits(header.distanceCount - 1, 5);
  writer.bits(header.codeLengthCount - 4, 4);
  for (let i = 0; i < header.codeLengthCount; i += 1) {
    writer.bits(header.codeLengthLengths[CODE_LENGTH_ORDER[i]], 3);
  }
  const codes = canonicalCodes(header.codeLengthLengths);
  const { run } = header;
  for (let i = 0; i < run.length; i += 1) {
    const symbol = run[i];
    writer.bits(codes[symbol], header.codeLengthLengths[symbol]);
    if (symbol === 16) {
      writer.bits(run[i + 1] - 3, 2);
    } else if (symbol === 17) {
      writer.bits(run[i + 1] - 3, 3);
    } else if (symbol === 18) {
      writer.bits(run[i + 1] - 11, 7);
    }
    if (symbol >= 16) i += 1;
  }
  writeSymbols(writer, block, header);
}

/**
 * Compresses data as a raw DEFLATE stream.
 */
export function deflateRaw(
  data: Uint8Array,
  options: DeflateOptions = {},
): Uint8Array {
  const dictionary = options.dictionary ?? new Uint8Array(0);
  const preset = dictionary.subarray(
    Math.max(0, dictionary.length - MAX_DISTANCE),
  );
  const window = new Uint8Array(preset.length + data.length);
  window.set(preset);
  window.set(data, preset.length);

  const writer = new BitWriter();
  const blocks = findMatches(window, preset.length);
  for (let b = 0; b < blocks.length; b += 1) {
    const block = blocks[b];
    const last = b === blocks.length - 1 ? 1 : 0;
    const header = dynamicHeader(block);
    const fixedBits = symbolBits(block, FIXED);
    const dynamicBits = header.bits + symbolBits(block, header);
    const storedLength = block.end - block.start;
    // Each stored block is padded to a byte and has a 4 byte length.
    const storedBits =
      (storedLength + 4 * Math.max(1, Math.ceil(storedLength / MAX_STORED))) *
        8 +
      7;

    if (storedBits < Math.min(fixedBits, dynamicBits)) {
      let at = block.start;
      do {
        const length = Math.min(MAX_STORED, block.end - at);
        const final = last && at + length === block.end ? 1 : 0;
        writer.bits(final, 1);
        writer.bits(0, 2);
        writer.align();
        writer.bits(length & 0xff, 8);
        writer.bits(length >> 8, 8);
        writer.bits(~length & 0xff, 8);
        writer.bits((~length >> 8) & 0xff, 8);
        writer.bytes(window.subarray(at, at + length));
        at += length;
      } while (at < block.end);
    } else if (fixedBits <= dynamicBits) {
      writer.bits(last, 1);
      writer.bits(1, 2);
      writeSymbols(writer, block, FIXED);
    } else {
      writer.bits(last, 1);
      writer.bits(2, 2);
      writeDynamic(writer, block, header);
    }
  }
  return writer.result();
}
