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

const SUPPLIED_IMAGES = [
  ['hemorroidectomia-laser-co2', 'laser-co2-instrumento', 1024, 559],
  ['hemorroidas-sem-corte-laser-diodo', 'hemorroidoplastia-laser-diodo', 1024, 844],
  ['ligadura-elastica-hemorroidas-internas', 'ligadura-elastica-etapas', 1024, 572],
  ['hpv-perianal-laser-co2', 'laser-co2-regiao-perianal', 1024, 572],
  ['prurido-anal-causas-cuidados', 'prurido-anal-desconforto', 1024, 559],
  ['fissura-anal-causas-sintomas', 'fissura-anal-anatomia', 1024, 559],
  ['cisto-pilonidal-cirurgia-convencional-x-laser', 'cisto-pilonidal-tecnica-retalho', 1024, 558],
] as const

for (const [slug, name, width, height] of SUPPLIED_IMAGES) {
  test(`supplied image renders at the correct aspect ratio on ${slug} (IMG-01/02)`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`/blog/${slug}`)
    const img = page.locator(`article img[src*="${name}"]`)
    await img.scrollIntoViewIfNeeded()
    await expect(img).toHaveAttribute('width', String(width))
    await expect(img).toHaveAttribute('height', String(height))
    await expect.poll(() => img.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true)
    const ratio = await img.evaluate((element: HTMLImageElement) => element.naturalWidth / element.naturalHeight)
    expect(Math.abs(ratio - width / height)).toBeLessThan(0.01)
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0)
  })
}
