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
} from '../material/materialPlugin';
import {
  InputText,
  InputNumber,
  InputNumberWithCheckbox,
} from './Input';
import {
  RemoveScore,
  UpdateScore,
} from './ScoreSettings';

interface ScoreSettingProps {
  index: number;
  removeScore: RemoveScore;
  score: PluginScoreSetting;
  saveTemporaryState: () => void;
  updateScore: UpdateScore;
  validationHandler: (id: string, isValid: boolean) => void;
}

export default function ScoreSetting(props: ScoreSettingProps) {
  const maxPower = (props.score.power === 99.99 || props.score.power === 100);
  return (
    <>
      <div className="form-sub-header">
        <p>
          {`Score ${props.index + 1}`}
        </p>
        <IconMinus click={() => {
          props.removeScore(props.index);
        }} className="icon-button-add" height="16px" width="16px" />
      </div>
      <InputText
        label="Name *"
        onBlur={props.saveTemporaryState}
        onChange={(event) => props.updateScore(props.index, 'name', event.target.value) }
        value={props.score.name}
        validate={props.validationHandler}
      />
      <InputNumber
        label="Speed * (100 - 500)"
        max="500"
        min="100"
        onBlur={props.saveTemporaryState}
        onChange={(event) => {
          const normalizedValue = toRealCutSpeed(asInteger(event.target.value));
          props.updateScore(props.index, 'speed', normalizedValue);
        }}
        value={toDisplayCutSpeed(props.score.speed)}
        validate={props.validationHandler}
      />
      <InputNumberWithCheckbox
        isChecked={maxPower}
        isDisabled={maxPower}
        label="Power * (0 - 100)"
        max="100"
        min="0"
        onBlur={props.saveTemporaryState}
        onChange={(event) => {
          const normalizedValue = toRealPower(asInteger(event.target.value));
          props.updateScore(props.index, 'power', normalizedValue);
        }}
        onChecked={() => {
          const nextMaxPower = !maxPower;
          props.updateScore(props.index,'power', (nextMaxPower) ? 100 : 99);
        }}
        value={toDisplayPower(props.score.power)}
        validate={props.validationHandler}
      />
      <InputNumber
        label="Passes"
        min="1"
        onBlur={props.saveTemporaryState}
        onChange={(event) => {
          const normalizedValue = asInteger(event.target.value);
          props.updateScore(props.index, 'passes', normalizedValue);
        }}
        value={props.score.passes}
      />
      <InputNumber
        label="Focal Offset (mm)"
        onBlur={props.saveTemporaryState}
        onChange={(event) => {
          const normalizedValue = precisionRound(asFloat(event.target.value), 3);
          props.updateScore(props.index, 'focalOffset', normalizedValue);
        }}
        value={props.score.focalOffset}
      />
    </>
  );
}
