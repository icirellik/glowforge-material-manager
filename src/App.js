import React from 'react';
import PropTypes from 'prop-types';
import Materials from './Materials';
import logo from './logo.svg';
import {
  createMaterial,
  storeMaterial,
  removeMaterial,
} from './lib/material';
import { IconPlus } from './Icons';
import './App.css';

const STATE_DISPLAY = 'DISPLAY';
const STATE_ADD = 'ADD';
const STATE_EDIT = 'EDIT';

class App extends React.Component {
  state = {
    action: STATE_DISPLAY,
    errorMessage: '',
    name: '',
    thickName: '',
    thickness: 0,
    cut: {
      power: 0,
      speed: 0,
      passes: 1,
      focalOffset: null
    },
    score: {
      power: 0,
      speed: 0,
      passes: 1,
      focalOffset: null
    },
    materials: []
  };

  componentDidMount() {
    console.log(this.props.materials)
    this.setState({ materials: this.props.materials });
  }

  mergeState(key, value) {
    console.log(`${key} ${value}`)
    this.setState({
      [key]: value
    });
    console.log(this.state)
  }

  mergeObjectState(key, value) {
    this.setState({
      [key]: { ...this.state[key], ...value }
    });
  }

  async addMaterial() {
    // Prevent duplicates.
    const newMaterial = createMaterial(this.state, this.state.materials.length);
    const duplicate = this.state.materials.find(material => {
      return material.id === newMaterial.id || material.title === newMaterial.title;
    });

    if (duplicate) {
      this.mergeState('errorMessage', 'A material with the same name already exists.');
      return;
    }

    // Create and store.
    await storeMaterial(newMaterial);
    this.setState({
      action: STATE_DISPLAY,
      materials: [...this.state.materials, newMaterial]
    });
  }

  async editMaterial(materialId) {

  }

  async remove(materialId) {
    this.setState({
      materials: await removeMaterial(materialId)
    });
  }

  modeAdd() {
    this.mergeState('action', STATE_ADD);
  }

  modeEdit() {
    this.mergeState('action', STATE_EDIT);
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
        <DisplayError message={this.state.errorMessage} />
        <div className="App-grid">
          <div className="col-materials">
            <div className="App-materials">
              <Materials
                materials={this.state.materials}
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
            <AddMaterial
              addMaterial={() => this.addMaterial()}
              merge={(key, value) => this.mergeState(key, value)}
              mergeObject={(key, value) => this.mergeObjectState(key, value)}
              {...this.state}
            />
            <EditMaterial
              editMaterial={() => this.editMaterial()}
              merge={(key, value) => this.mergeState(key, value)}
              mergeObject={(key, value) => this.mergeObjectState(key, value)}
              {...this.state}
            />
          </div>
        </div>
      </div>
    );
  }
}

class DisplayError extends React.Component {
  render() {
    return (
      <p className="App-error">
        {this.props.message}
      </p>
    );
  }
}

class AddMaterial extends React.Component {
  render() {
    if (this.props.action !== STATE_ADD) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="App-field">
          <label>Name</label>
          <input
            type="text"
            value={this.props.name}
            onChange={(event) => this.props.merge('name', event.target.value)}
          />
        </div>
        <div className="App-field">
          <label>Thickness Name</label>
          <input
            type="text"
            value={this.props.thickName}
            onChange={(event) => this.props.merge('thickName', event.target.value)}
          />
        </div>
        <div className="App-field">
          <label>Thickness (mm)</label>
          <input
            type="number"
            value={this.props.thickness}
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
            value={this.props.cut.power}
            onChange={(event) => this.props.mergeObject('cut', { power: event.target.value})}
          />
        </div>
        <div className="App-field">
          <label>Speed</label>
          <input
            type="number"
            value={this.props.cut.speed}
            onChange={(event) => this.props.mergeObject('cut', { speed: event.target.value})}
          />
        </div>
        <div className="App-field">
          <label>Passes</label>
          <input
            type="number"
            value={this.props.cut.passes}
            onChange={(event) => this.props.mergeObject('cut', { passes: event.target.value})}
          />
        </div>
        <div className="App-field">
          <label>Focal Offset</label>
          <input
            type="text"
            value={this.props.cut.focalOffset}
            onChange={(event) => this.props.mergeObject('cut', { focalOffset: event.target.value})}
          />
        </div>

        <div className="App-field">
          <p>Score Settings</p>
        </div>
        <div className="App-field">
          <label>Power</label>
          <input
            type="number"
            value={this.props.score.power}
            onChange={(event) => this.props.mergeObject('score', { power: event.target.value})}
          />
        </div>
        <div className="App-field">
          <label>Speed</label>
          <input
            type="number"
            value={this.props.score.speed}
            onChange={(event) => this.props.mergeObject('score', { speed: event.target.value})}
          />
        </div>
        <div className="App-field">
          <label>Passes</label>
          <input
            type="number"
            value={this.props.score.passes}
            onChange={(event) => this.props.mergeObject('score', { passes: event.target.value})}
          />
        </div>
        <div className="App-field">
          <label>Focal Offset</label>
          <input
            type="text"
            value={this.props.score.focalOffset}
            onChange={(event) => this.props.mergeObject('score', { focalOffset: event.target.value})}
          />
        </div>

        <div className="App-buttons">
          <button onClick={() => this.props.addMaterial()}>Save</button>
        </div>
      </React.Fragment>
    );
  }
}

class EditMaterial extends React.Component {
  render() {
    if (this.props.action !== STATE_EDIT) {
      return null;
    }

    return (
      <React.Fragment>
        <div className="App-field">
          <label>Name</label>
          <input
            type="text"
            value={this.props.name}
            onChange={(event) => this.props.merge('name', event.target.value)}
          />
        </div>
        <div className="App-field">
          <label>Thickness Name</label>
          <input
            type="text"
            value={this.props.thickName}
            onChange={(event) => this.props.merge('thickName', event.target.value)}
          />
        </div>
        <div className="App-field">
          <label>Thickness (mm)</label>
          <input
            type="number"
            value={this.props.thickness}
            onChange={(event) => this.props.merge('thickness', event.target.value)}
          />
        </div>

        <div className="App-field">
          <label>Cut Power</label>
          <input
            type="number"
            value={this.props.cut.power}
            onChange={(event) => this.props.mergeObject('cut', { power: event.target.value})}
          />
        </div>
        <div className="App-field">
          <label>Cut Speed</label>
          <input
            type="number"
            value={this.props.cut.speed}
            onChange={(event) => this.props.mergeObject('cut', { speed: event.target.value})}
          />
        </div>
        <div className="App-field">
          <label>Cut Passes</label>
          <input
            type="number"
            value={this.props.cut.passes}
            onChange={(event) => this.props.mergeObject('cut', { passes: event.target.value})}
          />
        </div>
        <div className="App-field">
          <label>Cut Focal Offset</label>
          <input
            type="text"
            value={this.props.cut.focalOffset}
            onChange={(event) => this.props.mergeObject('cut', { focalOffset: event.target.value})}
          />
        </div>

        <div className="App-field">
          <label>Score Power</label>
          <input
            type="number"
            value={this.props.score.power}
            onChange={(event) => this.props.mergeObject('score', { power: event.target.value})}
          />
        </div>
        <div className="App-field">
          <label>Score Speed</label>
          <input
            type="number"
            value={this.props.score.speed}
            onChange={(event) => this.props.mergeObject('score', { speed: event.target.value})}
          />
        </div>
        <div className="App-field">
          <label>Score Passes</label>
          <input
            type="number"
            value={this.props.score.passes}
            onChange={(event) => this.props.mergeObject('score', { passes: event.target.value})}
          />
        </div>
        <div className="App-field">
          <label>Score Focal Offset</label>
          <input
            type="text"
            value={this.props.score.focalOffset}
            onChange={(event) => this.props.mergeObject('score', { focalOffset: event.target.value})}
          />
        </div>

        <div className="App-buttons">
          <button onClick={() => this.updateMaterial()}>Update</button>
        </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  connected: PropTypes.bool.isRequired,
  materials: PropTypes.array.isRequired,
};

export default App;
