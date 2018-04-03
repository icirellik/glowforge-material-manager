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

class Score extends React.Component {
  render() {
    const { id, score } = this.props;
    return (
      <React.Fragment>
        <div className="App-field">
          <label>Name</label>
          <input
            type="text"
            value={score.name}
            onChange={(event) => this.props.updateScore(id, {
              ...score,
              name: event.target.value,
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="App-field">
          <label>Speed</label>
          <input
            type="number"
            value={toDisplayCutSpeed(score.speed)}
            min="100"
            max="500"
            onChange={(event) => this.props.updateScore(id, {
              ...score,
              speed: toRealCutSpeed(Number.parseInt(event.target.value, 10)),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="App-field">
          <label>Power ({`${toDisplayPower(score.power)}`})</label>
          <input
            type="number"
            value={toDisplayPower(score.power, false)}
            min="0"
            max="101"
            onChange={(event) => this.props.updateScore(id, {
              ...score,
              power: toRealPower(Number.parseInt(event.target.value, 10)),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="App-field">
          <label>Passes</label>
          <input
            type="number"
            value={score.passes}
            onChange={(event) => this.props.updateScore(id, {
              ...score,
              passes: Number.parseInt(event.target.value, 10),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
        <div className="App-field">
          <label>Focal Offset (mm)</label>
          <input
            type="number"
            value={score.focalOffset}
            onChange={(event) => this.props.updateScore(id, {
              ...score,
              focalOffset: precisionRound(Number.parseFloat(event.target.value, 10), 3),
            })}
            onBlur={() => this.props.storeLocalMaterial()}
          />
        </div>
      </React.Fragment>
    );
  }
}

Score.propTypes = {
  id: PropTypes.number.isRequired,
  score: PropTypes.shape({
    focalOffset: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    passes: PropTypes.number.isRequired,
    power: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
  }).isRequired,
  storeLocalMaterial: PropTypes.func.isRequired,
  updateScore: PropTypes.func.isRequired,
}

export default Score;
