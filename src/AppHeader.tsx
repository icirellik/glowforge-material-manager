import React from 'react';
import { SyncStatus } from './SyncStatus';
import logo from './logo.svg';
import type { Connection, ForceSyncronize, Reconnect } from './App';
import './AppHeader.css';

interface AppHeaderProps {
  cloudItemsUsed: number;
  cloudStorageBytesUsed: number;
  connection: Connection;
  forceSyncronize: ForceSyncronize;
  reconnect: Reconnect;
  serial: string | null;
  synchronized: boolean;
}

export function AppHeader(props: AppHeaderProps) {
  const {
    cloudItemsUsed,
    cloudStorageBytesUsed,
    connection,
    forceSyncronize,
    reconnect,
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
          connection={connection}
          forceSync={forceSyncronize}
          reconnect={reconnect}
          synchronized={synchronized}
        />
      </div>
      <div className="header_subline">
        {`Cloud Storage Used ${cloudStorageBytesUsed} / 102,400 bytes, ${cloudItemsUsed} / 512 materials`}
      </div>
    </header>
  );
}
