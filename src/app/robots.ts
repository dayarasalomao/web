import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/_next/static/', '/_next/image/'],
        disallow: ['/api/', '/_next/data/'],
      },
      // Allow AI crawlers to access content for training/responses
      {
        userAgent: [
          'GPTBot', // OpenAI ChatGPT
          'ChatGPT-User', // ChatGPT browsing
          'Claude-Web', // Anthropic Claude
          'PerplexityBot', // Perplexity AI
          'Amazonbot', // Amazon Alexa
          'Google-Extended', // Google Bard/Gemini
        ],
        allow: ['/', '/_next/static/', '/_next/image/'],
        disallow: ['/api/', '/_next/data/'],
      },
    ],
    sitemap: `${SITE_URL}sitemap.xml`,
  }
}
