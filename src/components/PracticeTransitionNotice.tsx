import Link from 'next/link'
import { getLocationBySlug } from '@/lib/locations'

export default function PracticeTransitionNotice() {
  const campoGrande = getLocationBySlug('campo-grande')

  if (!campoGrande || campoGrande.status !== 'planned') return null

  return (
    <aside className="border-y border-copper/15 bg-teal px-4 py-5 text-white">
      <div className="container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-straw">
            Próxima etapa
          </p>
          <p className="mt-1 text-sm leading-relaxed sm:text-base">
            Atendimento no Instituto do Aparelho Digestivo, em Campo Grande/MS, previsto
            para começar em 5 de agosto de 2026. O novo contato ainda será confirmado.
          </p>
        </div>
        <Link
          href="/locais-de-atendimento/campo-grande"
          className="inline-flex flex-shrink-0 items-center font-semibold text-straw underline decoration-straw/50 underline-offset-4 transition-colors hover:text-white"
        >
          Acompanhar atualização
        </Link>
      </div>
    </aside>
  )
}
