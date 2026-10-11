import React, { useEffect, useState } from 'react';
import { encodeQrCode, qrCodeToSvg } from '../lib/qr';
import { toTinyMaterial } from '../material/materialConversion';
import { materialIdForTitle } from '../material/materialId';
import type { PluginMaterial } from '../material/materialPlugin';
import { materialQrCodeText } from '../material/materialQrCode';
import type { TinyMaterial } from '../material/materialTiny';
import './MaterialViewer.css';

interface QrCodeViewerProps {
  material: PluginMaterial;
}

interface Stickers {
  // The material id's code, to show and to download.
  idImage: string;
  idSvg: string;
  // The code with the id and settings, or null when the settings are too long
  // for a QR code.
  settingsSvg: string | null;
}

function svgDataUri(svg: string): string {
  return `data:image/svg+xml;base64,${window.btoa(svg)}`;
}

/**
 * Makes a material's stickers.
 */
export function makeStickers(id: string, settings: TinyMaterial): Stickers {
  const idCode = encodeQrCode(materialQrCodeText(id));
  let settingsSvg: string | null = null;
  try {
    settingsSvg = qrCodeToSvg(encodeQrCode(materialQrCodeText(id, settings)));
  } catch {
    // Too long for a QR code.
  }
  return {
    // Shown 4 pixels to a module.
    idImage: svgDataUri(qrCodeToSvg(idCode, { scale: 4 })),
    idSvg: qrCodeToSvg(idCode),
    settingsSvg,
  };
}

export default function QrCodeViewer({ material }: QrCodeViewerProps) {
  const title = `${material.thickName} ${material.name}`;
  // The title makes the id, so the stickers change with it and the settings.
  const settings = JSON.stringify(toTinyMaterial(material));
  const [stickers, setStickers] = useState<Stickers | null>(null);

  useEffect(() => {
    let current = true;
    setStickers(null);
    materialIdForTitle(title).then((id) => {
      if (current) {
        setStickers(makeStickers(id, JSON.parse(settings)));
      }
    });
    return () => {
      current = false;
    };
  }, [title, settings]);

  return (
    <>
      <div className="viewer__headerRow">
        <p>Scannable QR Code</p>
      </div>
      {stickers ? (
        <>
          <img
            style={{
              border: '1px solid #000',
              width: 'fit-content',
            }}
            src={stickers.idImage}
            alt="qrcode"
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'left',
              marginTop: '20px',
            }}
          >
            <a
              download={`${title}.svg`}
              href={svgDataUri(stickers.idSvg)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Material Id
            </a>
            {stickers.settingsSvg ? (
              <a
                download={`${title}.svg`}
                href={svgDataUri(stickers.settingsSvg)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Material Id + Settings
              </a>
            ) : (
              <span>
                The settings are too long for a QR code, use the Material Id.
              </span>
            )}
          </div>
        </>
      ) : null}
    </>
  );
}
