import { averageLuminance, decodeSize } from './image';
import type { Pixels, Region } from './image';

/**
 * Finds the regions of an image that look like QR codes: areas with strong
 * contrast and lots of edges. A code is often a small part of a large image,
 * like a sticker in a Glowforge lid camera image of the whole bed, and reading
 * only these regions is faster and more reliable than reading the whole image.
 */

// A block must have at least this luminance range to be part of a code.
const MIN_BLOCK_CONTRAST = 64;
// The difference between pixels two apart that counts as an edge.
const EDGE_THRESHOLD = 40;
// The fraction of a block's pixels that must be edges.
const MIN_EDGE_DENSITY = 0.08;
// Codes span at least a few blocks each way, smaller areas are specks or
// debris.
const MIN_REGION_BLOCKS = 9;
// Find regions at no more than this size, which also averages away noise.
const DETECTION_SIZE = 1200;

// Groups that are long or large, like a code on a narrow offcut or next to the
// edge of a sheet, are also read in overlapping square tiles of this many
// blocks, so a code in them isn't shrunk to nothing. Any code up to two thirds
// of a tile fits in one of them.
const TILE_BLOCKS = 48;
const MIN_TILE_BLOCKS = 16;
// Groups no longer than this are read whole.
const MAX_ASPECT = 2;

// Limits on how much of an image is read, for images with many busy areas.
const MAX_REGIONS = 16;
const MAX_DECODE_PIXELS = 6000000;

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
 * Joins neighbouring busy blocks into groups.
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

  return groups.filter((group) => group.busyCount >= MIN_REGION_BLOCKS);
}

interface Blocks {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface Window extends Blocks {
  busyCount: number;
  // Compact groups are read first: they're cheap, and most codes on their
  // own look like one.
  compact: boolean;
}

/**
 * Plans the windows to read a group in: the whole group when it's compact, and
 * square tiles over it when it's long or large.
 */
function windowsFor(group: Blocks & { busyCount: number }, countBusy: (blocks: Blocks) => number): Window[] {
  const width = group.right - group.left + 1;
  const height = group.bottom - group.top + 1;
  const aspect = Math.max(width / height, height / width);
  if (Math.max(width, height) <= TILE_BLOCKS && aspect <= MAX_ASPECT) {
    return [{ ...group, compact: true }];
  }

  const windows: Window[] = [];
  // Long groups are still worth reading whole, in case the code fills them.
  if (aspect <= MAX_ASPECT + 1) {
    windows.push({ ...group, compact: false });
  }
  const side = Math.min(TILE_BLOCKS, Math.max(MIN_TILE_BLOCKS, Math.min(width, height)));
  const step = Math.max(1, Math.round(side / 3));
  const starts = (from: number, length: number) => {
    const last = from + Math.max(0, length - side);
    const list = [];
    for (let start = from; start < last; start += step) list.push(start);
    list.push(last);
    return list;
  };
  for (const top of starts(group.top, height)) {
    for (const left of starts(group.left, width)) {
      const tile = {
        left, top, right: left + side - 1, bottom: top + side - 1,
      };
      const busyCount = countBusy(tile);
      if (busyCount >= MIN_REGION_BLOCKS) {
        windows.push({ ...tile, busyCount, compact: false });
      }
    }
  }
  return windows;
}

/**
 * Finds the regions that look like QR codes, most likely first.
 */
export function findRegions(pixels: Pixels): Region[] {
  const { width: fullWidth, height: fullHeight } = pixels;
  // Sensor noise would otherwise look like edges everywhere.
  const factor = Math.max(1, Math.ceil(Math.max(fullWidth, fullHeight) / DETECTION_SIZE));
  const { luminance, width, height } = averageLuminance(pixels, {
    x: 0, y: 0, width: fullWidth, height: fullHeight,
  }, factor);

  const blockSize = blockSizeFor(width, height);
  const { busy, columns, rows } = findBusyBlocks(luminance, width, height, blockSize);

  // Counts busy blocks in any window, from a table of running totals.
  const totals = new Uint32Array((columns + 1) * (rows + 1));
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0, sum = 0; column < columns; column += 1) {
      sum += busy[row * columns + column];
      totals[(row + 1) * (columns + 1) + column + 1] = totals[row * (columns + 1) + column + 1] + sum;
    }
  }
  const countBusy = ({
    left, top, right, bottom,
  }: Blocks) => {
    const r = Math.min(right, columns - 1) + 1;
    const b = Math.min(bottom, rows - 1) + 1;
    const stride = columns + 1;
    return totals[b * stride + r] - totals[top * stride + r] - totals[b * stride + left] + totals[top * stride + left];
  };

  const windows = groupBlocks(busy, columns, rows)
    .flatMap((group) => windowsFor(group, countBusy))
    .sort((a, b) => Number(b.compact) - Number(a.compact) || b.busyCount - a.busyCount);

  const regions: Region[] = [];
  let pixelsLeft = MAX_DECODE_PIXELS;
  for (const window of windows) {
    // Leave room for the quiet zone around the code, in full size pixels.
    const margin = blockSize * 2;
    const x = Math.max(0, (window.left * blockSize - margin) * factor);
    const y = Math.max(0, (window.top * blockSize - margin) * factor);
    const region = {
      x,
      y,
      width: Math.min(fullWidth, ((window.right + 1) * blockSize + margin) * factor) - x,
      height: Math.min(fullHeight, ((window.bottom + 1) * blockSize + margin) * factor) - y,
    };
    const size = decodeSize(region);
    if (regions.length >= MAX_REGIONS || size * size > pixelsLeft) {
      break;
    }
    pixelsLeft -= size * size;
    regions.push(region);
  }
  return regions;
}
