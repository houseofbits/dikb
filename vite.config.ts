import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// Side-effect type import: applies vite-ssg's `declare module 'vite'`
// augmentation (adds `ssgOptions`) to this file's TS project. main.ts's
// import doesn't cover this file — vite.config.ts type-checks under a
// separate tsconfig.node.json project.
import type {} from 'vite-ssg'
import { locales, buildPath, type PageKey } from './src/router/segments.ts'
import { projects } from './src/data/projects.ts'

const staticKeys: PageKey[] = ['home', 'work', 'services', 'about', 'contact']

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  server: {
    port: 4321,
    // The contact form posts to /api/contact.php. In dev, run PHP alongside Vite:
    //   php -S localhost:8000 -t public
    proxy: { '/api': 'http://localhost:8000' },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ssgOptions: {
    formatting: 'minify',
    includedRoutes() {
      const paths = ['/']
      for (const locale of locales) {
        for (const key of staticKeys) paths.push(buildPath(locale, { key }))
        for (const project of projects) {
          paths.push(buildPath(locale, { key: 'work-detail', slug: project.slug }))
        }
      }
      return paths
    },
  },
})
