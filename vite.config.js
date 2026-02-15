import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // listen on all network interfaces
    port: process.env.PORT || 5173,
    allowedHosts: 'all', // allow all hosts
  },
})
