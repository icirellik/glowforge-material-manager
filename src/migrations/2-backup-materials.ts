import { getLocalStorage, storeBackup } from '../lib/chromeWrappers';

const BACKUP_NAME = '0.3.x-migration';

/**
 * Backs up the 0.3.x materials before running the 0.4.x migrations
 */
export default async function migrate(): Promise<boolean> {
  let upgraded = false;

  const localStorage = await getLocalStorage();

  if (!localStorage.backup || !localStorage.backup[BACKUP_NAME]) {
    upgraded = await storeBackup(BACKUP_NAME, localStorage);
  }

  if (upgraded) {
    console.log('migration \'#2\' applied');
  }

  return upgraded;
}
