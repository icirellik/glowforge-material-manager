import type { Grey } from './image';
import type { Modules } from './spec';

/**
 * Helpers for the tests.
 */

/**
 * Draws modules as a greyscale image, with a light margin.
 */
export function greyOf({ size, data }: Modules, moduleSize: number, margin = 4): Grey {
  const width = (size + margin * 2) * moduleSize;
  const grey = new Uint8ClampedArray(width * width).fill(255);
  for (let y = 0; y < width; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const row = Math.floor(y / moduleSize) - margin;
      const column = Math.floor(x / moduleSize) - margin;
      if (row >= 0 && column >= 0 && row < size && column < size && data[row * size + column]) {
        grey[y * width + x] = 0;
      }
    }
  }
  return {
    data: grey, width, height: width, toImage: (point) => point,
  };
}

// The parts of node-canvas that the stand-ins below use, passed in so that
// this file doesn't depend on it.
interface CanvasModule {
  createCanvas: (width: number, height: number) => any;
  loadImage: (source: Buffer) => Promise<any>;
}

/**
 * Stands in for the browser's createImageBitmap and OffscreenCanvas, which
 * Node doesn't have.
 *
 * @returns A function that removes them again.
 */
export function stubImageDecoding({ createCanvas, loadImage }: CanvasModule): () => void {
  const globals = globalThis as any;
  const saved = { createImageBitmap: globals.createImageBitmap, OffscreenCanvas: globals.OffscreenCanvas };
  globals.createImageBitmap = async (blob: Blob) => {
    const image = await loadImage(Buffer.from(await blob.arrayBuffer()));
    return {
      width: image.width, height: image.height, image, close: () => {},
    };
  };
  globals.OffscreenCanvas = class {
    private canvas: any;

    constructor(width: number, height: number) {
      this.canvas = createCanvas(width, height);
    }

    getContext() {
      const context = this.canvas.getContext('2d');
      return {
        drawImage: (bitmap: any, x: number, y: number) => context.drawImage(bitmap.image, x, y),
        getImageData: (x: number, y: number, width: number, height: number) => context.getImageData(x, y, width, height),
      };
    }
  };
  return () => {
    Object.assign(globals, saved);
  };
}
