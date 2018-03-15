/* global chrome:true */
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  props = {
    name: '',
    thickName: '',
    thickness: 0,
    power: 0,
    speed: 0,
    passes: 1,
    focalOffset: null
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
        <label>Name</label>
        <input type="text" value={this.props.name} />
        <label>Thickness Name</label>
        <input type="text" value={this.props.thickName} />
        <label>Thickness (mm)</label>
        <input type="text" value={this.props.thickness} />

        <label>Power</label>
        <input type="text" value={this.props.power} />
        <label>Speed</label>
        <input type="text" value={this.props.speed} />
        <label>Passes</label>
        <input type="text" value={this.props.passes} />
        <label>Focal Offset</label>
        <input type="text" value={this.props.focalOffset} />

        <button onClick={() => storeMaterial(this.props)}>Save</button>
      </div>
    );
  }
}

function storeMaterial(props) {

}

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
      createSettings('basic'),
      createSettings('pro')
    ]
  };

  return material;
}

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

    ],
    vector_engrave_settings: [

    ],
    bitmap_engrave_settings: [

    ]
  }
  return settings;
}

function createCutSettings(props) {
  return {
    power: props.power,
    speed: props.speed,
    passes: props.passes,
    focal_offset: props.focalOffset
  };
}

export default App;
