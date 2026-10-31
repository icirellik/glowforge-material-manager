import {
  DEFAULT_SPEED_SPACE,
  SpeedScale,
  parseSpeedSpace,
  toRealPower,
} from './glowforgeUnits';
import type { SpeedKind, SpeedSpace } from './glowforgeUnits';
import { legacyCutSpeed, legacyEngraveSpeed } from '../material/testing/corpus';

// A Pro's printSettingsSpace as the GFUI had it on 2026-10-31.
const PRO_REPORTED = {
  cut: {
    speed_minimum: 100,
    speed_maximum: 30000,
    speed_default: 4000,
    speed_modifier: 1,
    power_multiplier: 1,
    jerk: 9259,
    use_linear_display_speed: false,
    model_type: 'pro',
  },
  engrave: {
    speed_minimum: 100,
    speed_maximum: 36500,
    speed_default: 8500,
    speed_modifier: 1,
    power_multiplier: 1,
    jerk: 9259,
    use_linear_display_speed: false,
    model_type: 'pro',
  },
  travel: {
    speed_minimum: 100,
    speed_maximum: 36500,
    speed_default: 8500,
    speed_modifier: 1,
    jerk: 9259,
    use_linear_display_speed: false,
    model_type: 'pro',
  },
  display: {
    speed_minimum: 100,
    speed_maximum: 1000,
    scale: 0.10714285714285714,
    tick: 100,
  },
  score: {
    speed_minimum: 100,
    speed_maximum: 4000,
    jerk: 9259,
    use_linear_display_speed: false,
    model_type: 'pro',
  },
  bitmap_engrave: {
    speed_minimum: 100,
    speed_maximum: 36500,
    jerk: 9259,
    use_linear_display_speed: false,
    model_type: 'pro',
  },
  vector_engrave: {
    speed_minimum: 100,
    speed_maximum: 30000,
    jerk: 9259,
    use_linear_display_speed: false,
    model_type: 'pro',
  },
};
const PRO = parseSpeedSpace(PRO_REPORTED)!;

// A faster machine that doesn't give vector or bitmap engrave limits.
const FAST: SpeedSpace = { ...PRO };
delete FAST.vector_engrave;
delete FAST.bitmap_engrave;

const LINEAR: SpeedSpace = {
  ...DEFAULT_SPEED_SPACE,
  cut: { ...DEFAULT_SPEED_SPACE.cut, use_linear_display_speed: true },
  engrave: { ...DEFAULT_SPEED_SPACE.engrave, use_linear_display_speed: true },
};

const REALS = [100, 344, 490, 1626, 2050, 4000, 8500, 9433, 30000, 36500];
const DISPLAYS = [1, 100, 140, 309, 500, 517, 1000, 3300, 4000];

type Recorded = [
  displayMinimum: number,
  scaledMaximum: number,
  realMinimum: number,
  realMaximum: number,
  toDisplay: number[],
  toReal: number[],
];

// What the GFUI's speed display model (spa-v1-27140425ba2935bf.js) gave on
// 2026-10-31 for REALS and DISPLAYS, for each kind of setting.
const PRO_CUT: Recorded = [
  100,
  3300,
  100,
  30000,
  [100, 126, 142, 263, 309, 517, 999, 1099, 3300, 3996],
  [100, 100, 473.75, 2052.84375, 3837.5, 3996.34375, 8509.375, 30000, 30000],
];
const PRO_BITMAP: Recorded = [
  100,
  4000,
  100,
  36500,
  [100, 126, 142, 264, 309, 518, 1000, 1100, 3304, 4000],
  [
    100, 100, 473.3333333333333, 2050.666666666667, 3833.333333333333, 3992,
    8500, 29966.666666666664, 36500,
  ],
];
const DEFAULT_CUT: Recorded = [
  100,
  500,
  100,
  4000,
  [100, 125, 140, 257, 300, 500, 962, 1057, 3167, 3833],
  [100, 100, 490, 2137.75, 4000, 4000, 4000, 4000, 4000],
];
const DEFAULT_ENGRAVE: Recorded = [
  100,
  1000,
  100,
  8500,
  [100, 126, 142, 264, 309, 518, 1000, 1100, 3304, 4000],
  [
    100, 100, 473.33333333333337, 2050.666666666667, 3833.333333333333, 3992,
    8500, 8500, 8500,
  ],
];
const LINEAR_CUT: Recorded = [
  7,
  266.66666666666663,
  100,
  4000,
  [7, 23, 33, 108, 137, 267, 567, 629, 2000, 2433],
  [100, 1500, 2100, 4000, 4000, 4000, 4000, 4000, 4000],
];
const LINEAR_ENGRAVE: Recorded = [
  7,
  566.6666666666666,
  100,
  8500,
  [7, 23, 33, 108, 137, 267, 567, 629, 2000, 2433],
  [100, 1500, 2100, 4635, 7500, 7755, 8500, 8500, 8500],
];

const RECORDED: [string, SpeedSpace, { [kind in SpeedKind]: Recorded }][] = [
  [
    'a Pro',
    PRO,
    { cut: PRO_CUT, score: PRO_CUT, vector: PRO_CUT, bitmap: PRO_BITMAP },
  ],
  [
    'the default',
    DEFAULT_SPEED_SPACE,
    {
      cut: DEFAULT_CUT,
      score: DEFAULT_CUT,
      vector: DEFAULT_ENGRAVE,
      bitmap: DEFAULT_ENGRAVE,
    },
  ],
  [
    'a faster machine without engrave kinds',
    FAST,
    {
      cut: PRO_CUT,
      score: PRO_CUT,
      vector: DEFAULT_ENGRAVE,
      bitmap: PRO_BITMAP,
    },
  ],
  [
    'linear display speeds',
    LINEAR,
    {
      cut: LINEAR_CUT,
      score: LINEAR_CUT,
      vector: LINEAR_ENGRAVE,
      bitmap: LINEAR_ENGRAVE,
    },
  ],
];

describe('SpeedScale', () => {
  for (const [name, space, kinds] of RECORDED) {
    describe(name, () => {
      for (const [kind, recorded] of Object.entries(kinds)) {
        const [minimum, scaledMaximum, realMinimum, realMaximum, shown, reals] =
          recorded;
        const scale = new SpeedScale(kind as SpeedKind, space);

        it(`shows ${kind} speeds as the GFUI does`, () => {
          expect(scale.displayMinimum).toBe(minimum);
          expect(scale.displayMaximum).toBe(Math.round(scaledMaximum));
          expect(REALS.map((real) => scale.toDisplay(real))).toEqual(shown);
          DISPLAYS.forEach((display, i) => {
            if (
              display >= scale.displayMinimum &&
              display <= scale.displayMaximum
            ) {
              expect(scale.toReal(display)).toBe(Math.round(reals[i]));
            }
          });
          expect(scale.toReal(scale.displayMinimum)).toBeGreaterThanOrEqual(
            realMinimum,
          );
          expect(scale.toReal(scale.displayMaximum)).toBe(realMaximum);
        });

        it(`keeps every ${kind} number shown`, () => {
          for (
            let display = scale.displayMinimum;
            display <= scale.displayMaximum;
            display += 1
          ) {
            const real = scale.toReal(display);
            expect(Number.isInteger(real)).toBe(true);
            expect(scale.toDisplay(real)).toBe(display);
          }
        });
      }
    });
  }

  it('gives numbers outside the range shown speeds outside the machine range', () => {
    const scale = new SpeedScale('cut', PRO);
    expect(scale.toReal(3301)).toBeGreaterThan(30000);
    expect(scale.toReal(99)).toBeLessThan(100);
    // While typing 300, the 3 stays a 3.
    expect(scale.toDisplay(scale.toReal(3))).toBe(3);
  });

  it('takes whether cut and score speeds are linear from the engrave limits', () => {
    // The GFUI's manual settings for a cut step, recorded on 2026-10-31.
    const engraveLinear: SpeedSpace = {
      ...DEFAULT_SPEED_SPACE,
      engrave: {
        ...DEFAULT_SPEED_SPACE.engrave,
        use_linear_display_speed: true,
      },
    };
    const cutLinear: SpeedSpace = {
      ...DEFAULT_SPEED_SPACE,
      cut: { ...DEFAULT_SPEED_SPACE.cut, use_linear_display_speed: true },
    };
    for (const kind of ['cut', 'score'] as const) {
      const linear = new SpeedScale(kind, engraveLinear);
      expect([linear.displayMinimum, linear.displayMaximum]).toEqual([7, 267]);
      expect(linear.toDisplay(4000)).toBe(267);
      const notLinear = new SpeedScale(kind, cutLinear);
      expect([notLinear.displayMinimum, notLinear.displayMaximum]).toEqual([
        100, 500,
      ]);
      expect(notLinear.toDisplay(4000)).toBe(500);
    }
  });

  it('shows materials from 0.4.10 as it did, without machine speeds', () => {
    const cut = new SpeedScale('cut');
    for (let display = 100; display <= 500; display += 1) {
      expect(cut.toDisplay(legacyCutSpeed(display))).toBe(display);
    }
    for (const kind of ['vector', 'bitmap'] as const) {
      const engrave = new SpeedScale(kind);
      for (let display = 100; display <= 1000; display += 1) {
        expect(engrave.toDisplay(legacyEngraveSpeed(display))).toBe(display);
      }
    }
  });
});

describe('parseSpeedSpace', () => {
  it('keeps only what the conversions use', () => {
    expect(PRO).toEqual({
      cut: {
        speed_minimum: 100,
        speed_maximum: 30000,
        use_linear_display_speed: false,
        model_type: 'pro',
      },
      engrave: {
        speed_minimum: 100,
        speed_maximum: 36500,
        use_linear_display_speed: false,
        model_type: 'pro',
      },
      vector_engrave: {
        speed_minimum: 100,
        speed_maximum: 30000,
        use_linear_display_speed: false,
        model_type: 'pro',
      },
      bitmap_engrave: {
        speed_minimum: 100,
        speed_maximum: 36500,
        use_linear_display_speed: false,
        model_type: 'pro',
      },
      display: { speed_minimum: 100, scale: 0.10714285714285714, tick: 100 },
    });
    expect(parseSpeedSpace(DEFAULT_SPEED_SPACE)).toEqual(DEFAULT_SPEED_SPACE);
  });

  it('treats a null flag or model as not set, as the GFUI does', () => {
    const space = structuredClone(PRO_REPORTED) as unknown as {
      cut: { [key: string]: unknown };
    };
    space.cut.use_linear_display_speed = null;
    space.cut.model_type = null;
    expect(parseSpeedSpace(space)?.cut).toEqual({
      speed_minimum: 100,
      speed_maximum: 30000,
    });
  });

  it('rejects anything else', () => {
    const broken = (change: (space: typeof PRO_REPORTED) => unknown) =>
      parseSpeedSpace(change(structuredClone(PRO_REPORTED)));
    expect(parseSpeedSpace(null)).toBeNull();
    expect(parseSpeedSpace('fast')).toBeNull();
    expect(broken((space) => ({ ...space, cut: undefined }))).toBeNull();
    expect(broken((space) => ({ ...space, display: undefined }))).toBeNull();
    expect(
      broken((space) => ({
        ...space,
        cut: { ...space.cut, speed_maximum: 50 },
      })),
    ).toBeNull();
    expect(
      broken((space) => ({
        ...space,
        engrave: { ...space.engrave, speed_maximum: Infinity },
      })),
    ).toBeNull();
    // Too narrow to show: 100 to 300 rounds to a display of 100 to 100.
    expect(
      broken((space) => ({
        ...space,
        cut: { ...space.cut, speed_maximum: 300 },
      })),
    ).toBeNull();
    expect(
      broken((space) => ({
        ...space,
        display: { ...space.display, tick: 0 },
      })),
    ).toBeNull();
    expect(
      broken((space) => ({
        ...space,
        display: { ...space.display, scale: '0.1' },
      })),
    ).toBeNull();
    expect(
      broken((space) => ({
        ...space,
        vector_engrave: { speed_minimum: 100 },
      })),
    ).toBeNull();
    expect(
      broken((space) => ({
        ...space,
        cut: { ...space.cut, use_linear_display_speed: 'no' },
      })),
    ).toBeNull();
  });
});

describe('toRealPower', () => {
  // The GFUI shows a power as round(power / 99 * 100), and 100 as Full.
  it('is the inverse of what the GFUI shows', () => {
    expect(toRealPower(100)).toEqual(99);
    expect(toRealPower(75)).toEqual(74.25);
    expect(toRealPower(50)).toEqual(49.5);
    expect(toRealPower(25)).toEqual(24.75);
    expect(toRealPower(1)).toEqual(0.99);
    for (let display = 1; display <= 100; display += 1) {
      expect(Math.round((toRealPower(display) / 99) * 100)).toBe(display);
    }
  });
});
