import { expect, test } from '@playwright/test'
import { getAllPosts } from '../../src/lib/blog'
import { getAllTreatments } from '../../src/lib/treatments'
import { getIndexableLocations } from '../../src/lib/locations'
import { EDITORIAL_IMAGE_DIMENSIONS } from '../../src/lib/editorial-images'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import type { Node, Parent } from 'unist'

const SITE = 'https://www.dayarasalomao.com.br'
const paths = [
  '', '/sobre', '/blog', '/tratamentos', '/perguntas-frequentes',
  ...getAllPosts().map((post) => `/blog/${post.slug}`),
  ...getAllTreatments().map((treatment) => `/tratamentos/${treatment.slug}`),
  ...getIndexableLocations().map((location) => `/locais-de-atendimento/${location.slug}`),
]

function meta(html: string, attribute: 'name' | 'property', value: string) {
  return html.match(new RegExp(`<meta[^>]*${attribute}="${value}"[^>]*content="([^"]+)"`))?.[1]
}

function bodyImageSources(content: string): string[] {
  const sources: string[] = []
  function walk(node: Node) {
    if (node.type === 'image' && 'url' in node) sources.push(String(node.url))
    if ('children' in node) (node as Parent).children.forEach(walk)
  }
  walk(unified().use(remarkParse).parse(content))
  return sources
}

test('sitemap covers every canonical indexable page and each selected blog image (F3/4)', async ({ request }) => {
  test.setTimeout(90_000)
  const response = await request.get('/sitemap.xml')
  expect(response.status()).toBe(200)
  const xml = await response.text()
  const entries = Array.from(xml.matchAll(/<url>([\s\S]*?)<\/url>/g), ([, entry]) => entry)
  const urls = entries.map((entry) => entry.match(/<loc>(.*?)<\/loc>/)![1])
  expect(urls.sort()).toEqual(paths.map((path) => `${SITE}${path}`).sort())
  expect(new Set(urls).size).toBe(urls.length)
  expect(xml).not.toContain(`${SITE}/politica-privacidade`)
  expect(xml).not.toContain(`${SITE}/design-system`)
  expect(xml).not.toContain(`${SITE}/locais-de-atendimento/curitiba`)
  const allBlogImageUrls = Array.from(xml.matchAll(/<image:loc>(.*?)<\/image:loc>/g), ([, url]) => url)
    .filter((url) => url.startsWith(`${SITE}/assets/blog/`))
  expect(Array.from(new Set(allBlogImageUrls)).sort()).toEqual(
    Object.keys(EDITORIAL_IMAGE_DIMENSIONS).map((src) => `${SITE}${src}`).sort(),
  )
  for (const post of getAllPosts()) {
    const entry = entries.find((entry) => entry.includes(`<loc>${SITE}/blog/${post.slug}</loc>`))!
    const listed = Array.from(entry.matchAll(/<image:loc>(.*?)<\/image:loc>/g), ([, url]) => url)
    const expected = Array.from(new Set([post.cardImage!.src, ...bodyImageSources(post.content)]))
    expect(listed).toEqual(expected.map((src) => `${SITE}${src}`))
    const image = await request.get(post.cardImage!.src)
    expect(image.status()).toBe(200)
    expect(image.headers()['content-type']).toMatch(/^image\/webp/)
  }
})

test('llms and robots expose the complete public catalogue and canonical sitemap (F4)', async ({ request }) => {
  const llms = await request.get('/llms.txt')
  const robots = await request.get('/robots.txt')
  expect(llms.status()).toBe(200)
  expect(robots.status()).toBe(200)
  const llmsText = await llms.text()
  for (const path of paths) expect(llmsText).toContain(`${SITE}${path}`)
  expect(llmsText).toContain('ilustrações editoriais')
  expect(await robots.text()).toContain(`Sitemap: ${SITE}/sitemap.xml`)
})

test('all indexable routes return 200 with canonical metadata and coherent article images (F3/4/5)', async ({ request }) => {
  test.setTimeout(90_000)
  const posts = getAllPosts()
  for (const path of paths) {
    const response = await request.get(path || '/')
    expect(response.status(), path || '/').toBe(200)
    const html = await response.text()
    const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1]
    expect(canonical, path || '/').toBe(`${SITE}${path}`)
    expect(meta(html, 'name', 'robots') ?? '').not.toContain('noindex')
    const post = posts.find((post) => path === `/blog/${post.slug}`)
    if (post) {
      expect(meta(html, 'property', 'og:image'), post.slug).toBe(`${SITE}${post.cardImage!.src}`)
      expect(meta(html, 'name', 'twitter:image'), post.slug).toBe(`${SITE}${post.cardImage!.src}`)
      const graph = Array.from(html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g), ([, json]) => JSON.parse(json))
        .flatMap((item) => item['@graph'] ?? [item])
      const articleImage = graph.find((item) => item['@type'] === 'Article')?.image
      expect(typeof articleImage === 'string' ? articleImage : articleImage.contentUrl, post.slug).toBe(`${SITE}${post.cardImage!.src}`)
    }
  }
})
