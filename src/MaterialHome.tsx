import React from 'react';
import type {
  Connection, ForceSyncronize, ModeAdd, ModeBackup, Reconnect, ToggleQrAutoSelect,
} from './App';
import './MaterialHome.css';

interface MaterialHomeProps {
  connection: Connection;
  forceSyncronize: ForceSyncronize;
  qrAutoSelect: boolean;
  rawSvg: string | null;
  reconnect: Reconnect;
  setEditorModeAdd: ModeAdd;
  setEditorModeBackup: ModeBackup;
  toggleQrAutoSelect: ToggleQrAutoSelect;
}

export default function MaterialHome(props: MaterialHomeProps) {
  const {
    connection, qrAutoSelect, rawSvg, reconnect, toggleQrAutoSelect,
  } = props;
  let svg = (<span>Download Raw SVG/Trace (Open a design in Glowforge for the link)</span>);
  if (rawSvg) {
    svg = (<a className="materialHome__menuItem" href={rawSvg} target="_blank" rel="noopener noreferrer">Download Raw SVG/Trace</a>);
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
        <br />
        <p>
          The material manager also creates a unique QR Code for each material.
          You can download the QR code and print, engrave, or even order your
          own custom stickers. And, with QR auto-select on, if one of these QR
          codes is detected in your Glowforge then the material will
          automatically be set for you, just like it would with Proofgrade
          materials.
        </p>
        <h3>Actions</h3>
        <ul>
          <li className="materialHome__menuItem" onClick={() => { props.setEditorModeAdd(); }}>New Material</li>
          <li>{svg}</li>
          <li className="materialHome__menuItem" onClick={() => { props.setEditorModeBackup(); }}>Manage Backups</li>
          <li className="materialHome__menuItem" onClick={() => { props.forceSyncronize(); }}>Force Synchronize with GFUI</li>
          {connection === 'disconnected'
            ? <li className="materialHome__menuItem" onClick={() => { reconnect(); }}>Reconnect to this Glowforge tab</li>
            : null}
          <li
            className="materialHome__menuItem"
            onClick={() => { toggleQrAutoSelect(); }}
            title="QR auto-select reads Glowforge's lid camera images, which needs access to them."
          >
            {qrAutoSelect ? 'Turn off QR auto-select' : 'Turn on QR auto-select'}
          </li>
        </ul>
      </div>
    </>
  );
}
