import Image from 'next/image'

export default function CV() {
  const qualifications = [
    {
      title: 'Formação Médica',
      institution: 'Pontifícia Universidade Católica do Paraná (PUC-PR)',
      year: '2019',
      description:
        'Graduação em Medicina com formação sólida em ciências médicas',
      category: 'education',
    },
    {
      title: 'Residência em Cirurgia Geral',
      institution: 'Santa Casa de Curitiba',
      year: '2022',
      description:
        'Especialização em procedimentos cirúrgicos com foco em técnicas avançadas',
      category: 'residency',
    },
    {
      title: 'Residência em Coloproctologia',
      institution: 'Hospital Mackenzie',
      year: '2024',
      description: 'Especialização completa em doenças do cólon, reto e ânus',
      category: 'residency',
    },
    {
      title: 'Proctologia Minimamente Invasiva',
      institution: 'IRCAD América Latina',
      year: '2025',
      description:
        'Curso avançado em técnicas minimamente invasivas e cirurgia a laser',
      category: 'specialization',
    },
    {
      title: 'Pós-graduação em Disfunções do Assoalho Pélvico',
      institution: 'UNIFAL',
      year: 'Atual',
      description: 'Especialização avançada em tratamentos do assoalho pélvico',
      category: 'specialization',
    },
  ]

  const getCategoryStyles = (category: string, index: number) => {
    // Elegant progression using our brand colors with subtle variations
    const colors = [
      { // 2019 - Deep teal (education)
        bg: 'rgba(29, 65, 76, 0.1)',
        border: 'var(--color-teal)',
        accent: 'var(--color-teal)',
      },
      { // 2022 - Darker copper variant
        bg: 'rgba(139, 69, 19, 0.1)',
        border: '#8B4513',
        accent: '#8B4513',
      },
      { // 2024 - Deep warm brown (sophisticated)
        bg: 'rgba(101, 67, 33, 0.1)', 
        border: '#654321',
        accent: '#654321',
      },
      { // 2025 - Warm gold/bronze
        bg: 'rgba(184, 134, 11, 0.1)',
        border: '#B8860B', 
        accent: '#B8860B',
      },
      { // Atual - Original copper (highlight current)
        bg: 'rgba(163, 84, 66, 0.1)',
        border: 'var(--color-copper)',
        accent: 'var(--color-copper)',
      },
    ]
    
    return colors[index] || colors[0]
  }

  return (
    <section
      id="curriculo"
      className="pb-12 pt-16 lg:pb-20 lg:pt-24 relative overflow-hidden"
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
                  className="w-80 h-96 lg:w-96 lg:h-[547px] rounded-2xl p-2 shadow-lg"
                  style={{ backgroundColor: 'rgba(29, 65, 76, 0.1)' }}
                >
                  <div className="w-full h-full rounded-xl overflow-hidden bg-white shadow-lg">
                    {/* FIXME: Width and Height are not correct */}
                    <Image
                      src="/assets/day-clinica-pe.JPG"
                      alt="Dra. Dayara Salomão - Formação Profissional"
                      width={912}
                      height={1368}
                      className="w-full h-full object-cover"
                      quality={100}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Qualifications Timeline */}
            <div className="order-1 lg:order-2 space-y-4">
              {qualifications.map((qualification, index) => {
                const styles = getCategoryStyles(qualification.category, index)
                return (
                  <div key={index} className="relative">
                    <div
                      className="group card p-4 hover:shadow-lg transition-all duration-300  relative overflow-hidden"
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
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3
                              className="text-base font-serif font-semibold group-hover:opacity-80 transition-opacity duration-300"
                              style={{ color: 'var(--color-teal)' }}
                            >
                              {qualification.title}
                            </h3>
                            <span
                              className="text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap"
                              style={{
                                color: styles.accent,
                                backgroundColor: `color-mix(in srgb, ${styles.accent} 20%, transparent)`,
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
                          <p className="text-xs text-gray-800 leading-relaxed">
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
