import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { decodeModules } from '../lib/qr';
import { toTinyMaterial } from '../material/materialConversion';
import type { PluginMaterial } from '../material/materialPlugin';
import QrCodeViewer, { makeStickers } from './QrCodeViewer';

vi.mock('../material/materialId', () => ({
  materialIdForTitle: async () => 'Custom:abc1234',
}));

function material(name: string, power = 100): PluginMaterial {
  return {
    name,
    thickName: 'Thin',
    thickness: 0.125,
    cut: {
      power,
      speed: 180,
      passes: 1,
      focalOffset: null,
    },
    scores: [],
    vectors: [],
    bitmaps: [],
    sync: false,
  };
}

/**
 * Reads the modules back out of a sticker's SVG.
 */
function readSvg(svg: string) {
  const size = Number(svg.match(/viewBox="0 0 (\d+)/)![1]) - 8;
  const data = new Uint8Array(size * size);
  for (const [, x, y, run] of svg.matchAll(/M(\d+) (\d+)h(\d+)/g)) {
    for (let i = 0; i < Number(run); i += 1)
      data[(Number(y) - 4) * size + Number(x) - 4 + i] = 1;
  }
  return decodeModules({ size, data })?.text;
}

describe('makeStickers', () => {
  it('makes the id and settings stickers', () => {
    const settings = toTinyMaterial(material('Birch'));
    const stickers = makeStickers('Custom:abc1234', settings);
    expect(readSvg(stickers.idSvg)).toEqual('Custom:abc1234');
    expect(readSvg(stickers.settingsSvg!)).toEqual(
      `Custom:abc1234|${JSON.stringify(settings)}`,
    );
    expect(stickers.idImage).toMatch(/^data:image\/svg\+xml;base64,/);
  });

  it('still makes the id sticker when the settings are too long', () => {
    const stickers = makeStickers(
      'Custom:abc1234',
      toTinyMaterial(material('Birch '.repeat(600))),
    );
    expect(stickers.settingsSvg).toBeNull();
    expect(readSvg(stickers.idSvg)).toEqual('Custom:abc1234');
  });
});

describe('QrCodeViewer', () => {
  it('updates the settings sticker when only the settings change', async () => {
    // The id is looked up asynchronously, outside act.
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const root = document.createElement('div');
    const links = () =>
      Array.from(root.querySelectorAll('a')).map((link) =>
        link.getAttribute('href'),
      );
    const settle = () =>
      new Promise((resolve) => {
        setTimeout(resolve, 0);
      });

    act(() => {
      ReactDOM.render(<QrCodeViewer material={material('Birch')} />, root);
    });
    await settle();
    const before = links();
    expect(before).toHaveLength(2);
    expect(root.querySelector('img')!.getAttribute('src')).toMatch(
      /^data:image\/svg\+xml;base64,/,
    );

    act(() => {
      ReactDOM.render(<QrCodeViewer material={material('Birch', 90)} />, root);
    });
    await settle();
    const after = links();
    expect(after[0]).toEqual(before[0]);
    expect(after[1]).not.toEqual(before[1]);

    act(() => {
      ReactDOM.render(
        <QrCodeViewer material={material('Birch '.repeat(600))} />,
        root,
      );
    });
    await settle();
    expect(links()).toHaveLength(1);
    expect(root.textContent).toContain('too long for a QR code');
    ReactDOM.unmountComponentAtNode(root);
    vi.restoreAllMocks();
  });
});
