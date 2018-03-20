import React from 'react';
import PropTypes from 'prop-types';
import {
  STATE_ADD,
  STATE_DISPLAY,
  STATE_EDIT,
  STATE_SELECTED,
 } from './state';
 import './MaterialButtonBar.css';

class MaterialButtonBar extends React.Component {
  render() {
    switch (this.props.action) {
      case STATE_ADD:
        return (
          <div className="Material-buttons">
            <button onClick={this.props.addMaterial}>Create</button>
            <button onClick={this.props.cancelMaterial}>Cancel</button>
          </div>
        );
      case STATE_EDIT:
        return (
          <div className="Material-buttons">
            <button onClick={() => this.props.editMaterial(this.props.material.thickName, this.props.material.name)}>Update</button>
            <button onClick={this.props.cancelMaterial}>Cancel</button>
          </div>
        );
      case STATE_SELECTED:
        return (
          <div className="Material-buttons">
            <button onClick={this.props.cancelMaterial}>Cancel</button>
          </div>
        );
      case STATE_DISPLAY:
        return null;
      default:
        return null;
    }
  }
}

MaterialButtonBar.propTypes = {
  action: PropTypes.string.isRequired,
}

export default MaterialButtonBar;
