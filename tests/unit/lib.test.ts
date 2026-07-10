import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  calculateReadingTime,
  extractItalicHook,
  extractFirstImage,
  getTargetAudienceLabel,
  getContentIntentLabel,
  TargetAudience,
  ContentIntent,
} from '../../src/lib/blog.ts'
import {
  getAllLocations,
  getIndexableLocations,
  getLocationBySlug,
  isLocationIndexable,
} from '../../src/lib/locations.ts'

describe('calculateReadingTime', () => {
  it('rounds up by 200 wpm', () => {
    const content = Array.from({ length: 401 }, () => 'palavra').join(' ')
    assert.equal(calculateReadingTime(content), 3)
  })

  it('never returns less than 1', () => {
    assert.equal(calculateReadingTime(''), 1)
    assert.equal(calculateReadingTime('uma'), 1)
  })

  it('ignores collapsed whitespace', () => {
    assert.equal(calculateReadingTime('a   b\n\n c'), 1)
  })
})

describe('extractItalicHook', () => {
  it('strips asterisk markers when the first paragraph is italic', () => {
    const content = '# Title\n\n*Hook em italico.*\n\n## Sub'
    assert.equal(extractItalicHook(content), 'Hook em italico.')
  })

  it('supports multi-line italic hooks', () => {
    const content = '*Linha um\ncontinua aqui.*\n\n## Sub'
    assert.equal(extractItalicHook(content), 'Linha um\ncontinua aqui.')
  })

  it('strips underscore italic markers', () => {
    const content = '_hook sublinhado_\n\n## Sub'
    assert.equal(extractItalicHook(content), 'hook sublinhado')
  })

  it('falls back to first paragraph with emphasis stripped', () => {
    const content = '# Title\n\nTexto com **bold** e *emph* e _under_.'
    assert.equal(extractItalicHook(content), 'Texto com bold e emph e under.')
  })

  it('does not match double asterisks as italic (bold)', () => {
    const content = '**nao e italico**\n\n## Sub'
    assert.equal(extractItalicHook(content), 'nao e italico')
  })

  it('skips heading-only prefixes', () => {
    const content = '## heading\n\n*hook real*'
    assert.equal(extractItalicHook(content), 'hook real')
  })
})

describe('extractFirstImage', () => {
  it('returns src and alt for the first markdown image', () => {
    const content = 'intro\n\n![Alt texto](/img/a.webp)\n\nresto'
    assert.deepEqual(extractFirstImage(content), {
      src: '/img/a.webp',
      alt: 'Alt texto',
    })
  })

  it('falls back to default alt when empty', () => {
    const content = '![](/img/b.png)'
    assert.deepEqual(extractFirstImage(content), {
      src: '/img/b.png',
      alt: 'Imagem do artigo',
    })
  })

  it('returns undefined when no image present', () => {
    assert.equal(extractFirstImage('apenas texto'), undefined)
  })

  it('ignores title attribute suffix', () => {
    const content = '![a](/x.png "titulo")'
    assert.deepEqual(extractFirstImage(content), { src: '/x.png', alt: 'a' })
  })
})

describe('label helpers', () => {
  it('maps TargetAudience enum values', () => {
    assert.equal(getTargetAudienceLabel(TargetAudience.PATIENTS), 'Pacientes')
    assert.equal(getTargetAudienceLabel(TargetAudience.REFERRING_DOCTORS), 'Médicos')
    assert.equal(getTargetAudienceLabel(TargetAudience.GENERAL_PUBLIC), 'Público geral')
  })

  it('maps ContentIntent enum values', () => {
    assert.equal(getContentIntentLabel(ContentIntent.AWARENESS), 'Conscientização')
    assert.equal(getContentIntentLabel(ContentIntent.CONSIDERATION), 'Consideração')
    assert.equal(getContentIntentLabel(ContentIntent.DECISION), 'Decisão')
  })
})

describe('practice locations', () => {
  it('exposes both Curitiba (active) and Campo Grande (planned)', () => {
    const slugs = getAllLocations().map((location) => location.slug)
    assert.deepEqual(slugs, ['curitiba', 'campo-grande'])
  })

  it('keeps Curitiba active with full NAP and indexable', () => {
    const curitiba = getLocationBySlug('curitiba')
    if (!curitiba) throw new Error('curitiba location missing')
    assert.equal(curitiba.status, 'active')
    assert.ok(curitiba.address)
    assert.ok(curitiba.geo)
    assert.equal(isLocationIndexable(curitiba), true)
  })

  it('keeps planned Campo Grande non-indexable with no active NAP', () => {
    const campoGrande = getLocationBySlug('campo-grande')
    if (!campoGrande) throw new Error('campo-grande location missing')
    assert.equal(campoGrande.status, 'planned')
    assert.equal(campoGrande.stateCode, 'MS')
    assert.equal(campoGrande.indexable, false)
    assert.equal(campoGrande.showAppointmentCta, false)
    // No address/geo/phone/maps until the client confirms the real facts.
    assert.equal(campoGrande.address, undefined)
    assert.equal(campoGrande.geo, undefined)
    assert.equal(campoGrande.phone, undefined)
    assert.equal(campoGrande.mapsUrl, undefined)
    assert.equal(isLocationIndexable(campoGrande), false)
  })

  it('getIndexableLocations excludes any planned location', () => {
    const indexable = getIndexableLocations()
    assert.equal(indexable.length, 1)
    assert.equal(indexable[0].slug, 'curitiba')
    assert.ok(indexable.every((location) => location.status === 'active'))
  })

  it('returns null for unknown slug', () => {
    assert.equal(getLocationBySlug('sao-paulo'), null)
  })
})

