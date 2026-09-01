import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { MedicalSignature } from '@/components/ui/MedicalSignature'
import { BLOG_DEFAULT_OG_IMAGE, SEO_DOCTOR_NAME, WHATSAPP_URL } from '@/constants'
import { FAQ_GROUPS, FAQ_ITEMS } from '@/lib/faq'
import { DEFAULT_ROBOTS, buildCanonical, buildOgMetadata, buildTwitterMetadata } from '@/lib/seo'
import { buildBreadcrumbGraph, buildFaqGraph, serializeJsonLd } from '@/lib/structured-data'

const FAQ_TITLE = `Perguntas frequentes — ${SEO_DOCTOR_NAME} | Coloproctologia`
const FAQ_DESCRIPTION =
  'Respostas diretas sobre a consulta com a coloproctologista, sangramento, dor ao evacuar, prurido anal e cirurgias a laser para hemorroidas, fístula e cisto pilonidal.'

export const metadata: Metadata = {
  title: FAQ_TITLE,
  description: FAQ_DESCRIPTION,
  alternates: {
    canonical: buildCanonical('/perguntas-frequentes'),
  },
  openGraph: buildOgMetadata({
    title: FAQ_TITLE,
    description: FAQ_DESCRIPTION,
    url: buildCanonical('/perguntas-frequentes'),
    image: BLOG_DEFAULT_OG_IMAGE,
  }),
  twitter: buildTwitterMetadata({
    title: FAQ_TITLE,
    description: FAQ_DESCRIPTION,
    image: BLOG_DEFAULT_OG_IMAGE,
  }),
  robots: DEFAULT_ROBOTS,
}

export default function FaqPage() {
  const breadcrumbGraph = buildBreadcrumbGraph([
    { label: 'Início', href: '/' },
    { label: 'Perguntas frequentes' },
  ])

  return (
    <main id="main-content" className="min-h-screen bg-cream py-8 lg:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            '@context': 'https://schema.org',
            '@graph': [breadcrumbGraph, buildFaqGraph(FAQ_ITEMS)],
          }),
        }}
      />

      <section className="container">
        <Breadcrumb
          items={[{ label: 'Início', href: '/' }, { label: 'Perguntas frequentes' }]}
        />

        <div className="mb-14 text-left">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-copper">
            Dúvidas de quem chega ao consultório
          </p>
          <h1 className="mb-6 text-4xl font-semibold leading-tight text-teal lg:text-6xl">
            Perguntas frequentes
          </h1>
          <p className="max-w-4xl text-lg leading-relaxed text-gray-700 lg:text-xl">
            Reunimos aqui as perguntas que mais aparecem na consulta, da vergonha de
            marcar a primeira avaliação até as dúvidas sobre cirurgias a laser. As
            respostas são orientativas e não substituem o exame presencial.
          </p>
        </div>

        <nav aria-label="Seções das perguntas frequentes" className="mb-12">
          <ul className="flex flex-wrap gap-3">
            {FAQ_GROUPS.map((group) => (
              <li key={group.id}>
                <a
                  href={`#${group.id}`}
                  className="inline-flex rounded-full border border-teal/15 bg-teal/5 px-4 py-2 text-sm font-semibold text-teal transition-all duration-300 hover:border-teal hover:bg-teal hover:text-white"
                >
                  {group.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-16">
          {FAQ_GROUPS.map((group) => (
            <section key={group.id} id={group.id} className="scroll-mt-28">
              <h2 className="mb-2 text-3xl font-semibold text-teal">{group.title}</h2>
              <p className="mb-6 max-w-3xl text-base leading-relaxed text-gray-700">
                {group.description}
              </p>

              <div className="space-y-4">
                {group.items.map((faq) => (
                  <details
                    key={faq.question}
                    className="group overflow-hidden rounded-[1.5rem] border border-beige bg-white/95 shadow-sm transition-colors duration-300 open:border-copper/40"
                  >
                    <summary className="flex w-full cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 text-left text-lg font-semibold text-teal [&::-webkit-details-marker]:hidden">
                      <span className="flex-1">{faq.question}</span>
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-beige/50 text-teal transition-all duration-300 group-open:rotate-180 group-open:bg-copper/10 group-open:text-copper">
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </summary>
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 text-base leading-relaxed text-gray-700">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <CallToActionCard
            title="Sua dúvida não estava aqui?"
            body={
              <p>
                Cada caso tem particularidades que só o exame presencial esclarece. Se
                você tem sintomas persistentes ou quer entender qual técnica se aplica ao
                seu caso, agende uma avaliação.
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
                <Link href="/blog" className="btn btn-primary">
                  Ler o blog
                </Link>
              </>
            }
            footer={<MedicalSignature />}
          />
        </div>

        <div className="pt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center font-medium text-copper transition-colors hover:text-teal"
          >
            ← Voltar ao início
          </Link>
        </div>
      </section>
    </main>
  )
}
