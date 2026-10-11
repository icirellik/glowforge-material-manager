import { materialQrCodeText, parseMaterialQrCode } from './materialQrCode';

describe('material QR codes', () => {
  it('holds an id, or an id and settings', () => {
    expect(materialQrCodeText('Custom:abc1234')).toEqual('Custom:abc1234');
    expect(parseMaterialQrCode('Custom:abc1234')).toEqual({
      id: 'Custom:abc1234',
      settings: null,
    });

    const settings = {
      n: 'Birch',
      t: 'Thin',
      d: 0.125,
      c: {
        p: 100,
        s: 180,
        a: 1,
        f: null,
      },
      s: [],
      v: [],
      b: [],
    };
    const text = materialQrCodeText('Custom:abc1234', settings);
    expect(text).toEqual(`Custom:abc1234|${JSON.stringify(settings)}`);
    expect(parseMaterialQrCode(text)).toEqual({
      id: 'Custom:abc1234',
      settings: JSON.stringify(settings),
    });
  });

  it('leaves out other codes', () => {
    for (const text of [
      'Glowforge:123',
      'Custom:abc123',
      'Custom:abc12345',
      'Custom:ABC1234',
      'xCustom:abc1234',
      'Custom:abc1234|',
    ]) {
      expect(parseMaterialQrCode(text), text).toBeNull();
    }
  });
});
