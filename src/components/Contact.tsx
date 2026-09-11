import {
  BUSINESS_ADDRESS_DETAIL,
  BUSINESS_ADDRESS_LINE,
  BUSINESS_CLINIC_NAME,
  BUSINESS_TELEPHONE_NUMBER,
  BUSINESS_TELEPHONE_HREF,
  CONTACT_EMAIL,
  CLINIC_GOOGLE_MAPS_URL,
  WHATSAPP_URL,
} from '@/constants'
import Link from 'next/link'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { InfoCard } from '@/components/ui/InfoCard'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
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
      value: BUSINESS_TELEPHONE_NUMBER,
      detail: 'Agendamento de consultas',
      icon: Phone,
      href: BUSINESS_TELEPHONE_HREF,
      conversion: 'phone-contact',
    },
  ]

  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-gradient-to-br from-beige to-cream pb-12 pt-16 lg:pb-20 lg:pt-24"
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
        <SectionHeader
          title="Local & Agendamento"
          leadWidth="narrow"
          lead="Entre em contato para confirmar horários e receber orientações de agendamento."
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Contact Information */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <InfoCard
                  key={index}
                  surface="translucent"
                  className="relative overflow-hidden !p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-copper/10">
                      <info.icon
                        className="h-5 w-5 text-copper"
                        strokeWidth={1.75}
                      />
                    </div>
                    <div className="flex-1">
                      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-teal">
                        {info.label}
                      </span>
                      {info.href ? (
                        <a
                          href={info.href}
                          data-conversion={info.conversion}
                          className="text-base font-semibold text-gray-900 block underline-offset-2 hover:underline"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-base font-semibold text-gray-900 block">
                          {info.value}
                        </span>
                      )}
                      {info.detail && (
                        <span className="text-sm text-gray-600 block mt-0.5">
                          {info.detail}
                        </span>
                      )}
                    </div>
                  </div>
                </InfoCard>
              ))}

              {/* Email Contact */}
              <InfoCard surface="translucent" className="relative overflow-hidden !p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-copper/10">
                    <Mail
                      className="h-5 w-5 text-copper"
                      strokeWidth={1.75}
                    />
                  </div>
                  <div className="flex-1">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-teal">
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
              </InfoCard>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col justify-center">
              <CallToActionCard
                titleAs="h3"
                align="center"
                className="relative overflow-hidden"
                title="Agende sua consulta"
                body={
                  <>
                    <span className="mb-4 flex justify-center" aria-hidden="true">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/10">
                        <CalendarCheck className="h-6 w-6 text-teal" strokeWidth={1.75} />
                      </span>
                    </span>
                    Cuidado especializado com{' '}
                    <span className="font-semibold text-copper">excelência técnica</span>{' '}
                    e <span className="font-semibold text-teal">acolhimento humano</span>
                  </>
                }
              >
                <div className="space-y-3">
                  <Link
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-conversion="whatsapp-contact"
                    className="btn btn-secondary w-full"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </Link>

                  <Link
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="btn btn-ghost w-full border-copper/30 text-copper hover:border-copper/50"
                  >
                    <Mail className="w-5 h-5" strokeWidth={1.75} />
                    <span>E-mail</span>
                  </Link>

                  {CLINIC_GOOGLE_MAPS_URL ? (
                    <Link
                      href={CLINIC_GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-conversion="maps-contact"
                      className="btn btn-primary w-full"
                    >
                      <Navigation className="w-5 h-5" strokeWidth={1.75} />
                      <span>Como chegar</span>
                    </Link>
                  ) : null}
                </div>
              </CallToActionCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
