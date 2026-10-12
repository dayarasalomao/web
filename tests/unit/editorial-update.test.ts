import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { SEO_TITLE, SEO_LOCATION_WITH_STATE } from '../../src/constants.ts'
import { getAllPosts } from '../../src/lib/blog.ts'
import { getAllTreatments } from '../../src/lib/treatments.ts'
import { buildPostMetadata, buildTreatmentMetadata } from '../../src/lib/seo.ts'

describe('editorial title update', () => {
  it('uses the requested location and exact homepage title (SEO-01)', () => {
    assert.equal(SEO_LOCATION_WITH_STATE, 'Campo Grande (MS)')
    assert.equal(SEO_TITLE, 'Dra. Dayara Salomão | Coloproctologista em Campo Grande (MS)')
  })

  it('keeps all treatment titles localized and consistent across social metadata (SEO-01)', () => {
    const titles = getAllTreatments().map((treatment) => {
      const metadata = buildTreatmentMetadata(treatment)
      assert.equal(metadata.title, `${treatment.shortTitle} em Campo Grande (MS) | Dra. Dayara`)
      assert.equal(metadata.openGraph?.title, metadata.title)
      assert.equal(metadata.twitter?.title, metadata.title)
      assert.equal(metadata.alternates?.canonical, `https://www.dayarasalomao.com.br/tratamentos/${treatment.slug}`)
      return metadata.title
    })
    assert.equal(new Set(titles).size, 14)
  })

  it('uses concise unique search titles without changing editorial headings (SEO-02)', () => {
    const titles = getAllPosts().map((post) => {
      assert.ok(post.seoTitle, `missing seoTitle: ${post.slug}`)
      assert.ok(post.seoTitle.length <= 65, `long seoTitle: ${post.slug}`)
      const metadata = buildPostMetadata(post)
      assert.equal(metadata.title, post.seoTitle)
      assert.equal(metadata.openGraph?.title, post.seoTitle)
      assert.equal(metadata.twitter?.title, post.seoTitle)
      assert.equal(metadata.alternates?.canonical, `https://www.dayarasalomao.com.br/blog/${post.slug}`)
      return post.seoTitle
    })
    assert.equal(new Set(titles).size, titles.length)
  })

  it('falls back to the editorial title for content without seoTitle (SEO-02)', () => {
    const post = getAllPosts()[0]
    const metadata = buildPostMetadata({ ...post, seoTitle: undefined })
    assert.equal(metadata.title, post.title)
    assert.equal(metadata.openGraph?.title, post.title)
    assert.equal(metadata.twitter?.title, post.title)
  })
})
