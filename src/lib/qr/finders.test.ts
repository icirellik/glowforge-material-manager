// @vitest-environment node
import { encodeQrCode } from './encodeQrCode';
import { findFinders, pickFinders, toBinary } from './finders';
import type { Finder } from './finders';
import { greyOf } from './testing';

const finderAt = (
  x: number,
  y: number,
  moduleSize = 4,
  irregularity = 0,
): Finder => ({
  center: { x, y },
  corners: [],
  moduleSize,
  irregularity,
});

describe('findFinders', () => {
  it('finds the three finders and their centres', () => {
    const grey = greyOf(encodeQrCode('Custom:abc1234'), 6);
    const centers = findFinders(toBinary(grey, false))
      .map(({ center }) => [center.x, center.y])
      .sort((a, b) => a[1] - b[1] || a[0] - b[0]);
    // Module 3.5 or 17.5 of the 21, after a 4 module margin, 6 pixels a
    // module.
    expect(centers).toEqual([
      [45, 45],
      [129, 45],
      [45, 129],
    ]);
  });
});

describe('pickFinders', () => {
  it('orders a set clockwise from the top left', () => {
    const topLeft = finderAt(100, 100);
    const topRight = finderAt(300, 100);
    const bottomLeft = finderAt(100, 300);
    expect(pickFinders([bottomLeft, topRight, topLeft])[0]).toEqual([
      topLeft,
      topRight,
      bottomLeft,
    ]);
  });

  it('leaves out finders of very different sizes, or too close together', () => {
    expect(
      pickFinders([
        finderAt(100, 100),
        finderAt(300, 100),
        finderAt(100, 300, 10),
      ]),
    ).toEqual([]);
    expect(
      pickFinders([finderAt(100, 100), finderAt(110, 100), finderAt(100, 110)]),
    ).toEqual([]);
  });

  it('bounds the work with many candidates', () => {
    // A grid of 400 identical finders has tens of millions of triples.
    const grid = Array.from({ length: 400 }, (_, i) =>
      finderAt(20 + (i % 20) * 39, 20 + Math.floor(i / 20) * 39, 1, 0.1),
    );
    const code = [
      finderAt(1000, 1000, 1),
      finderAt(1100, 1000, 1),
      finderAt(1000, 1100, 1),
    ];
    const started = performance.now();
    const sets = pickFinders([...grid, ...code]);
    expect(performance.now() - started).toBeLessThan(500);
    expect(sets.length).toBeLessThanOrEqual(3);
    // The most regular finders are kept, here the code's.
    expect(sets[0]).toEqual(code);
  });
});
