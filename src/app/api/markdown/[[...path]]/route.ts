import {
  MARKDOWN_CONTENT_TYPE,
  MARKDOWN_NEGOTIATED_HEADER,
} from '@/lib/content-negotiation'
import { getMarkdownDocument, renderNotFoundMarkdown } from '@/lib/markdown'

// Reached only through the rewrite in `src/proxy.ts`. The original pathname
// travels in a request header so the handler never trusts its own URL.
export const dynamic = 'force-dynamic'

function markdownResponse(body: string, status: number, extraHeaders: Record<string, string> = {}) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': MARKDOWN_CONTENT_TYPE,
      Vary: 'Accept',
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders,
    },
  })
}

export function GET(request: Request) {
  const pathname = request.headers.get(MARKDOWN_NEGOTIATED_HEADER)
  if (!pathname) {
    return markdownResponse(renderNotFoundMarkdown(new URL(request.url).pathname), 404, {
      'Cache-Control': 'no-store',
    })
  }

  const document = getMarkdownDocument(pathname)
  if (document.status === 404) {
    return markdownResponse(document.body, 404, {
      'Cache-Control': 'public, max-age=0, s-maxage=300',
    })
  }

  return markdownResponse(document.body, 200, {
    'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    // Same URL as the HTML page, which stays the canonical representation.
    // No X-Robots-Tag here: a noindex on this variant would apply to the URL.
    Link: `<${document.canonical}>; rel="canonical"`,
  })
}

export function HEAD(request: Request) {
  const response = GET(request)
  return new Response(null, { status: response.status, headers: response.headers })
}
