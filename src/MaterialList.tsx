import React from 'react';
import MaterialListItem from './MaterialListItem';
import { PluginMaterial } from './material/materialPlugin';
import {
  ModeAdd,
  ModeSelect,
  SetMaterial,
} from './App';
import {
  createEmptyMaterial,
  TempMaterial,
} from './lib/materialHelpers';
import './MaterialList.css';
import IconClear from './icons/IconClear';

type MaterialListProps = {
  materials: PluginMaterial[]
  selectMaterial: ModeSelect;
  setEditorModeAdd: ModeAdd;
  setMaterial: SetMaterial;
  tempMaterial: TempMaterial;
}

type MaterialListState = {
  filter?: string;
}

interface MaterialListCreateFromSearchProps {
  name?: string;
  setEditorModeAdd: ModeAdd;
}

const SCROLL_BAR_APPEARS = 13;

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

    const filteredMaterialElements = materials.sort((mat1, mat2) => {
      const mat1Title = `${mat1.thickName} ${mat1.name}`;
      const mat2Title = `${mat2.thickName} ${mat2.name}`;

      if (mat1Title < mat2Title) {
        return -1;
      }
      if (mat1Title > mat2Title) {
        return 1;
      }
      return 0;
    }).filter(material => {
      const title = `${material.thickName} ${material.name}`.toLowerCase();
      return !this.state.filter || title.includes(this.state.filter.toLowerCase());
    })

    const hasScrollbar = filteredMaterialElements.length > SCROLL_BAR_APPEARS;
    const materialElements = filteredMaterialElements.map(material => {
      return (
        <MaterialListItem
          styles={!hasScrollbar ? { maxWidth: '159px'} : undefined}
          material={material}
          selected={`${material.thickName} ${material.name}` === `${this.props.tempMaterial.thickName} ${this.props.tempMaterial.name}`}
          selectMaterial={this.props.selectMaterial}
          setMaterial={this.props.setMaterial}
        />
      );
    });

    let materialList: JSX.Element | null = null;
    if (this.state.filter &&
        materials.map(material => `${material.thickName} ${material.name}`.toLowerCase())
          .indexOf(this.state.filter) === -1 &&
        materialElements.length > 0
      ) {
        materialList = (
          <>
            <div className="materialList__container">
              <div
                className="materialList__containerScroll"
                style={hasScrollbar ? { maxWidth: '224px'} : undefined}
              >
                <MaterialListCreateFromSearch
                  name={this.state.filter}
                  setEditorModeAdd={async (material) => {
                    this.props.setEditorModeAdd(material);
                    this.clearFilter();
                  }}
                />
                {materialElements}
              </div>
            </div>
          </>
        );
    } else if (materialElements.length > 0) {
      materialList = (
        <div className="materialList__container">
          <div
            className="materialList__containerScroll"
            style={hasScrollbar ? { maxWidth: '224px'} : undefined}
          >
            {materialElements}
          </div>
        </div>
      );
    } else if (this.state.filter && materialElements.length === 0) {
      materialList = (
        <MaterialListCreateFromSearch
          name={this.state.filter}
          setEditorModeAdd={async (material) => {
            this.props.setEditorModeAdd(material);
            this.clearFilter();
          }}
        />
      );
    } else {
      materialList = (
        <MaterialListNoElements />
      );
    }

    return (
      <div className="materialList">
        <div style={{height: '94px'}}>
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
              title="Clear Search"
              width="18px"
            />
          </div>
        </div>
        {materialList}
      </div>
    );
  }
}
