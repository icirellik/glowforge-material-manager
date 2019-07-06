import React from 'react';
import {
  toDisplayCutSpeed,
  toDisplayPowerWords,
} from '../lib/glowforgeUnits';
import { PluginMaterial } from '../material/materialPlugin';
import { precisionRound } from '../lib/utils';
import './Viewer.css';

export type MaterialCutViewerProps = {
  cut: PluginMaterial['cut'];
}

export default function MaterialCutViewer(props: MaterialCutViewerProps) {
  return (
    <>
      <div className="viewer__headerRow">
        <p>Cut Settings</p>
      </div>
      <div className="viewer__row">
        <p className="viewer__label">Speed</p>
        <p className="viewer__value">{toDisplayCutSpeed(props.cut.speed)} ({precisionRound(props.cut.speed, 2)})</p>
      </div>
      <div className="viewer__row">
        <p className="viewer__label">Power</p>
        <p className="viewer__value">{toDisplayPowerWords(props.cut.power)} ({precisionRound(props.cut.power, 2)})</p>
      </div>
      <div className="viewer__row">
        <p className="viewer__label">Passes</p>
        <p className="viewer__value">{props.cut.passes}</p>
      </div>
      <div className="viewer__row">
        <p className="viewer__label">Focal Offset</p>
        <p className="viewer__value">{props.cut.focalOffset}</p>
      </div>
    </>
  )
}
