import QRCode from 'qrcode';
import QrCode from 'qrcode-reader';

export async function readQrCode(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Worst QR Library ever.
    const qr = new QrCode();
    qr.callback = (err, qrCode) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(qrCode.result);
    }
    qr.decode(imageUrl);
  });
}

export async function qrcodeAsDataUri(text: string): Promise<string> {
  return QRCode.toDataURL(text);
}

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
