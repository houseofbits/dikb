// Derives the srcset for a source image against the width variants written
// by scripts/generate-image-variants.ts (e.g. /work/slug/hero.jpg ->
// /work/slug/hero-640w.jpg, /work/slug/hero-1024w.jpg).
const VARIANT_WIDTHS = [640, 1024]

export function buildSrcset(src: string): string {
  return VARIANT_WIDTHS.map((width) => `${src.replace(/\.jpg$/, `-${width}w.jpg`)} ${width}w`).join(', ')
}
