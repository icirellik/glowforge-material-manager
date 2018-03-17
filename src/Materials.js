import React from 'react';
import PropTypes from 'prop-types';
import Material from './Material';

class Materials extends React.Component {
  render() {
    const { materials } = this.props

    if (materials.length === 0) {
      return (
        <div>
          <h3>Custom Materials</h3>
          <p>No custom materials.</p>
        </div>
      );
    }

    return (
      <div>
        <h3>Custom Materials</h3>
      {
        materials.map(material => {
          return (
            <Material
              material={material}
              editMaterial={this.props.editMaterial}
              removeMaterial={this.props.removeMaterial}
            />
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
  editMaterial: PropTypes.func.isRequired,
  removeMaterial: PropTypes.func.isRequired
}

export default Materials;
