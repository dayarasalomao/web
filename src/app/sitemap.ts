import type { MetadataRoute } from 'next'
import { SITE_URL, SITEMAP_IMAGES } from '@/constants'
import { getAllPosts } from '@/lib/blog'
import { getAllTreatments } from '@/lib/treatments'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const treatments = getAllTreatments()

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: SITEMAP_IMAGES.map((image) => `${SITE_URL}${image.startsWith('/') ? image.slice(1) : image}`),
    },
    {
      url: `${SITE_URL}blog`,
      lastModified: posts[0]?.lastModified || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}tratamentos`,
      lastModified: treatments[0]?.lastUpdated || new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}blog/${post.slug}`,
      lastModified: post.lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...treatments.map((treatment) => ({
      url: `${SITE_URL}tratamentos/${treatment.slug}`,
      lastModified: treatment.lastUpdated,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
