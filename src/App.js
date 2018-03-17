import React from 'react';
import Materials from './Materials';
import logo from './logo.svg';
import { storeMaterial, removeMaterial } from './lib/material';
import './App.css';

const STATE_DISPLAY = 'DISPLAY';
const STATE_ADD = 'ADD';
const STATE_EDIT = 'EDIT';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    action: STATE_DISPLAY,
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
    const newMaterial = await storeMaterial(this.state);
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

  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Glowforge Materials</h1>
          <button onClick={() => { this.setState({ action: STATE_ADD })}}>➕</button>
        </header>
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
        <div className="App-materials">
          <Materials
            materials={this.state.materials}
            removeMaterial={this.remove.bind(this)}
          />
        </div>
      </div>
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
        <p className="App-intro">
          Add your own custom material settings here.
        </p>
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
        <p className="App-intro">
          Edit your own custom material settings here.
        </p>

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

export default App;
