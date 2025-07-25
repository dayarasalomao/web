import type { MetadataRoute } from 'next'
import { SITE_URL, SITEMAP_IMAGES } from '@/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: SITEMAP_IMAGES.map((image) => `${SITE_URL}${image}`),
    },
  ]
}