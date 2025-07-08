export default function Diseases() {
  const diseases = [
    {
      name: 'Doença Hemorroidária',
      description:
        'Vasos sanguíneos dilatados ao redor do ânus que podem dar sintomas como dor, sangramento, coceira e sensação de umidade.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964m-5.272 21.324l-.32-1.532M13.91 2.999l.32-1.532m2.436 16.873l.94-1.27M6.115 6.07l.94-1.27M12 3v18"
          />
        </svg>
      ),
    },
    {
      name: 'Fissura Anal',
      description:
        'É um corte na borda da região anal que cursa com dor e sangramento.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18m-7.5-6.75h15"
          />
        </svg>
      ),
    },
    {
      name: 'Fístula Anal',
      description:
        'É uma comunicação anômala que ocorre entre o canal anal ou reto com a pele externamente ao ânus. Pode cursar com dor e secreção purulenta.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
          />
        </svg>
      ),
    },
    {
      name: 'Prurido Anal',
      description: 'Coceira da pele do ânus e tecidos ao redor.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 8.25l-1.697 1.697a9.117 9.117 0 01-12.606 0L5 8.25m16 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v2.25m18 0V18a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V8.25m18 0h-7.5L12 6l-1.5 2.25H3"
          />
        </svg>
      ),
    },
    {
      name: 'HPV Anal',
      description:
        'Infecção na região anal pelo papilomavírus humano (HPV) tanto externa quanto internamente.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
          />
        </svg>
      ),
    },
    {
      name: 'Cisto Pilonidal',
      description:
        'É uma infecção na região sacral devido a uma coleção de pêlos embaixo da pele.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      name: 'Constipação',
      description:
        'É a dificuldade de evacuar adequadamente, indo com menos frequência ao banheiro e com as fezes ressecadas.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      name: 'Diarreia Crônica',
      description: 'Aumento da frequência evacuatória e fezes líquidas.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.5 13.5L12 21l-7.5-7.5M12 21V7.5M4.5 15.5l7.5 7.5 7.5-7.5"
          />
        </svg>
      ),
    },
    {
      name: 'Síndrome do Intestino Irritável',
      description:
        'É uma alteração funcional do intestino que cursa com dor abdominal e alteração do padrão evacuatório.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
          />
        </svg>
      ),
    },
    {
      name: 'Hidradenite Supurativa',
      description:
        'É uma doença inflamatória crônica da pele que cursa com nódulos dolorosos, abscessos e fístulas em áreas como virilhas, região genital e axilas.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
          />
        </svg>
      ),
    },
    {
      name: 'Doenças Inflamatórias Intestinais',
      description:
        'Retocolite Ulcerativa e Doença de Crohn, que são doenças imunomediadas que cursam com inflamações específicas do intestino.',
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
          />
        </svg>
      ),
    },
  ]

  return (
    <section
      id="doencas"
      className="py-20 lg:py-32 relative overflow-hidden"
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
              className="group card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundColor: 'rgba(163, 84, 66, 0.1)',
                    color: 'var(--color-copper)',
                  }}
                >
                  {disease.icon}
                </div>
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
            <a href="#contato" className="btn btn-primary">
              Falar com a Dra. Dayara
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
