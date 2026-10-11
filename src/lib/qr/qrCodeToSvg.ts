import type { Modules } from './spec';

export interface SvgOptions {
  // Light modules around the code, which readers need to find it. The
  // standard asks for 4.
  margin?: number;
  // Pixels per module. Without it, the SVG has no size of its own and each
  // module is one unit.
  scale?: number;
  dark?: string;
  light?: string;
}

/**
 * Draws a QR code as an SVG, with each row's runs of dark modules as filled
 * rectangles.
 */
export function qrCodeToSvg(
  { size, data }: Modules,
  { margin = 4, scale, dark = '#000000', light = '#ffffff' }: SvgOptions = {},
): string {
  const full = size + margin * 2;
  let path = '';
  for (let row = 0; row < size; row += 1) {
    let column = 0;
    while (column < size) {
      if (data[row * size + column]) {
        const start = column;
        while (column < size && data[row * size + column]) column += 1;
        path += `M${start + margin} ${row + margin}h${column - start}v1h${start - column}z`;
      } else {
        column += 1;
      }
    }
  }
  const dimensions = scale
    ? ` width="${full * scale}" height="${full * scale}"`
    : '';
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${full} ${full}"${dimensions} shape-rendering="crispEdges">` +
    `<path fill="${light}" d="M0 0h${full}v${full}H0z"/><path fill="${dark}" d="${path}"/></svg>`
  );
}
