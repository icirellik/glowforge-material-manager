import { sha1 } from '../lib/crypto';

/**
 * A custom material's id: `Custom:` and the first 7 hex digits of the SHA-1
 * of its title. Renaming a material changes its id, so this is the one place
 * to change when ids are stored instead.
 *
 * @param title The material's title, `${thickName} ${name}`.
 */
export async function materialIdForTitle(title: string): Promise<string> {
  const hash = await sha1(title);
  return `Custom:${hash.substring(0, 7)}`;
}
