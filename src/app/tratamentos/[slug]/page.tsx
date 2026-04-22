import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { WHATSAPP_URL } from '@/constants'
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

          <div className="text-sm text-gray-600">
            Última atualização:{' '}
            <time dateTime={treatment.lastUpdated}>
              {new Date(treatment.lastUpdated).toLocaleDateString('pt-BR', {
                timeZone: 'UTC',
              })}
            </time>
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

          <aside className="space-y-6">
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
                      className="block rounded-[1.5rem] border border-beige/80 bg-cream/70 p-4 transition-colors hover:border-copper"
                    >
                      <h3 className="text-lg font-semibold text-teal">{post.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-gray-700">
                        {post.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}

            <CallToActionCard
              title="Quer saber se esta é a melhor opção para você?"
              body={
                <p>
                  A indicação depende do diagnóstico, do exame físico e do seu histórico.
                  Uma avaliação especializada define a conduta mais adequada.
                </p>
              }
              actions={
                <Link
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Agendar consulta pelo WhatsApp
                </Link>
              }
            />
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
