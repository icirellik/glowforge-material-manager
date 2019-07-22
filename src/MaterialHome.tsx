import React from 'react';
import { PluginMaterial } from './material/materialPlugin';
import './MaterialHome.css'
import { ModeAdd, ModeBackup } from './App';

interface MaterialHomeProps {
  materials: PluginMaterial[],
  rawSvg: string | null;
  setEditorModeAdd: ModeAdd;
  setEditorModeBackup: ModeBackup;
}

export default function MaterialHome(props: MaterialHomeProps) {
  let svg = (<span>Download Raw SVG/Trace (Refresh Page for link)</span>);
  if (props.rawSvg) {
    svg = (<a className="materialHome__menuItem" href={props.rawSvg} target="_blank" rel="noopener noreferrer">Download Raw SVG/Trace</a>);
  }

  return (
    <>
      <div className="intro">
        <p>
          The Glowforge Material Manager allows you to create custom materials
          for your Glowforge. These are different from the custom settings that
          Glowforge has implemented as they will populate Cut, Score, and Engrave
          settings automatically when you select one. Just like Proofgrade
          materials would.
        </p>
        <p>
          The material manager also create printable, engravable, whateverable
          QR codes for each material that you create. If these QR codes are
          detected in your Glowforge then the settings will be set automatically
          for you.
        </p>
        <h3>Actions</h3>
        <ul>
          <li className="materialHome__menuItem" onClick={() => { props.setEditorModeAdd(); }}>New Material</li>
          <li>{svg}</li>
          <li className="materialHome__menuItem" onClick={() => { props.setEditorModeBackup(); }}>Manage Backups</li>
        </ul>
      </div>
    </>
  );
}
