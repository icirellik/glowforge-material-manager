import React from 'react';
import MaterialListItem from './MaterialListItem';
import { PluginMaterial } from './lib/materialRaw';
import {
  CopyMaterial,
  ModeEdit,
  ModeSelect,
  RemoveMaterial,
  SetMaterial,
} from './App';
import './MaterialList.css';

type MaterialListProps = {
  materials: PluginMaterial[]
  cloneMaterial: CopyMaterial;
  editMaterial: ModeEdit;
  rawSvg: string | null;
  removeMaterial: RemoveMaterial;
  selectMaterial: ModeSelect;
  setMaterial: SetMaterial;
}

function MaterialListNoElements() {
  return (
    <p>Materials you create appear here.</p>
  );
}

export default function MaterialList (props: MaterialListProps) {
  const { materials } = props

  const materialElements = materials.map(material => {
    return (
      <MaterialListItem
        cloneMaterial={props.cloneMaterial}
        editMaterial={props.editMaterial}
        material={material}
        removeMaterial={props.removeMaterial}
        selectMaterial={props.selectMaterial}
        setMaterial={props.setMaterial}
      />
    );
  });

  let svg = null;
  if (props.rawSvg) {
    svg = (<a href={props.rawSvg} target="_blank" rel="noopener noreferrer">View SVG</a>);
  }

  return (
    <div className="materialList">
      <h3>Custom Materials</h3>
      {svg}
      {materialElements.length > 0 ? (
        <div className="materialList__container">
          {materialElements}
        </div>
      ) : (
        <MaterialListNoElements />
      )}
    </div>
  );
}
