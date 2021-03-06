import React, { FunctionComponent } from 'react';
import { IconStatus } from './icons/IconStatus';
import type { ForceSyncronize } from './App';
import './SyncStatus.css';

interface SyncStatusProps {
  connected: boolean;
  forceSync: ForceSyncronize;
  synchronized: boolean;
}

export const SyncStatus: FunctionComponent<SyncStatusProps> = (props: SyncStatusProps) => {
  const {
    connected,
    forceSync,
    synchronized,
  } = props;
  let title = 'Status: Unknown';
  if (synchronized) {
    title = 'Status: Synchronized';
  } else if (connected) {
    title = 'Status: Synchronizing';
  }
  return (
    <div className={
      (connected)
        ? (synchronized) ? 'Status Status-green' : 'Status Status-red'
        : 'Status Status-gray'
}
    >
      <IconStatus
        click={forceSync}
        height="12px"
        title={title}
        width="12px"
      />
    </div>
  );
};
