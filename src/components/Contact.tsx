import {
  BUSINESS_ADDRESS_DETAIL,
  BUSINESS_ADDRESS_LINE,
  BUSINESS_CLINIC_NAME,
  CONTACT_EMAIL,
  ECO_TELEPHONE_NUMBER,
  GOOGLE_MAPS_URL,
  WHATSAPP_URL,
} from '@/constants'
import Link from 'next/link'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { Building2, CalendarCheck, MapPin, Mail, Navigation, Phone } from 'lucide-react'

export default function Contact() {
  const contactInfo = [
    {
      label: 'Local',
      value: BUSINESS_CLINIC_NAME,
      detail: 'Setor de Coloproctologia',
      icon: MapPin,
    },
    {
      label: 'Endereço',
      value: BUSINESS_ADDRESS_LINE,
      detail: BUSINESS_ADDRESS_DETAIL,
      icon: Building2,
    },
    {
      label: 'Telefone',
      value: ECO_TELEPHONE_NUMBER,
      detail: 'Agendamento de consultas',
      icon: Phone,
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
            Entre em contato para confirmar horários e receber orientações de
            agendamento.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Contact Information */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group bg-white/80 p-5 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(163, 84, 66, 0.1)' }}
                    >
                      <info.icon
                        className="w-5 h-5"
                        style={{ color: 'var(--color-copper)' }}
                        strokeWidth={1.75}
                      />
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
              <div className="group bg-white/80 p-5 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(163, 84, 66, 0.1)' }}
                  >
                    <Mail
                      className="w-5 h-5"
                      style={{ color: 'var(--color-copper)' }}
                      strokeWidth={1.75}
                    />
                  </div>
                  <div className="flex-1">
                    <span
                      className="font-bold text-xs uppercase tracking-wider block mb-1"
                      style={{ color: 'var(--color-teal)' }}
                    >
                      E-mail
                    </span>
                    <span className="text-base font-semibold text-gray-900 group-hover:opacity-80 transition-opacity duration-300 block">
                      {CONTACT_EMAIL}
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
                <div className="relative">
                  {/* Header with icon */}
                  <div className="text-center mb-8">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: 'rgba(29, 65, 76, 0.1)' }}
                    >
                      <CalendarCheck
                        className="w-6 h-6"
                        style={{ color: 'var(--color-teal)' }}
                        strokeWidth={1.75}
                      />
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
                      className="flex items-center justify-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 px-6 rounded-2xl font-semibold transition-colors duration-300"
                    >
                      <WhatsAppIcon className="w-5 h-5" />
                      <span>WhatsApp</span>
                    </Link>

                    <Link
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl font-semibold transition-colors duration-300 bg-[rgba(163,84,66,0.1)] hover:bg-[rgba(163,84,66,0.16)] text-center border"
                      style={{
                        borderColor: 'var(--color-copper)',
                        color: 'var(--color-copper)',
                      }}
                    >
                      <Mail className="w-5 h-5" strokeWidth={1.75} />
                      <span>E-mail</span>
                    </Link>

                    {GOOGLE_MAPS_URL ? (
                      <Link
                        href={GOOGLE_MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl font-semibold transition-colors duration-300 bg-[rgba(29,65,76,0.08)] hover:bg-[rgba(29,65,76,0.16)] text-center border"
                        style={{
                          borderColor: 'var(--color-teal)',
                          color: 'var(--color-teal)',
                        }}
                      >
                        <Navigation className="w-5 h-5" strokeWidth={1.75} />
                        <span>Como chegar</span>
                      </Link>
                    ) : null}
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
