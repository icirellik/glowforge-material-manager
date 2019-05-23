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
import { PluginBitmapEngraveSetting } from '../lib/material';

interface BitmapEngraveProps {
  id: number;
  bitmap: PluginBitmapEngraveSetting;
  storeLocalMaterial: Function;
  updateBitmapEngrave: Function;
}

class BitmapEngrave extends React.Component<BitmapEngraveProps> {
  state = {
    maxPower: (this.props.bitmap.power === 100),
  }

  render() {
    const { id, bitmap } = this.props;
    return (
      <React.Fragment>
        <div className="App-field" style={(id !== 0) ? { marginTop: '20px' } : undefined}>
          <label>Name</label>
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
        <div className="App-field">
          <label>Speed</label>
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
        <div className="App-field">
          <label>Power</label>
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
        <div>
          <label>Max Power</label>
          <input
            type="checkbox"
            value={this.state.maxPower? 1 : 0}
            checked={this.state.maxPower}
            onChange={(event) => {
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
        <div className="App-field">
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
        <div className="App-field">
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
        <div className="App-field">
          <label>Scan Gap (LPI {`${toDisplayLinesPerInch(bitmap.scanGap ? bitmap.scanGap : 0)}`})</label>
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
      </React.Fragment>
    );
  }
}

export default BitmapEngrave;
