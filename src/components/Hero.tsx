import { WHATSAPP_URL } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative py-14 lg:py-20 overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #ffffff 0%, var(--color-cream) 100%)',
      }}
    >
      {/* Elegant background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-96 h-96 opacity-70 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--color-straw)' }}
        ></div>
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 opacity-10 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--color-copper)' }}
        ></div>

        {/* Subtle decorative pattern */}
        <div className="absolute inset-0 opacity-2">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 75%, var(--color-beige) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Doctor's Image */}
          <div className="order-1 lg:order-2 flex-shrink-0">
            <div className="relative">
              {/* Main image container */}
              <div
                className="w-[344px] h-[432px] lg:w-[384px] lg:h-[576px] p-3 shadow-lg"
                style={{ backgroundColor: 'rgba(163, 84, 66, 0.08)' }}
              >
                <div
                  className="w-full h-full overflow-hidden bg-white shadow-lg border-4"
                  style={{ borderColor: 'var(--color-cream)' }}
                >
                  <Image
                    src="/assets/dayara-profissional-vermelho.JPG"
                    alt="Dra. Dayara Salomão"
                    width={912}
                    height={1368}
                    className="w-full h-full object-contain scale-125"
                    priority
                    quality={100}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1 max-w-2xl">
            <div className="animate-slide-up">
              <div className="mb-6">
                <Image
                  src="/core/lettering-blue.png"
                  alt="Dra. Dayara Salomão"
                  width={400}
                  height={120}
                  className="w-full max-w-md lg:max-w-lg mx-auto lg:mx-0 h-auto"
                  priority
                  quality={100}
                />
              </div>
              <div
                className="w-20 h-1 mx-auto lg:mx-0 mb-6"
                style={{
                  background:
                    'linear-gradient(90deg, var(--color-copper), var(--color-straw))',
                }}
              ></div>

              <p className="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed font-light">
                Especialista em{' '}
                <span
                  className="font-semibold"
                  style={{ color: 'var(--color-copper)' }}
                >
                  coloproctologia
                </span>{' '}
                oferecendo tratamento minimamente invasivo com{' '}
                <span
                  className="font-semibold"
                  style={{ color: 'var(--color-copper)' }}
                >
                  laser e tecnologias avançadas
                </span>{' '}
                para doenças da região anal.
              </p>

              <p className="text-base lg:text-lg text-gray-600 mb-10 leading-relaxed">
                Cuidado especializado com{' '}
                <span
                  className="font-medium"
                  style={{ color: 'var(--color-teal)' }}
                >
                  excelência técnica
                </span>
                ,{' '}
                <span
                  className="font-medium"
                  style={{ color: 'var(--color-teal)' }}
                >
                  empatia
                </span>{' '}
                e{' '}
                <span
                  className="font-medium"
                  style={{ color: 'var(--color-teal)' }}
                >
                  acolhimento
                </span>{' '}
                para seu bem-estar.
              </p>

              {/* Professional credentials */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
                {/* <div
                  className="px-4 py-2 rounded-full border text-xs"
                  style={{
                    backgroundColor: 'rgba(29, 65, 76, 0.1)',
                    borderColor: 'var(--color-teal)',
                    color: 'var(--color-teal)',
                  }}
                >
                  Técnicas Minimamente Invasivas
                </div> */}
                <div
                  className="px-4 py-2 rounded-full border text-xs"
                  style={{
                    backgroundColor: 'rgba(29, 65, 76, 0.1)',
                    borderColor: 'var(--color-teal)',
                    color: 'var(--color-teal)',
                  }}
                >
                  Membro da Sociedade Brasileira de Coloproctologia
                </div>
                <div
                  className="px-4 py-2 rounded-full border text-xs"
                  style={{
                    backgroundColor: 'rgba(29, 65, 76, 0.1)',
                    borderColor: 'var(--color-teal)',
                    color: 'var(--color-teal)',
                  }}
                >
                  Membro da Sociedade Brasileira de Laser em Medicina e Cirurgia
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary text-lg px-8 py-4"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Agendar Consulta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
