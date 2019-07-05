import React from 'react';
import { PluginMaterial } from '../lib/materialRaw';
import { EditorMode } from '../App';
import { InputText, InputNumber } from './Input';
import { asFloat } from '../lib/utils';

type MaterialSettingsProps = {
  action: EditorMode;
  material: PluginMaterial;
  storeLocalMaterial: React.FocusEventHandler<any>;
  updateMaterial: Function;
  validationHandler: (id: string, isValid: boolean) => void;
}

export default function MaterialSettings(props: MaterialSettingsProps) {
  return (
    <>
      <div className="form-header">
        <p>Material Settings</p>
      </div>
      <InputText
        label="Thickness Name *"
        isDisabled={props.action === 'EDIT'}
        onBlur={props.storeLocalMaterial}
        onChange={(event) => props.updateMaterial('thickName', event.target.value) }
        value={props.material.thickName}
        validate={props.validationHandler}
      />
      <InputText
        label="Material Name *"
        isDisabled={props.action === 'EDIT'}
        onBlur={props.storeLocalMaterial}
        onChange={(event) => props.updateMaterial('name', event.target.value) }
        value={props.material.name}
        validate={props.validationHandler}
      />
      <InputNumber
        label="Thickness (mm) *"
        onBlur={props.storeLocalMaterial}
        onChange={(event) => props.updateMaterial('thickness', asFloat(event.target.value)) }
        value={props.material.thickness}
        validate={props.validationHandler}
      />
    </>
  );
}
