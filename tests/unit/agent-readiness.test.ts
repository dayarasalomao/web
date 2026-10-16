import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import {
  HTML_ONLY_PATHS,
  MARKDOWN_TOKEN_HEADER,
  appendVaryAccept,
  isNegotiablePath,
  isNegotiableRequest,
  isTrustedMarkdownRewrite,
  negotiateMediaType,
} from '../../src/lib/content-negotiation.ts'
import { getMarkdownDocument, getMarkdownPaths } from '../../src/lib/markdown.ts'
import { buildGlobalGraph, buildPracticeLocationId } from '../../src/lib/structured-data.ts'
import { CONTACT_EMAIL, SITE_URL } from '../../src/constants.ts'
import nextConfig from '../../next.config.ts'

describe('Accept negotiation (acceptmarkdown.com test vectors)', () => {
  const vectors: Array<[string | null, string | null]> = [
    ['text/markdown', 'text/markdown'],
    ['text/markdown, text/html;q=0.8', 'text/markdown'],
    ['text/html', 'text/html'],
    ['text/markdown;q=0, text/html', 'text/html'],
    [null, 'text/html'],
    ['', 'text/html'],
    ['*/*', 'text/html'],
    ['text/markdown, text/html, */*', 'text/markdown'],
    ['text/html, text/markdown', 'text/html'],
    ['text/html;q=0.5, text/markdown;q=0.9', 'text/markdown'],
    ['TEXT/MARKDOWN', 'text/markdown'],
    ['text/html;q=0, */*', 'text/markdown'],
    ['text/*', 'text/html'],
    [
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'text/html',
    ],
    ['application/pdf', null],
    ['text/markdown;q=0, text/html;q=0', null],
  ]

  for (const [accept, expected] of vectors) {
    it(`${JSON.stringify(accept)} → ${expected ?? '406'}`, () => {
      assert.equal(negotiateMediaType(accept), expected)
    })
  }

  it('appends Accept to Vary without duplicating it', () => {
    assert.equal(appendVaryAccept(null), 'Accept')
    assert.equal(appendVaryAccept('rsc, next-router-state-tree'), 'rsc, next-router-state-tree, Accept')
    assert.equal(appendVaryAccept('Accept-Encoding, accept'), 'Accept-Encoding, accept')
  })

  it('only negotiates page paths', () => {
    assert.ok(isNegotiablePath('/'))
    assert.ok(isNegotiablePath('/sobre/'))
    assert.ok(isNegotiablePath('/caminho-inexistente'))
    for (const htmlOnly of HTML_ONLY_PATHS) assert.ok(!isNegotiablePath(htmlOnly))
    assert.ok(!isNegotiablePath('/llms.txt'))
    assert.ok(!isNegotiablePath('/_next/static/chunk.js'))
    assert.ok(!isNegotiablePath('/api/markdown'))
  })

  it('never negotiates Server Actions or non-read methods', () => {
    assert.ok(isNegotiableRequest('GET', new Headers()))
    assert.ok(isNegotiableRequest('HEAD', new Headers()))
    assert.ok(!isNegotiableRequest('POST', new Headers({ Accept: 'text/x-component' })))
    assert.ok(!isNegotiableRequest('GET', new Headers({ 'Next-Action': 'abc' })))
    assert.ok(!isNegotiableRequest('OPTIONS', new Headers()))
  })

  it('trusts the Markdown helper only with the per-build rewrite token', () => {
    const previous = process.env.MARKDOWN_REWRITE_TOKEN
    try {
      delete process.env.MARKDOWN_REWRITE_TOKEN
      assert.ok(!isTrustedMarkdownRewrite(new Headers({ [MARKDOWN_TOKEN_HEADER]: '' })))

      process.env.MARKDOWN_REWRITE_TOKEN = 'a'.repeat(48)
      assert.ok(isTrustedMarkdownRewrite(new Headers({ [MARKDOWN_TOKEN_HEADER]: 'a'.repeat(48) })))
      assert.ok(!isTrustedMarkdownRewrite(new Headers({ [MARKDOWN_TOKEN_HEADER]: 'spoofed' })))
      assert.ok(!isTrustedMarkdownRewrite(new Headers()))
    } finally {
      if (previous === undefined) delete process.env.MARKDOWN_REWRITE_TOKEN
      else process.env.MARKDOWN_REWRITE_TOKEN = previous
    }
  })

  it('keeps every HTML-only path backed by a real app route', () => {
    for (const htmlOnly of HTML_ONLY_PATHS) {
      const dir = path.join('src/app', htmlOnly)
      const hasRoute = ['page.tsx', 'route.ts'].some((file) => fs.existsSync(path.join(dir, file)))
      const isMetadataRoute = fs.existsSync(`src/app${htmlOnly}.tsx`)
      assert.ok(hasRoute || isMetadataRoute, `${htmlOnly} has no route`)
    }
  })
})

describe('Markdown representations', () => {
  it('renders a substantive homepage with contact facts', () => {
    const home = getMarkdownDocument('/')
    assert.equal(home.status, 200)
    assert.equal(home.canonical, SITE_URL)
    assert.match(home.body, /^# Dra\. Dayara Salomão/)
    assert.ok(home.body.includes('CRM-MS 16556'))
    assert.ok(home.body.includes(CONTACT_EMAIL))
    assert.ok(home.body.includes('(67) 3320-9500'))
    assert.ok(!/<\/?[a-z][^>]*>/i.test(home.body), 'homepage Markdown must not contain HTML tags')
  })

  it('renders every page listed for Markdown with a canonical URL', () => {
    for (const pagePath of getMarkdownPaths()) {
      const document = getMarkdownDocument(pagePath)
      assert.equal(document.status, 200, pagePath)
      assert.ok(document.body.length > 200, `${pagePath} body is too short`)
      assert.match(document.body, /^# /, `${pagePath} must start with an H1`)
      assert.ok(document.canonical?.startsWith('https://www.dayarasalomao.com.br'))
    }
  })

  it('absolutizes root-relative links and images in blog posts', () => {
    const post = getMarkdownDocument('/blog/cisto-pilonidal-cirurgia-convencional-x-laser')
    assert.equal(post.status, 200)
    assert.ok(!/\]\(\/(?!\/)/.test(post.body), 'no root-relative Markdown links should remain')
    assert.ok(post.body.includes('](https://www.dayarasalomao.com.br/assets/blog/'))
  })

  it('returns a helpful Markdown 404 for unknown and unsafe paths', () => {
    for (const missing of [
      '/__ora-404-probe-1g7sbpt9',
      '/blog/nao-existe',
      '/blog/../../etc/passwd',
      '/tratamentos/x/y',
      '/locais-de-atendimento/curitiba',
    ]) {
      const document = getMarkdownDocument(missing)
      assert.equal(document.status, 404, missing)
      assert.ok(document.body.length >= 20)
      assert.ok(document.body.includes('https://www.dayarasalomao.com.br/llms.txt'))
      assert.ok(document.body.includes('https://www.dayarasalomao.com.br/sitemap.xml'))
      assert.match(document.body, /^# Página não encontrada \(404\)/)
    }
  })
})

describe('Trust anchors, schema and agent instructions', () => {
  it('marks utility resources noindex without touching canonical pages', async () => {
    const rules = (await nextConfig.headers?.()) ?? []
    const robots = new Map(
      rules.flatMap((rule) =>
        rule.headers
          .filter((header) => header.key.toLowerCase() === 'x-robots-tag')
          .map((header) => [rule.source, header.value] as const),
      ),
    )
    // A config rule here would also match rewritten Markdown of canonical URLs.
    assert.ok(![...robots.keys()].some((source) => source.startsWith('/api')))
    assert.equal(robots.get('/design-system'), 'noindex, nofollow')
    assert.equal(robots.get('/politica-privacidade'), 'noindex')
    for (const source of robots.keys()) {
      assert.ok(!getMarkdownPaths().includes(source), `${source} is canonical content`)
      assert.notEqual(source, '/:path*')
    }
    assert.ok(!robots.has('/opengraph-image'), 'social preview images must stay fetchable')
  })

  it('redirects conventional trust-anchor paths to the existing Portuguese pages', async () => {
    const redirects = (await nextConfig.redirects?.()) ?? []
    const bySource = new Map(redirects.map((redirect) => [redirect.source, redirect]))
    const expected = {
      '/about': '/sobre',
      '/contact': '/locais-de-atendimento/campo-grande',
      '/privacy': '/politica-privacidade',
    }
    for (const [source, destination] of Object.entries(expected)) {
      const redirect = bySource.get(source)
      assert.ok(redirect, `${source} redirect missing`)
      assert.equal(redirect.destination, destination)
      assert.equal(redirect.permanent, true)
      assert.ok(fs.existsSync(path.join('src/app', destination === '/locais-de-atendimento/campo-grande' ? 'locais-de-atendimento/[slug]' : destination, 'page.tsx')))
    }
  })

  it('leads the global graph with an Organization that has address and contactPoint', () => {
    const nodes = buildGlobalGraph()['@graph'] as Array<Record<string, unknown>>
    const organization = nodes[0]
    assert.deepEqual(organization['@type'], ['MedicalClinic', 'Organization'])
    assert.equal(organization['@id'], buildPracticeLocationId('campo-grande'))
    // TODO: drop these casts once graph nodes are typed with schema-dts.
    const address = organization.address as Record<string, string>
    assert.equal(address['@type'], 'PostalAddress')
    assert.equal(address.postalCode, '79020-120')
    const contactPoint = organization.contactPoint as Record<string, string>
    assert.equal(contactPoint['@type'], 'ContactPoint')
    assert.equal(contactPoint.telephone, '(67) 3320-9500')
    assert.ok(contactPoint.contactType)

    const physician = nodes.find((node) => node['@id'] === `${SITE_URL}#physician`)
    const physicianContact = physician?.contactPoint as Record<string, string> | undefined
    assert.equal(physicianContact?.email, CONTACT_EMAIL)
    assert.equal(physicianContact?.telephone, '+556721803675')
  })

  it('tells agents when to use the site in llms.txt', () => {
    const llms = fs.readFileSync('public/llms.txt', 'utf8')
    const section = llms.split('## Quando usar este site (When to use)')[1]?.split('\n## ')[0]
    assert.ok(section, 'when-to-use section missing')
    assert.ok(section.includes('Campo Grande'))
    assert.ok(section.includes('Accept: text/markdown'))
    assert.ok(section.includes('Não use este site'))
    for (const [, url] of section.matchAll(/\]\((https:\/\/www\.dayarasalomao\.com\.br[^)]*)\)/g)) {
      const pathname = new URL(url).pathname
      assert.ok(
        pathname === '/' || getMarkdownDocument(pathname).status === 200,
        `${pathname} in llms.txt must resolve`,
      )
    }
  })
})
