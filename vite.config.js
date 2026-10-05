import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // In dev, the API runs separately on :3001
  server: { proxy: { '/api': 'http://localhost:3001' } },
})
