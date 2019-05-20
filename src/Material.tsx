import React from 'react';
import Menu from './Menu';
import {
  IconCopy,
  IconEdit,
  IconOpen,
  IconTrashCan,
} from './Icons';
import './Material.css';
import { Material as MaterialType } from './lib/chromeWrappers';
import {
  CopyMaterial,
  ModeEdit,
  ModeSelect,
  RemoveMaterial,
} from './App';

interface MaterialProps {
  cloneMaterial: CopyMaterial;
  editMaterial: ModeEdit;
  material: MaterialType;
  removeMaterial: RemoveMaterial;
  selectMaterial: ModeSelect;
}

class Material extends React.Component<MaterialProps> {
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
        <span
          onClick={() => selectMaterial(material.title)}
          className="Material-name"
        >
          {material.title}
        </span>
        <span>
          <Menu>
            <div onClick={() => selectMaterial(material.title)}>
              <span>View </span>
              <IconOpen />
            </div>
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

export default Material;
