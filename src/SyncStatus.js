import React from 'react';
import PropTypes from 'prop-types';
import { IconCircle } from './Icons';
import './SyncStatus.css';

class SyncStatus extends React.Component {
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

SyncStatus.propTypes = {
  connected: PropTypes.bool.isRequired,
  forceSync: PropTypes.func.isRequired,
  synchronized: PropTypes.bool.isRequired,
}

export default SyncStatus;
