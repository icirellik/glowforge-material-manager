import React from 'react';
import {
  storeTempMaterial,
} from '../lib/chromeWrappers';
import {
  AddSetting,
  EditorMode,
  RemoveSetting,
  UpdateMaterial,
  UpdateSetting,
} from '../App';
import { TempMaterial } from '../lib/materialHelpers';
import BitmapEngraveSettings from './BitmapEngraveSettings';
import CutSettings from './CutSettings';
import MaterialSettings from './MaterialSettings';
import ScoreSettings from './ScoreSettings';
import VectorEngraveSettings from './VectorEngraveSettings';
import './MaterialEditor.css';

interface MaterialEditorProps {
  addSetting: AddSetting;
  editorMode: EditorMode;
  material: TempMaterial;
  removeSetting: RemoveSetting;
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
 * @param editorMode
 * @param material
 */
function saveTemporaryState(editorMode: EditorMode, material: TempMaterial) {
  if (editorMode === 'ADD') {
    storeTempMaterial(material);
  }
}

export default function MaterialEditor(props: MaterialEditorProps) {
  const {
    editorMode,
    material,
  } = props;

  return (
    <>
      <MaterialSettings
        action={props.editorMode}
        material={props.material}
        saveTemporaryState={() => {
          saveTemporaryState(editorMode, material);
        }}
        updateMaterial={props.updateMaterial}
        validationHandler={props.validationHandler}
      />
      <CutSettings
        cut={material.cut}
        saveTemporaryState={() => {
          saveTemporaryState(editorMode, material);
        }}
        updateCut={(prop, value) => {
          props.updateMaterial('cut', {
            ...props.material.cut,
            [prop]: value,
          });
        }}
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
          saveTemporaryState(editorMode, material);
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
          saveTemporaryState(editorMode, material);
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
          saveTemporaryState(editorMode, material);
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
