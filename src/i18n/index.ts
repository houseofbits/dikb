import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import lv from './locales/lv.json'

export type Locale = 'en' | 'lv'

// A factory, not a singleton: vite-ssg renders routes (potentially
// concurrently), and a module-level i18n instance mutated by locale would be
// shared/racy across renders. Each rendered page gets its own instance;
// locale is then set per-navigation by the router's locale guard.
export function createI18nInstance() {
  return createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en, lv },
  })
}
