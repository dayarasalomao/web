import Image from 'next/image'

export default function Treatments() {
  const treatments = [
    {
      name: 'Cirurgias de hemorroidas com laser de CO2',
      description: 'Tecnologia avançada para tratamento minimamente invasivo',
      icon: '🔴',
      category: 'laser',
    },
    {
      name: 'Cirurgia de hemorroidas sem corte',
      description: 'Técnica moderna que preserva os tecidos',
      icon: '✨',
      category: 'conservative',
    },
    {
      name: 'Ligadura elástica para doença hemorroidária',
      description: 'Método eficaz e menos invasivo',
      icon: '🔗',
      category: 'conservative',
    },
    {
      name: 'Cirurgia de fístula anal a laser e videoassistida (VAAFT)',
      description: 'Procedimento videoassistido de alta precisão',
      icon: '📹',
      category: 'laser',
    },
    {
      name: 'Cirurgia de cisto pilonidal a laser e videoassistida (VAAFT)',
      description: 'Tratamento avançado com recuperação mais rápida',
      icon: '🎯',
      category: 'laser',
    },
    {
      name: 'Cirurgia de plicoma anal a laser de CO2',
      description: 'Remoção precisa com tecnologia laser',
      icon: '⚡',
      category: 'laser',
    },
    {
      name: 'Botox anal para fissura e dores anais crônicas',
      description: 'Tratamento inovador para alívio da dor',
      icon: '💉',
      category: 'innovative',
    },
    {
      name: 'Eletrocoagulação a laser de lesões por HPV',
      description: 'Remoção segura e eficaz de lesões',
      icon: '🦠',
      category: 'laser',
    },
  ]

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'laser':
        return {
          bg: 'rgba(163, 84, 66, 0.1)',
          border: 'var(--color-copper)',
          iconBg: 'var(--color-copper)',
          accent: 'var(--color-copper)',
        }
      case 'conservative':
        return {
          bg: 'rgba(29, 65, 76, 0.1)',
          border: 'var(--color-teal)',
          iconBg: 'var(--color-teal)',
          accent: 'var(--color-teal)',
        }
      case 'innovative':
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
      id="tratamentos"
      className="py-20 lg:py-32 relative overflow-hidden"
      style={{ background: 'var(--color-cream)' }}
    >
      {/* Creative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 -left-32 w-96 h-96 opacity-5 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--color-copper)' }}
        ></div>
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 opacity-5 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--color-teal)' }}
        ></div>

        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-3">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 80%, var(--color-beige) 2px, transparent 2px)`,
              backgroundSize: '80px 80px',
            }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-3xl lg:text-5xl font-serif font-bold mb-6"
            style={{ color: 'var(--color-teal)' }}
          >
            Tratamentos
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
              Tecnologia de ponta
            </span>{' '}
            e{' '}
            <span
              className="font-semibold"
              style={{ color: 'var(--color-teal)' }}
            >
              técnicas minimamente invasivas
            </span>{' '}
            para garantir os melhores resultados com máximo conforto
          </p>
        </div>

        {/* Creative Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Treatments List - 2 columns */}
            <div className="lg:col-span-7 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {treatments.map((treatment, index) => {
                  const styles = getCategoryStyles(treatment.category)
                  return (
                    <div
                      key={index}
                      className="group card p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                      style={{
                        backgroundColor: styles.bg,
                        borderColor: styles.border,
                        borderWidth: '1px',
                      }}
                    >
                      {/* Subtle accent line */}
                      <div
                        className="absolute top-0 left-0 w-full h-0.5 opacity-30"
                        style={{ backgroundColor: styles.accent }}
                      ></div>

                      <div className="flex items-start gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                          style={{ backgroundColor: styles.iconBg }}
                        >
                          {treatment.icon}
                        </div>
                        <div className="flex-1">
                          <h3
                            className="text-sm font-serif font-semibold mb-1 group-hover:opacity-80 transition-opacity duration-300"
                            style={{ color: 'var(--color-teal)' }}
                          >
                            {treatment.name}
                          </h3>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {treatment.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Creative Image Section */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main image container with creative shape */}
                <div className="relative w-80 h-96 lg:w-96 lg:h-[500px]">
                  {/* Creative background shape */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-20 rotate-6 transform"
                    style={{ backgroundColor: 'var(--color-copper)' }}
                  ></div>
                  <div
                    className="absolute inset-0 rounded-3xl opacity-15 -rotate-3 transform"
                    style={{ backgroundColor: 'var(--color-teal)' }}
                  ></div>

                  {/* Image container */}
                  <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                    <Image
                      src="/assets/operando-perto.jpg"
                      alt="Dra. Dayara realizando procedimento"
                      width={384}
                      height={500}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient overlay for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                    {/* Floating info badge */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: 'var(--color-copper)' }}
                        >
                          <svg
                            className="w-6 h-6 text-white"
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
                        <div>
                          <p
                            className="text-sm font-semibold"
                            style={{ color: 'var(--color-teal)' }}
                          >
                            Tecnologia Avançada
                          </p>
                          <p className="text-xs text-gray-600">
                            Procedimentos minimamente invasivos
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating decorative elements */}
                <div
                  className="absolute -top-6 -right-6 w-12 h-12 rounded-full opacity-60 animate-pulse"
                  style={{ backgroundColor: 'var(--color-straw)' }}
                ></div>
                <div
                  className="absolute -bottom-6 -left-6 w-8 h-8 rounded-full opacity-40 animate-pulse"
                  style={{ backgroundColor: 'var(--color-copper)' }}
                ></div>
                <div
                  className="absolute top-1/2 -left-8 w-6 h-6 rounded-full opacity-50 animate-pulse"
                  style={{ backgroundColor: 'var(--color-teal)' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mt-20">
          <div
            className="card p-8 max-w-4xl mx-auto border-2 relative overflow-hidden"
            style={{ borderColor: 'var(--color-copper)' }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, var(--color-copper) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px',
                }}
              ></div>
            </div>

            <div className="relative">
              <h3
                className="text-2xl lg:text-3xl font-serif font-bold mb-4"
                style={{ color: 'var(--color-teal)' }}
              >
                Tecnologia Avançada, Cuidado Humanizado
              </h3>
              <p className="text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
                Todos os tratamentos são realizados com equipamentos de última
                geração, priorizando sua segurança, conforto e os melhores
                resultados clínicos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contato" className="btn btn-primary">
                  Agendar Consulta
                </a>
                <a href="#sobre" className="btn btn-secondary">
                  Conhecer Mais
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
