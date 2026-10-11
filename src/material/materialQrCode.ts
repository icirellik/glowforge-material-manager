import type { TinyMaterial } from './materialTiny';

/**
 * The text in a material's QR code: its id, or its id and its settings, which
 * a sticker can carry so that the material can be added from it.
 */
export function materialQrCodeText(
  id: string,
  settings?: TinyMaterial,
): string {
  return settings ? `${id}|${JSON.stringify(settings)}` : id;
}

// `Custom:` and 7 hex digits, then optionally `|` and the settings.
const MATERIAL_QR_CODE = /^(Custom:[0-9a-f]{7})(?:\|([\s\S]+))?$/;

export interface MaterialQrCode {
  id: string;
  // The settings as JSON, unchecked, or null for codes with only the id.
  settings: string | null;
}

/**
 * Reads the text of a material's QR code.
 *
 * @returns The material, or null if the text isn't a material's QR code, like
 * a Proofgrade code.
 */
export function parseMaterialQrCode(text: string): MaterialQrCode | null {
  const match = text.match(MATERIAL_QR_CODE);
  return match ? { id: match[1], settings: match[2] ?? null } : null;
}
