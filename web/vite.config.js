import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Sets the base path for GitHub Pages deployment
  base: '/ekerheim_interiors_web/',
  build: {
    outDir: 'dist'
  }
})