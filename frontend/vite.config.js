import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/leaf-disease/',
  server: {
    port: 3000,
    proxy: {
      '/predict': 'http://localhost:5000',
      '/health': 'http://localhost:5000',
      '/classes': 'http://localhost:5000',
    }
  }
})
