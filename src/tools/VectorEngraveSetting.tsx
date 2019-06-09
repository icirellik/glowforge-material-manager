import React from 'react';
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
import { PluginVectorEngraveSetting } from '../lib/materialRaw';
import IconMinus from '../icons/IconMinus';

interface VectorEngraveSettingProps {
  index: number;
  removeVectorEngrave: Function;
  storeLocalMaterial: Function;
  updateVectorEngrave: Function;
  vector: PluginVectorEngraveSetting;
}

export default class VectorEngraveSetting extends React.Component<VectorEngraveSettingProps> {
  state = {
    maxPower: (this.props.vector.power === 100),
  }

  render() {
    const { index: id, vector } = this.props;
    return (
      <>
        <div style={{display: 'flex', marginBottom: '8px'}}>
          <p style={{
            display: 'flex',
            alignItems: 'center',
            height: '18px',
            marginRight: '4px',
          }}>
            {`Vector Engrave ${this.props.index + 1}`}
          </p>
          <IconMinus click={() => {
            this.props.removeVectorEngrave(this.props.index);
          }} height="16px" width="16px" />
        </div>
        <div className="form-field" style={(id !== 0) ? { marginTop: '20px' } : undefined}>
          <label>Name *</label>
          <input
            type="text"
            value={vector.name}
            onChange={(event) => this.props.updateVectorEngrave(id, {
              ...vector,
              name: event.target.value
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="form-field">
          <label>Speed *</label>
          <input
            type="number"
            value={toDisplayEngraveSpeed(vector.speed)}
            min="100"
            max="1000"
            onChange={(event) => this.props.updateVectorEngrave(id, {
              ...vector,
              speed: toRealEngraveSpeed(asInteger(event.target.value)),
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
                this.props.updateVectorEngrave(id, {
                  ...vector,
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
            value={toDisplayPower(vector.power)}
            min="0"
            max="100"
            onChange={(event) => this.props.updateVectorEngrave(id, {
              ...vector,
              power: toRealPower(asInteger(event.target.value)),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="form-field">
          <label>Passes</label>
          <input
            type="number"
            value={vector.passes}
            onChange={(event) => this.props.updateVectorEngrave(id, {
              ...vector,
              passes: asInteger(event.target.value),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="form-field">
          <label>Focal Offset (mm)</label>
          <input
            type="number"
            value={vector.focalOffset ? vector.focalOffset : undefined}
            onChange={(event) => this.props.updateVectorEngrave(id, {
              ...vector,
              focalOffset: precisionRound(asFloat(event.target.value), 3),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="form-field">
          <label>Scan Gap (LPI {`${toDisplayLinesPerInch(vector.scanGap ? vector.scanGap : 0)}`}) *</label>
          <input
            type="number"
            value={vector.scanGap ? vector.scanGap : undefined}
            onChange={(event) => this.props.updateVectorEngrave(id, {
              ...vector,
              scanGap: asInteger(event.target.value),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
      </>
    );
  }
}
