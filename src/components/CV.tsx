import Image from 'next/image'
import { GraduationCap, Settings2, TrendingUp } from 'lucide-react'
import { PROFESSIONAL_QUALIFICATIONS } from '@/lib/profile'

export default function CV() {
  return (
    <section
      id="curriculo"
      className="pb-12 pt-16 lg:pb-20 lg:pt-24 relative overflow-hidden"
      style={{ background: 'var(--color-cream)' }}
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/3 -right-32 w-80 h-80 opacity-10 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--color-copper)' }}
        ></div>
        <div
          className="absolute bottom-1/3 -left-32 w-80 h-80 opacity-10 rounded-full blur-3xl"
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
            para sustentar um cuidado atualizado e responsável
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
                      src="/assets/dayara-sorrindo.webp"
                      // src="/assets/day-clinica-pe.webp"
                      alt="Dra. Dayara Salomão - Formação Profissional"
                      width={912}
                      height={1368}
                      className="w-full h-full object-cover"
                      sizes="(min-width: 1024px) 384px, 320px"
                      quality={85}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Qualifications Timeline */}
            <div className="order-1 lg:order-2 space-y-4">
              {PROFESSIONAL_QUALIFICATIONS.map((qualification, index) => {
                const isCurrent = index === PROFESSIONAL_QUALIFICATIONS.length - 1
                return (
                  <div key={index} className="relative">
                    <div
                      className="group card p-4 hover:shadow-lg transition-all duration-300"
                      style={
                        isCurrent
                          ? {
                              borderLeftWidth: '3px',
                              borderLeftColor: 'var(--color-copper)',
                            }
                          : undefined
                      }
                    >
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
                                color: 'var(--color-teal)',
                                backgroundColor: 'rgba(29, 65, 76, 0.1)',
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
            <div className="relative">
              <h3
                className="text-2xl lg:text-3xl font-serif font-bold mb-4"
                style={{ color: 'var(--color-teal)' }}
              >
                Compromisso com atualização contínua
              </h3>
              <p className="text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
                A formação continuada amplia as possibilidades de avaliação e
                tratamento, sempre respeitando a indicação e as particularidades
                de cada paciente.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: 'rgba(29, 65, 76, 0.1)' }}
                  >
                    <GraduationCap
                      className="w-6 h-6"
                      style={{ color: 'var(--color-teal)' }}
                      strokeWidth={1.75}
                    />
                  </div>
                  <h4
                    className="font-semibold mb-1"
                    style={{ color: 'var(--color-teal)' }}
                  >
                    Excelência Acadêmica
                  </h4>
                  <p className="text-sm text-gray-600">
                    Formação em instituições reconhecidas
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: 'rgba(163, 84, 66, 0.1)' }}
                  >
                    <Settings2
                      className="w-6 h-6"
                      style={{ color: 'var(--color-copper)' }}
                      strokeWidth={1.75}
                    />
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
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: 'rgba(209, 175, 139, 0.2)' }}
                  >
                    <TrendingUp
                      className="w-6 h-6"
                      style={{ color: 'var(--color-straw)' }}
                      strokeWidth={1.75}
                    />
                  </div>
                  <h4
                    className="font-semibold mb-1"
                    style={{ color: 'var(--color-teal)' }}
                  >
                    Atualização Constante
                  </h4>
                  <p className="text-sm text-gray-600">
                    Revisão contínua de práticas e evidências
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
