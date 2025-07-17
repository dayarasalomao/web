import { WHATSAPP_URL } from '@/constants'
import Link from 'next/link'

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

  return (
    <section
      id="doencas"
      className="pb-12 pt-16 lg:pb-20 lg:pt-24 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--color-cream)',
      }}
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-3">
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
        <div className="text-center mb-16">
          <h2
            className="text-3xl lg:text-5xl font-serif font-bold mb-6"
            style={{ color: 'var(--color-teal)' }}
          >
            Doenças que trato
          </h2>
          <div
            className="w-20 h-1 mx-auto mb-6"
            style={{
              background:
                'linear-gradient(90deg, var(--color-copper), var(--color-straw))',
            }}
          ></div>
          <p className="text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Especialização em{' '}
            <span
              className="font-semibold"
              style={{ color: 'var(--color-copper)' }}
            >
              coloproctologia
            </span>{' '}
            com tratamentos modernos e minimamente invasivos para diversas
            condições
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diseases.map((disease, index) => (
            <div
              key={index}
              className="group card p-6 hover:shadow-lg transition-all duration-300 "
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3
                    className="text-lg font-serif font-semibold mb-2 group-hover:opacity-80 transition-opacity duration-300"
                    style={{ color: 'var(--color-teal)' }}
                  >
                    {disease.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {disease.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div
            className="card p-6 max-w-2xl mx-auto border"
            style={{ borderColor: 'var(--color-beige)' }}
          >
            <p className="text-gray-700 mb-4">
              <span
                className="font-semibold"
                style={{ color: 'var(--color-copper)' }}
              >
                Não encontrou sua condição?
              </span>
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Entre em contato para uma avaliação personalizada. Cada caso é
              único e merece atenção especializada.
            </p>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Falar com a Dra. Dayara
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
