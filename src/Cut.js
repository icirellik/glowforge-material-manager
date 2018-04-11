import React from 'react';
import PropTypes from 'prop-types';
import {
  asFloat,
  asInteger,
  precisionRound,
} from './lib/utils';
import {
  toDisplayCutSpeed,
  toDisplayPower,
  toRealCutSpeed,
  toRealPower,
} from './lib/glowforgeUnits';

class Cut extends React.Component {
  state = {
    maxPower: (this.props.cut.power === 100),
  }

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
              speed: toRealCutSpeed(asInteger(event.target.value)),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="App-field">
          <label>Power</label>
          <input
            type="number"
            disabled={this.state.maxPower}
            value={toDisplayPower(cut.power, false)}
            min="0"
            max="100"
            onChange={(event) => this.props.updateCut({
              ...cut,
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
        <div className="App-field">
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
        <div className="App-field">
          <label>Focal Offset (mm)</label>
          <input
            type="number"
            value={cut.focalOffset}
            onChange={(event) => this.props.updateCut({
              ...cut,
              focalOffset: precisionRound(asFloat(event.target.value), 3),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
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
  storeLocalMaterial: PropTypes.func.isRequired,
  updateCut: PropTypes.func.isRequired,
}

export default Cut;
