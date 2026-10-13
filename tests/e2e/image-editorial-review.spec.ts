import { expect, test } from '@playwright/test'

test('EPSiT card and metadata reuse the existing client illustration (I1)', async ({ page }) => {
  const src = '/assets/blog/cisto-pilonidal-convencional-x-laser-silac.webp'
  await page.goto('/blog')
  const card = page.locator('main article').filter({ has: page.locator('a[href="/blog/cisto-pilonidal-laser-epsit"]') })
  await expect(card.locator('img')).toHaveAttribute('src', new RegExp(encodeURIComponent(src)))
  await card.getByRole('link').click()
  await expect(page).toHaveURL(/\/blog\/cisto-pilonidal-laser-epsit$/)
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
