import React from 'react';
import IconPlus from '../icons/IconPlus';
import BitmapEngraveSetting from './BitmapEngraveSetting';
import { PluginBitmapEngraveSetting } from '../material/materialPlugin';

// Bitmap Methods
export type AddBitmapEngrave = () => void;
export type RemoveBitmapEngrave = (index: number) => void;
export type UpdateBitmapEngrave = (
  index: number,
  prop: keyof PluginBitmapEngraveSetting,
  value: number | string,
) => void;

type BitmapEngraveSettingsProps = {
  addBitmapEngrave: AddBitmapEngrave;
  bitmaps: PluginBitmapEngraveSetting[];
  removeBitmapEngrave: RemoveBitmapEngrave;
  saveTemporaryState: () => void;
  updateBitmapEngrave: UpdateBitmapEngrave;
  validationHandler: (id: string, isValid: boolean) => void;
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
              saveTemporaryState={props.saveTemporaryState}
              updateBitmapEngrave={props.updateBitmapEngrave}
              validationHandler={props.validationHandler}
            />
          );
        })
      }
    </>
  );
}
