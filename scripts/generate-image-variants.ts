// Runs as a `predev`/`prebuild` step (via jiti). Generates right-sized JPEG
// siblings (e.g. hero-640w.jpg, hero-1024w.jpg) next to every source image
// under public/work/, so DeviceMockup/InstallationFrame can serve a srcset
// close to their actual rendered size instead of downscaling a multi-
// megapixel master in the browser (the cause of the soft/aliased thumbnails).
import { copyFileSync, readdirSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'
import sharp from 'sharp'

const WORK_DIR = join(import.meta.dirname, '../public/work')
const VARIANT_WIDTHS = [640, 1024]

function findSourceImages(dir: string): string[] {
  const found: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      found.push(...findSourceImages(path))
    } else if (extname(entry.name) === '.jpg' && !/-\d+w\.jpg$/.test(entry.name)) {
      found.push(path)
    }
  }
  return found
}

async function generateVariant(sourcePath: string, width: number): Promise<void> {
  const variantPath = sourcePath.replace(/\.jpg$/, `-${width}w.jpg`)

  const sourceStat = statSync(sourcePath)
  try {
    const variantStat = statSync(variantPath)
    if (variantStat.mtimeMs >= sourceStat.mtimeMs) return
  } catch {
    // variant doesn't exist yet — generate it
  }

  const image = sharp(sourcePath)
  const metadata = await image.metadata()
  if (!metadata.width || metadata.width <= width) {
    // Source is already at or below this width — buildSrcset() still emits
    // this candidate, so write it as a copy rather than an upscale, so the
    // srcset URL doesn't dangle (see the `never upscale` comment above).
    copyFileSync(sourcePath, variantPath)
    return
  }

  await image.resize({ width }).jpeg({ quality: 80 }).toFile(variantPath)
  console.log(`Generated ${variantPath}`)
}

const sources = findSourceImages(WORK_DIR)
for (const source of sources) {
  for (const width of VARIANT_WIDTHS) {
    await generateVariant(source, width)
  }
}
