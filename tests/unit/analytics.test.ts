import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { sanitizeDestination } from '../../src/lib/analytics.ts'
import { WHATSAPP_NUMBER, WHATSAPP_URL } from '../../src/constants.ts'

describe('sanitizeDestination', () => {
  it('drops the prefilled WhatsApp message', () => {
    assert.equal(sanitizeDestination(WHATSAPP_URL), `https://wa.me/${WHATSAPP_NUMBER}`)
  })

  it('drops query strings and fragments from any web link', () => {
    assert.equal(
      sanitizeDestination('https://maps.app.goo.gl/abc?utm_source=site&email=x%40y.com#top'),
      'https://maps.app.goo.gl/abc',
    )
  })

  it('keeps the public phone number of a tel: link', () => {
    assert.equal(sanitizeDestination('tel:+556733209500'), 'tel:+556733209500')
  })

  it('never throws on relative or malformed hrefs', () => {
    assert.equal(sanitizeDestination('/contato?nome=fulano'), '/contato')
  })
})
