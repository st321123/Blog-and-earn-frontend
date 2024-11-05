import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Make sure this is set correctly
  build: {
    outDir: 'dist', // Default output directory, can change if needed
  }
})
