import React from 'react';
import IconMinus from '../icons/IconMinus';
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
  PluginScoreSetting,
} from '../lib/materialRaw';
import {
  InputText,
  InputNumber,
  InputNumberWithCheckbox,
} from './Input';

interface ScoreSettingProps {
  index: number;
  removeScore: Function;
  score: PluginScoreSetting;
  saveTemporaryState: () => void;
  updateScore: Function;
  validationHandler: (id: string, isValid: boolean) => void;
}

export default class ScoreSetting extends React.Component<ScoreSettingProps> {
  constructor(props: ScoreSettingProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(
    prop: keyof PluginScoreSetting,
    value: string | number
  ) {
    this.props.updateScore(this.props.index, {
      ...this.props.score,
      [prop]: value,
    });
  }

  render() {
    const maxPower = (this.props.score.power >= 99.99);
    return (
      <>
        <div className="form-sub-header">
          <p>
            {`Score ${this.props.index + 1}`}
          </p>
          <IconMinus click={() => {
            this.props.removeScore(this.props.index);
          }} height="16px" width="16px" />
        </div>
        <InputText
          label="Name *"
          onBlur={this.props.saveTemporaryState}
          onChange={(event) => this.onChange('name', event.target.value) }
          value={this.props.score.name}
          validate={this.props.validationHandler}
        />
        <InputNumber
          label="Speed *"
          max="500"
          min="100"
          onBlur={this.props.saveTemporaryState}
          onChange={(event) => this.onChange('speed', toRealCutSpeed(asInteger(event.target.value))) }
          value={toDisplayCutSpeed(this.props.score.speed)}
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
          value={toDisplayPower(this.props.score.power)}
          validate={this.props.validationHandler}
        />
        <InputNumber
          label="Passes"
          onBlur={this.props.saveTemporaryState}
          onChange={(event) => this.onChange('passes', asInteger(event.target.value)) }
          value={this.props.score.passes}
        />
        <InputNumber
          label="Focal Offset (mm)"
          onBlur={this.props.saveTemporaryState}
          onChange={(event) => this.onChange('focalOffset', precisionRound(asFloat(event.target.value), 3)) }
          value={this.props.score.focalOffset}
        />
      </>
    );
  }
}
