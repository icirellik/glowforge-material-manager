import React from 'react';
import { EditorMode } from './App';
import { PluginMaterial } from './material/materialPlugin';

interface MaterialHomeProps {
  editorMode: EditorMode,
  materials: PluginMaterial[],
}

export default function MaterialHome(props: MaterialHomeProps) {
  if (props.editorMode !== 'DISPLAY' ) {
    return null;
  }

  const intro = (props.materials.length === 0) ? (
    <div className="intro">
      <p>Add your own custom material settings here.</p>
    </div>
  ) : null;


  return (
    <>
      {intro}
    </>
  );
}
