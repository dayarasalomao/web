import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import {
  getAllPosts,
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from '../../src/lib/blog.ts'
import {
  getAllTreatments,
  getAllTreatmentSlugs,
  getFeaturedHomeTreatments,
  getTreatmentBySlug,
  HOME_FEATURED_TREATMENT_SLUGS,
  DISEASE_TO_TREATMENT_SLUG,
  TREATMENT_CARD_TO_SLUG,
} from '../../src/lib/treatments.ts'
import { getEditorialImageDimensions } from '../../src/lib/editorial-images.ts'

const REQUIRED_FRONTMATTER = [
  'title',
  'metaDescription',
  'slug',
  'publishDate',
  'lastModified',
  'primaryKeyword',
  'secondaryKeywords',
  'targetAudience',
  'intent',
] as const

describe('blog content model', () => {
  it('has no duplicate post slugs', () => {
    const slugs = getAllPostSlugs()
    assert.equal(new Set(slugs).size, slugs.length)
  })

  it('parses every post without dropping any (valid frontmatter)', () => {
    // getAllPosts skips posts with invalid frontmatter, so a count mismatch
    // means a file failed validation.
    assert.equal(getAllPosts().length, getAllPostSlugs().length)
  })

  it('every post has all required frontmatter fields', () => {
    for (const slug of getAllPostSlugs()) {
      const post = getPostBySlug(slug)
      assert.ok(post, `post "${slug}" should resolve`)
      for (const field of REQUIRED_FRONTMATTER) {
        const value = post[field as keyof typeof post]
        assert.ok(
          value !== undefined && value !== null && value !== '',
          `post "${slug}" missing frontmatter: ${field}`,
        )
      }
    }
  })

  it('every relatedPosts entry resolves and does not point to itself', () => {
    for (const post of getAllPosts()) {
      for (const relatedSlug of post.relatedPosts ?? []) {
        assert.notEqual(relatedSlug, post.slug, `post "${post.slug}" links to itself`)
        assert.ok(
          getPostBySlug(relatedSlug),
          `post "${post.slug}" references missing post "${relatedSlug}"`,
        )
      }

      assert.equal(
        getRelatedPosts(post).length,
        Math.min(post.relatedPosts?.length ?? 0, 4),
      )
    }
  })

  it('normalizes structured medical sources without duplicating a manual body section', () => {
    const sourcedPosts = getAllPosts().filter((post) => post.sources?.length)
    assert.ok(sourcedPosts.length >= 4)

    for (const post of sourcedPosts) {
      assert.doesNotMatch(post.content, /^## Fontes médicas$/m)
      for (const source of post.sources ?? []) {
        assert.ok(source.title)
        assert.ok(source.organization)
        assert.match(source.url, /^https:\/\//)
        assert.match(source.accessedAt, /^\d{4}-\d{2}-\d{2}$/)
      }
    }
  })

  it('keeps enriched editorial images dimensioned and present on disk', () => {
    const imagePosts = getAllPosts().filter((post) => post.image)
    assert.ok(imagePosts.length >= 8)

    for (const post of imagePosts) {
      const image = post.image
      assert.ok(image)
      assert.ok((image.width ?? 0) > 0)
      assert.ok((image.height ?? 0) > 0)
      assert.ok(image.alt.length >= 10)
      assert.ok(
        fs.existsSync(path.join(process.cwd(), 'public', image.src.replace(/^\//, ''))),
        `${post.slug} references a missing image: ${image.src}`,
      )
      assert.deepEqual(post.cardImage, image)
    }
  })

  it('reserves the real aspect ratio for every Markdown blog image', () => {
    const markdownImagePattern = /!\[[^\]]*\]\((\/assets\/blog\/[^)\s]+)(?:\s+"[^"]*")?\)/g

    for (const post of getAllPosts()) {
      for (const [, src] of post.content.matchAll(markdownImagePattern)) {
        const dimensions = getEditorialImageDimensions(src)
        assert.ok(dimensions, `missing intrinsic dimensions for ${src}`)
        assert.ok(dimensions.width > 0)
        assert.ok(dimensions.height > 0)
      }
    }
  })
})

describe('treatment content model', () => {
  it('has no duplicate treatment slugs', () => {
    const slugs = getAllTreatmentSlugs()
    assert.equal(new Set(slugs).size, slugs.length)
  })

  it('keeps the homepage treatment showcase curated and resolvable', () => {
    const featuredTreatments = getFeaturedHomeTreatments()

    assert.equal(featuredTreatments.length, 6)
    assert.equal(featuredTreatments.length, HOME_FEATURED_TREATMENT_SLUGS.length)
    assert.deepEqual(
      featuredTreatments.map((treatment) => treatment.slug),
      [...HOME_FEATURED_TREATMENT_SLUGS],
    )
  })

  it('every relatedBlogSlugs entry resolves to an existing post', () => {
    for (const treatment of getAllTreatments()) {
      for (const slug of treatment.relatedBlogSlugs) {
        assert.ok(
          getPostBySlug(slug),
          `treatment "${treatment.slug}" references missing post "${slug}"`,
        )
      }
    }
  })

  it('every disease mapping resolves to an existing treatment', () => {
    for (const [disease, slug] of Object.entries(DISEASE_TO_TREATMENT_SLUG)) {
      assert.ok(
        getTreatmentBySlug(slug),
        `disease "${disease}" maps to missing treatment "${slug}"`,
      )
    }
  })

  it('every home-card mapping resolves to an existing treatment', () => {
    for (const [card, slug] of Object.entries(TREATMENT_CARD_TO_SLUG)) {
      assert.ok(
        getTreatmentBySlug(slug),
        `card "${card}" maps to missing treatment "${slug}"`,
      )
    }
  })
})
