import { expect, test } from '@playwright/test'
import fs from 'node:fs'
import { getAllPosts } from '../../src/lib/blog'

const catalog = new Map((JSON.parse(fs.readFileSync('docs/blog-image-editorial-review.json', 'utf8')) as Array<{ src: string; alt: string; caption: string }>).map((image) => [image.src, image]))

test('EPSiT card and metadata reuse the existing client illustration (I1)', async ({ page }) => {
  const src = '/assets/blog/cisto-pilonidal-convencional-x-laser-silac.webp'
  await page.goto('/blog')
  const card = page.locator('main article').filter({ has: page.locator('a[href="/blog/cisto-pilonidal-laser-epsit"]') })
  await expect(card.locator('img')).toHaveAttribute('src', new RegExp(encodeURIComponent(src)))
  await card.getByRole('link').click()
  await expect(page).toHaveURL(/\/blog\/cisto-pilonidal-laser-epsit$/)
  await expect(page.locator('article img')).toHaveCount(1)
  await expect(page.locator('article img')).toHaveAttribute('src', new RegExp(encodeURIComponent(src)))
  // Check share/crawler metadata on a full document load, after proving that
  // the card's client navigation also renders the correct body illustration.
  await page.reload()
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1)
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', `https://www.dayarasalomao.com.br${src}`)
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', `https://www.dayarasalomao.com.br${src}`)
  await expect(page.locator('article img')).toHaveCount(1)
  await expect(page.locator('article img')).toHaveAttribute('src', new RegExp(encodeURIComponent(src)))
  await expect(page.locator('[data-editorial-caption]')).toContainText('fibra de laser')
  const retired = await page.request.get('/assets/blog/capa-cisto-pilonidal-laser-epsit.webp')
  expect(retired.status()).toBe(404)
  const sitemap = await (await page.request.get('/sitemap.xml')).text()
  expect(sitemap).not.toContain('/assets/blog/capa-cisto-pilonidal-laser-epsit.webp')
})

test('each article renders all reviewed image descriptions and captions (I2/4)', async ({ page }) => {
  test.setTimeout(180_000)
  let count = 0
  for (const post of getAllPosts()) {
    await page.goto(`/blog/${post.slug}`, { waitUntil: 'domcontentloaded' })
    const figures = page.locator('article > div > p > span:has(> img)')
    const matches = Array.from(post.content.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g), ([, src]) => src)
    await expect(figures).toHaveCount(matches.length)
    for (const [index, src] of matches.entries()) {
      const expected = catalog.get(src)!
      const figure = figures.nth(index)
      await expect(figure.locator('img')).toHaveAttribute('alt', expected.alt)
      await expect(figure.locator('[data-editorial-caption]')).toHaveText(expected.caption)
      await expect(figure).toHaveAttribute('role', 'group')
      await expect(figure).toHaveAttribute('aria-label', `Imagem: ${expected.caption}`)
      count++
    }
  }
  expect(count).toBe(45)
})
