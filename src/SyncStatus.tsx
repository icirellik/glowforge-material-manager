import React from 'react';
import { IconCircle } from './Icons';
import { ForceSyncronize } from './App';
import './SyncStatus.css';

interface SyncStatusProps {
  connected: boolean;
  forceSync: ForceSyncronize;
  synchronized: boolean;
}

class SyncStatus extends React.Component<SyncStatusProps> {
  render() {
    return (
      <div className={
        (this.props.connected) ?
        (this.props.synchronized) ? 'Status Status-green' : 'Status Status-red'
        : 'Status Status-gray'}>
        <IconCircle click={this.props.forceSync} />
      </div>
    );
  }
}

export default SyncStatus;
