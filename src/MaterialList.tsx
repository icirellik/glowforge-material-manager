import React from 'react';
import MaterialListItem from './MaterialListItem';
import { PluginMaterial } from './material/materialPlugin';
import {
  CopyMaterial,
  ModeAdd,
  ModeEdit,
  ModeSelect,
  RemoveMaterial,
  SetMaterial,
} from './App';
import './MaterialList.css';
import IconClear from './icons/IconClear';
import { createEmptyMaterial } from './lib/constants';

type MaterialListProps = {
  cloneMaterial: CopyMaterial;
  editMaterial: ModeEdit;
  materials: PluginMaterial[]
  removeMaterial: RemoveMaterial;
  selectMaterial: ModeSelect;
  setEditorModeAdd: ModeAdd;
  setMaterial: SetMaterial;
}

type MaterialListState = {
  filter?: string;
}

interface MaterialListCreateFromSearchProps {
  name?: string;
  setEditorModeAdd: ModeAdd;
}

function MaterialListCreateFromSearch(props: MaterialListCreateFromSearchProps) {
  return (
    <p className="materialList__create" onClick={() => {
      const material = createEmptyMaterial();
      let nameParts: string[] = [];
      if (props.name) {
        nameParts = props.name.split(' ');
      }
      if (nameParts.length > 1) {
        material.name = nameParts.slice(1).join(' ');
        material.thickName = nameParts[0];
      } else {
        material.name = nameParts.join(' ');
      }
      props.setEditorModeAdd(material);
    }}>Create "<span>{props.name}</span>"</p>
  );
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

    let materialList: JSX.Element | null = null;
    if (materialElements.length > 0) {
      materialList = (
        <div className="materialList__container">
          {materialElements}
        </div>
      );
    } else if (materialElements.length === 0 && this.state.filter) {
      materialList = (
        <MaterialListCreateFromSearch
          name={this.state.filter}
          setEditorModeAdd={this.props.setEditorModeAdd}
        />
      );
    } else {
      materialList = (
        <MaterialListNoElements />
      );
    }

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
        {materialList}
      </div>
    );
  }
}
