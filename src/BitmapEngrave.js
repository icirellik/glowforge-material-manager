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

class BitmapEngrave extends React.Component {
  state = {
    maxPower: (this.props.bitmap.power === 100),
  }

  render() {
    const { id, bitmap } = this.props;
    return (
      <React.Fragment>
        <div className="App-field" style={(id !== 0) ? { marginTop: '20px' } : null}>
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
            value={toDisplayPower(bitmap.power, false)}
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
            value={this.state.maxPower}
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
            value={bitmap.focalOffset}
            onChange={(event) => this.props.updateBitmapEngrave(id, {
              ...bitmap,
              focalOffset: precisionRound(asFloat(event.target.value), 3),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="App-field">
          <label>Scan Gap (LPI {`${toDisplayLinesPerInch(bitmap.scanGap)}`})</label>
          <input
            type="number"
            value={bitmap.scanGap}
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

BitmapEngrave.propTypes = {
  id: PropTypes.number.isRequired,
  bitmap: PropTypes.shape({
    focalOffset: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    passes: PropTypes.number.isRequired,
    power: PropTypes.number.isRequired,
    scanGap: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
  }).isRequired,
  storeLocalMaterial: PropTypes.func.isRequired,
  updateBitmapEngrave: PropTypes.func.isRequired,
}

export default BitmapEngrave;
