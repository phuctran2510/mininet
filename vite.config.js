import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VITE_BASE env var:
//   GitHub Pages: /mininet/  (set in deploy.yml)
//   Vercel:       /          (set in Vercel dashboard or not set)
const base = process.env.VITE_BASE ?? '/'

export default defineConfig({
  plugins: [react()],
  base,
  build: { sourcemap: false }
})
