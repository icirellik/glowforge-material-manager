import React from 'react';
import Menu from './Menu';
import {
  IconCopy,
  IconEdit,
  IconOpen,
  IconTrashCan,
  IconCheck,
} from './Icons';
import './MaterialListItem.css';
import { GFMaterial } from './lib/material';
import {
  CopyMaterial,
  ModeEdit,
  ModeSelect,
  RemoveMaterial,
  SetMaterial,
} from './App';

interface MaterialProps {
  cloneMaterial: CopyMaterial;
  editMaterial: ModeEdit;
  material: GFMaterial;
  removeMaterial: RemoveMaterial;
  selectMaterial: ModeSelect;
  setMaterial: SetMaterial;
}

class MaterialListItem extends React.Component<MaterialProps> {
  render() {
    const {
      cloneMaterial,
      editMaterial,
      material,
      removeMaterial,
      selectMaterial,
      setMaterial,
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
            <div>
              <span onClick={() => setMaterial(material.id, material.title)}>Set In GFUI</span>
              <IconCheck />
            </div>
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
