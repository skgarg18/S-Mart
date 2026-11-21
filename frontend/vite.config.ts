
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/S-Mart/',
  plugins: [
    vue(),
    tailwindcss(),
  ],
})
