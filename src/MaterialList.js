import React from 'react';
import PropTypes from 'prop-types';
import Material from './Material';

class MaterialList extends React.Component {
  render() {
    const { materials } = this.props

    if (materials.length === 0) {
      return (
        <div>
          <h3>Custom Materials</h3>
          <p>Materials you create appear here.</p>
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
              editMaterial={this.props.editMaterial}
              material={material}
              removeMaterial={this.props.removeMaterial}
              selectMaterial={this.props.selectMaterial}
            />
          );
        })
      }
      </div>
    );
  }
}

MaterialList.propTypes = {
  materials: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired
  })).isRequired,
  editMaterial: PropTypes.func.isRequired,
  removeMaterial: PropTypes.func.isRequired,
  selectMaterial: PropTypes.func.isRequired,
}

export default MaterialList;
