import React from 'react';
import IconMinus from '../icons/IconMinus';
import {
  asFloat,
  asInteger,
  precisionRound,
} from '../lib/utils';
import {
  toDisplayEngraveSpeed,
  toDisplayLinesPerInch,
  toDisplayPower,
  toRealEngraveSpeed,
  toRealPower,
} from '../lib/glowforgeUnits';
import {
  PluginBitmapEngraveSetting,
} from '../lib/materialRaw';
import {
  InputText,
  InputNumber,
  InputNumberWithCheckbox,
} from './Input';
import {
  RemoveBitmapEngrave,
  UpdateBitmapEngrave,
} from './BitmapEngraveSettings';

interface BitmapEngraveSettingProps {
  bitmap: PluginBitmapEngraveSetting;
  index: number;
  removeBitmapEngrave: RemoveBitmapEngrave;
  saveTemporaryState: () => void;
  updateBitmapEngrave: UpdateBitmapEngrave;
  validationHandler: (id: string, isValid: boolean) => void;
}

export default class BitmapEngraveSetting extends React.Component<BitmapEngraveSettingProps> {
  constructor(props: BitmapEngraveSettingProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(
    prop: keyof PluginBitmapEngraveSetting,
    value: string | number
  ) {
    this.props.updateBitmapEngrave(this.props.index, {
      ...this.props.bitmap,
      [prop]: value,
    });
  }

  render() {
    const maxPower = (this.props.bitmap.power >= 99.99);
    return (
      <>
        <div className="form-sub-header">
          <p>
            {`Bitmap Engrave ${this.props.index + 1}`}
          </p>
          <IconMinus click={() => {
            this.props.removeBitmapEngrave(this.props.index);
          }} height="16px" width="16px" />
        </div>
        <InputText
          label="Name *"
          onBlur={this.props.saveTemporaryState}
          onChange={(event) => this.onChange('name', event.target.value) }
          value={this.props.bitmap.name}
          validate={this.props.validationHandler}
        />
        <InputNumber
          label="Speed *"
          max="1000"
          min="100"
          onBlur={this.props.saveTemporaryState}
          onChange={(event) => this.onChange('speed', toRealEngraveSpeed(asInteger(event.target.value))) }
          value={toDisplayEngraveSpeed(this.props.bitmap.speed)}
          validate={this.props.validationHandler}
        />
        <InputNumberWithCheckbox
          isChecked={maxPower}
          isDisabled={maxPower}
          label="Power *"
          max="100"
          min="0"
          onBlur={this.props.saveTemporaryState}
          onChange={(event) => this.onChange('power', toRealPower(asInteger(event.target.value))) }
          onChecked={() => {
            const nextMaxPower = !maxPower;
            this.onChange('power', (nextMaxPower) ? 100 : 99);
          }}
          value={toDisplayPower(this.props.bitmap.power)}
          validate={this.props.validationHandler}
        />
        <InputNumber
          label="Passes"
          onBlur={this.props.saveTemporaryState}
          onChange={(event) => this.onChange('passes', asInteger(event.target.value)) }
          value={this.props.bitmap.passes}
        />
        <InputNumber
          label="Focal Offset (mm)"
          onBlur={this.props.saveTemporaryState}
          onChange={(event) => this.onChange('focalOffset', precisionRound(asFloat(event.target.value), 3)) }
          value={this.props.bitmap.focalOffset}
        />
        <InputNumber
          label={`Scan Gap (LPI ${toDisplayLinesPerInch(this.props.bitmap.scanGap)}) *`}
          onBlur={this.props.saveTemporaryState}
          onChange={(event) => this.onChange('scanGap', asInteger(event.target.value)) }
          value={this.props.bitmap.scanGap}
          validate={this.props.validationHandler}
        />
      </>
    );
  }
}
