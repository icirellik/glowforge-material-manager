import React from 'react';
import PropTypes from 'prop-types';

class Cut extends React.Component {
  render() {
    const { cut } = this.props;
    return (
      <React.Fragment>
        <div className="App-field">
          <label>Power</label>
          <input
            type="number"
            value={cut.power}
            onChange={(event) => this.props.updateCut({
              ...cut,
              power: Number.parseInt(event.target.value, 10)
            })}
          />
        </div>
        <div className="App-field">
          <label>Speed</label>
          <input
            type="number"
            value={cut.speed}
            onChange={(event) => this.props.updateCut({
              ...cut,
              speed: Number.parseInt(event.target.value, 10)
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
              passes: Number.parseInt(event.target.value, 10)
            })}
          />
        </div>
        <div className="App-field">
          <label>Focal Offset</label>
          <input
            type="text"
            value={cut.focalOffset}
            onChange={(event) => this.props.updateCut({
              ...cut,
              focalOffset: Number.parseInt(event.target.value, 10)
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
