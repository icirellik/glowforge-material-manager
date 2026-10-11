// @vitest-environment node
import { createCanvas, loadImage } from 'canvas';
import { encodeQrCode } from './encodeQrCode';
import { qrCodeToSvg } from './qrCodeToSvg';
import { readQrCode } from './readQrCode';

describe('qrCodeToSvg', () => {
  it('draws a code that reads back', async () => {
    const svg = qrCodeToSvg(encodeQrCode('Custom:abc1234'), { scale: 4 });
    // 21 modules and a margin of 4 on each side.
    expect(svg).toContain('viewBox="0 0 29 29" width="116" height="116"');

    const image = await loadImage(Buffer.from(svg));
    const canvas = createCanvas(image.width, image.height);
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);
    expect(readQrCode(context.getImageData(0, 0, image.width, image.height))?.text).toEqual('Custom:abc1234');
  });

  it('has no size of its own without a scale', () => {
    const svg = qrCodeToSvg(encodeQrCode('Custom:abc1234'), { margin: 2, dark: '#123456' });
    expect(svg).toContain('viewBox="0 0 25 25" shape-rendering');
    expect(svg).toContain('fill="#123456"');
  });
});
