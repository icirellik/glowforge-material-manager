import React from 'react';
import {
  toDisplayCutSpeed,
  toDisplayPowerWords,
} from '../lib/glowforgeUnits';
import type { PluginMaterial } from '../material/materialPlugin';
import { precisionRound } from '../lib/utils';
import './MaterialViewer.css';

export type MaterialCutViewerProps = {
  cut: PluginMaterial['cut'];
}

export default function MaterialCutViewer(props: MaterialCutViewerProps) {
  const { cut } = props;
  return (
    <>
      <div className="viewer__headerRow">
        <p>Cut Settings</p>
      </div>
      <div className="viewer__row">
        <p className="viewer__label">Speed</p>
        <p className="viewer__value">{toDisplayCutSpeed(cut.speed)}</p>
        <p className="viewer__glowforge">{precisionRound(cut.speed, 2)}</p>
      </div>
      <div className="viewer__row">
        <p className="viewer__label">Power</p>
        <p className="viewer__value">{toDisplayPowerWords(cut.power)}</p>
        <p className="viewer__glowforge">{precisionRound(cut.power, 2)}</p>
      </div>
      <div className="viewer__row">
        <p className="viewer__label">Passes</p>
        <p className="viewer__value">{cut.passes}</p>
      </div>
      <div className="viewer__row">
        <p className="viewer__label">Focal Offset (mm)</p>
        <p className="viewer__value">{cut.focalOffset}</p>
      </div>
    </>
  );
}
