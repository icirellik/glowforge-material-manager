import React from 'react';
import { PluginVectorEngraveSetting } from '../material/materialPlugin';
import VectorEngraveSetting from './VectorEngraveSetting';
import IconPlus from '../icons/IconPlus';

// Vector Methods
export type AddVectorEngrave = () => void;
export type RemoveVectorEngrave = (index: number) => void;
export type UpdateVectorEngrave =
  <K extends keyof PluginVectorEngraveSetting>(index: number,
    prop: K, value: PluginVectorEngraveSetting[K]) => void;

type VectorEngraveSettingsProps = {
  addVectorEngrave: AddVectorEngrave;
  removeVectorEngrave: RemoveVectorEngrave;
  saveTemporaryState: () => void;
  updateVectorEngrave: UpdateVectorEngrave;
  vectors: PluginVectorEngraveSetting[];
  validationHandler: (id: string, isValid: boolean) => void;
}

export default function VectorEngraveSettings(props: VectorEngraveSettingsProps) {
  return (
    <>
      <div className="form-header">
        <p>Vector Engrave Settings</p>
        <div>
          <IconPlus
            click={props.addVectorEngrave}
            fill="#001f23"
            height="18px"
            width="18px"
          />
        </div>
      </div>
      {
        props.vectors.map((vector, index) => {
          return (
            <VectorEngraveSetting
              index={index}
              saveTemporaryState={props.saveTemporaryState}
              removeVectorEngrave={props.removeVectorEngrave}
              updateVectorEngrave={props.updateVectorEngrave}
              vector={vector}
              validationHandler={props.validationHandler}
            />
          );
        })
      }
    </>
  )
}
