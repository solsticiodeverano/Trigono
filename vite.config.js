import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  site: "https://solsticiodeverano.github.io",
  base: "/",
  output: "static",
})
