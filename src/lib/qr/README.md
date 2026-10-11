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
  console.log(code.text, code.version, code.corners);
}

// From an image, video frame, canvas or Blob, in a browser or worker. Images
// it can't decode, or larger than maxPixels, give null.
const fromBlob = await readQrCodeFromImage(blob, { maxPixels: 16000000 });

// Writing a code.
const svg = qrCodeToSvg(encodeQrCode('Custom:3f77f07'));
```

## Reading

`readQrCode` finds the areas of an image that look like codes and reads them,
most likely first, until one decodes. It returns the text, the version,
whether the code was mirrored, structured append details if it's one part of
a longer message, and the code's corners in the image. Or null.

It reads codes that are:

- small in a large image, like a sticker in a lid camera image of the whole
  bed, including next to a sheet's edge, on a narrow offcut or among earlier
  engravings;
- rotated, mirrored, light on dark, low contrast or noisy;
- partly in a hard shadow;
- tilted. Sharp codes read at 50°. Blur lowers that, as the far finder blurs
  away first: in the tests, a version 10 code with 6 pixel modules and about
  1.4 pixels of blur reads at 35°.

The work per image is bounded: at most 16 regions and 6 million pixels are
read, and at most 30 finder candidates per region are matched into sets.

- `regions.ts`: finds the busy areas, and tiles long or large ones.
- `image.ts`: greyscale copies of regions, resized so modules cover a few
  pixels.
- `finders.ts`: splits a region into dark and light, finds finder patterns and
  picks sets of three.
- `perspective.ts`: fits the code's transform from its finders, then refines
  it from the centres of its alignment patterns, which unlike the finders'
  corners don't move with blur.
- `sampleModules.ts`: samples each module, and splits them into dark and light
  by one threshold, or by their surroundings when that fails.
- `decodeModules.ts`: turns modules into text. Format and version
  information, masks, error correction, and numeric, alphanumeric, byte,
  kanji, ECI (including ISO-8859-1 and code page 437), FNC1 and structured
  append segments.
- `readQrCode.ts`: puts it together.

## Writing

`encodeQrCode(text, { level, version, mask })` splits the text into numeric,
alphanumeric and UTF-8 byte segments in the way that needs the fewest bits, at
error correction level M by default, in the smallest version that fits, with
the mask that has the lowest penalty. It never needs a larger version than the
`qrcode` package, and for material ids and most settings it makes the same
code module for module. The tests check codes against fingerprints of the
`qrcode` package's output.

`encodeSegments` takes segments directly, for modes the encoder doesn't choose
itself, like ECI or kanji.

`qrCodeToSvg(modules, { margin, scale, dark, light })` draws a code as filled
squares, with the standard 4 module margin.

## Layout

`spec.ts` has the parts of the standard that reading and writing share: error
correction tables, format and version information, function patterns and the
order of the codewords. `reedSolomon.ts` does the error correction for both.
