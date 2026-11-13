import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { SITE_URL } from '../../src/constants.ts'
import { buildTreatmentGraph } from '../../src/lib/structured-data.ts'
import { TREATMENTS, type Treatment } from '../../src/lib/treatments.ts'

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

function graphNode(treatment: Treatment, type: string): Record<string, unknown> {
  const graph = buildTreatmentGraph(treatment)['@graph'] as Array<Record<string, unknown>>
  return graph.find((node) => node['@type'] === type)!
}

describe('treatment depth fields', () => {
  it('only publishes sources with a title, organization, HTTPS URL and access date', () => {
    for (const treatment of TREATMENTS) {
      for (const source of treatment.sources ?? []) {
        assert.ok(source.title.trim() && source.organization.trim(), treatment.slug)
        assert.match(source.url, /^https:\/\//, treatment.slug)
        assert.match(source.accessedAt, ISO_DATE, treatment.slug)
        if (source.publishedAt) assert.match(source.publishedAt, ISO_DATE, treatment.slug)
      }
      if (treatment.lastReviewed) assert.match(treatment.lastReviewed, ISO_DATE, treatment.slug)
    }
  })

  it('emits citation, lastReviewed and reviewedBy only when the page shows them', () => {
    const base = TREATMENTS[0]
    const plain = graphNode({ ...base, sources: undefined, lastReviewed: undefined }, 'MedicalWebPage')
    assert.equal(plain.citation, undefined)
    assert.equal(plain.lastReviewed, undefined)
    assert.equal(plain.reviewedBy, undefined)
    assert.ok(String(plain.dateModified).startsWith(base.lastUpdated))

    const reviewed = graphNode(
      {
        ...base,
        lastReviewed: '2026-11-20',
        sources: [
          {
            title: 'Haemorrhoids',
            organization: 'NHS',
            url: 'https://www.nhs.uk/conditions/piles-haemorrhoids/',
            accessedAt: '2026-11-12',
          },
        ],
      },
      'MedicalWebPage',
    )
    assert.equal(reviewed.lastReviewed, '2026-11-20')
    assert.deepEqual(reviewed.reviewedBy, { '@id': `${SITE_URL}#physician` })
    assert.equal((reviewed.citation as unknown[]).length, 1)
  })

  it('links the procedure to its authored page and keeps recovery in its follow-up', () => {
    const procedure = graphNode(
      { ...TREATMENTS[0], recovery: ['Retorno gradual às atividades.'] },
      'MedicalProcedure',
    )
    assert.match(String(procedure.followup), /Retorno gradual às atividades\.$/)
    assert.equal(procedure.indication, undefined)
    assert.equal(procedure.performer, undefined)
    assert.equal(procedure.procedureType, undefined)

    const page = graphNode(TREATMENTS[0], 'MedicalWebPage')
    assert.deepEqual(page.mainEntity, { '@id': procedure['@id'] })
    assert.deepEqual(page.author, { '@id': `${SITE_URL}#physician` })
  })
})
