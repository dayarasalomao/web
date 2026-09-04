import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { BookingCard } from '@/components/ui/BookingCard'
import { LocationCard } from '@/components/ui/LocationCard'
import { CRM_FULL, RQE_FULL, SEO_DOCTOR_NAME } from '@/constants'
import { buildTreatmentMetadata } from '@/lib/seo'
import { buildTreatmentGraph, serializeJsonLd } from '@/lib/structured-data'
import {
  getAllTreatmentSlugs,
  getRelatedPostsForTreatment,
  getTreatmentBySlug,
} from '@/lib/treatments'

interface TreatmentPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getAllTreatmentSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: TreatmentPageProps): Promise<Metadata> {
  const { slug } = await params
  const treatment = getTreatmentBySlug(slug)

  if (!treatment) {
    return {
      title: 'Tratamento não encontrado',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return buildTreatmentMetadata(treatment)
}

export default async function TreatmentPage({ params }: TreatmentPageProps) {
  const { slug } = await params
  const treatment = getTreatmentBySlug(slug)

  if (!treatment) notFound()

  const relatedPosts = getRelatedPostsForTreatment(treatment)

  return (
    <main id="main-content" className="min-h-screen bg-cream py-8 lg:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(buildTreatmentGraph(treatment)),
        }}
      />

      <article className="container">
        <Breadcrumb
          items={[
            { label: 'Início', href: '/' },
            { label: 'Tratamentos', href: '/tratamentos' },
            { label: treatment.title },
          ]}
        />

        <header className="mx-auto mb-12 max-w-4xl border-b border-beige pb-8">
          <div className="mb-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
            <span className="rounded-full border border-copper/20 bg-copper/10 px-3 py-1 text-copper">
              Tratamento especializado
            </span>
            {treatment.mappedDiseaseNames.length ? (
              <span className="rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-teal">
                {treatment.mappedDiseaseNames.join(' • ')}
              </span>
            ) : null}
          </div>

          <h1 className="mb-6 text-4xl font-semibold leading-tight text-teal lg:text-6xl">
            {treatment.title}
          </h1>

          <p className="mb-8 text-lg leading-relaxed text-gray-700 lg:text-xl">
            {treatment.summary}
          </p>

          {/* Authorship and credentials belong on the procedure page itself.
              A reader deciding on surgery should not have to visit /sobre to
              find out who is behind the recommendation. */}
          <div className="flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:items-center sm:gap-6">
            <span>
              Por{' '}
              <Link
                href="/sobre"
                className="font-semibold text-teal underline decoration-teal/30 underline-offset-2 hover:text-copper"
              >
                {SEO_DOCTOR_NAME}
              </Link>
              <span className="ml-2 whitespace-nowrap text-gray-500">
                {CRM_FULL} · {RQE_FULL}
              </span>
            </span>
            <span>
              Última atualização:{' '}
              <time dateTime={treatment.lastUpdated}>
                {new Date(treatment.lastUpdated).toLocaleDateString('pt-BR', {
                  timeZone: 'UTC',
                })}
              </time>
            </span>
          </div>
        </header>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <div className="space-y-6">
            <section className="rounded-[2rem] border border-beige bg-white/95 p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold text-teal">
                Quando esse tratamento pode ser considerado
              </h2>
              <ul className="space-y-3 pl-5 text-base leading-relaxed text-gray-700">
                {treatment.indications.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {treatment.faqs?.length ? (
              <section className="rounded-[2rem] border border-beige bg-white/95 p-6 shadow-sm">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-copper">
                  Dúvidas frequentes
                </p>
                <h2 className="mb-5 text-2xl font-semibold text-teal">
                  Perguntas sobre {treatment.shortTitle.toLocaleLowerCase('pt-BR')}
                </h2>
                <div className="divide-y divide-beige/70 border-y border-beige/70">
                  {treatment.faqs.map((faq) => (
                    <details key={faq.question} className="group py-1">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-teal [&::-webkit-details-marker]:hidden">
                        <span>{faq.question}</span>
                        <span
                          aria-hidden="true"
                          className="text-xl text-copper transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="pb-5 text-base leading-relaxed text-gray-700">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            {treatment.howItWorks?.length ? (
              <section className="rounded-[2rem] border border-beige bg-white/95 p-6 shadow-sm">
                <h2 className="mb-4 text-2xl font-semibold text-teal">
                  Como o procedimento é feito
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-gray-700">
                  {treatment.howItWorks.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="rounded-[2rem] border border-beige bg-white/95 p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold text-teal">Como a conduta é planejada</h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                {treatment.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-beige bg-white/95 p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold text-teal">
                Diferenciais da abordagem
              </h2>
              <ul className="space-y-3 pl-5 text-base leading-relaxed text-gray-700">
                {treatment.benefits.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <BookingCard
              title="Avalie seu caso com a Dra. Dayara"
              body="A indicação depende do diagnóstico, do exame físico e do seu histórico. Atendimento acolhedor, com explicação clara de cada etapa."
              conversionPrefix="treatment-page"
            />

            <LocationCard />

            <section className="rounded-[2rem] border border-beige bg-white/95 p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-semibold text-teal">
                Avaliação e recuperação
              </h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                {treatment.carePath.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>

            {relatedPosts.length ? (
              <section className="rounded-[2rem] border border-beige bg-white/95 p-6 shadow-sm">
                <h2 className="mb-4 text-2xl font-semibold text-teal">Conteúdo complementar</h2>
                <div className="space-y-4">
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group block rounded-[1.5rem] border border-copper/20 bg-gradient-to-br from-cream via-white to-beige/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-copper hover:shadow-md"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full border border-copper/20 bg-copper/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-copper">
                          Artigo do blog
                        </span>
                      </div>
                      <h3 className="mt-4 text-lg font-semibold text-teal transition-colors group-hover:text-copper">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-700">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 border-t border-beige/70 pt-4 text-sm font-medium text-teal">
                        Ler artigo completo
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

          </aside>
        </div>

        <footer className="mx-auto mt-8 flex max-w-5xl flex-col gap-4 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/tratamentos"
            className="font-medium text-copper transition-colors hover:text-teal"
          >
            ← Voltar para tratamentos
          </Link>
          <span>
            Conteúdo informativo. A definição do tratamento sempre depende de consulta
            presencial e exame clínico.
          </span>
        </footer>
      </article>
    </main>
  )
}
