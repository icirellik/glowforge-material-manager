const maxMotorSpeed = 8500;
const minUISpeed = 100;
const maxUISpeed = 1000;

/**
 * Best guess is that this is the maximum vertical rampup speed. It makes sense
 * that this value could be higher for emgraves as there is no y axis motion
 */
function getMaxVRSpeed(minSpeed, maxSpeed) {
  const speedDifference = maxSpeed - minSpeed;
  const uiSpeedRange = maxUISpeed - minUISpeed
  const vrSpeed = speedDifference / maxMotorSpeed * uiSpeedRange + minUISpeed;
  return 100 * Math.round(vrSpeed / 100)
}

/**
 * Converts a Glowforge internal speed to the GFUI Speed.
 */
function toDisplaySpeed(rawSpeed, minSpeed, maxSpeed) {
  const maxVRSpeed = getMaxVRSpeed(minSpeed, maxSpeed) - minUISpeed;
  const speed = (rawSpeed - minSpeed) / (maxSpeed - minSpeed) * maxVRSpeed + minUISpeed;
  return Math.round(speed)
}

/**
 * Converts a Glowforge UI speed to a Glowforge internal speed.
 */
function toRealSpeed(displaySpeed, minSpeed, maxSpeed) {
  return (displaySpeed - minSpeed) / (getMaxVRSpeed(minSpeed, maxSpeed) - minUISpeed) * (maxSpeed - minSpeed) + minSpeed
}

function toDisplayEngraveSpeed(rawSpeed) {
  return toDisplaySpeed(rawSpeed, 100, 8500);
}

function toDisplayCutSpeed(rawSpeed) {
  return toDisplaySpeed(rawSpeed, 100, 4000);
}

function toRealEngraveSpeed(displaySpeed) {
  return toRealSpeed(displaySpeed, 100, 8500);
}

function toRealCutSpeed(displaySpeed) {
  return toRealSpeed(displaySpeed, 100, 4000);
}

function toDisplayPower(power, text=true) {
  if (text) {
    return (power === 100) ? 'Max' : power + 1;
  }
  return power + 1;
}

function toRealPower(displayPower) {
  return displayPower - 1;
}

export {
  toDisplayCutSpeed,
  toDisplayEngraveSpeed,
  toDisplayPower,
  toRealCutSpeed,
  toRealEngraveSpeed,
  toRealPower,
}
