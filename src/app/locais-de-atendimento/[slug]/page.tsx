import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { getPostBySlug } from '@/lib/blog'
import { getAllLocations, getLocationBySlug, isLocationIndexable } from '@/lib/locations'
import {
  DEFAULT_ROBOTS,
  buildCanonical,
  buildOgMetadata,
  buildTwitterMetadata,
} from '@/lib/seo'
import {
  buildBreadcrumbGraph,
  buildLocationGraph,
  serializeJsonLd,
} from '@/lib/structured-data'
import { getTreatmentBySlug } from '@/lib/treatments'

interface LocationPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllLocations().map((location) => ({ slug: location.slug }))
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params
  const location = getLocationBySlug(slug)

  if (!location) return { title: 'Local não encontrado', robots: { index: false, follow: false } }

  const indexable = isLocationIndexable(location)
  const canonical = buildCanonical(`/locais-de-atendimento/${location.slug}`)
  const title = indexable
    ? `Coloproctologista em ${location.city} | Dra. Dayara Salomão`
    : `Mudança para ${location.city} em preparação | Dra. Dayara`
  const description = indexable
    ? `Veja endereço e contatos para atendimento em coloproctologia com a Dra. Dayara Salomão em ${location.city}.`
    : `Atendimento da Dra. Dayara Salomão previsto no Instituto do Aparelho Digestivo, em ${location.city}/${location.stateCode}, a partir de 5 de agosto de 2026.`

  return {
    title,
    description,
    alternates: { canonical },
    robots: indexable ? DEFAULT_ROBOTS : { index: false, follow: true },
    openGraph: buildOgMetadata({
      title,
      description,
      url: canonical,
      imageAlt: `Dra. Dayara Salomão — atendimento em ${location.city}/${location.stateCode}`,
    }),
    twitter: buildTwitterMetadata({ title, description }),
  }
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params
  const location = getLocationBySlug(slug)

  if (!location) notFound()

  const indexable = isLocationIndexable(location)
  const treatments = location.relatedTreatmentSlugs
    .map((treatmentSlug) => getTreatmentBySlug(treatmentSlug))
    .filter((treatment): treatment is NonNullable<typeof treatment> => treatment !== null)
  const posts = location.relatedBlogSlugs
    .map((postSlug) => getPostBySlug(postSlug))
    .filter((post): post is NonNullable<typeof post> => post !== null)
  const locationGraph = indexable ? buildLocationGraph(location) : null
  const breadcrumbGraph = buildBreadcrumbGraph([
    { label: 'Início', href: '/' },
    { label: 'Locais de atendimento', href: '/locais-de-atendimento' },
    { label: location.city },
  ])

  if (!indexable) {
    return (
      <main id="main-content" className="min-h-screen bg-cream py-8 lg:py-14">
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
          <Breadcrumb
            items={[
              { label: 'Início', href: '/' },
              { label: 'Locais de atendimento', href: '/locais-de-atendimento' },
              { label: location.city },
            ]}
          />
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-copper/20 bg-white p-8 shadow-sm lg:p-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-copper">
              Atualização de atendimento
            </p>
            <h1 className="mb-6 text-4xl font-semibold leading-tight text-teal lg:text-6xl">
              Mudança para Campo Grande em preparação
            </h1>
            <div className="space-y-5 text-lg leading-relaxed text-gray-700">
              <p>
                A Dra. Dayara Salomão inicia atendimentos no Instituto do Aparelho
                Digestivo, em Campo Grande/MS, em 5 de agosto de 2026.
              </p>
              <p>
                O endereço informado é R. Alagoas, 700, Jardim dos Estados, Campo
                Grande/MS, CEP 79020-120. O novo telefone e WhatsApp ainda serão
                confirmados.
              </p>
              <p>
                A página permanece fora dos mecanismos de busca até a virada coordenada do
                site e dos perfis locais.
              </p>
            </div>
            <Link href="/locais-de-atendimento" className="btn btn-secondary mt-8">
              Ver locais confirmados
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main id="main-content" className="min-h-screen bg-cream py-8 lg:py-14">
      {locationGraph ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(locationGraph) }}
        />
      ) : null}
      <section className="container">
        <Breadcrumb
          items={[
            { label: 'Início', href: '/' },
            { label: 'Locais de atendimento', href: '/locais-de-atendimento' },
            { label: location.city },
          ]}
        />

        <header className="mx-auto mb-12 max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-copper">
            Atendimento em {location.city}/{location.stateCode}
          </p>
          <h1 className="mb-5 text-4xl font-semibold leading-tight text-teal lg:text-6xl">
            Coloproctologista em {location.city}
          </h1>
          <p className="text-lg leading-relaxed text-gray-700 lg:text-xl">
            {location.roleDescription}
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <section className="rounded-[2rem] border border-beige bg-white p-7 shadow-sm lg:p-9">
            <h2 className="mb-5 text-2xl font-semibold text-teal">Endereço e contato</h2>
            {location.address ? (
              <address className="space-y-2 not-italic text-base leading-relaxed text-gray-700">
                <strong className="block text-lg text-teal">{location.name}</strong>
                <span className="block">{location.address.streetAddress}</span>
                {location.address.neighborhood ? (
                  <span className="block">{location.address.neighborhood}</span>
                ) : null}
                <span className="block">
                  {location.city}/{location.stateCode} · CEP {location.address.postalCode}
                </span>
                {location.phone ? <span className="block">Telefone: {location.phone}</span> : null}
              </address>
            ) : null}
            <div className="mt-7 flex flex-wrap gap-3">
              {location.showAppointmentCta && location.whatsappUrl ? (
                <Link
                  href={location.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Agendar consulta
                </Link>
              ) : null}
              {location.mapsUrl ? (
                <Link
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Abrir no mapa
                </Link>
              ) : null}
            </div>
          </section>

          <section className="rounded-[2rem] border border-beige bg-white p-7 shadow-sm lg:p-9">
            <h2 className="mb-5 text-2xl font-semibold text-teal">Condições avaliadas</h2>
            <ul className="grid gap-3 text-gray-700 sm:grid-cols-2 lg:grid-cols-1">
              {location.services.map((service) => (
                <li key={service} className="flex gap-3">
                  <span aria-hidden="true" className="text-copper">
                    •
                  </span>
                  {service}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-12">
          <h2 className="mb-6 text-3xl font-semibold text-teal">Tratamentos relacionados</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {treatments.map((treatment) => (
              <Link
                key={treatment.slug}
                href={`/tratamentos/${treatment.slug}`}
                className="rounded-2xl border border-beige bg-white p-5 font-semibold text-teal shadow-sm transition hover:-translate-y-0.5 hover:border-copper"
              >
                {treatment.title}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-6 text-3xl font-semibold text-teal">Leituras para antes da consulta</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-2xl border border-beige bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-copper"
              >
                <span className="font-semibold text-teal">{post.title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-gray-700">
                  {post.excerpt}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {location.showAppointmentCta && location.whatsappUrl ? (
          <CallToActionCard
            className="mx-auto mt-12 max-w-4xl"
            title="Precisa organizar sua avaliação?"
            body={<p>Entre em contato para confirmar horários e orientações de agendamento.</p>}
            actions={
              <Link
                href={location.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Falar pelo WhatsApp
              </Link>
            }
          />
        ) : null}
      </section>
    </main>
  )
}
