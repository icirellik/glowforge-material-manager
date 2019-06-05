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

interface VectorEngraveProps {
  id: number;
  vector: PluginVectorEngraveSetting;
  storeLocalMaterial: Function;
  updateVectorEngrave: Function;
}

class VectorEngrave extends React.Component<VectorEngraveProps> {
  state = {
    maxPower: (this.props.vector.power === 100),
  }

  render() {
    const { id, vector } = this.props;
    return (
      <React.Fragment>
        <div className="App-field" style={(id !== 0) ? { marginTop: '20px' } : undefined}>
          <label>Name</label>
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
        <div className="App-field">
          <label>Speed</label>
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
        <div className="App-field">
          <label>Power</label>
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
        <div>
          <label>Max Power</label>
          <input
            type="checkbox"
            value={this.state.maxPower? 1 : 0}
            checked={this.state.maxPower}
            onChange={(event) => {
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
        <div className="App-field">
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
        <div className="App-field">
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
        <div className="App-field">
          <label>Scan Gap (LPI {`${toDisplayLinesPerInch(vector.scanGap ? vector.scanGap : 0)}`})</label>
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
      </React.Fragment>
    );
  }
}

export default VectorEngrave;
