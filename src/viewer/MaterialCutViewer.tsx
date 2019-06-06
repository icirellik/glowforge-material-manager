import React from 'react';
import {
  toDisplayCutSpeed,
  toDisplayPowerWords,
} from '../lib/glowforgeUnits';
import { PluginMaterial } from '../lib/materialRaw';
import { precisionRound } from '../lib/utils';

export type MaterialCutViewerProps = {
  cut: PluginMaterial['cut'];
}

export default function MaterialCutViewer(props: MaterialCutViewerProps) {
  return (
    <>
      <div className="App-flexSectionHeader">
        <p>Cut Settings</p>
      </div>
      <div className="App-flex">
        <p className="App-flexLabel">Speed</p>
        <p>{toDisplayCutSpeed(props.cut.speed)} ({precisionRound(props.cut.speed, 2)})</p>
      </div>
      <div className="App-flex">
        <p className="App-flexLabel">Power</p>
        <p>{toDisplayPowerWords(props.cut.power)} ({precisionRound(props.cut.power, 2)})</p>
      </div>
      <div className="App-flex">
        <p className="App-flexLabel">Passes</p>
        <p>{props.cut.passes}</p>
      </div>
      <div className="App-flex">
        <p className="App-flexLabel">Focal Offset</p>
        <p>{props.cut.focalOffset}</p>
      </div>
    </>
  )
}