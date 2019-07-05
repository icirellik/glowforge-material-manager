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
  PluginVectorEngraveSetting,
} from '../lib/materialRaw';
import {
  InputText,
  InputNumber,
  InputNumberWithCheckbox,
} from './Input';

interface VectorEngraveSettingProps {
  index: number;
  removeVectorEngrave: Function;
  storeLocalMaterial: React.FocusEventHandler<any>;
  updateVectorEngrave: Function;
  vector: PluginVectorEngraveSetting;
  validationHandler: (id: string, isValid: boolean) => void;
}

export default class VectorEngraveSetting extends React.Component<VectorEngraveSettingProps> {
  constructor(props: VectorEngraveSettingProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(
    prop: keyof PluginVectorEngraveSetting,
    value: string | number
  ) {
    this.props.updateVectorEngrave(this.props.index, {
      ...this.props.vector,
      [prop]: value,
    });
  }

  render() {
    const maxPower = (this.props.vector.power >= 99.99);
    return (
      <>
        <div className="form-sub-header">
          <p>
            {`Vector Engrave ${this.props.index + 1}`}
          </p>
          <IconMinus click={() => {
            this.props.removeVectorEngrave(this.props.index);
          }} height="16px" width="16px" />
        </div>
        <InputText
          label="Name *"
          onBlur={this.props.storeLocalMaterial}
          onChange={(event) => this.onChange('name', event.target.value) }
          value={this.props.vector.name}
          validate={this.props.validationHandler}
        />
         <InputNumber
          label="Speed *"
          max="1000"
          min="100"
          onBlur={this.props.storeLocalMaterial}
          onChange={(event) => this.onChange('speed', toRealEngraveSpeed(asInteger(event.target.value))) }
          value={toDisplayEngraveSpeed(this.props.vector.speed)}
          validate={this.props.validationHandler}
        />
        <InputNumberWithCheckbox
          isChecked={maxPower}
          isDisabled={maxPower}
          label="Power *"
          max="100"
          min="0"
          onBlur={this.props.storeLocalMaterial}
          onChange={(event) => this.onChange('power', toRealPower(asInteger(event.target.value))) }
          onChecked={() => {
            const nextMaxPower = !maxPower;
            this.onChange('power', (nextMaxPower) ? 100 : 99);
          }}
          value={toDisplayPower(this.props.vector.power)}
          validate={this.props.validationHandler}
        />
        <InputNumber
          label="Passes"
          onBlur={this.props.storeLocalMaterial}
          onChange={(event) => this.onChange('passes', asInteger(event.target.value)) }
          value={this.props.vector.passes}
        />
        <InputNumber
          label="Focal Offset (mm)"
          onBlur={this.props.storeLocalMaterial}
          onChange={(event) => this.onChange('focalOffset', precisionRound(asFloat(event.target.value), 3)) }
          value={this.props.vector.focalOffset}
        />
        <InputNumber
          label={`Scan Gap (LPI ${toDisplayLinesPerInch(this.props.vector.scanGap)}) *`}
          onBlur={this.props.storeLocalMaterial}
          onChange={(event) => this.onChange('scanGap', asInteger(event.target.value)) }
          value={this.props.vector.scanGap}
          validate={this.props.validationHandler}
        />
      </>
    );
  }
}
