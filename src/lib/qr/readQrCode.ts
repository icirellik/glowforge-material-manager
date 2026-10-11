import { decodeModules, readVersion } from './decodeModules';
import type { Modules } from './spec';

/**
 * Reads QR codes from images: camera frames, photos and screenshots.
 *
 * A code is often a small part of a large image, like a sticker in a
 * Glowforge lid camera image of the whole bed. Decoding the whole image is
 * slow and unreliable, so the regions that look like QR codes are found first
 * and decoded on their own: areas with strong contrast and lots of edges.
 *
 * In each region, the code's three finder patterns give its position, which
 * undoes perspective and rotation, every module is sampled from the image and
 * the modules are decoded.
 *
 * Everything here works on raw pixels, so it runs anywhere, including service
 * workers and Node.
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

export interface QrCodeResult {
  text: string;
  // The code's outside corners in the image, clockwise on screen from the
  // corner of the top left finder.
  corners: Point[];
}

export interface Region {
  x: number;
  y: number;
  width: number;
  height: number;
}

// A block must have at least this luminance range to be part of a code.
const MIN_BLOCK_CONTRAST = 64;
// The difference between pixels two apart that counts as an edge.
const EDGE_THRESHOLD = 40;
// The fraction of a block's pixels that must be edges.
const MIN_EDGE_DENSITY = 0.08;
// Codes span at least a few blocks, smaller areas are specks or debris.
const MIN_REGION_BLOCKS = 4;
const MAX_REGIONS = 6;
// Read regions at no less than this size, so every module covers a few pixels,
// and no more, which is still a few pixels per module for the largest codes.
const MIN_DECODE_SIZE = 400;
const MAX_UPSCALE = 4;
const MAX_DECODE_SIZE = 1000;
// Find regions at no more than this size, which also averages away noise.
const DETECTION_SIZE = 1200;

/**
 * Converts an area of an image to luminance, averaging blocks of factor x
 * factor pixels, which is faster for large images and smooths out sensor
 * noise. Luminance is weighted 77:150:29, which adds up to 256.
 */
function averageLuminance({ data, width: imageWidth }: Pixels, area: Region, factor: number) {
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
 * Picks a block size that scales with the image, so codes span several blocks
 * whatever the camera resolution.
 */
function blockSizeFor(width: number, height: number): number {
  return Math.max(8, Math.round(Math.max(width, height) / 150));
}

/**
 * Marks the blocks that have strong contrast and many edges.
 */
function findBusyBlocks(luminance: Uint8Array, width: number, height: number, blockSize: number) {
  const columns = Math.ceil(width / blockSize);
  const rows = Math.ceil(height / blockSize);
  const min = new Uint8Array(columns * rows).fill(255);
  const max = new Uint8Array(columns * rows);
  const edges = new Uint32Array(columns * rows);
  const blockColumns = Int32Array.from({ length: width }, (_, x) => Math.floor(x / blockSize));

  for (let y = 0; y < height; y += 1) {
    const rowOffset = y * width;
    const blockRow = Math.floor(y / blockSize) * columns;
    const hasBelow = y + 2 < height;
    for (let x = 0; x < width; x += 1) {
      const i = rowOffset + x;
      const value = luminance[i];
      const block = blockRow + blockColumns[x];
      if (value < min[block]) min[block] = value;
      if (value > max[block]) max[block] = value;
      const right = x + 2 < width ? luminance[i + 2] : value;
      const below = hasBelow ? luminance[i + 2 * width] : value;
      if (Math.abs(right - value) > EDGE_THRESHOLD || Math.abs(below - value) > EDGE_THRESHOLD) {
        edges[block] += 1;
        // The contrast includes the pixels that edges are found against,
        // which can be in the next block, so that blocks lined up with a
        // code's modules, each all one colour, still count.
        const low = right < below ? right : below;
        const high = right > below ? right : below;
        if (low < min[block]) min[block] = low;
        if (high > max[block]) max[block] = high;
      }
    }
  }

  const busy = new Uint8Array(columns * rows);
  const minEdges = blockSize * blockSize * MIN_EDGE_DENSITY;
  for (let block = 0; block < busy.length; block += 1) {
    busy[block] = max[block] - min[block] >= MIN_BLOCK_CONTRAST && edges[block] >= minEdges ? 1 : 0;
  }
  return { busy, columns, rows };
}

/**
 * Joins neighbouring busy blocks into regions, largest first.
 */
function groupBlocks(busy: Uint8Array, columns: number, rows: number) {
  // Grow each busy block by one so codes with large modules, whose insides
  // have no edges, stay in one piece.
  const grown = new Uint8Array(busy.length);
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      if (busy[row * columns + column]) {
        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            const r = row + dy;
            const c = column + dx;
            if (r >= 0 && r < rows && c >= 0 && c < columns) grown[r * columns + c] = 1;
          }
        }
      }
    }
  }

  const visited = new Uint8Array(busy.length);
  const groups = [];
  for (let start = 0; start < grown.length; start += 1) {
    if (grown[start] && !visited[start]) {
      let left = columns;
      let top = rows;
      let right = 0;
      let bottom = 0;
      let busyCount = 0;
      const stack = [start];
      visited[start] = 1;
      while (stack.length > 0) {
        const block = stack.pop()!;
        const row = Math.floor(block / columns);
        const column = block % columns;
        left = Math.min(left, column);
        right = Math.max(right, column);
        top = Math.min(top, row);
        bottom = Math.max(bottom, row);
        busyCount += busy[block];
        const neighbours = [
          column > 0 ? block - 1 : -1,
          column < columns - 1 ? block + 1 : -1,
          row > 0 ? block - columns : -1,
          row < rows - 1 ? block + columns : -1,
        ];
        for (const neighbour of neighbours) {
          if (neighbour >= 0 && grown[neighbour] && !visited[neighbour]) {
            visited[neighbour] = 1;
            stack.push(neighbour);
          }
        }
      }
      groups.push({
        left, top, right, bottom, busyCount,
      });
    }
  }

  return groups
    .filter((group) => {
      const groupWidth = group.right - group.left + 1;
      const groupHeight = group.bottom - group.top + 1;
      const aspect = groupWidth / groupHeight;
      return group.busyCount >= MIN_REGION_BLOCKS && aspect > 0.33 && aspect < 3;
    })
    .sort((a, b) => b.busyCount - a.busyCount);
}

/**
 * Finds the regions that look like QR codes, most likely first.
 */
function findRegions(pixels: Pixels): Region[] {
  const { width: fullWidth, height: fullHeight } = pixels;
  // Sensor noise would otherwise look like edges everywhere.
  const factor = Math.max(1, Math.ceil(Math.max(fullWidth, fullHeight) / DETECTION_SIZE));
  const { luminance, width, height } = averageLuminance(pixels, {
    x: 0, y: 0, width: fullWidth, height: fullHeight,
  }, factor);

  const blockSize = blockSizeFor(width, height);
  const { busy, columns, rows } = findBusyBlocks(luminance, width, height, blockSize);

  return groupBlocks(busy, columns, rows).slice(0, MAX_REGIONS).map((group) => {
    // Leave room for the quiet zone around the code, in full size pixels.
    const margin = blockSize * 2;
    const x = Math.max(0, (group.left * blockSize - margin) * factor);
    const y = Math.max(0, (group.top * blockSize - margin) * factor);
    return {
      x,
      y,
      width: Math.min(fullWidth, ((group.right + 1) * blockSize + margin) * factor) - x,
      height: Math.min(fullHeight, ((group.bottom + 1) * blockSize + margin) * factor) - y,
    };
  });
}

/**
 * Finds the regions of an image that look like QR codes, most likely first.
 */
export function findQrCodeRegions(pixels: Pixels): Region[] {
  return findRegions(pixels);
}

// A single channel copy of a region.
interface Grey {
  data: Uint8ClampedArray;
  width: number;
  height: number;
  // Maps a position in the copy back to the image.
  toImage: (point: Point) => Point;
}

/**
 * Copies a region, stretching its contrast and resizing it so every module
 * covers a few pixels.
 */
function extractRegion(pixels: Pixels, region: Region): Grey {
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
    // Sample with bilinear interpolation.
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

  // Pixel centres are whole numbers in the copy, and half way in the image.
  const imageScale = factor / scale;
  const toImage = ({ x, y }: Point) => ({
    x: region.x + (x + 0.5) * imageScale,
    y: region.y + (y + 0.5) * imageScale,
  });
  return {
    data, width, height, toImage,
  };
}

/**
 * Twice the signed area of a polygon, positive when the corners run clockwise
 * on screen.
 */
function signedArea(points: Point[]): number {
  let area = 0;
  for (let i = 0; i < points.length; i += 1) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    area += a.x * b.y - b.x * a.y;
  }
  return area;
}

/**
 * The convex hull of a set of points, clockwise on screen.
 */
function convexHull(points: Point[]): Point[] {
  const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y);
  const cross = (o: Point, a: Point, b: Point) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const half = (input: Point[]) => {
    const hull: Point[] = [];
    for (const point of input) {
      while (hull.length >= 2 && cross(hull[hull.length - 2], hull[hull.length - 1], point) <= 0) hull.pop();
      hull.push(point);
    }
    hull.pop();
    return hull;
  };
  const hull = [...half(sorted), ...half(sorted.reverse())];
  return signedArea(hull) < 0 ? hull.reverse() : hull;
}

/**
 * The largest quadrilateral with corners on a convex polygon, which is a good
 * fit for the outline of a QR code even when one corner is missing.
 */
function largestQuadrilateral(hull: Point[]): Point[] | null {
  // Thin out large hulls, the search is cubic in the number of points.
  const step = Math.ceil(hull.length / 120);
  const points = hull.filter((_, index) => index % step === 0);
  const n = points.length;
  if (n < 4) {
    return null;
  }

  const triangle = (a: Point, b: Point, c: Point) => Math.abs((b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y));
  let best: Point[] | null = null;
  let bestArea = 0;
  for (let i = 0; i < n; i += 1) {
    for (let k = i + 2; k < n; k += 1) {
      let left = -1;
      let leftArea = 0;
      for (let j = i + 1; j < k; j += 1) {
        const area = triangle(points[i], points[j], points[k]);
        if (area > leftArea) { leftArea = area; left = j; }
      }
      let right = -1;
      let rightArea = 0;
      for (let l = k + 1; l < n + i; l += 1) {
        const area = triangle(points[k], points[l % n], points[i]);
        if (area > rightArea) { rightArea = area; right = l % n; }
      }
      if (left >= 0 && right >= 0 && leftArea + rightArea > bestArea) {
        bestArea = leftArea + rightArea;
        best = [points[i], points[left], points[k], points[right]];
      }
    }
  }
  return best;
}

/**
 * Marks the pixels that are the code's dark colour, comparing each pixel with
 * its neighbourhood so uneven lighting doesn't matter. Inverted codes, like
 * ones engraved on dark material, are light on dark.
 */
function binarize({ data, width, height }: Grey, inverted: boolean): Uint8Array {
  const stride = width + 1;
  const integral = new Float64Array(stride * (height + 1));
  for (let y = 0; y < height; y += 1) {
    let rowSum = 0;
    for (let x = 0; x < width; x += 1) {
      rowSum += data[y * width + x];
      integral[(y + 1) * stride + x + 1] = integral[y * stride + x + 1] + rowSum;
    }
  }

  // Larger than a module, so the inside of a big module still compares with
  // its light surroundings.
  const radius = Math.max(8, Math.round(Math.min(width, height) / 12));
  const lefts = new Int32Array(width);
  const rights = new Int32Array(width);
  for (let x = 0; x < width; x += 1) {
    lefts[x] = Math.max(0, x - radius);
    rights[x] = Math.min(width, x + radius + 1);
  }
  const dark = new Uint8Array(width * height);
  for (let y = 0; y < height; y += 1) {
    const top = Math.max(0, y - radius) * stride;
    const bottom = Math.min(height, y + radius + 1) * stride;
    const rows = (bottom - top) / stride;
    for (let x = 0, i = y * width; x < width; x += 1, i += 1) {
      const left = lefts[x];
      const right = rights[x];
      const sum = integral[bottom + right] - integral[top + right] - integral[bottom + left] + integral[top + left];
      const mean = sum / (rows * (right - left));
      const value = data[i];
      dark[i] = (inverted ? value > mean + 10 : value < mean - 10) ? 1 : 0;
    }
  }
  return dark;
}

interface Component {
  label: number;
  count: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
  touchesEdge: boolean;
}

/**
 * Finds the groups of touching dark pixels.
 *
 * @returns The groups, and every pixel's group label, starting at 1.
 */
function findComponents(dark: Uint8Array, width: number, height: number) {
  const labels = new Int32Array(dark.length);
  const stack = new Int32Array(dark.length);
  const components: Component[] = [];
  for (let start = 0; start < dark.length; start += 1) {
    if (dark[start] && !labels[start]) {
      const component: Component = {
        label: components.length + 1, count: 0, left: width, top: height, right: 0, bottom: 0, touchesEdge: false,
      };
      labels[start] = component.label;
      stack[0] = start;
      let stackSize = 1;
      while (stackSize > 0) {
        stackSize -= 1;
        const index = stack[stackSize];
        const x = index % width;
        const y = (index - x) / width;
        component.count += 1;
        if (x < component.left) component.left = x;
        if (x > component.right) component.right = x;
        if (y < component.top) component.top = y;
        if (y > component.bottom) component.bottom = y;
        if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
          component.touchesEdge = true;
        }
        // Inlined, this runs for every dark pixel.
        if (x > 0 && dark[index - 1] && !labels[index - 1]) {
          labels[index - 1] = component.label;
          stack[stackSize] = index - 1;
          stackSize += 1;
        }
        if (x < width - 1 && dark[index + 1] && !labels[index + 1]) {
          labels[index + 1] = component.label;
          stack[stackSize] = index + 1;
          stackSize += 1;
        }
        if (y > 0 && dark[index - width] && !labels[index - width]) {
          labels[index - width] = component.label;
          stack[stackSize] = index - width;
          stackSize += 1;
        }
        if (y < height - 1 && dark[index + width] && !labels[index + width]) {
          labels[index + width] = component.label;
          stack[stackSize] = index + width;
          stackSize += 1;
        }
      }
      components.push(component);
    }
  }
  return { labels, components };
}

interface Finder {
  center: Point;
  corners: Point[];
  moduleSize: number;
}

/**
 * Finds QR finder patterns: a dark ring around a solid dark centre, which the
 * QR standard always surrounds with light modules so they stand alone.
 */
function findFinders(dark: Uint8Array, width: number, height: number): Finder[] {
  const { labels, components } = findComponents(dark, width, height);
  const finders: Finder[] = [];
  for (const ring of components) {
    const ringWidth = ring.right - ring.left + 1;
    const ringHeight = ring.bottom - ring.top + 1;
    const fill = ring.count / (ringWidth * ringHeight);
    if (ring.touchesEdge || ringWidth < 7 || ringHeight < 7 || fill < 0.2 || fill > 0.8) {
      continue;
    }

    // The centre is 3x3 modules in the middle of the ring, look around the
    // middle in case the very middle pixel is light.
    const middleX = (ring.left + ring.right) / 2;
    const middleY = (ring.top + ring.bottom) / 2;
    const nudge = Math.max(1, Math.round(ringWidth / 14));
    const nudges = [[0, 0], [-nudge, 0], [nudge, 0], [0, -nudge], [0, nudge]];
    let center: Component | undefined;
    for (const [dx, dy] of nudges) {
      const label = labels[Math.round(middleY + dy) * width + Math.round(middleX + dx)];
      if (label && label !== ring.label) {
        center = components[label - 1];
        break;
      }
    }
    if (!center || center.count < 9) {
      continue;
    }
    const ratio = (center.right - center.left + 1) / ringWidth;
    if (Math.abs((center.left + center.right) / 2 - middleX) > ringWidth * 0.15
      || Math.abs((center.top + center.bottom) / 2 - middleY) > ringHeight * 0.15
      || ratio < 0.2 || ratio > 0.65) {
      continue;
    }

    // The ring's outline only depends on its leftmost and rightmost pixels on
    // each row.
    const outline: Point[] = [];
    for (let y = ring.top; y <= ring.bottom; y += 1) {
      let left = -1;
      let right = -1;
      for (let x = ring.left; x <= ring.right; x += 1) {
        if (labels[y * width + x] === ring.label) {
          if (left < 0) left = x;
          right = x + 1;
        }
      }
      if (left >= 0) {
        outline.push({ x: left, y }, { x: right, y }, { x: left, y: y + 1 }, { x: right, y: y + 1 });
      }
    }
    const corners = largestQuadrilateral(convexHull(outline));
    if (corners) {
      let perimeter = 0;
      for (let i = 0; i < 4; i += 1) {
        perimeter += Math.hypot(corners[(i + 1) % 4].x - corners[i].x, corners[(i + 1) % 4].y - corners[i].y);
      }
      finders.push({
        center: { x: middleX, y: middleY },
        corners,
        // A finder is 7 modules wide.
        moduleSize: perimeter / 28,
      });
    }
  }
  return finders;
}

// How far from square the finders can be, as tilting a code squashes it and
// changes its angles.
const MAX_FINDER_COSINE = 0.6;
const MAX_FINDER_ASPECT = 3;
// Try a few sets of finders, the decoder rejects the wrong ones.
const MAX_FINDER_SETS = 3;

/**
 * Picks sets of three finders that could belong to one code, closest to a
 * square first, each as the top left, top right and bottom left of the code.
 */
function pickFinders(finders: Finder[]): Finder[][] {
  const sets: { finders: Finder[], score: number }[] = [];
  for (let i = 0; i < finders.length; i += 1) {
    for (let j = i + 1; j < finders.length; j += 1) {
      for (let k = j + 1; k < finders.length; k += 1) {
        const triple = [finders[i], finders[j], finders[k]];
        const sizes = triple.map((finder) => finder.moduleSize);
        if (Math.max(...sizes) / Math.min(...sizes) > 2) {
          continue;
        }
        // The top left finder is usually the corner closest to a right angle,
        // but not always when the code is tilted, so each corner is a set.
        for (let corner = 0; corner < 3; corner += 1) {
          const topLeft = triple[corner];
          let [topRight, bottomLeft] = triple.filter((_, index) => index !== corner);
          const ux = topRight.center.x - topLeft.center.x;
          const uy = topRight.center.y - topLeft.center.y;
          const vx = bottomLeft.center.x - topLeft.center.x;
          const vy = bottomLeft.center.y - topLeft.center.y;
          const u = Math.hypot(ux, uy);
          const v = Math.hypot(vx, vy);
          const cosine = Math.abs((ux * vx + uy * vy) / (u * v));
          const aspect = Math.abs(Math.log(u / v));
          // Finders are at least 14 modules apart, allowing for the module
          // size, which is an average of both directions, being off when the
          // code is tilted.
          if (u >= topLeft.moduleSize * 7 && v >= topLeft.moduleSize * 7
            && cosine < MAX_FINDER_COSINE && aspect < Math.log(MAX_FINDER_ASPECT)) {
            // Clockwise on screen, like a code that isn't mirrored. Mirrored
            // codes come out transposed, which the decoder undoes.
            if (ux * vy - uy * vx < 0) {
              [topRight, bottomLeft] = [bottomLeft, topRight];
            }
            sets.push({ finders: [topLeft, topRight, bottomLeft], score: cosine + aspect });
          }
        }
      }
    }
  }
  return sets
    .sort((a, b) => a.score - b.score)
    .slice(0, MAX_FINDER_SETS)
    .map((set) => set.finders);
}

/**
 * Solves the perspective transform that best maps module coordinates onto
 * image coordinates, by least squares.
 *
 * @returns The transform's coefficients, x = (h0 X + h1 Y + h2) / (h6 X + h7 Y + 1)
 * and y = (h3 X + h4 Y + h5) / (h6 X + h7 Y + 1) for module position X, Y.
 */
function fitPerspective(modules: Point[], image: Point[]): number[] {
  // Scale both sides to around 1, which keeps the equations well conditioned.
  const moduleScale = Math.max(...modules.map((p) => Math.max(Math.abs(p.x), Math.abs(p.y))));
  const imageScale = Math.max(...image.map((p) => Math.max(Math.abs(p.x), Math.abs(p.y))));

  // Normal equations for x = (h0 X + h1 Y + h2) / (h6 X + h7 Y + 1) and the
  // matching y equation.
  const normal = Array.from({ length: 8 }, () => new Array(9).fill(0));
  modules.forEach((modulePoint, index) => {
    const X = modulePoint.x / moduleScale;
    const Y = modulePoint.y / moduleScale;
    const x = image[index].x / imageScale;
    const y = image[index].y / imageScale;
    const rows = [
      [X, Y, 1, 0, 0, 0, -X * x, -Y * x, x],
      [0, 0, 0, X, Y, 1, -X * y, -Y * y, y],
    ];
    for (const row of rows) {
      for (let r = 0; r < 8; r += 1) {
        for (let c = 0; c < 9; c += 1) normal[r][c] += row[r] * row[c];
      }
    }
  });

  // Gaussian elimination with partial pivoting.
  for (let column = 0; column < 8; column += 1) {
    let pivot = column;
    for (let r = column + 1; r < 8; r += 1) {
      if (Math.abs(normal[r][column]) > Math.abs(normal[pivot][column])) pivot = r;
    }
    [normal[column], normal[pivot]] = [normal[pivot], normal[column]];
    for (let r = 0; r < 8; r += 1) {
      if (r !== column) {
        const factor = normal[r][column] / normal[column][column];
        for (let c = column; c < 9; c += 1) normal[r][c] -= factor * normal[column][c];
      }
    }
  }
  const h = normal.map((row, r) => row[8] / row[r]);

  // Undo the scaling.
  const ratio = imageScale / moduleScale;
  return [
    h[0] * ratio, h[1] * ratio, h[2] * imageScale,
    h[3] * ratio, h[4] * ratio, h[5] * imageScale,
    h[6] / moduleScale, h[7] / moduleScale,
  ];
}

/**
 * Estimates the code's size in modules: the finder centres are 7 modules less
 * than the code apart, and sizes are 17 + 4 * version.
 */
function estimateSize([topLeft, topRight, bottomLeft]: Finder[]): number {
  const moduleSize = (topLeft.moduleSize + topRight.moduleSize + bottomLeft.moduleSize) / 3;
  const across = Math.hypot(topRight.center.x - topLeft.center.x, topRight.center.y - topLeft.center.y);
  const down = Math.hypot(bottomLeft.center.x - topLeft.center.x, bottomLeft.center.y - topLeft.center.y);
  const estimate = (across + down) / 2 / moduleSize + 7;
  return 17 + 4 * Math.min(40, Math.max(1, Math.round((estimate - 17) / 4)));
}

/**
 * Fits the transform from module positions to image positions for a code of
 * the given size, using the corners of its finders.
 */
function mapModules(finders: Finder[], size: number): number[] {
  const [topLeft, topRight, bottomLeft] = finders;
  const across = Math.hypot(topRight.center.x - topLeft.center.x, topRight.center.y - topLeft.center.y);
  const down = Math.hypot(bottomLeft.center.x - topLeft.center.x, bottomLeft.center.y - topLeft.center.y);

  // Match each finder's corners to their module positions by which side of
  // the finder's centre they are on, along the code's axes.
  const ux = (topRight.center.x - topLeft.center.x) / across;
  const uy = (topRight.center.y - topLeft.center.y) / across;
  const vx = (bottomLeft.center.x - topLeft.center.x) / down;
  const vy = (bottomLeft.center.y - topLeft.center.y) / down;
  const modules: Point[] = [];
  const image: Point[] = [];
  const origins = [{ x: 0, y: 0 }, { x: size - 7, y: 0 }, { x: 0, y: size - 7 }];
  finders.forEach((finder, index) => {
    for (const corner of finder.corners) {
      const dx = corner.x - finder.center.x;
      const dy = corner.y - finder.center.y;
      modules.push({
        x: origins[index].x + (dx * ux + dy * uy > 0 ? 7 : 0),
        y: origins[index].y + (dx * vx + dy * vy > 0 ? 7 : 0),
      });
      image.push(corner);
    }
  });
  return fitPerspective(modules, image);
}

/**
 * Samples every module of a code and splits them into dark and light.
 */
function sampleModules(region: Grey, h: number[], size: number, inverted: boolean): Modules {
  // Sample the middle of every module, away from its blurry edges.
  const values = new Float64Array(size * size);
  const offsets = [0.25, 0.5, 0.75];
  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      let sum = 0;
      for (const dy of offsets) {
        for (const dx of offsets) {
          const X = column + dx;
          const Y = row + dy;
          const w = h[6] * X + h[7] * Y + 1;
          const sourceX = Math.min(region.width - 1, Math.max(0, Math.round((h[0] * X + h[1] * Y + h[2]) / w)));
          const sourceY = Math.min(region.height - 1, Math.max(0, Math.round((h[3] * X + h[4] * Y + h[5]) / w)));
          sum += region.data[sourceY * region.width + sourceX];
        }
      }
      values[row * size + column] = sum;
    }
  }

  // Modules are either dark or light, so split halfway between the darkest
  // and lightest tenth.
  const sorted = values.slice().sort();
  const threshold = (sorted[Math.floor(sorted.length * 0.1)] + sorted[Math.floor(sorted.length * 0.9)]) / 2;
  const data = new Uint8Array(size * size);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = (inverted ? values[i] > threshold : values[i] < threshold) ? 1 : 0;
  }
  return { size, data };
}

/**
 * Maps a position in module units through a perspective transform.
 */
function project(h: number[], X: number, Y: number): Point {
  const w = h[6] * X + h[7] * Y + 1;
  return { x: (h[0] * X + h[1] * Y + h[2]) / w, y: (h[3] * X + h[4] * Y + h[5]) / w };
}

/**
 * Reads a code from the position of its finders.
 */
function readCode(region: Grey, finders: Finder[], inverted: boolean): QrCodeResult | null {
  const read = (size: number) => {
    const h = mapModules(finders, size);
    const modules = sampleModules(region, h, size, inverted);
    const text = decodeModules(modules);
    const corners = [[0, 0], [size, 0], [size, size], [0, size]];
    return {
      modules,
      result: text === null ? null : { text, corners: corners.map(([X, Y]) => region.toImage(project(h, X, Y))) },
    };
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
function readRegion(region: Grey): QrCodeResult | null {
  for (const inverted of [false, true]) {
    for (const finders of pickFinders(findFinders(binarize(region, inverted), region.width, region.height))) {
      const result = readCode(region, finders, inverted);
      if (result) {
        return result;
      }
    }
  }
  return null;
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
 */
export async function readQrCodeFromImage(source: ImageBitmapSource): Promise<QrCodeResult | null> {
  const bitmap = await createImageBitmap(source);
  try {
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
