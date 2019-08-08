import QRCode from 'qrcode';
// import * as QrScanner from 'qr-scanner';
import jsQR from 'jsqr';
// import { reject } from 'q';
// import fs from 'fs';
import { BrowserQRCodeReader } from '@zxing/library';

const QR_IMAGE_SCALES = [1, 0.9, 0.87, 0.75, 0.6, 0.5, 0.4, 0.25, 0.2, 0.1, 0.05];

export async function zx(url: string) {
  const codeReader = new BrowserQRCodeReader();
  return codeReader
    .decodeFromImage(undefined, url)
      .then(result => result.getText());
}

/**
 * Takes an image url and converts it to an image data at a 0.25 scale.
 *
 * @param imageUrl The image url to load.
 */
async function urlToImageData(imageUrl: string, scale: number): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      const image = new Image();

      image.addEventListener('load', () => {
        try {
          const width = image.naturalWidth * scale;
          const height = image.naturalHeight * scale;

          canvas.width = width;
          canvas.height = height;

          const context = canvas.getContext('2d', { alpha: false });
          context!.imageSmoothingEnabled = false;

          // Move registration point to the center of the canvas
          // context!.translate(width / 2, height / 2);
          // context!.rotate(45 * Math.PI / 180);// angle must be in radians
          // Move registration point back to the top left corner of canvas
          // context!.translate((-width) / 2, (-height) / 2);

          context!.drawImage(image, 0, 0, canvas.width, canvas.height);
          const imageData = context!.getImageData(0, 0, canvas.width, canvas.height);

          // Write to disk, testing only
          // var img = canvas.toDataURL();
          // var data = img.replace(/^data:image\/\w+;base64,/, "");
          // var buf = new Buffer(data, 'base64');
          // fs.writeFileSync(`a-${scale}.png`, buf);

          resolve(imageData);
        } catch (e) {
          reject(e);
        }
      }, false);
      image.onerror = (err) => {
        console.log(err)
      };

      image.src = imageUrl;
    } catch (e) {
      reject(e);
    }
  });
}


/**
 * Try to read a QR code from an image.
 *
 * @param imageUrl  The image url to scan.
 */
export async function readQrCode(imageUrl: string): Promise<string | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const imageDataPromises = QR_IMAGE_SCALES.map(scale => {
        return Promise.resolve()
          .then(() => {
            return urlToImageData(imageUrl, scale);
          }).then(imageData => {
            return jsQR(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: 'attemptBoth',
            });
          }).catch(e => console.log(e));
        });

      const resolvedCodes = await Promise.all(imageDataPromises);
      const code = resolvedCodes.reduce((prev, cur) => {
        if (prev) {
          return prev;
        }
        if (cur) {
          return cur;
        }
        return null;
      }, null);

      if (code) {
        resolve(code.data);
      }
      resolve(null);
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Takes some text data and encodes it into a QR Code as a data uril.
 *
 * @param text The data to encode.
 */
export async function qrcodeAsDataUri(text: string): Promise<string> {
  return QRCode.toDataURL(text);
}

/**
 * Takes some text data and encodes it as an svg.
 *
 * @param text The data to encode.
 */
export function qrcodeAsSvg(text: string): Promise<string> {
  return new Promise((resolve, reject) => {
    QRCode.toString(text, (err, svg) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(svg);
    })
  });
}
