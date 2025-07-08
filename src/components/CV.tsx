import Image from 'next/image'

export default function CV() {
  const qualifications = [
    {
      title: 'Formação Médica',
      institution: 'Pontifícia Universidade Católica do Paraná (PUC-PR)',
      year: '2019',
      description:
        'Graduação em Medicina com formação sólida em ciências médicas',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l9-5-9-5-9 5 9 5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
        </svg>
      ),
      category: 'education',
    },
    {
      title: 'Residência em Cirurgia Geral',
      institution: 'Santa Casa de Curitiba',
      year: '2022',
      description:
        'Especialização em procedimentos cirúrgicos com foco em técnicas avançadas',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      category: 'residency',
    },
    {
      title: 'Residência em Coloproctologia',
      institution: 'Hospital Mackenzie',
      year: '2024',
      description: 'Especialização completa em doenças do cólon, reto e ânus',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      category: 'residency',
    },
    {
      title: 'Proctologia Minimamente Invasiva',
      institution: 'IRCAD América Latina',
      year: '2025',
      description:
        'Curso avançado em técnicas minimamente invasivas e cirurgia a laser',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      category: 'specialization',
    },
    {
      title: 'Pós-graduação em Disfunções do Assoalho Pélvico',
      institution: 'UNIFAL',
      year: 'Atual',
      description: 'Especialização avançada em tratamentos do assoalho pélvico',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      category: 'specialization',
    },
  ]

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'education':
        return {
          bg: 'rgba(29, 65, 76, 0.1)',
          border: 'var(--color-teal)',
          iconBg: 'var(--color-teal)',
          accent: 'var(--color-teal)',
        }
      case 'residency':
        return {
          bg: 'rgba(163, 84, 66, 0.1)',
          border: 'var(--color-copper)',
          iconBg: 'var(--color-copper)',
          accent: 'var(--color-copper)',
        }
      case 'specialization':
        return {
          bg: 'rgba(209, 175, 139, 0.1)',
          border: 'var(--color-straw)',
          iconBg: 'var(--color-straw)',
          accent: 'var(--color-straw)',
        }
      default:
        return {
          bg: 'rgba(163, 84, 66, 0.1)',
          border: 'var(--color-copper)',
          iconBg: 'var(--color-copper)',
          accent: 'var(--color-copper)',
        }
    }
  }

  return (
    <section
      id="curriculo"
      className="py-20 lg:py-32 relative overflow-hidden"
      style={{ background: 'var(--color-cream)' }}
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/3 -right-32 w-80 h-80 opacity-25 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--color-copper)' }}
        ></div>
        <div
          className="absolute bottom-1/3 -left-32 w-80 h-80 opacity-25 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--color-teal)' }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2
            className="text-3xl lg:text-5xl font-serif font-bold mb-6"
            style={{ color: 'var(--color-teal)' }}
          >
            Formação e Experiência
          </h2>
          <div
            className="w-20 h-1 mx-auto mb-6"
            style={{
              background:
                'linear-gradient(90deg, var(--color-copper), var(--color-straw))',
            }}
          ></div>
          <p className="text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Uma trajetória de{' '}
            <span
              className="font-semibold"
              style={{ color: 'var(--color-copper)' }}
            >
              excelência acadêmica
            </span>{' '}
            e
            <span
              className="font-semibold"
              style={{ color: 'var(--color-teal)' }}
            >
              {' '}
              especialização contínua
            </span>{' '}
            para oferecer o melhor cuidado aos pacientes
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Professional Photo */}
            <div className="order-2 lg:order-1 flex justify-center h-full items-center">
              <div className="relative">
                <div
                  className="w-80 h-96 lg:w-96 lg:h-[500px] rounded-2xl p-2 shadow-2xl"
                  style={{ backgroundColor: 'rgba(29, 65, 76, 0.1)' }}
                >
                  <div className="w-full h-full rounded-xl overflow-hidden bg-white shadow-lg">
                    <Image
                      src="/assets/dayara-profissional-vermelho.JPG"
                      alt="Dra. Dayara Salomão - Formação Profissional"
                      width={384}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Qualifications Timeline */}
            <div className="order-1 lg:order-2 space-y-4">
              {qualifications.map((qualification, index) => {
                const styles = getCategoryStyles(qualification.category)
                return (
                  <div key={index} className="relative">
                    {/* Timeline line */}
                    {index < qualifications.length - 1 && (
                      <div
                        className="absolute left-5 top-12 w-0.5 h-8 opacity-20"
                        style={{ backgroundColor: styles.accent }}
                      ></div>
                    )}

                    <div
                      className="group card p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                      style={{
                        backgroundColor: styles.bg,
                        borderColor: styles.border,
                        borderWidth: '1px',
                      }}
                    >
                      {/* Subtle accent line */}
                      <div
                        className="absolute top-0 left-0 w-full h-0.5 opacity-20"
                        style={{ backgroundColor: styles.accent }}
                      ></div>

                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md"
                          style={{ backgroundColor: styles.iconBg }}
                        >
                          <div className="w-5 h-5">{qualification.icon}</div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3
                              className="text-base font-serif font-semibold group-hover:opacity-80 transition-opacity duration-300"
                              style={{ color: 'var(--color-teal)' }}
                            >
                              {qualification.title}
                            </h3>
                            <span
                              className="text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap "
                              style={{
                                color: styles.accent,
                                backgroundColor: `color-mix(in srgb, ${styles.accent} 15%, transparent)`,
                              }}
                            >
                              {qualification.year}
                            </span>
                          </div>
                          <p
                            className="font-medium mb-1 text-sm"
                            style={{ color: 'var(--color-copper)' }}
                          >
                            {qualification.institution}
                          </p>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {qualification.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Excellence section */}
        <div className="text-center mt-20">
          <div
            className="card p-8 max-w-4xl mx-auto border-2 relative overflow-hidden"
            style={{ borderColor: 'var(--color-teal)' }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-3">
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  backgroundSize: '40px 40px',
                }}
              ></div>
            </div>

            <div className="relative">
              <h3
                className="text-2xl lg:text-3xl font-serif font-bold mb-4"
                style={{ color: 'var(--color-teal)' }}
              >
                Comprometimento com a Excelência
              </h3>
              <p className="text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
                A formação continuada e a busca constante por novas técnicas
                garantem que nossos pacientes recebam sempre o melhor e mais
                moderno tratamento disponível.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
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
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <h4
                    className="font-semibold mb-1"
                    style={{ color: 'var(--color-teal)' }}
                  >
                    Excelência Acadêmica
                  </h4>
                  <p className="text-sm text-gray-600">
                    Formação nas melhores instituições
                  </p>
                </div>
                <div className="text-center">
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
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h4
                    className="font-semibold mb-1"
                    style={{ color: 'var(--color-teal)' }}
                  >
                    Especialização Avançada
                  </h4>
                  <p className="text-sm text-gray-600">
                    Técnicas minimamente invasivas
                  </p>
                </div>
                <div className="text-center">
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
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                  <h4
                    className="font-semibold mb-1"
                    style={{ color: 'var(--color-teal)' }}
                  >
                    Atualização Constante
                  </h4>
                  <p className="text-sm text-gray-600">
                    Sempre em busca do melhor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
