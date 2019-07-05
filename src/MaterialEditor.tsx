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

/**
 * A simple function that saves the temporary material state so that it may be
 * restored after accidentally closing the plugin window.
 *
 * This function saves state both onChange and onBlue of the input fields.
 *
 * TODO: Implement save onChange
 *
 * @param action
 * @param material
 */
function saveTemporaryState(action: EditorMode, material: TempMaterial) {
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
        saveTemporaryState={() => {
          saveTemporaryState(action, material);
        }}
        updateMaterial={props.updateMaterial}
        validationHandler={props.validationHandler}
      />
      <CutSettings
        cut={material.cut}
        saveTemporaryState={() => {
          saveTemporaryState(action, material);
        }}
        updateCut={props.updateCut}
        validationHandler={props.validationHandler}
      />
      <ScoreSettings
        addScore={props.addScore}
        removeScore={props.removeScore}
        scores={props.material.scores}
        saveTemporaryState={() => {
          saveTemporaryState(action, material);
        }}
        updateScore={props.updateScore}
        validationHandler={props.validationHandler}
      />
      <VectorEngraveSettings
        addVectorEngrave={props.addVectorEngrave}
        removeVectorEngrave={props.removeVectorEngrave}
        saveTemporaryState={() => {
          saveTemporaryState(action, material);
        }}
        updateVectorEngrave={props.updateVectorEngrave}
        vectors={props.material.vectors}
        validationHandler={props.validationHandler}
      />
      <BitmapEngraveSettings
        addBitmapEngrave={props.addBitmapEngrave}
        bitmaps={props.material.bitmaps}
        removeBitmapEngrave={props.removeBitmapEngrave}
        saveTemporaryState={() => {
          saveTemporaryState(action, material);
        }}
        updateBitmapEngrave={props.updateBitmapEngrave}
        validationHandler={props.validationHandler}
      />
    </>
  );
}
