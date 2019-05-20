import React from 'react';
import Material from './Material';
import { Material as MaterialType } from './lib/chromeWrappers';
import {
  CopyMaterial,
  ModeEdit,
  ModeSelect,
  RemoveMaterial,
} from './App';

type MaterialListProps = {
  materials: MaterialType[]
  cloneMaterial: CopyMaterial;
  editMaterial: ModeEdit;
  removeMaterial: RemoveMaterial;
  selectMaterial: ModeSelect;
}

class MaterialList extends React.Component<MaterialListProps> {
  render() {
    const { materials } = this.props

    if (materials.length === 0) {
      return (
        <div>
          <h3>Custom Materials</h3>
          <p>Materials you create appear here.</p>
        </div>
      );
    }
    return (
      <div>
        <h3>Custom Materials</h3>
      {
        materials.map(material => {
          return (
            <Material
              cloneMaterial={this.props.cloneMaterial}
              editMaterial={this.props.editMaterial}
              material={material}
              removeMaterial={this.props.removeMaterial}
              selectMaterial={this.props.selectMaterial}
            />
          );
        })
      }
      </div>
    );
  }
}

export default MaterialList;
