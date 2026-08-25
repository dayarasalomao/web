import type { Metadata } from 'next'
import {
  SITE_URL,
  SEO_DOCTOR_NAME,
  BUSINESS_NAME,
  BLOG_DEFAULT_OG_IMAGE,
  BLOG_DEFAULT_OG_IMAGE_ALT,
  TWITTER_HANDLE,
  SEO_LOCATION,
} from '../constants.ts'
import type { BlogPost } from './blog.ts'
import type { Treatment } from './treatments.ts'

export function buildCanonical(path: string): string {
  const normalizedBase = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${normalizedBase}${normalizedPath}`
}

export const DEFAULT_ROBOTS: NonNullable<Metadata['robots']> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
}

interface OgOptions {
  title: string
  description: string
  url: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
}

export function buildOgMetadata(opts: OgOptions): NonNullable<Metadata['openGraph']> {
  const image = opts.image ?? BLOG_DEFAULT_OG_IMAGE
  const imageAlt = opts.imageAlt ?? BLOG_DEFAULT_OG_IMAGE_ALT
  return {
    type: opts.type ?? 'website',
    locale: 'pt_BR',
    url: opts.url,
    siteName: BUSINESS_NAME,
    title: opts.title,
    description: opts.description,
    images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
    ...(opts.modifiedTime ? { modifiedTime: opts.modifiedTime } : {}),
    ...(opts.authors ? { authors: opts.authors } : {}),
  }
}

interface TwitterOptions {
  title: string
  description: string
  image?: string
}

export function buildTwitterMetadata(opts: TwitterOptions): NonNullable<Metadata['twitter']> {
  return {
    card: 'summary_large_image',
    title: opts.title,
    description: opts.description,
    images: [opts.image ?? BLOG_DEFAULT_OG_IMAGE],
    creator: TWITTER_HANDLE,
  }
}

export function buildPostMetadata(post: BlogPost): Metadata {
  const url = buildCanonical(`/blog/${post.slug}`)
  const image = post.cardImage?.src ?? BLOG_DEFAULT_OG_IMAGE
  const imageAlt = post.cardImage?.alt ?? `${post.title} — ${SEO_DOCTOR_NAME}`

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
    alternates: { canonical: url },
    openGraph: buildOgMetadata({
      title: post.title,
      description: post.metaDescription,
      url,
      image,
      imageAlt,
      type: 'article',
      publishedTime: post.publishDate,
      modifiedTime: post.lastModified,
      authors: [SEO_DOCTOR_NAME],
    }),
    twitter: buildTwitterMetadata({
      title: post.title,
      description: post.metaDescription,
      image,
    }),
    robots: DEFAULT_ROBOTS,
    other: {
      'article:author': SEO_DOCTOR_NAME,
      'article:publisher': SITE_URL,
      'article:section': 'Coloproctologia',
      'article:tag': post.primaryKeyword,
    },
  }
}

export function buildTreatmentMetadata(treatment: Treatment): Metadata {
  const url = buildCanonical(`/tratamentos/${treatment.slug}`)
  const imageAlt = `${treatment.title} — ${SEO_DOCTOR_NAME}`
  const localizedTitle = `${treatment.shortTitle} em ${SEO_LOCATION} | Dra. Dayara`
  const localizedDescription = `${treatment.shortTitle} em ${SEO_LOCATION}: indicações, como funciona e cuidados. A ${SEO_DOCTOR_NAME} avalia cada caso de forma individual.`
  const localizedKeywords = [
    ...treatment.keywords,
    ...treatment.keywords.map(
      (keyword) => `${keyword} ${SEO_LOCATION.toLocaleLowerCase('pt-BR')}`,
    ),
  ]

  return {
    title: localizedTitle,
    description: localizedDescription,
    keywords: localizedKeywords,
    alternates: { canonical: url },
    openGraph: buildOgMetadata({
      title: localizedTitle,
      description: localizedDescription,
      url,
      image: BLOG_DEFAULT_OG_IMAGE,
      imageAlt,
      type: 'website',
      modifiedTime: treatment.lastUpdated,
    }),
    twitter: buildTwitterMetadata({
      title: localizedTitle,
      description: localizedDescription,
      image: BLOG_DEFAULT_OG_IMAGE,
    }),
    robots: DEFAULT_ROBOTS,
  }
}
