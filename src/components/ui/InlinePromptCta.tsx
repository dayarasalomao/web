import Link from 'next/link'
import { WHATSAPP_URL } from '@/constants'

interface InlinePromptCtaProps {
  title: string
  description: string
  ctaLabel: string
  /**
   * Where the button goes. Defaults to WhatsApp; pass an internal path to
   * send the reader further into the site instead.
   */
  href?: string
  /**
   * Distinguishes this bar's conversions from other CTAs on the page. Only
   * meaningful for off-site destinations — internal navigation is not a
   * conversion, and ConversionTracker ignores it.
   */
  conversionSuffix?: string
  className?: string
}

/**
 * Horizontal "did not find what you need?" bar.
 *
 * Laying it out horizontally is what keeps it from reading as one more card
 * in the grid above, so the border no longer has to do that job. The dashed
 * beige-soft version it replaces read as an unfinished placeholder against
 * the cream section behind it; this uses the same surface as InfoCard —
 * white, beige hairline, copper left accent — so it belongs to the page
 * without competing with the dark HighlightCta in the next section.
 */
export function InlinePromptCta({
  title,
  description,
  ctaLabel,
  href = WHATSAPP_URL,
  conversionSuffix,
  className = '',
}: InlinePromptCtaProps) {
  const isExternal = /^https?:/.test(href)
  // Labelling an internal link `whatsapp-*` would report a conversion
  // placement for a click that never leaves the site.
  const outboundProps = isExternal
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
        ...(conversionSuffix
          ? { 'data-conversion': `whatsapp-${conversionSuffix}` }
          : {}),
      }
    : {}

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-5 rounded-card border border-beige border-l-[3px] border-l-copper bg-white px-7 py-6 shadow-sm ${className}`}
    >
      <div className="text-left">
        <p className="font-semibold text-teal-deep">{title}</p>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
      <Link
        href={href}
        {...outboundProps}
        className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-teal px-6 py-3 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-teal-deep"
      >
        {ctaLabel}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}
