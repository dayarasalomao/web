import { WHATSAPP_URL } from '@/constants'
import { getPostHref } from '@/lib/blog'
import Image from 'next/image'
import Link from 'next/link'
import {
  AlertCircle,
  CheckCircle2,
  CircleDot,
  Clock,
  Info,
  Smile,
} from 'lucide-react'

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
      blogSlug: 'coceira-anal-persistente-causas-sinal-alerta',
    },
  ]

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return {
          accent: '#b91c1c',
          iconBg: 'rgba(185, 28, 28, 0.1)',
          icon: AlertCircle,
        }
      case 'medium':
        return {
          accent: 'var(--color-copper)',
          iconBg: 'rgba(163, 84, 66, 0.1)',
          icon: Info,
        }
      case 'low':
        return {
          accent: 'var(--color-teal)',
          iconBg: 'rgba(29, 65, 76, 0.1)',
          icon: CircleDot,
        }
      default:
        return {
          accent: 'var(--color-straw)',
          iconBg: 'rgba(209, 175, 139, 0.2)',
          icon: CircleDot,
        }
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
              Não ignore os sinais
            </span>{' '}
            do seu corpo. O diagnóstico precoce é fundamental para tratamentos
            mais eficazes e menos invasivos.
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
                    className="group card px-6 py-4 lg:px-6 lg:py-6 hover:shadow-lg transition-all duration-300"
                    style={{ borderLeftWidth: '3px', borderLeftColor: styles.accent }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: styles.iconBg }}
                      >
                        <styles.icon
                          className="w-4 h-4"
                          style={{ color: styles.accent }}
                          strokeWidth={1.75}
                        />
                      </div>
                      <div className="flex-1">
                        <h3
                          className="text-base font-serif font-semibold mb-1 group-hover:opacity-80 transition-opacity duration-300"
                          style={{ color: 'var(--color-teal)' }}
                        >
                          {symptom.title}
                        </h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {symptom.description}
                        </p>
                        {href ? (
                          <Link
                            href={href}
                            className="mt-3 inline-flex text-xs font-medium text-copper transition-colors hover:text-teal"
                          >
                            Saiba mais
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

        {/* Important Notice */}
        <div className="mt-16 text-center">
          <div
            className="card p-8 max-w-4xl mx-auto border-2"
            style={{ borderColor: 'var(--color-copper)' }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <h3
                className="text-2xl font-serif font-bold"
                style={{ color: 'var(--color-teal)' }}
              >
                Importante Lembrar
              </h3>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              <span className="font-semibold text-red-600">
                Não se automedique
              </span>{' '}
              nem ignore sintomas persistentes. O coloproctologista é o
              especialista indicado para diagnosticar e tratar adequadamente as
              condições da região anal e intestinal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 card">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: 'rgba(29, 65, 76, 0.1)' }}
                >
                  <Clock
                    className="w-6 h-6"
                    style={{ color: 'var(--color-teal)' }}
                    strokeWidth={1.75}
                  />
                </div>
                <h4
                  className="font-semibold mb-1"
                  style={{ color: 'var(--color-teal)' }}
                >
                  Diagnóstico Precoce
                </h4>
                <p className="text-sm text-gray-600">
                  Melhores resultados no tratamento
                </p>
              </div>
              <div className="text-center p-4 card">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: 'rgba(163, 84, 66, 0.1)' }}
                >
                  <CheckCircle2
                    className="w-6 h-6"
                    style={{ color: 'var(--color-copper)' }}
                    strokeWidth={1.75}
                  />
                </div>
                <h4
                  className="font-semibold mb-1"
                  style={{ color: 'var(--color-teal)' }}
                >
                  Tratamento Preciso
                </h4>
                <p className="text-sm text-gray-600">
                  Abordagem especializada e eficaz
                </p>
              </div>
              <div className="text-center p-4 card">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: 'rgba(209, 175, 139, 0.2)' }}
                >
                  <Smile
                    className="w-6 h-6"
                    style={{ color: 'var(--color-straw)' }}
                    strokeWidth={1.75}
                  />
                </div>
                <h4
                  className="font-semibold mb-1"
                  style={{ color: 'var(--color-teal)' }}
                >
                  Alívio dos Sintomas
                </h4>
                <p className="text-sm text-gray-600">
                  Retorno ao bem-estar e qualidade de vida
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary text-lg px-8 py-4"
              >
                Agendar Consulta Agora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
