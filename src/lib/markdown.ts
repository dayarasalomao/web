// =================================================================
// MARKDOWN REPRESENTATIONS FOR AI AGENTS
// =================================================================
// Builds the `text/markdown` variant of each public page from the same data
// the HTML pages render (constants, profile, treatments, FAQ, locations and
// the Markdown blog sources). Nothing here introduces new facts: if a value
// is not already published on the HTML page, it does not belong here.
// =================================================================

import {
  BUSINESS_CLINIC_NAME,
  BUSINESS_FULL_ADDRESS,
  BUSINESS_TELEPHONE_NUMBER,
  CFM_MEDICAL_SEARCH_URL,
  CONTACT_EMAIL,
  CRM_FULL,
  RQE_FULL,
  SEO_DESCRIPTION,
  SEO_DOCTOR_NAME,
  SEO_LOCATION_WITH_STATE,
  SEO_SPECIALTY,
  SITE_URL,
  WHATSAPP_URL,
} from '../constants.ts'
import { getAllPosts, getPostBySlug, type BlogPost } from './blog.ts'
import { FAQ_GROUPS } from './faq.ts'
import { getIndexableLocations, getLocationBySlug, isLocationIndexable } from './locations.ts'
import type { PracticeLocation } from './locations.ts'
import {
  PROFESSIONAL_MEMBERSHIPS,
  PROFESSIONAL_PROFILE,
  PROFESSIONAL_QUALIFICATIONS,
} from './profile.ts'
import { PRIMARY_LOCATION_PATH } from './navigation.ts'
import { buildCanonical } from './seo.ts'
import { getAllTreatments, getTreatmentBySlug, type Treatment } from './treatments.ts'
import { normalizePathname } from './content-negotiation.ts'

export interface MarkdownDocument {
  status: 200 | 404
  body: string
  /** Canonical HTML URL of the same resource (absent for 404s). */
  canonical?: string
}

const SITE_ORIGIN = SITE_URL.replace(/\/$/, '')
const LLMS_TXT_URL = buildCanonical('/llms.txt')
const SITEMAP_URL = buildCanonical('/sitemap.xml')

const MEDICAL_NOTICE =
  '> Conteúdo educativo. Não substitui consulta médica presencial, diagnóstico ou indicação de tratamento.'

function canonicalFor(path: string): string {
  return path === '/' ? SITE_URL : buildCanonical(path)
}

function bulletList(items: readonly string[]): string {
  return items.map((item) => `- ${item}`).join('\n')
}

function contactSection(): string {
  return [
    '## Contato e agendamento',
    '',
    `- Agendamento por WhatsApp: ${WHATSAPP_URL}`,
    `- Telefone geral do ${BUSINESS_CLINIC_NAME}: ${BUSINESS_TELEPHONE_NUMBER}`,
    `- E-mail: ${CONTACT_EMAIL}`,
    `- Endereço: ${BUSINESS_FULL_ADDRESS}`,
    `- Local de atendimento: ${buildCanonical(PRIMARY_LOCATION_PATH)}`,
  ].join('\n')
}

function siteFooter(): string {
  return [
    '---',
    '',
    `${SEO_DOCTOR_NAME} · ${SEO_SPECIALTY} · ${CRM_FULL} · ${RQE_FULL}`,
    '',
    `Mais páginas: [llms.txt](${LLMS_TXT_URL}) · [Sitemap](${SITEMAP_URL})`,
  ].join('\n')
}

function join(...sections: Array<string | false | undefined>): string {
  return `${sections.filter(Boolean).join('\n\n').trim()}\n`
}

// Blog sources use root-relative links and images; agents reading the
// Markdown out of context need absolute URLs to follow them.
export function absolutizeMarkdownUrls(markdown: string): string {
  return markdown.replace(/(\]\()\/(?!\/)/g, `$1${SITE_ORIGIN}/`)
}

function renderHome(): string {
  const treatments = getAllTreatments()
  const posts = getAllPosts().slice(0, 8)

  return join(
    `# ${SEO_DOCTOR_NAME} — ${SEO_SPECIALTY} em ${SEO_LOCATION_WITH_STATE}`,
    SEO_DESCRIPTION,
    MEDICAL_NOTICE,
    [
      '## Sobre a médica',
      '',
      PROFESSIONAL_PROFILE.shortIntroduction,
      '',
      PROFESSIONAL_PROFILE.approach,
      '',
      `- Registro profissional: ${CRM_FULL}, ${RQE_FULL}`,
      `- Atendimento atual: ${BUSINESS_CLINIC_NAME}, ${SEO_LOCATION_WITH_STATE}`,
      `- Perfil completo: ${buildCanonical('/sobre')}`,
    ].join('\n'),
    [
      '## Tratamentos',
      '',
      ...treatments.map(
        (treatment) =>
          `- [${treatment.title}](${buildCanonical(`/tratamentos/${treatment.slug}`)}): ${treatment.summary}`,
      ),
    ].join('\n'),
    [
      '## Artigos recentes',
      '',
      ...posts.map(
        (post) => `- [${post.title}](${buildCanonical(`/blog/${post.slug}`)}): ${post.metaDescription}`,
      ),
      '',
      `Todos os artigos: ${buildCanonical('/blog')}`,
    ].join('\n'),
    contactSection(),
    siteFooter(),
  )
}

function renderAbout(): string {
  return join(
    `# Sobre a ${SEO_DOCTOR_NAME}`,
    PROFESSIONAL_PROFILE.shortIntroduction,
    PROFESSIONAL_PROFILE.approach,
    `> ${PROFESSIONAL_PROFILE.quote}`,
    [
      '## Registros profissionais',
      '',
      `- ${CRM_FULL}`,
      `- ${RQE_FULL}`,
      `- Consulta pública: ${CFM_MEDICAL_SEARCH_URL}`,
    ].join('\n'),
    [
      '## Formação médica e atualização contínua',
      '',
      ...PROFESSIONAL_QUALIFICATIONS.map(
        (item) => `- **${item.title}** — ${item.institution} (${item.year}). ${item.description}.`,
      ),
    ].join('\n'),
    ['## Sociedades médicas', '', bulletList(PROFESSIONAL_MEMBERSHIPS)].join('\n'),
    contactSection(),
    siteFooter(),
  )
}

function renderBlogIndex(): string {
  return join(
    `# Blog — ${SEO_DOCTOR_NAME}`,
    'Artigos educativos para pacientes sobre sintomas, condições e opções de cuidado em coloproctologia.',
    MEDICAL_NOTICE,
    getAllPosts()
      .map(
        (post) =>
          `- [${post.title}](${buildCanonical(`/blog/${post.slug}`)}) (${post.lastModified}): ${post.metaDescription}`,
      )
      .join('\n'),
    siteFooter(),
  )
}

function renderPost(post: BlogPost): string {
  return join(
    `# ${post.title}`,
    [
      `- Autora: ${SEO_DOCTOR_NAME}, ${SEO_SPECIALTY} (${CRM_FULL}, ${RQE_FULL})`,
      `- Publicado em: ${post.publishDate}`,
      `- Atualizado em: ${post.lastModified}`,
      `- URL: ${buildCanonical(`/blog/${post.slug}`)}`,
    ].join('\n'),
    `> ${post.metaDescription}`,
    absolutizeMarkdownUrls(post.content.trim()),
    post.faqs?.length
      ? [
          '## Perguntas frequentes',
          '',
          ...post.faqs.flatMap((faq) => [`### ${faq.question}`, '', faq.answer, '']),
        ]
          .join('\n')
          .trim()
      : false,
    post.sources?.length
      ? [
          '## Fontes médicas',
          '',
          ...post.sources.map(
            (source) =>
              `- [${source.title}](${source.url}) — ${source.organization}${source.publishedAt ? `, ${source.publishedAt}` : ''}`,
          ),
        ].join('\n')
      : false,
    post.disclaimer ? `> ${post.disclaimer}` : MEDICAL_NOTICE,
    contactSection(),
    siteFooter(),
  )
}

function renderTreatmentIndex(): string {
  return join(
    `# Tratamentos — ${SEO_DOCTOR_NAME}`,
    'Tratamentos e tecnologias descritos no site. A indicação de cada um depende de avaliação médica individual.',
    MEDICAL_NOTICE,
    getAllTreatments()
      .map(
        (treatment) =>
          `- [${treatment.title}](${buildCanonical(`/tratamentos/${treatment.slug}`)}): ${treatment.summary}`,
      )
      .join('\n'),
    contactSection(),
    siteFooter(),
  )
}

function renderTreatment(treatment: Treatment): string {
  return join(
    `# ${treatment.title}`,
    treatment.summary,
    MEDICAL_NOTICE,
    treatment.howItWorks?.length
      ? ['## Como funciona', '', treatment.howItWorks.join('\n\n')].join('\n')
      : false,
    ['## Visão geral', '', treatment.overview.join('\n\n')].join('\n'),
    ['## Indicações', '', bulletList(treatment.indications)].join('\n'),
    ['## Benefícios', '', bulletList(treatment.benefits)].join('\n'),
    ['## Acompanhamento', '', treatment.carePath.join('\n\n')].join('\n'),
    treatment.faqs?.length
      ? [
          '## Perguntas frequentes',
          '',
          ...treatment.faqs.flatMap((faq) => [`### ${faq.question}`, '', faq.answer, '']),
        ]
          .join('\n')
          .trim()
      : false,
    contactSection(),
    siteFooter(),
  )
}

function renderFaq(): string {
  return join(
    `# Perguntas frequentes — ${SEO_DOCTOR_NAME}`,
    MEDICAL_NOTICE,
    ...FAQ_GROUPS.map((group) =>
      [
        `## ${group.title}`,
        '',
        group.description,
        '',
        ...group.items.flatMap((item) => [`### ${item.question}`, '', item.answer, '']),
      ]
        .join('\n')
        .trim(),
    ),
    contactSection(),
    siteFooter(),
  )
}

function renderLocation(location: PracticeLocation): string {
  const address = location.address
  return join(
    `# ${SEO_SPECIALTY} em ${location.city} (${location.stateCode}) — ${location.name}`,
    location.roleDescription,
    location.about?.join('\n\n'),
    [
      '## Endereço e contatos',
      '',
      ...[
        address &&
          `- Endereço: ${[address.streetAddress, address.addressDetail, address.neighborhood, `${address.addressLocality} - ${location.stateCode}`, `CEP ${address.postalCode}`].filter(Boolean).join(', ')}`,
        location.openingHours && `- Horário: ${location.openingHours.label}`,
        location.clinicPhone && `- Telefone geral do ${location.name}: ${location.clinicPhone}`,
        location.whatsappUrl && `- Agendamento por WhatsApp: ${location.whatsappUrl}`,
        `- E-mail: ${CONTACT_EMAIL}`,
        location.mapsUrl && `- Mapa: ${location.mapsUrl}`,
      ].filter(Boolean),
    ].join('\n'),
    ['## Condições atendidas', '', bulletList(location.services)].join('\n'),
    location.faqs.length
      ? [
          '## Perguntas frequentes',
          '',
          ...location.faqs.flatMap((faq) => [`### ${faq.question}`, '', faq.answer, '']),
        ]
          .join('\n')
          .trim()
      : false,
    siteFooter(),
  )
}

export function renderNotFoundMarkdown(pathname: string): string {
  return join(
    '# Página não encontrada (404)',
    `O endereço \`${pathname}\` não existe no site da ${SEO_DOCTOR_NAME}. O link pode estar desatualizado ou ter sido digitado incorretamente.`,
    [
      'Para encontrar o conteúdo procurado:',
      '',
      `- [Página inicial](${SITE_URL})`,
      `- [Guia para agentes de IA (llms.txt)](${LLMS_TXT_URL})`,
      `- [Mapa do site (sitemap.xml)](${SITEMAP_URL})`,
      `- [Blog](${buildCanonical('/blog')})`,
      `- [Tratamentos](${buildCanonical('/tratamentos')})`,
    ].join('\n'),
    '_Page not found. See llms.txt or sitemap.xml for the list of available pages._',
  )
}

function render(pathname: string): string | null {
  if (pathname === '/') return renderHome()
  if (pathname === '/sobre') return renderAbout()
  if (pathname === '/blog') return renderBlogIndex()
  if (pathname === '/tratamentos') return renderTreatmentIndex()
  if (pathname === '/perguntas-frequentes') return renderFaq()

  const [, section, slug, ...rest] = pathname.split('/')
  if (!slug || rest.length) return null

  if (section === 'blog') {
    const post = getPostBySlug(slug)
    return post ? renderPost(post) : null
  }
  if (section === 'tratamentos') {
    const treatment = getTreatmentBySlug(slug)
    return treatment ? renderTreatment(treatment) : null
  }
  if (section === 'locais-de-atendimento') {
    const location = getLocationBySlug(slug)
    return location && isLocationIndexable(location) ? renderLocation(location) : null
  }
  return null
}

// Blog slugs map straight to filenames, so reject anything that is not a
// plain slug before it can reach the filesystem.
const SAFE_PATH = /^\/[a-z0-9-]*(\/[a-z0-9-]+)*$/

export function getMarkdownDocument(rawPathname: string): MarkdownDocument {
  const pathname = normalizePathname(rawPathname)
  const body = SAFE_PATH.test(pathname) ? render(pathname) : null

  if (body === null) {
    return { status: 404, body: renderNotFoundMarkdown(pathname) }
  }
  return { status: 200, body, canonical: canonicalFor(pathname) }
}

/** Every path that has a Markdown representation (used by tests). */
export function getMarkdownPaths(): string[] {
  return [
    '/',
    '/sobre',
    '/blog',
    '/tratamentos',
    '/perguntas-frequentes',
    ...getAllPosts().map((post) => `/blog/${post.slug}`),
    ...getAllTreatments().map((treatment) => `/tratamentos/${treatment.slug}`),
    ...getIndexableLocations().map((location) => `/locais-de-atendimento/${location.slug}`),
  ]
}
