import React from 'react';
import PropTypes from 'prop-types';

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
              name: event.target.value
            })}
          />
        </div>
        <div className="App-field">
          <label>Power</label>
          <input
            type="number"
            value={bitmap.power}
            onChange={(event) => this.props.updateBitmapEngrave(id, {
              ...bitmap,
              power: Number.parseInt(event.target.value, 10)
            })}
          />
        </div>
        <div className="App-field">
          <label>Speed</label>
          <input
            type="number"
            value={bitmap.speed}
            onChange={(event) => this.props.updateBitmapEngrave(id, {
              ...bitmap,
              speed: Number.parseInt(event.target.value, 10)
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
              passes: Number.parseInt(event.target.value, 10)
            })}
          />
        </div>
        <div className="App-field">
          <label>Focal Offset</label>
          <input
            type="number"
            value={bitmap.focalOffset}
            onChange={(event) => this.props.updateBitmapEngrave(id, {
              ...bitmap,
              focalOffset: Number.parseInt(event.target.value, 10)
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
              scanGap: Number.parseInt(event.target.value, 10)
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
