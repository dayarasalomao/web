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

const NEW_ARTICLES = [
  ['primeiros-30-dias-hemorroidectomia-laser-co2', 'Laser de CO2: os primeiros 30 dias após a cirurgia', 2, 'laser-co2-instrumento'],
  ['pomada-hemorroida-resolve', 'Pomada para hemorroida resolve? Limites e cuidados', 2, 'pomadas-hemorroidas'],
  ['hemorroida-externa-trombosada', 'Hemorroida trombosada: caroço dolorido e tratamento', 1, 'hemorroida-externa-trombosada'],
  ['hemorroida-tem-cura-ou-passa-sozinha', 'Hemorroida tem cura ou passa sozinha?', 2, undefined],
  ['como-encontrar-coloproctologista-campo-grande-ms', 'Como encontrar um coloproctologista em Campo Grande (MS)', 2, undefined],
] as const

for (const [slug, title, sourceCount, imageName] of NEW_ARTICLES) {
  test(`new guide ${slug} renders sources, FAQ and links on mobile (BLOG-01/GRAPH-01)`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    const response = await page.goto(`/blog/${slug}`)
    expect(response?.status()).toBe(200)
    await expect(page).toHaveTitle(title)
    await expect(page.locator('main h1')).toHaveCount(1)
    const sources = page.locator('section[aria-labelledby="medical-sources-title"] li')
    await expect(sources).toHaveCount(sourceCount)
    await expect(page.locator('main a[href="/locais-de-atendimento/campo-grande"]').first()).toBeVisible()
    await expect(page.getByRole('heading', { level: 2, name: 'Perguntas frequentes' })).toBeVisible()
    const facts = await page.evaluate(() => {
      const nodes = Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
        .map((script) => JSON.parse(script.textContent ?? '{}'))
        .flatMap((graph) => graph['@graph'] ?? [graph])
      const article = nodes.find((node) => node['@type'] === 'Article')
      const faq = nodes.find((node) => node['@type'] === 'FAQPage')
      return {
        citations: article?.citation?.map((source: { url: string }) => source.url) ?? [],
        image: article?.image,
        faq: faq?.mainEntity?.map((entry: { name: string; acceptedAnswer: { text: string } }) => ({
          question: entry.name, answer: entry.acceptedAnswer.text,
        })) ?? [],
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      }
    })
    expect(facts.citations).toHaveLength(sourceCount)
    for (const citation of facts.citations) {
      await expect(sources.locator(`a[href="${citation}"]`)).toHaveCount(1)
    }
    expect(facts.faq.length).toBeGreaterThanOrEqual(3)
    for (const faq of facts.faq) {
      const details = page.locator('details').filter({ hasText: faq.question })
      await details.locator('summary').click()
      await expect(details).toContainText(faq.answer)
    }
    expect(facts.overflow).toBe(0)
    if (imageName) {
      const img = page.locator(`article img[src*="${imageName}"]`)
      await img.scrollIntoViewIfNeeded()
      await expect(img).toBeVisible()
      await expect.poll(() => img.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true)
      expect(JSON.stringify(facts.image)).toContain(`/assets/blog/${imageName}.webp`)
    }
    const sitemap = await (await page.request.get('/sitemap.xml')).text()
    expect(sitemap).toContain(`https://www.dayarasalomao.com.br/blog/${slug}`)
    if (imageName) expect(sitemap).toContain(`/assets/blog/${imageName}.webp`)
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

test('local guide is linked from the location and first consultation pages (LOCAL-01)', async ({ page }) => {
  for (const route of ['/locais-de-atendimento/campo-grande', '/blog/primeira-consulta-coloproctologista-como-se-preparar']) {
    await page.goto(route)
    await expect(page.locator('main a[href="/blog/como-encontrar-coloproctologista-campo-grande-ms"]').first()).toBeVisible()
  }
})

for (const width of [320, 390]) {
  test(`local guide heading stays within its column after font loading at ${width}px (QA-01)`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/blog/como-encontrar-coloproctologista-campo-grande-ms')
    await page.evaluate(() => document.fonts.ready)
    const bounds = await page.locator('main h1').evaluate((heading) => {
      const range = document.createRange()
      range.selectNodeContents(heading)
      return {
        textRight: range.getBoundingClientRect().right,
        columnRight: heading.getBoundingClientRect().right,
      }
    })
    expect(bounds.textRight).toBeLessThanOrEqual(bounds.columnRight + 1)
  })
}
