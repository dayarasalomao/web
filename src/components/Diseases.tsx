import { InlinePromptCta } from '@/components/ui/InlinePromptCta'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { LinkCard } from '@/components/ui/LinkCard'
import { Stethoscope } from 'lucide-react'
import { getTreatmentHrefByDiseaseName } from '@/lib/treatments'

export default function Diseases() {
  const diseases = [
    {
      name: 'Doença Hemorroidária',
      description:
        'Vasos sanguíneos dilatados ao redor do ânus que podem dar sintomas como dor, sangramento, coceira e sensação de umidade.',
    },
    {
      name: 'Fissura Anal',
      description:
        'É um corte na borda da região anal que cursa com dor e sangramento.',
    },
    {
      name: 'Fístula Anal',
      description:
        'É uma comunicação anômala que ocorre entre o canal anal ou reto com a pele externamente ao ânus. Pode cursar com dor e secreção purulenta.',
    },
    {
      name: 'Prurido Anal',
      description: 'Coceira da pele do ânus e tecidos ao redor.',
    },
    {
      name: 'HPV Anal',
      description:
        'Infecção na região anal pelo papilomavírus humano (HPV) tanto externa quanto internamente.',
    },
    {
      name: 'Cisto Pilonidal',
      description:
        'É uma infecção na região sacral devido a uma coleção de pêlos embaixo da pele.',
    },
    {
      name: 'Constipação',
      description:
        'É a dificuldade de evacuar adequadamente, indo com menos frequência ao banheiro e com as fezes ressecadas.',
    },
    {
      name: 'Diarreia Crônica',
      description: 'Aumento da frequência evacuatória e fezes líquidas.',
    },
    {
      name: 'Síndrome do Intestino Irritável',
      description:
        'É uma alteração funcional do intestino que cursa com dor abdominal e alteração do padrão evacuatório.',
    },
    {
      name: 'Hidradenite Supurativa',
      description:
        'É uma doença inflamatória crônica da pele que cursa com nódulos dolorosos, abscessos e fístulas em áreas como virilhas, região genital e axilas.',
    },
    {
      name: 'Doenças Inflamatórias Intestinais',
      description:
        'Retocolite Ulcerativa e Doença de Crohn, que são doenças imunomediadas que cursam com inflamações específicas do intestino.',
    },
  ]

  /**
   * The homepage shows the leading conditions, not the whole list. Eleven
   * cards made the section a wall to scroll past rather than a set to read,
   * and the ones below the fold were the least searched. The full list stays
   * in this file: every condition still has a treatment page, reachable from
   * the "Ver todos os tratamentos" link in the section below and from the
   * sitemap, so nothing is orphaned by showing fewer here.
   */
  const HOMEPAGE_DISEASE_COUNT = 6
  const visibleDiseases = diseases.slice(0, HOMEPAGE_DISEASE_COUNT)

  const mdLastRowCount = visibleDiseases.length % 2
  const lgLastRowCount = visibleDiseases.length % 3

  const getDiseaseCardGridClass = (index: number) => {
    const classes = ['md:col-span-2', 'lg:col-span-2']

    if (mdLastRowCount === 1 && index === visibleDiseases.length - 1) {
      classes.push('md:col-start-2')
    }

    if (lgLastRowCount === 1 && index === visibleDiseases.length - 1) {
      classes.push('lg:col-start-3')
    }

    if (lgLastRowCount === 2) {
      if (index === visibleDiseases.length - 2) {
        classes.push('lg:col-start-2')
      }

      if (index === visibleDiseases.length - 1) {
        classes.push('lg:col-start-4')
      }
    }

    return classes.join(' ')
  }

  return (
    <section
      id="doencas"
      className="pb-12 pt-16 lg:pb-20 lg:pt-24 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--color-cream)',
      }}
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, var(--color-beige) 1px, transparent 1px),
                           radial-gradient(circle at 80% 20%, var(--color-beige) 1px, transparent 1px)`,
            backgroundSize: '80px 80px, 120px 120px',
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <SectionHeader
          title="Doenças que trato"
          lead={
            <>
              Especialização em{' '}
              <span className="font-semibold text-copper">coloproctologia</span>{' '}
              com tratamentos modernos e minimamente invasivos para diversas
              condições
            </>
          }
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-6">
          {visibleDiseases.map((disease, index) => {
            const href = getTreatmentHrefByDiseaseName(disease.name)
            const cardGridClass = getDiseaseCardGridClass(index)

            return (
              <LinkCard
                key={index}
                href={href}
                icon={Stethoscope}
                title={disease.name}
                body={disease.description}
                ctaLabel="Saiba mais"
                className={cardGridClass}
              />
            )
          })}
        </div>

        <div className="text-center mt-12">
          <InlinePromptCta
            className="mx-auto max-w-7xl"
            title="Não encontrou sua condição?"
            description="A página de tratamentos reúne todas as condutas e as condições atendidas em cada uma."
            href="/tratamentos"
            ctaLabel="Ver todos os tratamentos"
          />
        </div>
      </div>
    </section>
  )
}
