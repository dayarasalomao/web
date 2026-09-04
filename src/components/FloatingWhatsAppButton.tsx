import Link from 'next/link'
import { WHATSAPP_URL } from '@/constants'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

/**
 * Persistent booking CTA.
 *
 * Ported from the floating pill in the redesign reference: a bare icon asks
 * the visitor to guess what happens on tap, so the label rides along from
 * the `sm` breakpoint up. Below that it stays a circle, where screen width
 * is scarce and the WhatsApp mark is unambiguous on its own.
 */
export default function FloatingWhatsAppButton() {
  return (
    <Link
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar consulta pelo WhatsApp"
      data-conversion="whatsapp-floating"
      className="fixed bottom-4 right-4 z-40 inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-copper px-4 text-cream shadow-[0_16px_30px_-12px_rgba(163,84,66,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-copper-deep hover:shadow-xl sm:bottom-6 sm:right-6 sm:px-6"
    >
      <WhatsAppIcon className="h-6 w-6 shrink-0" />
      <span className="hidden text-[0.95rem] font-semibold sm:inline">
        Agendar consulta
      </span>
    </Link>
  )
}
