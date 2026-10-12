import { adler32 } from './adler32';
import {
  CODE_LENGTH_ORDER,
  DISTANCE_BASE,
  DISTANCE_CODES,
  DISTANCE_EXTRA,
  END_OF_BLOCK,
  LENGTH_BASE,
  LENGTH_CODES,
  LENGTH_EXTRA,
  MAX_BITS,
  MAX_DISTANCE,
  fixedDistanceLengths,
  fixedLiteralLengths,
} from './tables';

/**
 * Decompresses DEFLATE streams, RFC 1951, and zlib streams, RFC 1950.
 *
 * It follows zlib's reference decoder, puff, and is as strict: it rejects any
 * stream zlib would, plus streams with bytes after the end. Codes are
 * decoded a bit at a time, which is plenty fast for the small values it's
 * meant for.
 */

export interface InflateOptions {
  // The preset dictionary the data was compressed with. Only the last 32 KB
  // can be referred to.
  dictionary?: Uint8Array;
  // Stops with an error once the output would be longer than this.
  maxOutputLength?: number;
}

export class InflateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InflateError';
  }
}

/**
 * A canonical Huffman code, as the number of codes of each length and the
 * symbols in code order.
 */
interface Huffman {
  count: Uint16Array;
  symbol: Uint16Array;
}

/**
 * Builds a code from its code lengths. Returns 0 for a complete code, more
 * than 0 for an incomplete one and less than 0 for one with too many codes.
 */
function buildHuffman(lengths: Uint8Array, huffman: Huffman): number {
  const { count, symbol } = huffman;
  count.fill(0);
  for (const length of lengths) count[length] += 1;
  if (count[0] === lengths.length) {
    // No codes. Complete, but decoding with it is an error.
    return 0;
  }

  let left = 1;
  for (let length = 1; length <= MAX_BITS; length += 1) {
    left <<= 1;
    left -= count[length];
    if (left < 0) {
      return left;
    }
  }

  const offsets = new Uint16Array(MAX_BITS + 1);
  for (let length = 1; length < MAX_BITS; length += 1) {
    offsets[length + 1] = offsets[length] + count[length];
  }
  for (let i = 0; i < lengths.length; i += 1) {
    if (lengths[i] !== 0) {
      symbol[offsets[lengths[i]]] = i;
      offsets[lengths[i]] += 1;
    }
  }
  return left;
}

function isSingleCode(code: Huffman, symbols: number): boolean {
  return code.count[0] + code.count[1] === symbols;
}

function huffman(size: number): Huffman {
  return {
    count: new Uint16Array(MAX_BITS + 1),
    symbol: new Uint16Array(size),
  };
}

class Inflater {
  private position: number;
  private bitBuffer = 0;
  private bitCount = 0;
  output: Uint8Array;
  length: number;
  readonly dictionaryLength: number;

  constructor(
    private readonly input: Uint8Array,
    start: number,
    dictionary: Uint8Array,
    private readonly maxLength: number,
  ) {
    this.position = start;
    this.dictionaryLength = dictionary.length;
    this.output = new Uint8Array(
      dictionary.length + Math.max(1024, input.length * 4),
    );
    this.output.set(dictionary);
    this.length = dictionary.length;
  }

  get end(): number {
    return this.position;
  }

  private bits(count: number): number {
    let buffer = this.bitBuffer;
    while (this.bitCount < count) {
      if (this.position >= this.input.length) {
        throw new InflateError('The data ends too soon');
      }
      buffer |= this.input[this.position] << this.bitCount;
      this.position += 1;
      this.bitCount += 8;
    }
    this.bitBuffer = buffer >>> count;
    this.bitCount -= count;
    return buffer & ((1 << count) - 1);
  }

  private reserve(extra: number) {
    const needed = this.length + extra;
    if (needed - this.dictionaryLength > this.maxLength) {
      throw new InflateError('The output is too long');
    }
    if (needed > this.output.length) {
      const grown = new Uint8Array(Math.max(needed, this.output.length * 2));
      grown.set(this.output.subarray(0, this.length));
      this.output = grown;
    }
  }

  private decode(code: Huffman): number {
    let value = 0;
    let first = 0;
    let index = 0;
    for (let length = 1; length <= MAX_BITS; length += 1) {
      value |= this.bits(1);
      const count = code.count[length];
      if (value - count < first) {
        return code.symbol[index + (value - first)];
      }
      index += count;
      first += count;
      first <<= 1;
      value <<= 1;
    }
    throw new InflateError('A code is missing from a Huffman table');
  }

  private stored() {
    // Stored blocks start on a byte.
    this.bitBuffer = 0;
    this.bitCount = 0;
    if (this.position + 4 > this.input.length) {
      throw new InflateError('The data ends too soon');
    }
    const input = this.input;
    const at = this.position;
    const length = input[at] | (input[at + 1] << 8);
    const check = input[at + 2] | (input[at + 3] << 8);
    if (length !== (~check & 0xffff)) {
      throw new InflateError("A stored block's length doesn't match its check");
    }
    this.position += 4;
    if (this.position + length > input.length) {
      throw new InflateError('The data ends too soon');
    }
    this.reserve(length);
    this.output.set(
      input.subarray(this.position, this.position + length),
      this.length,
    );
    this.position += length;
    this.length += length;
  }

  private codes(literals: Huffman, distances: Huffman) {
    for (;;) {
      let symbol = this.decode(literals);
      if (symbol < 256) {
        this.reserve(1);
        this.output[this.length] = symbol;
        this.length += 1;
        continue;
      }
      if (symbol === END_OF_BLOCK) {
        return;
      }

      symbol -= 257;
      if (symbol >= LENGTH_CODES) {
        throw new InflateError('A length code is out of range');
      }
      const length = LENGTH_BASE[symbol] + this.bits(LENGTH_EXTRA[symbol]);
      symbol = this.decode(distances);
      if (symbol >= DISTANCE_CODES) {
        throw new InflateError('A distance code is out of range');
      }
      const distance =
        DISTANCE_BASE[symbol] + this.bits(DISTANCE_EXTRA[symbol]);
      if (distance > this.length) {
        throw new InflateError('A distance is too far back');
      }

      this.reserve(length);
      const output = this.output;
      // Byte by byte, as a copy can overlap itself.
      for (let i = 0, from = this.length - distance; i < length; i += 1) {
        output[this.length + i] = output[from + i];
      }
      this.length += length;
    }
  }

  private fixed() {
    this.codes(FIXED.literals, FIXED.distances);
  }

  private dynamic() {
    const literalCount = this.bits(5) + 257;
    const distanceCount = this.bits(5) + 1;
    const codeLengthCount = this.bits(4) + 4;
    if (literalCount > 286 || distanceCount > DISTANCE_CODES) {
      throw new InflateError('A dynamic block has too many codes');
    }

    const lengths = new Uint8Array(19);
    for (let i = 0; i < codeLengthCount; i += 1) {
      lengths[CODE_LENGTH_ORDER[i]] = this.bits(3);
    }
    const lengthCode = huffman(19);
    if (buildHuffman(lengths, lengthCode) !== 0) {
      throw new InflateError('The code length code is incomplete');
    }

    const total = literalCount + distanceCount;
    const codeLengths = new Uint8Array(total);
    for (let index = 0; index < total;) {
      let symbol = this.decode(lengthCode);
      if (symbol < 16) {
        codeLengths[index] = symbol;
        index += 1;
        continue;
      }
      let length = 0;
      if (symbol === 16) {
        if (index === 0) {
          throw new InflateError('A repeat has nothing to repeat');
        }
        length = codeLengths[index - 1];
        symbol = 3 + this.bits(2);
      } else if (symbol === 17) {
        symbol = 3 + this.bits(3);
      } else {
        symbol = 11 + this.bits(7);
      }
      if (index + symbol > total) {
        throw new InflateError('A repeat goes past the code lengths');
      }
      codeLengths.fill(length, index, index + symbol);
      index += symbol;
    }

    if (codeLengths[END_OF_BLOCK] === 0) {
      throw new InflateError('A dynamic block has no end of block code');
    }

    // An incomplete code is only allowed when it's a single one bit code.
    const literals = huffman(literalCount);
    let left = buildHuffman(codeLengths.subarray(0, literalCount), literals);
    if (left < 0 || (left > 0 && !isSingleCode(literals, literalCount))) {
      throw new InflateError('A literal/length code is incomplete');
    }
    const distances = huffman(distanceCount);
    left = buildHuffman(codeLengths.subarray(literalCount), distances);
    if (left < 0 || (left > 0 && !isSingleCode(distances, distanceCount))) {
      throw new InflateError('A distance code is incomplete');
    }

    this.codes(literals, distances);
  }

  run() {
    let last: number;
    do {
      last = this.bits(1);
      const type = this.bits(2);
      if (type === 0) {
        this.stored();
      } else if (type === 1) {
        this.fixed();
      } else if (type === 2) {
        this.dynamic();
      } else {
        throw new InflateError('A block has an invalid type');
      }
    } while (!last);
  }

  result(): Uint8Array {
    return this.output.slice(this.dictionaryLength, this.length);
  }
}

const FIXED = (() => {
  const literals = huffman(288);
  buildHuffman(fixedLiteralLengths(), literals);
  const distances = huffman(32);
  buildHuffman(fixedDistanceLengths(), distances);
  return { literals, distances };
})();

function lastWindow(dictionary: Uint8Array | undefined): Uint8Array {
  if (!dictionary) {
    return new Uint8Array(0);
  }
  return dictionary.subarray(Math.max(0, dictionary.length - MAX_DISTANCE));
}

/**
 * Decompresses a raw DEFLATE stream. The stream must end exactly at the end
 * of the data.
 */
export function inflateRaw(
  data: Uint8Array,
  options: InflateOptions = {},
): Uint8Array {
  const inflater = new Inflater(
    data,
    0,
    lastWindow(options.dictionary),
    options.maxOutputLength ?? Infinity,
  );
  inflater.run();
  if (inflater.end !== data.length) {
    throw new InflateError('There are bytes after the end of the stream');
  }
  return inflater.result();
}

/**
 * Decompresses a zlib stream: a two byte header, an optional preset
 * dictionary id, a DEFLATE stream and the Adler-32 checksum of the output.
 * A stream that needs a dictionary must be given the right one.
 */
export function zlibInflate(
  data: Uint8Array,
  options: InflateOptions = {},
): Uint8Array {
  if (data.length < 6) {
    throw new InflateError('The data is too short to be a zlib stream');
  }
  const method = data[0];
  const flags = data[1];
  if ((method & 0x0f) !== 8 || method >> 4 > 7) {
    throw new InflateError('The zlib header has an unknown method');
  }
  if ((method * 256 + flags) % 31 !== 0) {
    throw new InflateError("The zlib header's check doesn't match");
  }

  let start = 2;
  let dictionary: Uint8Array | undefined;
  if (flags & 0x20) {
    const id =
      ((data[2] << 24) | (data[3] << 16) | (data[4] << 8) | data[5]) >>> 0;
    if (!options.dictionary || adler32(options.dictionary) !== id) {
      throw new InflateError('The zlib stream needs a different dictionary');
    }
    dictionary = options.dictionary;
    start = 6;
  }

  const inflater = new Inflater(
    data,
    start,
    lastWindow(dictionary),
    options.maxOutputLength ?? Infinity,
  );
  inflater.run();
  const end = inflater.end;
  if (end + 4 !== data.length) {
    throw new InflateError(
      end + 4 > data.length
        ? 'The data ends too soon'
        : 'There are bytes after the end of the stream',
    );
  }
  const output = inflater.result();
  const checksum =
    ((data[end] << 24) |
      (data[end + 1] << 16) |
      (data[end + 2] << 8) |
      data[end + 3]) >>>
    0;
  if (adler32(output) !== checksum) {
    throw new InflateError("The zlib stream's checksum doesn't match");
  }
  return output;
}
