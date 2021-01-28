import React from 'react';
import type { PluginMaterial } from '../material/materialPlugin';
import type { EditorMode, UpdateMaterial } from '../App';
import { InputText, InputNumber } from './Input';
import { asFloat } from '../lib/utils';

type MaterialSettingsProps = {
  action: EditorMode;
  material: PluginMaterial;
  propValidation?: {[key: string]: boolean | null};
  saveTemporaryState: () => void;
  updateMaterial: UpdateMaterial;
  validationHandler: (id: string, isValid: boolean | null) => void;
}

export default function MaterialSettings(props: MaterialSettingsProps) {
  const {
    action,
    material,
    propValidation,
    saveTemporaryState,
    updateMaterial,
    validationHandler,
  } = props;
  return (
    <>
      <div className="form-header">
        <p>Material Settings</p>
      </div>
      <InputText
        label="Thickness Name *"
        isDisabled={action === 'EDIT'}
        onBlur={saveTemporaryState}
        onChange={(event) => updateMaterial('thickName', event.target.value)}
        propValidation={propValidation}
        value={material.thickName}
        validate={validationHandler}
      />
      <InputText
        label="Material Name *"
        isDisabled={action === 'EDIT'}
        onBlur={saveTemporaryState}
        onChange={(event) => updateMaterial('name', event.target.value)}
        propValidation={propValidation}
        value={material.name}
        validate={validationHandler}
      />
      <InputNumber
        label="Thickness (mm) *"
        onBlur={saveTemporaryState}
        onChange={(event) => updateMaterial('thickness', asFloat(event.target.value))}
        propValidation={propValidation}
        value={material.thickness}
        validate={validationHandler}
      />
    </>
  );
}
