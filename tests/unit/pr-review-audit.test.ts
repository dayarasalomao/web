import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { getPostBySlug } from '../../src/lib/blog.ts'
import { getTreatmentBySlug } from '../../src/lib/treatments.ts'
import { auditEditorialInboundLinks, runSeoContentAudit } from '../../src/lib/seo-audit.ts'

const source = getPostBySlug('pomada-hemorroida-resolve')!
const target = getPostBySlug('hemorroida-tem-cura-ou-passa-sozinha')!
const earlier = ['fissura-anal-causas-sintomas', 'constipacao-intestinal-quando-investigar', 'diarreia-cronica-causas-sinais-alerta', 'hidradenite-supurativa-sintomas-tratamento']
function warnings(relatedPosts: string[], content = '') {
  return auditEditorialInboundLinks([
    { ...source, relatedPosts, content },
    { ...target, relatedPosts: [], content: '' },
  ], []).filter((issue) => issue.message.includes(target.slug))
}

describe('rendered editorial inbound links (AUDIT-01)', () => {
  it('warns when the only reference is beyond the four rendered suggestions', () => {
    assert.deepEqual(warnings([...earlier, target.slug]), [{
      severity: 'warning',
      code: 'weak-editorial-inbound',
      message: `${target.slug} aparece no hub /blog, mas não recebe links de artigos ou tratamentos relacionados.`,
    }])
  })

  it('accepts a suggestion that actually renders', () => {
    assert.deepEqual(warnings([target.slug, ...earlier]), [])
  })

  it('uses the renderer filtering before applying the limit', () => {
    assert.deepEqual(warnings([source.slug, 'missing-post', ...earlier.slice(0, 3), target.slug]), [])
  })

  it('counts in-body article links with fragment, query and trailing slash', () => {
    for (const href of [`/blog/${target.slug}#faq`, `/blog/${target.slug}?ref=article`, `/blog/${target.slug}/`]) {
      assert.deepEqual(warnings([], `[Leia o guia](${href})`), [])
    }
  })

  it('does not treat a self link as an editorial incoming link', () => {
    const issues = auditEditorialInboundLinks([{ ...target, relatedPosts: [target.slug], content: `[Esta página](/blog/${target.slug})` }], [])
    assert.equal(issues.length, 1)
    assert.equal(issues[0].code, 'weak-editorial-inbound')
  })

  it('counts supporting articles rendered by treatment pages', () => {
    const treatment = getTreatmentBySlug('hemorroidectomia-laser-co2')!
    const issues = auditEditorialInboundLinks([{ ...target, relatedPosts: [], content: '' }], [
      { ...treatment, relatedBlogSlugs: ['missing-post', target.slug] },
    ])
    assert.deepEqual(issues, [])
  })

  it('keeps the actual editorial graph free of errors and warnings', () => {
    assert.deepEqual(runSeoContentAudit(), [])
  })
})
