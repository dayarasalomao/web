import { expect, test } from '@playwright/test'
import { getPostBySlug } from '../../src/lib/blog'

test('newly illustrated article renders its image and AI disclosure on mobile (F2)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  const post = getPostBySlug('primeira-consulta-coloproctologista-como-se-preparar')!
  await page.goto(`/blog/${post.slug}`)
  const image = page.locator(`article img[src*="${encodeURIComponent(post.image!.src)}"]`)
  await image.scrollIntoViewIfNeeded()
  await expect(image).toBeVisible()
  await expect(image).toHaveAttribute('alt', post.image!.alt)
  await expect(image).toHaveAttribute('width', String(post.image!.width))
  await expect(image).toHaveAttribute('height', String(post.image!.height))
  await expect(page.locator('[data-editorial-caption]')).toHaveText(post.image!.caption!)
  expect(await image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true)
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0)
})

test('distinct cover drives social metadata while original clinical illustrations remain visible (F2/3)', async ({ page }) => {
  const post = getPostBySlug('hemorroidectomia-laser-co2')!
  await page.goto(`/blog/${post.slug}`)
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', `https://www.dayarasalomao.com.br${post.coverImage!.src}`)
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', `https://www.dayarasalomao.com.br${post.coverImage!.src}`)
  const original = page.locator(`article img[src*="${encodeURIComponent(post.image!.src)}"]`)
  await expect(original).toBeVisible()
  await expect(original).toHaveAttribute('alt', post.image!.alt)
  await expect(page.locator('[data-editorial-caption]')).toHaveText(post.image!.caption!)
  const primary = await page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
      .flatMap((script) => JSON.parse(script.textContent ?? '{}')['@graph'] ?? [])
    return nodes.find((node) => node['@type'] === 'Article')?.image
  })
  expect(primary.contentUrl).toBe(`https://www.dayarasalomao.com.br${post.coverImage!.src}`)
})
