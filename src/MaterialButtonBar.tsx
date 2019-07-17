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
          <button
            onClick={() => { props.addMaterial(); }}
            title="Save the new material"
          >Create</button>
          <button
            onClick={() => { props.setEditorModeDefault(); }}
            title="Cancel"
          >Cancel</button>
        </div>
      );
    case 'DUPLICATE':
      return (
        <div className="materialButtons">
          <button
            onClick={() => { props.addMaterial(); }}
            title="Save the new material"
          >Create</button>
          <button
            onClick={() => {
              if (!props.previousTitle) {
                props.setEditorModeDefault();
              } else {
                props.setEditorModeSelect(props.previousTitle);
              }
            }}
            title="Cancel"
          >Cancel</button>
        </div>
      );
    case 'EDIT':
      return (
        <div className="materialButtons">
          <button
            onClick={() => { props.editMaterial(props.title); }}
            title="Update the current material"
          >Update</button>
          <button
            onClick={() => {
              if (!props.previousTitle) {
                props.setEditorModeDefault();
              } else {
                props.setEditorModeSelect(props.previousTitle);
              }
            }}
            title="Cancel"
          >Cancel</button>
        </div>
      );
    case 'SELECTED':
      return (
        <div className="materialButtons">
          <button
            onClick={() => { props.setMaterial(props.title); }}
            title="Set the current material in the Glowforge UI"
          >Set</button>
          <button
            onClick={() => { props.setEditorModeEdit(props.title); }}
            title="Edit the current material"
          >Edit</button>
          <button
            onClick={() => { props.copyMaterial(props.title); }}
            title="Duplicate the current material"
          >Duplicate</button>
          <button
            onClick={() => { props.setEditorModeDefault(); }}
            title="Back to main menu"
          >Close</button>
        </div>
      );
    case 'DISPLAY':
    default:
      return (
        <div className="materialButtons">
          <button
            onClick={() => { props.setEditorModeAdd(); }}
            title="Create new material"
          >New</button>
        </div>
      );
  }
}
