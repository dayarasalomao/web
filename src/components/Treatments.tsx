import { WHATSAPP_URL } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'

export default function Treatments() {
  const treatments = [
    {
      name: 'Cirurgias de hemorroidas com laser de CO2',
      description: 'Tecnologia avançada para tratamento minimamente invasivo',
      category: 'laser',
    },
    {
      name: 'Cirurgia de hemorroidas sem corte',
      description: 'Técnica moderna que preserva os tecidos',
      category: 'conservative',
    },
    {
      name: 'Ligadura elástica para doença hemorroidária',
      description: 'Método eficaz e menos invasivo',
      category: 'conservative',
    },
    {
      name: 'Cirurgia de fístula anal a laser e videoassistida (VAAFT)',
      description: 'Procedimento videoassistido de alta precisão',
      category: 'laser',
    },
    {
      name: 'Cirurgia de cisto pilonidal a laser e videoassistida (VAAFT)',
      description: 'Tratamento avançado com recuperação mais rápida',
      category: 'laser',
    },
    {
      name: 'Cirurgia de plicoma anal a laser de CO2',
      description: 'Remoção precisa com tecnologia laser',
      category: 'laser',
    },
    {
      name: 'Botox anal para fissura e dores anais crônicas',
      description: 'Tratamento inovador para alívio da dor',
      category: 'innovative',
    },
    {
      name: 'Eletrocoagulação a laser de lesões por HPV',
      description: 'Remoção segura e eficaz de lesões',
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
      className="pb-12 pt-16 lg:pb-20 lg:pt-24 relative overflow-hidden"
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
                      className="group card p-4 relative overflow-hidden"
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
                            className="text-sm font-serif font-semibold mb-1"
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

            {/* Professional Image Section */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main image container with clean design */}
                <div className="relative w-80 h-96 lg:w-96 lg:h-[500px]">
                  {/* Simple, elegant frame */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white">
                    <Image
                      src="/assets/operando-longe.jpg"
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
                <Link
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  Gostaria de agendar uma consulta?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
