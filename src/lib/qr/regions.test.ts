// @vitest-environment node
import { createCanvas } from 'canvas';
import { encodeQrCode } from './encodeQrCode';
import { findRegions } from './regions';
import { greyOf } from './testing';

function bed() {
  const canvas = createCanvas(2304, 1382);
  const context = canvas.getContext('2d');
  context.fillStyle = 'rgb(14, 14, 12)';
  context.fillRect(0, 0, canvas.width, canvas.height);
  return { canvas, context };
}

/**
 * Draws a code, light on the dark bed.
 */
function drawCode(
  context: ReturnType<typeof bed>['context'],
  left: number,
  top: number,
  moduleSize = 5,
) {
  const grey = greyOf(encodeQrCode('Custom:abc1234'), moduleSize, 2);
  const image = context.createImageData(grey.width, grey.height);
  grey.data.forEach((value, index) =>
    image.data.set([value, value, value, 255], index * 4),
  );
  context.putImageData(image, left, top);
  return { width: grey.width, height: grey.height };
}

const contains = (
  region: { x: number; y: number; width: number; height: number },
  left: number,
  top: number,
  size: number,
) =>
  region.x <= left &&
  region.y <= top &&
  region.x + region.width >= left + size &&
  region.y + region.height >= top + size;

describe('findRegions', () => {
  it('reads long busy areas in square tiles', () => {
    const { canvas, context } = bed();
    context.fillStyle = 'rgb(205, 185, 150)';
    context.fillRect(200, 640, 1900, 165);
    const { width } = drawCode(context, 1200, 650);
    const regions = findRegions(
      context.getImageData(0, 0, canvas.width, canvas.height),
    );
    expect(regions.length).toBeGreaterThan(1);
    // None of them is the whole strip, and one holds the code with its margin.
    for (const region of regions) {
      expect(
        Math.max(region.width / region.height, region.height / region.width),
      ).toBeLessThan(3.5);
    }
    expect(regions.some((region) => contains(region, 1200, 650, width))).toBe(
      true,
    );
  });

  it('reads compact areas first', () => {
    const { canvas, context } = bed();
    // A large sheet with busy edges, and a code on its own.
    context.strokeStyle = 'rgb(205, 185, 150)';
    context.lineWidth = 6;
    context.strokeRect(100, 100, 1500, 1100);
    const { width } = drawCode(context, 1900, 600);
    const [first] = findRegions(
      context.getImageData(0, 0, canvas.width, canvas.height),
    );
    expect(contains(first, 1900, 600, width)).toBe(true);
  });

  it('limits how much of a busy image is read', () => {
    const { canvas, context } = bed();
    for (let i = 0; i < 60; i += 1)
      drawCode(context, 30 + (i % 12) * 185, 40 + Math.floor(i / 12) * 270);
    expect(
      findRegions(context.getImageData(0, 0, canvas.width, canvas.height))
        .length,
    ).toBeLessThanOrEqual(16);
  });
});
