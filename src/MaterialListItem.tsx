import React from 'react';
import Menu from './Menu';
import {
  IconCopy,
  IconEdit,
  IconOpen,
  IconTrashCan,
} from './Icons';
import './MaterialListItem.css';
import { GFMaterial } from './lib/material';
import {
  CopyMaterial,
  ModeEdit,
  ModeSelect,
  RemoveMaterial,
} from './App';

interface MaterialProps {
  cloneMaterial: CopyMaterial;
  editMaterial: ModeEdit;
  material: GFMaterial;
  removeMaterial: RemoveMaterial;
  selectMaterial: ModeSelect;
}

class MaterialListItem extends React.Component<MaterialProps> {
  render() {
    const {
      cloneMaterial,
      editMaterial,
      material,
      removeMaterial,
      selectMaterial,
    } = this.props
    return (
      <div className="MaterialListItem-root">
        <span
          onClick={() => selectMaterial(material.title)}
          className="MaterialListItem-name"
        >
          {material.title}
        </span>
        <span className="MaterialListItem-menu">
          <Menu>
            <div onClick={() => selectMaterial(material.title)}>
              <span>View</span>
              <IconOpen />
            </div>
            <div onClick={() => editMaterial(material.title)}>
              <span>Edit</span>
              <IconEdit />
            </div>
            <div onClick={() => cloneMaterial(material.title)}>
              <span>Copy</span>
              <IconCopy />
            </div>
            <div onClick={() => removeMaterial(material.id, material.title)}>
              <span>Delete</span>
              <IconTrashCan />
            </div>
          </Menu>
        </span>
      </div>
    );
  }
}

export default MaterialListItem;
