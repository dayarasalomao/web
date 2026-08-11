import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  getAllPosts,
  getAllPostSlugs,
  getPostBySlug,
  getRelatedPosts,
} from '../../src/lib/blog.ts'
import {
  getAllTreatments,
  getAllTreatmentSlugs,
  getTreatmentBySlug,
  DISEASE_TO_TREATMENT_SLUG,
  TREATMENT_CARD_TO_SLUG,
} from '../../src/lib/treatments.ts'

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
})

describe('treatment content model', () => {
  it('has no duplicate treatment slugs', () => {
    const slugs = getAllTreatmentSlugs()
    assert.equal(new Set(slugs).size, slugs.length)
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
