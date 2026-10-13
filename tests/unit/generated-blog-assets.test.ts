import { it } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createHash } from 'node:crypto'
import sharp from 'sharp'

const manifest = JSON.parse(fs.readFileSync('docs/blog-generated-images-manifest.json', 'utf8')) as Array<{
  slug: string; src: string; width: number; height: number; bytes: number; sha256: string;
  generationTool: string; prompt: string; kind: string;
}>

it('keeps 22 active generated assets after restoring the client EPSiT illustration (I1)', () => {
  assert.equal(manifest.length, 22)
  assert.equal(manifest.filter((image) => image.kind === 'image').length, 16)
  assert.equal(manifest.filter((image) => image.kind === 'cover').length, 6)
  assert.equal(new Set(manifest.map((image) => image.src)).size, 22)
  assert.equal(new Set(manifest.map((image) => image.sha256)).size, 22)
})

it('keeps every generated image optimized, dimensioned and traceable to its prompt (F1)', async () => {
  for (const image of manifest) {
    const file = fs.readFileSync(`public${image.src}`)
    const metadata = await sharp(file).metadata()
    assert.equal(metadata.format, 'webp', image.slug)
    assert.equal(metadata.width, image.width, image.slug)
    assert.equal(metadata.height, image.height, image.slug)
    assert.ok(image.width >= 1200, image.slug)
    assert.ok(Math.abs(image.width / image.height - 16 / 9) < 0.03, image.slug)
    assert.ok(file.length < 400_000, `${image.slug}: ${file.length} bytes`)
    assert.equal(file.length, image.bytes, image.slug)
    assert.equal(createHash('sha256').update(file).digest('hex'), image.sha256, image.slug)
    assert.equal(image.generationTool, 'OpenAI image_gen (built-in)')
    assert.ok(image.prompt.length > 100, image.slug)
  }
})
