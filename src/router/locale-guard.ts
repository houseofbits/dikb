import type { Router } from 'vue-router'
import type { createI18nInstance } from '@/i18n'

const STORAGE_KEY = 'dikb-locale'

export function setupLocaleGuard(router: Router, i18n: ReturnType<typeof createI18nInstance>) {
  router.beforeEach((to) => {
    const locale = to.meta.locale
    if (!locale) return

    i18n.global.locale.value = locale

    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, locale)
    }
  })
}
