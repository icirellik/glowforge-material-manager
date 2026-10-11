/**
 * Logs in development builds, which are unpacked and have no update URL.
 */
export function log(message: unknown) {
  if (!('update_url' in chrome.runtime.getManifest())) {
    console.log(message);
  }
}
