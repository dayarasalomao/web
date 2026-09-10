import type { ReactNode } from 'react'

interface SectionHeaderProps {
  title: ReactNode
  lead?: ReactNode
  /**
   * Renders the redesign's uppercase overline instead of the copper→straw
   * rule. The two are alternatives, never both: an overline and a rule are
   * the same signal spelled twice.
   */
  eyebrow?: string
  align?: 'center' | 'left'
  /** Contact's lead runs a column narrower than the rest. */
  leadWidth?: 'narrow' | 'wide'
  className?: string
}

/**
 * The heading block that opens a homepage section.
 *
 * Six sections carried a byte-identical copy of this markup — Diseases,
 * Treatments, Testimonials, CV, WhenToSeek and Contact — differing only in the
 * heading, the lead, and Contact's narrower lead column. The gradient rule and
 * the teal heading were inline styles in every one of them; here they are
 * Tailwind tokens, so the palette is reachable from the theme.
 *
 * `eyebrow` exists because the site currently opens sections two ways: the
 * centred copper→straw rule on the homepage, and the left-aligned overline on
 * the subpages. Both are rendered at /design-system so the choice can be made
 * by looking. Until it is, this component reproduces each caller exactly.
 */
export function SectionHeader({
  title,
  lead,
  eyebrow,
  align = 'center',
  leadWidth = 'wide',
  className = '',
}: SectionHeaderProps) {
  const centered = align === 'center'

  return (
    <div className={`${centered ? 'text-center' : 'text-left'} mb-16 ${className}`}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-copper">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="mb-6 font-serif text-3xl font-bold text-teal lg:text-5xl">
        {title}
      </h2>

      {eyebrow ? null : (
        <div
          aria-hidden="true"
          className={`mb-6 h-1 w-20 bg-gradient-to-r from-copper to-straw ${centered ? 'mx-auto' : ''}`}
        />
      )}

      {lead ? (
        <p
          className={`text-lg leading-relaxed text-gray-700 lg:text-xl ${leadWidth === 'narrow' ? 'max-w-2xl' : 'max-w-3xl'} ${centered ? 'mx-auto' : ''}`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  )
}
