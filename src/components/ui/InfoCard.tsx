import type { ReactNode } from 'react'

type InfoCardElement = 'article' | 'div' | 'section'
type InfoCardPadding = 'compact' | 'default' | 'spacious'
type InfoCardSurface = 'solid' | 'translucent'
type InfoCardAccent = 'copper' | 'teal' | 'danger'

interface InfoCardProps {
  children: ReactNode
  as?: InfoCardElement
  padding?: InfoCardPadding
  surface?: InfoCardSurface
  /** Marks a current or otherwise emphasized fact without making it interactive. */
  accent?: InfoCardAccent
  className?: string
  id?: string
}

const PADDING: Record<InfoCardPadding, string> = {
  compact: 'p-4',
  default: 'p-6',
  spacious: 'p-8',
}

const SURFACE: Record<InfoCardSurface, string> = {
  solid: 'bg-white',
  translucent: 'bg-white/80',
}

const ACCENT: Record<InfoCardAccent, string> = {
  copper: 'border-l-[3px] border-l-copper',
  teal: 'border-l-[3px] border-l-teal',
  danger: 'border-l-[3px] border-l-red-700',
}

/**
 * A quiet, non-interactive information surface.
 *
 * It deliberately has no hover lift, arrow, or focus treatment. Those cues
 * belong to LinkCard and would falsely announce that this content is a target.
 */
export function InfoCard({
  children,
  as: Component = 'div',
  padding = 'default',
  surface = 'solid',
  accent,
  className = '',
  id,
}: InfoCardProps) {
  return (
    <Component
      id={id}
      className={`rounded-card border border-beige ${SURFACE[surface]} ${PADDING[padding]} ${
        accent ? ACCENT[accent] : ''
      } ${className}`}
    >
      {children}
    </Component>
  )
}

export type { InfoCardProps }
