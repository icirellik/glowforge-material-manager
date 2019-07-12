import React from 'react';
import {
  AddMaterial,
  CopyMaterial,
  EditMaterial,
  EditorMode,
  ModeAdd,
  ModeDefault,
  ModeEdit,
  ModeSelect,
  SetMaterial,
} from './App';
import './MaterialButtonBar.css';

interface MaterialButtonBarProps {
  addMaterial: AddMaterial;
  copyMaterial: CopyMaterial;
  editMaterial: EditMaterial;
  setMaterial: SetMaterial;

  setEditorModeAdd: ModeAdd;
  setEditorModeDefault: ModeDefault;
  setEditorModeEdit: ModeEdit;
  setEditorModeSelect: ModeSelect;

  editorMode: EditorMode;
  previousTitle: string | null;
  title: string;
}

export default function MaterialButtonBar(props: MaterialButtonBarProps) {
  switch (props.editorMode) {
    case 'ADD':
      return (
        <div className="materialButtons">
          <button onClick={() => { props.addMaterial(); }}>Create</button>
          <button onClick={() => { props.setEditorModeDefault(); }}>Cancel</button>
        </div>
      );
    case 'DUPLICATE':
      return (
        <div className="materialButtons">
          <button onClick={() => { props.addMaterial(); }}>Create</button>
          <button onClick={() => {
            if (!props.previousTitle) {
              props.setEditorModeDefault();
            } else {
              props.setEditorModeSelect(props.previousTitle);
            }
          }}>Cancel</button>
        </div>
      );
    case 'EDIT':
      return (
        <div className="materialButtons">
          <button onClick={() => { props.editMaterial(props.title); }}>Update</button>
          <button onClick={() => {
            if (!props.previousTitle) {
              props.setEditorModeDefault();
            } else {
              props.setEditorModeSelect(props.previousTitle);
            }
          }}>Cancel</button>
        </div>
      );
    case 'SELECTED':
      return (
        <div className="materialButtons">
          <button onClick={() => { props.setMaterial(props.title); }}>Set</button>
          <button onClick={() => { props.setEditorModeEdit(props.title); }}>Edit</button>
          <button onClick={() => { props.copyMaterial(props.title); }}>Duplicate</button>
          <button onClick={() => { props.setEditorModeDefault(); }}>Close</button>
        </div>
      );
    case 'DISPLAY':
    default:
      return (
        <div className="materialButtons">
          <button onClick={() => { props.setEditorModeAdd(); }}>New</button>
        </div>
      );
  }
}
