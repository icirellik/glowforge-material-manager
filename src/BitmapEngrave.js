import React from 'react';
import PropTypes from 'prop-types';
import {
  precisionRound,
} from './lib/utils';
import {
  toDisplayEngraveSpeed,
  toDisplayPower,
  toRealEngraveSpeed,
  toRealPower,
} from './lib/glowforgeUnits';

class BitmapEngrave extends React.Component {
  render() {
    const { id, bitmap } = this.props;
    return (
      <React.Fragment>
        <div className="App-field">
          <label>Name</label>
          <input
            type="text"
            value={bitmap.name}
            onChange={(event) => this.props.updateBitmapEngrave(id, {
              ...bitmap,
              name: event.target.value,
            })}
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
              speed: toRealEngraveSpeed(Number.parseInt(event.target.value, 10)),
            })}
          />
        </div>
        <div className="App-field">
        <label>Power ({`${toDisplayPower(bitmap.power)}`})</label>
          <input
            type="number"
            value={toDisplayPower(bitmap.power, false)}
            min="0"
            max="101"
            onChange={(event) => this.props.updateBitmapEngrave(id, {
              ...bitmap,
              power: toRealPower(Number.parseInt(event.target.value, 10)),
            })}
          />
        </div>
        <div className="App-field">
          <label>Passes</label>
          <input
            type="number"
            value={bitmap.passes}
            onChange={(event) => this.props.updateBitmapEngrave(id, {
              ...bitmap,
              passes: Number.parseInt(event.target.value, 10),
            })}
          />
        </div>
        <div className="App-field">
          <label>Focal Offset (mm)</label>
          <input
            type="number"
            value={bitmap.focalOffset}
            onChange={(event) => this.props.updateBitmapEngrave(id, {
              ...bitmap,
              focalOffset: precisionRound(Number.parseFloat(event.target.value, 10), 3),
            })}
          />
        </div>
        <div className="App-field" style={{marginBottom: '10px'}}>
          <label>Scan Gap</label>
          <input
            type="number"
            value={bitmap.scanGap}
            onChange={(event) => this.props.updateBitmapEngrave(id, {
              ...bitmap,
              scanGap: Number.parseInt(event.target.value, 10),
            })}
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
  updateBitmapEngrave: PropTypes.func.isRequired,
}

export default BitmapEngrave;
