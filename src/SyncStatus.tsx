import React, { FunctionComponent } from 'react';
import { IconStatus } from './icons/IconStatus';
import type { Connection, ForceSyncronize, Reconnect } from './App';
import './SyncStatus.css';

interface SyncStatusProps {
  connection: Connection;
  forceSync: ForceSyncronize;
  reconnect: Reconnect;
  synchronized: boolean;
}

const TITLES: Record<Connection, string> = {
  none: 'Status: Open Glowforge to synchronize',
  disconnected:
    'Status: Not connected to this Glowforge tab, click to reconnect',
  connected: 'Status: Synchronizing',
};

export const SyncStatus: FunctionComponent<SyncStatusProps> = (
  props: SyncStatusProps,
) => {
  const { connection, forceSync, reconnect, synchronized } = props;
  const connected = connection === 'connected';
  let className = 'Status Status-gray';
  if (connected) {
    className = synchronized ? 'Status Status-green' : 'Status Status-red';
  }
  return (
    <div className={className}>
      <IconStatus
        click={connection === 'disconnected' ? reconnect : forceSync}
        height="12px"
        title={
          connected && synchronized
            ? 'Status: Synchronized'
            : TITLES[connection]
        }
        width="12px"
      />
    </div>
  );
};
