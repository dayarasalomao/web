import Image from 'next/image'

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
          className="absolute -top-24 -right-24 w-96 h-96 opacity-3 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--color-straw)' }}
        ></div>
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 opacity-3 rounded-full blur-3xl"
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
                className="w-72 h-72 lg:w-96 lg:h-96 rounded-full p-3 shadow-2xl"
                style={{ backgroundColor: 'rgba(163, 84, 66, 0.08)' }}
              >
                <div
                  className="w-full h-full rounded-full overflow-hidden bg-white shadow-lg border-4"
                  style={{ borderColor: 'var(--color-cream)' }}
                >
                  <Image
                    src="/assets/dayara-pessoal.jpg"
                    alt="Dra. Dayara Salomão"
                    width={384}
                    height={384}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Elegant floating elements */}
              <div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-full shadow-lg flex items-center justify-center"
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
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>

              <div
                className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full shadow-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-teal)' }}
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>

              <div
                className="absolute top-1/3 -left-8 w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-straw)' }}
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
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
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
                    backgroundColor: 'rgba(163, 84, 66, 0.1)',
                    borderColor: 'var(--color-copper)',
                    color: 'var(--color-copper)',
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
                <div
                  className="px-4 py-2 rounded-full border text-sm"
                  style={{
                    backgroundColor: 'rgba(209, 175, 139, 0.1)',
                    borderColor: 'var(--color-straw)',
                    color: 'var(--color-straw)',
                  }}
                >
                  Técnicas Minimamente Invasivas
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#contato"
                  className="btn btn-primary text-lg px-8 py-4"
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Agendar Consulta
                </a>
                <a
                  href="#sobre"
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
