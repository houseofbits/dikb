import type { LocalizedText } from './projects'

export interface Service {
  icon: 'touch' | 'layout' | 'globe' | 'chip' | 'wrench'
  title: LocalizedText
  description: LocalizedText
}

export const services: Service[] = [
  {
    icon: 'touch',
    title: { en: 'Interactive exhibit design', lv: 'Interaktīvo ekspozīciju dizains' },
    description: {
      en: 'Concept-to-installation design for touchscreen exhibits, from spatial layout to on-screen interaction patterns.',
      lv: 'Skārienekrāna ekspozīciju dizains no koncepcijas līdz uzstādīšanai — telpiskais izkārtojums un ekrāna mijiedarbības risinājumi.',
    },
  },
  {
    icon: 'layout',
    title: { en: 'UX/UI for public touchscreens', lv: 'UX/UI publiskiem skārienekrāniem' },
    description: {
      en: 'Interfaces built for stand-up, walk-up use — large touch targets, short attention spans and multi-visitor sessions.',
      lv: 'Saskarnes, kas veidotas ātrai lietošanai stāvot — lieli skāriena mērķi, ierobežota uzmanība un vairāku apmeklētāju sesijas.',
    },
  },
  {
    icon: 'globe',
    title: {
      en: 'Content strategy & localisation',
      lv: 'Satura stratēģija un lokalizācija',
    },
    description: {
      en: 'Editorial planning and multilingual content structuring so exhibits stay accessible to international visitors.',
      lv: 'Redakcionālā plānošana un daudzvalodu satura strukturēšana, lai ekspozīcijas paliktu pieejamas starptautiskiem apmeklētājiem.',
    },
  },
  {
    icon: 'chip',
    title: { en: 'Hardware integration', lv: 'Aparatūras integrācija' },
    description: {
      en: 'Kiosk, sensor and display specification and integration — matched to venue conditions and durability needs.',
      lv: 'Kiosku, sensoru un displeju specifikācija un integrācija, pielāgota telpas apstākļiem un izturības prasībām.',
    },
  },
  {
    icon: 'wrench',
    title: { en: 'Maintenance & support', lv: 'Uzturēšana un atbalsts' },
    description: {
      en: 'Ongoing content updates, monitoring and on-site support so exhibits keep running long after opening day.',
      lv: 'Pastāvīga satura atjaunināšana, pārraudzība un atbalsts uz vietas, lai ekspozīcijas darbojas ilgi pēc atklāšanas.',
    },
  },
]
