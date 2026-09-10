import Image from 'next/image'
import { GraduationCap, Settings2, TrendingUp } from 'lucide-react'
import { PROFESSIONAL_QUALIFICATIONS } from '@/lib/profile'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { InfoCard } from '@/components/ui/InfoCard'

const CONTINUING_EDUCATION = [
  {
    title: 'Excelência Acadêmica',
    description: 'Formação em instituições reconhecidas',
    Icon: GraduationCap,
  },
  {
    title: 'Especialização Avançada',
    description: 'Técnicas minimamente invasivas',
    Icon: Settings2,
  },
  {
    title: 'Atualização Constante',
    description: 'Revisão contínua de práticas e evidências',
    Icon: TrendingUp,
  },
] as const

export default function CV() {
  return (
    <section
      id="curriculo"
      className="pb-12 pt-16 lg:pb-20 lg:pt-24 relative overflow-hidden"
      style={{ background: 'var(--color-cream)' }}
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/3 -right-32 w-80 h-80 opacity-10 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--color-copper)' }}
        ></div>
        <div
          className="absolute bottom-1/3 -left-32 w-80 h-80 opacity-10 rounded-full blur-3xl"
          style={{ backgroundColor: 'var(--color-teal)' }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <SectionHeader
          title="Formação e Experiência"
          lead={
            <>
              Uma trajetória de{' '}
              <span className="font-semibold text-copper">
                excelência acadêmica
              </span>{' '}
              e
              <span className="font-semibold text-teal">
                {' '}
                especialização contínua
              </span>{' '}
              para sustentar um cuidado atualizado e responsável
            </>
          }
        />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-12">
            {/* Professional Photo */}
            <div className="order-2 lg:order-1 flex justify-center lg:justify-start h-full items-center">
              <div className="relative lg:w-full">
                <div
                  className="w-80 h-96 lg:h-[547px] lg:w-full rounded-2xl p-2 shadow-lg"
                  style={{ backgroundColor: 'rgba(29, 65, 76, 0.1)' }}
                >
                  <div className="w-full h-full rounded-xl overflow-hidden bg-white shadow-lg">
                    {/* FIXME: Width and Height are not correct */}
                    <Image
                      src="/assets/dayara-sorrindo.webp"
                      // src="/assets/day-clinica-pe.webp"
                      alt="Dra. Dayara Salomão - Formação Profissional"
                      width={912}
                      height={1368}
                      className="w-full h-full object-cover"
                      sizes="(min-width: 1024px) 416px, 320px"
                      quality={85}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Qualifications Timeline */}
            <div className="order-1 lg:order-2 space-y-4">
              {PROFESSIONAL_QUALIFICATIONS.map((qualification, index) => {
                const isCurrent = index === PROFESSIONAL_QUALIFICATIONS.length - 1
                return (
                  <div key={index} className="relative">
                    <InfoCard padding="compact" accent={isCurrent ? 'copper' : undefined}>
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-sans text-base font-semibold text-teal">
                              {qualification.title}
                            </h3>
                            <span className="whitespace-nowrap rounded-full bg-teal/10 px-2 py-0.5 text-xs font-medium text-teal">
                              {qualification.year}
                            </span>
                          </div>
                          <p className="mb-1 text-sm font-medium text-copper">
                            {qualification.institution}
                          </p>
                          <p className="text-xs text-gray-800 leading-relaxed">
                            {qualification.description}
                          </p>
                        </div>
                      </div>
                    </InfoCard>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <CallToActionCard
          className="mx-auto mt-20 max-w-7xl"
          align="center"
          title="Compromisso com atualização contínua"
          body="A formação continuada amplia as possibilidades de avaliação e tratamento, sempre respeitando a indicação e as particularidades de cada paciente."
        >
          <ul className="grid border-y border-beige text-left sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:divide-beige">
            {CONTINUING_EDUCATION.map(({ title, description, Icon }) => (
              <li
                key={title}
                className="flex items-start gap-3 border-b border-beige py-5 last:border-b-0 sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:pr-0"
              >
                <Icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-copper"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold leading-snug text-teal-deep">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </CallToActionCard>

      </div>
    </section>
  )
}
