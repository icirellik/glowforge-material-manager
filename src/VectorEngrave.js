import React from 'react';
import PropTypes from 'prop-types';
import {
  asFloat,
  asInteger,
  precisionRound,
} from './lib/utils';
import {
  toDisplayEngraveSpeed,
  toDisplayLinesPerInch,
  toDisplayPower,
  toRealEngraveSpeed,
  toRealPower,
} from './lib/glowforgeUnits';

class VectorEngrave extends React.Component {
  state = {
    maxPower: (this.props.vector.power === 100),
  }

  render() {
    const { id, vector } = this.props;
    return (
      <React.Fragment>
        <div className="App-field" style={(id !== 0) ? { marginTop: '20px' } : null}>
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
            value={toDisplayEngraveSpeed(vector.speed, false)}
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
            value={toDisplayPower(vector.power, false)}
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
            value={this.state.maxPower}
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
            value={vector.focalOffset}
            onChange={(event) => this.props.updateVectorEngrave(id, {
              ...vector,
              focalOffset: precisionRound(asFloat(event.target.value), 3),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="App-field">
          <label>Scan Gap (LPI {`${toDisplayLinesPerInch(vector.scanGap)}`})</label>
          <input
            type="number"
            value={vector.scanGap}
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

VectorEngrave.propTypes = {
  id: PropTypes.number.isRequired,
  vector: PropTypes.shape({
    focalOffset: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    passes: PropTypes.number.isRequired,
    power: PropTypes.number.isRequired,
    scanGap: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
  }).isRequired,
  storeLocalMaterial: PropTypes.func.isRequired,
  updateVectorEngrave: PropTypes.func.isRequired,
}

export default VectorEngrave;
