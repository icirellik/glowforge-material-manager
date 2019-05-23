import React from 'react';
import { IconCircle } from './Icons';
import { ForceSyncronize } from './App';
import './SyncStatus.css';

export interface SyncStatusProps {
  connected: boolean;
  forceSync: ForceSyncronize;
  synchronized: boolean;
}

function SyncStatus(props: SyncStatusProps) {
  return (
    <div className={
      (props.connected) ?
        (props.synchronized) ? 'Status Status-green' : 'Status Status-red'
      : 'Status Status-gray'}>
      <IconCircle click={props.forceSync} />
    </div>
  );
}

export default SyncStatus;
