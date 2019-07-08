import React from 'react';
import {
  toDisplayEngraveSpeed,
  toDisplayLinesPerInch,
  toDisplayPowerWords,
} from '../lib/glowforgeUnits';
import { PluginMaterial } from '../material/materialPlugin';
import { precisionRound } from '../lib/utils';
import './MaterialViewer.css';

export type MaterialVectorEngravesViewerProps = {
  vectors: PluginMaterial['vectors'];
}

export default function MaterialVectorEngravesViewer(props: MaterialVectorEngravesViewerProps) {
  if (props.vectors.length === 0) {
    return null;
  }

  return (
    <>
      <div className="viewer__headerRow">
        <p>Vector Engrave Settings</p>
      </div>
      {
        props.vectors.map((vector, index) => {
          return (
            <>
              <div className="viewer__row" style={(index !== 0) ? { marginTop: '10px' } : undefined}>
                <p className="viewer__label">Name</p>
                <p className="viewer__value">{vector.name}</p>
              </div>
              <div className="viewer__row">
                <p className="viewer__label">Speed</p>
                <p className="viewer__value">{toDisplayEngraveSpeed(vector.speed)} ({precisionRound(vector.speed, 2)})</p>
              </div>
              <div className="viewer__row">
                <p className="viewer__label">Power</p>
                <p className="viewer__value">{toDisplayPowerWords(vector.power)} ({precisionRound(vector.power, 2)})</p>
              </div>
              <div className="viewer__row">
                <p className="viewer__label">Passes</p>
                <p className="viewer__value">{vector.passes}</p>
              </div>
              <div className="viewer__row">
                <p className="viewer__label">Focal Offset</p>
                <p className="viewer__value">{vector.focalOffset}</p>
              </div>
              <div className="viewer__row" style={{marginBottom: '10px'}}>
                <p className="viewer__label">Scan Gap</p>
                <p className="viewer__value">{vector.scanGap}, LPI {toDisplayLinesPerInch(vector.scanGap)}</p>
              </div>
              {(props.vectors.length > 1 && index !== props.vectors.length - 1) ? <hr /> : null}
            </>
          );
        })
      }
    </>
  );
}
