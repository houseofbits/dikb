import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { defaultLocale, locales, segments, type Locale, type PageKey } from './segments'

declare module 'vue-router' {
  interface RouteMeta {
    locale?: Locale
    key?: PageKey | 'work-detail'
  }
}

function localeRoutes(locale: Locale): RouteRecordRaw[] {
  const prefix = `/${locale}`

  return [
    {
      path: `${prefix}/`,
      name: `home-${locale}`,
      meta: { locale, key: 'home' },
      component: HomeView,
    },
    {
      path: `${prefix}/${segments.work[locale]}`,
      meta: { locale },
      children: [
        {
          path: '',
          name: `work-${locale}`,
          meta: { key: 'work' },
          component: () => import('../views/WorkView.vue'),
        },
        {
          path: ':slug',
          name: `work-detail-${locale}`,
          meta: { key: 'work-detail' },
          component: () => import('../views/WorkDetailView.vue'),
        },
      ],
    },
    {
      path: `${prefix}/${segments.services[locale]}`,
      name: `services-${locale}`,
      meta: { locale, key: 'services' },
      component: () => import('../views/ServicesView.vue'),
    },
    {
      path: `${prefix}/${segments.about[locale]}`,
      name: `about-${locale}`,
      meta: { locale, key: 'about' },
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: `${prefix}/${segments.contact[locale]}`,
      name: `contact-${locale}`,
      meta: { locale, key: 'contact' },
      component: () => import('../views/ContactView.vue'),
    },
  ]
}

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: `/${defaultLocale}/` },
  ...locales.flatMap(localeRoutes),
]
