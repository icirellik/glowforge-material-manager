import React from 'react';
import { IconOpen } from './icons/IconOpen';
import { IconOpenInBrowser } from './icons/IconOpenInBrowser';
import type { PluginMaterial } from './material/materialPlugin';
import type {
  ModeSelect,
  SetMaterial,
} from './App';
import './MaterialList.css';

interface MaterialProps {
  material: PluginMaterial;
  selected: boolean;
  selectMaterial: ModeSelect;
  setMaterial: SetMaterial;
  styles: any;
}

export default function MaterialListItem(props: MaterialProps) {
  const {
    material,
    selected,
    selectMaterial,
    setMaterial,
    styles,
  } = props;
  const title = `${material.thickName} ${material.name}`;
  return (
    <div className={`materialList__item ${(selected) ? 'materialList__item__selected' : ''}`}>
      <span
        style={styles}
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
      <IconOpen
        click={() => selectMaterial(title)}
        className="materialList__iconHover"
        title="View material settings"
        height="18px"
        width="18px"
      />
    </div>
  );
}
