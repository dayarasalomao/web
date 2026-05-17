import type { BlogPost } from '@/lib/blog'
import { getPostBySlug } from '@/lib/blog'

export type TreatmentCategory = 'laser' | 'conservative' | 'innovative'

export interface Treatment {
  slug: string
  title: string
  shortTitle: string
  homeCardTitle: string
  homeCardDescription: string
  category: TreatmentCategory
  metaTitle: string
  metaDescription: string
  summary: string
  overview: string[]
  indications: string[]
  benefits: string[]
  carePath: string[]
  relatedBlogSlugs: string[]
  mappedDiseaseNames: string[]
  keywords: string[]
  lastUpdated: string
}

export const TREATMENTS: Treatment[] = [
  {
    slug: 'hemorroidectomia-laser-co2',
    title: 'Hemorroidectomia com laser de CO2',
    shortTitle: 'Laser de CO2 para hemorroidas',
    homeCardTitle: 'Cirurgias de hemorroidas com laser de CO2',
    homeCardDescription: 'Tecnologia avançada para tratamento minimamente invasivo',
    category: 'laser',
    metaTitle: 'Hemorroidectomia com laser de CO2 | Dra. Dayara Salomão',
    metaDescription:
      'Tratamento cirúrgico para hemorroidas com precisão, menor trauma tecidual e recuperação orientada com a Dra. Dayara Salomão.',
    summary:
      'Procedimento indicado para casos selecionados de doença hemorroidária com foco em precisão cirúrgica, controle do trauma local e recuperação mais confortável.',
    overview: [
      'A hemorroidectomia com laser de CO2 é uma opção cirúrgica para pacientes com sintomas persistentes, prolapsos importantes ou crises recorrentes que já não respondem bem às medidas clínicas.',
      'A tecnologia busca maior precisão no tratamento dos tecidos, o que contribui para uma abordagem mais delicada e alinhada ao cuidado minimamente invasivo sempre que a indicação cirúrgica estiver bem estabelecida.',
    ],
    indications: [
      'Hemorroidas internas ou externas sintomáticas com sangramento, dor ou prolapso.',
      'Crises frequentes apesar de ajuste alimentar, medicações e medidas locais.',
      'Quadros em que a avaliação mostra benefício real de uma abordagem cirúrgica.',
    ],
    benefits: [
      'Precisão no tratamento dos tecidos da região anal.',
      'Planejamento cirúrgico individualizado conforme o estágio da doença.',
      'Recuperação acompanhada com orientação específica para dor, evacuação e retorno progressivo à rotina.',
    ],
    carePath: [
      'A consulta define se existe indicação para cirurgia e qual técnica faz mais sentido para o seu caso.',
      'No pós-operatório, o seguimento inclui controle da dor, cuidados locais e estratégias para evitar evacuação traumática.',
    ],
    relatedBlogSlugs: ['hemorroidectomia-laser-co2'],
    mappedDiseaseNames: ['Doença Hemorroidária'],
    keywords: ['hemorroidectomia laser CO2', 'cirurgia hemorroidas', 'tratamento hemorroidas'],
    lastUpdated: '2026-04-17',
  },
  {
    slug: 'hemorroidas-sem-corte-laser-diodo',
    title: 'Cirurgia de hemorroidas sem corte',
    shortTitle: 'Hemorroidas sem corte',
    homeCardTitle: 'Cirurgia de hemorroidas sem corte',
    homeCardDescription: 'Técnica moderna que preserva os tecidos',
    category: 'conservative',
    metaTitle: 'Cirurgia de hemorroidas sem corte | Dra. Dayara Salomão',
    metaDescription:
      'Conheça a abordagem para hemorroidas sem corte, com foco em preservação tecidual, menor agressão local e avaliação especializada.',
    summary:
      'Abordagem voltada a casos selecionados de doença hemorroidária, buscando tratar o problema com menor agressão local e recuperação planejada.',
    overview: [
      'Nem todo paciente com hemorroidas precisa de uma cirurgia convencional. Em situações específicas, técnicas sem corte podem ser consideradas para reduzir trauma local e acelerar a retomada das atividades.',
      'A escolha depende do exame proctológico, do padrão das hemorroidas e do impacto real dos sintomas na rotina do paciente.',
    ],
    indications: [
      'Doença hemorroidária com indicação de tratamento intervencionista, mas sem necessidade de ressecção tradicional.',
      'Pacientes que buscam alternativas com recuperação mais rápida, quando clinicamente viável.',
      'Sintomas persistentes que comprometem qualidade de vida.',
    ],
    benefits: [
      'Preservação de tecidos quando a anatomia e o estágio da doença permitem.',
      'Planejamento focado em conforto pós-procedimento.',
      'Discussão transparente sobre expectativas e limites da técnica.',
    ],
    carePath: [
      'A avaliação define se a técnica sem corte é suficiente ou se outro tratamento oferece melhor resultado.',
      'O seguimento inclui orientação alimentar, hidratação, analgesia e retorno em etapas.',
    ],
    relatedBlogSlugs: ['hemorroidas-sem-corte-laser-diodo'],
    mappedDiseaseNames: ['Doença Hemorroidária'],
    keywords: ['hemorroidas sem corte laser', 'tratamento hemorroidas sem corte', 'hemorroidas'],
    lastUpdated: '2026-04-17',
  },
  {
    slug: 'ligadura-elastica-hemorroidas-internas',
    title: 'Ligadura elástica para doença hemorroidária',
    shortTitle: 'Ligadura elástica',
    homeCardTitle: 'Ligadura elástica para doença hemorroidária',
    homeCardDescription: 'Método eficaz e menos invasivo',
    category: 'conservative',
    metaTitle: 'Ligadura elástica para hemorroidas internas | Dra. Dayara Salomão',
    metaDescription:
      'Tratamento ambulatorial para hemorroidas internas com praticidade, recuperação orientada e avaliação coloproctológica.',
    summary:
      'Tratamento ambulatorial indicado para hemorroidas internas em fases específicas, com boa relação entre praticidade, segurança e controle de sintomas.',
    overview: [
      'A ligadura elástica é uma das opções mais utilizadas para hemorroidas internas quando ainda não há necessidade de cirurgia maior.',
      'O objetivo é reduzir o fluxo sanguíneo da hemorroida, favorecendo sua regressão com recuperação geralmente rápida e sem internação.',
    ],
    indications: [
      'Hemorroidas internas com sangramento ou prolapso em graus compatíveis com tratamento ambulatorial.',
      'Pacientes que não melhoraram apenas com ajuste de hábitos e medidas clínicas.',
      'Casos em que a avaliação mostra boa chance de resposta com técnica menos invasiva.',
    ],
    benefits: [
      'Procedimento realizado em ambiente ambulatorial.',
      'Sem necessidade de corte cirúrgico.',
      'Retorno à rotina costuma ser mais rápido, conforme resposta individual.',
    ],
    carePath: [
      'A indicação depende do exame proctológico e do estágio da doença.',
      'Após o procedimento, a paciente recebe orientações sobre desconforto esperado, evacuação e sinais de alerta.',
    ],
    relatedBlogSlugs: ['ligadura-elastica-hemorroidas-internas'],
    mappedDiseaseNames: ['Doença Hemorroidária'],
    keywords: ['ligadura elástica hemorroidas', 'hemorroidas internas tratamento', 'proctologista'],
    lastUpdated: '2026-04-17',
  },
  {
    slug: 'fistula-anal-laser-vaaft-filac',
    title: 'Tratamento de fístula anal com laser e vídeo',
    shortTitle: 'Fístula anal com VAAFT / FiLaC',
    homeCardTitle: 'Cirurgia de fístula anal a laser e videoassistida (VAAFT)',
    homeCardDescription: 'Procedimento videoassistido de alta precisão',
    category: 'laser',
    metaTitle: 'Fístula anal com laser e vídeo | Dra. Dayara Salomão',
    metaDescription:
      'Tecnologias como VAAFT e FiLaC para tratamento de fístula anal com foco em precisão anatômica e preservação funcional.',
    summary:
      'Abordagem minimamente invasiva para casos selecionados de fístula anal, com objetivo de tratar o trajeto fistuloso preservando ao máximo a continência.',
    overview: [
      'A fístula anal exige planejamento criterioso porque o tratamento precisa controlar o trajeto da doença sem comprometer estruturas importantes do esfíncter.',
      'Técnicas como VAAFT e FiLaC ajudam a mapear e tratar o trajeto com maior precisão em casos adequadamente selecionados.',
    ],
    indications: [
      'Fístulas anais em que a avaliação aponta benefício de abordagem minimamente invasiva.',
      'Pacientes com dor, secreção ou recorrência que exigem investigação especializada.',
      'Situações em que a preservação funcional é ponto central da estratégia terapêutica.',
    ],
    benefits: [
      'Melhor visualização do trajeto fistuloso em técnicas videoassistidas.',
      'Planejamento voltado à preservação da continência.',
      'Seguimento pós-procedimento para monitorar cicatrização e resposta clínica.',
    ],
    carePath: [
      'A consulta inclui exame físico e, quando necessário, complementação diagnóstica para definir a anatomia da fístula.',
      'O retorno é importante para acompanhar cicatrização, secreção residual e necessidade de ajustes na conduta.',
    ],
    relatedBlogSlugs: ['fistula-anal-laser-vaaft-filac'],
    mappedDiseaseNames: ['Fístula Anal'],
    keywords: ['fístula anal laser vaaft filac', 'tratamento fistula anal', 'fistula anal'],
    lastUpdated: '2026-04-17',
  },
  {
    slug: 'cisto-pilonidal-laser-epsit',
    title: 'Tratamento de cisto pilonidal com laser e EPSiT',
    shortTitle: 'Cisto pilonidal com EPSiT',
    homeCardTitle: 'Cirurgia de cisto pilonidal a laser e videoassistida (EPSiT)',
    homeCardDescription: 'Tratamento avançado com recuperação mais rápida',
    category: 'laser',
    metaTitle: 'Cisto pilonidal com laser e EPSiT | Dra. Dayara Salomão',
    metaDescription:
      'Tratamento minimamente invasivo para cisto pilonidal com laser e EPSiT, focado em precisão e retorno progressivo às atividades.',
    summary:
      'Abordagem minimamente invasiva para cisto pilonidal, indicada em casos selecionados para tratar a doença com menor agressão local.',
    overview: [
      'O cisto pilonidal pode causar inflamação recorrente, dor e drenagem na região sacral. Em vez de abordagens amplas, alguns casos permitem técnicas mais conservadoras com vídeo e laser.',
      'O EPSiT favorece tratamento direcionado do trajeto e limpeza da cavidade, sempre dependendo da avaliação clínica individual.',
    ],
    indications: [
      'Cisto pilonidal com episódios recorrentes de inflamação ou drenagem.',
      'Pacientes com anatomia favorável para técnica minimamente invasiva.',
      'Situações em que é desejável reduzir o impacto local do procedimento.',
    ],
    benefits: [
      'Abordagem direcionada da cavidade pilonidal.',
      'Menor agressão à pele ao redor em comparação com técnicas mais extensas.',
      'Recuperação orientada conforme resposta individual e cuidado local.',
    ],
    carePath: [
      'A decisão terapêutica considera extensão da doença, infecção ativa e histórico de recorrência.',
      'O pós-procedimento inclui higiene local, depilação orientada quando indicada e acompanhamento para prevenir recidiva.',
    ],
    relatedBlogSlugs: ['cisto-pilonidal-laser-epsit'],
    mappedDiseaseNames: ['Cisto Pilonidal'],
    keywords: ['cisto pilonidal laser EPSiT', 'tratamento cisto pilonidal', 'cisto pilonidal'],
    lastUpdated: '2026-04-17',
  },
  {
    slug: 'plicoma-anal-laser-co2',
    title: 'Remoção de plicoma anal com laser de CO2',
    shortTitle: 'Plicoma anal com laser',
    homeCardTitle: 'Cirurgia de plicoma anal a laser de CO2',
    homeCardDescription: 'Remoção precisa com tecnologia laser',
    category: 'laser',
    metaTitle: 'Remoção de plicoma anal com laser de CO2 | Dra. Dayara Salomão',
    metaDescription:
      'Tratamento cirúrgico de plicoma anal com precisão tecidual, avaliação individualizada e foco em conforto pós-procedimento.',
    summary:
      'Procedimento para remoção de excesso de pele anal quando há desconforto, dificuldade de higiene ou incômodo funcional e estético relevante.',
    overview: [
      'O plicoma anal é um excesso de pele que pode causar desconforto, sensação de volume local e dificuldade de higiene. Nem todo caso precisa de cirurgia, mas a remoção pode ser indicada quando o impacto é relevante.',
      'O laser de CO2 é uma tecnologia que ajuda a conduzir a remoção com precisão, respeitando a anatomia da região.',
    ],
    indications: [
      'Plicoma com incômodo local, inflamação recorrente ou dificuldade de higiene.',
      'Pacientes que desejam avaliação objetiva sobre necessidade e benefício da remoção.',
      'Casos em que a inspeção confirma que o quadro é compatível com tratamento cirúrgico.',
    ],
    benefits: [
      'Precisão no manejo do tecido.',
      'Planejamento individualizado conforme anatomia e sintomas.',
      'Orientação pós-procedimento voltada a conforto e cicatrização.',
    ],
    carePath: [
      'A consulta diferencia plicoma de outras lesões da região anal e define se existe indicação real de remoção.',
      'Após o procedimento, o acompanhamento ajuda no controle de dor, higiene local e cicatrização adequada.',
    ],
    relatedBlogSlugs: ['plicoma-anal-laser-co2'],
    mappedDiseaseNames: [],
    keywords: ['plicoma anal laser CO2', 'remoção plicoma anal', 'proctologista'],
    lastUpdated: '2026-04-17',
  },
  {
    slug: 'toxina-botulinica-fissura-anal',
    title: 'Toxina botulínica para fissura anal',
    shortTitle: 'Toxina botulínica para fissura',
    homeCardTitle: 'Toxina botulínica para fissura e dores anais crônicas',
    homeCardDescription: 'Tratamento inovador para alívio da dor',
    category: 'innovative',
    metaTitle: 'Toxina botulínica para fissura anal | Dra. Dayara Salomão',
    metaDescription:
      'Tratamento para fissura anal com toxina botulínica, focado em aliviar dor, reduzir espasmo e favorecer cicatrização sem cirurgia em casos selecionados.',
    summary:
      'Opção terapêutica para fissura anal em pacientes selecionados, com foco em reduzir espasmo muscular, aliviar dor e favorecer cicatrização.',
    overview: [
      'A fissura anal costuma gerar dor intensa, medo de evacuar e um ciclo de espasmo que dificulta a cicatrização. Em parte dos casos, a toxina botulínica pode ajudar a interromper esse ciclo sem cirurgia.',
      'A avaliação clínica é indispensável para definir se a fissura pode responder bem a essa estratégia ou se outro tratamento é mais adequado.',
    ],
    indications: [
      'Fissura anal com dor persistente e espasmo local importante.',
      'Pacientes que não melhoraram adequadamente com medidas clínicas iniciais.',
      'Situações em que se busca evitar cirurgia quando existe indicação técnica para isso.',
    ],
    benefits: [
      'Pode aliviar dor e reduzir o espasmo anal.',
      'Favorece cicatrização em casos selecionados.',
      'Permite abordagem menos invasiva antes de considerar cirurgia.',
    ],
    carePath: [
      'O plano terapêutico inclui também ajuste intestinal, hidratação, orientações de evacuação e manejo da dor.',
      'O seguimento mostra se a fissura está cicatrizando ou se outra abordagem precisa ser discutida.',
    ],
    relatedBlogSlugs: ['toxina-botulinica-fissura-anal'],
    mappedDiseaseNames: ['Fissura Anal'],
    keywords: ['toxina botulínica fissura anal', 'tratamento fissura anal', 'fissura anal'],
    lastUpdated: '2026-04-17',
  },
  {
    slug: 'hpv-perianal-laser-co2',
    title: 'Tratamento de HPV perianal com laser de CO2',
    shortTitle: 'HPV perianal com laser',
    homeCardTitle: 'Eletrocoagulação a laser de lesões por HPV',
    homeCardDescription: 'Remoção segura e eficaz de lesões',
    category: 'laser',
    metaTitle: 'HPV perianal com laser de CO2 | Dra. Dayara Salomão',
    metaDescription:
      'Tratamento de lesões por HPV na região perianal com laser de CO2, avaliação especializada e seguimento cuidadoso.',
    summary:
      'Abordagem para lesões por HPV na região perianal com foco em precisão local, remoção adequada das lesões e acompanhamento próximo.',
    overview: [
      'O HPV perianal pode se manifestar com verrugas, lesões aparentes ou desconforto local. O tratamento precisa considerar extensão, localização e possibilidade de novas lesões ao longo do seguimento.',
      'O laser de CO2 é uma das ferramentas que podem ser usadas para tratar essas lesões com precisão, sempre dentro de uma estratégia individualizada.',
    ],
    indications: [
      'Lesões visíveis ou suspeitas na região perianal com avaliação compatível com HPV.',
      'Recorrência de lesões que exigem abordagem especializada.',
      'Necessidade de tratamento local com cuidado anatômico e seguimento.',
    ],
    benefits: [
      'Precisão no tratamento das lesões perianais.',
      'Planejamento conforme extensão e localização dos condilomas.',
      'Acompanhamento para monitorar cicatrização e recorrência.',
    ],
    carePath: [
      'A consulta define necessidade de exame complementar, tratamento local e seguimento contínuo.',
      'O acompanhamento é essencial porque lesões por HPV podem recidivar mesmo após boa resposta inicial.',
    ],
    relatedBlogSlugs: ['hpv-perianal-laser-co2'],
    mappedDiseaseNames: ['HPV Anal'],
    keywords: ['HPV perianal laser CO2', 'tratamento HPV anal', 'HPV anal'],
    lastUpdated: '2026-04-17',
  },
]

const treatmentsBySlug = new Map(TREATMENTS.map((treatment) => [treatment.slug, treatment]))

export const TREATMENT_CARD_TO_SLUG: Record<string, string> = Object.fromEntries(
  TREATMENTS.map((treatment) => [treatment.homeCardTitle, treatment.slug]),
)

export const DISEASE_TO_TREATMENT_SLUG: Record<string, string> = {
  'Doença Hemorroidária': 'hemorroidectomia-laser-co2',
  'Fissura Anal': 'toxina-botulinica-fissura-anal',
  'Fístula Anal': 'fistula-anal-laser-vaaft-filac',
  'HPV Anal': 'hpv-perianal-laser-co2',
  'Cisto Pilonidal': 'cisto-pilonidal-laser-epsit',
}

export function getAllTreatments(): Treatment[] {
  return TREATMENTS
}

export function getAllTreatmentSlugs(): string[] {
  return TREATMENTS.map((treatment) => treatment.slug)
}

export function getTreatmentBySlug(slug: string): Treatment | null {
  return treatmentsBySlug.get(slug) ?? null
}

export function getTreatmentHref(slug?: string | null): string | null {
  if (!slug) return null
  return treatmentsBySlug.has(slug) ? `/tratamentos/${slug}` : null
}

export function getTreatmentHrefByCardName(name: string): string | null {
  return getTreatmentHref(TREATMENT_CARD_TO_SLUG[name])
}

export function getTreatmentHrefByDiseaseName(name: string): string | null {
  return getTreatmentHref(DISEASE_TO_TREATMENT_SLUG[name])
}

export function getTreatmentByRelatedBlogSlug(slug: string): Treatment | null {
  return TREATMENTS.find((treatment) => treatment.relatedBlogSlugs.includes(slug)) ?? null
}

export function getRelatedPostsForTreatment(treatment: Treatment): BlogPost[] {
  return treatment.relatedBlogSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
}
