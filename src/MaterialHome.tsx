import React from 'react';
import { PluginMaterial } from './material/materialPlugin';
import { ModeAdd, ModeBackup, ForceSyncronize } from './App';
import './MaterialHome.css'

interface MaterialHomeProps {
  forceSyncronize: ForceSyncronize;
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
          The Glowforge Material Manager allows you to manage custom materials
          for your Glowforge. These are different from the custom settings that
          Glowforge has implemented as they will populate the Cut, Score, and
          Engrave settings automatically when you select one. In the same way
          that Proofgrade materials would.
        </p>
        <br/>
        <p>
          The material manager also creates a unique QR Code for each material.
          You can download the QR code and print, engrave, or even order your
          own custom stickers. And, if one of these QR codes is detected in your
          Glowforge then the material will automatically be set for you, just
          like it would with Proofgrade materials.
        </p>
        <h3>Actions</h3>
        <ul>
          <li className="materialHome__menuItem" onClick={() => { props.setEditorModeAdd(); }}>New Material</li>
          <li>{svg}</li>
          <li className="materialHome__menuItem" onClick={() => { props.setEditorModeBackup(); }}>Manage Backups</li>
          <li className="materialHome__menuItem" onClick={() => { props.forceSyncronize(); }}>Force Synchronize with GFUI</li>
        </ul>
      </div>
    </>
  );
}
