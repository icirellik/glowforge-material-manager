import React from 'react';
import { IconPlus } from '../icons/IconPlus';
import BitmapEngraveSetting from './BitmapEngraveSetting';
import type { PluginBitmapEngraveSetting } from '../material/materialPlugin';

// Bitmap Methods
export type AddBitmapEngrave = () => void;
export type RemoveBitmapEngrave = (index: number) => void;
export type UpdateBitmapEngrave =
  <K extends keyof PluginBitmapEngraveSetting>(index: number,
    prop: K, value: PluginBitmapEngraveSetting[K]) => void;

type BitmapEngraveSettingsProps = {
  addBitmapEngrave: AddBitmapEngrave;
  bitmaps: PluginBitmapEngraveSetting[];
  propValidation?: {[key: string]: boolean | null};
  removeBitmapEngrave: RemoveBitmapEngrave;
  saveTemporaryState: () => void;
  updateBitmapEngrave: UpdateBitmapEngrave;
  validationHandler: (id: string, isValid: boolean | null) => void;
}

export default function BitmapEngraveSettings(props: BitmapEngraveSettingsProps) {
  const {
    addBitmapEngrave,
    bitmaps,
    propValidation,
    removeBitmapEngrave,
    saveTemporaryState,
    updateBitmapEngrave,
    validationHandler,
  } = props;
  return (
    <>
      <div className="form-header">
        <p>Bitmap Engrave Settings</p>
        <div>
          <IconPlus
            className="icon-button-add"
            click={addBitmapEngrave}
            fill="#001f23"
            height="18px"
            title="Add Bitmap Engrave"
            width="18px"
          />
        </div>
      </div>
      {
        bitmaps.map((bitmap, index) => (
          <BitmapEngraveSetting
            bitmap={bitmap}
            index={index}
            key={bitmap.name}
            propValidation={propValidation}
            removeBitmapEngrave={removeBitmapEngrave}
            saveTemporaryState={saveTemporaryState}
            updateBitmapEngrave={updateBitmapEngrave}
            validationHandler={validationHandler}
          />
        ))
      }
    </>
  );
}
