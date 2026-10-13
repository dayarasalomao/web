import { it } from 'node:test'
import assert from 'node:assert/strict'
import { getPostBySlug } from '../../src/lib/blog.ts'
import { buildBlogPostGraph } from '../../src/lib/structured-data.ts'

const GUIDELINE_URL = 'https://www.ascrsu.com/ascrs/repview?name=3_2851101_PDF&type=784-156'

it('uses the accessible 2024 guideline in all three bibliographies and Article citations (SOURCE-01)', () => {
  for (const slug of ['doenca-hemorroidaria-sintomas-graus', 'ligadura-elastica-hemorroidas-internas', 'ligadura-elastica-doi-recuperacao-cuidados']) {
    const post = getPostBySlug(slug)
    assert.ok(post)
    const source = post.sources?.find((source) => source.title.includes('(2024)'))
    assert.ok(source)
    assert.equal(source.url, GUIDELINE_URL)
    assert.equal(source.accessedAt, '2026-10-12')
    assert.equal(post.lastModified, '2026-10-12')
    const graph = buildBlogPostGraph(post) as { '@graph': Array<Record<string, unknown>> }
    const article = graph['@graph'].find((node) => node['@type'] === 'Article')
    const citations = article?.citation as Array<{ name: string; url: string }>
    assert.equal(citations.find((citation) => citation.name === source.title)?.url, GUIDELINE_URL)
    assert.ok(citations.every((citation) => !citation.url.includes('2024-Hemorrhoids-CPG.pdf')))
  }
})
