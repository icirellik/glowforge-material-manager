import { roundToNearest5 } from './roundToNearest5';

const MILLIMETERS_IN_INCH = 25.4;
const STEP_SIZE = 0.01875;
const STANDARD_SCAN_GAP_INCHES = STEP_SIZE / MILLIMETERS_IN_INCH;

const MAX_POWER = 100;
const MIN_POWER = 1;

/**
 * A simple helper function to clamp a value into a fixed range.
 *
 * @param value The value to clamp.
 * @param min The min value.
 * @param max The max value.
 */
export function clamp(value: number, min: number, max: number) {
  if (value > max) {
    return max;
  }
  if (value < min) {
    return min;
  }
  return value;
}

/**
 * A machine's speed limits for one kind of movement, as the GFUI keeps them.
 */
export interface SpeedLimits {
  speed_minimum: number;
  speed_maximum: number;
  use_linear_display_speed?: boolean;
  model_type?: string;
}

/**
 * The speeds a machine allows and how the GFUI shows them, from the GFUI's
 * `machines.machineMap.<serial>.printSettingsSpace`. A Pro with the faster
 * speeds allows cuts up to 30000 and engraves up to 36500, for example.
 */
export interface SpeedSpace {
  cut: SpeedLimits;
  engrave: SpeedLimits;
  vector_engrave?: SpeedLimits;
  bitmap_engrave?: SpeedLimits;
  display: { speed_minimum: number; scale: number; tick: number };
}

/**
 * The GFUI's speeds for a machine that doesn't give its own: cuts and scores
 * from 100 to 4000, shown as 100 to 500, and engraves from 100 to 8500, shown
 * as 100 to 1000.
 */
export const DEFAULT_SPEED_SPACE: SpeedSpace = {
  cut: { speed_minimum: 100, speed_maximum: 4000 },
  engrave: { speed_minimum: 100, speed_maximum: 8500 },
  display: { speed_minimum: 100, scale: 0.10714285714285714, tick: 100 },
};

export type SpeedKind = 'cut' | 'score' | 'vector' | 'bitmap';

// Machines with linear display speeds show 600 for every 9000.
const LINEAR_DISPLAY_SCALE = 600 / 9000;

function roundTo(value: number, step: number) {
  return Math.round(value / step) * step;
}

/**
 * Picks the limits the GFUI's manual settings use for a kind of setting.
 * Scores use the cut limits, though whether their speeds are linear comes
 * from the engrave limits, as it does for cuts. A faster machine that doesn't
 * give vector engrave limits uses the default engrave limits for them.
 */
function limitsFor(kind: SpeedKind, space: SpeedSpace) {
  if (kind === 'cut' || kind === 'score') {
    const limits: SpeedLimits = {
      speed_minimum: space.cut.speed_minimum,
      speed_maximum: space.cut.speed_maximum,
    };
    if (space.engrave.use_linear_display_speed !== undefined) {
      limits.use_linear_display_speed = space.engrave.use_linear_display_speed;
    }
    return { limits, display: space.display };
  }
  if (kind === 'bitmap') {
    return {
      limits: space.bitmap_engrave ?? space.engrave,
      display: space.display,
    };
  }
  if (space.vector_engrave) {
    return { limits: space.vector_engrave, display: space.display };
  }
  const { engrave } = space;
  const faster = !(
    engrave.model_type?.includes('hd_') ||
    engrave.use_linear_display_speed ||
    engrave.speed_maximum <= DEFAULT_SPEED_SPACE.engrave.speed_maximum
  );
  return faster
    ? {
        limits: DEFAULT_SPEED_SPACE.engrave,
        display: DEFAULT_SPEED_SPACE.display,
      }
    : { limits: engrave, display: space.display };
}

/**
 * Converts between a machine's speeds and the numbers the GFUI shows for
 * them, the way the GFUI's own speed display model does.
 */
export class SpeedScale {
  // The range the GFUI shows.
  readonly displayMinimum: number;
  readonly displayMaximum: number;

  private readonly realMinimum: number;
  private readonly realMaximum: number;
  private readonly scaledMinimum: number;
  private readonly scaledMaximum: number;
  private readonly linear: boolean;

  constructor(kind: SpeedKind, space: SpeedSpace = DEFAULT_SPEED_SPACE) {
    const { limits, display } = limitsFor(kind, space);
    this.realMinimum = limits.speed_minimum;
    this.realMaximum = limits.speed_maximum;
    this.linear = !!limits.use_linear_display_speed;
    this.scaledMinimum = display.speed_minimum;
    this.scaledMaximum = roundTo(
      display.scale * (this.realMaximum - this.realMinimum) +
        display.speed_minimum,
      display.tick,
    );
    if (this.linear) {
      this.scaledMaximum = (this.realMaximum / 9000) * 600;
      this.scaledMinimum = Math.max(
        Math.round((this.scaledMaximum / this.realMaximum) * this.realMinimum),
        1,
      );
    }
    this.displayMinimum = this.scaledMinimum;
    this.displayMaximum = this.toDisplay(this.realMaximum);
  }

  toDisplay(real: number): number {
    return Math.round(
      this.linear
        ? Math.max(real * LINEAR_DISPLAY_SCALE, 1)
        : ((real - this.realMinimum) / (this.realMaximum - this.realMinimum)) *
            (this.scaledMaximum - this.scaledMinimum) +
            this.scaledMinimum,
    );
  }

  /**
   * The machine's speed for a number shown, to the nearest whole number,
   * which still shows as the same number. A number outside the range shown
   * gives a speed outside the machine's, rather than the GFUI's nearest
   * limit, so that a number being typed doesn't jump and the editor can say
   * it's out of range.
   */
  toReal(display: number): number {
    let real = this.linear
      ? display / LINEAR_DISPLAY_SCALE
      : ((display - this.scaledMinimum) /
          (this.scaledMaximum - this.scaledMinimum)) *
          (this.realMaximum - this.realMinimum) +
        this.realMinimum;
    if (display >= this.displayMinimum && display <= this.displayMaximum) {
      real = clamp(real, this.realMinimum, this.realMaximum);
    }
    return Math.round(real);
  }
}

function parseLimits(value: unknown): SpeedLimits | null {
  if (typeof value !== 'object' || value === null) return null;
  const { speed_minimum, speed_maximum, use_linear_display_speed, model_type } =
    value as { [key: string]: unknown };
  if (
    typeof speed_minimum !== 'number' ||
    typeof speed_maximum !== 'number' ||
    !(speed_minimum > 0) ||
    !(speed_maximum > speed_minimum) ||
    !Number.isFinite(speed_maximum) ||
    // The GFUI treats a missing or null flag or model as not set.
    (use_linear_display_speed != null &&
      typeof use_linear_display_speed !== 'boolean') ||
    (model_type != null && typeof model_type !== 'string')
  ) {
    return null;
  }
  const limits: SpeedLimits = { speed_minimum, speed_maximum };
  if (use_linear_display_speed != null) {
    limits.use_linear_display_speed = use_linear_display_speed;
  }
  if (model_type != null) limits.model_type = model_type.slice(0, 64);
  return limits;
}

/**
 * Checks a speed space reported by a Glowforge page, and keeps only what the
 * conversions use. Returns null if it isn't one.
 */
export function parseSpeedSpace(value: unknown): SpeedSpace | null {
  if (typeof value !== 'object' || value === null) return null;
  const space = value as { [key: string]: unknown };
  const cut = parseLimits(space.cut);
  const engrave = parseLimits(space.engrave);
  const display = space.display as { [key: string]: unknown } | null;
  if (!cut || !engrave || typeof display !== 'object' || display === null) {
    return null;
  }
  const { speed_minimum, scale, tick } = display;
  if (
    typeof speed_minimum !== 'number' ||
    typeof scale !== 'number' ||
    typeof tick !== 'number' ||
    !(speed_minimum > 0 && speed_minimum < 1e6) ||
    !(scale > 0 && scale < 1e6) ||
    !(tick > 0 && tick < 1e6)
  ) {
    return null;
  }
  const parsed: SpeedSpace = {
    cut,
    engrave,
    display: { speed_minimum, scale, tick },
  };
  for (const key of ['vector_engrave', 'bitmap_engrave'] as const) {
    if (space[key] !== undefined && space[key] !== null) {
      const limits = parseLimits(space[key]);
      if (!limits) return null;
      parsed[key] = limits;
    }
  }
  // Every kind needs a range to show, which a range of real speeds too
  // narrow for one step of the display doesn't have.
  const kinds: SpeedKind[] = ['cut', 'score', 'vector', 'bitmap'];
  for (const kind of kinds) {
    const scale = new SpeedScale(kind, parsed);
    if (
      !Number.isFinite(scale.displayMaximum) ||
      !(scale.displayMaximum > scale.displayMinimum)
    ) {
      return null;
    }
  }
  return parsed;
}

// Power conversion settings.
export function toDisplayPower(power: number) {
  return Math.round((power / (MAX_POWER - MIN_POWER)) * MAX_POWER);
}

export function toRealPower(displayPower: number) {
  return (displayPower / MAX_POWER) * (MAX_POWER - 1);
}

// Lines per inch.
export function toDisplayLinesPerInch(scanGap: number) {
  if (!scanGap || scanGap < 0) {
    return 0;
  }
  return roundToNearest5(1 / (scanGap * STANDARD_SCAN_GAP_INCHES));
}

export function toRealLinesPerInch(scanGap: number) {
  return Math.round(1 / (scanGap * STANDARD_SCAN_GAP_INCHES));
}

export function toSteps(linesPerInch: number) {
  return Math.round(1 / linesPerInch / STANDARD_SCAN_GAP_INCHES);
}

export function toDisplayPowerWords(power: number) {
  return power === 100 ? 'Max' : toDisplayPower(power);
}
