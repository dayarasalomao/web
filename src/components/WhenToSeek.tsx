import { HighlightCta } from '@/components/ui/HighlightCta'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { InfoCard } from '@/components/ui/InfoCard'
import { getPostHref } from '@/lib/blog'
import Image from 'next/image'
import Link from 'next/link'

const URGENCY_STYLES = {
  high: { accent: 'danger', dot: 'bg-red-700' },
  medium: { accent: 'copper', dot: 'bg-copper' },
  low: { accent: 'teal', dot: 'bg-teal' },
} as const

export default function WhenToSeek() {
  const symptoms = [
    {
      title: 'Sangramento anal ou dor',
      description:
        'Presença de sangue nas fezes ou dor persistente na região anal',
      urgency: 'high',
      blogSlug: 'sangramento-anal-dor-quando-procurar-coloproctologista',
    },
    {
      title: 'Histórico de doenças inflamatórias intestinais',
      description:
        'Se você tem Crohn, retocolite ulcerativa ou histórico familiar',
      urgency: 'medium',
      blogSlug: 'historico-crohn-retocolite-familia-acompanhamento-coloproctologista',
    },
    {
      title: 'Lesões, verrugas ou nódulos na região do ânus',
      description: 'Qualquer alteração visual ou palpável na área perianal',

      urgency: 'high',
      blogSlug: 'lesoes-verrugas-nodulos-regiao-anal-o-que-observar',
    },
    {
      title: 'Dor ou desconforto durante evacuação',
      description:
        'Dificuldade, dor intensa ou desconforto persistente ao evacuar',
      urgency: 'medium',
      blogSlug: 'dor-ao-evacuar-quando-investigar',
    },
    {
      title: 'Alterações no padrão intestinal',
      description:
        'Mudanças significativas na frequência ou consistência das fezes',
      urgency: 'medium',
      blogSlug: 'alteracoes-habito-intestinal-quando-avaliar',
    },
    {
      title: 'Coceira ou irritação persistente',
      description:
        'Prurido anal que não melhora com cuidados básicos de higiene',
      urgency: 'low',
      blogSlug: 'prurido-anal-causas-cuidados',
    },
  ]

  return (
    <section
      id="procurar"
      className="pb-12 pt-16 lg:pb-20 lg:pt-24 relative overflow-hidden bg-white"
    >
      {/* Very subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 -right-32 w-96 h-96 opacity-10 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--color-copper)' }}
        ></div>
        <div
          className="absolute bottom-1/4 -left-32 w-96 h-96 opacity-10 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--color-teal)' }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <SectionHeader
          title="Quando procurar uma coloproctologista?"
          lead={
            <>
              <span className="font-semibold text-copper">
                Sintomas persistentes merecem atenção.
              </span>{' '}
              Uma avaliação ajuda a esclarecer possíveis causas e a definir
              próximos passos de forma individualizada.
            </>
          }
        />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-stretch lg:gap-12">
            {/* Professional Image */}
            <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
              <div className="relative lg:h-full lg:w-full">
                <div
                  className="w-80 h-128 rounded-2xl p-2 shadow-lg lg:h-full lg:w-full"
                  style={{ backgroundColor: 'rgba(163, 84, 66, 0.08)' }}
                >
                  <div className="w-full h-full rounded-xl overflow-hidden bg-white shadow-lg">
                    <Image
                      src="/assets/dayara-frente-de-pe.webp"
                      // src="/assets/dayara-clinica.webp"
                      alt="Dra. Dayara em consulta médica"
                      width={912}
                      height={1368}
                      className="w-full h-full object-cover object-top"
                      quality={85}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Symptoms List */}
            <div className="order-1 lg:order-2 space-y-3">
              {symptoms.map((symptom, index) => {
                const styles =
                  URGENCY_STYLES[symptom.urgency as keyof typeof URGENCY_STYLES]
                const href = getPostHref(symptom.blogSlug)

                return (
                  <InfoCard
                    key={index}
                    accent={styles.accent}
                    className="!px-6 !py-4 lg:!px-7 lg:!py-[1.15rem]"
                  >
                    <div className="flex items-start gap-3.5">
                      {/* A dot instead of an icon badge: the icons repeated
                          what the accent border already says, and three
                          different glyphs added noise to a list meant to be
                          scanned. */}
                      <span
                        aria-hidden="true"
                        className={`mt-[9px] h-2 w-2 shrink-0 rounded-full ${styles.dot}`}
                      />
                      <div className="flex-1">
                        <h3 className="mb-1 font-sans text-base font-semibold text-teal-deep">
                          {symptom.title}
                        </h3>
                        <p className="text-[0.8125rem] leading-relaxed text-gray-600">
                          {symptom.description}
                        </p>
                        {href ? (
                          <Link
                            href={href}
                            className="mt-2 inline-flex text-xs font-semibold text-copper transition-colors hover:text-teal"
                          >
                            Saiba mais →
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </InfoCard>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <HighlightCta
            className="mx-auto max-w-7xl text-left"
            eyebrow="Importante lembrar"
            title="Não se automedique nem ignore sintomas persistentes."
            body="O coloproctologista é o especialista indicado para diagnosticar e tratar adequadamente as condições da região anal e intestinal."
            ctaLabel="Agendar consulta agora"
            conversionSuffix="when-to-seek"
            items={[
              { title: 'Diagnóstico precoce', description: 'Melhores resultados no tratamento' },
              { title: 'Tratamento preciso', description: 'Abordagem especializada e eficaz' },
              { title: 'Alívio dos sintomas', description: 'Retorno ao bem-estar e qualidade de vida' },
            ]}
          />
        </div>
      </div>
    </section>
  )
}
