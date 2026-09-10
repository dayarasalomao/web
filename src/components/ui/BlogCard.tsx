import type { BlogPost } from '@/lib/blog'
import { getTreatmentByRelatedBlogSlug } from '@/lib/treatments'
import { LinkCard } from '@/components/ui/LinkCard'

/**
 * Reads the condition a post is about from the treatment that links to it,
 * so the pill carries real taxonomy instead of a label invented per card.
 * Posts that map to no treatment simply render without a pill.
 */
function categoryFor(slug: string): string | null {
  return getTreatmentByRelatedBlogSlug(slug)?.mappedDiseaseNames[0] ?? null
}

interface BlogCardProps {
  post: BlogPost
}

/**
 * Keeps the blog-specific data mapping while delegating the entire surface to
 * LinkCard. Its stretched title link preserves the card's concise accessible
 * name while the full surface remains clickable.
 */
export function BlogCard({ post }: BlogCardProps) {
  const category = categoryFor(post.slug)

  return (
    <LinkCard
      href={`/blog/${post.slug}`}
      eyebrow={`${category ? `${category} · ` : ''}${post.readingTime} min de leitura`}
      title={post.title}
      titleAs="h2"
      body={post.excerpt}
      ctaLabel="Ler artigo"
    />
  )
}
