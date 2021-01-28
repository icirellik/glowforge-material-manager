import React from 'react';
import {
  storeTempMaterial,
} from '../lib/chromeWrappers';
import type {
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
import { isEquivalentObject } from '../lib/utils';

interface MaterialEditorProps {
  addSetting: AddSetting;
  editorMode: EditorMode;
  material: TempMaterial;
  removeSetting: RemoveSetting;
  updateMaterial: UpdateMaterial;
  updateSetting: UpdateSetting;
  validationHandler: (id: string, isValid: boolean | null) => void;
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

export default class MaterialEditor extends React.Component<MaterialEditorProps> {
  // This is a giant hack to work around the validators forcing rendering to
  // occur twice.
  shouldComponentUpdate(prevProps: MaterialEditorProps) {
    let result = true;
    for (const key of Object.keys(this.props)) {
      const val: any = (this.props as any)[key];
      if (key === 'editorMode') {
        if (((prevProps as any)[key] !== val)) {
          result = true;
          break;
        }
      } else if (key === 'material') {
        if ((prevProps as any)[key] !== val) {
          if (isEquivalentObject((prevProps as any)[key], val as any)) {
            result = false;
          }
        }
      }
    }
    return result;
  }

  render() {
    const {
      addSetting,
      editorMode,
      material,
      removeSetting,
      updateMaterial,
      updateSetting,
      validationHandler,
    } = this.props;
    return (
      <>
        <MaterialSettings
          action={editorMode}
          material={material}
          propValidation={material.propValidation}
          saveTemporaryState={() => {
            saveTemporaryState(editorMode, material);
          }}
          updateMaterial={updateMaterial}
          validationHandler={validationHandler}
        />
        <CutSettings
          cut={material.cut}
          propValidation={material.propValidation}
          saveTemporaryState={() => {
            saveTemporaryState(editorMode, material);
          }}
          updateCut={(prop, value) => {
            updateMaterial('cut', {
              ...material.cut,
              [prop]: value,
            });
          }}
          validationHandler={validationHandler}
        />
        <ScoreSettings
          addScore={() => {
            addSetting('scores');
          }}
          propValidation={material.propValidation}
          removeScore={(index) => {
            removeSetting('scores', index);
          }}
          scores={material.scores}
          saveTemporaryState={() => {
            saveTemporaryState(editorMode, material);
          }}
          updateScore={(index, prop, value) => {
            updateSetting('scores', index, {
              ...material.scores[index],
              [prop]: value,
            });
          }}
          validationHandler={validationHandler}
        />
        <VectorEngraveSettings
          addVectorEngrave={() => {
            addSetting('vectors');
          }}
          propValidation={material.propValidation}
          removeVectorEngrave={(index) => {
            removeSetting('vectors', index);
          }}
          saveTemporaryState={() => {
            saveTemporaryState(editorMode, material);
          }}
          updateVectorEngrave={(index, prop, value) => {
            updateSetting('vectors', index, {
              ...material.vectors[index],
              [prop]: value,
            });
          }}
          vectors={material.vectors}
          validationHandler={validationHandler}
        />
        <BitmapEngraveSettings
          addBitmapEngrave={() => {
            addSetting('bitmaps');
          }}
          bitmaps={material.bitmaps}
          propValidation={material.propValidation}
          removeBitmapEngrave={(index) => {
            removeSetting('bitmaps', index);
          }}
          saveTemporaryState={() => {
            saveTemporaryState(editorMode, material);
          }}
          updateBitmapEngrave={(index, prop, value) => {
            updateSetting('bitmaps', index, {
              ...material.bitmaps[index],
              [prop]: value,
            });
          }}
          validationHandler={validationHandler}
        />
      </>
    );
  }
}
