import { HighlightCta } from '@/components/ui/HighlightCta'
import { getPostHref } from '@/lib/blog'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Clock, Smile } from 'lucide-react'

const CONSULTATION_VALUES = [
  {
    title: 'Avaliação Oportuna',
    description: 'Esclarecimento dos sinais e sintomas',
    Icon: Clock,
    iconColor: 'var(--color-teal)',
    iconBackground: 'rgba(29, 65, 76, 0.1)',
  },
  {
    title: 'Conduta Individualizada',
    description: 'Opções discutidas conforme cada caso',
    Icon: CheckCircle2,
    iconColor: 'var(--color-copper)',
    iconBackground: 'rgba(163, 84, 66, 0.1)',
  },
  {
    title: 'Acompanhamento',
    description: 'Orientações para evolução e retorno',
    Icon: Smile,
    iconColor: 'var(--color-straw)',
    iconBackground: 'rgba(209, 175, 139, 0.2)',
  },
] as const

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

  // Only the accent colour is still needed: the icon badge that used to
  // sit beside each signal was dropped for a plain dot.
  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return { accent: '#b91c1c' }
      case 'medium':
        return { accent: 'var(--color-copper)' }
      case 'low':
        return { accent: 'var(--color-teal)' }
      default:
        return { accent: 'var(--color-straw)' }
    }
  }

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
        <div className="text-center mb-16">
          <h2
            className="text-3xl lg:text-5xl font-serif font-bold mb-6"
            style={{ color: 'var(--color-teal)' }}
          >
            Quando procurar uma coloproctologista?
          </h2>
          <div
            className="w-20 h-1 mx-auto mb-6"
            style={{
              background:
                'linear-gradient(90deg, var(--color-copper), var(--color-straw))',
            }}
          ></div>
          <p className="text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            <span
              className="font-semibold"
              style={{ color: 'var(--color-copper)' }}
            >
              Sintomas persistentes merecem atenção.
            </span>{' '}
            Uma avaliação ajuda a esclarecer possíveis causas e a definir
            próximos passos de forma individualizada.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Professional Image */}
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="relative">
                <div
                  className="w-80 h-128 lg:w-96 lg:h-[547px] rounded-2xl p-2 shadow-lg"
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
                const styles = getUrgencyStyles(symptom.urgency)
                const href = getPostHref(symptom.blogSlug)

                return (
                  <div
                    key={index}
                    className="group card px-6 py-5 lg:px-7 lg:py-6"
                    style={{ borderLeftWidth: '3px', borderLeftColor: styles.accent }}
                  >
                    <div className="flex items-start gap-3.5">
                      {/* A dot instead of an icon badge: the icons repeated
                          what the accent border already says, and three
                          different glyphs added noise to a list meant to be
                          scanned. */}
                      <span
                        aria-hidden="true"
                        className="mt-[9px] h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: styles.accent }}
                      />
                      <div className="flex-1">
                        <h3 className="mb-1 font-sans text-base font-semibold text-teal-deep transition-colors duration-200 group-hover:text-copper">
                          {symptom.title}
                        </h3>
                        <p className="text-[0.8125rem] leading-relaxed text-gray-600">
                          {symptom.description}
                        </p>
                        {href ? (
                          <Link
                            href={href}
                            className="mt-3 inline-flex text-xs font-semibold text-copper transition-colors hover:text-teal"
                          >
                            Saiba mais →
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* What the consultation delivers, then the closing conversion block.
            The heading and paragraph that used to sit here said the same
            thing as HighlightCta below, so only the block says it now. */}
        <div className="mt-16">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-3">
            {CONSULTATION_VALUES.map(({ title, description, Icon, iconColor, iconBackground }) => (
              <div
                key={title}
                className="rounded-[1.125rem] border border-teal/10 bg-white p-6 text-center transition-all duration-200 hover:-translate-y-[3px] hover:border-copper hover:shadow-[0_20px_36px_-26px_rgba(29,65,76,0.45)]"
              >
                <div
                  className="mx-auto mb-3.5 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ backgroundColor: iconBackground }}
                >
                  <Icon className="h-6 w-6" style={{ color: iconColor }} strokeWidth={1.75} />
                </div>
                <h4 className="mb-1 font-sans font-semibold text-teal-deep">{title}</h4>
                <p className="text-sm leading-relaxed text-gray-600">{description}</p>
              </div>
            ))}
          </div>

          <HighlightCta
            className="mx-auto mt-8 max-w-4xl text-left"
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
