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
  removeMaterial: RemoveMaterial;
  selectMaterial: ModeSelect;
  setMaterial: SetMaterial;
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
          setMaterial={this.props.setMaterial}
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
