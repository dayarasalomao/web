import { getAllPosts } from './blog.ts'
import { getIndexableLocations } from './locations.ts'
import { STRATEGIC_SEARCH_TARGETS } from './seo-map.ts'
import { getAllTreatments } from './treatments.ts'

export type SeoAuditSeverity = 'error' | 'warning'

export interface SeoAuditIssue {
  severity: SeoAuditSeverity
  code: string
  message: string
}

const STATIC_PATHS = [
  '/',
  '/sobre',
  '/blog',
  '/tratamentos',
  '/perguntas-frequentes',
  '/politica-privacidade',
]

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function normalizedPath(value: string): string {
  const withoutQuery = value.split(/[?#]/, 1)[0]
  return withoutQuery.length > 1 ? withoutQuery.replace(/\/$/, '') : withoutQuery
}

function titleSimilarity(left: string, right: string): number {
  const leftTokens = new Set(normalizeText(left).split(' ').filter((token) => token.length > 2))
  const rightTokens = new Set(normalizeText(right).split(' ').filter((token) => token.length > 2))
  if (!leftTokens.size || !rightTokens.size) return 0

  const intersection = [...leftTokens].filter((token) => rightTokens.has(token)).length
  const union = new Set([...leftTokens, ...rightTokens]).size
  return intersection / union
}

function markdownInternalLinks(content: string): string[] {
  return Array.from(content.matchAll(/(?<!!)\[[^\]]+\]\((\/[^)\s]+)(?:\s+"[^"]*")?\)/g), ([, href]) =>
    normalizedPath(href),
  )
}

export function runSeoContentAudit(): SeoAuditIssue[] {
  const posts = getAllPosts()
  const treatments = getAllTreatments()
  const locations = getIndexableLocations()
  const issues: SeoAuditIssue[] = []

  const knownPaths = new Set([
    ...STATIC_PATHS,
    ...posts.map((post) => `/blog/${post.slug}`),
    ...treatments.map((treatment) => `/tratamentos/${treatment.slug}`),
    ...locations.map((location) => `/locais-de-atendimento/${location.slug}`),
  ])

  const keywordOwners = new Map<string, string[]>()
  for (const post of posts) {
    const keyword = normalizeText(post.primaryKeyword)
    keywordOwners.set(keyword, [...(keywordOwners.get(keyword) ?? []), post.slug])
  }
  for (const [keyword, slugs] of keywordOwners) {
    if (slugs.length > 1) {
      issues.push({
        severity: 'error',
        code: 'duplicate-primary-keyword',
        message: `A palavra-chave "${keyword}" pertence a mais de um artigo: ${slugs.join(', ')}.`,
      })
    }
  }

  for (let left = 0; left < posts.length; left += 1) {
    for (let right = left + 1; right < posts.length; right += 1) {
      const similarity = titleSimilarity(posts[left].title, posts[right].title)
      if (similarity >= 0.72) {
        issues.push({
          severity: 'warning',
          code: 'similar-titles',
          message: `Títulos muito próximos (${Math.round(similarity * 100)}%): ${posts[left].slug} ↔ ${posts[right].slug}.`,
        })
      }
    }
  }

  for (const post of posts) {
    for (const href of markdownInternalLinks(post.content)) {
      if (!knownPaths.has(href)) {
        issues.push({
          severity: 'error',
          code: 'broken-internal-link',
          message: `${post.slug} aponta para uma rota inexistente: ${href}.`,
        })
      }
    }
  }

  const relatedPostInbound = new Map(posts.map((post) => [post.slug, 0]))
  for (const post of posts) {
    for (const relatedSlug of post.relatedPosts ?? []) {
      relatedPostInbound.set(relatedSlug, (relatedPostInbound.get(relatedSlug) ?? 0) + 1)
    }
  }
  for (const treatment of treatments) {
    for (const relatedSlug of treatment.relatedBlogSlugs) {
      relatedPostInbound.set(relatedSlug, (relatedPostInbound.get(relatedSlug) ?? 0) + 1)
    }
  }
  for (const [slug, inbound] of relatedPostInbound) {
    if (inbound === 0) {
      issues.push({
        severity: 'warning',
        code: 'weak-editorial-inbound',
        message: `${slug} aparece no hub /blog, mas não recebe links de artigos ou tratamentos relacionados.`,
      })
    }
  }

  for (const treatment of treatments) {
    if (treatment.relatedBlogSlugs.length === 0) {
      issues.push({
        severity: 'warning',
        code: 'treatment-without-supporting-article',
        message: `${treatment.slug} ainda não possui artigo de apoio relacionado.`,
      })
    }
  }

  for (const target of STRATEGIC_SEARCH_TARGETS) {
    if (!knownPaths.has(target.canonicalPath)) {
      issues.push({
        severity: 'error',
        code: 'broken-strategic-target',
        message: `A busca estratégica "${target.query}" aponta para ${target.canonicalPath}, que não existe.`,
      })
    }
  }

  return issues
}

export function formatSeoAuditReport(issues: SeoAuditIssue[]): string {
  const errors = issues.filter((issue) => issue.severity === 'error')
  const warnings = issues.filter((issue) => issue.severity === 'warning')
  const lines = [
    'Auditoria editorial de SEO',
    `Erros: ${errors.length} · Alertas: ${warnings.length}`,
  ]

  for (const issue of issues) {
    lines.push(`[${issue.severity.toUpperCase()}] ${issue.code}: ${issue.message}`)
  }

  if (issues.length === 0) lines.push('Nenhum problema encontrado.')
  return lines.join('\n')
}
