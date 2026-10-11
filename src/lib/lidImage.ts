/**
 * Glowforge's lid camera images, which QR auto-select reads. The extension
 * only gets access to them when QR auto-select is turned on, so that updating
 * to a version with QR auto-select doesn't ask every user for a new
 * permission.
 */

// Must match `optional_host_permissions` in the manifest.
export const LID_IMAGE_ORIGIN = 'https://storage.googleapis.com/gf-app-imgl/*';

/**
 * Whether a URL is a Glowforge lid camera image, the only images QR
 * auto-select downloads.
 */
export function isLidImageUrl(url: string): boolean {
  try {
    const { protocol, host, pathname } = new URL(url);
    return protocol === 'https:' && host === 'storage.googleapis.com' && pathname.startsWith('/gf-app-imgl/');
  } catch {
    return false;
  }
}

/**
 * Whether QR auto-select is on, which is whether the extension can read lid
 * images.
 */
export function hasLidImageAccess(): Promise<boolean> {
  return chrome.permissions.contains({ origins: [LID_IMAGE_ORIGIN] });
}

/**
 * Turns QR auto-select on, asking the user for access to lid images. This
 * must be called from a click in an extension page.
 *
 * @returns Whether the user allowed it.
 */
export function requestLidImageAccess(): Promise<boolean> {
  return chrome.permissions.request({ origins: [LID_IMAGE_ORIGIN] });
}

/**
 * Turns QR auto-select off.
 */
export function removeLidImageAccess(): Promise<boolean> {
  return chrome.permissions.remove({ origins: [LID_IMAGE_ORIGIN] });
}
