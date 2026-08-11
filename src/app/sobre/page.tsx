import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import {
  BUSINESS_CLINIC_NAME,
  CFM_MEDICAL_SEARCH_URL,
  CRM_FULL,
  RQE_FULL,
  SEO_DOCTOR_NAME,
  WHATSAPP_URL,
} from '@/constants'
import {
  PROFESSIONAL_MEMBERSHIPS,
  PROFESSIONAL_PROFILE,
  PROFESSIONAL_QUALIFICATIONS,
} from '@/lib/profile'
import {
  DEFAULT_ROBOTS,
  buildCanonical,
  buildOgMetadata,
  buildTwitterMetadata,
} from '@/lib/seo'
import { buildProfilePageGraph, serializeJsonLd } from '@/lib/structured-data'

const ABOUT_TITLE = `Sobre a ${SEO_DOCTOR_NAME} | Formação e atuação`
const ABOUT_DESCRIPTION = `${SEO_DOCTOR_NAME}: formação em Cirurgia Geral e Coloproctologia, ${CRM_FULL} e ${RQE_FULL}. Conheça sua trajetória e atuação profissional.`
const ABOUT_URL = buildCanonical('/sobre')

export const metadata: Metadata = {
  title: ABOUT_TITLE,
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: ABOUT_URL },
  openGraph: buildOgMetadata({
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    url: ABOUT_URL,
    imageAlt: `Retrato profissional da ${SEO_DOCTOR_NAME}`,
  }),
  twitter: buildTwitterMetadata({
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
  }),
  robots: DEFAULT_ROBOTS,
}

export default function AboutPage() {
  const profileGraph = buildProfilePageGraph({
    title: ABOUT_TITLE,
    description: ABOUT_DESCRIPTION,
    lastModified: '2026-08-10',
  })

  return (
    <main id="main-content" className="min-h-screen bg-cream py-8 lg:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(profileGraph) }}
      />

      <article className="container">
        <Breadcrumb items={[{ label: 'Início', href: '/' }, { label: 'Sobre' }]} />

        <header className="grid items-center gap-10 rounded-[2rem] border border-beige bg-white/95 p-6 shadow-sm lg:grid-cols-[minmax(0,1fr)_360px] lg:p-10">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-copper">
              Formação e atuação profissional
            </p>
            <h1 className="mb-6 text-4xl font-semibold leading-tight text-teal lg:text-6xl">
              Sobre a Dra. Dayara Salomão
            </h1>
            <p className="text-lg leading-relaxed text-gray-700 lg:text-xl">
              {PROFESSIONAL_PROFILE.shortIntroduction}
            </p>
            <p className="mt-5 text-base leading-relaxed text-gray-600 lg:text-lg">
              {PROFESSIONAL_PROFILE.approach}
            </p>

            <div className="mt-7 flex flex-wrap gap-3" aria-label="Registros profissionais">
              <span className="rounded-full border border-copper/25 bg-copper/10 px-4 py-2 text-sm font-semibold text-copper">
                {CRM_FULL}
              </span>
              <span className="rounded-full border border-teal/20 bg-teal/10 px-4 py-2 text-sm font-semibold text-teal">
                {RQE_FULL}
              </span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-[1.75rem] border border-beige bg-cream p-2 shadow-sm">
            <Image
              src="/assets/dayara-trabalhando.webp"
              alt={`Dra. Dayara Salomão em ambiente profissional`}
              width={912}
              height={1368}
              sizes="(min-width: 1024px) 360px, calc(100vw - 80px)"
              className="h-auto w-full rounded-[1.25rem] object-cover"
              quality={85}
              priority
              fetchPriority="high"
            />
          </div>
        </header>

        <section className="mt-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-copper">
            Trajetória
          </p>
          <h2 className="text-3xl font-semibold text-teal lg:text-4xl">
            Formação médica e atualização contínua
          </h2>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-gray-700 lg:text-lg">
            A formação reúne base cirúrgica, especialização em coloproctologia e
            aperfeiçoamento em técnicas minimamente invasivas e disfunções do assoalho
            pélvico. A escolha de qualquer tratamento continua dependente do diagnóstico,
            do exame e das particularidades de cada pessoa.
          </p>

          <ol className="mt-8 space-y-4">
            {PROFESSIONAL_QUALIFICATIONS.map((qualification) => (
              <li
                key={`${qualification.year}-${qualification.title}`}
                className="rounded-[1.5rem] border border-beige bg-white/95 p-5 shadow-sm"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-teal">{qualification.title}</h3>
                    <p className="mt-1 font-medium text-copper">{qualification.institution}</p>
                  </div>
                  <span className="w-fit rounded-full bg-teal/10 px-3 py-1 text-sm font-semibold text-teal">
                    {qualification.year}
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-gray-700">{qualification.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-beige bg-white/95 p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-copper">
              Participação profissional
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-teal">Sociedades médicas</h2>
            <ul className="mt-5 space-y-3 text-gray-700">
              {PROFESSIONAL_MEMBERSHIPS.map((membership) => (
                <li key={membership} className="flex gap-3 leading-relaxed">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-copper" />
                  {membership}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-beige bg-teal p-6 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-straw">
              Atendimento atual
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Campo Grande/MS</h2>
            <p className="mt-4 leading-relaxed text-white/85">
              Consultas no {BUSINESS_CLINIC_NAME}, com informações de endereço, horário,
              mapa e agendamento reunidas na página do local.
            </p>
            <Link
              href="/locais-de-atendimento/campo-grande"
              className="mt-5 inline-flex font-semibold text-straw transition-colors hover:text-white"
            >
              Ver local de atendimento →
            </Link>
          </div>
        </section>

        <blockquote className="mt-14 rounded-[2rem] border-l-4 border-copper bg-white/95 p-7 text-lg italic leading-relaxed text-gray-700 shadow-sm">
          “{PROFESSIONAL_PROFILE.quote}”
        </blockquote>

        <div className="mt-14">
          <CallToActionCard
            title="Quer conhecer os próximos passos?"
            body={
              <p>
                Veja os tratamentos descritos no site ou fale com a equipe para receber
                orientações de agendamento. A indicação de exames e procedimentos é definida
                somente após avaliação individual.
              </p>
            }
            actions={
              <>
                <Link href="/tratamentos" className="btn btn-primary">
                  Ver tratamentos
                </Link>
                <Link
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  data-conversion="whatsapp-about"
                >
                  Agendar consulta
                </Link>
              </>
            }
            footer={
              <Link
                href={CFM_MEDICAL_SEARCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-copper transition-colors hover:text-teal"
              >
                Consultar {CRM_FULL} no CFM
              </Link>
            }
          />
        </div>
      </article>
    </main>
  )
}
