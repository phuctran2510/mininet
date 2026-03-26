import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Vercel: VITE_BASE không set → '/'
  // GitHub Pages: VITE_BASE='/mininet/' (set trong deploy.yml)
  base: process.env.VITE_BASE || '/',
  build: { sourcemap: false }
})
