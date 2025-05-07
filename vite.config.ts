import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.API_BASE_URL': JSON.stringify(
      process.env.NODE_ENV === 'production'
        ? 'http://caddy/api'
        : 'http://localhost/api'
    )
  },
  base: '/patients/',
  server: {
    port: 3001,
  },
  build: {
    outDir: './dist/patients',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true,
  },
  plugins: [react(), tailwindcss()],
})
