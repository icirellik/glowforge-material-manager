import React from 'react';
import PropTypes from 'prop-types';
import './Material.css';

class Material extends React.Component {
  render() {
    const { material } = this.props
    return (
      <div>
        <div>{material.title}</div>
        <button onClick={() => this.props.removeMaterial(material.id)}>remove</button>
        <button onClick={() => this.props.editMaterial(material.id)}>edit</button>
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
