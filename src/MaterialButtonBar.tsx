import React from 'react';
import {
  STATE_ADD,
  STATE_DISPLAY,
  STATE_EDIT,
  STATE_SELECTED,
 } from './state';
 import './MaterialButtonBar.css';
import { AddMaterial, ModeCancel, EditMaterial } from './App';

interface MaterialButtonBarProps {
  action: string;
  addMaterial: AddMaterial;
  cancelMaterial: ModeCancel;
  editMaterial: EditMaterial;
  title: string;
}

class MaterialButtonBar extends React.Component<MaterialButtonBarProps> {
  render() {
    switch (this.props.action) {
      case STATE_ADD:
        return (
          <div className="Material-buttons">
            <button onClick={this.props.addMaterial}>Create</button>
            <button onClick={this.props.cancelMaterial}>Cancel</button>
          </div>
        );
      case STATE_EDIT:
        return (
          <div className="Material-buttons">
            <button onClick={() => this.props.editMaterial(this.props.title)}>Update</button>
            <button onClick={this.props.cancelMaterial}>Cancel</button>
          </div>
        );
      case STATE_SELECTED:
        return (
          <div className="Material-buttons">
            <button onClick={this.props.cancelMaterial}>Cancel</button>
          </div>
        );
      case STATE_DISPLAY:
        return null;
      default:
        return null;
    }
  }
}

export default MaterialButtonBar;
