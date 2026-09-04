import Link from 'next/link'
import {
  BUSINESS_ADDRESS_DETAIL,
  BUSINESS_ADDRESS_LINE,
  BUSINESS_CLINIC_NAME,
} from '@/constants'
import { getLocationsLandingPath } from '@/lib/locations'

interface LocationCardProps {
  className?: string
}

/**
 * "Onde é feito" card, ported from the redesign reference
 * (.design-ref/Tratamento.dc.html).
 *
 * It answers the question a patient reading about a procedure asks next —
 * where does this happen — and it routes them into the Campo Grande page,
 * which is the page that actually ranks for local queries.
 */
export function LocationCard({ className = '' }: LocationCardProps) {
  return (
    <section
      className={`rounded-[1.5rem] border border-beige bg-white p-6 ${className}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-copper">
        Onde é feito
      </p>
      <p className="mt-2.5 font-semibold text-teal-deep">{BUSINESS_CLINIC_NAME}</p>
      <address className="mt-1 text-sm not-italic leading-relaxed text-gray-600">
        {BUSINESS_ADDRESS_LINE}
        <br />
        {BUSINESS_ADDRESS_DETAIL}
      </address>
      <Link
        href={getLocationsLandingPath()}
        className="mt-4 inline-block text-sm font-medium text-copper underline decoration-copper/30 underline-offset-4 transition-colors hover:text-teal"
      >
        Ver como chegar →
      </Link>
    </section>
  )
}
