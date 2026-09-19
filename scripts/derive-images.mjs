/*
  Derives crop variants of the portfolio photos for layouts that need a fixed
  ratio. Originals in public/portfolio/*.jpeg stay untouched; output goes to
  public/portfolio/derived/. Run once (or after adding a photo):

    npm run images:derive

  Variants per photo:
    <id>-4x5.jpg   portrait card (attention crop)        max 1200 wide
    <id>-1x1.jpg   square tile (attention crop)          max 1000
    <id>-wide.jpg  16:9 full-bleed (attention crop)      max 1920 wide
    <id>-mono.jpg  desaturated, darkened, 16:9           max 1920 wide
*/
import { readdir, mkdir } from 'node:fs/promises'
import { join, parse } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const SRC = fileURLToPath(new URL('../public/portfolio/', import.meta.url))
const OUT = join(SRC, 'derived')
const JPEG = { quality: 82, mozjpeg: true }

await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC)).filter((f) => /\.jpe?g$/i.test(f))

for (const file of files) {
  const { name } = parse(file)
  const input = join(SRC, file)
  const base = () => sharp(input).rotate()

  await base().resize({ width: 1200, height: 1500, fit: 'cover', position: sharp.strategy.attention })
    .jpeg(JPEG).toFile(join(OUT, `${name}-4x5.jpg`))
  await base().resize({ width: 1000, height: 1000, fit: 'cover', position: sharp.strategy.attention })
    .jpeg(JPEG).toFile(join(OUT, `${name}-1x1.jpg`))
  await base().resize({ width: 1920, height: 1080, fit: 'cover', position: sharp.strategy.attention })
    .jpeg(JPEG).toFile(join(OUT, `${name}-wide.jpg`))
  await base().resize({ width: 1920, height: 1080, fit: 'cover', position: sharp.strategy.attention })
    .grayscale().modulate({ brightness: 0.72 }).linear(1.08, -8)
    .jpeg(JPEG).toFile(join(OUT, `${name}-mono.jpg`))

  console.log('ok', name)
}
console.log(`${files.length} photos → ${OUT}`)
