import { hasLidImageAccess, isLidImageUrl } from '../lib/lidImage';
import { readQrCodeFromImage } from '../lib/qr';
import { parseMaterialQrCode } from '../material/materialQrCode';
import { log } from './log';

/**
 * Reads material stickers from Glowforge's lid camera images.
 */

// Lid images are JPEGs of about 2304 x 1382 pixels, so anything slower or much
// larger than that isn't one.
const LID_IMAGE_TIMEOUT_MS = 10000;
const MAX_LID_IMAGE_BYTES = 20 * 1024 * 1024;
const MAX_LID_IMAGE_PIXELS = 16000000;

export interface LidImageCheck {
  // Whether the image was read. It isn't when QR auto-select is off, or the
  // image isn't a lid image or couldn't be downloaded.
  read: boolean;
  // The material whose sticker is in the image, or null for none.
  materialId: string | null;
}

const NOT_READ: LidImageCheck = { read: false, materialId: null };

/**
 * Downloads a lid image, within limits.
 *
 * @returns The image, or null if it couldn't be downloaded or isn't an image.
 */
async function download(url: string): Promise<Blob | null> {
  try {
    const response = await fetch(url, {
      credentials: 'omit',
      signal: AbortSignal.timeout(LID_IMAGE_TIMEOUT_MS),
    });
    const type = response.headers.get('content-type') || '';
    const length = Number(response.headers.get('content-length') || 0);
    if (!response.ok || !type.startsWith('image/') || length > MAX_LID_IMAGE_BYTES) {
      log(`Not reading the lid image: ${response.status} ${type} ${length}`);
      return null;
    }
    const blob = await response.blob();
    return blob.size <= MAX_LID_IMAGE_BYTES ? blob : null;
  } catch (error) {
    log(error);
    return null;
  }
}

/**
 * Checks a lid camera image for a custom material's sticker.
 *
 * @param url The lid image's URL, from the Glowforge page.
 */
export async function checkLidImage(url: string): Promise<LidImageCheck> {
  if (!isLidImageUrl(url) || !(await hasLidImageAccess())) {
    return NOT_READ;
  }
  const image = await download(url);
  if (!image) {
    return NOT_READ;
  }
  const code = await readQrCodeFromImage(image, { maxPixels: MAX_LID_IMAGE_PIXELS });
  log(`QR code: ${code ? code.text : 'none'}`);
  const material = code && parseMaterialQrCode(code.text);
  return { read: true, materialId: material ? material.id : null };
}
