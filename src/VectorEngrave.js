import React from 'react';
import PropTypes from 'prop-types';

class VectorEngrave extends React.Component {
  render() {
    const { id, vector } = this.props;
    return (
      <React.Fragment>
        <div className="App-field">
          <label>Name</label>
          <input
            type="text"
            value={vector.name}
            onChange={(event) => this.props.updateVectorEngrave(id, {
              ...vector,
              name: event.target.value
            })}
          />
        </div>
        <div className="App-field">
          <label>Power</label>
          <input
            type="number"
            value={vector.power}
            onChange={(event) => this.props.updateVectorEngrave(id, {
              ...vector,
              power: Number.parseInt(event.target.value, 10)
            })}
          />
        </div>
        <div className="App-field">
          <label>Speed</label>
          <input
            type="number"
            value={vector.speed}
            onChange={(event) => this.props.updateVectorEngrave(id, {
              ...vector,
              speed: Number.parseInt(event.target.value, 10)
            })}
          />
        </div>
        <div className="App-field">
          <label>Passes</label>
          <input
            type="number"
            value={vector.passes}
            onChange={(event) => this.props.updateVectorEngrave(id, {
              ...vector,
              passes: Number.parseInt(event.target.value, 10)
            })}
          />
        </div>
        <div className="App-field">
          <label>Focal Offset</label>
          <input
            type="number"
            value={vector.focalOffset}
            onChange={(event) => this.props.updateVectorEngrave(id, {
              ...vector,
              focalOffset: Number.parseInt(event.target.value, 10)
            })}
          />
        </div>
        <div className="App-field" style={{marginBottom: '10px'}}>
          <label>Scan Gap</label>
          <input
            type="number"
            value={vector.scanGap}
            onChange={(event) => this.props.updateVectorEngrave(id, {
              ...vector,
              scanGap: Number.parseInt(event.target.value, 10)
            })}
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
  updateVectorEngrave: PropTypes.func.isRequired,
}

export default VectorEngrave;
