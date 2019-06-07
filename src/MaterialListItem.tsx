import React from 'react';
import Menu from './Menu';
import IconCheck from './icons/IconCheck';
import IconOpen from './icons/IconOpen';
import IconDeleteForever from './icons/IconDeleteForever';
import IconCopy from './icons/IconCopy';
import IconEdit from './icons/IconEdit';
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
              <IconCheck height="18px" width="18px" />
            </div>
            <div onClick={() => selectMaterial(title)}>
              <span>View</span>
              <IconOpen height="18px" width="18px" />
            </div>
            <div onClick={() => editMaterial(title)}>
              <span>Edit</span>
              <IconEdit height="18px" width="18px" />
            </div>
            <div onClick={() => cloneMaterial(title)}>
              <span>Copy</span>
              <IconCopy height="18px" width="18px" />
            </div>
            <div onClick={() => removeMaterial(title)}>
              <span>Delete</span>
              <IconDeleteForever height="18px" width="18px" />
            </div>
          </Menu>
        </span>
      </div>
    );
  }
}

export default MaterialListItem;
