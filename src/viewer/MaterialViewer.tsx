import React from 'react';
import { ModeCancel, EditorMode } from '../App';
import { RawMaterial } from '../lib/material';
import MaterialBitmapEngravesViewer from './MaterialBitmapEngravesViewer';
import MaterialButtonBar from '../MaterialButtonBar';
import MaterialCutViewer from './MaterialCutViewer';
import MaterialScoresViewer from './MaterialScoresViewer';
import MaterialVectorEngravesViewer from './MaterialVectorEngravesViewer';

export type MaterialViewerProps = {
  editorMode: EditorMode;
  cancelMaterial: ModeCancel;
  material: RawMaterial;
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
    <div className="App-flexColumn">
      <div className="App-flex">
        <p className="App-flexLabel">Thickness Name</p>
        <p>{material.thickName}</p>
      </div>
      <div className="App-flex">
        <p className="App-flexLabel">Material Name:</p>
        <p>{material.name}</p>
      </div>
      <div className="App-flex">
        <p className="App-flexLabel">Thickness (mm)</p>
        <p>{material.thickness}</p>
      </div>

      <MaterialCutViewer cut={material.cut} />
      <MaterialScoresViewer scores={material.scores} />
      <MaterialVectorEngravesViewer vectors={material.vectors} />
      <MaterialBitmapEngravesViewer bitmaps={material.bitmaps} />

      <MaterialButtonBar
        editorMode={props.editorMode}
        cancelMaterial={props.cancelMaterial}
      />
    </div>
  );
}
