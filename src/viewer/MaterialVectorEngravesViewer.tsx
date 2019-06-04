import React from 'react';
import {
  toDisplayEngraveSpeed,
  toDisplayLinesPerInch,
  toDisplayPowerWords,
} from '../lib/glowforgeUnits';
import { PluginMaterial } from '../lib/materialRaw';
import { precisionRound } from '../lib/utils';

export type MaterialVectorEngravesViewerProps = {
  vectors: PluginMaterial['vectors'];
}

export default function MaterialVectorEngravesViewer(props: MaterialVectorEngravesViewerProps) {
  return (
    <>
      <div className="App-flexSectionHeader">
        <p>Vector Engrave Settings</p>
      </div>
      {
        (props.vectors.length > 0) ?
        props.vectors.map((vector, index) => {
          return (
            <>
              <div className="App-flex" style={(index !== 0) ? { marginTop: '10px' } : undefined}>
                <p className="App-flexLabel">Name</p>
                <p>{vector.name}</p>
              </div>
              <div className="App-flex">
                <p className="App-flexLabel">Speed</p>
                <p>{toDisplayEngraveSpeed(vector.speed)} ({precisionRound(vector.speed, 2)})</p>
              </div>
              <div className="App-flex">
                <p className="App-flexLabel">Power</p>
                <p>{toDisplayPowerWords(vector.power)} ({precisionRound(vector.power, 2)})</p>
              </div>
              <div className="App-flex">
                <p className="App-flexLabel">Passes</p>
                <p>{vector.passes}</p>
              </div>
              <div className="App-flex">
                <p className="App-flexLabel">Focal Offset</p>
                <p>{vector.focalOffset}</p>
              </div>
              <div className="App-flex" style={{marginBottom: '10px'}}>
                <p className="App-flexLabel">Scan Gap</p>
                <p>{vector.scanGap}, LPI {toDisplayLinesPerInch(vector.scanGap)}</p>
              </div>
            </>
          );
        }) : 'None'
      }
    </>
  );
}
