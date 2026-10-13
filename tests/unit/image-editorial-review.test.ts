import { it } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { createHash } from 'node:crypto'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import type { Image } from 'mdast'
import type { Node, Parent } from 'unist'
import { getAllPosts } from '../../src/lib/blog.ts'
import { EDITORIAL_IMAGE_DIMENSIONS } from '../../src/lib/editorial-images.ts'

const catalog = JSON.parse(fs.readFileSync('docs/blog-image-editorial-review.json', 'utf8')) as Array<{
  src: string; alt: string; caption: string; sha256: string; preservedDisclaimer: string | null;
}>
const bySource = new Map(catalog.map((image) => [image.src, image]))
const hash = (value: string | Buffer) => createHash('sha256').update(value).digest('hex')

function imagesIn(content: string): Image[] {
  const images: Image[] = []
  function walk(node: Node) {
    if (node.type === 'image') images.push(node as Image)
    if ('children' in node) (node as Parent).children.forEach(walk)
  }
  walk(unified().use(remarkParse).parse(content))
  return images
}

it('reviews all 42 retained images without changing pixels or losing clinical caveats (I2/3)', () => {
  assert.equal(catalog.length, 42)
  assert.deepEqual(catalog.map((image) => image.src).sort(), Object.keys(EDITORIAL_IMAGE_DIMENSIONS).sort())
  for (const image of catalog) {
    assert.equal(hash(fs.readFileSync(`public${image.src}`)), image.sha256)
    assert.ok(image.alt.length > 20 && image.alt.length <= 220, image.src)
    assert.ok(image.caption.length > 20 && image.caption.length <= 260, image.src)
    assert.doesNotMatch(image.caption, /inteligência artificial|Ilustração editorial; não representa paciente/i)
    if (image.preservedDisclaimer) assert.ok(image.caption.includes(image.preservedDisclaimer), image.src)
  }
})

it('every body/cap image matches its reviewed text and all 45 body figures have captions (I2/4)', () => {
  const posts = getAllPosts()
  assert.equal(posts.length, 40)
  assert.equal(posts.filter((post) => post.image).length, 40)
  let figureCount = 0
  for (const post of posts) {
    for (const metadata of [post.image, post.coverImage].filter((image) => image !== undefined)) {
      const expected = bySource.get(metadata!.src)!
      assert.equal(metadata!.alt, expected.alt, post.slug)
      assert.equal(metadata!.caption, expected.caption, post.slug)
    }
    for (const image of imagesIn(post.content)) {
      const expected = bySource.get(image.url)!
      assert.equal(image.alt, expected.alt, post.slug)
      assert.equal(image.url === post.image!.src ? post.image!.caption : image.title, expected.caption, post.slug)
      figureCount++
    }
  }
  assert.equal(figureCount, 45)
})

it('keeps clinical prose, headings, summaries, sources and FAQs byte-equivalent after normalization (I3)', () => {
  const baseline = JSON.parse(fs.readFileSync('.specs/features/blog-image-editorial-review/clinical-baseline.json', 'utf8')) as Array<{
    slug: string; proseSha256: string; metadataSha256: string;
  }>
  for (const expected of baseline) {
    const { data, content } = matter(fs.readFileSync(`content/posts/${expected.slug}.md`, 'utf8'))
    const prose = content.replace(/^!\[.*$/gm, '')
      .replace(/^\*Imagem ilustrativa da abordagem cirúrgica; não mostra todas as etapas de confecção e fechamento de um retalho\.\*\s*$/gm, '')
      .replace(/\s+/g, ' ').trim()
    const metadata = Object.fromEntries(Object.entries(data).filter(([key]) => !['image', 'coverImage', 'lastModified'].includes(key)))
    assert.equal(hash(prose), expected.proseSha256, expected.slug)
    assert.equal(hash(JSON.stringify(metadata)), expected.metadataSha256, expected.slug)
  }
})
