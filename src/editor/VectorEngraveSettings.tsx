import React from 'react';
import { PluginVectorEngraveSetting } from '../lib/materialRaw';
import VectorEngraveSetting from './VectorEngraveSetting';
import IconPlus from '../icons/IconPlus';
import { AddVectorEngrave } from '../App';

type VectorEngraveSettingsProps = {
  addVectorEngrave: AddVectorEngrave;
  removeVectorEngrave: Function;
  storeLocalMaterial: Function;
  updateVectorEngrave: Function;
  vectors: PluginVectorEngraveSetting[];
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
              storeLocalMaterial={props.storeLocalMaterial}
              removeVectorEngrave={props.removeVectorEngrave}
              updateVectorEngrave={props.updateVectorEngrave}
              vector={vector}
            />
          );
        })
      }
    </>
  )
}
