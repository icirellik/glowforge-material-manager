import { centroid } from './finders';
import type { Binary, Finder } from './finders';
import type { Point } from './image';
import { alignmentCenters } from './spec';

/**
 * Works out where a code's modules are in an image, from its finder patterns
 * and, in larger codes, its alignment patterns.
 */

/**
 * Maps a position in module units through a perspective transform.
 */
export function project(h: number[], X: number, Y: number): Point {
  const w = h[6] * X + h[7] * Y + 1;
  return { x: (h[0] * X + h[1] * Y + h[2]) / w, y: (h[3] * X + h[4] * Y + h[5]) / w };
}

/**
 * Solves the perspective transform that best maps module coordinates onto
 * image coordinates, by least squares.
 *
 * @returns The transform's coefficients, x = (h0 X + h1 Y + h2) / (h6 X + h7 Y + 1)
 * and y = (h3 X + h4 Y + h5) / (h6 X + h7 Y + 1) for module position X, Y.
 */
export function fitPerspective(modules: Point[], image: Point[]): number[] {
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
export function estimateSize([topLeft, topRight, bottomLeft]: Finder[]): number {
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
export function mapFinderCorners(finders: Finder[], size: number): number[] {
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
 * Looks for an alignment pattern, a dark dot in a light ring in a dark ring,
 * near where the transform puts it.
 *
 * @returns Its centre, or null if it isn't there.
 */
function findAlignment({
  dark, width, height, labels, components,
}: Binary, h: number[], X: number, Y: number): Point | null {
  const predicted = project(h, X, Y);
  // A module's steps across and down at this spot.
  const across = project(h, X + 1, Y);
  const down = project(h, X, Y + 1);
  const ux = across.x - predicted.x;
  const uy = across.y - predicted.y;
  const vx = down.x - predicted.x;
  const vy = down.y - predicted.y;
  const moduleSize = (Math.hypot(ux, uy) + Math.hypot(vx, vy)) / 2;
  if (!(moduleSize >= 1)) {
    return null;
  }
  const isDark = (x: number, y: number) => {
    const column = Math.floor(x);
    const row = Math.floor(y);
    return column >= 0 && row >= 0 && column < width && row < height && dark[row * width + column] === 1;
  };

  // Look for the dot within a few modules of where it should be.
  const radius = Math.ceil(moduleSize * 2.5);
  const seen = new Set<number>();
  let best: Point | null = null;
  let bestDistance = Infinity;
  const top = Math.max(0, Math.floor(predicted.y - radius));
  const bottom = Math.min(height - 1, Math.ceil(predicted.y + radius));
  const left = Math.max(0, Math.floor(predicted.x - radius));
  const right = Math.min(width - 1, Math.ceil(predicted.x + radius));
  for (let row = top; row <= bottom; row += 1) {
    for (let column = left; column <= right; column += 1) {
      const label = labels[row * width + column];
      if (label && !seen.has(label)) {
        seen.add(label);
        const dot = components[label - 1];
        const dotWidth = dot.right - dot.left + 1;
        const dotHeight = dot.bottom - dot.top + 1;
        if (dotWidth <= moduleSize * 2 && dotHeight <= moduleSize * 2
          && dot.count >= moduleSize * moduleSize * 0.25 && dot.count <= moduleSize * moduleSize * 2.5) {
          const center = centroid(dot);
          const distance = Math.hypot(center.x - predicted.x, center.y - predicted.y);
          // Light a module away in every direction, dark two away.
          const ring = (steps: number) => [[ux, uy], [-ux, -uy], [vx, vy], [-vx, -vy]]
            .filter(([dx, dy]) => isDark(center.x + dx * steps, center.y + dy * steps)).length;
          if (distance < bestDistance && ring(1) === 0 && ring(2) >= 3) {
            best = center;
            bestDistance = distance;
          }
        }
      }
    }
  }
  return best;
}

/**
 * Refits a code's transform from the centres of its finders and alignment
 * patterns. Unlike the finders' corners, centres don't move when the image is
 * blurry or the split into dark and light is off, which matters in large codes
 * where a small error at the finders grows across the code.
 *
 * @returns The refined transform, or null if no alignment pattern was found.
 */
export function refineWithAlignment(h: number[], finders: Finder[], size: number, binary: Binary): number[] | null {
  const version = (size - 17) / 4;
  const modules: Point[] = [{ x: 3.5, y: 3.5 }, { x: size - 3.5, y: 3.5 }, { x: 3.5, y: size - 3.5 }];
  const image = finders.map((finder) => finder.center);
  // Nearest the finders first, so each fit improves the guess for the next.
  const centers = alignmentCenters(version).sort((a, b) => a[0] + a[1] - b[0] - b[1]);
  let current = h;
  for (const [row, column] of centers) {
    const found = findAlignment(binary, current, column + 0.5, row + 0.5);
    if (found) {
      modules.push({ x: column + 0.5, y: row + 0.5 });
      image.push(found);
      current = fitPerspective(modules, image);
    }
  }
  return modules.length > 3 ? current : null;
}
