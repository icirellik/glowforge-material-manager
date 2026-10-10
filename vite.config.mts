/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

// Vite only compiles the popup (index.html). The rest of the extension in
// public/ (manifest, service worker, content scripts and QR libraries) is
// copied into the build as-is.
export default defineConfig({
  build: {
    outDir: 'build',
    // Matches `minimum_chrome_version` in the manifest.
    target: 'chrome116',
    sourcemap: true,
    // The popup is loaded from disk, not the network, so a single large chunk
    // is fine.
    chunkSizeWarningLimit: 1000,
  },
  test: {
    environment: 'jsdom',
    environmentOptions: {
      // Lets jsdom load the images that the QR code tests decode.
      jsdom: {
        resources: 'usable',
      },
    },
    globals: true,
  },
});
