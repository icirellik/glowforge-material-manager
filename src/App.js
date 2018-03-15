/* global chrome:true */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
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
    }
  };

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

        <button onClick={() => storeMaterial(this.state)}>Save</button>
      </div>
    );
  }
}

/**
 * Stores a new material.
 */
function storeMaterial(props) {
  const newMaterial = createMaterial(props);
  chrome.storage.sync.get(null, result => {
    console.log('Refreshing materials.');
    console.log(result);
    if (result && result.materials) {
      const materials = result.materials;

      chrome.storage.sync.set({
        'materials': [ ...materials, newMaterial ]
      }, function() {
        console.log('New material added:');
        console.log(newMaterial)
      });
    } else {
      console.log('Things ain\'t right');
    }
  });
}

/**
 * Creates a brand new custom material.
 */
function createMaterial(props) {
  let material = {
    id: `${props.thickName.toLowerCase().replace(/[ ]/g, '-')}-${props.name.toLowerCase().replace(/[ ]/g, '-')}`,
    title: `${props.thickName} ${props.name}`,
    sku: '',
    nominal_thickness: props.thickness,
    thickness_name: props.thickName,
    variety: {
      name: `${props.thickName.toLowerCase().replace(/[ ]/g, '-')}-${props.name.toLowerCase().replace(/[ ]/g, '-')}`,
      common_name: `${props.thickName} ${props.name}`,
      type_name: props.name,
      thumbnails: [
        "//images.ctfassets.net/ljtyf78xujn2/LPH1C4ibUkQimYKuA6iAq/c5abd83cffd111e8366daa2c137e6f19/Leather-1.png"
      ],
      display_options: null
    },
    settings: [
      createSettings(props, 'basic'),
      createSettings(props, 'pro')
    ]
  };

  return material;
}

/**
 * Creates the settings for a given tube type.
 */
function createSettings(props, tubeType) {
  let settings = {
    description: `${props.thickName} ${props.name} SEttings`,
    active_date: "2017-04-06T00:00-07:00",
    environment: [
      "production"
    ],
    tube_type: tubeType,
    cut_settings: createCutSettings(props),
    score_settings: [
      createScoreSettings(props)
    ],
    vector_engrave_settings: [

    ],
    bitmap_engrave_settings: [

    ]
  }
  return settings;
}

/**
 * Creates a new set of cut settings.
 */
function createCutSettings(props) {
  return {
    power: props.cut.power,
    speed: props.cut.speed,
    passes: props.cut.passes,
    focal_offset: props.cut.focalOffset
  };
}

/**
 * Creates a new set of score settings.
 */
function createScoreSettings(props) {
  return {
    power: props.score.power,
    speed: props.score.speed,
    passes: props.score.passes,
    focal_offset: props.score.focalOffset,
    uses: [
      "default"
    ],
    display_color_mask: null,
    outcome: {
      name: "High Quality",
      dev_id: "high-quality"
    }
  };
}

export default App;
