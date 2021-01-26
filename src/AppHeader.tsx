import React from 'react';
import SyncStatus from './SyncStatus';
import logo from './logo.svg';
import { ForceSyncronize } from './App';
import './AppHeader.css';

interface AppHeaderProps {
  cloudStorageBytesUsed: number;
  connected: boolean;
  forceSyncronize: ForceSyncronize;
  serial: string | null;
  synchronized: boolean;
}

export function AppHeader(props: AppHeaderProps) {
  const {
    cloudStorageBytesUsed,
    connected,
    forceSyncronize,
    serial,
    synchronized,
  } = props;
  return (
    <header className="header">
      <div className="header__headline">
        <img src={logo} className="header__logo" alt="logo" />
        <h1 className="header__title">
          Glowforge Material Manager
          {serial ? ` - ${serial}` : undefined}
        </h1>
        <SyncStatus
          connected={connected}
          forceSync={forceSyncronize}
          synchronized={synchronized}
        />
      </div>
      <div className="header_subline">
        {`Cloud Storage Used ${cloudStorageBytesUsed} / 102,400`}
      </div>
    </header>
  );
}
