import Link from 'next/link'
import { WHATSAPP_URL } from '@/constants'

export interface HighlightItem {
  title: string
  description: string
}

interface HighlightCtaProps {
  eyebrow: string
  title: string
  body: string
  ctaLabel: string
  /** Distinguishes this block's conversions from other CTAs on the page. */
  conversionSuffix: string
  items: HighlightItem[]
  className?: string
}

/**
 * Dark two-column conversion block, ported from the homepage mock in
 * .design-ref/.
 *
 * The left half carries the argument, the right half carries the payoff as
 * short translucent rows. It reads as a deliberate pause in the page rather
 * than a button tacked onto the end of a section.
 *
 * The button is straw rather than copper: on a teal surface, straw is the
 * design system's soft button, and copper loses contrast against it.
 */
export function HighlightCta({
  eyebrow,
  title,
  body,
  ctaLabel,
  conversionSuffix,
  items,
  className = '',
}: HighlightCtaProps) {
  return (
    <div
      className={`grid items-center gap-8 rounded-[1.5rem] bg-teal p-8 text-cream lg:grid-cols-2 lg:gap-12 lg:p-12 ${className}`}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-straw">
          {eyebrow}
        </p>
        <h3 className="mt-3 font-serif text-2xl leading-tight text-white lg:text-3xl">
          {title}
        </h3>
        <p className="mt-3.5 leading-relaxed text-cream/75">{body}</p>
        <Link
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-conversion={`whatsapp-${conversionSuffix}`}
          className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-straw px-7 py-3.5 font-semibold text-teal-deep transition-colors duration-200 hover:bg-white"
        >
          {ctaLabel}
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <ul className="flex flex-col gap-3.5">
        {items.map((item) => (
          <li
            key={item.title}
            className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4"
          >
            {/* Centre the dot inside a box the height of the title's line
                rather than nudging it with a magic top margin, so it stays
                put when the title wraps. h-6 is a hair under Montserrat's
                rendered 25.6px line box — sub-pixel, and it avoids pinning
                the layout to one font's metrics while the typeface is
                still undecided. */}
            <span
              aria-hidden="true"
              className="flex h-6 shrink-0 items-center"
            >
              <span className="h-2 w-2 rounded-full bg-straw" />
            </span>
            <div>
              <p className="font-semibold text-white">{item.title}</p>
              <p className="mt-0.5 text-sm text-cream/70">{item.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
