// Runs as a `predev`/`prebuild` step (via jiti), alongside generate-image-
// variants.ts. The site's wordmark-only logo has no icon glyph of its own,
// but browser tabs still need a small mark, so the favicon reuses the
// wordmark's "D" as a standalone glyph: paper on ink, square, matching the
// header mark. Rasterizes it (with
// concrete colors instead of CSS custom properties, since this runs outside
// a browser) into the favicon/apple-touch-icon PNGs, and writes the SVG
// itself as public/favicon.svg for browsers that support it directly.
// sharp/libvips can rasterize SVG but can't write .ico, so modern browsers
// get the SVG/PNG icons and public/favicon.ico stays as the legacy fallback.
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const PUBLIC_DIR = join(import.meta.dirname, '../public')

const LOGO_MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
  <rect width="28" height="28" fill="#141414" />
  <rect x="8" y="6" width="3.4" height="16" fill="#eeece6" />
  <path d="M11.4 6 H13.5 A8 8 0 0 1 13.5 22 H11.4 Z" fill="#eeece6" />
</svg>`

writeFileSync(join(PUBLIC_DIR, 'favicon.svg'), LOGO_MARK_SVG)

const PNG_TARGETS: { name: string; size: number }[] = [
  { name: 'favicon-16.png', size: 16 },
  { name: 'favicon-32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
]

for (const { name, size } of PNG_TARGETS) {
  await sharp(Buffer.from(LOGO_MARK_SVG))
    .resize(size, size)
    .png()
    .toFile(join(PUBLIC_DIR, name))
  console.log(`Generated public/${name}`)
}
