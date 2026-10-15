# Compression

DEFLATE (RFC 1951) and zlib (RFC 1950) streams, preset dictionaries and
base-92 text, with no dependencies. It runs in pages, workers, service
workers and Node. Nothing here imports from the rest of the extension, so the
folder can be copied into another project as it is.

```ts
import {
  deflateRaw,
  fromBase92,
  inflateRaw,
  toBase92,
} from './lib/compression';

// Bytes the data is likely to repeat. The same bytes must be used to read it.
const dictionary = new TextEncoder().encode('{"name":"Birch Plywood",');

const text = toBase92(deflateRaw(data, { dictionary }));
const back = inflateRaw(fromBase92(text), { dictionary });
```

It's here for materials in Chrome's cloud storage, which are small, alike and
paid for by the byte. Each is a few hundred bytes, too small for a compressor
to learn much from, and Chrome counts each value as JSON, which makes a
binary string cost about twice its length. So the cloud format,
`src/material/materialCloudFormat.ts`, packs a material, compresses it against
a dictionary of what materials usually say, and writes it in an alphabet
JSON doesn't escape.

## Why DEFLATE

Zstandard and Brotli are the modern choices, and both support dictionaries,
but on values of about 100 bytes their frame and table headers cost more
than they save. Quota bytes per material, including the 40 byte key, with
the material as JSON, a dictionary of 60 materials from the other set, and
base64 text:

| Compressed with                         | Editor-style materials | Proofgrade materials |
| --------------------------------------- | ---------------------- | -------------------- |
| pako, as 0.4.10 stored them             | 523                    | 625                  |
| zstd -19 with a trained 4 KB dictionary | 219                    | 227                  |
| Brotli -11 with the dictionary          | 219                    | 228                  |
| DEFLATE with the dictionary             | 213                    | 206                  |

The cloud format, a packed material compressed with DEFLATE and dictionary 1
in base-92, takes 115 and 150.

An adaptive range coder primed with the dictionary, like LZMA's, would be 5 to
15% smaller again, but it wouldn't fit more materials: Chrome allows 512 items
and 100 KB, so anything under 200 bytes an item is already limited by the
item count. DEFLATE also reads the values earlier versions stored.

## Inflate

`inflateRaw(data, { dictionary, maxOutputLength })` and `zlibInflate` follow
zlib's reference decoder, puff, and are as strict: an invalid stream throws
an `InflateError`, never anything else. In tests they agree with Node's zlib
on every block type, level and strategy, and on thousands of damaged streams, except
that they also reject bytes after the end of the stream. `zlibInflate` checks
the header, a preset dictionary's id and the Adler-32 checksum.

## Deflate

`deflateRaw(data, { dictionary })` finds matches like zlib at level 9, with
hash chains and lazy matching, and writes each block in whichever of the
fixed, dynamic and stored forms is smallest. Dynamic codes are limited to 15
bits by package-merge. The output is the same for the same input, every
time. In the tests it's never larger than zlib's level 9: on the materials
it's 1 to 5% smaller, and on larger data about the same.

## Base-92

`toBase92` and `fromBase92` write bytes as the 92 printable ASCII characters
other than `"`, `<` and `\`, which are the ones JSON writers escape (Chrome
writes `<` as `<`). Each character costs one byte in JSON: 1.23
characters per byte, against 1.33 for base64 and about 2.07 for a binary
string. The bytes are read as one big number, after a 0x01 byte that keeps
leading zeros, so every byte string has exactly one encoding.

## Speed

Built into a bundle and run in Node 24, against pako 1.0.6:

|                                                                  | Ours    | pako             |
| ---------------------------------------------------------------- | ------- | ---------------- |
| Read a legacy material                                           | 11 µs   | 11 µs            |
| Read a material in the cloud format                              | 12 µs   |                  |
| Write a material in the cloud format, checked by reading it back | 90 µs   | 52 µs (legacy)   |
| Deflate 144 KB of JSON                                           | 6.7 ms  | 4.1 ms (level 9) |
| Inflate it                                                       | 0.41 ms | 0.26 ms          |

`npm run bench` prints the sizes and times the cloud format. Vitest's module
runner slows imported constants down, so its times for this code read 2 to 3
times slow.

- `tables.ts`: DEFLATE's length and distance codes.
- `inflate.ts`: stored, fixed and dynamic blocks, and zlib streams.
- `deflate.ts`: matching, Huffman codes and block choice.
- `adler32.ts`: zlib's checksum.
- `base92.ts`: the text encoding.
