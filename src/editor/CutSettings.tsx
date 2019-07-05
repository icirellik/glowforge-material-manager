import React from 'react';
import {
  asFloat,
  asInteger,
  precisionRound,
} from '../lib/utils';
import {
  toDisplayCutSpeed,
  toDisplayPower,
  toRealCutSpeed,
  toRealPower,
} from '../lib/glowforgeUnits';
import {
  PluginCutSetting,
} from '../lib/materialRaw';
import {
  InputNumber,
  InputNumberWithCheckbox,
} from './Input';

interface CutSettingsProps {
  cut: PluginCutSetting;
  saveTemporaryState: () => void;
  updateCut: Function;
  validationHandler: (id: string, isValid: boolean) => void;
}

export default class CutSettings extends React.Component<CutSettingsProps> {
  constructor(props: CutSettingsProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(
    prop: keyof PluginCutSetting,
    value: string | number
  ) {
    this.props.updateCut({
      ...this.props.cut,
      [prop]: value,
    });
  }

  render() {
    const maxPower = (this.props.cut.power >= 99.99);
    return (
      <>
        <div className="form-header">
          <p>Cut Settings</p>
        </div>
        <InputNumber
          label="Speed *"
          max="500"
          min="100"
          onBlur={this.props.saveTemporaryState}
          onChange={(event) => this.onChange('speed', toRealCutSpeed(asInteger(event.target.value))) }
          value={toDisplayCutSpeed(this.props.cut.speed)}
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
          value={toDisplayPower(this.props.cut.power)}
          validate={this.props.validationHandler}
        />
        <InputNumber
          label="Passes"
          onBlur={this.props.saveTemporaryState}
          onChange={(event) => this.onChange('passes', asInteger(event.target.value)) }
          value={this.props.cut.passes}
        />
        <InputNumber
          label="Focal Offset (mm)"
          onBlur={this.props.saveTemporaryState}
          onChange={(event) => this.onChange('focalOffset', precisionRound(asFloat(event.target.value), 3)) }
          value={this.props.cut.focalOffset}
        />
      </>
    );
  }
}
