import React from 'react';
import {
  toDisplayEngraveSpeed,
  toDisplayLinesPerInch,
  toDisplayPowerWords,
} from '../lib/glowforgeUnits';
import {
  precisionRound,
} from '../lib/utils';
import { RawMaterial } from '../lib/material';

export type MaterialBitmapEngravesViewerProps = {
  bitmaps: RawMaterial['bitmaps'];
}

export default function MaterialBitmapEngravesViewer(props: MaterialBitmapEngravesViewerProps) {
  return (
    <>
      <div className="App-flex">
        <p className="App-flexSectionHeader">Bitmap Engrave Settings</p>
      </div>
      {
        (props.bitmaps.length > 0) ?
        props.bitmaps.map((bitmap, index) => {
          return (
            <>
              <div className="App-flex" style={(index !== 0) ? { marginTop: '10px' } : undefined}>
                <p className="App-flexLabel">Name</p>
                <p>{bitmap.name}</p>
              </div>
              <div className="App-flex">
                <p className="App-flexLabel">Speed</p>
                <p>{toDisplayEngraveSpeed(bitmap.speed)} ({precisionRound(bitmap.speed, 2)})</p>
              </div>
              <div className="App-flex">
                <p className="App-flexLabel">Power</p>
                <p>{toDisplayPowerWords(bitmap.power)} ({precisionRound(bitmap.power, 2)})</p>
              </div>
              <div className="App-flex">
                <p className="App-flexLabel">Passes</p>
                <p>{bitmap.passes}</p>
              </div>
              <div className="App-flex">
                <p className="App-flexLabel">Focal Offset</p>
                <p>{bitmap.focalOffset}</p>
              </div>
              <div className="App-flex" style={{marginBottom: '10px'}}>
                <p className="App-flexLabel">Scan Gap</p>
                <p>{bitmap.scanGap}, LPI {toDisplayLinesPerInch(bitmap.scanGap)}</p>
              </div>
            </>
          );
        }) : 'None'
      }
    </>
  );
}
