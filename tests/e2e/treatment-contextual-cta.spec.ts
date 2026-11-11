import { expect, test } from '@playwright/test'
import { WHATSAPP_URL } from '../../src/constants'

const TREATMENT_PATH = '/tratamentos/hemorroidectomia-laser-co2'
const SHORT_TITLE = 'Laser de CO2 para hemorroidas'

test.describe('treatment page booking path', () => {
  test('mobile shows a labelled WhatsApp CTA beside the summary', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(TREATMENT_PATH)

    const intro = page.locator('[data-conversion="whatsapp-treatment-intro"]')
    await expect(intro).toBeVisible()
    await expect(intro).toHaveText(/Agendar avaliação pelo WhatsApp/)
    await expect(intro).toHaveAttribute('href', WHATSAPP_URL)
    await expect(intro).toHaveAttribute('target', '_blank')
    await expect(intro).toHaveAttribute('rel', /noopener/)

    // It sits inside the article header, so it is reachable before the long
    // main column the sidebar card stacks under on phones.
    const box = await intro.boundingBox()
    expect(box?.y ?? Infinity).toBeLessThan(1600)

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    )
    expect(overflow).toBe(false)
  })

  test('desktop keeps the sidebar card as the only in-content CTA', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto(TREATMENT_PATH)

    await expect(page.locator('[data-conversion="whatsapp-treatment-intro"]')).toBeHidden()

    const sidebar = page.locator('[data-conversion="whatsapp-treatment-page"]')
    await expect(sidebar).toBeVisible()
    await expect(sidebar).toHaveText(/Agendar avaliação pelo WhatsApp/)
    await expect(sidebar).toHaveAttribute('href', WHATSAPP_URL)
    await expect(page.getByText(SHORT_TITLE, { exact: true })).toBeVisible()
  })

  test('every WhatsApp CTA keeps the shared destination and generic message', async ({
    page,
  }) => {
    await page.goto(TREATMENT_PATH)

    const hrefs = await page
      .locator('a[href*="wa.me"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('href')))

    expect(hrefs.length).toBeGreaterThan(0)
    for (const href of hrefs) expect(href).toBe(WHATSAPP_URL)

    // The prefilled text must not name the treatment or a condition.
    const message = new URL(WHATSAPP_URL).searchParams.get('text') ?? ''
    expect(message).not.toMatch(/laser|hemorr|fissura|f[ií]stula|hpv|cisto/i)
  })
})
