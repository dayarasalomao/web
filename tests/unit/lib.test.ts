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

