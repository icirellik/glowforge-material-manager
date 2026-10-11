import type { Grey } from './image';
import type { Modules } from './spec';

/**
 * Samples a code's modules from an image and splits them into dark and light.
 */

/**
 * The brightness of every module, from 9 samples around its middle, away from
 * its blurry edges.
 */
export function sampleModuleValues(
  grey: Grey,
  h: number[],
  size: number,
): Float64Array {
  const values = new Float64Array(size * size);
  const offsets = [0.25, 0.5, 0.75];
  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      let sum = 0;
      for (const dy of offsets) {
        for (const dx of offsets) {
          const X = column + dx;
          const Y = row + dy;
          const w = h[6] * X + h[7] * Y + 1;
          const x = Math.min(
            grey.width - 1,
            Math.max(0, Math.floor((h[0] * X + h[1] * Y + h[2]) / w)),
          );
          const y = Math.min(
            grey.height - 1,
            Math.max(0, Math.floor((h[3] * X + h[4] * Y + h[5]) / w)),
          );
          sum += grey.data[y * grey.width + x];
        }
      }
      values[row * size + column] = sum;
    }
  }
  return values;
}

/**
 * Splits modules halfway between the darkest and lightest tenth.
 */
function globalThresholds(values: Float64Array): Float64Array {
  const sorted = values.slice().sort();
  const threshold =
    (sorted[Math.floor(sorted.length * 0.1)] +
      sorted[Math.floor(sorted.length * 0.9)]) /
    2;
  return new Float64Array(values.length).fill(threshold);
}

// Modules are compared with the modules this far around them.
const LOCAL_RADIUS = 3;

/**
 * Splits each module at the mean of the modules around it, which copes with
 * a shadow falling across part of the code.
 */
function localThresholds(values: Float64Array, size: number): Float64Array {
  const stride = size + 1;
  const totals = new Float64Array(stride * stride);
  for (let row = 0; row < size; row += 1) {
    for (let column = 0, sum = 0; column < size; column += 1) {
      sum += values[row * size + column];
      totals[(row + 1) * stride + column + 1] =
        totals[row * stride + column + 1] + sum;
    }
  }
  const thresholds = new Float64Array(values.length);
  for (let row = 0; row < size; row += 1) {
    const top = Math.max(0, row - LOCAL_RADIUS);
    const bottom = Math.min(size, row + LOCAL_RADIUS + 1);
    for (let column = 0; column < size; column += 1) {
      const left = Math.max(0, column - LOCAL_RADIUS);
      const right = Math.min(size, column + LOCAL_RADIUS + 1);
      const sum =
        totals[bottom * stride + right] -
        totals[top * stride + right] -
        totals[bottom * stride + left] +
        totals[top * stride + left];
      thresholds[row * size + column] = sum / ((bottom - top) * (right - left));
    }
  }
  return thresholds;
}

/**
 * Splits sampled modules into dark and light, by one threshold for the whole
 * code or by each module's surroundings.
 */
export function classifyModules(
  values: Float64Array,
  size: number,
  inverted: boolean,
  local: boolean,
): Modules {
  const thresholds = local
    ? localThresholds(values, size)
    : globalThresholds(values);
  const data = new Uint8Array(size * size);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = (inverted ? values[i] > thresholds[i] : values[i] < thresholds[i])
      ? 1
      : 0;
  }
  return { size, data };
}
