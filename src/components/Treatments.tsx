import { WHATSAPP_URL } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { getAllTreatments, getTreatmentHrefByCardName } from '@/lib/treatments'

export default function Treatments() {
  const treatments = getAllTreatments()

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
              Tecnologia com indicação individualizada
            </span>{' '}
            e{' '}
            <span
              className="font-semibold"
              style={{ color: 'var(--color-teal)' }}
            >
              técnicas minimamente invasivas
            </span>{' '}
            com foco em precisão e conforto no cuidado
          </p>
        </div>

        {/* First Image - operando-claro.webp - Before treatments (mobile only) */}
        <div className="lg:hidden max-w-4xl mx-auto mb-16">
          <div className="flex justify-center">
            <div className="relative w-80 h-[480px]">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white">
                <Image
                  src="/assets/operando-claro.webp"
                  alt="Dra. Dayara em procedimento especializado"
                  width={751}
                  height={1126}
                  className="w-full h-full object-cover"
                  quality={85}
                />
              </div>

              {/* Subtle accent elements */}
              <div
                className="absolute -top-3 -right-3 w-6 h-6 rounded-full opacity-30"
                style={{ backgroundColor: 'var(--color-copper)' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Enhanced Layout with Left and Right Images */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Image - operando-claro.webp (desktop only) */}
            <div className="hidden lg:flex lg:col-span-3 justify-center">
              <div className="relative w-[240px] h-[360px]">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white">
                  <Image
                    src="/assets/operando-claro.webp"
                    alt="Dra. Dayara em procedimento especializado"
                    width={751}
                    height={1126}
                    className="w-full h-full object-cover"
                    quality={85}
                  />
                </div>

                {/* Subtle accent elements */}
                <div
                  className="absolute -top-3 -right-3 w-6 h-6 rounded-full opacity-30"
                  style={{ backgroundColor: 'var(--color-copper)' }}
                ></div>
              </div>
            </div>

            {/* Treatments List - 2 columns */}
            <div className="lg:col-span-6 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {treatments.map((treatment, index) => {
                  const styles = getCategoryStyles(treatment.category)
                  const href = getTreatmentHrefByCardName(
                    treatment.homeCardTitle,
                  )
                  const content = (
                    <>
                      <div
                        className="absolute top-0 left-0 w-full h-0.5 opacity-30"
                        style={{ backgroundColor: styles.accent }}
                      ></div>

                      <div className="flex h-full items-start gap-3">
                        <div className="flex flex-1 flex-col h-full">
                          <h3
                            className="text-sm font-serif font-semibold mb-1"
                            style={{ color: 'var(--color-teal)' }}
                          >
                            {treatment.homeCardTitle}
                          </h3>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {treatment.homeCardDescription}
                          </p>
                          {href ? (
                            <span className="mt-auto pt-3 inline-flex text-xs font-medium text-copper">
                              Ver detalhes
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </>
                  )

                  if (href) {
                    return (
                      <Link
                        key={index}
                        href={href}
                        className="group card flex h-full p-4 relative overflow-hidden transition-all duration-300 hover:-translate-y-1"
                        style={{
                          backgroundColor: styles.bg,
                          borderColor: styles.border,
                          borderWidth: '1px',
                        }}
                      >
                        {content}
                      </Link>
                    )
                  }

                  return (
                    <div
                      key={index}
                      className="group card flex h-full p-4 relative overflow-hidden"
                      style={{
                        backgroundColor: styles.bg,
                        borderColor: styles.border,
                        borderWidth: '1px',
                      }}
                    >
                      {content}
                    </div>
                  )
                })}
              </div>

              <div className="pt-4 text-center">
                <Link href="/tratamentos" className="btn btn-primary">
                  Ver todos os tratamentos
                </Link>
              </div>
            </div>

            {/* Right Image - operando-longe.webp (desktop only) */}
            <div className="hidden lg:flex lg:col-span-3 justify-center">
              <div className="relative w-[240px] h-[360px]">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white">
                  <Image
                    src="/assets/operando-longe.webp"
                    alt="Dra. Dayara realizando procedimento"
                    width={946}
                    height={1419}
                    className="w-full h-full object-cover"
                    quality={85}
                  />
                </div>

                {/* Subtle accent elements */}
                <div
                  className="absolute -bottom-3 -left-3 w-4 h-4 rounded-full opacity-40"
                  style={{ backgroundColor: 'var(--color-teal)' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Second Image - operando-longe.webp - After treatments (mobile only) */}
        <div className="lg:hidden max-w-4xl mx-auto mt-16">
          <div className="flex justify-center">
            <div className="relative w-80 h-[480px]">
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white">
                <Image
                  src="/assets/operando-longe.webp"
                  alt="Dra. Dayara realizando procedimento"
                  width={946}
                  height={1419}
                  className="w-full h-full object-cover"
                  quality={85}
                />
              </div>

              {/* Subtle accent elements */}
              <div
                className="absolute -bottom-3 -left-3 w-4 h-4 rounded-full opacity-40"
                style={{ backgroundColor: 'var(--color-teal)' }}
              ></div>
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
                Tecnologia aplicada com cuidado
              </h3>
              <p className="text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
                Cada tratamento depende do diagnóstico, da anatomia e dos
                objetivos discutidos durante a avaliação.
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
