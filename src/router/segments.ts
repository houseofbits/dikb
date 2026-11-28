// Single source of truth for locale-prefixed, per-language-translated URL
// segments. Consumed by the router, internal link generation, the header
// language switch, `vite.config.ts`'s prerender route list, and the sitemap
// generator — so the translated paths can never drift out of sync.

export type Locale = 'en' | 'lv'
export type PageKey = 'home' | 'work' | 'services' | 'about' | 'contact'

export const locales: Locale[] = ['en', 'lv']
export const defaultLocale: Locale = 'en'

export const siteOrigin = 'https://dizainsuninterjers.lv'

export const segments: Record<PageKey, Record<Locale, string>> = {
  home: { en: '', lv: '' },
  work: { en: 'work', lv: 'darbi' },
  services: { en: 'services', lv: 'pakalpojumi' },
  about: { en: 'about', lv: 'par-mums' },
  contact: { en: 'contact', lv: 'kontakti' },
}

export type BuildPathArgs = { key: PageKey } | { key: 'work-detail'; slug: string }

export function buildPath(locale: Locale, args: BuildPathArgs): string {
  if (args.key === 'work-detail') {
    return `/${locale}/${segments.work[locale]}/${args.slug}`
  }
  const segment = segments[args.key][locale]
  return segment ? `/${locale}/${segment}` : `/${locale}/`
}
