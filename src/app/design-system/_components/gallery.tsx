import type { ReactNode } from 'react'

/**
 * Chrome for the /design-system route.
 *
 * These are deliberately plain: neutral greys, monospace labels, hard corners.
 * The gallery furniture must not look like the brand, or you stop being able to
 * tell the specimen from the frame around it.
 *
 * Nothing here may re-implement a site primitive. Specimens are always the real
 * imported component or the real utility class — see .specs/features/
 * design-system-consolidation/spec.md.
 */

interface SectionProps {
  id: string
  title: string
  intro?: ReactNode
  children: ReactNode
}

export function Section({ id, title, intro, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-6 border-t border-gray-200 pt-10">
      <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
        {title}
      </h2>
      {intro ? (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600">{intro}</p>
      ) : null}
      <div className="mt-6">{children}</div>
    </section>
  )
}

interface SpecimenProps {
  /** What this is. Shown above the specimen. */
  label: string
  /** Where it comes from, so a reader knows what to import. */
  source?: string
  /** Anything worth knowing: a count from the audit, a gap, a caveat. */
  note?: ReactNode
  /** Renders the specimen on teal instead of the default cream. */
  ground?: 'cream' | 'teal' | 'white'
  children: ReactNode
}

const GROUND_CLASS: Record<NonNullable<SpecimenProps['ground']>, string> = {
  cream: 'bg-cream',
  teal: 'bg-teal',
  white: 'bg-white',
}

export function Specimen({
  label,
  source,
  note,
  ground = 'cream',
  children,
}: SpecimenProps) {
  return (
    <figure className="min-w-0">
      <figcaption className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="font-mono text-[0.6875rem] font-semibold text-gray-700">
          {label}
        </span>
        {source ? (
          <span className="font-mono text-[0.625rem] text-gray-400">{source}</span>
        ) : null}
      </figcaption>
      <div
        className={`overflow-x-auto rounded border border-gray-200 p-5 ${GROUND_CLASS[ground]}`}
      >
        {children}
      </div>
      {note ? (
        <p className="mt-2 text-xs leading-relaxed text-gray-500">{note}</p>
      ) : null}
    </figure>
  )
}

interface SwatchProps {
  name: string
  /** The Tailwind class, e.g. "bg-copper". Applied directly — no hardcoded hex. */
  className: string
  hex: string
  usage: string
  /** Light text if the swatch is dark. */
  inverted?: boolean
}

export function Swatch({ name, className, hex, usage, inverted }: SwatchProps) {
  return (
    <div className="min-w-0">
      <div
        className={`flex h-20 items-end rounded border border-black/10 p-2.5 ${className}`}
      >
        <span
          className={`font-mono text-[0.625rem] ${inverted ? 'text-white/70' : 'text-black/45'}`}
        >
          {hex}
        </span>
      </div>
      <p className="mt-1.5 font-mono text-[0.6875rem] font-semibold text-gray-700">
        {name}
      </p>
      <p className="text-[0.6875rem] leading-snug text-gray-500">{usage}</p>
    </div>
  )
}

interface GridProps {
  /** Tailwind column classes. Defaults to a responsive 2→4 grid. */
  cols?: string
  children: ReactNode
}

export function Grid({
  cols = 'grid-cols-2 md:grid-cols-4',
  children,
}: GridProps) {
  return <div className={`grid gap-5 ${cols}`}>{children}</div>
}
