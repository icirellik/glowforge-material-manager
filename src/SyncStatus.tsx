import React from 'react';
import IconStatus from './icons/IconStatus';
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
      <IconStatus click={props.forceSync} height="12px" width="12px" />
    </div>
  );
}

export default SyncStatus;
