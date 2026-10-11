// @vitest-environment node
import { encodeQrCode } from './encodeQrCode';
import { findFinders, pickFinders, toBinary } from './finders';
import { greyOf } from './testing';
import {
  fitPerspective,
  mapFinderCorners,
  project,
  refineWithAlignment,
} from './perspective';
import { alignmentCenters } from './spec';

describe('fitPerspective', () => {
  it('recovers a perspective transform from its points', () => {
    const h = [3.1, 0.4, 120, -0.3, 2.7, 80, 0.0009, -0.0006];
    const modules = [
      [0, 0],
      [40, 0],
      [40, 40],
      [0, 40],
      [20, 10],
      [5, 33],
    ].map(([x, y]) => ({ x, y }));
    const fitted = fitPerspective(
      modules,
      modules.map(({ x, y }) => project(h, x, y)),
    );
    for (const { x, y } of [
      { x: 13, y: 27 },
      { x: 39, y: 2 },
    ]) {
      const expected = project(h, x, y);
      const actual = project(fitted, x, y);
      expect(actual.x).toBeCloseTo(expected.x, 6);
      expect(actual.y).toBeCloseTo(expected.y, 6);
    }
  });
});

describe('refineWithAlignment', () => {
  it('corrects a transform from the alignment patterns', () => {
    // A version 7 code, 5 pixels a module, after a 4 module margin.
    const modules = encodeQrCode('x', { version: 7 });
    const grey = greyOf(modules, 5);
    const binary = toBinary(grey, false);
    const [finders] = pickFinders(findFinders(binary));
    const truth = (X: number, Y: number) => ({
      x: (X + 4) * 5,
      y: (Y + 4) * 5,
    });

    // The finders' corners are right here, so skew them a little, like blur
    // would, and check the alignment patterns undo it.
    const skewed = mapFinderCorners(finders, modules.size).map(
      (value, index) => (index === 1 ? value + 0.08 : value),
    );
    const refined = refineWithAlignment(skewed, finders, modules.size, binary)!;
    for (const [row, column] of alignmentCenters(7)) {
      const expected = truth(column + 0.5, row + 0.5);
      const actual = project(refined, column + 0.5, row + 0.5);
      expect(
        Math.hypot(actual.x - expected.x, actual.y - expected.y),
      ).toBeLessThan(0.75);
    }
  });

  it('gives up on codes without alignment patterns', () => {
    const modules = encodeQrCode('x', { version: 1 });
    const binary = toBinary(greyOf(modules, 5), false);
    const [finders] = pickFinders(findFinders(binary));
    expect(
      refineWithAlignment(mapFinderCorners(finders, 21), finders, 21, binary),
    ).toBeNull();
  });
});
