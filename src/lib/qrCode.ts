import QRCode from 'qrcode';
import jsQR from 'jsqr';

const QR_IMAGE_SCALE = 0.25;

/**
 * Takes an image url and converts it to an image data at a 0.25 scale.
 *
 * @param imageUrl The image url to load.
 */
function urlToImageData(imageUrl: string): Promise<ImageData> {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();

    image.addEventListener('load', function() {
      canvas.width = image.naturalWidth * QR_IMAGE_SCALE;
      canvas.height = image.naturalHeight * QR_IMAGE_SCALE;
      context!.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(context!.getImageData(0, 0, canvas.width, canvas.height));
    }, false);
    image.src = imageUrl;
  });
}

/**
 * Try to read a QR code from an image.
 *
 * @param imageUrl  The image url to scan.
 */
export async function readQrCode(imageUrl: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    // Worst QR Library ever.
    const imageData = await urlToImageData(imageUrl);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    console.log(code);
    if (code) {
      resolve(code.data);
    };
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
