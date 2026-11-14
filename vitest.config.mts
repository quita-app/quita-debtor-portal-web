import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }, // the same "@/*" alias as tsconfig.json
  },
  test: {
    environment: 'node', // apiHealth runs on the server, not in a browser
    setupFiles: ['./vitest.setup.ts'],
    env: { API_INTERNAL_URL: 'http://api.test' }, // a fake address that only MSW answers
  },
});
