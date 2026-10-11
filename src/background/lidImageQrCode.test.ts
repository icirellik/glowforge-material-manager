// @vitest-environment node
import fs from 'fs';
import path from 'path';
import * as canvasModule from 'canvas';
import { stubImageDecoding } from '../lib/qr/testing';
import { checkLidImage } from './lidImageQrCode';

const TEST_IMAGES = path.join(__dirname, '..', '..', 'test-images');
const LID_URL =
  'https://storage.googleapis.com/gf-app-imgl/abc/lid.jpg?Signature=x';

function respond(
  body: Uint8Array<ArrayBuffer> | string,
  headers: Record<string, string> = { 'content-type': 'image/jpeg' },
  status = 200,
) {
  return vi
    .fn()
    .mockResolvedValue(new Response(new Blob([body]), { status, headers }));
}

describe('checkLidImage', () => {
  let restore: () => void;
  let qrAutoSelect = true;
  beforeAll(() => {
    restore = stubImageDecoding(canvasModule);
  });
  afterAll(() => restore());
  beforeEach(() => {
    qrAutoSelect = true;
    vi.stubGlobal('chrome', {
      runtime: { getManifest: () => ({ update_url: 'https://example.com' }) },
      permissions: { contains: async () => qrAutoSelect },
    });
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('reads the material sticker in a lid image', async () => {
    vi.stubGlobal(
      'fetch',
      respond(
        new Uint8Array(
          fs.readFileSync(path.join(TEST_IMAGES, 'Custom:3f77f07.jpg')),
        ),
      ),
    );
    expect(await checkLidImage(LID_URL)).toEqual({
      read: true,
      materialId: 'Custom:3f77f07',
    });
  });

  it('reads images with other codes, or none, as no sticker', async () => {
    vi.stubGlobal(
      'fetch',
      respond(
        new Uint8Array(fs.readFileSync(path.join(TEST_IMAGES, 'frame.png'))),
        { 'content-type': 'image/png' },
      ),
    );
    expect(await checkLidImage(LID_URL)).toEqual({
      read: true,
      materialId: null,
    });
  });

  it('only downloads lid images, with QR auto-select on', async () => {
    const fetch = respond('');
    vi.stubGlobal('fetch', fetch);
    for (const url of [
      'https://example.com/lid.jpg',
      'https://storage.googleapis.com/other/lid.jpg',
      'http://storage.googleapis.com/gf-app-imgl/lid.jpg',
    ]) {
      expect(await checkLidImage(url)).toEqual({
        read: false,
        materialId: null,
      });
    }
    qrAutoSelect = false;
    expect(await checkLidImage(LID_URL)).toEqual({
      read: false,
      materialId: null,
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("leaves responses that aren't lid images", async () => {
    const notRead = { read: false, materialId: null };
    vi.stubGlobal(
      'fetch',
      respond('<html></html>', { 'content-type': 'text/html' }),
    );
    expect(await checkLidImage(LID_URL)).toEqual(notRead);
    vi.stubGlobal(
      'fetch',
      respond('', {
        'content-type': 'image/jpeg',
        'content-length': String(30 * 1024 * 1024),
      }),
    );
    expect(await checkLidImage(LID_URL)).toEqual(notRead);
    vi.stubGlobal('fetch', respond('', { 'content-type': 'image/jpeg' }, 403));
    expect(await checkLidImage(LID_URL)).toEqual(notRead);
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new TypeError('Failed to fetch')),
    );
    expect(await checkLidImage(LID_URL)).toEqual(notRead);
  });
});
