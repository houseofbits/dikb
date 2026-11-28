import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { buildPath, type BuildPathArgs, type Locale, type PageKey } from '@/router/segments'

export function useLocalizedPath() {
  const route = useRoute()
  const { locale } = useI18n()

  function path(
    key: PageKey | 'work-detail',
    targetLocale: Locale = locale.value as Locale,
    params?: { slug: string },
  ): string {
    const args = (key === 'work-detail' ? { key, slug: params!.slug } : { key }) as BuildPathArgs
    return buildPath(targetLocale, args)
  }

  /** The equivalent URL of the *current* page in another locale. */
  function localeSwitchPath(targetLocale: Locale): string {
    const key = (route.meta.key ?? 'home') as PageKey | 'work-detail'
    return path(key, targetLocale, { slug: String(route.params.slug ?? '') })
  }

  return { path, localeSwitchPath }
}
