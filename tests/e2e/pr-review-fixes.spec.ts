import { test, expect } from '@playwright/test'

const GUIDELINE_URL = 'https://www.ascrsu.com/ascrs/repview?name=3_2851101_PDF&type=784-156'

for (const route of ['/', '/locais-de-atendimento/campo-grande']) {
  test(`rendered physician schema has compatible personal types on ${route} (SCHEMA-01)`, async ({ page }) => {
    await page.goto(route)
    const nodes = await page.locator('script[type="application/ld+json"]').allTextContents()
    const physicians = nodes.flatMap((text) => JSON.parse(text)['@graph'] ?? []).filter((node: Record<string, unknown>) => node['@id'] === 'https://www.dayarasalomao.com.br/#physician')
    expect(physicians.length).toBeGreaterThan(0)
    for (const physician of physicians) {
      expect(physician['@type']).toEqual(['Person', 'Physician'])
      expect(physician.worksFor).toEqual({ '@id': 'https://www.dayarasalomao.com.br/locais-de-atendimento/campo-grande#medical-clinic' })
      expect(physician.workLocation).toEqual(physician.worksFor)
    }
  })
}

for (const slug of ['doenca-hemorroidaria-sintomas-graus', 'ligadura-elastica-hemorroidas-internas', 'ligadura-elastica-doi-recuperacao-cuidados']) {
  test(`updated guideline is visible and matches Article citation on ${slug} (SOURCE-01)`, async ({ page }) => {
    await page.goto(`/blog/${slug}`)
    const bibliography = page.locator('section[aria-labelledby="medical-sources-title"]')
    await expect(bibliography.locator(`a[href="${GUIDELINE_URL}"]`)).toHaveCount(1)
    const nodes = await page.locator('script[type="application/ld+json"]').allTextContents()
    const article = nodes.flatMap((text) => JSON.parse(text)['@graph'] ?? []).find((node: Record<string, unknown>) => node['@type'] === 'Article')
    expect(article.citation.map((citation: { url: string }) => citation.url)).toContain(GUIDELINE_URL)
    expect(JSON.stringify(article.citation)).not.toContain('2024-Hemorrhoids-CPG.pdf')
  })
}
