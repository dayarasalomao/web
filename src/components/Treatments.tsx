import { WHATSAPP_URL } from '@/constants'
import Image from 'next/image'

export default function Treatments() {
  const treatments = [
    {
      name: 'Cirurgias de hemorroidas com laser de CO2',
      description: 'Tecnologia avançada para tratamento minimamente invasivo',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
          />
        </svg>
      ),
      category: 'laser',
    },
    {
      name: 'Cirurgia de hemorroidas sem corte',
      description: 'Técnica moderna que preserva os tecidos',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
      category: 'conservative',
    },
    {
      name: 'Ligadura elástica para doença hemorroidária',
      description: 'Método eficaz e menos invasivo',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
          />
        </svg>
      ),
      category: 'conservative',
    },
    {
      name: 'Cirurgia de fístula anal a laser e videoassistida (VAAFT)',
      description: 'Procedimento videoassistido de alta precisão',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m15.75 10.5 4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      ),
      category: 'laser',
    },
    {
      name: 'Cirurgia de cisto pilonidal a laser e videoassistida (VAAFT)',
      description: 'Tratamento avançado com recuperação mais rápida',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
      category: 'laser',
    },
    {
      name: 'Cirurgia de plicoma anal a laser de CO2',
      description: 'Remoção precisa com tecnologia laser',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21l2.25-8.25H3.75z"
          />
        </svg>
      ),
      category: 'laser',
    },
    {
      name: 'Botox anal para fissura e dores anais crônicas',
      description: 'Tratamento inovador para alívio da dor',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      ),
      category: 'innovative',
    },
    {
      name: 'Eletrocoagulação a laser de lesões por HPV',
      description: 'Remoção segura e eficaz de lesões',
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
          />
        </svg>
      ),
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
      style={{ backgroundColor: 'var(--color-cream)' }}
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-2">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 75%, var(--color-beige) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        ></div>
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

        {/* Enhanced Layout */}
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
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                          style={{ backgroundColor: styles.iconBg }}
                        >
                          {treatment.icon}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Professional Image Section */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main image container with clean design */}
                <div className="relative w-80 h-96 lg:w-96 lg:h-[500px]">
                  {/* Simple, elegant frame */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
                    <Image
                      src="/assets/operando-perto.jpg"
                      alt="Dra. Dayara realizando procedimento"
                      width={384}
                      height={500}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Subtle accent elements */}
                <div
                  className="absolute -top-3 -right-3 w-6 h-6 rounded-full opacity-30"
                  style={{ backgroundColor: 'var(--color-copper)' }}
                ></div>
                <div
                  className="absolute -bottom-3 -left-3 w-4 h-4 rounded-full opacity-40"
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
                <a href={WHATSAPP_URL} className="btn btn-secondary">
                  Gostaria de agendar uma consulta?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
