import { it } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import { getAllPosts, getPostBySlug } from '../../src/lib/blog.ts'
import { buildPostMetadata } from '../../src/lib/seo.ts'
import { buildBlogPostGraph } from '../../src/lib/structured-data.ts'

const manifest = JSON.parse(fs.readFileSync('docs/blog-generated-images-manifest.json', 'utf8')) as Array<{
  slug: string; src: string; alt: string; caption: string; width: number; height: number; kind: string;
}>

it('gives all 40 articles a distinct card image (F2)', () => {
  const posts = getAllPosts()
  assert.equal(posts.length, 40)
  assert.equal(posts.filter((post) => post.cardImage).length, 40)
  assert.equal(new Set(posts.map((post) => post.cardImage!.src)).size, 40)
})

it('uses each declared generated image in cards, OG, Twitter and Article schema (F2/3)', () => {
  for (const expected of manifest) {
    const post = getPostBySlug(expected.slug)!
    const image = { src: expected.src, alt: expected.alt, caption: expected.caption, width: expected.width, height: expected.height }
    assert.deepEqual(expected.kind === 'cover' ? post.coverImage : post.image, image)
    assert.deepEqual(post.cardImage, image)
    const metadata = buildPostMetadata(post)
    const og = metadata.openGraph!.images as Array<{ url: string; width: number; height: number; alt: string }>
    assert.deepEqual(og[0], { url: expected.src, width: expected.width, height: expected.height, alt: expected.alt })
    assert.deepEqual(metadata.twitter!.images, [expected.src])
    const graph = buildBlogPostGraph(post) as { '@graph': Array<Record<string, unknown>> }
    const article = graph['@graph'].find((node) => node['@type'] === 'Article')!
    const primary = article.image as Record<string, unknown>
    assert.equal(primary.contentUrl, `https://www.dayarasalomao.com.br${expected.src}`)
    assert.equal(primary.width, expected.width)
    assert.equal(primary.height, expected.height)
    assert.equal(primary.caption, expected.caption)
    assert.equal(primary.creator, undefined)
    assert.equal(primary.copyrightHolder, undefined)
    const page = graph['@graph'].find((node) => node['@type'] === 'MedicalWebPage')!
    assert.deepEqual(page.primaryImageOfPage, { '@id': primary['@id'] })
    if (expected.kind === 'image') assert.ok(post.content.includes(`](${expected.src})`))
  }
})

it('rejects invalid cover frontmatter in an isolated post fixture (F2)', () => {
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'blog-cover-validation-'))
  const valid = fs.readFileSync('content/posts/hemorroida-ou-plicoma-como-diferenciar.md', 'utf8')
    .replace('slug: hemorroida-ou-plicoma-como-diferenciar', 'slug: fixture')
  const moduleUrl = pathToFileURL(path.resolve('src/lib/blog.ts')).href
  fs.mkdirSync(path.join(scratch, 'content/posts'), { recursive: true })
  const cases = [
    ['coverImage: invalid', 'Post "fixture" has invalid coverImage frontmatter.'],
    ['coverImage:\n  src: /assets/blog/cover.webp\n  alt: Capa ilustrativa\n  width: 1200', 'Post "fixture" coverImage requires src, alt, and positive integer width/height.'],
  ]
  try {
    for (const [frontmatter, message] of cases) {
      fs.writeFileSync(path.join(scratch, 'content/posts/fixture.md'), valid.replace('\n---\n', `\n${frontmatter}\n---\n`))
      const output = execFileSync(process.execPath, ['--experimental-transform-types', '--no-warnings', '--input-type=module', '-e',
        `import {getPostBySlug} from ${JSON.stringify(moduleUrl)};try {getPostBySlug('fixture');console.log('accepted')} catch(e) {console.log(e.message)}`,
      ], { cwd: scratch, encoding: 'utf8' }).trim()
      assert.equal(output, message)
    }
  } finally {
    fs.rmSync(scratch, { recursive: true, force: true })
  }
})
