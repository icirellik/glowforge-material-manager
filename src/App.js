import React, { Component } from 'react';
import Materials from './Materials';
import logo from './logo.svg';
import storeMaterial from './material';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.setState({ materials: props.materials });
  }
  state = {
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

  addMaterial() {
    const newMaterial = storeMaterial(this.state);
    this.setState({
      materials: [...this.state.materials, newMaterial]
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Glowforge Materials</h1>
        </header>
        <p className="App-intro">
          Add your own custom material settings here.
        </p>

        <div className="App-field">
          <label>Name</label>
          <input
            type="text"
            value={this.state.name}
            onChange={(event) => this.setState({name: event.target.value})}
          />
        </div>
        <div className="App-field">
          <label>Thickness Name</label>
          <input
            type="text"
            value={this.state.thickName}
            onChange={(event) => this.setState({thickName: event.target.value})}
          />
        </div>
        <div className="App-field">
          <label>Thickness (mm)</label>
          <input
            type="text"
            value={this.state.thickness}
            onChange={(event) => this.setState({thickness: event.target.value})}
          />
        </div>

        <div className="App-field">
          <label>Cut Power</label>
          <input
            type="text"
            value={this.state.cut.power}
            onChange={(event) => this.setState({cut: { power: event.target.value}})}
          />
        </div>
        <div className="App-field">
          <label>Cut Speed</label>
          <input
            type="text"
            value={this.state.cut.speed}
            onChange={(event) => this.setState({cut: { speed: event.target.value}})}
          />
        </div>
        <div className="App-field">
          <label>Cut Passes</label>
          <input
            type="text"
            value={this.state.cut.passes}
            onChange={(event) => this.setState({cut: {passes: event.target.value}})}
          />
        </div>
        <div className="App-field">
          <label>Cut Focal Offset</label>
          <input
            type="text"
            value={this.state.cut.focalOffset}
            onChange={(event) => this.setState({cut: {focalOffset: event.target.value}})}
          />
        </div>

        <div className="App-field">
          <label>Score Power</label>
          <input
            type="text"
            value={this.state.score.power}
            onChange={(event) => this.setState({score: {power: event.target.value}})}
          />
        </div>
        <div className="App-field">
          <label>Score Speed</label>
          <input
            type="text"
            value={this.state.score.speed}
            onChange={(event) => this.setState({score: {speed: event.target.value}})}
          />
        </div>
        <div className="App-field">
          <label>Score Passes</label>
          <input
            type="text"
            value={this.state.score.passes}
            onChange={(event) => this.setState({score: {passes: event.target.value}})}
          />
        </div>
        <div className="App-field">
          <label>Score Focal Offset</label>
          <input
            type="text"
            value={this.state.score.focalOffset}
            onChange={(event) => this.setState({score: {focalOffset: event.target.value}})}
          />
        </div>

        <button onClick={() => this.addMaterial()}>Save</button>

        <div>
          <Materials materials={this.props.materials} />
        </div>
      </div>
    );
  }
}

export default App;
