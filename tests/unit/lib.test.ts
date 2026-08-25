import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import type { Thing } from 'schema-dts'
import { buildBreadcrumbGraph, toSchemaDateTime } from '../../src/lib/structured-data.ts'
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
  getLocationsLandingPath,
  getLocationBySlug,
  isLocationIndexable,
} from '../../src/lib/locations.ts'
import {
  FOOTER_QUICK_LINKS,
  HOME_HEADER_NAV_ITEMS,
  SUBPAGE_HEADER_NAV_ITEMS,
} from '../../src/lib/navigation.ts'

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
  it('exposes only Campo Grande — Curitiba was fully retired, not kept historical', () => {
    const slugs = getAllLocations().map((location) => location.slug)
    assert.deepEqual(slugs, ['campo-grande'])
  })

  it('keeps Campo Grande active with full confirmed NAP, links, and indexable', () => {
    const campoGrande = getLocationBySlug('campo-grande')
    if (!campoGrande) throw new Error('campo-grande location missing')
    assert.equal(campoGrande.status, 'active')
    assert.equal(campoGrande.stateCode, 'MS')
    assert.equal(campoGrande.indexable, true)
    assert.equal(campoGrande.showAppointmentCta, true)
    assert.equal(campoGrande.name, 'Instituto do Aparelho Digestivo')
    assert.equal(campoGrande.address?.streetAddress, 'R. Alagoas, 700')
    assert.equal(campoGrande.address?.addressDetail, 'Sala 8')
    assert.equal(campoGrande.address?.postalCode, '79020-120')
    assert.equal(campoGrande.clinicPhone, '(67) 3320-9500')
    assert.equal(campoGrande.whatsappUrl, 'https://wa.me/554135422095')
    assert.deepEqual(campoGrande.openingHours, {
      label: 'Segunda a sexta, das 9h às 18h',
      opens: '09:00',
      closes: '18:00',
      schema: 'Mo-Fr 09:00-18:00',
    })
    // Confirmed coordinates from the clinic's own Google Maps listing.
    assert.deepEqual(campoGrande.geo, {
      latitude: -20.4530096,
      longitude: -54.5956825,
    })
    assert.equal(campoGrande.mapsUrl, 'https://maps.app.goo.gl/c8dqJpaqs1wb8Cnm6')
    assert.equal(campoGrande.websiteUrl, 'https://www.institutodigestivo.com.br/')
    assert.equal(campoGrande.instagramUrl, 'https://www.instagram.com/institutodigestivo/')
    assert.equal(isLocationIndexable(campoGrande), true)
  })

  it('keeps Campo Grande FAQs restricted to confirmed facts', () => {
    const campoGrande = getLocationBySlug('campo-grande')
    if (!campoGrande) throw new Error('campo-grande location missing')
    assert.ok(campoGrande.faqs.length >= 3)
    const faqText = campoGrande.faqs
      .map((faq) => `${faq.question} ${faq.answer}`)
      .join(' ')
    assert.match(faqText, /Sala 8/)
    assert.match(faqText, /\(67\) 3320-9500/)
    assert.match(faqText, /9h às 18h/)
  })

  it('getIndexableLocations returns exactly the one active location', () => {
    const indexable = getIndexableLocations()
    assert.equal(indexable.length, 1)
    assert.equal(indexable[0].slug, 'campo-grande')
    assert.ok(indexable.every((location) => location.status === 'active'))
  })

  it('sends user-facing navigation directly to the only active location', () => {
    const canonicalPath = '/locais-de-atendimento/campo-grande'
    assert.equal(getLocationsLandingPath(), canonicalPath)

    for (const links of [
      HOME_HEADER_NAV_ITEMS,
      SUBPAGE_HEADER_NAV_ITEMS,
      FOOTER_QUICK_LINKS,
    ]) {
      const locationLink = links.find((link) => /locais/i.test(link.label))
      assert.equal(locationLink?.href, canonicalPath)
    }
  })

  it('returns null for unknown slug', () => {
    assert.equal(getLocationBySlug('sao-paulo'), null)
    assert.equal(getLocationBySlug('curitiba'), null)
  })
})

describe('structured data', () => {
  const breadcrumbItems = (graph: Thing) =>
    (graph as unknown as { itemListElement: Array<Record<string, unknown>> }).itemListElement

  it('expands date-only values into full ISO 8601 datetimes', () => {
    assert.equal(toSchemaDateTime('2026-08-10'), '2026-08-10T00:00:00-04:00')
    assert.equal(
      toSchemaDateTime('2026-08-10T09:30:00-04:00'),
      '2026-08-10T09:30:00-04:00',
    )
    assert.equal(toSchemaDateTime(''), '')
  })

  it('drops unlinked intermediate crumbs so every non-final entry has item', () => {
    const items = breadcrumbItems(
      buildBreadcrumbGraph([
        { label: 'Início', href: '/' },
        { label: 'Locais de atendimento' },
        { label: 'Campo Grande' },
      ]),
    )

    assert.deepEqual(
      items.map((item) => item.name),
      ['Início', 'Campo Grande'],
    )
    assert.deepEqual(
      items.map((item) => item.position),
      [1, 2],
    )
    assert.ok(items.slice(0, -1).every((item) => typeof item.item === 'string'))
  })

  it('keeps linked intermediate crumbs and their absolute urls', () => {
    const items = breadcrumbItems(
      buildBreadcrumbGraph([
        { label: 'Início', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Post' },
      ]),
    )

    assert.equal(items.length, 3)
    assert.equal(items[1].item, 'https://www.dayarasalomao.com.br/blog')
    assert.equal(items[2].item, undefined)
  })
})
