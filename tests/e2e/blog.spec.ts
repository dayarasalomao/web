import { expect, test } from '@playwright/test'

const CANONICAL_WEBSITE_URL = 'https://www.dayarasalomao.com.br'
const BLOG_POST_SLUG = 'hemorroidectomia-laser-co2'

function getXmlValues(xml: string, tagName: string): string[] {
  const pattern = new RegExp(`<${tagName}>(.*?)</${tagName}>`, 'g')
  return Array.from(xml.matchAll(pattern), ([, value]) => value.trim())
}

test('homepage renders SEO hero heading and CTA', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /coloproctologista.*com foco em tratamentos minimamente invasivos/i,
    }),
  ).toBeVisible()

  await expect(page.getByRole('link', { name: /agendar consulta/i }).first()).toBeVisible()
  await expect(page.locator('header').getByRole('link', { name: /^tratamentos$/i })).toBeVisible()
  await expect(page.locator('header').getByRole('link', { name: /^blog$/i })).toBeVisible()
  await expect(page.locator('header').getByRole('link', { name: /^contato$/i })).toHaveAttribute(
    'href',
    '/#contato',
  )
  await expect(
    page.getByRole('link', { name: /agendar consulta pelo whatsapp/i }),
  ).toBeVisible()

  const lcpImage = page.getByAltText('Retrato profissional da Dra. Dayara Salomão')
  await expect(lcpImage).toHaveAttribute('fetchpriority', 'high')
  await expect(lcpImage).toHaveAttribute('sizes', '(min-width: 1024px) 384px, 344px')
})

test('mobile header keeps the desktop CTA hidden and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')

  await expect(page.locator('header [data-conversion="whatsapp-header"]')).toBeHidden()

  const menuButton = page.locator('button[aria-controls="mobile-navigation"]')
  await menuButton.focus()
  await menuButton.press('Enter')
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('#mobile-navigation')).toBeVisible()

  await page.keyboard.press('Escape')
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('#mobile-navigation')).toHaveCount(0)
  await expect(menuButton).toBeFocused()
})

test('active Campo Grande page emits confirmed NAP, schema, map, and Instituto links', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/locais-de-atendimento/campo-grande')

  await expect(
    page.getByRole('heading', { level: 1, name: /coloproctologista em campo grande/i }),
  ).toBeVisible()
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /^index, follow/,
  )
  await expect(page.locator('a[href="https://wa.me/554135422095"]').first()).toBeVisible()
  await expect(page.getByText('Sala 8').first()).toBeVisible()
  await expect(page.getByText(/telefone geral do instituto: \(67\) 3320-9500/i).first()).toBeVisible()
  await expect(page.getByText(/segunda a sexta, das 9h às 18h/i).first()).toBeVisible()
  await expect(page.getByText(/rua goiás|\(41\) 3123-6550/i)).toHaveCount(0)

  const breadcrumb = page.getByRole('navigation', { name: /breadcrumb/i })
  await expect(
    breadcrumb.getByRole('link', { name: /^locais de atendimento$/i }),
  ).toHaveCount(0)
  await expect(breadcrumb.getByText(/^locais de atendimento$/i)).toBeVisible()
  await expect(breadcrumb.getByText(/^campo grande$/i)).toHaveAttribute(
    'aria-current',
    'page',
  )

  await expect(page.locator('iframe[title*="Mapa"]')).toHaveAttribute(
    'src',
    /google\.com\/maps/,
  )
  await expect(
    page.getByRole('link', { name: /site do instituto/i }),
  ).toHaveAttribute('href', 'https://www.institutodigestivo.com.br/')
  await expect(
    page.getByRole('link', { name: /^instagram$/i }),
  ).toHaveAttribute('href', 'https://www.instagram.com/institutodigestivo/')

  const metadataLengths = await page.evaluate(() => ({
    title: document.title.length,
    description:
      document.querySelector('meta[name="description"]')?.getAttribute('content')?.length ?? 0,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }))
  expect(metadataLengths.title).toBeLessThanOrEqual(60)
  expect(metadataLengths.description).toBeGreaterThanOrEqual(120)
  expect(metadataLengths.description).toBeLessThanOrEqual(160)
  expect(metadataLengths.overflow).toBe(0)

  const pageGraph = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents()
  const activeGraph = pageGraph.find((graph) => graph.includes('#practice-location')) ?? ''
  expect(activeGraph).toContain('MedicalClinic')
  expect(activeGraph).toContain('PostalAddress')
  expect(activeGraph).toContain('GeoCoordinates')
  expect(activeGraph).toContain('institutodigestivo.com.br')
  expect(pageGraph.join(' ')).not.toContain('/coloproctologista/curitiba')
  await expect(page.getByRole('link', { name: /perfil no doctoralia/i })).toHaveCount(0)

  const sitemapResponse = await page.request.get('/sitemap.xml')
  const sitemapText = await sitemapResponse.text()
  expect(sitemapText).toContain(
    `${CANONICAL_WEBSITE_URL}/locais-de-atendimento/campo-grande`,
  )
  expect(sitemapText).not.toContain(`${CANONICAL_WEBSITE_URL}/locais-de-atendimento/curitiba`)
  // Only one confirmed location exists, so the listing route redirects
  // straight there instead of appearing as its own indexable URL.
  const locUrls = getXmlValues(sitemapText, 'loc')
  expect(locUrls).not.toContain(`${CANONICAL_WEBSITE_URL}/locais-de-atendimento`)
})

test('active location uses one content width and exposes clear destination cards', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/locais-de-atendimento/campo-grande')

  const container = page.locator('main > section.container')
  const header = container.locator(':scope > header')
  const map = container.locator(':scope > div').filter({
    has: page.locator('iframe[title*="Mapa"]'),
  })
  const informationGrid = container.locator(':scope > div.grid').first()
  const widths = await Promise.all(
    [header, map, informationGrid].map(async (locator) => {
      const box = await locator.boundingBox()
      return box?.width ?? 0
    }),
  )

  expect(widths[0]).toBeGreaterThan(0)
  expect(Math.abs(widths[0] - widths[1])).toBeLessThanOrEqual(1)
  expect(Math.abs(widths[0] - widths[2])).toBeLessThanOrEqual(1)

  const treatmentCard = page.getByRole('link', {
    name: /hemorroidectomia com laser de co2/i,
  })
  await expect(treatmentCard.getByText(/conhecer tratamento/i)).toBeVisible()

  const readingCard = page.getByRole('link', {
    name: /primeira consulta com coloproctologista/i,
  })
  await expect(readingCard.getByText(/min de leitura/i)).toBeVisible()
  await expect(readingCard.getByText(/ler artigo/i)).toBeVisible()
})

test('the retired Curitiba address is not reachable and locations listing redirects to Campo Grande', async ({
  page,
}) => {
  const curitibaResponse = await page.goto('/locais-de-atendimento/curitiba')
  expect(curitibaResponse?.status()).toBe(404)

  await page.goto('/locais-de-atendimento')
  await expect(page).toHaveURL(/\/locais-de-atendimento\/campo-grande$/)
})

test('localized treatment metadata stays concise and readable', async ({ page }) => {
  await page.goto('/tratamentos/ligadura-elastica-hemorroidas-internas')

  const description = await page.locator('meta[name="description"]').getAttribute('content')
  expect(description).toMatch(/^Ligadura elástica em Campo Grande:/)
  expect(description?.length).toBeGreaterThanOrEqual(120)
  expect(description?.length).toBeLessThanOrEqual(160)
})

test('homepage treatment cards link into canonical treatment pages', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('link', { name: /ver todos os tratamentos/i })).toBeVisible()

  await page
    .getByRole('link', {
      name: /cirurgia de hemorroidas sem corte/i,
    })
    .click()

  await expect(page).toHaveURL(/\/tratamentos\/hemorroidas-sem-corte-laser-diodo$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    /cirurgia de hemorroidas sem corte/i,
  )
})

test('homepage disease cards route to mapped treatment pages', async ({ page }) => {
  await page.goto('/')

  await page
    .locator('#doencas article')
    .filter({ hasText: /fissura anal/i })
    .getByRole('link', { name: /saiba mais/i })
    .click()

  await expect(page).toHaveURL(/\/tratamentos\/toxina-botulinica-fissura-anal$/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    /toxina botulínica para fissura anal/i,
  )
})

test('blog index renders article cards', async ({ page }) => {
  await page.goto('/blog')

  await expect(page.locator('header').getByRole('link', { name: /^início$/i })).toBeVisible()
  await expect(page.locator('header').getByRole('link', { name: /^tratamentos$/i })).toBeVisible()
  await expect(page.locator('header').getByRole('link', { name: /^blog$/i })).toBeVisible()
  await expect(page.locator('header').getByRole('link', { name: /^contato$/i })).toHaveAttribute(
    'href',
    '/#contato',
  )
  await expect(page.getByRole('heading', { level: 1, name: /blog da dra\. dayara salomão/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /hemorroidectomia com laser de co2/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /ver tratamentos/i })).toBeVisible()
  await expect(page.locator('footer').last().getByRole('link', { name: /^tratamentos$/i })).toBeVisible()
})

test('blog post renders body, faq, and CTA', async ({ page }) => {
  await page.goto(`/blog/${BLOG_POST_SLUG}`)

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    /hemorroidectomia com laser de co2/i,
  )
  await expect(page.getByRole('heading', { level: 2, name: /perguntas frequentes/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /agendar consulta/i }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: /ver detalhes do tratamento/i })).toBeVisible()
})

test('question-led article links to its author profile and related cluster', async ({ page }) => {
  await page.goto('/blog/ligadura-elastica-doi-recuperacao-cuidados')

  await expect(page.getByRole('heading', { level: 1 })).toContainText(/ligadura elástica dói/i)
  await expect(page.getByRole('link', { name: /^dra\. dayara salomão$/i }).first()).toHaveAttribute(
    'href',
    '/sobre',
  )
  await expect(
    page.getByRole('heading', { level: 2, name: /continue entendendo o tema/i }),
  ).toBeVisible()
  await expect(
    page.getByRole('link', { name: /doença hemorroidária: sintomas, graus/i }),
  ).toBeVisible()
})

test('about page exposes practitioner credentials, profile schema, and canonical', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/sobre')

  await expect(
    page.getByRole('heading', { level: 1, name: /sobre a dra\. dayara salomão/i }),
  ).toBeVisible()
  await expect(page.getByText('CRM-MS 16556').first()).toBeVisible()
  await expect(page.getByText('RQE 9819').first()).toBeVisible()
  await expect(page.getByRole('link', { name: /consultar crm-ms 16556 no cfm/i })).toHaveAttribute(
    'href',
    'https://portal.cfm.org.br/busca-medicos/',
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    `${CANONICAL_WEBSITE_URL}/sobre`,
  )

  const graph = await page.locator('script[type="application/ld+json"]').allTextContents()
  expect(graph.join(' ')).toContain('ProfilePage')
  expect(graph.join(' ')).toContain(`${CANONICAL_WEBSITE_URL}/#physician`)
  expect(graph.join(' ')).not.toContain('/busca-medicos/profissionais')

  const heroCard = page.locator('article > header')
  const trajectorySection = page.locator('article > section').first()
  const professionalSection = page.locator('article > section').nth(1)
  const widths = await Promise.all(
    [heroCard, trajectorySection, professionalSection].map(async (locator) => {
      const box = await locator.boundingBox()
      return box?.width ?? 0
    }),
  )
  expect(widths[0]).toBeGreaterThan(0)
  expect(Math.abs(widths[0] - widths[1])).toBeLessThanOrEqual(1)
  expect(Math.abs(widths[0] - widths[2])).toBeLessThanOrEqual(1)
})

test('treatments index renders canonical service cards', async ({ page }) => {
  await page.goto('/tratamentos')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: /tratamentos com foco em precisão e conforto/i,
    }),
  ).toBeVisible()
  await expect(page.getByRole('link', { name: /ver detalhes do tratamento/i }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: /ver artigos do blog/i })).toBeVisible()
})

test('privacy page is crawlable for users but noindex for bots', async ({ page }) => {
  await page.goto('/politica-privacidade')

  await expect(page.getByRole('heading', { level: 1, name: /política de privacidade/i })).toBeVisible()
  await expect(page.locator('header').getByRole('link', { name: /^início$/i })).toBeVisible()
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
})

test('treatment detail highlights internal blog content card', async ({ page }) => {
  await page.goto('/tratamentos/hemorroidectomia-laser-co2')

  await expect(page.getByText(/artigo do blog/i).first()).toBeVisible()
  await expect(page.getByRole('link', { name: /ler artigo completo/i }).first()).toBeVisible()
})

test('sitemap and robots expose blog crawl signals', async ({ page }) => {
  const sitemapResponse = await page.request.get('/sitemap.xml')
  expect(sitemapResponse.ok()).toBeTruthy()

  const sitemapXml = await sitemapResponse.text()
  const locs = getXmlValues(sitemapXml, 'loc')
  const blogPostLocs = locs.filter((loc) => loc.startsWith(`${CANONICAL_WEBSITE_URL}/blog/`))
  const treatmentLocs = locs.filter((loc) =>
    loc.startsWith(`${CANONICAL_WEBSITE_URL}/tratamentos/`),
  )

  expect(locs).toContain(`${CANONICAL_WEBSITE_URL}/blog`)
  expect(locs).toContain(`${CANONICAL_WEBSITE_URL}/sobre`)
  expect(locs).toContain(`${CANONICAL_WEBSITE_URL}/tratamentos`)
  expect(blogPostLocs).toContain(`${CANONICAL_WEBSITE_URL}/blog/${BLOG_POST_SLUG}`)
  expect(blogPostLocs).toContain(
    `${CANONICAL_WEBSITE_URL}/blog/constipacao-intestinal-quando-investigar`,
  )
  expect(treatmentLocs).toContain(
    `${CANONICAL_WEBSITE_URL}/tratamentos/hemorroidectomia-laser-co2`,
  )
  expect(treatmentLocs).toContain(
    `${CANONICAL_WEBSITE_URL}/tratamentos/tratamento-constipacao-intestino-preso`,
  )
  expect(locs).not.toContain(`${CANONICAL_WEBSITE_URL}/politica-privacidade`)

  const robotsResponse = await page.request.get('/robots.txt')
  expect(robotsResponse.ok()).toBeTruthy()

  const robotsTxt = await robotsResponse.text()
  expect(robotsTxt).toContain(`Sitemap: ${CANONICAL_WEBSITE_URL}/sitemap.xml`)
})
