import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowUpRight, BookOpen, Globe, Stethoscope } from 'lucide-react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { InstagramIcon } from '@/components/ui/InstagramIcon'
import { CRM_FULL, RQE_FULL, SEO_DOCTOR_NAME } from '@/constants'
import { getPostBySlug } from '@/lib/blog'
import type { PracticeLocation } from '@/lib/locations'
import {
  formatLaunchDateLong,
  formatLaunchDateShort,
  getAllLocations,
  getLocationsLandingPath,
  getLocationBySlug,
  isLocationIndexable,
} from '@/lib/locations'
import {
  DEFAULT_ROBOTS,
  buildCanonical,
  buildOgMetadata,
  buildTwitterMetadata,
} from '@/lib/seo'
import {
  buildBreadcrumbGraph,
  buildLocationBreadcrumbItems,
  buildFaqGraph,
  buildLocationGraph,
  serializeJsonLd,
} from '@/lib/structured-data'
import { getTreatmentBySlug } from '@/lib/treatments'

interface LocationPageProps {
  params: Promise<{ slug: string }>
}

// No-API-key embed: Google serves a basic interactive map for a lat/lng
// query via the `output=embed` parameter. Good enough for a single
// clinic pin; swap to the Maps Embed API if the site ever gets a key.
function buildMapEmbedUrl(location: PracticeLocation): string | null {
  if (!location.geo) return null
  return `https://www.google.com/maps?q=${location.geo.latitude},${location.geo.longitude}&z=16&output=embed`
}

function buildLocationTitle(location: PracticeLocation): string {
  return `Coloproctologista em ${location.city} | ${SEO_DOCTOR_NAME}`
}

function buildLocationDescription(location: PracticeLocation, indexable: boolean): string {
  if (indexable) {
    return `Atendimento em coloproctologia com a ${SEO_DOCTOR_NAME} no ${location.name}, em ${location.city}/${location.stateCode}. Consulte endereço e agendamento.`
  }
  const launch = location.launchDate
    ? `a partir de ${formatLaunchDateShort(location.launchDate)}`
    : 'em preparação'
  return `${SEO_DOCTOR_NAME}, ${CRM_FULL} e ${RQE_FULL}: atendimento no ${location.name}, em ${location.city}/${location.stateCode}, ${launch}.`
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
  const title = buildLocationTitle(location)
  const description = buildLocationDescription(location, indexable)

  return {
    title,
    description,
    alternates: { canonical },
    robots: indexable ? DEFAULT_ROBOTS : { index: false, follow: true },
    openGraph: buildOgMetadata({
      title,
      description,
      url: canonical,
      imageAlt: `${SEO_DOCTOR_NAME} — atendimento em ${location.city}/${location.stateCode}`,
    }),
    twitter: buildTwitterMetadata({ title, description }),
  }
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params
  const location = getLocationBySlug(slug)

  if (!location) notFound()

  const indexable = isLocationIndexable(location)
  const launchDateLong = location.launchDate
    ? formatLaunchDateLong(location.launchDate)
    : null
  const treatments = location.relatedTreatmentSlugs
    .map((treatmentSlug) => getTreatmentBySlug(treatmentSlug))
    .filter((treatment): treatment is NonNullable<typeof treatment> => treatment !== null)
  const posts = location.relatedBlogSlugs
    .map((postSlug) => getPostBySlug(postSlug))
    .filter((post): post is NonNullable<typeof post> => post !== null)
  const locationGraph = indexable ? buildLocationGraph(location) : null
  const mapEmbedUrl = indexable ? buildMapEmbedUrl(location) : null
  const locationsLandingPath = getLocationsLandingPath()
  const breadcrumbItems = buildLocationBreadcrumbItems(location.city)

  const addressBlock = location.address ? (
    <address className="space-y-2 not-italic text-base leading-relaxed text-gray-700">
      <strong className="block text-lg text-teal">{location.name}</strong>
      <span className="block">{location.address.streetAddress}</span>
      {location.address.addressDetail ? (
        <span className="block">{location.address.addressDetail}</span>
      ) : null}
      {location.address.neighborhood ? (
        <span className="block">{location.address.neighborhood}</span>
      ) : null}
      <span className="block">
        {location.city}/{location.stateCode} · CEP {location.address.postalCode}
      </span>
      {location.phone ? <span className="block">Telefone: {location.phone}</span> : null}
      {location.clinicPhone ? (
        <span className="block">Telefone geral do Instituto: {location.clinicPhone}</span>
      ) : null}
      {location.openingHours ? (
        <span className="block">
          Horário da Dra. Dayara: {location.openingHours.label}
        </span>
      ) : null}
    </address>
  ) : null

  const faqSection = location.faqs.length ? (
    <section className="mt-12 rounded-[2rem] border border-beige bg-white p-7 shadow-sm lg:p-9">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-copper">
        Dúvidas frequentes
      </p>
      <h2 className="mb-5 text-2xl font-semibold text-teal">
        Perguntas sobre o atendimento em {location.city}
      </h2>
      <div className="divide-y divide-beige/70 border-y border-beige/70">
        {location.faqs.map((faq) => (
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
            <p className="pb-5 text-base leading-relaxed text-gray-700">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  ) : null

  const treatmentsSection = treatments.length ? (
    <section className="mt-12">
      <h2 className="mb-6 text-3xl font-semibold text-teal">Tratamentos relacionados</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {treatments.map((treatment) => (
          <Link
            key={treatment.slug}
            href={`/tratamentos/${treatment.slug}`}
            className="group relative flex min-h-[210px] flex-col overflow-hidden rounded-[1.5rem] border border-beige bg-white p-6 shadow-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-copper/70 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-copper transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
            <span className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-copper">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-copper/10">
                  <Stethoscope className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                </span>
                Tratamento
              </span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-beige text-copper transition-colors duration-300 group-hover:border-copper group-hover:bg-copper group-hover:text-white group-focus-visible:border-copper group-focus-visible:bg-copper group-focus-visible:text-white">
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              </span>
            </span>
            <h3 className="mt-5 text-lg font-semibold leading-snug text-teal">
              {treatment.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {treatment.homeCardDescription}
            </p>
            <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-copper">
              Conhecer tratamento
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  ) : null

  const readingsSection = posts.length ? (
    <section className="mt-12">
      <h2 className="mb-6 text-3xl font-semibold text-teal">Leituras para antes da consulta</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group relative flex h-full min-h-[250px] flex-col overflow-hidden rounded-[1.5rem] border border-beige bg-white p-6 shadow-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-copper/70 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-copper transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
            <span className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-copper">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-copper/10">
                  <BookOpen className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                </span>
                Artigo · {post.readingTime} min de leitura
              </span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-beige text-copper transition-colors duration-300 group-hover:border-copper group-hover:bg-copper group-hover:text-white group-focus-visible:border-copper group-focus-visible:bg-copper group-focus-visible:text-white">
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              </span>
            </span>
            <h3 className="mt-5 text-lg font-semibold leading-snug text-teal">{post.title}</h3>
            <span className="mt-3 block text-sm leading-relaxed text-gray-700">
              {post.excerpt}
            </span>
            <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-copper">
              Ler artigo
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </span>
          </Link>
        ))}
      </div>
    </section>
  ) : null

  if (!indexable) {
    return (
      <main id="main-content" className="min-h-screen bg-cream py-8 lg:py-14">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              '@context': 'https://schema.org',
              '@graph': [
                buildBreadcrumbGraph(breadcrumbItems),
                ...(location.faqs.length ? [buildFaqGraph(location.faqs)] : []),
              ],
            }),
          }}
        />
        <section className="container">
          <Breadcrumb items={breadcrumbItems} />

          <header className="mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-copper">
              {launchDateLong
                ? `Atendimento a partir de ${launchDateLong}`
                : 'Mudança em preparação'}
            </p>
            <h1 className="mb-5 text-4xl font-semibold leading-tight text-teal lg:text-6xl">
              Coloproctologista em {location.city}
            </h1>
            <p className="text-lg leading-relaxed text-gray-700 lg:text-xl">
              A {SEO_DOCTOR_NAME} ({CRM_FULL} · {RQE_FULL}) inicia atendimentos no{' '}
              {location.name}, em {location.city}/{location.stateCode}
              {launchDateLong ? `, em ${launchDateLong}` : ', em breve'}.{' '}
              {location.roleDescription}
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
            <section className="rounded-[2rem] border border-beige bg-white p-7 shadow-sm lg:p-9">
              <h2 className="mb-5 text-2xl font-semibold text-teal">Endereço confirmado</h2>
              {addressBlock}
              <p className="mt-5 text-base leading-relaxed text-gray-700">
                O WhatsApp de agendamento permanece o mesmo já utilizado no site. O
                telefone acima é o contato geral do Instituto.
              </p>
              {location.mapsUrl ? (
                <div className="mt-7">
                  <Link
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Abrir no mapa
                  </Link>
                </div>
              ) : null}
            </section>

            <section className="rounded-[2rem] border border-beige bg-white p-7 shadow-sm lg:p-9">
              <h2 className="mb-5 text-2xl font-semibold text-teal">
                Condições que serão atendidas
              </h2>
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
              <p className="mt-5 text-sm leading-relaxed text-gray-600">
                A colonoscopia não será realizada pela {SEO_DOCTOR_NAME} nesse local.
              </p>
            </section>
          </div>

          {faqSection}
          {treatmentsSection}
          {readingsSection}

          <CallToActionCard
            className="mt-12"
            title={`Agendamento para ${location.city}`}
            body={
              <p>
                {launchDateLong
                  ? `O atendimento começa em ${launchDateLong}.`
                  : 'O atendimento começa em breve.'}{' '}
                Até a virada coordenada do site e dos perfis locais, esta página
                permanece fora dos mecanismos de busca.
              </p>
            }
            actions={
              <div className="flex flex-wrap justify-center gap-3">
                {location.showAppointmentCta && location.whatsappUrl ? (
                  <Link
                    href={location.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    Falar pelo WhatsApp
                  </Link>
                ) : null}
                <Link href={locationsLandingPath} className="btn btn-primary">
                  Ver locais de atendimento
                </Link>
              </div>
            }
          />
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
        <Breadcrumb items={breadcrumbItems} />

        <header className="mb-12">
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

        {mapEmbedUrl ? (
          <div className="mb-12 overflow-hidden rounded-[2rem] border border-beige shadow-sm">
            <iframe
              src={mapEmbedUrl}
              title={`Mapa com a localização do ${location.name}`}
              className="h-[360px] w-full lg:h-[420px]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <section className="rounded-[2rem] border border-beige bg-white p-7 shadow-sm lg:p-9">
            <h2 className="mb-5 text-2xl font-semibold text-teal">Endereço e contato</h2>
            {addressBlock}
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
            {location.websiteUrl || location.instagramUrl ? (
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {location.websiteUrl ? (
                  <Link
                    href={location.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-copper underline decoration-copper/30 underline-offset-4 hover:text-teal"
                  >
                    <Globe className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    Site do Instituto
                  </Link>
                ) : null}
                {location.instagramUrl ? (
                  <Link
                    href={location.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-copper underline decoration-copper/30 underline-offset-4 hover:text-teal"
                  >
                    <InstagramIcon className="h-4 w-4" aria-hidden="true" />
                    Instagram
                  </Link>
                ) : null}
              </div>
            ) : null}
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

        {faqSection}
        {treatmentsSection}
        {readingsSection}

        {location.showAppointmentCta && location.whatsappUrl ? (
          <CallToActionCard
            className="mt-12"
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
