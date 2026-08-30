import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Proxy API calls (and uploaded file URLs) to the backend during
    // development so the frontend can use relative paths like "/api/..."
    // and "/uploads/..." without CORS issues or hardcoding a backend host.
    proxy: {
      '/api': {
        target: 'https://collageconnect.onrender.com',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'https://collageconnect.onrender.com',
        changeOrigin: true,
      },
    },
  },
});
