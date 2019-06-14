import React from 'react';
import {
  toDisplayEngraveSpeed,
  toDisplayLinesPerInch,
  toDisplayPowerWords,
} from '../lib/glowforgeUnits';
import { PluginMaterial } from '../lib/materialRaw';
import { precisionRound } from '../lib/utils';
import './Viewer.css';

export type MaterialBitmapEngravesViewerProps = {
  bitmaps: PluginMaterial['bitmaps'];
}

export default function MaterialBitmapEngravesViewer(props: MaterialBitmapEngravesViewerProps) {
  if (props.bitmaps.length === 0) {
    return null;
  }

  return (
    <>
      <div className="viewer__headerRow">
        <p>Bitmap Engrave Settings</p>
      </div>
      {
        props.bitmaps.map((bitmap, index) => {
          return (
            <>
              <div className="viewer__row" style={(index !== 0) ? { marginTop: '10px' } : undefined}>
                <p className="viewer__label">Name</p>
                <p className="viewer__value">{bitmap.name}</p>
              </div>
              <div className="viewer__row">
                <p className="viewer__label">Speed</p>
                <p className="viewer__value">{toDisplayEngraveSpeed(bitmap.speed)} ({precisionRound(bitmap.speed, 2)})</p>
              </div>
              <div className="viewer__row">
                <p className="viewer__label">Power</p>
                <p className="viewer__value">{toDisplayPowerWords(bitmap.power)} ({precisionRound(bitmap.power, 2)})</p>
              </div>
              <div className="viewer__row">
                <p className="viewer__label">Passes</p>
                <p className="viewer__value">{bitmap.passes}</p>
              </div>
              <div className="viewer__row">
                <p className="viewer__label">Focal Offset</p>
                <p className="viewer__value">{bitmap.focalOffset}</p>
              </div>
              <div className="viewer__row" style={{marginBottom: '10px'}}>
                <p className="viewer__label">Scan Gap</p>
                <p className="viewer__value">{bitmap.scanGap}, LPI {toDisplayLinesPerInch(bitmap.scanGap)}</p>
              </div>
              {(props.bitmaps.length > 1 && index !== props.bitmaps.length - 1) ? <hr /> : null}
            </>
          );
        })
      }
    </>
  );
}
