import React from 'react';
import {
  toDisplayCutSpeed,
  toDisplayPowerWords,
} from '../lib/glowforgeUnits';
import { PluginMaterial } from '../lib/materialRaw';
import { precisionRound } from '../lib/utils';

export type MaterialScoresViewerProps = {
  scores: PluginMaterial['scores'];
}

export default function MaterialScoresViewer(props: MaterialScoresViewerProps) {
  return (
    <>
      <div className="App-flexSectionHeader">
        <p>Score Settings</p>
      </div>
      {
        (props.scores.length > 0) ?
        props.scores.map((score, index) => {
          return (
            <>
              <div className="App-flex" style={(index !== 0) ? { marginTop: '10px' } : undefined}>
                <p className="App-flexLabel">Name</p>
                <p>{score.name}</p>
              </div>
              <div className="App-flex">
                <p className="App-flexLabel">Speed</p>
                <p>{toDisplayCutSpeed(score.speed)} ({precisionRound(score.speed, 2)})</p>
              </div>
              <div className="App-flex">
                <p className="App-flexLabel">Power</p>
                <p>{toDisplayPowerWords(score.power)} ({precisionRound(score.power, 2)})</p>
              </div>
              <div className="App-flex">
                <p className="App-flexLabel">Passes</p>
                <p>{score.passes}</p>
              </div>
              <div className="App-flex" style={{marginBottom: '10px'}}>
                <p className="App-flexLabel">Focal Offset</p>
                <p>{score.focalOffset}</p>
              </div>
            </>
          );
        }) : 'None'
      }
    </>
  );
}
