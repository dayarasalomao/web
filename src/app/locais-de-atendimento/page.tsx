import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { buildCanonical, buildOgMetadata, buildTwitterMetadata } from '@/lib/seo'
import { getAllLocations, getIndexableLocations } from '@/lib/locations'
import {
  buildBreadcrumbGraph,
  buildItemListGraph,
  serializeJsonLd,
} from '@/lib/structured-data'

const title = 'Locais de atendimento | Dra. Dayara Salomão'
const description =
  'Locais de atendimento da Dra. Dayara Salomão: consulte o endereço confirmado e os contatos para agendamento.'
const canonical = buildCanonical('/locais-de-atendimento')

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: buildOgMetadata({ title, description, url: canonical }),
  twitter: buildTwitterMetadata({ title, description }),
}

export default function LocationsPage() {
  const locations = getIndexableLocations()
  const historicalLocations = getAllLocations().filter(
    (location) => location.status === 'historical',
  )
  const breadcrumb = buildBreadcrumbGraph([
    { label: 'Início', href: '/' },
    { label: 'Locais de atendimento' },
  ])
  const itemList = buildItemListGraph(
    'Locais de atendimento confirmados',
    locations.map((location) => ({
      name: `${location.name} — ${location.city}`,
      href: `/locais-de-atendimento/${location.slug}`,
    })),
  )

  return (
    <main id="main-content" className="min-h-screen bg-cream py-8 lg:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            '@context': 'https://schema.org',
            '@graph': [breadcrumb, itemList],
          }),
        }}
      />

      <section className="container">
        <Breadcrumb items={[{ label: 'Início', href: '/' }, { label: 'Locais de atendimento' }]} />

        <header className="mx-auto mb-12 max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-copper">
            Informações atualizadas
          </p>
          <h1 className="mb-5 text-4xl font-semibold leading-tight text-teal lg:text-6xl">
            Locais de atendimento
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-gray-700 lg:text-xl">
            Veja apenas endereços confirmados para consulta. Mudanças de cidade e novos
            locais são publicados aqui quando os dados de atendimento estão definidos.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          {locations.map((location) => (
            <article
              key={location.slug}
              className="flex flex-col rounded-[2rem] border border-beige bg-white p-7 shadow-sm lg:p-9"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-copper">
                Atendimento confirmado em {location.city}/{location.stateCode}
              </p>
              <h2 className="mb-3 text-3xl font-semibold text-teal">{location.name}</h2>
              <p className="mb-6 text-base leading-relaxed text-gray-700">
                {location.roleDescription}
              </p>
              {location.address ? (
                <address className="mb-7 not-italic leading-relaxed text-gray-700">
                  <strong className="block text-teal">{location.address.streetAddress}</strong>
                  {location.address.neighborhood ? (
                    <span>{location.address.neighborhood} · </span>
                  ) : null}
                  <span>
                    {location.city}/{location.stateCode} · CEP {location.address.postalCode}
                  </span>
                </address>
              ) : null}
              <Link
                href={`/locais-de-atendimento/${location.slug}`}
                className="btn btn-secondary mt-auto self-start"
              >
                Ver endereço e contatos
              </Link>
            </article>
          ))}
        </div>

        {historicalLocations.length ? (
          <p className="mt-10 text-sm text-gray-600">
            Endereços anteriores:{' '}
            {historicalLocations.map((location, index) => (
              <span key={location.slug}>
                {index > 0 ? ', ' : ''}
                <Link
                  href={`/locais-de-atendimento/${location.slug}`}
                  className="font-medium text-copper underline decoration-copper/30 underline-offset-4"
                >
                  {location.city}/{location.stateCode}
                </Link>
              </span>
            ))}
          </p>
        ) : null}
      </section>
    </main>
  )
}
