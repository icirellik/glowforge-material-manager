import React from 'react';
import { PluginVectorEngraveSetting } from '../lib/materialRaw';
import VectorEngraveSetting from './VectorEngraveSetting';
import IconPlus from '../icons/IconPlus';
import { AddVectorEngrave } from '../App';

type VectorEngraveSettingsProps = {
  addVectorEngrave: AddVectorEngrave;
  removeVectorEngrave: Function;
  saveTemporaryState: () => void;
  updateVectorEngrave: Function;
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
