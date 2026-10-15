import { NextResponse, type NextRequest } from 'next/server'
import {
  MARKDOWN_NEGOTIATED_HEADER,
  MARKDOWN_ROUTE_PREFIX,
  appendVaryAccept,
  isNegotiablePath,
  negotiateMediaType,
  normalizePathname,
} from './lib/content-negotiation'

// Markdown content negotiation (https://acceptmarkdown.com/): the same URL
// serves HTML to browsers and Markdown to agents that ask for it.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (!isNegotiablePath(pathname)) return NextResponse.next()

  // RSC payloads and prefetches belong to the client router, not to agents.
  if (request.headers.has('rsc') || request.headers.has('next-router-prefetch')) {
    return NextResponse.next()
  }

  const accept = request.headers.get('accept')
  const chosen = negotiateMediaType(accept)

  if (chosen === 'text/markdown') {
    const url = request.nextUrl.clone()
    const normalized = normalizePathname(pathname)
    url.pathname = `${MARKDOWN_ROUTE_PREFIX}${normalized === '/' ? '' : normalized}`
    const headers = new Headers(request.headers)
    headers.set(MARKDOWN_NEGOTIATED_HEADER, normalized)
    const response = NextResponse.rewrite(url, { request: { headers } })
    response.headers.set('Vary', appendVaryAccept(response.headers.get('Vary')))
    return response
  }

  if (chosen === null) {
    return new NextResponse(
      'Not Acceptable\n\nThis resource is available as:\n- text/html\n- text/markdown\n',
      {
        status: 406,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store',
          Vary: 'Accept',
        },
      },
    )
  }

  const response = NextResponse.next()
  response.headers.set('Vary', appendVaryAccept(response.headers.get('Vary')))
  return response
}

export const config = {
  matcher: [
    {
      source: '/((?!api/|_next/|_vercel/|.*\\..*).*)',
      missing: [{ type: 'header', key: 'next-router-prefetch' }],
    },
  ],
}
