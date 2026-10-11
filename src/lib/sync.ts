/**
 * Asks every Glowforge tab to add the custom materials again. The value is the
 * time, so it changes on every request and the tabs always hear it, even when
 * a request is still waiting.
 */
export function requestSync(): Promise<void> {
  return chrome.storage.local.set({ syncRequestedAt: Date.now() });
}
