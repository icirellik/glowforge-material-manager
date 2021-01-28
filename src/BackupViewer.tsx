import React, { FunctionComponent } from 'react';
import type { StorageLocal } from './lib/chromeWrappers';

interface BackupViewerProps {
  backups: {[key: string]: StorageLocal} | void;
}

export const BackupViewer: FunctionComponent<BackupViewerProps> = (props: BackupViewerProps) => {
  const backupElements: React.ReactElement[] = [];
  const { backups } = props;
  if (backups) {
    const keys = Object.keys(backups);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const backup = backups[key];
      backupElements.push((
        <li>
          {key}
          {' '}
          -
          <a
            download={`${key}-backup.json`}
            href={`data:application/json,${JSON.stringify(backup)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download
          </a>
        </li>
      ));
    }
  }
  return (
    <>
      <div>Manage Backups</div>
      <ul>
        {backupElements}
      </ul>
    </>
  );
};
