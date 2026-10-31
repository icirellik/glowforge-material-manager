import {
  isProMachine,
  machineModelName,
  parseMachineModel,
} from './machineModel';

describe('machine models', () => {
  it('reads what the GFUI keeps on a machine', () => {
    expect(parseMachineModel({ model: 'pro', tubeType: 'pro' })).toEqual({
      model: 'pro',
      tubeType: 'pro',
    });
    // The GFUI gives a machine without a tube type a basic one.
    expect(parseMachineModel({ model: 'basic' })).toEqual({
      model: 'basic',
      tubeType: 'basic',
    });
    expect(parseMachineModel({ model: 'plus', tubeType: null })).toEqual({
      model: 'plus',
      tubeType: 'basic',
    });
  });

  it('rejects anything else', () => {
    expect(parseMachineModel(null)).toBeNull();
    expect(parseMachineModel('pro')).toBeNull();
    expect(parseMachineModel({ tubeType: 'pro' })).toBeNull();
    expect(parseMachineModel({ model: 'Pro <b>' })).toBeNull();
    expect(parseMachineModel({ model: 'pro', tubeType: 7 })).toBeNull();
    expect(parseMachineModel({ model: 'x'.repeat(33) })).toBeNull();
  });

  it('tells a Pro from other models', () => {
    const pro = ['pro', 'hd_pro', 'gfd_pro'];
    const others = ['plus', 'basic', 'hd_plus', 'gfd_basic', 'prototype'];
    for (const model of pro) {
      expect(isProMachine({ model, tubeType: 'pro' })).toBe(true);
    }
    for (const model of others) {
      expect(isProMachine({ model, tubeType: 'basic' })).toBe(false);
    }
  });

  it('names the models', () => {
    const name = (model: string) => machineModelName({ model, tubeType: '' });
    expect(name('pro')).toBe('Pro');
    expect(name('hd_plus')).toBe('HD Plus');
    expect(name('gfd_basic')).toBe('Diode Basic');
    expect(name('laser_9000')).toBe('laser_9000');
  });
});
