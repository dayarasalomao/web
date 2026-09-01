import type { NextConfig } from 'next'

const isDevelopment = process.env.NODE_ENV === 'development'

const nextConfig: NextConfig = {
  // `next dev` binds every interface, and Next treats 127.0.0.1 as a different
  // origin from localhost — it then blocks the HMR socket and the client bundle
  // never hydrates, so every interactive element looks silently broken. The e2e
  // suite defaults to 127.0.0.1, so without this a reused dev server fails.
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  images: {
    qualities: [75, 85, 100],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'dayarasalomao.vercel.app',
          },
        ],
        destination: 'https://www.dayarasalomao.com.br/:path*',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              [
                "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
                'https://va.vercel-scripts.com',
                'https://vercel.live',
                'https://www.googletagmanager.com',
                'https://www.google-analytics.com',
                'https://googleads.g.doubleclick.net',
                'https://www.googleadservices.com',
                'https://tagassistant.google.com',
                isDevelopment ? 'https://unpkg.com' : '',
              ].filter(Boolean).join(' '),
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://stats.g.doubleclick.net https://googleads.g.doubleclick.net https://www.googleadservices.com https://www.google.com https://www.google.com.br",
              "font-src 'self' data: https://fonts.gstatic.com",
              [
                "connect-src 'self'",
                'https://vitals.vercel-insights.com',
                'https://www.google-analytics.com',
                'https://www.googletagmanager.com',
                'https://region1.google-analytics.com',
                'https://analytics.google.com',
                'https://stats.g.doubleclick.net',
                'https://ad.doubleclick.net',
                'https://googleads.g.doubleclick.net',
                'https://www.googleadservices.com',
                'https://www.google.com',
                // The dev-only react-grab inspector checks its own version on
                // load; without this it logs a CSP violation on every page.
                isDevelopment ? 'https://www.react-grab.com' : '',
              ].filter(Boolean).join(' '),
              "frame-src 'self' https://www.googletagmanager.com https://www.google.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              'upgrade-insecure-requests',
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
