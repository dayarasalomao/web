import { WHATSAPP_URL } from '@/constants'
import Link from 'next/link'

export default function Contact() {
  const contactInfo = [
    {
      label: 'Local',
      value: 'Eco Medical Center',
      detail: '3º andar - setor de coloproctologia',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
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
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
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
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 2.051C6.477 2.051 2.051 6.477 2.051 12.017c0 1.734.455 3.407 1.294 4.893L2 21l4.18-1.304c1.424.763 3.019 1.163 4.837 1.163 5.54 0 9.966-4.426 9.966-9.966S17.557 2.051 12.017 2.051z" />
        </svg>
      ),
    },
  ]

  return (
    <section
      id="contato"
      className="pb-12 pt-16 lg:pb-20 lg:pt-24 relative overflow-hidden"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group bg-white/80 p-5 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg  transition-transform duration-300"
                      style={{ backgroundColor: 'var(--color-copper)' }}
                    >
                      <div className="w-6 h-6">{info.icon}</div>
                    </div>
                    <div className="flex-1">
                      <span
                        className="font-bold text-xs uppercase tracking-wider block mb-1"
                        style={{ color: 'var(--color-teal)' }}
                      >
                        {info.label}
                      </span>
                      <span className="text-base font-semibold text-gray-900 block">
                        {info.value}
                      </span>
                      {info.detail && (
                        <span className="text-sm text-gray-600 block mt-0.5">
                          {info.detail}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Email Contact */}
              <div className="group bg-white/80  p-5 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300  relative overflow-hidden">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg  transition-transform duration-300"
                    style={{ backgroundColor: 'var(--color-copper)' }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span
                      className="font-bold text-xs uppercase tracking-wider block mb-1"
                      style={{ color: 'var(--color-teal)' }}
                    >
                      E-mail
                    </span>
                    <span className="text-base font-semibold text-gray-900 group-hover:opacity-80 transition-opacity duration-300 block">
                      dradayarasalomao@gmail.com
                    </span>
                    <span className="text-sm text-gray-600 block mt-0.5">
                      Contato profissional
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col justify-center">
              <div
                className="bg-white/90  p-10 rounded-3xl relative overflow-hidden shadow-lg border"
                style={{ borderColor: 'rgba(163, 84, 66, 0.2)' }}
              >
                {/* Elegant background pattern */}
                <div className="absolute inset-0 opacity-3">
                  <div
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                      backgroundSize: '30px 30px',
                    }}
                  ></div>
                </div>

                <div className="relative">
                  {/* Header with icon */}
                  <div className="text-center mb-8">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                      style={{ backgroundColor: 'var(--color-teal)' }}
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3
                      className="text-2xl lg:text-3xl font-serif font-bold mb-3"
                      style={{ color: 'var(--color-teal)' }}
                    >
                      Agende sua consulta
                    </h3>
                    <p className="text-gray-700 leading-relaxed max-w-sm mx-auto">
                      Cuidado especializado com{' '}
                      <span
                        className="font-semibold"
                        style={{ color: 'var(--color-copper)' }}
                      >
                        excelência técnica
                      </span>{' '}
                      e{' '}
                      <span
                        className="font-semibold"
                        style={{ color: 'var(--color-teal)' }}
                      >
                        acolhimento humano
                      </span>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <Link
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-center py-4 px-6 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-lg  relative overflow-hidden"
                    >
                      {/* Subtle shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:animate-pulse"></div>

                      <div className="flex items-center justify-center gap-3 relative">
                        <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12.017 2.051C6.477 2.051 2.051 6.477 2.051 12.017c0 1.734.455 3.407 1.294 4.893L2 21l4.18-1.304c1.424.763 3.019 1.163 4.837 1.163 5.54 0 9.966-4.426 9.966-9.966S17.557 2.051 12.017 2.051z" />
                          </svg>
                        </div>
                        <span>WhatsApp</span>
                      </div>
                    </Link>

                    <Link
                      href="mailto:dradayarasalomao@gmail.com"
                      className="group block w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg  text-center border-2 relative overflow-hidden"
                      style={{
                        backgroundColor: 'rgba(163, 84, 66, 0.1)',
                        borderColor: 'var(--color-copper)',
                        color: 'var(--color-copper)',
                      }}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <div
                          className="w-6 h-6 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(163, 84, 66, 0.2)' }}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <span>E-mail</span>
                      </div>
                    </Link>
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
