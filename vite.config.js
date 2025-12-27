import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Base dinámica: usa el nombre del repo de GitHub si existe, sino './'
  // Esto permite que funcione tanto en local como en GitHub Pages con subdirectorio
  base: process.env.GITHUB_REPOSITORY 
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : './',
  plugins: [
    tailwindcss(),
  ],
})
