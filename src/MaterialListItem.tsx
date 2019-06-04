import React from 'react';
import Menu from './Menu';
import {
  IconCopy,
  IconEdit,
  IconOpen,
  IconTrashCan,
  IconCheck,
} from './Icons';
import { PluginMaterial } from './lib/materialRaw';
import {
  CopyMaterial,
  ModeEdit,
  ModeSelect,
  RemoveMaterial,
  SetMaterial,
} from './App';
import './MaterialListItem.css';

interface MaterialProps {
  cloneMaterial: CopyMaterial;
  editMaterial: ModeEdit;
  material: PluginMaterial;
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
    const title = `${material.thickName} ${material.name}`;
    return (
      <div className="MaterialListItem-root">
        <span
          onClick={() => selectMaterial(title)}
          className="MaterialListItem-name"
        >
          {title}
        </span>
        <span className="MaterialListItem-menu">
          <Menu>
            <div onClick={() => setMaterial(title)}>
              <span>Set</span>
              <IconCheck />
            </div>
            <div onClick={() => selectMaterial(title)}>
              <span>View</span>
              <IconOpen />
            </div>
            <div onClick={() => editMaterial(title)}>
              <span>Edit</span>
              <IconEdit />
            </div>
            <div onClick={() => cloneMaterial(title)}>
              <span>Copy</span>
              <IconCopy />
            </div>
            <div onClick={() => removeMaterial(title)}>
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
