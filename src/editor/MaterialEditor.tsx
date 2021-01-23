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
      editorMode,
      material,
    } = this.props;
    return (
      <>
        <MaterialSettings
          action={this.props.editorMode}
          material={this.props.material}
          propValidation={this.props.material.propValidation}
          saveTemporaryState={() => {
            saveTemporaryState(editorMode, material);
          }}
          updateMaterial={this.props.updateMaterial}
          validationHandler={this.props.validationHandler}
        />
        <CutSettings
          cut={material.cut}
          propValidation={this.props.material.propValidation}
          saveTemporaryState={() => {
            saveTemporaryState(editorMode, material);
          }}
          updateCut={(prop, value) => {
            this.props.updateMaterial('cut', {
              ...this.props.material.cut,
              [prop]: value,
            });
          }}
          validationHandler={this.props.validationHandler}
        />
        <ScoreSettings
          addScore={() => {
            this.props.addSetting('scores');
          }}
          propValidation={this.props.material.propValidation}
          removeScore={(index) => {
            this.props.removeSetting('scores', index);
          }}
          scores={this.props.material.scores}
          saveTemporaryState={() => {
            saveTemporaryState(editorMode, material);
          }}
          updateScore={(index, prop, value) => {
            this.props.updateSetting('scores', index, {
              ...this.props.material.scores[index],
              [prop]: value,
            });
          }}
          validationHandler={this.props.validationHandler}
        />
        <VectorEngraveSettings
          addVectorEngrave={() => {
            this.props.addSetting('vectors');
          }}
          propValidation={this.props.material.propValidation}
          removeVectorEngrave={(index) => {
            this.props.removeSetting('vectors', index);
          }}
          saveTemporaryState={() => {
            saveTemporaryState(editorMode, material);
          }}
          updateVectorEngrave={(index, prop, value) => {
            this.props.updateSetting('vectors', index, {
              ...this.props.material.vectors[index],
              [prop]: value,
            });
          }}
          vectors={this.props.material.vectors}
          validationHandler={this.props.validationHandler}
        />
        <BitmapEngraveSettings
          addBitmapEngrave={() => {
            this.props.addSetting('bitmaps');
          }}
          bitmaps={this.props.material.bitmaps}
          propValidation={this.props.material.propValidation}
          removeBitmapEngrave={(index) => {
            this.props.removeSetting('bitmaps', index);
          }}
          saveTemporaryState={() => {
            saveTemporaryState(editorMode, material);
          }}
          updateBitmapEngrave={(index, prop, value) => {
            this.props.updateSetting('bitmaps', index, {
              ...this.props.material.bitmaps[index],
              [prop]: value,
            });
          }}
          validationHandler={this.props.validationHandler}
        />
      </>
    );
  }
}
