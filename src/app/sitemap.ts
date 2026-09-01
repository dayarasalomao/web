import type { MetadataRoute } from 'next'
import { SITE_URL, SITEMAP_IMAGES } from '@/constants'
import { getAllPosts } from '@/lib/blog'
import { getAllTreatments } from '@/lib/treatments'
import { getIndexableLocations } from '@/lib/locations'

const CANONICAL_SITE_URL = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL

function canonicalUrl(path = ''): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${CANONICAL_SITE_URL}${normalizedPath === '/' ? '' : normalizedPath}`
}

function getNewestDate(values: string[]): string | Date {
  return values.sort((a, b) => (a < b ? 1 : -1))[0] ?? new Date()
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const treatments = getAllTreatments()
  const locations = getIndexableLocations()
  const newestPostDate = getNewestDate(posts.map((post) => post.lastModified))
  const newestTreatmentDate = getNewestDate(
    treatments.map((treatment) => treatment.lastUpdated),
  )
  const newestContentDate = getNewestDate([
    ...posts.map((post) => post.lastModified),
    ...treatments.map((treatment) => treatment.lastUpdated),
  ])

  return [
    {
      url: canonicalUrl('/'),
      lastModified: newestContentDate,
      changeFrequency: 'monthly',
      priority: 1,
      images: SITEMAP_IMAGES.map((image) => canonicalUrl(image)),
    },
    {
      url: canonicalUrl('/sobre'),
      lastModified: '2026-08-10',
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: canonicalUrl('/blog'),
      lastModified: newestPostDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: canonicalUrl('/tratamentos'),
      lastModified: newestTreatmentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: canonicalUrl('/perguntas-frequentes'),
      lastModified: '2026-09-01',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // /locais-de-atendimento itself redirects straight to the single
    // confirmed location when there's only one — keep the sitemap
    // pointed at the canonical, non-redirecting URL instead.
    ...(locations.length === 1
      ? []
      : [
          {
            url: canonicalUrl('/locais-de-atendimento'),
            lastModified: getNewestDate(locations.map((location) => location.lastUpdated)),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
          },
        ]),
    ...posts.map((post) => ({
      url: canonicalUrl(`/blog/${post.slug}`),
      lastModified: post.lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...treatments.map((treatment) => ({
      url: canonicalUrl(`/tratamentos/${treatment.slug}`),
      lastModified: treatment.lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...locations.map((location) => ({
      url: canonicalUrl(`/locais-de-atendimento/${location.slug}`),
      lastModified: location.lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
