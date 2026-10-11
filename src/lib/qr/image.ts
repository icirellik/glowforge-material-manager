/**
 * Pixels, and greyscale copies of parts of them for the reader to work on.
 */

// RGBA pixels, like ImageData.
export interface Pixels {
  data: Uint8ClampedArray | Uint8Array;
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface Region {
  x: number;
  y: number;
  width: number;
  height: number;
}

// A single channel copy of a region. Positions in it are in pixels from its
// top left corner, so the first pixel covers 0 to 1.
export interface Grey {
  data: Uint8ClampedArray;
  width: number;
  height: number;
  // Maps a position in the copy back to the image.
  toImage: (point: Point) => Point;
}

// Read regions at no less than this size, so every module covers a few pixels,
// and no more, which is still a few pixels per module for the largest codes.
const MIN_DECODE_SIZE = 400;
const MAX_UPSCALE = 4;
const MAX_DECODE_SIZE = 1000;

/**
 * Converts an area of an image to luminance, averaging blocks of factor x
 * factor pixels, which is faster for large images and smooths out sensor
 * noise. Luminance is weighted 77:150:29, which adds up to 256.
 */
export function averageLuminance({ data, width: imageWidth }: Pixels, area: Region, factor: number) {
  const width = Math.floor(area.width / factor);
  const height = Math.floor(area.height / factor);
  const luminance = new Uint8Array(width * height);
  const divisor = factor * factor * 256;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      let sum = 0;
      for (let dy = 0; dy < factor; dy += 1) {
        let p = ((area.y + y * factor + dy) * imageWidth + area.x + x * factor) * 4;
        for (let dx = 0; dx < factor; dx += 1, p += 4) {
          sum += data[p] * 77 + data[p + 1] * 150 + data[p + 2] * 29;
        }
      }
      luminance[y * width + x] = sum / divisor;
    }
  }
  return { luminance, width, height };
}

/**
 * The size a region is read at, in pixels.
 */
export function decodeSize(region: Region): number {
  const factor = Math.max(1, Math.ceil(Math.max(region.width, region.height) / MAX_DECODE_SIZE));
  const largest = Math.max(region.width, region.height) / factor;
  return largest * Math.min(MAX_UPSCALE, Math.max(1, MIN_DECODE_SIZE / largest));
}

/**
 * Copies a region, stretching its contrast and resizing it so every module
 * covers a few pixels.
 */
export function extractRegion(pixels: Pixels, region: Region): Grey {
  const factor = Math.max(1, Math.ceil(Math.max(region.width, region.height) / MAX_DECODE_SIZE));
  const { luminance, width: sourceWidth, height: sourceHeight } = averageLuminance(pixels, region, factor);
  const scale = Math.min(MAX_UPSCALE, Math.max(1, MIN_DECODE_SIZE / Math.max(sourceWidth, sourceHeight)));
  const width = Math.round(sourceWidth * scale);
  const height = Math.round(sourceHeight * scale);

  const histogram = new Uint32Array(256);
  for (let i = 0; i < luminance.length; i += 1) histogram[luminance[i]] += 1;

  // Stretch between the 2nd and 98th percentiles so dim codes become black and
  // white.
  const total = luminance.length;
  let low = 0;
  let high = 255;
  for (let sum = 0; low < 255 && sum + histogram[low] < total * 0.02; low += 1) sum += histogram[low];
  for (let sum = 0; high > 0 && sum + histogram[high] < total * 0.02; high -= 1) sum += histogram[high];
  const range = Math.max(1, high - low);

  // Clamped, as the stretch goes past black and white.
  const data = new Uint8ClampedArray(width * height);
  for (let y = 0; y < height; y += 1) {
    // Sample with bilinear interpolation, between pixel centres.
    const sourceY = Math.min(sourceHeight - 1, (y + 0.5) / scale - 0.5);
    const y0 = Math.max(0, Math.floor(sourceY));
    const row0 = y0 * sourceWidth;
    const row1 = Math.min(sourceHeight - 1, y0 + 1) * sourceWidth;
    const fy = Math.max(0, sourceY - y0);
    for (let x = 0; x < width; x += 1) {
      const sourceX = Math.min(sourceWidth - 1, (x + 0.5) / scale - 0.5);
      const x0 = Math.max(0, Math.floor(sourceX));
      const x1 = Math.min(sourceWidth - 1, x0 + 1);
      const fx = Math.max(0, sourceX - x0);
      const value = (luminance[row0 + x0] * (1 - fx) + luminance[row0 + x1] * fx) * (1 - fy)
        + (luminance[row1 + x0] * (1 - fx) + luminance[row1 + x1] * fx) * fy;
      data[y * width + x] = ((value - low) * 255) / range;
    }
  }

  const imageScale = factor / scale;
  const toImage = ({ x, y }: Point) => ({
    x: region.x + x * imageScale,
    y: region.y + y * imageScale,
  });
  return {
    data, width, height, toImage,
  };
}
