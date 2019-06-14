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
import { PluginBitmapEngraveSetting } from '../lib/materialRaw';
import IconMinus from '../icons/IconMinus';

interface BitmapEngraveSettingProps {
  bitmap: PluginBitmapEngraveSetting;
  index: number;
  removeBitmapEngrave: Function;
  storeLocalMaterial: Function;
  updateBitmapEngrave: Function;
}

export default class BitmapEngraveSetting extends React.Component<BitmapEngraveSettingProps> {
  state = {
    maxPower: (this.props.bitmap.power === 100),
  }

  render() {
    const { index: id, bitmap } = this.props;
    return (
      <>
        <div style={{display: 'flex', marginBottom: '8px'}}>
          <p style={{
            display: 'flex',
            alignItems: 'center',
            height: '18px',
            marginRight: '4px',
          }}>
            {`Bitmap Engrave ${this.props.index + 1}`}
          </p>
          <IconMinus click={() => {
            this.props.removeBitmapEngrave(this.props.index);
          }} height="16px" width="16px" />
        </div>
        <div className="form-field" style={(id !== 0) ? { marginTop: '20px' } : undefined}>
          <label>Name *</label>
          <input
            type="text"
            value={bitmap.name}
            onChange={(event) => this.props.updateBitmapEngrave(id, {
              ...bitmap,
              name: event.target.value,
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="form-field">
          <label>Speed *</label>
          <input
            type="number"
            value={toDisplayEngraveSpeed(bitmap.speed)}
            min="100"
            max="1000"
            onChange={(event) => this.props.updateBitmapEngrave(id, {
              ...bitmap,
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
                this.props.updateBitmapEngrave(id, {
                  ...bitmap,
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
            value={toDisplayPower(bitmap.power)}
            min="0"
            max="100"
            onChange={(event) => this.props.updateBitmapEngrave(id, {
              ...bitmap,
              power: toRealPower(asInteger(event.target.value)),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="form-field">
          <label>Passes</label>
          <input
            type="number"
            value={bitmap.passes}
            onChange={(event) => this.props.updateBitmapEngrave(id, {
              ...bitmap,
              passes: asInteger(event.target.value),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="form-field">
          <label>Focal Offset (mm)</label>
          <input
            type="number"
            value={bitmap.focalOffset ? bitmap.focalOffset : undefined}
            onChange={(event) => this.props.updateBitmapEngrave(id, {
              ...bitmap,
              focalOffset: precisionRound(asFloat(event.target.value), 3),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="form-field">
          <label>Scan Gap (LPI {`${toDisplayLinesPerInch(bitmap.scanGap ? bitmap.scanGap : 0)}`}) *</label>
          <input
            type="number"
            value={bitmap.scanGap ? bitmap.scanGap : undefined}
            onChange={(event) => this.props.updateBitmapEngrave(id, {
              ...bitmap,
              scanGap: asInteger(event.target.value),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
      </>
    );
  }
}
