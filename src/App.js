import React from 'react';
import PropTypes from 'prop-types';
import MaterialEditor from './MaterialEditor';
import MaterialList from './MaterialList';
import MaterialViewer from './MaterialViewer';
import Message from './Message';
import SyncStatus from './SyncStatus';
import {
  createMaterial,
  removeMaterial,
  removeRawMaterial,
} from './lib/material';
import { IconPlus } from './Icons';
import {
  forceSync,
  getShouldUpdate,
  storeMaterials,
  storeRawMaterials,
  reload
} from './lib/chromeWrappers';
import {
  STATE_ADD,
  STATE_DISPLAY,
  STATE_EDIT,
  STATE_SELECTED,
 } from './state';
 import './App.css';
 import logo from './logo.svg';

// What a raw empty material looks like, this form is smaller and easier to work
// with then the generated material for the Glowforge UI.
const EMPTY_MATERIAL = {
  name: '',
  thickName: '',
  thickness: null,
  cut: {
    power: 99,
    speed: 100,
    passes: 1,
    focalOffset: null,
  },
  scores: [],
  vectors: [],
  bitmaps: [],
};

const EMPTY_SCORE = {
  name: '',
  power: 99,
  speed: 100,
  passes: 1,
  focalOffset: null,
};

// const EMPTY_VECTOR_ENGRAVE = {
//   name: '',
//   power: 99,
//   speed: 100,
//   passes: 1,
//   focal_offset: null,
//   scangap: null,
//   uses: null,
// };

// const EMPTY_BITMAP_ENGRAVE = {
//   name: '',
//   power: 99,
//   speed: 100,
//   passes: 1,
//   focal_offset: null,
//   scangap: null,
//   render_method: null,
//   rescale_method: "LagrangeFilter",
//   minimum_gray_percent: null,
//   maximum_gray_percent: null,
//   horizontal_timing: null,
// };

class App extends React.Component {
  state = {
    action: STATE_DISPLAY,
    message: '',
    material: {
      ...EMPTY_MATERIAL,
    },
    materials: [],
    rawMaterials: [],
    synchronized: true,
  };

  componentDidMount() {
    this.setState({
      materials: this.props.materials,
      rawMaterials: this.props.rawMaterials,
    });

    setInterval(async () => {
      const shouldUpdate = await getShouldUpdate();
      if (this.state.synchronized === shouldUpdate) {
        this.setState({
          synchronized: !shouldUpdate,
        });
      }
    }, 5000);
  }

  mergeState(key, value) {
    this.setState({
      material: {
        ...this.state.material,
        [key]: value,
      },
    });
  }

  mergeObjectState(key, value) {
    this.setState({
      material: {
        ...this.state.material,
        [key]: {
          ...this.state.material[key], ...value,
        },
      },
    });
  }

  updateCut(cut) {
    this.setState({
      material: {
        ...this.state.material,
        cut,
      },
    });
  }

  addScore() {
    this.setState({
      material: {
        ...this.state.material,
        scores: [ ...this.state.material.scores, EMPTY_SCORE ],
      },
    });
  }

  updateScore(index, score) {
    console.log(`${index}`)
    console.log(`${score}`)
    const scores = this.state.material.scores;
    scores[index] = score;
    this.setState({
      material: {
        ...this.state.material,
        scores: [...scores],
      }
    });
  }

  async addMaterial() {
    const newMaterial = createMaterial(this.state.material, this.state.materials.length);
    const duplicate = this.state.materials.find(material => {
      return material.id === newMaterial.id || material.title === newMaterial.title;
    });

    if (duplicate) {
      this.setState({
        message: 'A material with the same name already exists.',
      });
      return;
    }

    // Create and store.
    const newMaterials = [...this.state.materials, newMaterial];
    const newRawMaterials = [...this.state.rawMaterials, this.state.material];
    await storeMaterials(newMaterials)
    await storeRawMaterials(newRawMaterials);

    this.setState({
      action: STATE_DISPLAY,
      materials: newMaterials,
      rawMaterials: newRawMaterials,
      message: '',
      material: { ...EMPTY_MATERIAL },
      synchronized: false,
    });
  }

  async editMaterial(thickName, name) {

    const duplicates = this.state.materials.filter(material => {
      return material.title === `${thickName} ${name}`;
    });

    if (duplicates.length !== 1) {
      this.setState({
        message: 'Could not update material.',
      });
      return;
    }

    // Update
    const materialId = duplicates[0].id.split(':')[1];
    const newMaterial = createMaterial(this.state.material, materialId)

    // Store
    const newMaterials = this.state.materials.filter(material => {
      return material.title !== `${thickName} ${name}`;
    });
    newMaterials.push(newMaterial)
    const newRawMaterials = this.state.rawMaterials.filter(material => {
      return `${material.thickName} ${material.name}` !== `${thickName} ${name}`;
    });
    newRawMaterials.push(this.state.material);

    await storeMaterials(newMaterials)
    await storeRawMaterials(newRawMaterials);

    this.setState({
      action: STATE_DISPLAY,
      materials: newMaterials,
      rawMaterials: newRawMaterials,
      message: '',
      material: { ...EMPTY_MATERIAL },
      synchronized: false,
    });
  }

  async remove(id, title) {
    const materials = await removeMaterial(id);
    const rawMaterials = await removeRawMaterial(title);
    this.setState({
      materials,
      rawMaterials,
      synchronized: false,
    });
    await reload();
  }

  async forceSyncronize() {
    await forceSync();
    this.setState({
      synchronized: false,
    });
  }

  modeAdd() {
    this.setState({
      action: STATE_ADD,
      material: {
        ...EMPTY_MATERIAL,
      },
    });
  }

  modeEdit(title) {
    const material = this.state.rawMaterials.find(material => {
      return `${material.thickName} ${material.name}` === title;
    });
    this.setState({
      action: STATE_EDIT,
      material: {
        ...material,
      },
    });
  }

  modeCancel() {
    this.setState({
      action: STATE_DISPLAY,
      material: {
        ...EMPTY_MATERIAL,
      },
      message: '',
    });
  }

  modeSelect(title) {
    const material = this.state.rawMaterials.find(material => {
      return `${material.thickName} ${material.name}` === title;
    });
    this.setState({
      action: STATE_SELECTED,
      material: {
        ...material,
      },
    });
  }

  render() {
    if (!this.props.connected) {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Glowforge Material Manager</h1>
          </header>
          <p className="App-intro">
            Please login to the glowforge ui to use this tool.
          </p>
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Glowforge Material Manager</h1>
          <SyncStatus
            synchronized={this.state.synchronized}
            forceSync={this.forceSyncronize.bind(this)}
          />
        </header>
        <Message message={this.state.message} />
        <div className="App-grid">
          <div className="col-materials">
            <div className="App-materials">
              <MaterialList
                materials={this.state.materials}
                editMaterial={this.modeEdit.bind(this)}
                selectMaterial={this.modeSelect.bind(this)}
                removeMaterial={this.remove.bind(this)}
              />
            </div>
          </div>
          <div className="col-contents">
            <div className="App-intro">
              <p style={{float: 'left', width: '250px'}}>
                Add your own custom material settings here.
              </p>
              <div style={{float: 'right', margin: '14px 14px 14px 0'}}>
                <IconPlus click={() => { this.modeAdd(); }} />
              </div>
            </div>
            <MaterialViewer
              action={this.state.action}
              material={this.state.material}
              cancelMaterial={this.modeCancel.bind(this)}
            />
            <MaterialEditor
              addMaterial={this.addMaterial.bind(this)}
              editMaterial={this.editMaterial.bind(this)}
              cancelMaterial={this.modeCancel.bind(this)}
              merge={(key, value) => this.mergeState(key, value)}
              mergeObject={(key, value) => this.mergeObjectState(key, value)}
              action={this.state.action}
              material={this.state.material}
              addScore={this.addScore.bind(this)}
              updateCut={this.updateCut.bind(this)}
              updateScore={this.updateScore.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  connected: PropTypes.bool.isRequired,
  materials: PropTypes.array.isRequired,
};

export default App;
