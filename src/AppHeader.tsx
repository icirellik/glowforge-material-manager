import React from 'react';
import SyncStatus from './SyncStatus';
import IconRefresh from './icons/IconRefresh';
import logo from './logo.svg';
import './AppHeader.css';

interface AppHeaderProps {
  connected: boolean;
  forceSyncronize: any;
  synchronized: boolean;
  cloudStorageBytesUsed: number;
}

export function AppHeader(props: AppHeaderProps) {
  return (
    <header className="header">
      <div className="header__headline">
        <img src={logo} className="header__logo" alt="logo" />
        <h1 className="header__title">Glowforge Material Manager</h1>
        <SyncStatus
          connected={props.connected}
          forceSync={props.forceSyncronize}
          synchronized={props.synchronized}
        />
        <IconRefresh
          click={props.forceSyncronize}
          fill="#FFF"
          height="17px"
          width="17px"
        />
      </div>
      <div className="header_subline">
        {`Cloud Storage Used ${props.cloudStorageBytesUsed} / 102,400`}
      </div>
    </header>
  );
}
