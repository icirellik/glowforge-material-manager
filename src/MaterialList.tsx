import React from 'react';
import MaterialListItem from './MaterialListItem';
import { PluginMaterial } from './material/materialPlugin';
import {
  CopyMaterial,
  ModeEdit,
  ModeSelect,
  RemoveMaterial,
  SetMaterial,
} from './App';
import './MaterialList.css';
import IconClear from './icons/IconClear';

type MaterialListProps = {
  materials: PluginMaterial[]
  cloneMaterial: CopyMaterial;
  editMaterial: ModeEdit;
  removeMaterial: RemoveMaterial;
  selectMaterial: ModeSelect;
  setMaterial: SetMaterial;
}

type MaterialListState = {
  filter?: string;
}

function MaterialListNoElements() {
  return (
    <p className="materialList__empty">Materials you create appear here.</p>
  );
}

export default class MaterialList extends React.Component<MaterialListProps, MaterialListState> {
  constructor(props: MaterialListProps) {
    super(props);

    this.state = {
      filter: undefined,
    };

    this.clearFilter = this.clearFilter.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  clearFilter() {
    this.setState({
      filter: '',
    });
  }

  onFilterChange(event: React.ChangeEvent) {
    if ((event.target as any).value) {
      this.setState({
        filter: (event.target as any).value,
      });
    } else {
      this.setState({
        filter: undefined,
      });
    }
  }

  render () {
    const { materials } = this.props;

    const materialElements = materials.filter(material => {
      const title = `${material.thickName} ${material.name}`.toLowerCase();
      return !this.state.filter || title.includes(this.state.filter.toLowerCase());
    }).map(material => {
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
      <div className="materialList">
        <h3>Custom Materials</h3>
        <div className="materialList__search">
          <input
            className="materialList__search__input"
            onChange={this.onFilterChange}
            placeholder="Search"
            type="text"
            value={this.state.filter}
          />
          <IconClear
            className="materialList__search__clear"
            click={this.clearFilter}
            height="18px"
            width="18px"
          />
        </div>
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
}
