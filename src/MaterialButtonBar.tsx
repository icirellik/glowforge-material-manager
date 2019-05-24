import React from 'react';
import { AddMaterial, ModeCancel, EditMaterial, EditorMode } from './App';
import './MaterialButtonBar.css';

interface MaterialButtonBarProps {
  editorMode: EditorMode;
  addMaterial?: AddMaterial;
  cancelMaterial?: ModeCancel;
  editMaterial?: EditMaterial;
  title?: string;
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
        return null;
      default:
        return null;
    }
  }
}

export default MaterialButtonBar;
