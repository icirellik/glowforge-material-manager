import React from 'react';
import PropTypes from 'prop-types';
import {
  IconEdit,
  IconMinus,
} from './Icons';
import './Material.css';

class Material extends React.Component {
  render() {
    const {
      editMaterial,
      material,
      removeMaterial,
      selectMaterial,
    } = this.props
    return (
      <div className="Material-root">
        <span onClick={() => selectMaterial(material.title)} className="Material-name">{material.title}</span>
        <IconEdit click={() => editMaterial(material.title)} />
        <IconMinus click={() => removeMaterial(material.id, material.title)} />
      </div>
    );
  }
}

Material.propTypes = {
  materials: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  editMaterial: PropTypes.func.isRequired,
  removeMaterial: PropTypes.func.isRequired,
  selectMaterial: PropTypes.func.isRequired,
}

export default Material;
