/**
 * Offscreen document used by the background service worker to decode QR
 * codes. Service workers have no DOM, so the canvas and web worker based QR
 * libraries have to run here instead.
 */
import QrScanner from './qr-scanner.min.js';
QrScanner.WORKER_PATH = './qr-scanner-worker.min.js';

/**
 * Only log messages in development mode. Offscreen documents only have the
 * messaging part of `chrome.runtime`, so read the manifest directly.
 */
const PROD_MODE = fetch('manifest.json')
  .then(response => response.json())
  .then(manifest => 'update_url' in manifest);
function log(message) {
  PROD_MODE.then((prodMode) => {
    if (!prodMode) {
      // eslint-disable-next-line
      console.log(message);
    }
  });
}

// QR Code
// ===================================================================
const QR_IMAGE_SCALES = [1, 0.9, 0.87, 0.75, 0.6, 0.5, 0.4, 0.25, 0.2, 0.1, 0.05];
// const QR_IMAGE_ROTATIONS = [
//   15, 30, 45, 60, 75, 90,
//   105, 120, 135, 150, 165, 180,
//   195, 210, 225, 240, 255, 270,
//   285, 300, 315, 330, 345, 360,
// ];

/**
 * Takes an image url and converts it to an image data at a 0.25 scale.
 *
 * @param {string} imageUrl The image url to load.
 * @param {number} scale
 */
async function urlToImageData(imageUrl, scale) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();

    image.addEventListener('load', () => {
      canvas.width = image.naturalWidth * scale;
      canvas.height = image.naturalHeight * scale;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas);
    }, false);
    image.src = imageUrl;
  });
}

const codeReader = new ZXing.BrowserQRCodeReader();
/**
 *
 * @param {string} imageUrl
 */
async function readQrCodeZx(imageUrl) {
  return codeReader
    .decodeFromImage(undefined, imageUrl)
    .then((result) => {
      console.log(2);
      return result.getText();
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}

/**
 * Try to read a QR code from an image.
 *
 * @param {string} imageUrl The image url to scan.
 */
async function readQrCode(imageUrl) {
  return new Promise(async (resolve) => {
    // Worst QR Library ever.
    let code = null;
    const imageDataPromises = [];
    for (let i = 0; i < QR_IMAGE_SCALES.length; i += 1) {
      const scale = QR_IMAGE_SCALES[i];
      imageDataPromises.push(Promise.resolve()
        .then(() => urlToImageData(imageUrl, scale))
        .then(imageData => QrScanner.scanImage(imageData))
        .catch(error => log(error || 'No QR code found.')));
    }
    const resolvedCodes = await Promise.all(imageDataPromises);
    log(resolvedCodes);
    if (code === null) {
      code = resolvedCodes.reduce((prev, cur) => {
        if (prev) {
          return prev;
        }
        if (cur) {
          return cur;
        }
        return null;
      }, null);
    }

    log(code);
    // Always resolve so the service worker gets a response, even when no code
    // was found.
    resolve(code);
  });
}

/**
 * Decodes a QR code from an image, returning null if none is found.
 *
 * @param {string} imageUrl The image url to scan.
 */
async function decodeQrCode(imageUrl) {
  // Try zxing first
  let qrCodeData = await readQrCodeZx(imageUrl);
  if (!qrCodeData) {
    // Fallback to qr-scanner
    qrCodeData = await readQrCode(imageUrl);
  }
  return qrCodeData;
}

/**
 * Handle decode requests from the background service worker.
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.target !== 'offscreen') {
    return false;
  }

  if (request.type === 'decodeQrCode') {
    decodeQrCode(request.imageUrl).then(sendResponse);
    return true;
  }
  return false;
});
