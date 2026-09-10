import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'
import { getTreatmentByRelatedBlogSlug } from '@/lib/treatments'

/**
 * Accent stripe colours, cycled so a grid of cards reads as a set rather
 * than a repetition. Derived from the slug so a given post always gets the
 * same colour, however the list is filtered or ordered.
 */
const ACCENTS = ['bg-copper', 'bg-teal', 'bg-straw'] as const

function accentFor(slug: string): string {
  let sum = 0
  for (const char of slug) sum += char.charCodeAt(0)
  return ACCENTS[sum % ACCENTS.length]
}

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
 * The whole card is clickable, but only the title is the link: the anchor
 * carries a transparent `::after` stretched over the positioned card. If
 * the card itself were the anchor, its accessible name would be every word
 * inside it — category, title, the full excerpt, reading time and "Ler" —
 * read out as one run-on link.
 */
export function BlogCard({ post }: BlogCardProps) {
  const category = categoryFor(post.slug)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.125rem] border border-teal/10 bg-white transition-all duration-200 hover:-translate-y-[3px] hover:border-copper hover:shadow-[0_22px_40px_-28px_rgba(29,65,76,0.5)] focus-within:border-copper">
      <span aria-hidden="true" className={`h-1.5 w-full ${accentFor(post.slug)}`} />

      <div className="flex flex-1 flex-col p-6 lg:p-7">
        {category ? (
          <span className="self-start rounded-full bg-beige-soft px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-copper">
            {category}
          </span>
        ) : null}

        {/* Sans, not the brand serif: Cinzel is an inscriptional all-caps
            face, and a two-line card title set in it stops being
            scannable. The mock uses Newsreader here — a text serif we do
            not ship. Revisit if the font swap is approved. */}
        <h2 className="mt-4 font-sans text-lg font-semibold leading-snug text-teal-deep transition-colors group-hover:text-copper">
          <Link
            href={`/blog/${post.slug}`}
            className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
          >
            {post.title}
          </Link>
        </h2>

        <p className="mt-2.5 flex-1 text-[0.925rem] leading-relaxed text-gray-600">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center gap-3 border-t border-teal/[0.08] pt-4 text-[0.8125rem] font-semibold text-gray-500">
          <span>{post.readingTime} min</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-beige" />
          {/* Visual affordance only — the title above is the actual link,
              so announcing this again is noise. */}
          <span aria-hidden="true" className="text-copper">
            Ler →
          </span>
        </div>
      </div>
    </article>
  )
}
