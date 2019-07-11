import React from 'react';
import Menu from './Menu';
import IconCopy from './icons/IconCopy';
import IconDeleteForever from './icons/IconDeleteForever';
import IconEdit from './icons/IconEdit';
import IconOpen from './icons/IconOpen';
import IconOpenInBrowser from './icons/IconOpenInBrowser';
import { PluginMaterial } from './material/materialPlugin';
import {
  CopyMaterial,
  ModeEdit,
  ModeSelect,
  RemoveMaterial,
  SetMaterial,
} from './App';
import './MaterialList.css';

interface MaterialProps {
  cloneMaterial: CopyMaterial;
  editMaterial: ModeEdit;
  material: PluginMaterial;
  removeMaterial: RemoveMaterial;
  selected: boolean;
  selectMaterial: ModeSelect;
  setMaterial: SetMaterial;
}

export default function MaterialListItem(props: MaterialProps) {
  const {
    cloneMaterial,
    editMaterial,
    material,
    removeMaterial,
    selectMaterial,
    setMaterial,
  } = props
  const title = `${material.thickName} ${material.name}`;
  return (
    <div className={`materialList__item ${(props.selected) ? 'materialList__item__selected' : ''}`}>
      <span
        onClick={() => selectMaterial(title)}
        className="materialList__itemName"
        title={title}
      >
        <span className="materialList__itemName__ellipsis">{title}</span>

      </span>
      <IconOpenInBrowser
        click={() => setMaterial(title)}
        className="materialList__iconHover"
        title="Set in browser"
        height="18px"
        width="18px"
      />
      <span className="materialList__itemMenu">
        <Menu>
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
