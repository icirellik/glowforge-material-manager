import React from 'react';
import { EditorMode } from '../App';
import { PluginMaterial } from '../material/materialPlugin';
import MaterialBitmapEngravesViewer from './MaterialBitmapEngravesViewer';
import MaterialCutViewer from './MaterialCutViewer';
import MaterialScoresViewer from './MaterialScoresViewer';
import MaterialVectorEngravesViewer from './MaterialVectorEngravesViewer';
import QrCodeViewer from './QrCodeViewer';
import './MaterialViewer.css';

export type MaterialViewerProps = {
  editorMode: EditorMode;
  material: PluginMaterial;
}

export default function MaterialViewer(props: MaterialViewerProps) {
  const {
    editorMode,
    material,
  } = props;

  if (editorMode !== 'SELECTED') {
    return null;
  }

  return (
    <div className="viewer__column">
      <div className="viewer__name">
        {`${material.thickName} ${material.name}`}
      </div>

      <div className="viewer__headerRow">
        <p>General Settings</p>
      </div>
      <div className="viewer__row">
        <p className="viewer__label">Thickness Name</p>
        <p className="viewer__value">{material.thickName}</p>
      </div>
      <div className="viewer__row">
        <p className="viewer__label">Material Name:</p>
        <p className="viewer__value">{material.name}</p>
      </div>
      <div className="viewer__row">
        <p className="viewer__label">Thickness (mm)</p>
        <p className="viewer__value">{material.thickness}</p>
      </div>

      <MaterialCutViewer cut={material.cut} />
      <MaterialScoresViewer scores={material.scores} />
      <MaterialVectorEngravesViewer vectors={material.vectors} />
      <MaterialBitmapEngravesViewer bitmaps={material.bitmaps} />

      <QrCodeViewer material={material} />
    </div>
  );
}
