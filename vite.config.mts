/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

// Vite compiles the popup (index.html) and the background service worker. The
// rest of the extension in public/ (manifest and content scripts) is copied
// into the build as-is.
export default defineConfig({
  build: {
    outDir: 'build',
    rolldownOptions: {
      input: {
        index: 'index.html',
        background: 'src/background.ts',
      },
      output: {
        // The manifest refers to the service worker by name.
        entryFileNames: (chunk) => (chunk.name === 'background' ? 'background.js' : 'assets/[name]-[hash].js'),
      },
    },
    // Matches `minimum_chrome_version` in the manifest.
    target: 'chrome116',
    sourcemap: true,
    // The popup is loaded from disk, not the network, so a single large chunk
    // is fine.
    chunkSizeWarningLimit: 1000,
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
