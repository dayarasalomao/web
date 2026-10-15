import { expect, test, type APIResponse } from '@playwright/test'

// Header-level checks for the Is Agentic / acceptmarkdown.com requirements.
// Run them against a production build too (`next build && next start`, then
// PLAYWRIGHT_BASE_URL=...): Next rewrites `Vary` on HTML page responses, so
// only the final response proves what an agent receives.

function vary(response: APIResponse): string[] {
  return response
    .headersArray()
    .filter(({ name }) => name.toLowerCase() === 'vary')
    .flatMap(({ value }) => value.split(','))
    .map((token) => token.trim().toLowerCase())
}

test('homepage negotiates Markdown with Vary: Accept', async ({ request }) => {
  const markdown = await request.get('/', { headers: { Accept: 'text/markdown' } })
  expect(markdown.status()).toBe(200)
  expect(markdown.headers()['content-type']).toBe('text/markdown; charset=utf-8')
  expect(vary(markdown)).toContain('accept')
  const body = await markdown.text()
  expect(body).toMatch(/^# Dra\. Dayara Salomão/)
  expect(body).not.toContain('<html')

  const html = await request.get('/', { headers: { Accept: 'text/html' } })
  expect(html.status()).toBe(200)
  expect(html.headers()['content-type']).toContain('text/html')
  expect(await html.text()).toContain('<html')
})

test('q-values pick Markdown only when it is preferred', async ({ request }) => {
  const preferred = await request.get('/sobre', {
    headers: { Accept: 'text/html;q=0.5, text/markdown;q=0.9' },
  })
  expect(preferred.headers()['content-type']).toContain('text/markdown')

  const browser = await request.get('/sobre', {
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    },
  })
  expect(browser.headers()['content-type']).toContain('text/html')

  const rejected = await request.get('/sobre', {
    headers: { Accept: 'text/markdown;q=0, text/html' },
  })
  expect(rejected.headers()['content-type']).toContain('text/html')
})

test('unsupported Accept returns 406 with the available types', async ({ request }) => {
  const response = await request.get('/', { headers: { Accept: 'application/pdf' } })
  expect(response.status()).toBe(406)
  expect(vary(response)).toContain('accept')
  expect(await response.text()).toContain('text/markdown')
})

test('missing pages return a Markdown 404 for agents and HTML for browsers', async ({ request }) => {
  const markdown = await request.get('/__ora-404-probe-1g7sbpt9', {
    headers: { Accept: 'text/markdown' },
  })
  expect(markdown.status()).toBe(404)
  expect(markdown.headers()['content-type']).toBe('text/markdown; charset=utf-8')
  expect(vary(markdown)).toContain('accept')
  const body = await markdown.text()
  expect(body.length).toBeGreaterThan(20)
  expect(body).toContain('https://www.dayarasalomao.com.br/llms.txt')

  const html = await request.get('/__ora-404-probe-1g7sbpt9', { headers: { Accept: 'text/html' } })
  expect(html.status()).toBe(404)
  expect(html.headers()['content-type']).toContain('text/html')
})

test('static files and HTML-only routes are not negotiated', async ({ request }) => {
  const llms = await request.get('/llms.txt', { headers: { Accept: 'text/markdown' } })
  expect(llms.status()).toBe(200)
  expect(await llms.text()).toContain('## Quando usar este site (When to use)')

  const privacy = await request.get('/politica-privacidade', { headers: { Accept: 'text/markdown' } })
  expect(privacy.status()).toBe(200)
  expect(privacy.headers()['content-type']).toContain('text/html')

  const internal = await request.get('/api/markdown/sobre')
  expect(internal.status()).toBe(404)
})

test('trust-anchor paths redirect permanently to the existing pages', async ({ request }) => {
  const expected = {
    '/about': '/sobre',
    '/contact': '/locais-de-atendimento/campo-grande',
    '/privacy': '/politica-privacidade',
  }
  for (const [source, destination] of Object.entries(expected)) {
    const response = await request.get(source, { maxRedirects: 0 })
    expect(response.status()).toBe(308)
    expect(new URL(response.headers().location, 'http://localhost').pathname).toBe(destination)

    const followed = await request.get(source)
    expect(followed.status()).toBe(200)
    expect((await followed.text()).length).toBeGreaterThan(500)
  }
})

test('homepage JSON-LD leads with an organization that has address and contactPoint', async ({ request }) => {
  const html = await (await request.get('/')).text()
  const scripts = Array.from(
    html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
    ([, json]) => JSON.parse(json),
  )
  const global = scripts.find((graph) => Array.isArray(graph['@graph']))
  const organization = global['@graph'][0]
  expect(organization['@type']).toContain('Organization')
  expect(organization.address['@type']).toBe('PostalAddress')
  expect(organization.contactPoint['@type']).toBe('ContactPoint')
  expect(organization.contactPoint.contactType).toBeTruthy()
})
