import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Enable production optimizations
    minify: 'esbuild',
    cssMinify: true,
    // Source maps for debugging in production
    sourcemap: false,
    // Chunk size optimization
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          forms: ['react-hook-form'],
        },
      },
    },
    // Asset optimization
    assetsInlineLimit: 4096,
    // Target modern browsers for smaller bundles
    target: 'es2015',
  },
  // PWA-ready configuration
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    host: true,
    port: 4173,
  },
});
