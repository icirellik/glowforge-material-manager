import path from 'path';
import { readQrCode, zx } from './qrCode';

const currentPath = path.dirname(__dirname);
const IMAGE_PATH_CUSTOM_1 = path.join(currentPath, '..', 'test-images', 'Custom:3f77f07.jpg');
const IMAGE_PATH_YO = path.join(currentPath, '..', 'test-images', 'frame.png');

describe('QR Code test', () => {
  it('detect code: Yo!', async () => {
    const path2 = `file://${path.resolve(IMAGE_PATH_YO)}`;
    const code = await readQrCode(path2);
    expect(code).toEqual('Yo!');
  }, 12000);

  // it('detect code: Custom:3f77f07', async () => {
  //   const path2 = `file://${path.resolve(IMAGE_PATH_CUSTOM_1)}`;
  //   const code = await readQrCode(path2);
  //   expect(code).toEqual('Custom:3f77f07');
  // }, 32000);

  it('detect code (zx): Custom:3f77f07', async () => {
    const path2 = `file://${path.resolve(IMAGE_PATH_CUSTOM_1)}`;
    const code = await zx(path2);
    expect(code).toEqual('Custom:3f77f07');
  }, 32000);
});
