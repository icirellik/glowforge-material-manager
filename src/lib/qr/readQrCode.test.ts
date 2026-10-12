// @vitest-environment node
import path from 'path';
import * as canvasModule from 'canvas';
import { Canvas, createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import { encodeQrCode } from './encodeQrCode';
import {
  findQrCodeRegions,
  readQrCode,
  readQrCodeFromImage,
} from './readQrCode';
import type { Pixels } from './readQrCode';
import { stubImageDecoding } from './testing';

const TEST_IMAGES = path.join(__dirname, '..', '..', '..', 'test-images');
const LID_IMAGE = path.join(TEST_IMAGES, 'Custom:3f77f07.jpg');
// Taken with the lid lights low, so the sticker is dark grey on grey.
const DIM_LID_IMAGE = path.join(TEST_IMAGES, 'Custom:e5e69fb.jpg');

/**
 * Loads an image file as pixels, optionally mirrored or with the QR code
 * painted over.
 */
async function loadPixels(
  file: string,
  { mirror = false, hideCode = false } = {},
): Promise<Pixels> {
  const image = await loadImage(file);
  const canvas = createCanvas(image.width, image.height);
  const context = canvas.getContext('2d');
  if (mirror) {
    context.translate(image.width, 0);
    context.scale(-1, 1);
  }
  context.drawImage(image, 0, 0);
  context.setTransform(1, 0, 0, 1, 0, 0);
  if (hideCode) {
    context.fillStyle = 'rgb(20, 20, 18)';
    context.fillRect(1600, 0, 704, 500);
  }
  return context.getImageData(0, 0, image.width, image.height);
}

function pixelsOf(canvas: Canvas): Pixels {
  return canvas
    .getContext('2d')
    .getImageData(0, 0, canvas.width, canvas.height);
}

/**
 * Draws a code with a margin of light modules around it.
 */
function drawCode(
  text: string,
  { module = 5, margin = 2, dark = '#000000', light = '#ffffff' } = {},
): Canvas {
  const { size, data } = encodeQrCode(text);
  const canvas = createCanvas(
    (size + margin * 2) * module,
    (size + margin * 2) * module,
  );
  const context = canvas.getContext('2d');
  context.fillStyle = light;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = dark;
  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      if (data[row * size + column]) {
        context.fillRect(
          (column + margin) * module,
          (row + margin) * module,
          module,
          module,
        );
      }
    }
  }
  return canvas;
}

/**
 * Draws lines of dark specks, like text on a page.
 */
function drawText(
  canvas: Canvas,
  left: number,
  top: number,
  width: number,
  lines: number,
) {
  const context = canvas.getContext('2d');
  context.fillStyle = '#222222';
  for (let line = 0; line < lines; line += 1) {
    for (let x = left, i = line; x < left + width; i += 1) {
      const letter = 4 + ((i * 7) % 10);
      context.fillRect(x, top + line * 22, letter, 12 + (i % 4));
      x += letter + (i % 5 === 0 ? 11 : 3);
    }
  }
}

/**
 * Tilts a code away from the camera around its horizontal axis, with the
 * perspective of a camera some code widths away.
 */
function tilt(code: Canvas, degrees: number, cameraDistance = 2): Canvas {
  const { width } = code;
  const size = Math.round(width * 1.8);
  const source = code.getContext('2d').getImageData(0, 0, width, width);
  const tilted = createCanvas(size, size);
  const context = tilted.getContext('2d');
  const target = context.createImageData(size, size);
  const angle = (degrees * Math.PI) / 180;
  const distance = width * cameraDistance;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const sourceY =
        ((y - size / 2) * distance) /
        (distance * Math.cos(angle) - (y - size / 2) * Math.sin(angle));
      const sourceX =
        ((x - size / 2) * (sourceY * Math.sin(angle) + distance)) / distance;
      const column = Math.round(sourceX + width / 2);
      const row = Math.round(sourceY + width / 2);
      if (column >= 0 && row >= 0 && column < width && row < width) {
        target.data.set(
          source.data.subarray(
            (row * width + column) * 4,
            (row * width + column) * 4 + 4,
          ),
          (y * size + x) * 4,
        );
      }
    }
  }
  context.putImageData(target, 0, 0);
  return tilted;
}

/**
 * Blurs a canvas like an out of focus camera: three box blurs of this radius,
 * close to a Gaussian. node-canvas ignores context.filter.
 */
function blur(canvas: Canvas, radius: number) {
  const context = canvas.getContext('2d');
  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const { width, height, data } = image;
  const at = (value: number, limit: number) =>
    Math.min(limit - 1, Math.max(0, value));
  const plane = new Float32Array(width * height);
  const pass = new Float32Array(width * height);
  for (let channel = 0; channel < 3; channel += 1) {
    for (let i = 0; i < plane.length; i += 1) plane[i] = data[i * 4 + channel];
    for (let repeat = 0; repeat < 3; repeat += 1) {
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          let sum = 0;
          for (let d = -radius; d <= radius; d += 1)
            sum += plane[y * width + at(x + d, width)];
          pass[y * width + x] = sum / (2 * radius + 1);
        }
      }
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          let sum = 0;
          for (let d = -radius; d <= radius; d += 1)
            sum += pass[at(y + d, height) * width + x];
          plane[y * width + x] = sum / (2 * radius + 1);
        }
      }
    }
    for (let i = 0; i < plane.length; i += 1) data[i * 4 + channel] = plane[i];
  }
  context.putImageData(image, 0, 0);
}

const MATERIAL = 'rgb(205, 185, 150)';

/**
 * A dark, lid camera sized bed.
 */
function emptyBed(): Canvas {
  const canvas = createCanvas(2304, 1382);
  const context = canvas.getContext('2d');
  context.fillStyle = 'rgb(14, 14, 12)';
  context.fillRect(0, 0, canvas.width, canvas.height);
  return canvas;
}

/**
 * Draws a QR code onto a dark, lid camera sized bed with some bright debris.
 */
function bedWithCode(
  text: string,
  { module = 5, angle = 0, skew = 0, tilted = 0, inverted = false } = {},
): Pixels {
  const width = 2304;
  const height = 1382;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');
  context.fillStyle = 'rgb(14, 14, 12)';
  context.fillRect(0, 0, width, height);
  context.fillStyle = 'rgb(200, 190, 170)';
  for (let i = 0; i < 20; i += 1) {
    context.fillRect((i * 97) % 800, (i * 61) % height, 12 + (i % 5) * 6, 4);
  }
  if (!inverted) {
    context.beginPath();
    context.arc(width * 0.7, height * 0.3, 300, 0, Math.PI * 2);
    context.fill();
  }

  // Codes engraved on dark material are light on dark.
  let code = drawCode(text, {
    module,
    ...(inverted ? { dark: '#ffffff', light: '#000000' } : {}),
  });
  if (tilted) {
    code = tilt(code, tilted);
  }
  context.translate(width * 0.7, height * 0.3);
  context.rotate((angle * Math.PI) / 180);
  context.transform(1, 0, Math.tan((skew * Math.PI) / 180), 1, 0, 0);
  context.drawImage(code, -code.width / 2, -code.height / 2);
  return context.getImageData(0, 0, width, height);
}

describe('readQrCode', () => {
  it('reads the code from a real lid camera image', async () => {
    const code = readQrCode(await loadPixels(LID_IMAGE));
    expect(code?.text).toEqual('Custom:3f77f07');
    // The sticker is in the top right corner.
    for (const corner of code!.corners) {
      expect(corner.x).toBeGreaterThan(1600);
      expect(corner.y).toBeLessThan(500);
    }
  });

  it('reads the code from a dim lid camera image', async () => {
    const code = readQrCode(await loadPixels(DIM_LID_IMAGE));
    expect(code?.text).toEqual('Custom:e5e69fb');
    // The sticker is near the top left of the sheet.
    for (const corner of code!.corners) {
      expect(corner.x).toBeGreaterThan(740);
      expect(corner.x).toBeLessThan(910);
      expect(corner.y).toBeGreaterThan(425);
      expect(corner.y).toBeLessThan(595);
    }
  });

  it('reads a mirrored lid camera image', async () => {
    expect(
      readQrCode(await loadPixels(LID_IMAGE, { mirror: true }))?.text,
    ).toEqual('Custom:3f77f07');
  });

  it('finds nothing when there is no code', async () => {
    expect(
      readQrCode(await loadPixels(LID_IMAGE, { hideCode: true })),
    ).toBeNull();
  });

  it('reads a plain QR code image', async () => {
    expect(
      readQrCode(await loadPixels(path.join(TEST_IMAGES, 'frame.png')))?.text,
    ).toEqual('Yo!');
  });

  it('reads small, rotated and skewed codes', () => {
    expect(
      readQrCode(bedWithCode('Custom:abc1234', { module: 3 }))?.text,
    ).toEqual('Custom:abc1234');
    expect(
      readQrCode(bedWithCode('Custom:abc1234', { angle: 30 }))?.text,
    ).toEqual('Custom:abc1234');
    expect(
      readQrCode(bedWithCode('Custom:abc1234', { skew: 12 }))?.text,
    ).toEqual('Custom:abc1234');
  });

  it('reads tilted codes', () => {
    expect(
      readQrCode(bedWithCode('Custom:abc1234', { module: 6, tilted: 35 }))
        ?.text,
    ).toEqual('Custom:abc1234');
    expect(
      readQrCode(
        bedWithCode('Custom:abc1234', { module: 7, tilted: 50, angle: 20 }),
      )?.text,
    ).toEqual('Custom:abc1234');
  });

  it('reads light on dark codes', () => {
    expect(
      readQrCode(bedWithCode('Custom:abc1234', { module: 6, inverted: true }))
        ?.text,
    ).toEqual('Custom:abc1234');
  });

  it('reads codes that include the material settings', () => {
    const settings = `Custom:abc1234|${JSON.stringify({ n: 'Birch', t: 'Thin', c: { p: 100, s: 180 } })}`;
    expect(
      readQrCode(bedWithCode(settings, { module: 4, angle: 15 }))?.text,
    ).toEqual(settings);

    // Long settings make large codes, which have alignment patterns and
    // version information.
    const long = `Custom:abc1234|${JSON.stringify({
      n: 'Baltic Birch Plywood – 3mm',
      c: [
        { p: 100, s: 180, n: 1 },
        { p: 90, s: 160, n: 2 },
      ],
      e: [
        { p: 60, s: 1000, l: 270 },
        { p: 40, s: 1000, l: 340 },
        { p: 80, s: 800, l: 195 },
      ],
    })}`;
    expect(
      readQrCode(bedWithCode(long, { module: 5, tilted: 30, angle: 10 }))?.text,
    ).toEqual(long);
  });
});

describe('readQrCode on other images', () => {
  const TEXT = 'https://example.com/materials/birch?id=3f77f07';

  it('reads screenshots, with modules lined up with the pixels', () => {
    const canvas = createCanvas(600, 600);
    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, 600, 600);
    context.drawImage(drawCode(TEXT, { module: 8, margin: 4 }), 152, 152);
    expect(readQrCode(pixelsOf(canvas))?.text).toEqual(TEXT);
  });

  it('reads codes surrounded by text', () => {
    const canvas = createCanvas(1600, 1200);
    const context = canvas.getContext('2d');
    context.fillStyle = '#f4f1ea';
    context.fillRect(0, 0, 1600, 1200);
    drawText(canvas, 60, 60, 1480, 10);
    drawText(canvas, 60, 300, 600, 30);
    drawText(canvas, 1100, 300, 440, 30);
    context.drawImage(
      drawCode(TEXT, { module: 6, light: '#f4f1ea' }),
      700,
      300,
    );
    expect(readQrCode(pixelsOf(canvas))?.text).toEqual(TEXT);
  });

  it('reads large photos and says where the code is', () => {
    const canvas = createCanvas(4000, 3000);
    const context = canvas.getContext('2d');
    context.fillStyle = '#6a655c';
    context.fillRect(0, 0, 4000, 3000);
    // 33 modules of 30 pixels, turned 12 degrees around the middle.
    const code = drawCode(TEXT, { module: 30, margin: 4, light: '#e8e4dc' });
    const angle = (12 * Math.PI) / 180;
    context.translate(2000, 1500);
    context.rotate(angle);
    context.drawImage(code, -code.width / 2, -code.height / 2);

    const result = readQrCode(pixelsOf(canvas));
    expect(result).toMatchObject({ text: TEXT, version: 4, mirrored: false });
    [
      [-495, -495],
      [495, -495],
      [495, 495],
      [-495, 495],
    ].forEach(([x, y], index) => {
      expect(
        Math.abs(
          result!.corners[index].x -
            (2000 + x * Math.cos(angle) - y * Math.sin(angle)),
        ),
      ).toBeLessThan(2);
      expect(
        Math.abs(
          result!.corners[index].y -
            (1500 + x * Math.sin(angle) + y * Math.cos(angle)),
        ),
      ).toBeLessThan(2);
    });
  });

  it('reads one of several codes', () => {
    const canvas = createCanvas(1200, 600);
    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, 1200, 600);
    context.drawImage(drawCode('first', { module: 8, margin: 4 }), 184, 184);
    context.drawImage(drawCode('second', { module: 8, margin: 4 }), 784, 184);
    expect(['first', 'second']).toContain(readQrCode(pixelsOf(canvas))?.text);
  });
});

describe('readQrCode in hard places', () => {
  const ID = 'Custom:abc1234';

  it('reads stickers on narrow offcuts', () => {
    // The offcut's edges and the sticker make one long busy area.
    const canvas = emptyBed();
    const context = canvas.getContext('2d');
    context.fillStyle = MATERIAL;
    context.fillRect(300, 640, 1700, 165);
    context.drawImage(drawCode(ID, { light: MATERIAL }), 1200, 650);
    expect(readQrCode(pixelsOf(canvas))?.text).toEqual(ID);
  });

  it('reads stickers across a hard shadow', () => {
    const canvas = emptyBed();
    const context = canvas.getContext('2d');
    context.fillStyle = MATERIAL;
    context.fillRect(900, 200, 900, 900);
    context.drawImage(drawCode(ID, { module: 7 }), 1200, 450);
    context.fillStyle = 'rgba(0, 0, 0, 0.62)';
    context.fillRect(0, 0, 1300, canvas.height);
    expect(readQrCode(pixelsOf(canvas))?.text).toEqual(ID);
  });

  it('reads stickers in dim light', () => {
    // A sheet over the whole bed, so only the sticker has any contrast, and
    // that's about as much as in a dim lid camera image.
    const canvas = emptyBed();
    const context = canvas.getContext('2d');
    context.fillStyle = MATERIAL;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      drawCode(ID, { dark: 'rgb(90, 90, 85)', light: MATERIAL }),
      1200,
      450,
    );
    context.fillStyle = 'rgba(0, 0, 0, 0.6)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    expect(readQrCode(pixelsOf(canvas))?.text).toEqual(ID);
  });

  it('reads stickers next to the edge of a sheet', () => {
    // The sheet's outline and the sticker make one large busy area.
    const canvas = emptyBed();
    const context = canvas.getContext('2d');
    context.fillStyle = MATERIAL;
    context.fillRect(200, 150, 1800, 1100);
    context.drawImage(drawCode(ID, { module: 4, light: MATERIAL }), 1870, 170);
    expect(readQrCode(pixelsOf(canvas))?.text).toEqual(ID);
  });

  it('reads stickers next to many earlier engravings', () => {
    const canvas = emptyBed();
    const context = canvas.getContext('2d');
    context.fillStyle = MATERIAL;
    context.fillRect(20, 20, canvas.width - 40, canvas.height - 40);
    context.fillStyle = 'rgb(60, 40, 25)';
    for (let engraving = 0; engraving < 12; engraving += 1) {
      const left = 150 + (engraving % 6) * 340;
      const top = 150 + Math.floor(engraving / 6) * 420;
      for (let i = 0; i < 220; i += 1) {
        context.fillRect(
          left + ((i * 97) % 230),
          top + ((i * 61) % 230),
          4 + (i % 16),
          4 + (i % 10),
        );
      }
    }
    context.drawImage(drawCode(ID, { module: 4, light: MATERIAL }), 1000, 1060);
    expect(readQrCode(pixelsOf(canvas))?.text).toEqual(ID);
  });

  it('reads blurry, tilted settings codes from their alignment patterns', () => {
    // A version 10 code. Its finders' corners move with blur, which is enough
    // to misread hundreds of modules across a code this size.
    const settings = `Custom:abc1234|${JSON.stringify({
      n: 'Baltic Birch Plywood – 3mm',
      c: [
        { p: 100, s: 180, n: 1 },
        { p: 90, s: 160, n: 2 },
      ],
      e: [
        { p: 60, s: 1000, l: 270 },
        { p: 40, s: 1000, l: 340 },
        { p: 80, s: 800, l: 195 },
      ],
    })}`;
    const canvas = emptyBed();
    const context = canvas.getContext('2d');
    context.fillStyle = MATERIAL;
    context.fillRect(800, 60, 1400, 1300);
    context.drawImage(
      tilt(drawCode(settings, { module: 6, light: MATERIAL }), 35, 10),
      850,
      80,
    );
    blur(canvas, 1);
    expect(readQrCode(pixelsOf(canvas))).toMatchObject({
      text: settings,
      version: 10,
    });
  });

  it('stays fast with lots of finder-like squares', () => {
    const canvas = createCanvas(800, 800);
    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, 800, 800);
    for (let i = 0; i < 400; i += 1) {
      const left = 10 + (i % 20) * 39;
      const top = 10 + Math.floor(i / 20) * 39;
      context.fillStyle = '#000000';
      context.fillRect(left, top, 21, 21);
      context.fillStyle = '#ffffff';
      context.fillRect(left + 3, top + 3, 15, 15);
      context.fillStyle = '#000000';
      context.fillRect(left + 6, top + 6, 9, 9);
    }
    const started = performance.now();
    expect(readQrCode(pixelsOf(canvas))).toBeNull();
    // About 0.2 s here, the old matching took seconds and gigabytes.
    expect(performance.now() - started).toBeLessThan(3000);

    const bed = emptyBed();
    const sticker = drawCode(ID, { module: 3 });
    for (let i = 0; i < 160; i += 1) {
      bed
        .getContext('2d')
        .drawImage(sticker, 20 + (i % 16) * 140, 20 + Math.floor(i / 16) * 136);
    }
    expect(readQrCode(pixelsOf(bed))?.text).toEqual(ID);
  });
});

describe('findQrCodeRegions', () => {
  it('finds the sticker in a lid camera image first', async () => {
    const [region] = findQrCodeRegions(await loadPixels(LID_IMAGE));
    // The code is in the top right corner of the image.
    expect(region.x).toBeLessThan(1700);
    expect(region.y).toBeLessThan(120);
    expect(region.x + region.width).toBeGreaterThan(1940);
    expect(region.y + region.height).toBeGreaterThan(400);
  });
});

describe('readQrCodeFromImage', () => {
  let restore: () => void;
  beforeAll(() => {
    restore = stubImageDecoding(canvasModule);
  });
  afterAll(() => restore());

  const lidImage = () =>
    new Blob([fs.readFileSync(LID_IMAGE)], { type: 'image/jpeg' });

  it('reads a code from an image file', async () => {
    expect((await readQrCodeFromImage(lidImage()))?.text).toEqual(
      'Custom:3f77f07',
    );
  });

  it('gives null for files that are not images', async () => {
    expect(
      await readQrCodeFromImage(
        new Blob(['<html></html>'], { type: 'text/html' }),
      ),
    ).toBeNull();
  });

  it('gives null for images larger than the limit', async () => {
    // The lid image is 2304 x 1382.
    expect(
      await readQrCodeFromImage(lidImage(), { maxPixels: 2304 * 1382 - 1 }),
    ).toBeNull();
  });
});
