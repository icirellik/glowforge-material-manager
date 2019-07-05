import React from 'react';
import {
  storeTempMaterial,
} from './lib/chromeWrappers';
import {
  AddBitmapEngrave,
  AddScore,
  AddVectorEngrave,
  EditorMode,
  RemoveBitmapEngrave,
  RemoveScore,
  RemoveVectorEngrave,
  UpdateBitmapEngrave,
  UpdateCut,
  UpdateMaterial,
  UpdateScore,
  UpdateVectorEngrave,
} from './App';
import BitmapEngraveSettings from './editor/BitmapEngraveSettings';
import CutSettings from './editor/CutSettings';
import MaterialSettings from './editor/MaterialSettings';
import ScoreSettings from './editor/ScoreSettings';
import VectorEngraveSettings from './editor/VectorEngraveSettings';
import { TempMaterial } from './lib/constants';
import './MaterialEditor.css';

interface MaterialEditorProps {
  action: EditorMode;
  addBitmapEngrave: AddBitmapEngrave;
  addScore: AddScore;
  addVectorEngrave: AddVectorEngrave;
  material: TempMaterial;
  removeScore: RemoveScore;
  removeBitmapEngrave: RemoveBitmapEngrave;
  removeVectorEngrave: RemoveVectorEngrave;
  updateBitmapEngrave: UpdateBitmapEngrave;
  updateCut: UpdateCut;
  updateMaterial: UpdateMaterial;
  updateScore: UpdateScore;
  updateVectorEngrave: UpdateVectorEngrave;
  validationHandler: (id: string, isValid: boolean) => void;
}

function storeLocalMaterial(action: EditorMode, material: TempMaterial) {
  if (action === 'ADD') {
    storeTempMaterial(material);
  }
}

export default function MaterialEditor(props: MaterialEditorProps) {
  const {
    action,
    material,
  } = props;

  if (action !== 'ADD' && action !== 'EDIT') {
    return null;
  }

  return (
    <>
      <MaterialSettings
        action={props.action}
        material={props.material}
        storeLocalMaterial={() => {
          storeLocalMaterial(action, material);
        }}
        updateMaterial={props.updateMaterial}
        validationHandler={props.validationHandler}
      />
      <CutSettings
        cut={material.cut}
        storeLocalMaterial={() => {
          storeLocalMaterial(action, material);
        }}
        updateCut={props.updateCut}
        validationHandler={props.validationHandler}
      />
      <ScoreSettings
        addScore={props.addScore}
        removeScore={props.removeScore}
        scores={props.material.scores}
        storeLocalMaterial={() => {
          storeLocalMaterial(action, material);
        }}
        updateScore={props.updateScore}
        validationHandler={props.validationHandler}
      />
      <VectorEngraveSettings
        addVectorEngrave={props.addVectorEngrave}
        removeVectorEngrave={props.removeVectorEngrave}
        storeLocalMaterial={() => {
          storeLocalMaterial(action, material);
        }}
        updateVectorEngrave={props.updateVectorEngrave}
        vectors={props.material.vectors}
        validationHandler={props.validationHandler}
      />
      <BitmapEngraveSettings
        addBitmapEngrave={props.addBitmapEngrave}
        bitmaps={props.material.bitmaps}
        removeBitmapEngrave={props.removeBitmapEngrave}
        storeLocalMaterial={() => {
          storeLocalMaterial(action, material);
        }}
        updateBitmapEngrave={props.updateBitmapEngrave}
        validationHandler={props.validationHandler}
      />
    </>
  );
}
