'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { WHATSAPP_URL } from '@/constants'

export default function FooterAppointmentCta() {
  const pathname = usePathname()

  if (pathname === '/locais-de-atendimento/campo-grande') return null

  return (
    <div className="mt-8">
      <Link
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-conversion="whatsapp-footer"
        className="btn btn-primary text-sm inline-flex items-center gap-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Agendar Consulta
      </Link>
    </div>
  )
}
