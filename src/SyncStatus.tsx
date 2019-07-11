import React from 'react';
import IconStatus from './icons/IconStatus';
import { ForceSyncronize } from './App';
import './SyncStatus.css';

export interface SyncStatusProps {
  connected: boolean;
  forceSync: ForceSyncronize;
  synchronized: boolean;
}

export default function SyncStatus(props: SyncStatusProps) {
  let title: string = 'Status: Unknown';
  if (props.synchronized) {
    title = 'Status: Synchronized';
  } else if (props.connected) {
    title = 'Status: Synchronizing';
  }
  return (
    <div className={
      (props.connected) ?
        (props.synchronized) ? 'Status Status-green' : 'Status Status-red'
      : 'Status Status-gray'}>
      <IconStatus
        click={props.forceSync}
        height="12px"
        title={title}
        width="12px"
      />
    </div>
  );
}
