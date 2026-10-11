// @vitest-environment node
import path from 'path';
import { Canvas, createCanvas, loadImage } from 'canvas';
import { encodeQrCode } from './encodeQrCode';
import { findQrCodeRegions, readQrCode } from './readQrCode';
import type { Pixels } from './readQrCode';

const TEST_IMAGES = path.join(__dirname, '..', '..', '..', 'test-images');
const LID_IMAGE = path.join(TEST_IMAGES, 'Custom:3f77f07.jpg');

/**
 * Loads an image file as pixels, optionally mirrored or with the QR code
 * painted over.
 */
async function loadPixels(file: string, { mirror = false, hideCode = false } = {}): Promise<Pixels> {
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
  return canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
}

/**
 * Draws a code with a margin of light modules around it.
 */
function drawCode(text: string, {
  module = 5, margin = 2, dark = '#000000', light = '#ffffff',
} = {}): Canvas {
  const { size, data } = encodeQrCode(text);
  const canvas = createCanvas((size + margin * 2) * module, (size + margin * 2) * module);
  const context = canvas.getContext('2d');
  context.fillStyle = light;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = dark;
  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      if (data[row * size + column]) {
        context.fillRect((column + margin) * module, (row + margin) * module, module, module);
      }
    }
  }
  return canvas;
}

/**
 * Draws lines of dark specks, like text on a page.
 */
function drawText(canvas: Canvas, left: number, top: number, width: number, lines: number) {
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
 * perspective of a camera close to the code.
 */
function tilt(code: Canvas, degrees: number): Canvas {
  const { width } = code;
  const size = Math.round(width * 1.8);
  const source = code.getContext('2d').getImageData(0, 0, width, width);
  const tilted = createCanvas(size, size);
  const context = tilted.getContext('2d');
  const target = context.createImageData(size, size);
  const angle = (degrees * Math.PI) / 180;
  const distance = width * 2;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const sourceY = ((y - size / 2) * distance) / (distance * Math.cos(angle) - (y - size / 2) * Math.sin(angle));
      const sourceX = ((x - size / 2) * (sourceY * Math.sin(angle) + distance)) / distance;
      const column = Math.round(sourceX + width / 2);
      const row = Math.round(sourceY + width / 2);
      if (column >= 0 && row >= 0 && column < width && row < width) {
        target.data.set(source.data.subarray((row * width + column) * 4, (row * width + column) * 4 + 4), (y * size + x) * 4);
      }
    }
  }
  context.putImageData(target, 0, 0);
  return tilted;
}

/**
 * Draws a QR code onto a dark, lid camera sized bed with some bright debris.
 */
function bedWithCode(text: string, {
  module = 5, angle = 0, skew = 0, tilted = 0, inverted = false,
} = {}): Pixels {
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
  let code = drawCode(text, { module, ...(inverted ? { dark: '#ffffff', light: '#000000' } : {}) });
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

  it('reads a mirrored lid camera image', async () => {
    expect(readQrCode(await loadPixels(LID_IMAGE, { mirror: true }))?.text).toEqual('Custom:3f77f07');
  });

  it('finds nothing when there is no code', async () => {
    expect(readQrCode(await loadPixels(LID_IMAGE, { hideCode: true }))).toBeNull();
  });

  it('reads a plain QR code image', async () => {
    expect(readQrCode(await loadPixels(path.join(TEST_IMAGES, 'frame.png')))?.text).toEqual('Yo!');
  });

  it('reads small, rotated and skewed codes', () => {
    expect(readQrCode(bedWithCode('Custom:abc1234', { module: 3 }))?.text).toEqual('Custom:abc1234');
    expect(readQrCode(bedWithCode('Custom:abc1234', { angle: 30 }))?.text).toEqual('Custom:abc1234');
    expect(readQrCode(bedWithCode('Custom:abc1234', { skew: 12 }))?.text).toEqual('Custom:abc1234');
  });

  it('reads tilted codes', () => {
    expect(readQrCode(bedWithCode('Custom:abc1234', { module: 6, tilted: 35 }))?.text).toEqual('Custom:abc1234');
    expect(readQrCode(bedWithCode('Custom:abc1234', { module: 7, tilted: 50, angle: 20 }))?.text).toEqual('Custom:abc1234');
  });

  it('reads light on dark codes', () => {
    expect(readQrCode(bedWithCode('Custom:abc1234', { module: 6, inverted: true }))?.text).toEqual('Custom:abc1234');
  });

  it('reads codes that include the material settings', () => {
    const settings = `Custom:abc1234|${JSON.stringify({ n: 'Birch', t: 'Thin', c: { p: 100, s: 180 } })}`;
    expect(readQrCode(bedWithCode(settings, { module: 4, angle: 15 }))?.text).toEqual(settings);

    // Long settings make large codes, which have alignment patterns and
    // version information.
    const long = `Custom:abc1234|${JSON.stringify({
      n: 'Baltic Birch Plywood – 3mm',
      c: [{ p: 100, s: 180, n: 1 }, { p: 90, s: 160, n: 2 }],
      e: [{ p: 60, s: 1000, l: 270 }, { p: 40, s: 1000, l: 340 }, { p: 80, s: 800, l: 195 }],
    })}`;
    expect(readQrCode(bedWithCode(long, { module: 5, tilted: 30, angle: 10 }))?.text).toEqual(long);
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
    context.drawImage(drawCode(TEXT, { module: 6, light: '#f4f1ea' }), 700, 300);
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
    expect(result?.text).toEqual(TEXT);
    [[-495, -495], [495, -495], [495, 495], [-495, 495]].forEach(([x, y], index) => {
      expect(Math.abs(result!.corners[index].x - (2000 + x * Math.cos(angle) - y * Math.sin(angle)))).toBeLessThan(4);
      expect(Math.abs(result!.corners[index].y - (1500 + x * Math.sin(angle) + y * Math.cos(angle)))).toBeLessThan(4);
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
