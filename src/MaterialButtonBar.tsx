import React from 'react';
import { AddMaterial, ModeCancel, EditMaterial, EditorMode, ModeAdd } from './App';
import './MaterialButtonBar.css';

interface MaterialButtonBarProps {
  editorMode: EditorMode;
  addMaterial: AddMaterial;
  cancelMaterial: ModeCancel;
  editMaterial: EditMaterial;
  newMaterial: ModeAdd;
  title: string;
}

class MaterialButtonBar extends React.Component<MaterialButtonBarProps> {
  render() {
    switch (this.props.editorMode) {
      case 'ADD':
        return (
          <div className="Material-buttons">
            <button onClick={this.props.addMaterial}>Create</button>
            <button onClick={this.props.cancelMaterial}>Cancel</button>
          </div>
        );
      case 'EDIT':
        if (!this.props.editMaterial || !this.props.title) {
          return null;
        }
        return (
          <div className="Material-buttons">
            <button onClick={() => this.props.editMaterial!(this.props.title!)}>Update</button>
            <button onClick={this.props.cancelMaterial}>Cancel</button>
          </div>
        );
      case 'SELECTED':
        return (
          <div className="Material-buttons">
            <button onClick={this.props.cancelMaterial}>Cancel</button>
          </div>
        );
      case 'DISPLAY':
      default:
        return (
          <div className="Material-buttons">
            <button onClick={this.props.newMaterial}>New</button>
          </div>
        );
    }
  }
}

export default MaterialButtonBar;
