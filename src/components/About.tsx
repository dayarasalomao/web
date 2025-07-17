import Image from 'next/image'

export default function About() {
  return (
    <section
      id="sobre"
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-24 w-72 h-72 bg-brand-beige/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-24 w-72 h-72 bg-secondary-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content */}
          <div className="flex-1 max-w-2xl">
            <div className="animate-slide-up">
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-primary-800 mb-6 leading-tight">
                Quem é a Dra. Dayara?
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-brand-straw mb-8"></div>

              <div className="space-y-6">
                <p className="text-lg lg:text-xl text-neutral-700 leading-relaxed">
                  Médica formada em{' '}
                  <span className="font-semibold text-primary-600">
                    2019 pela PUC-PR
                  </span>
                  , especialista em{' '}
                  <span className="font-semibold text-primary-600">
                    coloproctologia
                  </span>
                  , dedica-se ao cuidado integral de pacientes com doenças da
                  região anal.
                </p>

                <p className="text-base lg:text-lg text-neutral-600 leading-relaxed">
                  Sua abordagem combina{' '}
                  <span className="font-medium text-secondary-600">
                    excelência técnica{' '}
                  </span>
                  com{' '}
                  <span className="font-medium text-secondary-600">
                    tratamentos minimamente invasivos
                  </span>
                  , sempre priorizando o conforto e bem-estar de seus pacientes.
                </p>

                <div className="bg-gradient-to-r from-brand-light-beige to-brand-beige/50 p-6 rounded-2xl border-l-4 border-primary-500">
                  <p className="text-neutral-700 italic leading-relaxed">
                    &quot;Acredito que cada paciente merece um cuidado
                    personalizado, com empatia e acolhimento, utilizando as mais
                    modernas tecnologias para garantir os melhores resultados
                    com o mínimo de desconforto.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-80 h-128 lg:w-96 lg:h-128 rounded-2xl bg-gradient-to-br from-brand-straw/10 to-primary-100/20 p-2 shadow-elegant">
                <div className="w-full h-full rounded-xl overflow-hidden bg-white shadow-soft">
                  <Image
                    src="/assets/dayara-profissional-escuro.JPG"
                    alt="Dra. Dayara Salomão em ambiente profissional"
                    width={400}
                    height={600}
                    className="w-full h-full object-cover"
                    quality={100}
                  />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-straw rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary-300/40 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
