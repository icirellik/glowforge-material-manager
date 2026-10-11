import type { Grey, Point } from './image';

/**
 * Finds QR codes' finder patterns, the three squares in their corners, and
 * picks the sets of three that could be one code.
 */

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
export function binarize({ data, width, height }: Grey, inverted: boolean): Uint8Array {
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

export interface Component {
  label: number;
  count: number;
  // Sums of the pixels' positions, for the centroid.
  sumX: number;
  sumY: number;
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
        label: components.length + 1,
        count: 0,
        sumX: 0,
        sumY: 0,
        left: width,
        top: height,
        right: 0,
        bottom: 0,
        touchesEdge: false,
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
        component.sumX += x;
        component.sumY += y;
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

// A region split into dark and light, with its groups of dark pixels.
export interface Binary {
  dark: Uint8Array;
  width: number;
  height: number;
  // Every pixel's group, from 1, or 0 for light pixels.
  labels: Int32Array;
  components: Component[];
}

/**
 * Splits a region into dark and light and finds its groups of dark pixels.
 */
export function toBinary(grey: Grey, inverted: boolean): Binary {
  const dark = binarize(grey, inverted);
  const { labels, components } = findComponents(dark, grey.width, grey.height);
  return {
    dark, width: grey.width, height: grey.height, labels, components,
  };
}

/**
 * The centre of a group of pixels.
 */
export function centroid(component: Component): Point {
  return { x: component.sumX / component.count + 0.5, y: component.sumY / component.count + 0.5 };
}

export interface Finder {
  // The centre of its middle 3 x 3 modules.
  center: Point;
  // Its outside corners.
  corners: Point[];
  moduleSize: number;
  // How far its shape is from an ideal finder, 0 is perfect.
  irregularity: number;
}

// In a finder, the dark ring covers 24 of 49 modules and the middle is 3 of 7
// modules wide.
const RING_FILL = 24 / 49;
const MIDDLE_RATIO = 3 / 7;

/**
 * Finds QR finder patterns: a dark ring around a solid dark centre, which the
 * QR standard always surrounds with light modules so they stand alone.
 */
export function findFinders({
  width, labels, components,
}: Binary): Finder[] {
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
    let middle: Component | undefined;
    for (const [dx, dy] of nudges) {
      const label = labels[Math.round(middleY + dy) * width + Math.round(middleX + dx)];
      if (label && label !== ring.label) {
        middle = components[label - 1];
        break;
      }
    }
    if (!middle || middle.count < 9) {
      continue;
    }
    const ratio = (middle.right - middle.left + 1) / ringWidth;
    if (Math.abs((middle.left + middle.right) / 2 - middleX) > ringWidth * 0.15
      || Math.abs((middle.top + middle.bottom) / 2 - middleY) > ringHeight * 0.15
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
        center: centroid(middle),
        corners,
        // A finder is 7 modules wide.
        moduleSize: perimeter / 28,
        irregularity: Math.abs(Math.log(ringWidth / ringHeight)) + Math.abs(fill - RING_FILL) + Math.abs(ratio - MIDDLE_RATIO),
      });
    }
  }
  return finders;
}

// At most this many finders are matched into sets, the most regular ones,
// which bounds the work on images with lots of finder-like squares.
const MAX_FINDER_CANDIDATES = 30;
// How far from square the finders can be, as tilting a code squashes it and
// changes its angles.
const MAX_FINDER_COSINE = 0.6;
const MAX_FINDER_ASPECT = 3;
// Try a few sets of finders, the decoder rejects the wrong ones.
const MAX_FINDER_SETS = 3;

/**
 * Whether two finders could be in the same code: similar module sizes, and at
 * least the 7 modules apart that the smallest codes' finders are, allowing for
 * tilt.
 */
function couldPair(a: Finder, b: Finder): boolean {
  const smaller = Math.min(a.moduleSize, b.moduleSize);
  return Math.max(a.moduleSize, b.moduleSize) / smaller <= 2
    && Math.hypot(a.center.x - b.center.x, a.center.y - b.center.y) >= smaller * 6;
}

/**
 * Picks sets of three finders that could belong to one code, closest to a
 * square first, each as the top left, top right and bottom left of the code.
 */
export function pickFinders(found: Finder[]): Finder[][] {
  const finders = found.length > MAX_FINDER_CANDIDATES
    ? [...found].sort((a, b) => a.irregularity - b.irregularity).slice(0, MAX_FINDER_CANDIDATES)
    : found;
  const count = finders.length;
  const pairs = new Uint8Array(count * count);
  for (let i = 0; i < count; i += 1) {
    for (let j = i + 1; j < count; j += 1) {
      if (couldPair(finders[i], finders[j])) {
        pairs[i * count + j] = 1;
        pairs[j * count + i] = 1;
      }
    }
  }

  // The best sets so far, best first.
  const best: { finders: Finder[], score: number }[] = [];
  const consider = (set: Finder[], score: number) => {
    if (best.length === MAX_FINDER_SETS && score >= best[best.length - 1].score) {
      return;
    }
    let index = best.length;
    while (index > 0 && best[index - 1].score > score) index -= 1;
    best.splice(index, 0, { finders: set, score });
    if (best.length > MAX_FINDER_SETS) best.pop();
  };

  for (let i = 0; i < count; i += 1) {
    for (let j = i + 1; j < count; j += 1) {
      if (pairs[i * count + j]) {
        for (let k = j + 1; k < count; k += 1) {
          if (pairs[i * count + k] && pairs[j * count + k]) {
            const triple = [finders[i], finders[j], finders[k]];
            // The top left finder is usually the corner closest to a right
            // angle, but not always when the code is tilted, so each corner is
            // a set.
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
              // size, which is an average of both directions, being off when
              // the code is tilted.
              if (u >= topLeft.moduleSize * 7 && v >= topLeft.moduleSize * 7
                && cosine < MAX_FINDER_COSINE && aspect < Math.log(MAX_FINDER_ASPECT)) {
                // Clockwise on screen, like a code that isn't mirrored.
                // Mirrored codes come out transposed, which the decoder undoes.
                if (ux * vy - uy * vx < 0) {
                  [topRight, bottomLeft] = [bottomLeft, topRight];
                }
                consider([topLeft, topRight, bottomLeft], cosine + aspect);
              }
            }
          }
        }
      }
    }
  }
  return best.map((set) => set.finders);
}
