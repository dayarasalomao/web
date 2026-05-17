import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export enum TargetAudience {
  PATIENTS = 'patients',
  REFERRING_DOCTORS = 'referring-doctors',
  GENERAL_PUBLIC = 'general-public',
}

export enum ContentIntent {
  AWARENESS = 'awareness',
  CONSIDERATION = 'consideration',
  DECISION = 'decision',
}

const TARGET_AUDIENCE_LABELS: Record<TargetAudience, string> = {
  [TargetAudience.PATIENTS]: 'Pacientes',
  [TargetAudience.REFERRING_DOCTORS]: 'Médicos',
  [TargetAudience.GENERAL_PUBLIC]: 'Público geral',
}

const CONTENT_INTENT_LABELS: Record<ContentIntent, string> = {
  [ContentIntent.AWARENESS]: 'Conscientização',
  [ContentIntent.CONSIDERATION]: 'Consideração',
  [ContentIntent.DECISION]: 'Decisão',
}

export function getTargetAudienceLabel(audience: TargetAudience): string {
  return TARGET_AUDIENCE_LABELS[audience] ?? String(audience)
}

export function getContentIntentLabel(intent: ContentIntent): string {
  return CONTENT_INTENT_LABELS[intent] ?? String(intent)
}

export interface FAQItem {
  question: string
  answer: string
}

export interface BlogCardImage {
  src: string
  alt: string
}

export interface BlogPostMeta {
  title: string
  metaDescription: string
  slug: string
  publishDate: string
  lastModified: string
  primaryKeyword: string
  secondaryKeywords: string[]
  targetAudience: TargetAudience
  intent: ContentIntent
  featured?: boolean
  order?: number
  faqs?: FAQItem[]
}

export interface BlogPost extends BlogPostMeta {
  content: string
  excerpt: string
  readingTime: number
  cardImage?: BlogCardImage
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

const REQUIRED_FIELDS: (keyof BlogPostMeta)[] = [
  'title',
  'metaDescription',
  'slug',
  'publishDate',
  'lastModified',
  'primaryKeyword',
  'secondaryKeywords',
  'targetAudience',
  'intent',
]

const DATE_FALLBACK = new Date().toISOString().slice(0, 10)

export function calculateReadingTime(content: string): number {
  const wordCount = content.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

export function extractItalicHook(content: string): string {
  const paragraphs = content.trim().split('\n\n')
  const firstParagraph =
    paragraphs.find((p) => {
      const trimmed = p.trim()
      return trimmed.length > 0 && !trimmed.startsWith('#')
    }) ?? ''

  const trimmedParagraph = firstParagraph.trim()

  const asteriskItalic = trimmedParagraph.match(/^\*(?!\*)([\s\S]+?)\*$/)
  if (asteriskItalic?.[1]) {
    return asteriskItalic[1].trim()
  }

  const underscoreItalic = trimmedParagraph.match(/^_(?!_)([\s\S]+?)_$/)
  if (underscoreItalic?.[1]) {
    return underscoreItalic[1].trim()
  }

  return trimmedParagraph
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/_(.*?)_/g, '$1')
}

export function extractFirstImage(content: string): BlogCardImage | undefined {
  const markdownImageRegex = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/m
  const match = content.match(markdownImageRegex)
  if (!match) return undefined

  const altText = match[1]?.trim() || 'Imagem do artigo'
  const src = match[2]?.trim().replace(/^<|>$/g, '')
  if (!src) return undefined

  return { src, alt: altText }
}

function parsePostFile(slug: string, fullPath: string): BlogPost | null {
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      throw new Error(`Post "${slug}" is missing required frontmatter field: ${String(field)}`)
    }
  }

  if (data.slug && data.slug !== slug) {
    console.warn(
      `Post "${slug}": frontmatter slug "${data.slug}" does not match filename. Using filename as source of truth.`,
    )
  }

  const normalizedPublishDate = normalizeDate(data.publishDate, slug, 'publishDate')
  const normalizedLastModified = normalizeDate(data.lastModified, slug, 'lastModified')
  const readingTime = calculateReadingTime(content)
  const excerpt = extractItalicHook(content)
  const cardImage = extractFirstImage(content)

  return {
    ...(data as BlogPostMeta),
    slug,
    publishDate: normalizedPublishDate,
    lastModified: normalizedLastModified,
    content,
    excerpt,
    readingTime,
    cardImage,
  }
}

function normalizeDate(value: unknown, slug: string, field: 'publishDate' | 'lastModified'): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10)
  }

  if (typeof value !== 'string') {
    console.warn(`Post "${slug}" has invalid ${field}. Falling back to ${DATE_FALLBACK}.`)
    return DATE_FALLBACK
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    console.warn(`Post "${slug}" has malformed ${field} "${value}". Falling back to ${DATE_FALLBACK}.`)
    return DATE_FALLBACK
  }

  return value
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  return parsePostFile(slug, fullPath)
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return []

  const fileNames = fs.readdirSync(postsDirectory).filter((name) => name.endsWith('.md'))
  const posts: BlogPost[] = []

  for (const fileName of fileNames) {
    const slug = fileName.replace(/\.md$/, '')
    try {
      const post = parsePostFile(slug, path.join(postsDirectory, fileName))
      if (post) posts.push(post)
    } catch (error) {
      console.error(`Skipping invalid post "${slug}":`, error)
    }
  }

  return posts.sort((a, b) => {
    if (a.publishDate !== b.publishDate) {
      return a.publishDate < b.publishDate ? 1 : -1
    }

    if (a.order !== undefined && b.order !== undefined) return a.order - b.order
    if (a.order !== undefined) return -1
    if (b.order !== undefined) return 1
    return a.slug.localeCompare(b.slug)
  })
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return []
  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
}
