import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/etag-cacher-demo/',
  plugins: [react()],
})
