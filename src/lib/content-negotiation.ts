// =================================================================
// MARKDOWN CONTENT NEGOTIATION (https://acceptmarkdown.com/)
// =================================================================
// Pure helpers shared by `src/proxy.ts` and the Markdown route handler.
// No filesystem access here: the proxy must stay cheap and side-effect free.
// =================================================================

export const HTML_MEDIA_TYPE = 'text/html'
export const MARKDOWN_MEDIA_TYPE = 'text/markdown'
export const MARKDOWN_CONTENT_TYPE = 'text/markdown; charset=utf-8'

// Every negotiated page can be served as either representation. HTML stays
// first so it remains the default for missing Accept and `*/*`.
const PRODUCES = [HTML_MEDIA_TYPE, MARKDOWN_MEDIA_TYPE] as const
export type ProducedMediaType = (typeof PRODUCES)[number]

// Internal rewrite target for Markdown representations. The proxy forwards the
// original pathname plus a per-build token (inlined from `next.config.ts`), so a
// direct request to the helper is rejected even when it spoofs the path header.
export const MARKDOWN_ROUTE_PREFIX = '/api/markdown'
export const MARKDOWN_PATH_HEADER = 'x-markdown-path'
export const MARKDOWN_TOKEN_HEADER = 'x-markdown-rewrite-token'

export function getMarkdownRewriteToken(): string {
  return process.env.MARKDOWN_REWRITE_TOKEN ?? ''
}

export function isTrustedMarkdownRewrite(headers: Headers): boolean {
  const token = getMarkdownRewriteToken()
  return token.length >= 16 && headers.get(MARKDOWN_TOKEN_HEADER) === token
}

// Only safe, cacheable reads are negotiated. Server Actions (POST with a
// `Next-Action` header and `Accept: text/x-component`) and any other method
// pass straight through so negotiation can never turn them into a 406.
export function isNegotiableRequest(method: string, headers: Headers): boolean {
  if (method !== 'GET' && method !== 'HEAD') return false
  return !headers.has('next-action')
}

// Real routes that only have an HTML (or binary) representation. The proxy
// leaves them untouched instead of rewriting them to a Markdown 404.
export const HTML_ONLY_PATHS = new Set([
  '/politica-privacidade',
  '/design-system',
  '/locais-de-atendimento',
  '/opengraph-image',
])

interface AcceptEntry {
  type: string
  q: number
  specificity: number
  position: number
}

function parseAccept(header: string): AcceptEntry[] {
  return header
    .split(',')
    .map((raw, position) => {
      const [rawType = '', ...params] = raw.split(';').map((part) => part.trim())
      const type = rawType.toLowerCase()
      let q = 1

      for (const param of params) {
        const [name, value] = param.split('=').map((part) => part.trim())
        if (name?.toLowerCase() !== 'q') continue
        const parsed = Number(value)
        if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed))
      }

      const specificity = type === '*/*' ? 0 : type.endsWith('/*') ? 1 : 2
      return { type, q, specificity, position }
    })
    .filter((entry) => entry.type.includes('/'))
}

function matches(entry: AcceptEntry, candidate: string): boolean {
  if (entry.type === '*/*') return true
  if (entry.type.endsWith('/*')) return candidate.startsWith(entry.type.slice(0, -1))
  return entry.type === candidate
}

/**
 * Picks the representation to serve following RFC 9110 §12.5.1:
 * the most specific matching range decides each candidate's q, `q=0` is an
 * explicit rejection, higher q wins and ties go to the client's order.
 * Returns `null` when the client rejects everything we produce (→ 406).
 */
export function negotiateMediaType(acceptHeader: string | null): ProducedMediaType | null {
  if (!acceptHeader?.trim()) return HTML_MEDIA_TYPE

  const entries = parseAccept(acceptHeader)
  if (entries.length === 0) return HTML_MEDIA_TYPE

  let best: { type: ProducedMediaType; q: number; position: number } | null = null

  for (const candidate of PRODUCES) {
    let matched: AcceptEntry | null = null
    for (const entry of entries) {
      if (!matches(entry, candidate)) continue
      if (
        matched === null ||
        entry.specificity > matched.specificity ||
        (entry.specificity === matched.specificity && entry.position < matched.position)
      ) {
        matched = entry
      }
    }

    if (!matched || matched.q <= 0) continue
    if (!best || matched.q > best.q || (matched.q === best.q && matched.position < best.position)) {
      best = { type: candidate, q: matched.q, position: matched.position }
    }
  }

  return best?.type ?? null
}

/** Appends `Accept` to an existing Vary value without duplicating it. */
export function appendVaryAccept(existing: string | null): string {
  if (!existing?.trim()) return 'Accept'
  const tokens = existing.split(',').map((token) => token.trim().toLowerCase())
  if (tokens.includes('accept') || tokens.includes('*')) return existing
  return `${existing}, Accept`
}

export function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.replace(/\/+$/, '') || '/'
  return pathname
}

export function isNegotiablePath(pathname: string): boolean {
  const normalized = normalizePathname(pathname)
  if (HTML_ONLY_PATHS.has(normalized)) return false
  if (normalized.startsWith('/api/') || normalized === '/api') return false
  if (normalized.startsWith('/_next/') || normalized.startsWith('/_vercel/')) return false
  // Static files (robots.txt, llms.txt, sitemap.xml, images) are not pages.
  const lastSegment = normalized.split('/').pop() ?? ''
  return !lastSegment.includes('.')
}
