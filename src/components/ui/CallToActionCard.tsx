import type { ReactNode } from 'react'

interface CallToActionCardProps {
  eyebrow?: string
  title: string
  body: ReactNode
  /** Buttons. Laid out as a row on wide screens, stacked on narrow. */
  actions?: ReactNode
  /** Arbitrary content below the body, for panels that are not button-led. */
  children?: ReactNode
  footer?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'teal'
  titleAs?: 'h2' | 'h3'
  className?: string
}

/**
 * The light closing panel: a heading, a line of argument, and somewhere to go.
 *
 * Also absorbs the two homepage blocks that used to hand-roll it — the ones in
 * `Treatments.tsx` and `CV.tsx`, which were the same `card p-8 border-2`
 * markup twice over, differing only in an inline `borderColor` and the copy.
 * That accent border is gone: it was copper in one and teal in the other for
 * no stated reason, and a hairline beige edge is what every other panel on the
 * site uses.
 */
export function CallToActionCard({
  eyebrow,
  title,
  body,
  actions,
  children,
  footer,
  align = 'left',
  tone = 'light',
  titleAs: Title = 'h2',
  className = '',
}: CallToActionCardProps) {
  const centered = align === 'center'
  const dark = tone === 'teal'

  return (
    <div
      className={`rounded-[2rem] border p-8 shadow-sm lg:p-10 ${dark ? 'border-teal bg-teal text-cream' : 'border-beige bg-white/95'} ${centered ? 'text-center' : ''} ${className}`}
    >
      {eyebrow ? (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.16em] ${dark ? 'text-straw' : 'text-copper'}`}
        >
          {eyebrow}
        </p>
      ) : null}
      <Title
        className={`mb-4 text-2xl font-semibold lg:text-3xl ${dark ? 'text-white' : 'text-teal'}`}
      >
        {title}
      </Title>
      <div
        className={`mb-6 text-base leading-relaxed lg:text-lg ${dark ? 'text-cream/75' : 'text-gray-700'} ${centered ? 'mx-auto max-w-2xl' : ''}`}
      >
        {body}
      </div>
      {actions ? (
        <div
          className={`flex flex-col gap-4 sm:flex-row sm:items-center ${centered ? 'sm:justify-center' : ''}`}
        >
          {actions}
        </div>
      ) : null}
      {children}
      {footer ? (
        <div className={`mt-8 border-t pt-6 ${dark ? 'border-white/15' : 'border-beige'}`}>
          {footer}
        </div>
      ) : null}
    </div>
  )
}
