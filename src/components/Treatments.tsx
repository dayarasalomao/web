import { Stethoscope } from 'lucide-react'
import { WHATSAPP_URL } from '@/constants'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { LinkCard } from '@/components/ui/LinkCard'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import Image from 'next/image'
import Link from 'next/link'
import { getFeaturedHomeTreatments, getTreatmentHref } from '@/lib/treatments'

export default function Treatments() {
  const treatments = getFeaturedHomeTreatments()
  return (
    <section
      id="tratamentos"
      className="pb-12 pt-16 lg:pb-20 lg:pt-24 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-cream)' }}
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 75%, var(--color-beige) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <SectionHeader
          title="Tratamentos em destaque"
          lead={
            <>
              Procedimentos e tecnologias disponíveis para casos selecionados, sempre
              definidos após uma{' '}
              <span className="font-semibold text-copper">avaliação individualizada</span>
            </>
          }
        />

        {/* First procedure image - before treatments (mobile only) */}
        <div className="mx-auto mb-12 max-w-4xl lg:hidden">
          <div className="flex justify-center">
            <div className="relative h-[400px] w-72">
              <div className="relative h-full w-full overflow-hidden rounded-card border-4 border-white bg-white shadow-lg">
                <Image
                  src="/assets/operando-claro-espelhado.webp"
                  alt="Dra. Dayara em procedimento especializado"
                  width={751}
                  height={1126}
                  className="w-full h-full object-cover"
                  quality={85}
                />
              </div>

              {/* Subtle accent elements */}
              <div
                className="absolute -top-3 -right-3 w-6 h-6 rounded-full opacity-30"
                style={{ backgroundColor: 'var(--color-copper)' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Enhanced Layout with Left and Right Images */}
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
            {/* Left procedure image (desktop only) */}
            <div className="hidden justify-center lg:col-span-3 lg:flex">
              <div className="relative min-h-[32rem] w-full max-w-[260px]">
                <div className="relative h-full w-full overflow-hidden rounded-card border-4 border-white bg-white shadow-lg">
                  <Image
                    src="/assets/operando-claro-espelhado.webp"
                    alt="Dra. Dayara em procedimento especializado"
                    width={751}
                    height={1126}
                    className="w-full h-full object-cover"
                    quality={85}
                  />
                </div>

                {/* Subtle accent elements */}
                <div
                  className="absolute -top-3 -right-3 w-6 h-6 rounded-full opacity-30"
                  style={{ backgroundColor: 'var(--color-copper)' }}
                ></div>
              </div>
            </div>

            {/* Treatments List - 2 columns */}
            <div className="lg:col-span-6 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* The category accent stripe that used to sit on top of each
                    card is gone. It painted copper / teal / straw for laser /
                    conservative / innovative, but nothing on the page said so —
                    an unlabelled colour is decoration pretending to be data, and
                    at 40% opacity it read as a rendering artifact. If the
                    category is worth surfacing it belongs in the eyebrow, in
                    words a patient can read. */}
                {treatments.map((treatment) => (
                  <LinkCard
                    key={treatment.slug}
                    density="compact"
                    icon={Stethoscope}
                    href={getTreatmentHref(treatment.slug)}
                    title={treatment.homeCardTitle}
                    body={treatment.homeCardDescription}
                    ctaLabel="Ver detalhes"
                  />
                ))}
              </div>

              <div className="pt-4 text-center">
                <Link href="/tratamentos" className="btn btn-primary">
                  Ver todos os tratamentos
                </Link>
              </div>
            </div>

            {/* Right Image - operando-longe.webp (desktop only) */}
            <div className="hidden justify-center lg:col-span-3 lg:flex">
              <div className="relative min-h-[32rem] w-full max-w-[260px]">
                <div className="relative h-full w-full overflow-hidden rounded-card border-4 border-white bg-white shadow-lg">
                  <Image
                    src="/assets/operando-longe.webp"
                    alt="Dra. Dayara realizando procedimento"
                    width={946}
                    height={1419}
                    className="w-full h-full object-cover"
                    quality={85}
                  />
                </div>

                {/* Subtle accent elements */}
                <div
                  className="absolute -bottom-3 -left-3 w-4 h-4 rounded-full opacity-40"
                  style={{ backgroundColor: 'var(--color-teal)' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <CallToActionCard
          className="mx-auto mt-12 max-w-7xl lg:mt-20"
          align="center"
          title="Tecnologia aplicada com cuidado"
          body="Cada tratamento depende do diagnóstico, da anatomia e dos objetivos discutidos durante a avaliação."
          actions={
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-conversion="whatsapp-treatments-section"
              className="btn btn-secondary"
            >
              Gostaria de agendar uma consulta?
            </Link>
          }
        />
      </div>
    </section>
  )
}
