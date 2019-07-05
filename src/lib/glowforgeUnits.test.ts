import {
  toRealPower,
} from './glowforgeUnits';

describe('Glowforge Unit Helpers', () => {

  it('toRealPower', () => {
    expect(toRealPower(101)).toEqual(99.99);    // GF uses 100
    expect(toRealPower(100)).toEqual(99);
    expect(toRealPower(75)).toEqual(74.25);
    expect(toRealPower(50)).toEqual(49.5);
    expect(toRealPower(25)).toEqual(24.75);
    expect(toRealPower(1)).toEqual(0.99);     // TODO: GF uses 1
  });

});
