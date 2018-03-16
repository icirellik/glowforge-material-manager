import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Materials extends Component {
  render() {
    const { materials } = this.props
    return (
      <div>
      {
        materials.map(material => {
          return (
            <div>
              <div>{material.title}</div>
              <button onClick={() => this.props.removeMaterial(material.id)}>remove</button>
            </div>
          );
        })
      }
      </div>
    );
  }
}

Materials.propTypes = {
  materials: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired
  })).isRequired,
  removeMaterial: PropTypes.func.isRequired
}

export default Materials;
