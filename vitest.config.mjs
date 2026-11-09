import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    alias: {
      '@': path.resolve(import.meta.dirname, './'),
    },
    include: ['**/*.test.{ts,tsx}'],
  },
});
