import '@/assets/styles/base.css'

import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'
import { setupLocaleGuard } from './router/locale-guard'
import { createI18nInstance } from './i18n'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior() {
      return { top: 0 }
    },
  },
  ({ app, router }) => {
    const i18n = createI18nInstance()
    app.use(i18n)
    setupLocaleGuard(router, i18n)
  },
)
