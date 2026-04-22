import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { BLOG_DEFAULT_OG_IMAGE, CONTACT_EMAIL, SEO_DOCTOR_NAME, WHATSAPP_URL } from '@/constants'
import { DEFAULT_ROBOTS, buildCanonical, buildOgMetadata, buildTwitterMetadata } from '@/lib/seo'
import { buildBreadcrumbGraph, serializeJsonLd } from '@/lib/structured-data'
import { getAllTreatments, getRelatedPostsForTreatment } from '@/lib/treatments'

const TREATMENTS_TITLE = `Tratamentos — ${SEO_DOCTOR_NAME} | Coloproctologia em Curitiba`
const TREATMENTS_DESCRIPTION =
  'Conheça os principais tratamentos em coloproctologia com foco em precisão, conforto e técnicas minimamente invasivas em Curitiba.'

export const metadata: Metadata = {
  title: TREATMENTS_TITLE,
  description: TREATMENTS_DESCRIPTION,
  alternates: {
    canonical: buildCanonical('/tratamentos'),
  },
  openGraph: buildOgMetadata({
    title: TREATMENTS_TITLE,
    description: TREATMENTS_DESCRIPTION,
    url: buildCanonical('/tratamentos'),
    image: BLOG_DEFAULT_OG_IMAGE,
  }),
  twitter: buildTwitterMetadata({
    title: TREATMENTS_TITLE,
    description: TREATMENTS_DESCRIPTION,
    image: BLOG_DEFAULT_OG_IMAGE,
  }),
  robots: DEFAULT_ROBOTS,
}

export default function TreatmentsPage() {
  const treatments = getAllTreatments()
  const breadcrumbGraph = buildBreadcrumbGraph([
    { label: 'Início', href: '/' },
    { label: 'Tratamentos' },
  ])

  return (
    <main id="main-content" className="min-h-screen bg-cream py-8 lg:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            '@context': 'https://schema.org',
            '@graph': [breadcrumbGraph],
          }),
        }}
      />

      <section className="container">
        <Breadcrumb items={[{ label: 'Início', href: '/' }, { label: 'Tratamentos' }]} />

        <div className="mx-auto mb-14 max-w-4xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-copper">
            Condutas especializadas em coloproctologia
          </p>
          <h1 className="mb-6 text-4xl font-semibold leading-tight text-teal lg:text-6xl">
            Tratamentos com foco em precisão e conforto
          </h1>
          <p className="text-lg leading-relaxed text-gray-700 lg:text-xl">
            Esta página reúne as principais abordagens oferecidas pela Dra. Dayara Salomão
            para doença hemorroidária, fissura anal, fístula anal, HPV perianal, cisto
            pilonidal e outros quadros anorretais.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {treatments.map((treatment) => {
            const relatedPosts = getRelatedPostsForTreatment(treatment)

            return (
              <article
                key={treatment.slug}
                className="flex h-full flex-col rounded-[2rem] border border-beige bg-white/95 p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-copper">
                  {treatment.shortTitle}
                </p>
                <h2 className="mb-3 text-2xl font-semibold leading-tight text-teal">
                  {treatment.title}
                </h2>
                <p className="mb-5 text-base leading-relaxed text-gray-700">
                  {treatment.summary}
                </p>

                {treatment.mappedDiseaseNames.length ? (
                  <p className="mb-5 text-sm text-gray-600">
                    Indicado em casos selecionados de:{' '}
                    <span className="font-medium text-teal">
                      {treatment.mappedDiseaseNames.join(', ')}
                    </span>
                  </p>
                ) : (
                  <p className="mb-5 text-sm text-gray-600">
                    Conduta definida após exame clínico e avaliação individualizada.
                  </p>
                )}

                <div className="mt-auto flex flex-col gap-3">
                  <Link href={`/tratamentos/${treatment.slug}`} className="btn btn-secondary text-center">
                    Ver detalhes do tratamento
                  </Link>
                  {relatedPosts[0] ? (
                    <Link
                      href={`/blog/${relatedPosts[0].slug}`}
                      className="text-sm font-medium text-copper transition-colors hover:text-teal"
                    >
                      Ler conteúdo complementar
                    </Link>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <CallToActionCard
            title="Precisa de orientação para o seu caso?"
            body={
              <p>
                O tratamento correto depende de exame, histórico e sintomas atuais. Uma
                consulta permite definir a melhor conduta com segurança.
              </p>
            }
            actions={
              <>
                <Link
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Agendar consulta
                </Link>
                <Link href={`mailto:${CONTACT_EMAIL}`} className="btn btn-primary">
                  Enviar e-mail
                </Link>
              </>
            }
          />
        </div>
      </section>
    </main>
  )
}
