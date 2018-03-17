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
    } = this.props
    return (
      <div className="Material-root">
        <span className="Material-name">{material.title}</span>
        <IconMinus click={() => this.props.removeMaterial(material.id)} />
        <IconEdit click={() => this.props.editMaterial(material.id)} />
      </div>
    );
  }
}

Material.propTypes = {
  materials: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  editMaterial: PropTypes.func.isRequired,
  removeMaterial: PropTypes.func.isRequired
}

export default Material;
