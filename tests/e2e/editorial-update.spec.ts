import { test, expect } from '@playwright/test'

const TITLES = [
  ['/', 'Dra. Dayara Salomão | Coloproctologista em Campo Grande (MS)'],
  ['/locais-de-atendimento/campo-grande', 'Coloproctologista em Campo Grande (MS) | Dra. Dayara'],
  ['/sobre', 'Dra. Dayara Salomão: formação e atuação em Campo Grande (MS)'],
  ['/blog', 'Blog de coloproctologia em Campo Grande (MS) | Dra. Dayara'],
  ['/tratamentos', 'Tratamentos de coloproctologia em Campo Grande (MS)'],
  ['/perguntas-frequentes', 'Consulta e tratamentos: dúvidas | Campo Grande (MS)'],
  ['/tratamentos/ligadura-elastica-hemorroidas-internas', 'Ligadura elástica em Campo Grande (MS) | Dra. Dayara'],
  ['/blog/hemorroidectomia-laser-co2', 'Hemorroidectomia com laser de CO2: como funciona'],
] as const

for (const [route, title] of TITLES) {
  test(`search title and social metadata agree on ${route} (SEO-01/02)`, async ({ page }) => {
    await page.goto(route)
    await expect(page).toHaveTitle(title)
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title)
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute('content', title)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://www.dayarasalomao.com.br${route === "/" ? "" : route}`)
    await expect(page.locator('main h1')).toHaveCount(1)
  })
}
