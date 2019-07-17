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
} from '../material/materialPlugin';
import {
  InputText,
  InputNumber,
  InputNumberWithCheckbox,
} from './Input';
import {
  RemoveVectorEngrave,
  UpdateVectorEngrave,
} from './VectorEngraveSettings';

interface VectorEngraveSettingProps {
  index: number;
  removeVectorEngrave: RemoveVectorEngrave;
  saveTemporaryState: () => void;
  updateVectorEngrave: UpdateVectorEngrave;
  vector: PluginVectorEngraveSetting;
  validationHandler: (id: string, isValid: boolean) => void;
}

export default function VectorEngraveSetting(props: VectorEngraveSettingProps) {
  const maxPower = (props.vector.power === 99.99 || props.vector.power === 100);
  return (
    <>
      <div className="form-sub-header">
        <p>
          {`Vector Engrave ${props.index + 1}`}
        </p>
        <IconMinus
          className="icon-button-add"
          click={() => {
            props.removeVectorEngrave(props.index);
          }}
          height="16px"
          title={`Remove Vector Engrave ${props.index + 1}`}
          width="16px"
        />
      </div>
      <InputText
        label="Name *"
        onBlur={props.saveTemporaryState}
        onChange={(event) => props.updateVectorEngrave(props.index, 'name', event.target.value) }
        value={props.vector.name}
        validate={props.validationHandler}
      />
      <InputNumber
        label="Speed * (100 - 1000)"
        max="1000"
        min="100"
        onBlur={props.saveTemporaryState}
        onChange={(event) => {
          const normalizedValue = toRealEngraveSpeed(asInteger(event.target.value));
          props.updateVectorEngrave(props.index, 'speed', normalizedValue);
        }}
        value={toDisplayEngraveSpeed(props.vector.speed)}
        validate={props.validationHandler}
      />
      <InputNumberWithCheckbox
        isChecked={maxPower}
        isDisabled={maxPower}
        label="Power * (0 - 100)"
        max="100"
        min="0"
        onBlur={props.saveTemporaryState}
        onChange={(event) => props.updateVectorEngrave(props.index, 'power', toRealPower(asInteger(event.target.value))) }
        onChecked={() => {
          const nextMaxPower = !maxPower;
          props.updateVectorEngrave(props.index, 'power', (nextMaxPower) ? 100 : 99);
        }}
        value={toDisplayPower(props.vector.power)}
        validate={props.validationHandler}
      />
      <InputNumber
        label="Passes"
        min="1"
        onBlur={props.saveTemporaryState}
        onChange={(event) => {
          const normalizedValue = asInteger(event.target.value);
          props.updateVectorEngrave(props.index, 'passes', normalizedValue);
        }}
        value={props.vector.passes}
      />
      <InputNumber
        label="Focal Offset (mm)"
        onBlur={props.saveTemporaryState}
        onChange={(event) => {
          const normalizedValue = precisionRound(asFloat(event.target.value), 3);
          props.updateVectorEngrave(props.index, 'focalOffset', normalizedValue);
        }}
        value={props.vector.focalOffset}
      />
      <InputNumber
        label={`Scan Gap (LPI ${toDisplayLinesPerInch(props.vector.scanGap)}) *`}
        onBlur={props.saveTemporaryState}
        onChange={(event) => {
          const normalizedValue = asInteger(event.target.value);
          props.updateVectorEngrave(props.index, 'scanGap', normalizedValue);
        }}
        value={props.vector.scanGap}
        validate={props.validationHandler}
      />
    </>
  );
}
