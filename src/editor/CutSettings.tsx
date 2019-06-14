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
import { PluginCutSetting } from '../lib/materialRaw';

interface CutSettingsProps {
  cut: PluginCutSetting;
  storeLocalMaterial: Function;
  updateCut: Function;
}

export default class CutSettings extends React.Component<CutSettingsProps> {
  state = {
    maxPower: (this.props.cut.power === 100),
  }

  render() {
    const { cut } = this.props;
    return (
      <>
        <div className="form-header">
          <p>Cut Settings</p>
        </div>
        <div className="form-field">
          <label>Speed *</label>
          <input
            type="number"
            value={toDisplayCutSpeed(cut.speed)}
            min="100"
            max="500"
            onChange={(event) => this.props.updateCut({
              ...cut,
              speed: toRealCutSpeed(asInteger(event.target.value)),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="form-field">
          <div className="form-field-right">
            <label>Power *</label>
            <label className="label">Max Power</label>
            <input
              type="checkbox"
              value={this.state.maxPower? 1 : 0}
              checked={this.state.maxPower}
              onChange={() => {
                const nextMaxPower = !this.state.maxPower;
                this.props.updateCut({
                  ...cut,
                  power: (nextMaxPower) ? 100 : 99,
                });
                this.setState({
                  maxPower: nextMaxPower,
                });
              }}
              onBlur={() => this.props.storeLocalMaterial()}
            />
          </div>
          <input
            type="number"
            disabled={this.state.maxPower}
            value={toDisplayPower(cut.power)}
            min="0"
            max="100"
            onChange={(event) => this.props.updateCut({
              ...cut,
              power: toRealPower(asInteger(event.target.value)),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="form-field">
          <label>Passes</label>
          <input
            type="number"
            value={cut.passes}
            onChange={(event) => this.props.updateCut({
              ...cut,
              passes: asInteger(event.target.value),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="form-field">
          <label>Focal Offset (mm)</label>
          <input
            type="number"
            value={cut.focalOffset ? cut.focalOffset : undefined}
            onChange={(event) => this.props.updateCut({
              ...cut,
              focalOffset: precisionRound(asFloat(event.target.value), 3),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
      </>
    );
  }
}
