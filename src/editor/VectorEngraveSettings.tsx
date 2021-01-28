import React from 'react';
import { PluginVectorEngraveSetting } from '../material/materialPlugin';
import VectorEngraveSetting from './VectorEngraveSetting';
import { IconPlus } from '../icons/IconPlus';

// Vector Methods
export type AddVectorEngrave = () => void;
export type RemoveVectorEngrave = (index: number) => void;
export type UpdateVectorEngrave =
  <K extends keyof PluginVectorEngraveSetting>(index: number,
    prop: K, value: PluginVectorEngraveSetting[K]) => void;

type VectorEngraveSettingsProps = {
  addVectorEngrave: AddVectorEngrave;
  propValidation?: {[key: string]: boolean | null};
  removeVectorEngrave: RemoveVectorEngrave;
  saveTemporaryState: () => void;
  updateVectorEngrave: UpdateVectorEngrave;
  vectors: PluginVectorEngraveSetting[];
  validationHandler: (id: string, isValid: boolean | null) => void;
}

export default function VectorEngraveSettings(props: VectorEngraveSettingsProps) {
  const {
    addVectorEngrave,
    propValidation,
    removeVectorEngrave,
    saveTemporaryState,
    updateVectorEngrave,
    vectors,
    validationHandler,
  } = props;
  return (
    <>
      <div className="form-header">
        <p>Vector Engrave Settings</p>
        <div>
          <IconPlus
            className="icon-button-add"
            click={addVectorEngrave}
            fill="#001f23"
            height="18px"
            title="Add Vector Engrave"
            width="18px"
          />
        </div>
      </div>
      {
        vectors.map((vector, index) => (
          <VectorEngraveSetting
            index={index}
            key={vector.name}
            propValidation={propValidation}
            removeVectorEngrave={removeVectorEngrave}
            saveTemporaryState={saveTemporaryState}
            updateVectorEngrave={updateVectorEngrave}
            validationHandler={validationHandler}
            vector={vector}
          />
        ))
      }
    </>
  );
}
