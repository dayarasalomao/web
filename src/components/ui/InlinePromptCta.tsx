import Link from 'next/link'
import { WHATSAPP_URL } from '@/constants'

interface InlinePromptCtaProps {
  title: string
  description: string
  ctaLabel: string
  /** Distinguishes this bar's conversions from other CTAs on the page. */
  conversionSuffix: string
  className?: string
}

/**
 * Horizontal "did not find what you need?" bar, ported from the homepage
 * mock in .design-ref/.
 *
 * The dashed border marks it as a catch-all rather than another item in the
 * list above it, and laying it out horizontally keeps it from reading as one
 * more card in the grid.
 */
export function InlinePromptCta({
  title,
  description,
  ctaLabel,
  conversionSuffix,
  className = '',
}: InlinePromptCtaProps) {
  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-5 rounded-[1.125rem] border border-dashed border-teal/20 bg-beige-soft px-7 py-6 ${className}`}
    >
      <div className="text-left">
        <p className="font-semibold text-teal-deep">{title}</p>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
      <Link
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-conversion={`whatsapp-${conversionSuffix}`}
        className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-teal px-6 py-3 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-teal-deep"
      >
        {ctaLabel}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}
