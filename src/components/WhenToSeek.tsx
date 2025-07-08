import Image from 'next/image'
import Link from 'next/link'

export default function WhenToSeek() {
  const symptoms = [
    {
      title: 'Sangramento anal ou dor',
      description:
        'Presença de sangue nas fezes ou dor persistente na região anal',
      urgency: 'high',
    },
    {
      title: 'Histórico de doenças inflamatórias intestinais',
      description:
        'Se você tem Crohn, retocolite ulcerativa ou histórico familiar',
      urgency: 'medium',
    },
    {
      title: 'Lesões, verrugas ou nódulos na região do ânus',
      description: 'Qualquer alteração visual ou palpável na área perianal',

      urgency: 'high',
    },
    {
      title: 'Dor ou desconforto durante evacuação',
      description:
        'Dificuldade, dor intensa ou desconforto persistente ao evacuar',
      urgency: 'medium',
    },
    {
      title: 'Alterações no padrão intestinal',
      description:
        'Mudanças significativas na frequência ou consistência das fezes',
      urgency: 'medium',
    },
    {
      title: 'Coceira ou irritação persistente',
      description:
        'Prurido anal que não melhora com cuidados básicos de higiene',
      urgency: 'low',
    },
  ]

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return {
          border: '#dc2626',
          bg: 'rgba(220, 38, 38, 0.05)',
        }
      case 'medium':
        return {
          border: 'var(--color-copper)',
          bg: 'rgba(163, 84, 66, 0.05)',
        }
      case 'low':
        return {
          border: 'var(--color-teal)',
          bg: 'rgba(29, 65, 76, 0.05)',
        }
      default:
        return {
          border: 'var(--color-beige)',
          bg: 'rgba(215, 203, 191, 0.05)',
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
          className="absolute top-1/4 -right-32 w-96 h-96 opacity-20 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--color-copper)' }}
        ></div>
        <div
          className="absolute bottom-1/4 -left-32 w-96 h-96 opacity-50 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--color-teal)' }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2
            className="text-3xl lg:text-5xl font-serif font-bold mb-6"
            style={{ color: 'var(--color-teal)' }}
          >
            Quando procurar um(a) coloproctologista?
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
                  className="w-80 h-128 lg:w-96 lg:h-[500px] rounded-2xl p-2 shadow-lg"
                  style={{ backgroundColor: 'rgba(163, 84, 66, 0.08)' }}
                >
                  <div className="w-full h-full rounded-xl overflow-hidden bg-white shadow-lg">
                    <Image
                      src="/assets/dayara-profissional-pucpr.JPG"
                      alt="Dra. Dayara em consulta médica"
                      width={384}
                      height={500}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Symptoms List */}
            <div className="order-1 lg:order-2 space-y-3">
              {symptoms.map((symptom, index) => {
                const styles = getUrgencyStyles(symptom.urgency)
                return (
                  <div
                    key={index}
                    className="group card px-6 py-4 lg:px-6 lg:py-6 hover:shadow-lg transition-all duration-300 "
                    style={{
                      backgroundColor: styles.bg,
                      borderColor: styles.border,
                      borderWidth: '1px',
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3
                            className="text-base font-serif font-semibold group-hover:opacity-80 transition-opacity duration-300"
                            style={{ color: 'var(--color-teal)' }}
                          >
                            {symptom.title}
                          </h3>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {symptom.description}
                        </p>
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
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                  style={{ backgroundColor: 'var(--color-teal)' }}
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
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
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                  style={{ backgroundColor: 'var(--color-copper)' }}
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
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
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                  style={{ backgroundColor: 'var(--color-straw)' }}
                >
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
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
                href="#contato"
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
