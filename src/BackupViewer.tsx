import React from 'react';
import { StorageLocal } from './lib/chromeWrappers';

interface BackupViewerProps {
  backups: {[key: string]: StorageLocal};
}

export class BackupViewer extends React.Component<BackupViewerProps> {

  render() {
    const backups: React.ReactElement[] = [];
    if (this.props.backups) {
      for (let key of Object.keys(this.props.backups)) {
        const backup = this.props.backups[key];
        backups.push((
          <li>{key} -
            <a
              download={`${key}-backup.json`}
              href={`data:application/json,${JSON.stringify(backup)}`}
              target="_blank"
              rel="noopener noreferrer"
            >Download</a>
          </li>
        ));
      }
    }
    return (
      <>
        <div>Manage Backups</div>
        <ul>
          {backups}
        </ul>
      </>
    )
  }
}
