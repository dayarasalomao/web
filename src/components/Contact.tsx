export default function Contact() {
  const contactInfo = [
    {
      label: 'Local',
      value: 'Eco Medical Center',
      detail: '3º andar - setor de coloproctologia',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      label: 'Endereço',
      value: 'Rua Góias, 70 - Água Verde',
      detail: 'Curitiba, Paraná',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      value: '(41) 3123-6550',
      detail: 'Agendamento de consultas',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 2.051C6.477 2.051 2.051 6.477 2.051 12.017c0 1.734.455 3.407 1.294 4.893L2 21l4.18-1.304c1.424.763 3.019 1.163 4.837 1.163 5.54 0 9.966-4.426 9.966-9.966S17.557 2.051 12.017 2.051z" />
        </svg>
      ),
    },
  ]

  return (
    <section
      id="contato"
      className="py-20 lg:py-32 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, var(--color-beige) 0%, var(--color-cream) 100%)',
      }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, var(--color-copper) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2
            className="text-3xl lg:text-5xl font-serif font-bold mb-6"
            style={{ color: 'var(--color-teal)' }}
          >
            Local &amp; Agendamento
          </h2>
          <div
            className="w-20 h-1 mx-auto mb-6"
            style={{
              background:
                'linear-gradient(90deg, var(--color-copper), var(--color-straw))',
            }}
          ></div>
          <p className="text-lg lg:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Entre em contato para agendar sua consulta e receber o melhor
            tratamento especializado
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="card p-6 group hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300"
                      style={{ backgroundColor: 'var(--color-copper)' }}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <span
                        className="font-semibold text-sm uppercase tracking-wide block mb-1"
                        style={{ color: 'var(--color-teal)' }}
                      >
                        {info.label}
                      </span>
                      <span className="text-lg font-medium text-gray-900">
                        {info.value}
                      </span>
                      {info.detail && (
                        <span className="text-sm text-gray-600 block mt-1">
                          {info.detail}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Email Contact */}
              <div className="card p-6 group hover:shadow-lg transition-all duration-300">
                <a
                  href="mailto:dradayarasalomao@gmail.com"
                  className="flex items-center gap-4"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300"
                    style={{ backgroundColor: 'var(--color-copper)' }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <span
                      className="font-semibold text-sm uppercase tracking-wide block mb-1"
                      style={{ color: 'var(--color-teal)' }}
                    >
                      E-mail
                    </span>
                    <span className="text-lg font-medium text-gray-900 group-hover:text-opacity-80 transition-all duration-300">
                      dradayarasalomao@gmail.com
                    </span>
                    <span className="text-sm text-gray-600 block mt-1">
                      Contato profissional
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col justify-center">
              <div
                className="card p-8 relative overflow-hidden border-2"
                style={{ borderColor: 'var(--color-copper)' }}
              >
                {/* Decorative elements */}
                <div
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-10"
                  style={{ backgroundColor: 'var(--color-copper)' }}
                ></div>
                <div
                  className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-10"
                  style={{ backgroundColor: 'var(--color-teal)' }}
                ></div>

                <div className="relative">
                  <h3
                    className="text-2xl lg:text-3xl font-serif font-bold mb-6 text-center"
                    style={{ color: 'var(--color-teal)' }}
                  >
                    Agende sua consulta
                  </h3>
                  <p className="text-gray-700 text-center mb-8 leading-relaxed">
                    Cuide da sua saúde com quem entende do assunto. Tratamentos
                    personalizados e tecnologia de ponta.
                  </p>

                  <div className="space-y-4">
                    <a
                      href="https://wa.me/554131236550"
                      className="group block w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.017 2.051C6.477 2.051 2.051 6.477 2.051 12.017c0 1.734.455 3.407 1.294 4.893L2 21l4.18-1.304c1.424.763 3.019 1.163 4.837 1.163 5.54 0 9.966-4.426 9.966-9.966S17.557 2.051 12.017 2.051z" />
                        </svg>
                        WhatsApp - (41) 3123-6550
                      </div>
                    </a>

                    <a
                      href="mailto:dradayarasalomao@gmail.com"
                      className="btn btn-primary w-full justify-center"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        E-mail
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
