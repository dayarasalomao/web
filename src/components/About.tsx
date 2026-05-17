import Image from 'next/image'

export default function About() {
  return (
    <section
      id="sobre"
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-24 w-72 h-72 bg-beige/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-24 w-72 h-72 bg-teal/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content */}
          <div className="flex-1 max-w-2xl">
            <div>
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-teal mb-6 leading-tight">
                Quem é a Dra. Dayara?
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-copper to-straw mb-8"></div>

              <div className="space-y-6">
                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                  Médica formada em{' '}
                  <span className="font-semibold text-copper">
                    2019 pela PUC-PR
                  </span>
                  , especialista em{' '}
                  <span className="font-semibold text-copper">
                    coloproctologia
                  </span>
                  , dedica-se ao cuidado integral de pacientes com doenças da
                  região anal.
                </p>

                <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                  Sua abordagem combina{' '}
                  <span className="font-medium text-teal">
                    excelência técnica{' '}
                  </span>
                  com{' '}
                  <span className="font-medium text-teal">
                    tratamentos minimamente invasivos
                  </span>
                  , sempre priorizando o conforto e bem-estar de seus pacientes.
                </p>

                <div className="bg-gradient-to-r from-cream to-beige/50 p-6 rounded-2xl border-l-4 border-copper">
                  <p className="text-gray-700 italic leading-relaxed">
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
              <div className="w-80 h-96 lg:w-96 lg:h-[547px] rounded-2xl bg-gradient-to-br from-straw/10 to-teal/10 p-2 shadow-lg">
                <div className="w-full h-full rounded-xl overflow-hidden bg-white shadow-sm">
                  <Image
                    src="/assets/dayara-profissional-escuro.webp"
                    alt="Dra. Dayara Salomão em ambiente profissional"
                    width={400}
                    height={600}
                    className="w-full h-full object-cover"
                    quality={85}
                  />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-straw rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-teal/40 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
