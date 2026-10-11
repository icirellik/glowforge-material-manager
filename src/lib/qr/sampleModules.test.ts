// @vitest-environment node
import { decodeModules } from './decodeModules';
import { encodeQrCode } from './encodeQrCode';
import { classifyModules } from './sampleModules';

describe('classifyModules', () => {
  it('splits modules across a shadow by their surroundings', () => {
    const modules = encodeQrCode('Custom:abc1234');
    const { size, data } = modules;
    // Dark modules are 30, light ones 220, and a shadow takes the right half
    // down to a third, darker than dark modules in the light.
    const values = Float64Array.from(data, (dark, index) => (dark ? 30 : 220) * (index % size >= size / 2 ? 0.33 : 1));
    const global = classifyModules(values, size, false, false);
    const local = classifyModules(values, size, false, true);
    expect(decodeModules(global)).toBeNull();
    expect(decodeModules(local)?.text).toEqual('Custom:abc1234');
    // Only modules by the shadow's edge are wrong.
    local.data.forEach((value, index) => {
      if (value !== data[index]) expect(Math.abs((index % size) - size / 2)).toBeLessThan(4);
    });
  });

  it('handles light on dark codes', () => {
    const { size, data } = encodeQrCode('Custom:abc1234');
    const values = Float64Array.from(data, (dark) => (dark ? 220 : 30));
    for (const local of [false, true]) {
      expect(classifyModules(values, size, true, local).data).toEqual(data);
    }
  });
});
