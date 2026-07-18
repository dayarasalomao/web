'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { WHATSAPP_URL } from '@/constants'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

export default function FloatingWhatsAppButton() {
  const pathname = usePathname()

  if (pathname === '/locais-de-atendimento/campo-grande') return null

  return (
    <>
      <div className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-teal p-3 pl-4 text-white shadow-xl sm:hidden">
        <div className="min-w-0">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-straw">
            Agendamento
          </span>
          <span className="block truncate text-sm font-medium">Fale com a equipe</span>
        </div>
        <Link
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Agendar consulta pelo WhatsApp"
          data-conversion="whatsapp-sticky-mobile"
          className="inline-flex h-11 flex-shrink-0 items-center gap-2 rounded-xl bg-green-700 px-4 font-semibold text-white transition-colors hover:bg-green-800"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp
        </Link>
      </div>
      <Link
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Agendar consulta pelo WhatsApp"
        data-conversion="whatsapp-floating-desktop"
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-green-700 text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:shadow-xl sm:inline-flex"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </Link>
    </>
  )
}
