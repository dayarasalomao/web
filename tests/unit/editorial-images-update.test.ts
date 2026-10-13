import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { getPostBySlug } from '../../src/lib/blog.ts'
import { getEditorialImageDimensions } from '../../src/lib/editorial-images.ts'

const EXISTING_IMAGE_TARGETS = [
  ['hemorroidectomia-laser-co2', 'laser-co2-instrumento', 1024, 559],
  ['hemorroidas-sem-corte-laser-diodo', 'hemorroidoplastia-laser-diodo', 1024, 844],
  ['ligadura-elastica-hemorroidas-internas', 'ligadura-elastica-etapas', 1024, 572],
  ['hpv-perianal-laser-co2', 'laser-co2-regiao-perianal', 1024, 572],
  ['prurido-anal-causas-cuidados', 'prurido-anal-desconforto', 1024, 559],
  ['fissura-anal-causas-sintomas', 'fissura-anal-anatomia', 1024, 559],
] as const

describe('supplied illustrations (IMG-01/02)', () => {
  for (const [slug, name, width, height] of EXISTING_IMAGE_TARGETS) {
    it(`maps the supplied image to ${slug} with intrinsic dimensions`, () => {
      const src = `/assets/blog/${name}.webp`
      const post = getPostBySlug(slug)
      assert.ok(post)
      assert.equal(post.image?.src, src)
      assert.equal(post.image?.width, width)
      assert.equal(post.image?.height, height)
      assert.deepEqual(getEditorialImageDimensions(src), { width, height })
      assert.ok(post.content.includes(`](${src})`))
      assert.ok((post.image?.caption?.length ?? 0) > 20)
      const file = fs.readFileSync(path.join('public', src))
      assert.equal(file.toString('ascii', 0, 4), 'RIFF')
      assert.equal(file.toString('ascii', 8, 12), 'WEBP')
    })
  }
  it('replaces the retalho illustration on its existing URL and reserves the new ratio', () => {
    const src = '/assets/blog/cisto-pilonidal-tecnica-retalho.webp'
    assert.deepEqual(getEditorialImageDimensions(src), { width: 1024, height: 558 })
    const post = getPostBySlug('cisto-pilonidal-cirurgia-convencional-x-laser')
    assert.ok(post)
    assert.ok(post?.content.includes(`](${src})`))
    assert.ok(post.content.includes('não mostra todas as etapas'))
  })
})

// IMG-01: editorial social metadata must declare the real dimensions too.
it('uses intrinsic image dimensions in Open Graph instead of the social fallback ratio', async () => {
  const { buildPostMetadata } = await import('../../src/lib/seo.ts')
  for (const [slug, , width, height] of EXISTING_IMAGE_TARGETS) {
    const post = getPostBySlug(slug)
    assert.ok(post)
    const images = buildPostMetadata(post).openGraph?.images as Array<{ width: number; height: number }>
    assert.equal(images[0].width, post.coverImage?.width ?? width)
    assert.equal(images[0].height, post.coverImage?.height ?? height)
  }
})

it('does not assign unverified creator or copyright ownership to editorial images (IMG-01)', async () => {
  const { getAllPosts } = await import('../../src/lib/blog.ts')
  const { buildBlogPostGraph } = await import('../../src/lib/structured-data.ts')
  for (const post of getAllPosts().filter((post) => post.image)) {
    const graph = buildBlogPostGraph(post) as { '@graph': Array<Record<string, unknown>> }
    const article = graph['@graph'].find((node) => node['@type'] === 'Article')
    const image = article?.image as Record<string, unknown>
    assert.equal(image.creator, undefined)
    assert.equal(image.copyrightHolder, undefined)
  }
})
