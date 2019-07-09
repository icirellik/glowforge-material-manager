import React from 'react';
import { PluginMaterial } from './material/materialPlugin';

interface MaterialHomeProps {
  materials: PluginMaterial[],
}

export default function MaterialHome(props: MaterialHomeProps) {
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
