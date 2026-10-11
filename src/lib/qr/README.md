# QR codes

Reads and writes QR codes, with no dependencies. It follows ISO/IEC 18004 and
works on raw pixels, so it runs in pages, workers, service workers and Node.
Nothing here imports from the rest of the extension, so the folder can be
copied into another project as it is.

```ts
import {
  encodeQrCode, qrCodeToSvg, readQrCode, readQrCodeFromImage,
} from './lib/qr';

// From ImageData, or anything shaped like it.
const code = readQrCode(context.getImageData(0, 0, width, height));
if (code) {
  console.log(code.text, code.corners);
}

// From an image, video frame, canvas or Blob, in a browser or worker.
const fromBlob = await readQrCodeFromImage(blob);

// Writing a code.
const svg = qrCodeToSvg(encodeQrCode('Custom:3f77f07'));
```

## Reading

`readQrCode` finds the areas of an image that look like codes, then reads each
one until one decodes. It handles codes that are small in a large image (like a
sticker in a lid camera image of the whole bed), rotated, tilted up to about
50°, mirrored, light on dark, low contrast or noisy. It returns the text and
the code's corners in the image, or null.

- `readQrCode.ts`: finds regions, finder patterns and the perspective, then
  samples the modules.
- `decodeModules.ts`: turns modules into text. Format and version
  information, masks, error correction, and numeric, alphanumeric, byte, kanji
  and ECI segments.
- `reedSolomon.ts`: error correction, for decoding and encoding.

## Writing

`encodeQrCode(text, { level, version, mask })` writes the text in the most
compact single mode (numeric, alphanumeric or UTF-8 bytes) at error correction
level M by default, in the smallest version that fits, with the mask that has
the lowest penalty. Its output matches the `qrcode` package module for module,
which the tests check.

`qrCodeToSvg(modules, { margin, scale, dark, light })` draws a code as filled
squares, with the standard 4 module margin.

## Layout

`spec.ts` has the parts of the standard that reading and writing share: error
correction tables, format and version information, function patterns and the
order of the codewords.
