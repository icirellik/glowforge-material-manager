import { decodeModules, readVersion } from './decodeModules';
import type { DecodedQrCode } from './decodeModules';
import { findFinders, pickFinders, toBinary } from './finders';
import type { Binary, Finder } from './finders';
import { extractRegion } from './image';
import type {
  Grey, Pixels, Point, Region,
} from './image';
import {
  estimateSize, mapFinderCorners, project, refineWithAlignment,
} from './perspective';
import { findRegions } from './regions';
import { classifyModules, sampleModuleValues } from './sampleModules';
import type { Modules } from './spec';

/**
 * Reads QR codes from images: camera frames, photos and screenshots.
 *
 * The regions of an image that look like codes are found first and read on
 * their own. In each, the code's finder patterns give its position, and in
 * larger codes its alignment patterns refine it, which undoes perspective and
 * rotation. Then every module is sampled from the image and the modules are
 * decoded.
 *
 * Everything here works on raw pixels, so it runs anywhere, including service
 * workers and Node.
 */

export type { Pixels, Point, Region };

export interface QrCodeResult extends DecodedQrCode {
  // The code's outside corners in the image, clockwise on screen from the
  // corner of the top left finder.
  corners: Point[];
}

export interface ImageOptions {
  // Images with more pixels than this aren't read, which bounds the memory
  // used. 50 million by default.
  maxPixels?: number;
}

/**
 * Samples a code's modules with a transform and decodes them, splitting them
 * into dark and light with one threshold for the whole code and then, if that
 * fails, by each module's surroundings.
 */
function readModules(grey: Grey, h: number[], size: number, inverted: boolean) {
  const values = sampleModuleValues(grey, h, size);
  const modules = classifyModules(values, size, inverted, false);
  const decoded = decodeModules(modules) || decodeModules(classifyModules(values, size, inverted, true));
  return { modules, decoded };
}

/**
 * Reads a code from the position of its finders.
 */
function readCode(grey: Grey, binary: Binary, finders: Finder[], inverted: boolean): QrCodeResult | null {
  const read = (size: number): { modules: Modules, result: QrCodeResult | null } => {
    const fromCorners = mapFinderCorners(finders, size);
    const refined = refineWithAlignment(fromCorners, finders, size, binary);
    let first: Modules | null = null;
    for (const h of refined ? [refined, fromCorners] : [fromCorners]) {
      const { modules, decoded } = readModules(grey, h, size, inverted);
      first = first || modules;
      if (decoded) {
        const corners = [[0, 0], [size, 0], [size, size], [0, size]].map(([X, Y]) => grey.toImage(project(h, X, Y)));
        return { modules: first, result: { ...decoded, corners } };
      }
    }
    return { modules: first!, result: null };
  };

  const estimate = estimateSize(finders);
  const { modules, result } = read(estimate);
  if (result) {
    return result;
  }

  // The size estimate can be off by a version. Large codes say which version
  // they are, otherwise try the neighbouring sizes.
  const version = readVersion(modules);
  const sizes = version ? [17 + 4 * version] : [estimate - 4, estimate + 4];
  for (const size of sizes) {
    if (size !== estimate && size >= 21 && size <= 177) {
      const retry = read(size).result;
      if (retry) {
        return retry;
      }
    }
  }
  return null;
}

/**
 * Reads a code from a region, or returns null.
 */
function readRegion(grey: Grey): QrCodeResult | null {
  for (const inverted of [false, true]) {
    const binary = toBinary(grey, inverted);
    for (const finders of pickFinders(findFinders(binary))) {
      const result = readCode(grey, binary, finders, inverted);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

/**
 * Finds the regions of an image that look like QR codes, most likely first.
 */
export function findQrCodeRegions(pixels: Pixels): Region[] {
  return findRegions(pixels);
}

/**
 * Reads a QR code from an image, or returns null if there isn't one. When
 * there are several codes, this reads one of them.
 */
export function readQrCode(pixels: Pixels): QrCodeResult | null {
  for (const region of findRegions(pixels)) {
    const result = readRegion(extractRegion(pixels, region));
    if (result) {
      return result;
    }
  }
  return null;
}

/**
 * Reads a QR code from anything createImageBitmap takes, like an image,
 * video, canvas or Blob. This needs a browser, or a worker.
 *
 * @returns The code, or null if there isn't one, the source isn't an image
 * the browser can decode, or it's larger than `maxPixels`.
 */
export async function readQrCodeFromImage(
  source: ImageBitmapSource,
  { maxPixels = 50000000 }: ImageOptions = {}
): Promise<QrCodeResult | null> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(source);
  } catch {
    return null;
  }
  try {
    if (bitmap.width * bitmap.height > maxPixels) {
      return null;
    }
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) {
      return null;
    }
    context.drawImage(bitmap, 0, 0);
    return readQrCode(context.getImageData(0, 0, bitmap.width, bitmap.height));
  } finally {
    bitmap.close();
  }
}
