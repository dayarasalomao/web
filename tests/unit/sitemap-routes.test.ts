import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import sitemap from '../../src/app/sitemap.ts'
import { SITE_URL } from '../../src/constants.ts'

const APP_DIR = path.resolve('src/app')

/** Page routes that are deliberately kept out of the sitemap, with the reason. */
const EXCLUDED_ROUTES: Record<string, string> = {
  '/design-system': 'internal reference page, noindex',
  '/politica-privacidade': 'legal page, noindex',
  '/locais-de-atendimento': 'redirects to the only location while there is one',
}

function listPageRoutes(dir = APP_DIR): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return entry.name === 'api' ? [] : listPageRoutes(full)
    if (entry.name !== 'page.tsx') return []
    const route = path.relative(APP_DIR, path.dirname(full)).split(path.sep).join('/')
    return [`/${route}`.replace(/\/$/, '') || '/']
  })
}

function toRoutePattern(url: string): string {
  const pathname = new URL(url).pathname.replace(/\/$/, '') || '/'
  const [, first, slug] = pathname.split('/')
  return slug ? `/${first}/[slug]` : pathname
}

describe('sitemap route coverage', () => {
  const pageRoutes = listPageRoutes()
  const sitemapPatterns = new Set(sitemap().map((entry) => toRoutePattern(entry.url)))

  it('lists every public page route or names why it is excluded', () => {
    const missing = pageRoutes.filter(
      (route) => !sitemapPatterns.has(route) && !(route in EXCLUDED_ROUTES),
    )
    assert.deepEqual(missing, [], 'add the route to src/app/sitemap.ts or to EXCLUDED_ROUTES')
  })

  it('keeps excluded routes out of the sitemap', () => {
    for (const route of Object.keys(EXCLUDED_ROUTES)) {
      assert.ok(pageRoutes.includes(route), `${route} no longer exists; drop it from EXCLUDED_ROUTES`)
      assert.ok(!sitemapPatterns.has(route), `${route} is excluded but listed in the sitemap`)
    }
  })

  it('uses canonical, unique, slash-free URLs with valid dates', () => {
    const entries = sitemap()
    const urls = entries.map((entry) => entry.url)
    assert.equal(new Set(urls).size, urls.length)
    for (const entry of entries) {
      assert.ok(entry.url.startsWith(SITE_URL.replace(/\/$/, '')), entry.url)
      assert.ok(!entry.url.endsWith('/'), entry.url)
      assert.ok(!Number.isNaN(new Date(entry.lastModified as string).getTime()), entry.url)
    }
  })
})
