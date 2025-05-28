import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'localhost',
      '92d5-190-107-17-17.ngrok-free.app', // Agrega este host
    ],
  },
});
