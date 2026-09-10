import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Stethoscope } from 'lucide-react'
import { CallToActionCard } from '@/components/ui/CallToActionCard'
import { LinkCard } from '@/components/ui/LinkCard'
import { InfoCard } from '@/components/ui/InfoCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Grid, Section, Specimen, Swatch } from './_components/gallery'

/**
 * The design system, rendered from the real tokens and utilities.
 *
 * Not a description of the system — the system itself. Every specimen below is
 * the actual utility class or the actual imported component, so this page
 * cannot drift from the site the way a hand-maintained document does. The old
 * DESIGN.md did exactly that; it is now the prose companion to this route and
 * deliberately leaves visual values to the rendered specimens.
 *
 * Dev and preview only. See .specs/features/design-system-consolidation/spec.md
 * for the build order and the rules this page lives by.
 */

export const metadata: Metadata = {
  title: 'Design System — Dra. Dayara Salomão',
  robots: { index: false, follow: false },
}

const NAV = [
  ['color', 'Cor'],
  ['radius', 'Raio'],
  ['elevation', 'Elevação'],
  ['motion', 'Movimento'],
  ['type', 'Tipografia'],
  ['section-header', 'Cabeçalho'],
  ['link-card', 'Card'],
  ['info-card', 'Informação'],
  ['panels', 'Painéis'],
  ['buttons', 'Botões'],
] as const

export default function DesignSystemPage() {
  // Vercel preview builds run as NODE_ENV=production, so gating on NODE_ENV
  // would hide this page exactly where it is most useful — on a preview URL,
  // on a real phone. VERCEL_ENV is undefined locally and 'preview' on a
  // preview deploy; only real production 404s.
  if (process.env.VERCEL_ENV === 'production') notFound()

  return (
    // White, not the site's cream: the gallery chrome has to read as tooling,
    // and cream specimens need a ground to sit against.
    <main
      id="main-content"
      className="mx-auto min-h-screen max-w-6xl bg-white px-4 py-10 lg:px-8"
    >
      <header className="pb-10">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-gray-400">
          Interno · não indexado · dev e preview
        </p>
        <h1 className="mt-3 font-sans text-3xl font-semibold text-gray-900">
          Design System
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600">
          Cada exemplo abaixo usa a classe ou o componente real. Mudou o token,
          mudou esta página — por isso ela não desatualiza. Os elementos são
          interativos: passe o mouse e navegue com Tab para ver os estados.
        </p>
        <nav className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="font-mono text-xs text-gray-500 underline decoration-gray-300 underline-offset-4 hover:text-gray-900"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <div className="flex flex-col gap-12">
        <Section
          id="color"
          title="Cor"
          intro="Cinco tokens de marca mais três variantes. Nada fora desta lista entra em componentes novos."
        >
          <Grid>
            <Swatch
              name="copper"
              className="bg-copper"
              hex="#A35442"
              usage="Ação, conversão, ênfase"
              inverted
            />
            <Swatch
              name="copper-deep"
              className="bg-copper-deep"
              hex="#8A4436"
              usage="Hover e pressed do copper"
              inverted
            />
            <Swatch
              name="teal"
              className="bg-teal"
              hex="#1D414C"
              usage="Títulos, superfícies escuras"
              inverted
            />
            <Swatch
              name="teal-deep"
              className="bg-teal-deep"
              hex="#16323B"
              usage="Hover do teal, texto forte"
              inverted
            />
            <Swatch
              name="beige"
              className="bg-beige"
              hex="#D7CBBF"
              usage="Fio de borda padrão"
            />
            <Swatch
              name="beige-soft"
              className="bg-beige-soft"
              hex="#EDE6DE"
              usage="Preenchimento suave, chips"
            />
            <Swatch
              name="cream"
              className="bg-cream"
              hex="#F4F3F2"
              usage="Fundo da página, botão sobre teal"
            />
            <Swatch
              name="straw"
              className="bg-straw"
              hex="#D1AF8B"
              usage="Acento decorativo, marcadores"
            />
          </Grid>
          <p className="mt-3 text-xs leading-relaxed text-gray-500">
            As superfícies e ações públicas usam apenas estes tokens. O CTA verde
            isolado de <code className="font-mono">Contact.tsx</code> foi
            substituído pelo botão primário copper.
          </p>
        </Section>

        <Section
          id="radius"
          title="Raio"
          intro="A forma comunica escala: cards repetidos, painéis que estruturam a página e controles compactos."
        >
          <Grid cols="grid-cols-1 md:grid-cols-3">
            {[
              ['rounded-card', '24px', 'Cards de destino e informação'],
              ['rounded-[2rem]', '32px', 'Painéis editoriais e CTAs'],
              ['rounded-full', '9999px', 'Botões, badges e controles circulares'],
            ].map(([cls, px, usage]) => (
              <div key={cls} className="min-w-0">
                <div className={`h-16 bg-teal ${cls}`} aria-hidden="true" />
                <p className="mt-1.5 break-all font-mono text-[0.6875rem] font-semibold text-gray-700">
                  {cls}
                </p>
                <p className="text-[0.6875rem] leading-snug text-gray-500">
                  {px} · {usage}
                </p>
              </div>
            ))}
          </Grid>
          <p className="mt-3 border-l-2 border-teal pl-3 text-xs leading-relaxed text-gray-600">
            <span className="font-mono font-semibold uppercase tracking-wider text-teal">
              decisão · cards usam 1.5rem
            </span>{' '}
            O token <code className="font-mono">rounded-card</code> preserva o
            raio dos cards mais bem avaliados. Raios maiores continuam reservados
            a painéis e composições de página.
          </p>
        </Section>

        <Section
          id="info-card"
          title="Card de informação"
          intro="Superfície não interativa para fatos, depoimentos e itens de trajetória. Não levanta e não mostra seta: esses sinais ficam reservados a destinos."
        >
          <Grid cols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <Specimen label="padrão" source="src/components/ui/InfoCard.tsx">
              <InfoCard>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-copper">
                  Onde é feito
                </p>
                <h3 className="mt-2 font-sans font-semibold text-teal-deep">
                  Hospital Proncor
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  Campo Grande, Mato Grosso do Sul
                </p>
              </InfoCard>
            </Specimen>
            <Specimen label="compacto">
              <InfoCard padding="compact">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-sans font-semibold text-teal">Residência médica</h3>
                  <span className="rounded-full bg-teal/10 px-2 py-0.5 text-xs text-teal">2021</span>
                </div>
                <p className="mt-1 text-sm text-copper">Formação profissional</p>
              </InfoCard>
            </Specimen>
            <Specimen label="ênfase atual" note="A borda copper comunica estado atual sem transformar o card em alvo.">
              <InfoCard padding="compact" accent="copper">
                <h3 className="font-sans font-semibold text-teal">Atualização contínua</h3>
                <p className="mt-1 text-sm text-gray-600">Práticas e evidências revisadas.</p>
              </InfoCard>
            </Specimen>
            <Specimen label="translúcido + espaçoso" ground="white">
              <InfoCard surface="translucent" padding="spacious" className="bg-white/80">
                <p className="text-sm italic leading-relaxed text-gray-700">
                  &ldquo;Atendimento atencioso e explicações claras.&rdquo;
                </p>
              </InfoCard>
            </Specimen>
          </Grid>
        </Section>

        <Section
          id="elevation"
          title="Elevação"
          intro="A sombra é tingida com a cor do próprio elemento, nunca preta, para que os cards assentem sobre o cream em vez de flutuarem acima dele."
        >
          <Grid cols="grid-cols-1 md:grid-cols-3">
            <Specimen label="repouso" note="shadow-sm">
              <div className="h-16 rounded-card border border-beige bg-white shadow-sm" />
            </Specimen>
            <Specimen
              label="elevado"
              note="A sombra do LinkCard no hover e no foco, tingida de teal."
            >
              <div className="h-16 rounded-card border border-copper/70 bg-white shadow-[0_20px_36px_-26px_rgba(29,65,76,0.45)]" />
            </Specimen>
            <Specimen label="superfície escura" ground="cream">
              <div className="h-16 rounded-card bg-teal shadow-[0_20px_36px_-26px_rgba(29,65,76,0.45)]" />
            </Specimen>
          </Grid>
        </Section>

        <Section
          id="motion"
          title="Movimento"
          intro="Contido e curto. Só destinos levantam; superfícies informativas permanecem estáveis."
        >
          <Grid cols="grid-cols-1 md:grid-cols-2">
            <Specimen label="destino · 4px" source="src/components/ui/LinkCard.tsx">
              <div className="h-16 rounded-card border border-beige bg-cream shadow-sm transition-transform duration-300 hover:-translate-y-1" />
            </Specimen>
            <Specimen label="informação · estável" source="src/components/ui/InfoCard.tsx">
              <div className="h-16 rounded-card border border-beige bg-white" />
            </Specimen>
          </Grid>
          <p className="mt-3 text-xs leading-relaxed text-gray-500">
            O <code className="font-mono">.tile</code> já faz isto certo: protege
            o hover com <code className="font-mono">@media (hover: hover)</code>{' '}
            — sem isso o estado gruda depois do toque no celular — e respeita{' '}
            <code className="font-mono">prefers-reduced-motion</code>. Toda
            superfície interativa nova deve fazer o mesmo.
          </p>
        </Section>

        <Section
          id="type"
          title="Tipografia"
          intro="Cinzel para títulos de seção e de página. Montserrat para todo o resto, títulos de card incluídos."
        >
          <div className="flex flex-col gap-5">
            <Specimen
              label="display-lg · Cinzel 48px/600"
              source="font-serif text-5xl"
              ground="white"
            >
              <p className="font-serif text-5xl font-semibold leading-none text-teal">
                Doenças que trato
              </p>
            </Specimen>
            <Specimen
              label="display-md · Cinzel 30px/700"
              source="font-serif text-3xl"
              ground="white"
            >
              <p className="font-serif text-3xl font-bold leading-tight text-teal">
                Tratamentos relacionados
              </p>
            </Specimen>
            <Specimen
              label="card-title · Montserrat 18px/600"
              source="font-sans text-lg"
              ground="white"
              note="Título de card. Sans, não serif — ver a decisão abaixo."
            >
              <p className="font-sans text-lg font-semibold leading-snug text-teal-deep">
                Pós-operatório de cirurgia de hemorroidas: o que esperar de cada
                técnica
              </p>
            </Specimen>
            <Specimen
              label="body-md · Montserrat 16px/400"
              source="font-sans text-base"
              ground="white"
            >
              <p className="max-w-2xl text-base leading-relaxed text-gray-700">
                A consulta começa por uma conversa sem pressa. O exame físico só
                é feito quando é necessário, com privacidade e no seu ritmo.
              </p>
            </Specimen>
            <Specimen
              label="caption-overline · Montserrat 12px/600 · 0.16em"
              source="text-xs uppercase tracking-[0.16em]"
              ground="white"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-copper">
                Áreas de atuação
              </p>
            </Specimen>
          </div>

          <div className="mt-5 border-l-2 border-teal pl-3 text-xs leading-relaxed text-gray-600">
            <p className="font-mono font-semibold uppercase tracking-wider text-teal">
              decisão · títulos de card usam Montserrat
            </p>
            <p className="mt-1.5">
              Cinzel é uma face de display inscricional, sem caixa-baixa real.
              Funciona em título de seção — três a cinco palavras, uma linha. Um
              título de card em português médico (&ldquo;Pós-operatório de
              cirurgia de hemorroidas: o que esperar de cada técnica&rdquo;)
              quebra em três linhas e, em Cinzel, deixa de ser escaneável — que é
              a única função de um título de card. Os acentos agravam:
              ã, ç, é em versalete ficam densos em corpo pequeno.
            </p>
            <p className="mt-1.5">
              Hoje o site faz as duas coisas: a regra global{' '}
              <code className="font-mono">h1–h6</code> em{' '}
              <code className="font-mono">globals.css</code> aplica Cinzel, então
              o card canônico herda serif, enquanto{' '}
              <code className="font-mono">BlogCard.tsx</code> sobrescreve com{' '}
              <code className="font-mono">font-sans</code>. O BlogCard estava
              certo. A regra global permanece; os primitivos de card declaram{' '}
              <code className="font-mono">font-sans</code> explicitamente.
            </p>
          </div>
        </Section>

        <Section
          id="section-header"
          title="Cabeçalho de seção"
          intro="Seis seções da home carregavam este bloco duplicado byte a byte. Agora é um componente. As duas aberturas que o site usa hoje estão lado a lado — a régua copper→straw da home e o overline das subpáginas."
        >
          <div className="flex flex-col gap-5">
            <Specimen
              label="régua · padrão da home"
              source="src/components/ui/SectionHeader.tsx"
              ground="white"
            >
              <SectionHeader
                className="!mb-0"
                title="Doenças que trato"
                lead={
                  <>
                    Especialização em{' '}
                    <span className="font-semibold text-copper">
                      coloproctologia
                    </span>{' '}
                    com tratamentos modernos e minimamente invasivos.
                  </>
                }
              />
            </Specimen>
            <Specimen
              label="overline · padrão das subpáginas"
              source='<SectionHeader eyebrow="…" align="left" />'
              ground="white"
            >
              <SectionHeader
                className="!mb-0"
                align="left"
                eyebrow="Áreas de atuação"
                title="Doenças que trato"
                lead={
                  <>
                    Especialização em{' '}
                    <span className="font-semibold text-copper">
                      coloproctologia
                    </span>{' '}
                    com tratamentos modernos e minimamente invasivos.
                  </>
                }
              />
            </Specimen>
          </div>
          <p className="mt-3 border-l-2 border-teal pl-3 text-xs leading-relaxed text-gray-600">
            <span className="font-mono font-semibold uppercase tracking-wider text-teal">
              decisão · variantes contextuais
            </span>{' '}
            A régua abre seções da homepage; o overline classifica introduções de
            rotas e artigos. As duas formas pertencem ao mesmo componente e
            representam níveis diferentes da hierarquia.
          </p>
        </Section>

        <Section
          id="link-card"
          title="Card de destino"
          intro="O card mais bem avaliado do site, extraído da página de Campo Grande — onde era a mesma className de quarenta linhas colada duas vezes no mesmo arquivo. Todas as variações abaixo são o mesmo componente."
        >
          <Grid cols="grid-cols-1 md:grid-cols-3">
            <Specimen label="ícone + eyebrow + CTA" source="src/components/ui/LinkCard.tsx">
              <LinkCard
                href="/tratamentos/hemorroidectomia-laser-co2"
                icon={Stethoscope}
                eyebrow="Tratamento"
                title="Hemorroidectomia com laser de CO2"
                body="Tecnologia avançada para tratamento minimamente invasivo."
                ctaLabel="Conhecer tratamento"
              />
            </Specimen>
            <Specimen label="só ícone" note="Para grades homogéneas, onde um eyebrow repetiria a mesma palavra em todos os cards.">
              <LinkCard
                href="/tratamentos/hemorroidectomia-laser-co2"
                icon={Stethoscope}
                title="Doença Hemorroidária"
                body="Vasos sanguíneos dilatados ao redor do ânus."
                ctaLabel="Saiba mais"
              />
            </Specimen>
            <Specimen
              label="sem destino"
              note="Sem href: perde a seta, o CTA e a elevação. Uma superfície que não é clicável não deve anunciar que é."
            >
              <LinkCard
                icon={Stethoscope}
                title="Condição sem página própria"
                body="Avaliada em consulta, sem tratamento mapeado no site."
              />
            </Specimen>
          </Grid>
          <p className="mt-3 text-xs leading-relaxed text-gray-500">
            Acessibilidade: o título é a única âncora e um{' '}
            <code className="font-mono">::after</code> esticado cobre o card, então
            a superfície inteira continua clicável mas o nome acessível do link é
            só o título — não eyebrow, corpo e CTA lidos como um link só. Os
            estados de hover espelham em{' '}
            <code className="font-mono">group-focus-within</code>, então o teclado
            vê o que o mouse vê.
          </p>
        </Section>

        <Section
          id="panels"
          title="Painéis"
          intro="O painel claro de fechamento reúne uma conclusão e as próximas ações sem criar mais uma grade de cards."
        >
          <div className="flex flex-col gap-5">
            <Specimen
              label="painel de fechamento"
              source="src/components/ui/CallToActionCard.tsx"
              note="Absorveu os blocos de Treatments.tsx e CV.tsx, que eram a mesma marcação `card p-8 border-2` duas vezes, diferindo só numa borda inline copper/teal."
            >
              <CallToActionCard
                align="center"
                title="Tecnologia aplicada com cuidado"
                body="Cada tratamento depende do diagnóstico, da anatomia e dos objetivos discutidos durante a avaliação."
                actions={
                  <span className="btn btn-secondary">
                    Gostaria de agendar uma consulta?
                  </span>
                }
              />
            </Specimen>
            <Specimen
              label="painel de fechamento sobre teal"
              source="src/components/ui/CallToActionCard.tsx"
              note="A mesma estrutura em uma pausa visual escura; use botões próprios para superfícies escuras."
            >
              <CallToActionCard
                eyebrow="Ainda com dúvidas?"
                tone="teal"
                title="Nenhum artigo substitui uma boa consulta."
                body="Se algum sintoma preocupa você, uma avaliação permite definir os próximos passos com segurança."
                actions={
                  <>
                    <span className="btn btn-soft">Agendar consulta</span>
                    <span className="btn border border-white/25 text-white">Ver tratamentos</span>
                  </>
                }
              />
            </Specimen>
          </div>
        </Section>

        <Section
          id="buttons"
          title="Botões"
          intro="Pílula completa, com sombra tingida da própria cor. Elementos reais — passe o mouse e navegue com Tab."
        >
          <div className="flex flex-col gap-5">
            <Specimen
              label="sobre cream"
              source="globals.css · .btn .btn-primary .btn-secondary .btn-ghost"
            >
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" className="btn btn-primary">
                  Agendar consulta
                </button>
                <button type="button" className="btn btn-secondary">
                  Ver tratamentos
                </button>
                <button type="button" className="btn btn-ghost">
                  Ir para a página inicial
                </button>
                <button type="button" className="btn btn-primary" disabled>
                  Indisponível
                </button>
              </div>
            </Specimen>

            <Specimen
              label="sobre teal"
              source="globals.css · .btn-soft"
              ground="teal"
              note="Copper perde contraste sobre teal, por isso a superfície escura usa cream. Hover desce para beige — cream para branco seria imperceptível."
            >
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" className="btn btn-soft">
                  Agendar consulta agora
                </button>
              </div>
            </Specimen>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-gray-500">
            Hover e foco são os estados reais das classes; use mouse e Tab para
            inspecioná-los. O último botão demonstra o estado disabled real.
          </p>
        </Section>
      </div>

      <footer className="mt-14 border-t border-gray-200 pt-6">
        <p className="text-xs leading-relaxed text-gray-500">
          Próximos passos em{' '}
          <code className="font-mono">
            .specs/features/design-system-consolidation/spec.md
          </code>
          . A galeria importa os primitivos reais e acompanha cada migração.
        </p>
      </footer>
    </main>
  )
}
