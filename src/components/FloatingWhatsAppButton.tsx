import Link from 'next/link'
import { WHATSAPP_URL } from '@/constants'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

export default function FloatingWhatsAppButton() {
  return (
    <Link
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar consulta pelo WhatsApp"
      data-conversion="whatsapp-floating"
      className="fixed bottom-4 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </Link>
  )
}
