import Link from 'next/link'
import { WHATSAPP_URL } from '@/constants'

interface SoftCtaProps {
  eyebrow: string
  title: string
  body: string
  ctaLabel: string
  /** Distinguishes this block's conversions from other CTAs on the page. */
  conversionSuffix: string
  /** Optional second, internal destination rendered as a ghost button. */
  secondary?: { label: string; href: string }
  className?: string
}

/**
 * Muted closing CTA, ported from the blog index in .design-ref/.
 *
 * It sits on the beige soft fill rather than white, so it closes a page of
 * cards without competing with them, and follows the system's section
 * rhythm: eyebrow → heading → one line of intro.
 */
export function SoftCta({
  eyebrow,
  title,
  body,
  ctaLabel,
  conversionSuffix,
  secondary,
  className = '',
}: SoftCtaProps) {
  return (
    <div
      className={`grid items-center gap-6 rounded-[1.5rem] border border-teal/10 bg-beige-soft p-8 lg:grid-cols-2 lg:gap-12 lg:p-14 ${className}`}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-serif text-2xl leading-tight text-teal-deep lg:text-4xl">
          {title}
        </h2>
        <p className="mt-3.5 leading-relaxed text-gray-700">{body}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3 justify-self-start">
        <Link
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-conversion={`whatsapp-${conversionSuffix}`}
          className="inline-flex items-center gap-2.5 rounded-full bg-copper px-8 py-4 font-semibold text-cream transition-colors duration-200 hover:bg-copper-deep"
        >
          {ctaLabel}
          <span aria-hidden="true">→</span>
        </Link>

        {secondary ? (
          <Link
            href={secondary.href}
            className="inline-flex items-center rounded-full border border-teal/20 px-7 py-4 font-semibold text-teal-deep transition-colors duration-200 hover:bg-white"
          >
            {secondary.label}
          </Link>
        ) : null}
      </div>
    </div>
  )
}
