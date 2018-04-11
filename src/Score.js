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

class Score extends React.Component {
  constructor(props) {
    super(props);
    if (props.score.power === 100) {
      this.setState({
        maxPower: true,
      });
    }
  }

  state = {
    maxPower: false,
  }

  render() {
    const { id, score } = this.props;
    return (
      <React.Fragment>
        <div className="App-field" style={(id !== 0) ? { marginTop: '20px' } : null}>
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
            value={toDisplayPower(score.power, false)}
            min="0"
            max="100"
            onChange={(event) => this.props.updateScore(id, {
              ...score,
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
            onChange={(event) => {
              const nextMaxPower = !this.state.maxPower;
              this.props.updateScore(id, {
                ...score,
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
            value={score.passes}
            onChange={(event) => this.props.updateScore(id, {
              ...score,
              passes: asInteger(event.target.value),
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
              focalOffset: precisionRound(asFloat(event.target.value), 3),
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
