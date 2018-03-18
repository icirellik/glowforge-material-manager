import React from 'react';
import PropTypes from 'prop-types';
import Materials from './Materials';
import logo from './logo.svg';
import {
  createMaterial,
  storeMaterial,
  removeMaterial,
  removeRawMaterial,
} from './lib/material';
import { IconPlus } from './Icons';
import './App.css';
import {
  getShouldUpdate,
  storeMaterials,
  storeRawMaterials,
  reload
} from './lib/chromeWrappers';
import Cut from './Cut';
import MaterialButtonBar from './MaterialButtonBar';
import MaterialViewer from './MaterialViewer';
import Message from './Message';
import Score from './Score';
import SyncStatus from './SyncStatus';
import {
  STATE_ADD,
  STATE_DISPLAY,
  STATE_EDIT,
  STATE_SELECTED,
 } from './state';

// What a raw empty material looks like, this form is smaller and easier to work
// with then the generated material for the Glowforge UI.
const EMPTY_MATERIAL = {
  name: '',
  thickName: '',
  thickness: 0,
  cut: {
    power: 0,
    speed: 0,
    passes: 1,
    focalOffset: null,
  },
  scores: [],
};

const EMPTY_SCORE = {
  name: '',
  power: 0,
  speed: 0,
  passes: 1,
  focalOffset: null,
};

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
      if (this.state.synchronized == shouldUpdate) {
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
          <SyncStatus synchronized={this.state.synchronized} />
        </header>
        <Message message={this.state.message} />
        <div className="App-grid">
          <div className="col-materials">
            <div className="App-materials">
              <Materials
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

class MaterialEditor extends React.Component {
  render() {

    const {
      action,
      material,
    } = this.props;

    if (action !== STATE_ADD && action !== STATE_EDIT) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="App-field">
          <label>Name</label>
          <input
            disabled={action === STATE_EDIT}
            type="text"
            value={material.name}
            onChange={(event) => this.props.merge('name', event.target.value)}
          />
        </div>
        <div className="App-field">
          <label>Thickness Name</label>
          <input
            disabled={action === STATE_EDIT}
            type="text"
            value={material.thickName}
            onChange={(event) => this.props.merge('thickName', event.target.value)}
          />
        </div>
        <div className="App-field">
          <label>Thickness (mm)</label>
          <input
            type="number"
            value={material.thickness}
            onChange={(event) => this.props.merge('thickness', event.target.value)}
          />
        </div>

        <div className="App-sectionHeader">
          <p>Cut Settings</p>
        </div>
        <Cut cut={material.cut} updateCut={this.props.updateCut} />

        <div className="App-sectionHeader">
          <p>Score Settings</p>
          <div>
            <IconPlus click={this.props.addScore} />
          </div>
        </div>
        {
          material.scores.map((score, index) => {
            return (
              <Score
                id={index}
                score={score}
                updateScore={this.props.updateScore}
              />
            );
          })
        }
        <MaterialButtonBar
          action={this.props.action}
          addMaterial={this.props.addMaterial}
          cancelMaterial={this.props.cancelMaterial}
          editMaterial={this.props.editMaterial}
          material={this.props.material}
        />
      </React.Fragment>
    );
  }
}

App.propTypes = {
  connected: PropTypes.bool.isRequired,
  materials: PropTypes.array.isRequired,
};

export default App;
