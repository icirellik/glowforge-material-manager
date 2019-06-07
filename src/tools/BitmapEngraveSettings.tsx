import React from 'react';
import IconPlus from '../icons/IconPlus';
import BitmapEngraveSetting from './BitmapEngraveSetting';
import { AddBitmapEngrave } from '../App';
import { PluginBitmapEngraveSetting } from '../lib/materialRaw';

type BitmapEngraveSettingsProps = {
  addBitmapEngrave: AddBitmapEngrave;
  bitmaps: PluginBitmapEngraveSetting[];
  removeBitmapEngrave: Function;
  storeLocalMaterial: Function;
  updateBitmapEngrave: Function;
}

export default function BitmapEngraveSettings(props: BitmapEngraveSettingsProps) {
  return (
    <>
      <div className="form-header">
        <p>Bitmap Engrave Settings</p>
        <div>
          <IconPlus
            click={props.addBitmapEngrave}
            fill="#001f23"
            height="18px"
            width="18px"
          />
        </div>
      </div>
      {
        props.bitmaps.map((bitmap, index) => {
          return (
            <BitmapEngraveSetting
              bitmap={bitmap}
              index={index}
              removeBitmapEngrave={props.removeBitmapEngrave}
              storeLocalMaterial={props.storeLocalMaterial}
              updateBitmapEngrave={props.updateBitmapEngrave}
            />
          );
        })
      }
    </>
  );
}
