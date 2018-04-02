import React from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu';
import {
  IconCopy,
  IconEdit,
  IconTrashCan,
} from './Icons';
import './Material.css';

class Material extends React.Component {
  render() {
    const {
      cloneMaterial,
      editMaterial,
      material,
      removeMaterial,
      selectMaterial,
    } = this.props
    return (
      <div className="Material-root">
        <span onClick={() => selectMaterial(material.title)} className="Material-name">{material.title}</span>
        <span>
          <Menu>
            <div onClick={() => editMaterial(material.title)}>
              <span>Edit </span>
              <IconEdit />
            </div>
            <div onClick={() => cloneMaterial(material.title)}>
              <span>Copy </span>
              <IconCopy />
            </div>
            <div onClick={() => removeMaterial(material.id, material.title)}>
              <span>Delete </span>
              <IconTrashCan />
            </div>
          </Menu>
        </span>
      </div>
    );
  }
}

Material.propTypes = {
  materials: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  cloneMaterial: PropTypes.func.isRequired,
  editMaterial: PropTypes.func.isRequired,
  removeMaterial: PropTypes.func.isRequired,
  selectMaterial: PropTypes.func.isRequired,
}

export default Material;
