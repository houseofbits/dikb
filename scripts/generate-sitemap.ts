// Runs as a `postbuild` step (via jiti). Writes dist/sitemap.xml from the
// same route-segment table + project list that drives the router and
// vite.config.ts's prerender route list, so the sitemap can't drift from
// what's actually prerendered.
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { locales, siteOrigin, buildPath, type PageKey } from '../src/router/segments'
import { projects } from '../src/data/projects'

const staticKeys: PageKey[] = ['home', 'work', 'services', 'about', 'contact']

interface Entry {
  loc: string
  alternates: { locale: string; href: string }[]
}

function alternatesFor(key: PageKey | 'work-detail', slug?: string): { locale: string; href: string }[] {
  const alternates = locales.map((locale) => ({
    locale,
    href:
      siteOrigin +
      (key === 'work-detail' ? buildPath(locale, { key, slug: slug! }) : buildPath(locale, { key })),
  }))
  const enHref = alternates.find((a) => a.locale === 'en')!.href
  return [...alternates, { locale: 'x-default', href: enHref }]
}

const entries: Entry[] = []

for (const locale of locales) {
  for (const key of staticKeys) {
    entries.push({ loc: siteOrigin + buildPath(locale, { key }), alternates: alternatesFor(key) })
  }
  for (const project of projects) {
    entries.push({
      loc: siteOrigin + buildPath(locale, { key: 'work-detail', slug: project.slug }),
      alternates: alternatesFor('work-detail', project.slug),
    })
  }
}

const body = entries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
${entry.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.locale}" href="${a.href}"/>`).join('\n')}
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`

const outPath = resolve(import.meta.dirname, '../dist/sitemap.xml')
writeFileSync(outPath, xml)
console.log(`Wrote ${entries.length} URLs to ${outPath}`)
