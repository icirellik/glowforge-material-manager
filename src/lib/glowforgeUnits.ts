import {
  roundToNearest5,
} from './utils';

const MAX_MOTOR_SPEED = 8500;
const MIN_UI_SPEED = 100;
const MAX_UI_SPEED = 1000;

const MILLIMETERS_IN_INCH = 25.4;
const STEP_SIZE = .01875;
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
function clamp(value: number, min: number, max: number) {
  if (value > max) {
    return max;
  } else if (value < min) {
    return min;
  }
  return value;
}

/**
 * Best guess is that this is the maximum vertical rampup speed. It makes sense
 * that this value could be higher for emgraves as there is no y axis motion
 */
function getMaxVRSpeed(minSpeed: number, maxSpeed: number) {
  const speedDifference = maxSpeed - minSpeed;
  const uiSpeedRange = MAX_UI_SPEED - MIN_UI_SPEED
  const vrSpeed = speedDifference / MAX_MOTOR_SPEED * uiSpeedRange + MIN_UI_SPEED;
  return clamp(100 * Math.round(vrSpeed / 100), minSpeed, maxSpeed);
}

/**
 * Converts a Glowforge internal speed to the GFUI Speed.
 */
function toDisplaySpeed(rawSpeed: number, minSpeed: number, maxSpeed: number) {
  const maxVRSpeed = getMaxVRSpeed(minSpeed, maxSpeed) - MIN_UI_SPEED;
  const speed = (rawSpeed - minSpeed) / (maxSpeed - minSpeed) * maxVRSpeed + MIN_UI_SPEED;
  return clamp(Math.round(speed), minSpeed, maxSpeed);
}

/**
 * Converts a Glowforge UI speed to a Glowforge internal speed.
 */
function toRealSpeed(displaySpeed: number, minSpeed: number, maxSpeed: number) {
  return clamp((displaySpeed - minSpeed) / (getMaxVRSpeed(minSpeed, maxSpeed) - MIN_UI_SPEED) * (maxSpeed - minSpeed) + minSpeed, minSpeed, maxSpeed);
}

// Engrave conversion settings.
export function toDisplayEngraveSpeed(rawSpeed: number) {
  return toDisplaySpeed(rawSpeed, 100, 8500);
}

export function toRealEngraveSpeed(displaySpeed: number) {
  return toRealSpeed(displaySpeed, 100, 8500);
}

// Cut conversion settings.
export function toDisplayCutSpeed(rawSpeed: number) {
  return toDisplaySpeed(rawSpeed, 100, 4000);
}

export function toRealCutSpeed(displaySpeed: number) {
  return toRealSpeed(displaySpeed, 100, 4000);
}

// Power conversion settings.
export function toDisplayPower(power: number) {
  return Math.round(power / (MAX_POWER - MIN_POWER) * MAX_POWER);
}

export function toRealPower(displayPower: number) {
  return displayPower / MAX_POWER * (MAX_POWER - 1);
}

// Lines per inch.
export function toDisplayLinesPerInch(scanGap: number) {
  if (!scanGap || scanGap < 0) {
    return 0;
  }
  return roundToNearest5(1 / (scanGap * STANDARD_SCAN_GAP_INCHES))
}

export function toRealLinesPerInch(scanGap: number) {
  return Math.round(1 / (scanGap * STANDARD_SCAN_GAP_INCHES))
}

export function toSteps(linesPerInch: number) {
  return Math.round(1 / linesPerInch / STANDARD_SCAN_GAP_INCHES)
}

export function toDisplayPowerWords(power: number) {
  return (power === 100) ? 'Max' : toDisplayPower(power);
}
