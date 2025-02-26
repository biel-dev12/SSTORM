import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.55:3000', // Endereço da sua API local
        changeOrigin: true,
        secure: false, // Permite conexões inseguras (sem HTTPS)
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove o prefixo /api
      },
    },
  },
})
