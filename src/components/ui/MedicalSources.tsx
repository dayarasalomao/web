import type { MedicalSource } from '@/lib/blog'

interface MedicalSourcesProps {
  sources: MedicalSource[]
}

const DATE_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
})

function formatDate(value: string): string {
  return DATE_FORMATTER.format(new Date(`${value}T00:00:00Z`))
}

export function MedicalSources({ sources }: MedicalSourcesProps) {
  return (
    <section
      aria-labelledby="medical-sources-title"
      className="mt-14 rounded-[2rem] border border-beige bg-white/95 p-6 shadow-sm lg:p-8"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-copper">
        Transparência editorial
      </p>
      <h2 id="medical-sources-title" className="text-2xl font-semibold text-teal lg:text-3xl">
        Fontes médicas
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
        Referências consultadas para apoiar este conteúdo. Elas não substituem a
        avaliação individual nem representam endosso de uma conduta para todos os casos.
      </p>

      <ol className="mt-6 space-y-4">
        {sources.map((source) => (
          <li key={source.url} className="border-l-2 border-copper/40 pl-4">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold leading-relaxed text-teal underline decoration-teal/25 underline-offset-4 transition-colors hover:text-copper"
            >
              {source.title}
            </a>
            <p className="mt-1 text-sm leading-relaxed text-gray-600">
              {source.organization}
              {source.publishedAt ? ` · Publicado em ${formatDate(source.publishedAt)}` : ''}
              {` · Acessado em ${formatDate(source.accessedAt)}`}
            </p>
          </li>
        ))}
      </ol>
    </section>
  )
}
