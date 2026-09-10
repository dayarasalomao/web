import { expect, test } from '@playwright/test'

/**
 * The gallery is only useful while it renders the real primitives, so these
 * assertions are about the page staying wired up — not about how it looks.
 *
 * Playwright runs `next dev`, so VERCEL_ENV is undefined here and the route
 * renders. In production it 404s; that gate is not exercisable from this suite.
 */

const SECTIONS = [
  'color',
  'radius',
  'elevation',
  'motion',
  'type',
  'section-header',
  'link-card',
  'info-card',
  'panels',
  'buttons',
]

test('design system route renders every section', async ({ page }) => {
  await page.goto('/design-system')

  await expect(page.getByRole('heading', { level: 1, name: 'Design System' })).toBeVisible()

  for (const id of SECTIONS) {
    await expect(page.locator(`#${id}`)).toBeVisible()
  }
})

test('design system route is marked noindex', async ({ page }) => {
  await page.goto('/design-system')

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/,
  )
})

test('design system route is not linked from site navigation or sitemap', async ({
  page,
  request,
}) => {
  await page.goto('/')
  await expect(page.locator('a[href*="design-system"]')).toHaveCount(0)

  const sitemap = await request.get('/sitemap.xml')
  expect(await sitemap.text()).not.toContain('design-system')
})

test('design system renders real button utilities, not copies', async ({ page }) => {
  await page.goto('/design-system')

  // If someone re-implements these as bespoke markup, the class hooks vanish
  // and this fails — which is the whole contract of the page.
  const primary = page.locator('#buttons .btn.btn-primary').first()
  await expect(primary).toBeVisible()
  await expect(primary).toHaveCSS('border-radius', '9999px')
})
