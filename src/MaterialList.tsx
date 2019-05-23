import React from 'react';
import MaterialListItem from './MaterialListItem';
import { GFMaterial } from './lib/material';
import {
  CopyMaterial,
  ModeEdit,
  ModeSelect,
  RemoveMaterial,
} from './App';
import './MaterialList.css';

type MaterialListProps = {
  materials: GFMaterial[]
  cloneMaterial: CopyMaterial;
  editMaterial: ModeEdit;
  removeMaterial: RemoveMaterial;
  selectMaterial: ModeSelect;
}

function MaterialListNoElements() {
  return (
    <p>Materials you create appear here.</p>
  );
}

class MaterialList extends React.Component<MaterialListProps> {
  render() {
    const { materials } = this.props

    const materialElements = materials.map(material => {
      return (
        <MaterialListItem
          cloneMaterial={this.props.cloneMaterial}
          editMaterial={this.props.editMaterial}
          material={material}
          removeMaterial={this.props.removeMaterial}
          selectMaterial={this.props.selectMaterial}
        />
      );
    });

    return (
      <div className="MaterialList">
        <h3>Custom Materials</h3>
        {materialElements.length > 0 ? (
          <div className="MaterialList-list">
            {materialElements}
          </div>
        ) : (
          <MaterialListNoElements />
        )}
      </div>
    );
  }
}

export default MaterialList;
