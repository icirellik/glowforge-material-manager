import React from 'react';
import PropTypes from 'prop-types';
import {
  precisionRound,
} from './lib/utils';
import {
  toDisplayCutSpeed,
  toDisplayPower,
  toRealCutSpeed,
  toRealPower,
} from './lib/glowforgeUnits';


class Cut extends React.Component {
  render() {
    const { cut } = this.props;
    return (
      <React.Fragment>
        <div className="App-field">
          <label>Speed</label>
          <input
            type="number"
            value={toDisplayCutSpeed(cut.speed)}
            min="100"
            max="500"
            onChange={(event) => this.props.updateCut({
              ...cut,
              speed: toRealCutSpeed(Number.parseInt(event.target.value, 10)),
            })}
          />
        </div>
        <div className="App-field">
        <label>Power ({`${toDisplayPower(cut.power)}`})</label>
          <input
            type="number"
            value={toDisplayPower(cut.power, false)}
            min="0"
            max="101"
            onChange={(event) => this.props.updateCut({
              ...cut,
              power: toRealPower(Number.parseInt(event.target.value, 10)),
            })}
          />
        </div>
        <div className="App-field">
          <label>Passes</label>
          <input
            type="number"
            value={cut.passes}
            onChange={(event) => this.props.updateCut({
              ...cut,
              passes: Number.parseInt(event.target.value, 10),
            })}
          />
        </div>
        <div className="App-field">
          <label>Focal Offset (mm)</label>
          <input
            type="number"
            value={cut.focalOffset}
            onChange={(event) => this.props.updateCut({
              ...cut,
              focalOffset: precisionRound(Number.parseFloat(event.target.value, 10), 3),
            })}
          />
        </div>
      </React.Fragment>
    );
  }
}

Cut.propTypes = {
  cut: PropTypes.shape({
    focalOffset: PropTypes.number.isRequired,
    passes: PropTypes.number.isRequired,
    power: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
  }).isRequired,
  updateCut: PropTypes.func.isRequired,
}

export default Cut;
