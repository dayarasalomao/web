import Link from 'next/link'
import { ArrowRight, ArrowUpRight, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type Density = 'default' | 'compact'

interface LinkCardProps {
  /**
   * Where the card goes. Omit for a card with no destination — it then drops
   * the arrow badge, the CTA row and the lift, because a surface that cannot
   * be clicked should not advertise that it can.
   */
  href?: string | null
  icon?: LucideIcon
  /** Small uppercase label. May carry metadata: "Artigo · 5 min de leitura". */
  eyebrow?: string
  title: ReactNode
  body?: ReactNode
  /** Supporting metadata between the body and CTA, such as indications. */
  details?: ReactNode
  /** Only rendered when there is an href. */
  ctaLabel?: string
  /** `compact` for dense multi-column grids: tighter padding, smaller type. */
  density?: Density
  /** Minimum height, for grids that need even rows. */
  minHeightClass?: string
  titleAs?: 'h2' | 'h3'
  className?: string
}

const DENSITY = {
  default: {
    padding: 'p-6',
    badge: 'h-9 w-9',
    title: 'text-lg',
    body: 'text-sm',
    cta: 'text-sm',
    titleGap: 'mt-5',
    bodyGap: 'mt-3',
    ctaGap: 'pt-5',
  },
  compact: {
    padding: 'p-4',
    badge: 'h-7 w-7',
    title: 'text-base',
    body: 'text-xs',
    cta: 'text-xs',
    titleGap: 'mt-3',
    bodyGap: 'mt-2',
    ctaGap: 'pt-3',
  },
} as const satisfies Record<Density, Record<string, string>>

/**
 * The list card: a titled destination with an eyebrow, a body and a CTA row.
 *
 * Lifted from the two cards in the Campo Grande location page that were the
 * best-reviewed surfaces on the site — and which were the same forty-line
 * className pasted twice in one file, differing only in icon, label and copy.
 *
 * One thing changed on the way out of that file. There, the whole card was the
 * anchor, which makes its accessible name every word inside it — eyebrow,
 * title, body and CTA read out as one run-on link. Here the title is the
 * anchor and a transparent stretched `::after` covers the card, so the click
 * target is still the whole surface but the name is just the title. That is
 * the pattern `BlogCard.tsx` already used; hover states mirror onto
 * `group-focus-within` so the keyboard sees what the mouse sees.
 */
export function LinkCard({
  href,
  icon: Icon,
  eyebrow,
  title,
  body,
  details,
  ctaLabel,
  density = 'default',
  minHeightClass,
  titleAs: Title = 'h3',
  className = '',
}: LinkCardProps) {
  const isLink = Boolean(href)
  const d = DENSITY[density]
  const minHeight =
    minHeightClass ?? (density === 'default' ? 'min-h-[210px]' : '')

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-card border border-beige bg-white shadow-sm ${d.padding} ${minHeight} ${
        isLink
          ? 'transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-copper/70 hover:shadow-[0_20px_36px_-26px_rgba(29,65,76,0.45)] focus-within:-translate-y-1 focus-within:border-copper/70 focus-within:shadow-[0_20px_36px_-26px_rgba(29,65,76,0.45)] motion-reduce:transform-none motion-reduce:transition-none'
          : ''
      } ${className}`}
    >
      {isLink ? (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-copper transition-transform duration-300 group-hover:scale-x-100 group-focus-within:scale-x-100 motion-reduce:transition-none"
        />
      ) : null}

      {eyebrow || Icon || isLink ? (
        <span
          className={`flex items-center gap-4 ${
            eyebrow || Icon ? 'justify-between' : 'justify-end'
          }`}
        >
          {/* The icon can stand without the label. In a grid where every card
              is the same kind of thing, an eyebrow repeating one word on every
              card carries no information — the icon alone keeps the rhythm. */}
          {eyebrow || Icon ? (
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-copper">
              {Icon ? (
                <span
                  className={`grid ${d.badge} shrink-0 place-items-center rounded-full bg-copper/10`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                </span>
              ) : null}
              {eyebrow}
            </span>
          ) : null}

          {isLink ? (
            <span
              aria-hidden="true"
              className={`grid ${d.badge} shrink-0 place-items-center rounded-full border border-beige text-copper transition-colors duration-300 group-hover:border-copper group-hover:bg-copper group-hover:text-white group-focus-within:border-copper group-focus-within:bg-copper group-focus-within:text-white motion-reduce:transition-none`}
            >
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
            </span>
          ) : null}
        </span>
      ) : null}

      {/* Sans, not the brand serif: Cinzel has no real lowercase and a card
          title that wraps to three lines stops being scannable in it. See the
          decision at /design-system#type. */}
      <Title
        className={`font-sans ${d.title} font-semibold leading-snug text-teal ${eyebrow || Icon || isLink ? d.titleGap : ''}`}
      >
        {isLink ? (
          <Link
            href={href as string}
            className="rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper"
          >
            {title}
          </Link>
        ) : (
          title
        )}
      </Title>

      {body ? (
        <p className={`${d.bodyGap} ${d.body} leading-relaxed text-gray-600`}>
          {body}
        </p>
      ) : null}

      {details ? <div className={`${d.bodyGap} ${d.body} text-gray-600`}>{details}</div> : null}

      {isLink && ctaLabel ? (
        // Visual affordance only — the title above is the real link, so
        // announcing this again is noise.
        <span
          aria-hidden="true"
          className={`mt-auto inline-flex items-center gap-2 ${d.ctaGap} ${d.cta} font-semibold text-copper`}
        >
          {ctaLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none"
            strokeWidth={1.8}
          />
        </span>
      ) : null}
    </article>
  )
}

export type { LinkCardProps }
