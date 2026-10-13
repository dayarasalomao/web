import { it } from 'node:test'
import assert from 'node:assert/strict'
import { buildGlobalGraph, buildLocationGraph, buildPracticeLocationId } from '../../src/lib/structured-data.ts'
import { getLocationBySlug } from '../../src/lib/locations.ts'

it('declares the person type for personal relationships in both physician graphs (SCHEMA-01)', () => {
  const location = getLocationBySlug('campo-grande')
  assert.ok(location)
  for (const graph of [buildGlobalGraph(), buildLocationGraph(location)]) {
    assert.ok(graph)
    const nodes = graph['@graph'] as Array<Record<string, unknown>>
    const physician = nodes.find((node) => node['@id'] === 'https://www.dayarasalomao.com.br/#physician')
    assert.ok(physician)
    assert.deepEqual(physician['@type'], ['Person', 'Physician'])
    assert.deepEqual(physician.worksFor, { '@id': buildPracticeLocationId('campo-grande') })
    assert.deepEqual(physician.workLocation, { '@id': buildPracticeLocationId('campo-grande') })
    assert.doesNotThrow(() => JSON.parse(JSON.stringify(graph)))
  }
})
