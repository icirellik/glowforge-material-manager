import React from 'react';
import PropTypes from 'prop-types';

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
              name: event.target.value
            })}
          />
        </div>
        <div className="App-field">
          <label>Power</label>
          <input
            type="number"
            value={score.power}
            onChange={(event) => this.props.updateScore(id, {
              ...score,
              power: Number.parseInt(event.target.value, 10)
            })}
          />
        </div>
        <div className="App-field">
          <label>Speed</label>
          <input
            type="number"
            value={score.speed}
            onChange={(event) => this.props.updateScore(id, {
              ...score,
              speed: Number.parseInt(event.target.value, 10)
            })}
          />
        </div>
        <div className="App-field">
          <label>Passes</label>
          <input
            type="number"
            value={score.passes}
            onChange={(event) => this.props.updateScore(id, {
              ...score,
              passes: Number.parseInt(event.target.value, 10)
            })}
          />
        </div>
        <div className="App-field" style={{marginBottom: '10px'}}>
          <label>Focal Offset</label>
          <input
            type="number"
            value={score.focalOffset}
            onChange={(event) => this.props.updateScore(id, {
              ...score,
              focalOffset: Number.parseInt(event.target.value, 10)
            })}
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
  updateScore: PropTypes.func.isRequired,
}

export default Score;
