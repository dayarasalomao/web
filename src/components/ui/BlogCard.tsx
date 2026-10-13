import type { BlogPost } from '@/lib/blog'
import Image from 'next/image'
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
  priority?: boolean
  sizes?: string
}

/**
 * Keeps the blog-specific data mapping while delegating the entire surface to
 * LinkCard. Its stretched title link preserves the card's concise accessible
 * name while the full surface remains clickable.
 */
export function BlogCard({ post, priority = false, sizes = '(max-width: 768px) 100vw, 50vw' }: BlogCardProps) {
  const category = categoryFor(post.slug)

  return (
    <LinkCard
      href={`/blog/${post.slug}`}
      eyebrow={`${category ? `${category} · ` : ''}${post.readingTime} min de leitura`}
      title={post.title}
      titleAs="h2"
      body={post.excerpt}
      media={
        <div className={`relative aspect-[16/9] w-full shrink-0 overflow-hidden ${post.cardImage ? 'bg-cream' : 'bg-beige/40'}`}>
          <Image
            src={post.cardImage?.src ?? '/core/lettering-blue.png'}
            alt=""
            fill
            sizes={sizes}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            className={`object-contain ${post.cardImage ? '' : 'p-10'}`}
          />
        </div>
      }
      ctaLabel="Ler artigo"
    />
  )
}
