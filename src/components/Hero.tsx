import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative py-20 lg:py-32 overflow-hidden"
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
                className="w-72 h-72 lg:w-96 lg:h-96 rounded-full p-3 shadow-lg"
                style={{ backgroundColor: 'rgba(163, 84, 66, 0.08)' }}
              >
                <div
                  className="w-full h-full rounded-full overflow-hidden bg-white shadow-lg border-4"
                  style={{ borderColor: 'var(--color-cream)' }}
                >
                  <Image
                    src="/assets/dayara-pessoal.jpg"
                    alt="Dra. Dayara Salomão"
                    width={400}
                    height={400}
                    className="w-full h-full object-contain scale-125"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1 max-w-2xl">
            <div className="animate-slide-up">
              <h1
                className="text-4xl lg:text-6xl font-serif font-bold mb-6 leading-tight"
                style={{ color: 'var(--color-teal)' }}
              >
                Dra. Dayara Salomão
              </h1>
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
                <div
                  className="px-4 py-2 rounded-full border text-sm"
                  style={{
                    backgroundColor: 'rgba(29, 65, 76, 0.1)',
                    borderColor: 'var(--color-teal)',
                    color: 'var(--color-teal)',
                  }}
                >
                  Técnicas Minimamente Invasivas
                </div>
                <div
                  className="px-4 py-2 rounded-full border text-sm"
                  style={{
                    backgroundColor: 'rgba(29, 65, 76, 0.1)',
                    borderColor: 'var(--color-teal)',
                    color: 'var(--color-teal)',
                  }}
                >
                  CRM Ativo
                </div>
                <div
                  className="px-4 py-2 rounded-full border text-sm"
                  style={{
                    backgroundColor: 'rgba(29, 65, 76, 0.1)',
                    borderColor: 'var(--color-teal)',
                    color: 'var(--color-teal)',
                  }}
                >
                  Especialista RQE
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="#contato"
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
