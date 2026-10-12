import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { getAllPosts, getPostBySlug } from '../../src/lib/blog.ts'
import { getStrategicTarget } from '../../src/lib/seo-map.ts'
import { buildBlogPostGraph } from '../../src/lib/structured-data.ts'

const NEW_POSTS = [
  ['primeiros-30-dias-hemorroidectomia-laser-co2', 'Laser de CO2: os primeiros 30 dias após a cirurgia'],
  ['pomada-hemorroida-resolve', 'Pomada para hemorroida resolve? Limites e cuidados'],
  ['hemorroida-externa-trombosada', 'Hemorroida trombosada: caroço dolorido e tratamento'],
  ['hemorroida-tem-cura-ou-passa-sozinha', 'Hemorroida tem cura ou passa sozinha?'],
  ['como-encontrar-coloproctologista-campo-grande-ms', 'Como encontrar um coloproctologista em Campo Grande (MS)'],
] as const

describe('new patient guides (BLOG-01/LOCAL-01/GRAPH-01)', () => {
  for (const [slug, seoTitle] of NEW_POSTS) {
    it(`prepares ${slug} with sources, FAQ and complementary links`, () => {
      const post = getPostBySlug(slug)
      assert.ok(post)
      assert.equal(post.seoTitle, seoTitle)
      assert.equal(post.publishDate, '2026-10-12')
      assert.equal(post.lastModified, '2026-10-12')
      assert.ok((post.sources?.length ?? 0) >= 1)
      assert.ok((post.faqs?.length ?? 0) >= 3)
      assert.ok(post.content.includes('](/locais-de-atendimento/campo-grande)'))
      assert.ok(getAllPosts().some((other) => other.relatedPosts?.includes(slug)), `orphan: ${slug}`)
      const graph = buildBlogPostGraph(post) as { '@graph': Array<Record<string, unknown>> }
      const article = graph['@graph'].find((node) => node['@type'] === 'Article')
      assert.equal((article?.citation as unknown[]).length, post.sources?.length)
      assert.equal(article?.reviewedBy, undefined)
    })
  }

  it('keeps commercial variants on the location page and the how-to query on the guide', () => {
    for (const query of ['procto campo grande (ms)', 'proctologista campo grande (ms)', 'coloproctologista campo grande (ms)']) {
      assert.equal(getStrategicTarget(query)?.canonicalPath, '/locais-de-atendimento/campo-grande')
    }
    assert.equal(getStrategicTarget('como encontrar um coloproctologista em campo grande (ms)')?.canonicalPath,
      '/blog/como-encontrar-coloproctologista-campo-grande-ms')
    const guide = getPostBySlug('como-encontrar-coloproctologista-campo-grande-ms')
    assert.ok(guide)
    for (const phrase of ['procto', 'proctologista', 'coloproctologista', 'CRM-MS 16556', 'RQE 9819', 'R. Alagoas, 700', 'Sala 8']) {
      assert.ok(guide.content.includes(phrase), `missing local information: ${phrase}`)
    }
  })

  it('distinguishes the CO2 timeline from a universal recovery promise', () => {
    const post = getPostBySlug('primeiros-30-dias-hemorroidectomia-laser-co2')
    assert.ok(post)
    for (const heading of ['## Antes da cirurgia', '## Dia 0', '## Dias 1 a 3', '## Por volta do dia 7', '## Dias 8 a 14', '## Dias 15 a 21', '## Dia 30', '## Quando procurar atendimento']) {
      assert.ok(post.content.includes(heading))
    }
    assert.ok(post.content.includes('não é uma garantia de cicatrização ou alta em 30 dias'))
    assert.ok(post.content.includes('sangramento intenso'))
    assert.ok(post.content.includes('dificuldade para urinar'))
  })

  it('consolidates the supplied sem-corte topic on the existing route', () => {
    const post = getPostBySlug('hemorroidas-sem-corte-laser-diodo')
    assert.ok(post?.content.includes('## O que esperar nas semanas seguintes'))
    assert.equal(getPostBySlug('cirurgia-hemorroidas-sem-corte-quando-vale-a-pena'), null)
  })
})
