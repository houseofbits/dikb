import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { locales, siteOrigin as SITE_ORIGIN } from '@/router/segments'
import { useLocalizedPath } from './useLocalizedPath'

export function usePageMeta(opts: {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
}) {
  const route = useRoute()
  const { locale } = useI18n()
  const { localeSwitchPath } = useLocalizedPath()

  const canonicalUrl = computed(() => `${SITE_ORIGIN}${route.path}`)

  useHead({
    title: () => toValue(opts.title),
    htmlAttrs: { lang: () => locale.value },
    meta: [
      { name: 'description', content: () => toValue(opts.description) },
      { property: 'og:title', content: () => toValue(opts.title) },
      { property: 'og:description', content: () => toValue(opts.description) },
      { property: 'og:url', content: () => canonicalUrl.value },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: `${SITE_ORIGIN}/og-image.png` },
      { property: 'og:locale', content: () => (locale.value === 'lv' ? 'lv_LV' : 'en_US') },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { rel: 'canonical', href: () => canonicalUrl.value },
      ...locales.map((targetLocale) => ({
        rel: 'alternate',
        hreflang: targetLocale,
        href: () => `${SITE_ORIGIN}${localeSwitchPath(targetLocale)}`,
      })),
      {
        rel: 'alternate',
        hreflang: 'x-default',
        href: () => `${SITE_ORIGIN}${localeSwitchPath('en')}`,
      },
    ],
  })
}
