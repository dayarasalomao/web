import { it } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import { getAllPosts, getPostBySlug } from '../../src/lib/blog.ts'
import { buildPostMetadata } from '../../src/lib/seo.ts'
import { isTeachingFigure } from '../../src/lib/og-figure.ts'
import { buildBlogPostGraph } from '../../src/lib/structured-data.ts'

const manifest = JSON.parse(fs.readFileSync('docs/blog-generated-images-manifest.json', 'utf8')) as Array<{
  slug: string; src: string; alt: string; caption: string; width: number; height: number; kind: string;
}>
const reviewed = new Map((JSON.parse(fs.readFileSync('docs/blog-image-editorial-review.json', 'utf8')) as Array<{ src: string; alt: string; caption: string }>).map((image) => [image.src, image]))

it('gives every reviewed article an image and shares only the client pilonidal comparison (I1)', () => {
  const allPosts = getAllPosts()
  assert.equal(allPosts.length, 41)
  assert.deepEqual(allPosts.filter((post) => !post.cardImage).map((post) => post.slug), [])
  const posts = allPosts.filter((post) => post.cardImage)
  assert.equal(new Set(posts.map((post) => post.cardImage!.src)).size, 40)
  const groups = new Map<string, string[]>()
  for (const post of posts) groups.set(post.cardImage!.src, [...(groups.get(post.cardImage!.src) ?? []), post.slug])
  assert.deepEqual(Array.from(groups).filter(([, slugs]) => slugs.length > 1), [
    ['/assets/blog/cisto-pilonidal-convencional-x-laser-silac.webp', ['cisto-pilonidal-cirurgia-convencional-x-laser', 'cisto-pilonidal-laser-epsit']],
  ])
})

it('uses each declared generated image in cards; previews and Article schema use the figure the article shows (F2/3)', () => {
  for (const expected of manifest) {
    assert.equal(expected.caption, reviewed.get(expected.src)!.caption)
    assert.equal(expected.alt, reviewed.get(expected.src)!.alt)
    if (expected.slug === 'sangramento-anal-dor-quando-procurar-coloproctologista') {
      assert.equal(expected.src, '/assets/blog/capa-sangramento-anal-dor-quando-procurar-coloproctologista-v2.webp')
    }
    const post = getPostBySlug(expected.slug)!
    const image = { src: expected.src, alt: expected.alt, caption: expected.caption, width: expected.width, height: expected.height }
    assert.deepEqual(expected.kind === 'cover' ? post.coverImage : post.image, image)
    assert.deepEqual(post.cardImage, image)
    // Social previews are rendered per post from the figure the article shows.
    const metadata = buildPostMetadata(post)
    const preview = `/blog/${post.slug}/opengraph-image`
    const og = metadata.openGraph!.images as Array<{ url: string; width: number; height: number; alt: string }>
    const previewAlt = post.image && isTeachingFigure(post.image.src) ? post.image.alt : `${post.title} — Dra. Dayara Salomão`
    assert.deepEqual(og[0], { url: preview, width: 1200, height: 630, alt: previewAlt })
    assert.deepEqual(metadata.twitter!.images, [preview])
    // A cover is only for cards; the page's primary image is the one it renders.
    const shown = post.image ?? image
    const graph = buildBlogPostGraph(post) as { '@graph': Array<Record<string, unknown>> }
    const article = graph['@graph'].find((node) => node['@type'] === 'Article')!
    const primary = article.image as Record<string, unknown>
    assert.equal(primary.contentUrl, `https://www.dayarasalomao.com.br${shown.src}`)
    assert.equal(primary.width, shown.width)
    assert.equal(primary.height, shown.height)
    assert.equal(primary.caption, shown.caption ?? shown.alt)
    assert.equal(primary.creator, undefined)
    assert.equal(primary.copyrightHolder, undefined)
    const page = graph['@graph'].find((node) => node['@type'] === 'MedicalWebPage')!
    assert.deepEqual(page.primaryImageOfPage, { '@id': primary['@id'] })
    if (expected.kind === 'image') assert.ok(post.content.includes(`](${expected.src})`))
  }
})

it('previews posts with their teaching figure, and decorative covers with the doctor photo', () => {
  assert.equal(isTeachingFigure('/assets/blog/hemorroida-x-plicoma-anal.webp'), true)
  assert.equal(isTeachingFigure('/assets/blog/capa-hpv-anal-identificar-tratar.webp'), false)
  const covered = getPostBySlug('como-encontrar-coloproctologista-campo-grande-ms')!
  assert.match(covered.image!.src, /\/capa-/)
  const og = buildPostMetadata(covered).openGraph!.images as Array<{ alt: string }>
  assert.equal(og[0].alt, `${covered.title} — Dra. Dayara Salomão`)
})

it('rejects invalid cover frontmatter in an isolated post fixture (F2)', () => {
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-cover-validation-'))
  const valid = fs.readFileSync('content/posts/hemorroida-ou-plicoma-como-diferenciar.md', 'utf8')
    .replace('slug: hemorroida-ou-plicoma-como-diferenciar', 'slug: fixture')
  const modulePath = path.resolve('src/lib/blog.ts')
  const tsxLoaderUrl = pathToFileURL(path.resolve('node_modules/tsx/dist/loader.mjs')).href
  fs.mkdirSync(path.join(scratch, 'content/posts'), { recursive: true })
  const cases = [
    ['coverImage: invalid', 'Post "fixture" has invalid coverImage frontmatter.'],
    ['coverImage:\n  src: /assets/blog/cover.webp\n  alt: Capa ilustrativa\n  width: 1200', 'Post "fixture" coverImage requires src, alt, and positive integer width/height.'],
  ]
  try {
    for (const [frontmatter, message] of cases) {
      fs.writeFileSync(path.join(scratch, 'content/posts/fixture.md'), valid.replace('\n---\n', `\n${frontmatter}\n---\n`))
      const output = execFileSync(process.execPath, ['--import', tsxLoaderUrl, '--no-warnings', '-e',
        `const {getPostBySlug} = require(${JSON.stringify(modulePath)});try {getPostBySlug('fixture');console.log('accepted')} catch(e) {console.log(e.message)}`,
      ], { cwd: scratch, encoding: 'utf8' }).trim()
      assert.equal(output, message)
    }
  } finally {
    fs.rmSync(scratch, { recursive: true, force: true })
  }
})
