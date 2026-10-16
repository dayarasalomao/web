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

test('the Markdown helper rejects direct and spoofed requests', async ({ request }) => {
  const attempts: Array<Record<string, string>> = [
    {},
    { 'x-markdown-path': '/sobre' },
    { 'x-markdown-path': '/sobre', 'x-markdown-rewrite-token': 'spoofed-token-value' },
    { 'x-markdown-negotiated': '/sobre' },
  ]
  for (const headers of attempts) {
    const response = await request.get('/api/markdown/sobre', { headers })
    expect(response.status()).toBe(404)
    expect(response.headers()['x-robots-tag']).toBe('noindex')
    expect(await response.text()).not.toContain('# Sobre')
  }
})

test('rewrite internals never leak into Markdown responses', async ({ request }) => {
  const response = await request.get('/sobre', { headers: { Accept: 'text/markdown' } })
  expect(response.status()).toBe(200)
  // Next itself exposes `x-middleware-rewrite` (the internal path, harmless
  // because the helper rejects direct hits); the forwarded request headers
  // and the per-build token must never reach the client.
  const headers = response.headersArray()
  const names = headers.map(({ name }) => name.toLowerCase())
  expect(names.filter((name) => name.startsWith('x-markdown'))).toEqual([])
  expect(names.filter((name) => name.startsWith('x-middleware-request') || name === 'x-middleware-override-headers')).toEqual([])
  expect(headers.some(({ value }) => /^[0-9a-f]{48}$/.test(value))).toBe(false)
  expect(response.headers()['x-robots-tag']).toBeUndefined()
  expect(response.headers().link).toBe('<https://www.dayarasalomao.com.br/sobre>; rel="canonical"')
})

test('HEAD requests negotiate like GET', async ({ request }) => {
  const markdown = await request.head('/', { headers: { Accept: 'text/markdown' } })
  expect(markdown.status()).toBe(200)
  expect(markdown.headers()['content-type']).toBe('text/markdown; charset=utf-8')
  expect(vary(markdown)).toContain('accept')

  const html = await request.head('/', { headers: { Accept: 'text/html' } })
  expect(html.headers()['content-type']).toContain('text/html')
})

test('Server Action, RSC and binary requests bypass negotiation', async ({ request }) => {
  const action = await request.post('/', {
    headers: { Accept: 'text/x-component', 'Next-Action': 'not-a-real-action' },
  })
  expect(action.status()).not.toBe(406)
  expect(action.headers()['content-type'] ?? '').not.toContain('text/markdown')

  const rsc = await request.get('/sobre?_rsc=test', { headers: { RSC: '1', Accept: '*/*' } })
  expect(rsc.status()).toBe(200)
  expect(rsc.headers()['content-type']).toContain('text/x-component')

  const og = await request.get('/opengraph-image', { headers: { Accept: 'text/markdown' } })
  expect(og.status()).toBe(200)
  expect(og.headers()['content-type']).toBe('image/png')
  expect(og.headers()['x-robots-tag']).toBeUndefined()

  const icon = await request.get('/apple-icon.png', { headers: { Accept: 'text/markdown' } })
  expect(icon.headers()['content-type']).toBe('image/png')
})

test('robots signals match the content inventory', async ({ request }) => {
  const indexable = ['/', '/sobre', '/blog', '/tratamentos', '/perguntas-frequentes', '/locais-de-atendimento/campo-grande']
  for (const path of indexable) {
    const response = await request.get(path)
    expect(response.headers()['x-robots-tag'], path).toBeUndefined()
    const html = await response.text()
    expect(html, path).toContain('<meta name="robots" content="index, follow"/>')
    expect(html, path).toContain('<meta name="googlebot" content="index, follow')
  }

  const utility: Array<[string, string, RegExp]> = [
    ['/politica-privacidade', 'noindex', /<meta name="robots" content="noindex, follow"\/>/],
    ['/design-system', 'noindex, nofollow', /<meta name="robots" content="noindex, nofollow"\/>/],
  ]
  for (const [path, header, meta] of utility) {
    const response = await request.get(path)
    expect(response.headers()['x-robots-tag'], path).toBe(header)
    const html = await response.text()
    expect(html, path).toMatch(meta)
    // Page-level robots must replace, not inherit, the global Googlebot rule.
    expect(html, path).not.toContain('<meta name="googlebot" content="index')
    const head = await request.head(path)
    expect(head.headers()['x-robots-tag'], `HEAD ${path}`).toBe(header)
  }

  const sitemap = await (await request.get('/sitemap.xml')).text()
  for (const utilityPath of ['/design-system', '/politica-privacidade', '/opengraph-image', '/api/', '/about', '/contact', '/privacy']) {
    expect(sitemap).not.toContain(`dayarasalomao.com.br${utilityPath}<`)
  }
})

test('optimized article images stay indexable', async ({ request }) => {
  const html = await (await request.get('/blog/cisto-pilonidal-cirurgia-convencional-x-laser')).text()
  const src = html.match(/\/_next\/image\?url=[^"\s]+/)?.[0]?.replace(/&amp;/g, '&')
  expect(src).toBeTruthy()
  const image = await request.get(src!)
  expect(image.status()).toBe(200)
  expect(image.headers()['content-type']).toMatch(/^image\//)
  expect(image.headers()['x-robots-tag']).toBeUndefined()
})

test('a WhatsApp conversion is recorded once, after client navigation, without query data', async ({ page, context }) => {
  // No real providers: block WhatsApp and stub the Vercel Analytics script so
  // events stay in the queue where the test can read them.
  await context.route('**/wa.me/**', (route) => route.abort())
  await page.route('**/_vercel/insights/script.js', (route) =>
    route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }),
  )
  await page.route('**/googletagmanager.com/**', (route) => route.abort())

  await page.goto('/blog?utm_source=teste&email=paciente%40example.com')
  await page.locator('main a[href^="/blog/"]').first().click()
  await page.waitForURL(/\/blog\/[a-z0-9-]+$/)
  await page.locator('[data-conversion="whatsapp-floating"]').click()

  const recorded = await page.evaluate(() => {
    // TODO: drop these casts once the analytics globals are typed.
    const w = window as unknown as { dataLayer?: Array<Record<string, unknown>>; vaq?: unknown[][]; va?: unknown }
    return {
      gtm: (w.dataLayer ?? []).filter((entry) => entry.event === 'whatsapp_click'),
      vercelEnabled: typeof w.va === 'function',
      vercel: (w.vaq ?? []).filter((entry) => entry[0] === 'event'),
      gtmScripts: document.querySelectorAll('script[src*="googletagmanager.com/gtm.js"]').length,
      vercelScripts: document.querySelectorAll('script[src*="/_vercel/insights/script.js"]').length,
    }
  })

  expect(recorded.gtm).toHaveLength(1)
  const event = recorded.gtm[0]
  expect(Object.keys(event).sort()).toEqual(['destination', 'event', 'page_path', 'placement'])
  expect(event.placement).toBe('whatsapp-floating')
  expect(String(event.page_path)).toMatch(/^\/blog\/[a-z0-9-]+$/)
  expect(String(event.destination)).toMatch(/^https:\/\/wa\.me\/556721803675\?text=/)
  expect(JSON.stringify(recorded)).not.toContain('paciente')
  expect(recorded.gtmScripts).toBeLessThanOrEqual(1)
  expect(recorded.vercelScripts).toBeLessThanOrEqual(1)
  if (recorded.vercelEnabled) {
    expect(recorded.vercel).toHaveLength(1)
    expect(JSON.stringify(recorded.vercel[0])).toContain('whatsapp_click')
  }
})
