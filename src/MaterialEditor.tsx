import React from 'react';
import {
  storeTempMaterial,
} from './lib/chromeWrappers';
import {
  EditorMode,
  UpdateCut,
  UpdateMaterial,
  AddSetting,
  RemoveSetting,
  UpdateSetting,
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
  addSetting: AddSetting;
  material: TempMaterial;
  removeSetting: RemoveSetting;
  updateCut: UpdateCut;
  updateMaterial: UpdateMaterial;
  updateSetting: UpdateSetting;
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
        addScore={() => {
          props.addSetting('scores');
        }}
        removeScore={(index) => {
          props.removeSetting('scores', index);
        }}
        scores={props.material.scores}
        saveTemporaryState={() => {
          saveTemporaryState(action, material);
        }}
        updateScore={(index, prop, value) => {
          props.updateSetting('scores', index, {
            ...props.material.scores[index],
            [prop]: value,
          });
        }}
        validationHandler={props.validationHandler}
      />
      <VectorEngraveSettings
        addVectorEngrave={() => {
          props.addSetting('vectors');
        }}
        removeVectorEngrave={(index) => {
          props.removeSetting('vectors', index);
        }}
        saveTemporaryState={() => {
          saveTemporaryState(action, material);
        }}
        updateVectorEngrave={(index, prop, value) => {
          props.updateSetting('vectors', index, {
            ...props.material.vectors[index],
            [prop]: value,
          });
        }}
        vectors={props.material.vectors}
        validationHandler={props.validationHandler}
      />
      <BitmapEngraveSettings
        addBitmapEngrave={() => {
          props.addSetting('bitmaps');
        }}
        bitmaps={props.material.bitmaps}
        removeBitmapEngrave={(index) => {
          props.removeSetting('bitmaps', index);
        }}
        saveTemporaryState={() => {
          saveTemporaryState(action, material);
        }}
        updateBitmapEngrave={(index, prop, value) => {
          props.updateSetting('bitmaps', index, {
            ...props.material.bitmaps[index],
            [prop]: value,
          });
        }}
        validationHandler={props.validationHandler}
      />
    </>
  );
}
