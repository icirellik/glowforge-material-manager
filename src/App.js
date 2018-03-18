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
  storeMaterials,
  storeRawMaterials,
  reload
} from './lib/chromeWrappers';
import Message from './Message';

// Different application states
const STATE_DISPLAY = 'DISPLAY';
const STATE_ADD = 'ADD';
const STATE_EDIT = 'EDIT';
const STATE_SELECTED = 'SELECTED';

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
  score: {
    power: 0,
    speed: 0,
    passes: 1,
    focalOffset: null,
  },
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
  };

  componentDidMount() {
    this.setState({
      materials: this.props.materials,
      rawMaterials: this.props.rawMaterials,
    });
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
    });
  }

  async remove(id, title) {
    const materials = await removeMaterial(id);
    const rawMaterials = await removeRawMaterial(title);
    this.setState({
      materials,
      rawMaterials,
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
            <ShowMaterial
              action={this.state.action}
              material={this.state.material}
              cancelMaterial={this.modeCancel.bind(this)}
            />
            <EditMaterial
              addMaterial={this.addMaterial.bind(this)}
              editMaterial={this.editMaterial.bind(this)}
              cancelMaterial={this.modeCancel.bind(this)}
              merge={(key, value) => this.mergeState(key, value)}
              mergeObject={(key, value) => this.mergeObjectState(key, value)}
              action={this.state.action}
              material={this.state.material}
            />
          </div>
        </div>
      </div>
    );
  }
}

class ShowMaterial extends React.Component {
  render() {

    const {
      action,
      material,
    } = this.props;

    if (action !== STATE_SELECTED) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="App-field">
          {`Name: ${material.name}`}
        </div>
        <div className="App-field">
          {`Thickness Name ${material.thickName}`}
        </div>
        <div className="App-field">
          {`Thickness (mm) ${material.thickness}`}
        </div>

        <div className="App-field">
          <p>Cut Settings</p>
        </div>
        <div className="App-field">
          {`Power ${material.cut.power}`}
        </div>
        <div className="App-field">
          {`Speed ${material.cut.speed}`}
        </div>
        <div className="App-field">
          {`Passes ${material.cut.passes}`}
        </div>
        <div className="App-field">
          {`Focal Offset ${material.cut.focalOffset}`}
        </div>

        <div className="App-field">
          <p>Score Settings</p>
        </div>
        <div className="App-field">
          {`Power ${material.score.power}`}
        </div>
        <div className="App-field">
          {`Speed ${material.score.speed}`}
        </div>
        <div className="App-field">
          {`Passes ${material.score.passes}`}
        </div>
        <div className="App-field">
          {`Focal Offset ${material.score.focalOffset}`}
        </div>

        <MaterialButtonBar
          action={this.props.action}
          cancelMaterial={this.props.cancelMaterial}
        />
      </React.Fragment>
    );
  }
}

class EditMaterial extends React.Component {
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

        <div className="App-field">
          <p>Cut Settings</p>
        </div>
        <div className="App-field">
          <label>Power</label>
          <input
            type="number"
            value={material.cut.power}
            onChange={(event) => this.props.mergeObject('cut', { power: Number.parseInt(event.target.value, 10)})}
          />
        </div>
        <div className="App-field">
          <label>Speed</label>
          <input
            type="number"
            value={material.cut.speed}
            onChange={(event) => this.props.mergeObject('cut', { speed: Number.parseInt(event.target.value, 10)})}
          />
        </div>
        <div className="App-field">
          <label>Passes</label>
          <input
            type="number"
            value={material.cut.passes}
            onChange={(event) => this.props.mergeObject('cut', { passes: Number.parseInt(event.target.value, 10)})}
          />
        </div>
        <div className="App-field">
          <label>Focal Offset</label>
          <input
            type="text"
            value={material.cut.focalOffset}
            onChange={(event) => this.props.mergeObject('cut', { focalOffset: Number.parseInt(event.target.value, 10)})}
          />
        </div>

        <div className="App-field">
          <p>Score Settings</p>
        </div>
        <div className="App-field">
          <label>Power</label>
          <input
            type="number"
            value={material.score.power}
            onChange={(event) => this.props.mergeObject('score', { power: Number.parseInt(event.target.value, 10)})}
          />
        </div>
        <div className="App-field">
          <label>Speed</label>
          <input
            type="number"
            value={material.score.speed}
            onChange={(event) => this.props.mergeObject('score', { speed: Number.parseInt(event.target.value, 10)})}
          />
        </div>
        <div className="App-field">
          <label>Passes</label>
          <input
            type="number"
            value={material.score.passes}
            onChange={(event) => this.props.mergeObject('score', { passes: Number.parseInt(event.target.value, 10)})}
          />
        </div>
        <div className="App-field">
          <label>Focal Offset</label>
          <input
            type="text"
            value={material.score.focalOffset}
            onChange={(event) => this.props.mergeObject('score', { focalOffset: Number.parseInt(event.target.value, 10)})}
          />
        </div>

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

class MaterialButtonBar extends React.Component {
  render() {
    switch (this.props.action) {
      case STATE_ADD:
        return (
          <div className="App-buttons">
            <button onClick={this.props.addMaterial}>Create</button>
            <button onClick={this.props.cancelMaterial}>Cancel</button>
          </div>
        );
      case STATE_EDIT:
        return (
          <div className="App-buttons">
            <button onClick={() => this.props.editMaterial(this.props.material.thickName, this.props.material.name)}>Update</button>
            <button onClick={this.props.cancelMaterial}>Cancel</button>
          </div>
        );
      case STATE_SELECTED:
      return (
        <div className="App-buttons">
          <button onClick={this.props.cancelMaterial}>Cancel</button>
        </div>
      );
      default:
        return null;
    }
  }
}

App.propTypes = {
  connected: PropTypes.bool.isRequired,
  materials: PropTypes.array.isRequired,
};

export default App;
