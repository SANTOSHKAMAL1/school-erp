import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, proxy: { '/api': 'http://127.0.0.1:8120', '/uploads': 'http://127.0.0.1:8120' } },
  build: { outDir: 'dist', assetsDir: 'static', chunkSizeWarningLimit: 1500 },
});
