import React from 'react';
import { AddMaterial, ModeDefault, EditMaterial, EditorMode, ModeAdd, SetMaterial, CopyMaterial, ModeEdit } from './App';
import './MaterialButtonBar.css';

interface MaterialButtonBarProps {
  addMaterial: AddMaterial;
  copyMaterial: CopyMaterial;
  editMaterial: EditMaterial;
  editorMode: EditorMode;
  setEditorModeAdd: ModeAdd;
  setEditorModeDefault: ModeDefault;
  setEditorModeEdit: ModeEdit;
  setMaterial: SetMaterial;
  title: string;
}

export default function MaterialButtonBar(props: MaterialButtonBarProps) {
  switch (props.editorMode) {
    case 'ADD':
      return (
        <div className="Material-buttons">
          <button onClick={props.addMaterial}>Create</button>
          <button onClick={props.setEditorModeDefault}>Cancel</button>
        </div>
      );
    case 'EDIT':
      if (!props.editMaterial || !props.title) {
        return null;
      }
      return (
        <div className="Material-buttons">
          <button onClick={() => props.editMaterial!(props.title!)}>Update</button>
          <button onClick={props.setEditorModeDefault}>Cancel</button>
        </div>
      );
    case 'SELECTED':
      return (
        <div className="Material-buttons">
          <button onClick={() => { props.setMaterial(props.title); }}>Set</button>
          <button onClick={() => { props.setEditorModeEdit(props.title); }}>Edit</button>
          <button onClick={() => { props.copyMaterial(props.title); }}>Duplicate</button>
          <button onClick={props.setEditorModeDefault}>Close</button>
        </div>
      );
    case 'DISPLAY':
    default:
      return (
        <div className="Material-buttons">
          <button onClick={props.setEditorModeAdd}>New</button>
        </div>
      );
  }
}
