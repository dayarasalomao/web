import Link from 'next/link'
import {
  BUSINESS_TELEPHONE_HREF,
  BUSINESS_TELEPHONE_NUMBER,
  WHATSAPP_URL,
} from '@/constants'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

interface BookingCardProps {
  title: string
  body: string
  /** Distinguishes this card's conversions from other CTAs on the page. */
  conversionPrefix: string
  className?: string
}

/**
 * Dark booking card, ported from the treatment-detail sidebar in the
 * redesign reference (.design-ref/Tratamento.dc.html).
 *
 * Two changes over the light CTA card it replaces: it contrasts against the
 * cream page instead of blending into it, and it offers the phone as a
 * second route — a patient who will not send a WhatsApp message will
 * sometimes still call.
 */
export function BookingCard({
  title,
  body,
  conversionPrefix,
  className = '',
}: BookingCardProps) {
  return (
    <section
      className={`rounded-[1.5rem] bg-teal p-7 text-cream shadow-[0_20px_36px_-26px_rgba(29,65,76,0.45)] ${className}`}
    >
      <h2 className="font-serif text-2xl leading-tight text-white">{title}</h2>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-cream/75">{body}</p>

      <Link
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-conversion={`whatsapp-${conversionPrefix}`}
        className="btn btn-soft mt-6 w-full"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Agendar pelo WhatsApp
      </Link>

      <a
        href={BUSINESS_TELEPHONE_HREF}
        data-conversion={`phone-${conversionPrefix}`}
        className="btn mt-2.5 w-full border border-white/25 bg-transparent py-3 text-white shadow-none hover:border-white/40 hover:bg-white/10 hover:shadow-none"
      >
        {BUSINESS_TELEPHONE_NUMBER}
      </a>
    </section>
  )
}
