import QRCode from 'qrcode';
// import jsQR from 'jsqr';

// const QR_IMAGE_SCALES = [1, 0.75, 0.5, 0.25, 0.1];

/**
 * Takes an image url and converts it to an image data at a 0.25 scale.
 *
 * @param imageUrl The image url to load.
 */
// async function urlToImageData(imageUrl: string, scale: number): Promise<ImageData> {
//   return new Promise(resolve => {
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');
//     const image = new Image();

//     image.addEventListener('load', () => {
//       canvas.width = image.naturalWidth * scale;
//       canvas.height = image.naturalHeight * scale;
//       context!.drawImage(image, 0, 0, canvas.width, canvas.height);
//       resolve(context!.getImageData(0, 0, canvas.width, canvas.height));
//     }, false);
//     image.src = imageUrl;
//   });
// }

/**
 * Try to read a QR code from an image.
 *
 * @param imageUrl  The image url to scan.
 */
// export async function readQrCode(imageUrl: string): Promise<string> {
//   return new Promise(async resolve => {
//     const imageDataPromises = QR_IMAGE_SCALES.map(scale => {
//       return Promise.resolve()
//         .then(() => {
//           return urlToImageData(imageUrl, scale);
//         }).then(imageData => {
//           return jsQR(imageData.data, imageData.width, imageData.height);
//         });
//     });

//     const resolvedCodes = await Promise.all(imageDataPromises);

//     const code = resolvedCodes.reduce((prev, cur) => {
//       return (prev !== null) ? prev : cur;
//     }, null);

//     if (code) {
//       resolve(code.data);
//     }
//   });
// }

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
