declare module 'qrcode-reader' {
  export default class QrCode {
    decode: any;
    callback: (err, result) => void;
  };
}
