import type { BlogPost, MedicalSource } from './blog.ts'
import { getPostBySlug } from './blog.ts'

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
  /**
   * How the procedure is actually performed — the mechanism, the
   * instrument and what happens to the tissue. Kept separate from
   * `overview` (which explains how the *decision* is made) because it
   * is what patients search for and what feeds schema.org
   * `howPerformed`.
   */
  howItWorks?: string[]
  overview: string[]
  indications: string[]
  benefits: string[]
  carePath: string[]
  /** What the recovery or follow-up looks like week by week, framed as averages. */
  recovery?: string[]
  /** When the treatment is not the right choice, its trade-offs and what it does not solve. */
  limitations?: string[]
  faqs?: Array<{
    question: string
    answer: string
  }>
  /** Rendered as a visible bibliography before being emitted as schema `citation`. */
  sources?: MedicalSource[]
  relatedBlogSlugs: string[]
  mappedDiseaseNames: string[]
  keywords: string[]
  lastUpdated: string
  /** Set only after Dra. Dayara has reviewed this version of the page. */
  lastReviewed?: string
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
    howItWorks: [
      'O laser de CO2 emite um feixe de luz que é fortemente absorvido pela água presente no tecido. Em vez de apenas coagular, como faz o eletrocautério, ele vaporiza camadas finas de tecido com controle milimétrico.',
      'A hemorroidectomia com laser de CO2 continua sendo uma cirurgia com cortes: o que muda é o instrumento que faz o corte. Trocar o eletrocautério pelo laser reduz o dano térmico ao tecido vizinho, o que se traduz em menor inflamação no pós-operatório, menos dor, cicatrização mais rápida e melhor resultado estético.',
      'Por essa precisão, o laser de CO2 é especialmente útil em hemorroidas externas e plicomas, e pode ser usado na técnica excisional de hemorroidas internas quando a avaliação indica.',
    ],
    overview: [
      'A hemorroidectomia com laser de CO2 é uma opção cirúrgica para pacientes com sintomas persistentes, prolapsos importantes ou crises recorrentes que já não respondem bem às medidas clínicas.',
      'A escolha entre laser de CO2, laser de diodo e cirurgia convencional não é uma disputa entre técnicas melhores e piores. Ela depende da classificação da doença hemorroidária — se é interna, externa ou mista —, do grau e do volume das hemorroidas e das prioridades do paciente quanto a dor, tempo de afastamento e durabilidade do resultado.',
      'Em casos selecionados, o laser de CO2 e o laser de diodo podem ser usados na mesma cirurgia, cada um na indicação em que rende melhor, para tratar de forma individualizada as diferentes queixas do paciente.',
    ],
    indications: [
      'Hemorroidas internas ou externas sintomáticas com sangramento, dor ou prolapso.',
      'Crises frequentes apesar de ajuste alimentar, medicações e medidas locais.',
      'Quadros em que a avaliação mostra benefício real de uma abordagem cirúrgica.',
    ],
    benefits: [
      'Corte com precisão milimétrica e menor dano térmico ao tecido saudável ao redor.',
      'Menos dor no pós-operatório imediato: revisões da literatura mostram que técnicas a laser tendem a doer menos nas primeiras 12 a 24 horas do que a cirurgia convencional.',
      'Menos sangramento no pós-operatório nos estudos disponíveis, já que o laser sela pequenos vasos enquanto corta.',
      'Cicatrização acelerada e melhor resultado estético, com maior satisfação relatada em estudos comparativos.',
      'Planejamento cirúrgico individualizado conforme o grau, o volume e o tipo de hemorroida.',
    ],
    carePath: [
      'A consulta define se existe indicação para cirurgia e qual técnica faz mais sentido para o seu caso. É nessa conversa que entram o grau e o tamanho da hemorroida, os riscos específicos de cada técnica e uma expectativa realista de afastamento do trabalho.',
      'No pós-operatório, o seguimento inclui controle da dor, cuidados locais e estratégias para evitar evacuação traumática.',
      'Procure atendimento se aparecer sangramento intenso, dificuldade para urinar, febre ou dor que piora muito em vez de melhorar.',
    ],
    faqs: [
      {
        question: 'Toda hemorroida precisa de cirurgia?',
        answer:
          'Não. Mudanças de hábito, medicamentos e procedimentos ambulatoriais podem ser suficientes em muitos casos. A cirurgia é considerada conforme sintomas, grau da doença, exame e resposta aos tratamentos anteriores.',
      },
      {
        question: 'O laser de CO2 é indicado para qualquer caso?',
        answer:
          'Não. A indicação depende do tipo de hemorroida, da anatomia e do impacto dos sintomas. A consulta permite comparar técnicas e explicar benefícios, limites e recuperação esperada para cada opção.',
      },
    ],
    relatedBlogSlugs: [
      'hemorroidectomia-laser-co2',
      'doenca-hemorroidaria-sintomas-graus',
      'primeiros-30-dias-hemorroidectomia-laser-co2',
      'cirurgia-hemorroida-afastamento-atestado',
    ],
    mappedDiseaseNames: ['Doença Hemorroidária'],
    keywords: ['hemorroidectomia laser CO2', 'cirurgia hemorroidas', 'tratamento hemorroidas'],
    lastUpdated: '2026-09-01',
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
    howItWorks: [
      'Uma fibra de laser fina e flexível é introduzida dentro do tecido hemorroidário. A energia do laser de diodo, normalmente com comprimento de onda de 980 ou 1470 nanômetros, sela os vasos de dentro para fora e provoca a retração da hemorroida — sem cortar nem remover tecido, como acontece na cirurgia convencional.',
      'Quando as hemorroidas são um pouco mais volumosas, pode ser necessária a confecção de pontos na origem do plexo hemorroidário.',
      'Por isso o procedimento é descrito como "sem corte": a agressão à superfície da pele e da mucosa ao redor é muito menor, e não fica uma ferida aberta extensa para cuidar.',
    ],
    overview: [
      'Nem todo paciente com hemorroidas precisa de uma cirurgia convencional. Em situações específicas, técnicas sem corte podem ser consideradas para reduzir trauma local e acelerar a retomada das atividades.',
      'Esta é uma técnica com indicação restrita, e isso faz parte da conversa honesta sobre ela: é usada em hemorroidas internas, principalmente de grau II e no máximo III. Hemorroidas externas não são tratadas por essa via.',
      'Alguns estudos mostram uma chance um pouco maior de a hemorroida voltar no médio e longo prazo em hemorroidas volumosas quando comparada à cirurgia convencional. Esse é o principal ponto a pesar contra o conforto do pós-operatório.',
    ],
    indications: [
      'Doença hemorroidária com indicação de tratamento intervencionista, mas sem necessidade de ressecção tradicional.',
      'Pacientes que buscam alternativas com recuperação mais rápida, quando clinicamente viável.',
      'Sintomas persistentes que comprometem qualidade de vida.',
    ],
    benefits: [
      'Menos dor no pós-operatório. Os estudos disponíveis mostram diferença a favor do laser no primeiro dia, na primeira semana e no primeiro mês.',
      'Menor uso de analgésicos: em média, cerca de 2 a 3 dias a menos de analgésicos fortes.',
      'Retorno às atividades em média cerca de 9 a 11 dias mais cedo nos estudos disponíveis. O tempo real varia conforme o caso.',
      'Cuidado com o curativo mais simples, já que não há uma ferida aberta extensa.',
      'Menor risco de complicações como retenção urinária e estreitamento do canal anal.',
    ],
    carePath: [
      'A avaliação define se a técnica sem corte é suficiente ou se outro tratamento oferece melhor resultado. Hemorroidas muito volumosas ou de quadro arrastado por vários anos costumam ter resultado mais durável com a cirurgia convencional.',
      'O seguimento inclui orientação alimentar, hidratação, analgesia e retorno em etapas.',
    ],
    faqs: [
      {
        question: 'A cirurgia de hemorroida "sem corte" serve para qualquer caso?',
        answer:
          'Não. A hemorroidoplastia a laser de diodo é indicada para hemorroidas internas, principalmente de grau II e no máximo III. Hemorroidas externas e casos muito volumosos costumam exigir outra técnica.',
      },
      {
        question: 'A hemorroida pode voltar depois da cirurgia a laser de diodo?',
        answer:
          'Alguns estudos mostram uma chance um pouco maior de recidiva a médio e longo prazo em hemorroidas volumosas, quando comparada à cirurgia convencional. É por isso que a indicação é feita com critério, e não como uma opção automática por ser menos dolorosa.',
      },
      {
        question: 'Quanto tempo depois consigo voltar ao trabalho?',
        answer:
          'Estudos apontam um retorno em média cerca de 9 a 11 dias mais cedo do que na cirurgia convencional, que costuma exigir de 3 a 4 semanas. O tempo real varia conforme o caso e o tipo de atividade, e é combinado na consulta.',
      },
    ],
    relatedBlogSlugs: [
      'hemorroidas-sem-corte-laser-diodo',
      'pos-operatorio-cirurgia-hemorroidas-o-que-esperar',
      'hemorroidas-qual-tecnica-cirurgica-escolher',
      'cirurgia-hemorroida-afastamento-atestado',
    ],
    mappedDiseaseNames: ['Doença Hemorroidária'],
    keywords: ['hemorroidas sem corte laser', 'tratamento hemorroidas sem corte', 'hemorroidas'],
    lastUpdated: '2026-09-01',
  },
  {
    slug: 'ligadura-elastica-hemorroidas-internas',
    title: 'Ligadura elástica para doença hemorroidária',
    shortTitle: 'Ligadura elástica',
    homeCardTitle: 'Ligadura elástica para doença hemorroidária',
    homeCardDescription: 'Opção ambulatorial para casos selecionados',
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
    faqs: [
      {
        question: 'A ligadura elástica dói?',
        answer:
          'Pode haver pressão ou desconforto após o procedimento. Dor intensa não é o esperado e deve ser comunicada à equipe. A experiência varia, e a indicação correta depende do exame proctológico.',
      },
      {
        question: 'A ligadura elástica substitui a cirurgia?',
        answer:
          'Em alguns casos de hemorroidas internas, ela pode controlar os sintomas sem uma cirurgia maior. Em outros, o grau da doença ou o componente externo exige outra estratégia.',
      },
      {
        question: 'É preciso internação para fazer a ligadura?',
        answer:
          'Em geral, a ligadura é realizada em ambiente ambulatorial. A médica confirma o preparo, os medicamentos em uso e os cuidados após o procedimento durante a avaliação.',
      },
    ],
    relatedBlogSlugs: [
      'ligadura-elastica-hemorroidas-internas',
      'ligadura-elastica-doi-recuperacao-cuidados',
      'sangramento-anal-dor-quando-procurar-coloproctologista',
    ],
    mappedDiseaseNames: ['Doença Hemorroidária'],
    keywords: ['ligadura elástica hemorroidas', 'hemorroidas internas tratamento', 'proctologista'],
    lastUpdated: '2026-08-10',
  },
  {
    slug: 'fistula-anal-laser-vaaft-filac',
    title: 'Tratamento de fístula anal com laser e vídeo',
    shortTitle: 'Fístula anal com VAAFT / FiLaC',
    homeCardTitle: 'Cirurgia de fístula anal a laser e videoassistida (VAAFT)',
    homeCardDescription: 'Planejamento videoassistido em casos selecionados',
    category: 'laser',
    metaTitle: 'Fístula anal com laser e vídeo | Dra. Dayara Salomão',
    metaDescription:
      'Tecnologias como VAAFT e FiLaC para tratamento de fístula anal com foco em precisão anatômica e preservação funcional.',
    summary:
      'Abordagem minimamente invasiva para casos selecionados de fístula anal, com objetivo de tratar o trajeto fistuloso preservando ao máximo a continência.',
    howItWorks: [
      'Na VAAFT, um microendoscópio é introduzido pelo próprio trajeto da fístula. Isso permite percorrer e visualizar todo o caminho por vídeo, inclusive trajetos secundários que passariam despercebidos em um exame externo.',
      'Com o trajeto mapeado, a fibra de laser é guiada por dentro dele. A energia do laser de diodo destrói o tecido doente e favorece a obliteração do trajeto de dentro para fora, o que é a base da técnica FiLaC.',
      'A vantagem prática dessa combinação é evitar grandes feridas abertas e meses de curativos dolorosos: a anatomia da região é preservada e o pós-operatório fica muito mais simples.',
    ],
    overview: [
      'A fístula anal exige planejamento criterioso porque o tratamento precisa controlar o trajeto da doença sem comprometer estruturas importantes do esfíncter — o músculo responsável por segurar gases e fezes.',
      'A maior parte das fístulas nasce de uma infecção simples de glândulas dentro do canal anal, que forma um abscesso. Quando o abscesso é drenado e o trajeto não fecha por completo, ele vira um canal permanente revestido por tecido de cicatrização.',
      'É por isso que a fístula não fecha sozinha com antibiótico: o trajeto já está revestido por tecido cronicamente inflamado, que impede o fechamento espontâneo. O tratamento definitivo é cirúrgico.',
    ],
    indications: [
      'Fístulas anais em que a avaliação aponta benefício de abordagem minimamente invasiva.',
      'Pacientes com dor, secreção ou recorrência que exigem investigação especializada.',
      'Situações em que a preservação funcional é ponto central da estratégia terapêutica.',
    ],
    benefits: [
      'Visualização direta, por vídeo, de todo o trajeto — incluindo trajetos múltiplos que não seriam identificados de outra forma.',
      'Tratamento por dentro do trajeto, sem grandes cortes na pele.',
      'Planejamento voltado à preservação da continência, já que técnicas que seccionam o esfíncter podem deixar algum grau de dificuldade para segurar gases ou fezes.',
      'Curativos pós-operatórios mais simples e retorno mais rápido à rotina.',
      'Seguimento pós-procedimento para monitorar cicatrização e resposta clínica.',
    ],
    carePath: [
      'A consulta inclui exame físico e, quando necessário, complementação diagnóstica para definir a anatomia da fístula: quantos trajetos existem, por onde passam e quanto de músculo esfincteriano está envolvido.',
      'Em fístulas profundas ou complexas, pode ser mais prudente controlar a infecção primeiro — às vezes com um fio de drenagem, chamado sedenho ou seton — e deixar o tratamento definitivo para um segundo momento.',
      'O retorno é importante para acompanhar cicatrização, secreção residual e necessidade de ajustes na conduta.',
    ],
    faqs: [
      {
        question: 'Toda fístula anal precisa de cirurgia?',
        answer:
          'A maioria das fístulas exige algum procedimento para tratar o trajeto, mas a técnica varia conforme anatomia, músculos envolvidos, sintomas e histórico de tratamentos. A avaliação define a estratégia apropriada.',
      },
      {
        question: 'Qual é a diferença entre VAAFT e FiLaC?',
        answer:
          'VAAFT usa visão endoscópica para percorrer e identificar o trajeto por vídeo. FiLaC utiliza a energia do laser dentro do trajeto fistuloso para destruí-lo por dentro. Na prática, as duas costumam se complementar: o vídeo mapeia, o laser trata. Nem toda fístula é adequada para essas técnicas.',
      },
      {
        question: 'Por que a fístula apareceu depois de um abscesso?',
        answer:
          'Cerca de 80% das fístulas anais têm origem criptoglandular: uma glândula dentro do canal anal entope, infecciona e forma um abscesso. Depois que o pus sai, o corpo tenta cicatrizar o caminho — e em parte dos casos esse caminho não fecha e vira a fístula.',
      },
      {
        question: 'A cirurgia de fístula pode afetar o controle de gases e fezes?',
        answer:
          'Esse é justamente o cuidado central do planejamento. Tratar uma fístula pode envolver seccionar parte do esfíncter, o que em alguns pacientes deixa algum grau de dificuldade para segurar gases ou fezes. Técnicas como VAAFT e FiLaC existem em boa parte para reduzir esse risco em casos selecionados.',
      },
    ],
    relatedBlogSlugs: [
      'fistula-anal-laser-vaaft-filac',
      'fistula-anal-o-que-e-sintomas',
      'por-que-a-fistula-anal-aparece',
    ],
    mappedDiseaseNames: ['Fístula Anal'],
    keywords: ['fístula anal laser vaaft filac', 'tratamento fistula anal', 'fistula anal'],
    lastUpdated: '2026-09-01',
  },
  {
    slug: 'cisto-pilonidal-laser-epsit',
    title: 'Tratamento de cisto pilonidal com laser e EPSiT',
    shortTitle: 'Cisto pilonidal com EPSiT',
    homeCardTitle: 'Cirurgia de cisto pilonidal a laser e videoassistida (EPSiT)',
    homeCardDescription: 'Abordagem por vídeo e laser em casos selecionados',
    category: 'laser',
    metaTitle: 'Cisto pilonidal com laser e EPSiT | Dra. Dayara Salomão',
    metaDescription:
      'Tratamento minimamente invasivo para cisto pilonidal com laser e EPSiT, focado em precisão e retorno progressivo às atividades.',
    summary:
      'Abordagem minimamente invasiva para cisto pilonidal, indicada em casos selecionados para tratar a doença com menor agressão local.',
    howItWorks: [
      'O EPSiT é a técnica videoassistida para o cisto pilonidal, prima da VAAFT usada nas fístulas. Um microendoscópio entra pelo próprio orifício do cisto, o que permite ver a cavidade por dentro, remover os pelos e o tecido doente e limpar todos os trajetos sob visão direta.',
      'Em seguida, uma fibra fina de laser de diodo é usada para selar e destruir o tecido doente por dentro — a técnica conhecida como SiLaC ou SiLaT. Não é preciso fazer um corte grande na pele.',
      'A diferença prática para a cirurgia convencional é grande. Na excisão tradicional, todo o trajeto e o tecido ao redor são removidos e a ferida costuma ser deixada aberta para cicatrizar de dentro para fora, com curativos frequentes por semanas a meses.',
    ],
    overview: [
      'O cisto pilonidal é uma inflamação crônica na região entre as nádegas, próxima ao cóccix, e o tratamento recomendado é cirúrgico. Existem técnicas diferentes, cada uma com vantagens, desvantagens e indicações próprias.',
      'Na cirurgia convencional, fechar a ferida com pontos na linha do meio costuma dar certo apenas em cistos muito pequenos: nessa região os pontos tendem a se abrir em quase todos os casos, e deixar a ferida aberta acaba sendo a melhor opção — ao custo de uma recuperação de semanas a meses.',
      'Casos extensos, recidivados ou em que outras abordagens já falharam várias vezes podem exigir técnicas de retalho, como Limberg, Karydakis ou Bascom. São cirurgias mais invasivas, com maior chance de complicações e recuperação bem mais longa que a do laser.',
    ],
    indications: [
      'Cisto pilonidal com episódios recorrentes de inflamação ou drenagem.',
      'Pacientes com anatomia favorável para técnica minimamente invasiva.',
      'Situações em que é desejável reduzir o impacto local do procedimento.',
    ],
    benefits: [
      'Procedimento minimamente invasivo, sem a ferida aberta extensa da excisão convencional.',
      'Menor dor no pós-operatório e cicatrização mais rápida.',
      'Melhor resultado estético, com cicatriz pequena.',
      'Retorno mais rápido às atividades do dia a dia e ao trabalho.',
      'Pode ser repetido, se necessário, o que não é simples com as técnicas mais extensas.',
    ],
    carePath: [
      'A decisão terapêutica considera extensão da doença, infecção ativa e histórico de recorrência.',
      'O pós-procedimento inclui higiene local, depilação orientada quando indicada e acompanhamento para prevenir recidiva.',
    ],
    faqs: [
      {
        question: 'O cisto pilonidal some sozinho?',
        answer:
          'Uma inflamação pode melhorar temporariamente, mas o trajeto do cisto pode permanecer e voltar a causar sintomas. Casos com dor, secreção ou recorrência devem ser avaliados.',
      },
      {
        question: 'EPSiT é indicado para todo cisto pilonidal?',
        answer:
          'Não. A técnica depende da extensão, da presença de infecção ativa, de cirurgias anteriores e da anatomia dos orifícios e trajetos. A avaliação compara EPSiT com outras possibilidades.',
      },
    ],
    relatedBlogSlugs: [
      'cisto-pilonidal-laser-epsit',
      'cisto-pilonidal-sinais-diagnostico',
      'cisto-pilonidal-cirurgia-convencional-x-laser',
    ],
    mappedDiseaseNames: ['Cisto Pilonidal'],
    keywords: ['cisto pilonidal laser EPSiT', 'tratamento cisto pilonidal', 'cisto pilonidal'],
    lastUpdated: '2026-09-01',
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
    howItWorks: [
      'O laser de CO2 vaporiza camadas finas de tecido com controle milimétrico, em vez de apenas coagular como faz o eletrocautério. Na plicomectomia, isso permite remover a sobra de pele selando os vasos ao mesmo tempo.',
      'O resultado prático é menos inchaço e uma cicatrização mais limpa e rápida do que na remoção com eletrocautério.',
      'A técnica escolhida também tem efeito sobre a recidiva: plicomas retirados com eletrocautério sofrem maior dano térmico e mais inflamação, e com isso têm maior risco de voltar a se formar no mesmo local.',
    ],
    overview: [
      'O plicoma anal, ou "excesso de pele" ao redor do ânus, é uma saliência de pele benigna, macia e da mesma cor da pele ao redor. É muito comum: estima-se que cerca de um terço das pessoas com problemas anais benignos apresente algum plicoma.',
      'Na maioria dos casos ele não causa sintoma nenhum e não precisa de tratamento. Quando não há inflamação, dor ou incômodo, a recomendação é simplesmente deixá-lo em paz — não faz sentido transformar em problema algo que não incomoda.',
      'O plicoma costuma ser sequela de algo anterior: fissuras anais crônicas ou já cicatrizadas, hemorroidas que inflamaram, ou a inflamação que se segue a uma cirurgia convencional de hemorroida. Atrito crônico, sobrepeso e diabetes também favorecem seu aparecimento.',
      'Em uma minoria dos casos, principalmente em crianças e adolescentes ou quando vêm acompanhados de fissuras e inflamação, plicomas anais podem ser um sinal precoce de doença de Crohn — motivo pelo qual uma lesão nova nessa região merece avaliação.',
    ],
    indications: [
      'Plicoma que causa desconforto, coceira ou dificuldade de higiene.',
      'Plicoma que fica frequentemente irritado, dolorido ou que sangra.',
      'Incômodo estético relatado pelo próprio paciente.',
      'Necessidade de biópsia para descartar outras condições, como a doença de Crohn.',
    ],
    benefits: [
      'Remoção com precisão milimétrica, selando os vasos durante o próprio corte.',
      'Menos inchaço e cicatrização mais limpa do que na remoção com eletrocautério.',
      'Menor dano térmico ao tecido vizinho, o que reduz o risco de o plicoma voltar a se formar no local.',
      'Orientação pós-procedimento voltada a conforto e cicatrização.',
    ],
    carePath: [
      'A consulta diferencia plicoma de hemorroida e de verruga de HPV — três coisas que costumam ser confundidas — e define se existe indicação real de remoção.',
      'Após o procedimento, o acompanhamento ajuda no controle de dor, higiene local e cicatrização adequada.',
      'Novos plicomas podem se formar com o tempo se os fatores que os favoreceram continuarem presentes, como atrito, fissuras recorrentes ou uma doença de base.',
    ],
    faqs: [
      {
        question: 'Plicoma anal precisa ser operado?',
        answer:
          'Na maioria das vezes, não. Quando não há dor, inflamação ou incômodo, a conduta é deixá-lo em paz. A remoção entra em cena quando ele atrapalha a higiene, irrita com frequência, sangra, incomoda esteticamente ou precisa ser biopsiado.',
      },
      {
        question: 'Plicoma é a mesma coisa que hemorroida?',
        answer:
          'Não. A hemorroida é uma veia inchada: pode sangrar, pode prolapsar ao evacuar e voltar depois, e dói bastante quando trombosa. O plicoma é uma sobra de pele — não sangra, não muda de tamanho com o esforço e costuma ser indolor.',
      },
      {
        question: 'Plicoma pode ser confundido com verruga de HPV?',
        answer:
          'Pode, e isso acontece com alguma frequência. O plicoma tem superfície lisa e a cor da pele normal; a verruga de HPV tem superfície irregular, tipo couve-flor, tende a aparecer em grupos e pode crescer, coçar ou sangrar levemente. O diagnóstico é clínico e, em caso de dúvida, pode ser confirmado com biópsia.',
      },
      {
        question: 'O plicoma pode voltar depois de removido?',
        answer:
          'Pode, especialmente se os fatores que o causaram continuarem presentes. A técnica também influencia: a remoção com eletrocautério causa mais dano térmico e mais inflamação, e por isso tem maior risco de recidiva do que a remoção com laser de CO2.',
      },
    ],
    relatedBlogSlugs: [
      'plicoma-anal-laser-co2',
      'plicoma-anal-causas-e-tratamento',
      'hemorroida-ou-plicoma-como-diferenciar',
    ],
    mappedDiseaseNames: ['Plicoma Anal'],
    keywords: ['plicoma anal laser CO2', 'remoção plicoma anal', 'proctologista'],
    lastUpdated: '2026-09-01',
  },
  {
    slug: 'toxina-botulinica-fissura-anal',
    title: 'Toxina botulínica para fissura anal',
    shortTitle: 'Toxina botulínica para fissura',
    homeCardTitle: 'Toxina botulínica para fissura e dores anais crônicas',
    homeCardDescription: 'Opção para reduzir espasmo em casos selecionados',
    category: 'innovative',
    metaTitle: 'Toxina botulínica para fissura anal | Dra. Dayara Salomão',
    metaDescription:
      'Tratamento para fissura anal com toxina botulínica, focado em aliviar dor, reduzir espasmo e favorecer cicatrização sem cirurgia em casos selecionados.',
    summary:
      'Opção terapêutica para fissura anal em pacientes selecionados, com foco em reduzir espasmo muscular, aliviar dor e favorecer cicatrização.',
    howItWorks: [
      'A fissura anal é um pequeno corte na mucosa. Quando a dor é forte, o músculo do esfíncter entra em espasmo — e é justamente esse espasmo que impede a ferida de cicatrizar, criando um ciclo que se retroalimenta.',
      'A toxina botulínica relaxa essa musculatura. O relaxamento reduz a dor quase de imediato e permite que a fissura finalmente cicatrize, sem necessidade de uma cirurgia imediata.',
      'Há ainda um uso menos conhecido: aplicada cerca de 15 dias antes de uma cirurgia de hemorroida, a toxina botulínica reduz a dor no pós-operatório.',
    ],
    overview: [
      'A fissura anal costuma gerar dor intensa em corte ou ardor, em geral com sangramento vivo, e um medo de evacuar que agrava o quadro: adiar a evacuação resseca as fezes e torna a passagem ainda mais traumática.',
      'Em parte dos casos, a toxina botulínica pode interromper esse ciclo sem cirurgia. A avaliação clínica é indispensável para definir se a fissura pode responder bem a essa estratégia ou se outro tratamento é mais adequado.',
    ],
    indications: [
      'Fissura anal com dor persistente e espasmo local importante.',
      'Pacientes que não melhoraram adequadamente com medidas clínicas iniciais.',
      'Situações em que se busca evitar cirurgia quando existe indicação técnica para isso.',
    ],
    benefits: [
      'Alívio da dor quase imediato pelo relaxamento do espasmo do esfíncter.',
      'Quebra o ciclo dor–espasmo–não cicatrização que mantém a fissura aberta.',
      'Permite uma abordagem menos invasiva antes de considerar cirurgia.',
      'Também usada cerca de 15 dias antes de uma cirurgia de hemorroida para reduzir a dor no pós-operatório.',
    ],
    carePath: [
      'O plano terapêutico inclui também ajuste intestinal, hidratação, orientações de evacuação e manejo da dor.',
      'O seguimento mostra se a fissura está cicatrizando ou se outra abordagem precisa ser discutida.',
    ],
    faqs: [
      {
        question: 'A fissura anal pode cicatrizar sem procedimento?',
        answer:
          'Fissuras recentes podem melhorar com ajuste do hábito intestinal e tratamento clínico orientado. Quando persistem, retornam ou têm características atípicas, a avaliação ajuda a definir outras opções.',
      },
      {
        question: 'A toxina botulínica substitui a cirurgia?',
        answer:
          'Ela pode ser uma alternativa em casos selecionados, mas não serve para todas as fissuras. Tempo de sintomas, espasmo, tratamentos anteriores e exame influenciam a decisão.',
      },
    ],
    relatedBlogSlugs: [
      'toxina-botulinica-fissura-anal',
      'fissura-anal-causas-sintomas',
      'dor-ao-evacuar-quando-investigar',
    ],
    mappedDiseaseNames: ['Fissura Anal'],
    keywords: ['toxina botulínica fissura anal', 'tratamento fissura anal', 'fissura anal'],
    lastUpdated: '2026-09-01',
  },
  {
    slug: 'hpv-perianal-laser-co2',
    title: 'Tratamento de HPV perianal com laser de CO2',
    shortTitle: 'HPV perianal com laser',
    homeCardTitle: 'Eletrocoagulação a laser de lesões por HPV',
    homeCardDescription: 'Tratamento local com seguimento individualizado',
    category: 'laser',
    metaTitle: 'HPV perianal com laser de CO2 | Dra. Dayara Salomão',
    metaDescription:
      'Tratamento de lesões por HPV na região perianal com laser de CO2, avaliação especializada e seguimento cuidadoso.',
    summary:
      'Abordagem para lesões por HPV na região perianal com foco em precisão local, remoção adequada das lesões e acompanhamento próximo.',
    howItWorks: [
      'O laser de CO2 vaporiza seletivamente as lesões visíveis. Como o feixe é fortemente absorvido pela água do tecido, ele remove camadas finas com controle milimétrico e preserva o tecido saudável ao redor.',
      'O procedimento é realizado com anestesia local ou sedação rápida, conforme a extensão das lesões.',
      'O acompanhamento preventivo contínuo faz parte do tratamento, porque lesões por HPV podem recidivar mesmo depois de uma boa resposta inicial. Tudo com total sigilo.',
    ],
    overview: [
      'O HPV perianal se manifesta como condilomas: uma ou várias lesões de superfície irregular, "em couve-flor", às vezes ásperas ao toque. Podem crescer, se multiplicar, coçar e ocasionalmente sangrar levemente.',
      'O vírus é transmitido principalmente por contato sexual. O tratamento precisa considerar extensão, localização e a possibilidade de novas lesões ao longo do seguimento.',
      'Nem toda lesão perianal é HPV. O plicoma, uma simples sobra de pele, é liso, único ou em pequeno número, não coça e não cresce — e é confundido com condiloma com alguma frequência. Por isso o diagnóstico é clínico, feito por exame direto, e pode ser confirmado com biópsia em caso de dúvida.',
    ],
    indications: [
      'Lesões visíveis ou suspeitas na região perianal com avaliação compatível com HPV.',
      'Recorrência de lesões que exigem abordagem especializada.',
      'Necessidade de tratamento local com cuidado anatômico e seguimento.',
    ],
    benefits: [
      'Vaporização seletiva das lesões visíveis, sem agredir o tecido saudável ao redor.',
      'Anestesia local ou sedação rápida, conforme a extensão do quadro.',
      'Menor sangramento, já que o laser sela pequenos vasos enquanto corta.',
      'Boa cicatrização estética em lesões de pele da região perianal.',
      'Acompanhamento preventivo contínuo para monitorar cicatrização e recidiva, com total sigilo.',
    ],
    carePath: [
      'A consulta define necessidade de exame complementar, tratamento local e seguimento contínuo.',
      'O acompanhamento é essencial porque lesões por HPV podem recidivar mesmo após boa resposta inicial.',
    ],
    faqs: [
      {
        question: 'Como sei se é verruga de HPV ou apenas uma sobra de pele?',
        answer:
          'A verruga de HPV tem superfície irregular, tipo couve-flor, costuma aparecer em grupos, pode crescer, coçar ou sangrar levemente. O plicoma é liso, da cor da pele, geralmente único ou em pequeno número, não coça e não muda de tamanho. O diagnóstico definitivo é clínico, por exame direto.',
      },
      {
        question: 'O tratamento a laser dói?',
        answer:
          'O procedimento é feito com anestesia local ou sedação rápida, conforme a extensão das lesões. O laser de CO2 vaporiza apenas a lesão, poupando o tecido saudável ao redor, o que costuma resultar em menos desconforto e melhor cicatrização.',
      },
      {
        question: 'As lesões podem voltar depois do tratamento?',
        answer:
          'Podem. Por isso o acompanhamento preventivo contínuo faz parte do tratamento, e não é um extra opcional. A consulta de retorno permite identificar e tratar precocemente qualquer lesão nova.',
      },
    ],
    relatedBlogSlugs: [
      'hpv-perianal-laser-co2',
      'hpv-anal-identificar-tratar',
      'plicoma-ou-hpv-perianal-como-diferenciar',
      'lesoes-verrugas-nodulos-regiao-anal-o-que-observar',
    ],
    mappedDiseaseNames: ['HPV Anal'],
    keywords: ['HPV perianal laser CO2', 'tratamento HPV anal', 'HPV anal'],
    lastUpdated: '2026-09-01',
  },
  {
    slug: 'tratamento-prurido-anal',
    title: 'Tratamento de prurido anal',
    shortTitle: 'Prurido anal',
    homeCardTitle: 'Tratamento de prurido anal',
    homeCardDescription: 'Investigação da coceira anal e cuidado da pele local',
    category: 'conservative',
    metaTitle: 'Tratamento de prurido anal | Dra. Dayara Salomão',
    metaDescription:
      'Avaliação especializada para prurido anal, com investigação das causas, cuidado da pele local e orientação individualizada.',
    summary:
      'Conduta voltada a identificar fatores que mantêm a coceira anal e orientar cuidados locais, hábitos e tratamento conforme a causa encontrada.',
    howItWorks: [
      'O tratamento começa pela busca da causa. A consulta reúne informações sobre o hábito intestinal, escapes de fezes ou de muco, umidade, rotina de higiene, alimentação e todos os produtos já aplicados na região, inclusive pomadas compradas sem receita. Em seguida vem o exame proctológico, que avalia a pele ao redor do ânus e, quando indicado e tolerável, o canal anal.',
      'Quando aparece uma causa tratável — fissura, hemorroida, plicoma que dificulta a higiene, fístula que drena secreção, lesão por HPV, micose ou dermatite —, o tratamento se volta para ela. Quando nenhuma causa específica é encontrada, o plano segue em etapas: retirar irritantes, manter a pele limpa e seca, deixar as fezes mais firmes e fáceis de limpar e interromper o hábito de coçar.',
      'Medicamentos de uso local, como corticoides de baixa potência ou cremes de barreira, podem entrar por períodos curtos e com orientação, porque o uso prolongado afina e irrita a pele. Se a pele tem aspecto atípico ou não responde ao tratamento, pode ser indicada uma biópsia ou exames de raspado da pele para esclarecer o diagnóstico.',
    ],
    overview: [
      'O prurido anal pode estar relacionado a irritação da pele, umidade, higiene excessiva, dermatites, fissuras, hemorroidas, infecções ou outras condições da região anal.',
      'As revisões sobre o tema separam os casos em dois grupos: os secundários, em que existe uma causa identificável e muitas vezes tratável, e os idiopáticos, em que o exame não mostra uma causa única. Essa distinção define a conduta: no primeiro grupo, trata-se a causa; no segundo, o foco é proteger a pele e quebrar o ciclo de irritação.',
      'O tratamento depende de entender o que está provocando ou perpetuando a coceira. Por isso, a avaliação clínica é importante antes de usar pomadas por conta própria ou repetir medidas que irritam ainda mais a pele.',
    ],
    indications: [
      'Coceira anal persistente, recorrente ou associada a ardor e irritação da pele.',
      'Sintomas que pioram após evacuar, durante a noite ou com uso frequente de produtos locais.',
      'Coceira que não melhorou depois de algumas semanas de cuidados básicos com a pele.',
      'Casos em que há sangramento, secreção, feridas, verrugas ou dor junto da coceira.',
    ],
    benefits: [
      'Investigação direcionada das causas mais comuns de coceira anal.',
      'Exame proctológico para diferenciar doenças anorretais de alterações da pele.',
      'Revisão dos produtos já usados na região, que muitas vezes mantêm a irritação.',
      'Orientação sobre higiene, umidade, atrito e produtos que podem irritar a pele.',
      'Tratamento individualizado conforme achados do exame e histórico do paciente.',
    ],
    carePath: [
      'A consulta avalia pele, canal anal, hábitos de higiene, evacuação, uso de medicamentos e possíveis doenças associadas.',
      'O acompanhamento ajusta os cuidados locais e define se há necessidade de tratar fissuras, hemorroidas, dermatites, infecções ou outras causas específicas.',
      'Leve para a consulta a lista de pomadas, sabonetes e lenços que já usou na região. Essa informação costuma orientar a conduta tanto quanto o exame.',
    ],
    recovery: [
      'Com a causa identificada e os cuidados locais ajustados, muitas pessoas percebem algum alívio já na primeira semana, segundo o material de orientação da Sociedade Americana de Cirurgiões de Cólon e Reto. É uma referência média, não uma garantia: a resposta varia com a causa e com o tempo de sintoma.',
      'Quando a coceira persiste depois de cerca de seis semanas de tratamento, o retorno serve para rever o diagnóstico, considerar exames da pele ou investigar outra causa. Suspeitas ligadas à alimentação costumam ser testadas retirando um item por vez, por cerca de duas semanas, para perceber o que realmente faz diferença.',
      'A coceira pode voltar mesmo depois de uma boa melhora, sobretudo quando os fatores de irritação retornam. Por isso, parte do tratamento é manter, a longo prazo, os hábitos que protegem a pele.',
    ],
    limitations: [
      'Cuidados locais não resolvem uma doença de base: fissura, fístula, plicoma que dificulta a higiene ou lesão por HPV precisam de tratamento próprio.',
      'Pomadas com corticoide não devem ser usadas por tempo prolongado. Elas aliviam no curto prazo, mas podem afinar a pele e piorar a coceira.',
      'Coceira no corpo todo, e não só na região anal, pode indicar doença de pele ou condição clínica que exige avaliação de outras especialidades.',
      'Sangramento, mudança do hábito intestinal, escape de fezes, feridas que não cicatrizam ou alteração persistente da pele exigem investigação, e não apenas alívio do sintoma.',
      'Nos casos sem causa definida, o tratamento controla o sintoma, mas recaídas não são incomuns e podem exigir mudanças de hábito mantidas por muito tempo.',
    ],
    faqs: [
      {
        question: 'Prurido anal tem cura?',
        answer:
          'Quando existe uma causa específica, como fissura, micose ou dermatite de contato, tratá-la costuma aliviar a coceira. Nos casos sem causa definida, o tratamento controla o sintoma, mas recaídas não são incomuns, e os cuidados com a pele precisam ser mantidos depois da melhora.',
      },
      {
        question: 'Quanto tempo demora para a coceira anal melhorar?',
        answer:
          'Muitas pessoas percebem algum alívio na primeira semana de cuidados corretos, mas isso varia. Se não houver melhora depois de cerca de seis semanas, o caso deve ser reavaliado para rever a causa.',
      },
      {
        question: 'Quais alimentos podem piorar a coceira anal?',
        answer:
          'Café, inclusive o descafeinado, chá, refrigerantes do tipo cola, chocolate, tomate, frutas cítricas, comidas apimentadas, cerveja e laticínios são citados com frequência. A relação não é igual para todos: a orientação é retirar um item por vez, por cerca de duas semanas, e observar a resposta.',
      },
      {
        question: 'Lenço umedecido ajuda ou atrapalha?',
        answer:
          'Lenços com perfume, álcool ou outros aditivos podem irritar a pele. Limpar com água e secar sem esfregar costuma ser mais seguro. Se usar lenço, prefira os sem fragrância e apenas encoste de leve na região, sem fricção.',
      },
      {
        question: 'Coceira anal à noite pode ser verme?',
        answer:
          'Pode, principalmente em crianças, em quem a oxiúrase é uma causa conhecida de coceira noturna. Em adultos, vermes são uma causa pouco comum, e a coceira à noite costuma ter outras explicações, como umidade, dermatite ou o próprio ciclo de coçar.',
      },
      {
        question: 'Escape de fezes ou de muco pode causar coceira?',
        answer:
          'Sim. Pequenas perdas de fezes ou de muco, às vezes imperceptíveis, irritam a pele ao redor do ânus. Por isso a consulta pergunta sobre o hábito intestinal, e deixar as fezes mais firmes, por exemplo com fibra, faz parte do tratamento.',
      },
    ],
    sources: [
      {
        title: 'Pruritis Ani — Expanded Version',
        organization: 'American Society of Colon and Rectal Surgeons (ASCRS) — material para pacientes',
        url: 'https://fascrs.org/Web/Web/Patients/Diseases-and-Conditions/A-Z/Pruritis-Ani-Expanded-Version.aspx',
        accessedAt: '2026-11-12',
      },
      {
        title: 'Pruritus Ani',
        organization: 'Ansari P. — Clinics in Colon and Rectal Surgery 2016;29(1):38–42',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4755774/',
        accessedAt: '2026-11-12',
      },
      {
        title: 'Itchy bottom',
        organization: 'NHS (Serviço Nacional de Saúde do Reino Unido)',
        url: 'https://www.nhs.uk/symptoms/itchy-anus/',
        accessedAt: '2026-11-12',
      },
    ],
    relatedBlogSlugs: [
      'prurido-anal-causas-cuidados',
      'lesoes-verrugas-nodulos-regiao-anal-o-que-observar',
    ],
    mappedDiseaseNames: ['Prurido Anal'],
    keywords: ['tratamento prurido anal', 'coceira anal', 'prurido anal'],
    lastUpdated: '2026-11-12',
  },
  {
    slug: 'tratamento-constipacao-intestino-preso',
    title: 'Tratamento de constipação e intestino preso',
    shortTitle: 'Constipação',
    homeCardTitle: 'Tratamento de constipação intestinal',
    homeCardDescription: 'Avaliação do intestino preso e ajuste do hábito evacuatório',
    category: 'conservative',
    metaTitle: 'Tratamento de constipação intestinal | Dra. Dayara Salomão',
    metaDescription:
      'Avaliação de constipação e intestino preso com orientação alimentar, hábitos evacuatórios e investigação quando necessário.',
    summary:
      'Acompanhamento para entender a causa do intestino preso, corrigir fatores agravantes e orientar um plano compatível com a rotina e os sintomas.',
    howItWorks: [
      'O tratamento segue etapas. A primeira é entender o padrão: frequência, formato das fezes, esforço, sensação de bloqueio, necessidade de manobras para evacuar, medicamentos em uso e sinais de alerta. O exame proctológico complementa a conversa e mostra se fissura, hemorroida ou outra alteração local está participando do quadro.',
      'Na maior parte dos casos, o ponto de partida é ajustar a alimentação, a ingestão de líquidos e a fibra, de preferência a fibra solúvel, como o psyllium, aumentada aos poucos. Quando isso não basta, entram laxantes escolhidos conforme o caso: as diretrizes colocam os de ação osmótica como primeira opção medicamentosa e reservam os estimulantes para resgate ou segunda linha.',
      'Se o intestino continua preso apesar dessas medidas, as diretrizes recomendam investigar um distúrbio da evacuação, em que os músculos do assoalho pélvico não relaxam na hora certa. Exames da função anorretal, como a manometria, e exames de imagem da evacuação ajudam a esclarecer o problema. Quando ele é confirmado, o tratamento de primeira linha é a reabilitação do assoalho pélvico com biofeedback, e não um laxante mais forte.',
      'Procedimentos e cirurgias ficam para situações selecionadas, como algumas alterações anatômicas do reto, e só são considerados depois de tratadas as causas funcionais e de exames específicos, como a medida do tempo de trânsito intestinal.',
    ],
    overview: [
      'A constipação pode envolver fezes endurecidas, esforço para evacuar, sensação de evacuação incompleta, baixa frequência evacuatória ou necessidade de manobras para conseguir evacuar.',
      'A diretriz da Sociedade Americana de Cirurgiões de Cólon e Reto descreve três tipos principais de constipação: com trânsito normal, com trânsito lento e por dificuldade de saída das fezes. Saber em qual deles o quadro se encaixa muda o tratamento, porque o que funciona para um tipo pode não funcionar para outro.',
      'O plano de tratamento pode incluir ajustes alimentares, hidratação, atividade física, reeducação do hábito evacuatório, medicamentos quando indicados e investigação complementar em casos selecionados.',
    ],
    indications: [
      'Intestino preso persistente, esforço evacuatório ou fezes muito ressecadas.',
      'Sensação frequente de evacuação incompleta ou bloqueio na saída das fezes.',
      'Constipação que não melhorou com ajuste de fibras, líquidos e laxantes usados de forma orientada.',
      'Constipação associada a sangramento, dor, perda de peso, anemia ou mudança recente do padrão intestinal.',
    ],
    benefits: [
      'Avaliação do padrão evacuatório e dos fatores que mantêm a constipação.',
      'Plano em etapas, que começa pelas medidas mais simples e avança conforme a resposta.',
      'Atenção ao distúrbio da evacuação, que pode explicar por que o laxante não resolve.',
      'Plano individualizado para reduzir esforço e trauma local durante a evacuação.',
      'Identificação de sinais que indicam necessidade de exames ou investigação adicional.',
    ],
    carePath: [
      'A consulta levanta frequência evacuatória, formato das fezes, dieta, ingestão de líquidos, medicamentos em uso e sintomas associados.',
      'O seguimento ajusta as medidas iniciais e avalia resposta, evitando dependência de laxantes sem orientação.',
      'A colonoscopia não é realizada pela Dra. Dayara neste local. Se o seu caso exigir o exame, a orientação de onde fazê-lo faz parte da consulta.',
    ],
    recovery: [
      'Mudanças de alimentação e de rotina podem mostrar efeito em poucos dias, mas às vezes levam algumas semanas. Nos estudos com fibra e com laxantes, a resposta costuma ser avaliada depois de cerca de quatro semanas, um intervalo razoável para o primeiro retorno. São médias de estudos e variam de pessoa para pessoa.',
      'A fibra deve ser aumentada aos poucos e acompanhada de mais líquidos. No retorno, o plano é ajustado conforme a resposta: tipo e quantidade de fibra, escolha do laxante e rotina de banheiro.',
      'Quando há distúrbio da evacuação, o biofeedback funciona como um treinamento feito em sessões. A diretriz americana aponta que reforços periódicos ajudam a manter o resultado e que o sucesso depende muito da participação do paciente nos exercícios.',
    ],
    limitations: [
      'Laxante não resolve todo intestino preso. Quando o problema está na saída das fezes, aumentar a dose pode não funcionar e atrasar o diagnóstico.',
      'Sangue nas fezes, perda de peso sem explicação, anemia, mudança recente do hábito intestinal ou histórico familiar de câncer colorretal indicam investigação, que pode incluir exame endoscópico, antes de seguir apenas com medidas clínicas.',
      'Constipação causada por medicamentos de uso contínuo pode exigir ajuste da prescrição com o médico responsável, e não só tratamento intestinal.',
      'Fezes muito endurecidas acumuladas no reto, com escape de fezes líquidas ao redor, podem ser confundidas com diarreia e precisam de avaliação médica.',
      'Cirurgia para constipação é exceção, considerada apenas em casos muito selecionados, depois do tratamento clínico e de exames específicos.',
    ],
    faqs: [
      {
        question: 'Posso usar laxante por conta própria?',
        answer:
          'Por pouco tempo, laxantes vendidos sem receita podem ajudar, e a orientação de serviços de saúde é que sejam usados por períodos curtos. Se você precisa de laxante com frequência ou ele deixou de funcionar, vale avaliar a causa, porque o uso contínuo sem orientação pode mascarar um problema que precisa de outro tratamento.',
      },
      {
        question: 'Quanto tempo leva para o intestino voltar a funcionar com o tratamento?',
        answer:
          'Ajustes de dieta e de rotina podem fazer efeito em poucos dias, mas às vezes levam algumas semanas. Nos estudos, a resposta ao tratamento costuma ser avaliada após cerca de quatro semanas. Se não houver melhora, o plano é revisto.',
      },
      {
        question: 'O que é biofeedback para intestino preso?',
        answer:
          'É um treinamento do assoalho pélvico com aparelhos que registram a atividade dos músculos e mostram ao paciente como eles estão agindo na hora de evacuar. É o tratamento de primeira linha quando esses músculos não relaxam de forma coordenada, quadro chamado de dissinergia.',
      },
      {
        question: 'Banquinho para os pés ajuda a evacuar?',
        answer:
          'Pode ajudar. Apoiar os pés num banquinho, com os joelhos acima do quadril, facilita a posição de evacuar para muitas pessoas. Também ajuda reservar um horário tranquilo para ir ao banheiro e não adiar quando sentir vontade.',
      },
      {
        question: 'Que remédios podem prender o intestino?',
        answer:
          'Analgésicos opioides, alguns antidepressivos, anticolinérgicos, bloqueadores de canal de cálcio e suplementos de cálcio estão entre os mais associados à constipação. Não suspenda nenhum medicamento por conta própria: leve a lista para a consulta, para que um eventual ajuste seja feito com segurança.',
      },
      {
        question: 'Intestino preso pode causar diarreia?',
        answer:
          'Pode parecer que sim. Na constipação prolongada, fezes endurecidas podem se acumular no reto, e fezes líquidas escapam ao redor delas, o que é confundido com diarreia. Esse quadro, chamado de impactação fecal ou fecaloma, precisa de avaliação médica.',
      },
    ],
    sources: [
      {
        title:
          'The American Society of Colon and Rectal Surgeons Clinical Practice Guidelines for the Evaluation and Management of Chronic Constipation',
        organization: 'American Society of Colon and Rectal Surgeons (ASCRS) — Dis Colon Rectum 2024;67(10):1244–1257',
        url: 'https://ohsu.elsevierpure.com/en/publications/the-american-society-of-colon-and-rectal-surgeons-clinical-practi-5/',
        accessedAt: '2026-11-12',
      },
      {
        title:
          'Highlights From the Joint AGA/ACG Guideline on Pharmacologic Management of Chronic Idiopathic Constipation',
        organization: 'AGA/ACG — resumo publicado em Gastroenterology & Hepatology (2024)',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11775994/',
        accessedAt: '2026-11-12',
      },
      {
        title: 'Constipation',
        organization: 'NHS (Serviço Nacional de Saúde do Reino Unido)',
        url: 'https://www.nhs.uk/conditions/constipation/',
        accessedAt: '2026-11-12',
      },
    ],
    relatedBlogSlugs: [
      'constipacao-intestinal-quando-investigar',
      'alteracoes-habito-intestinal-quando-avaliar',
      'dor-ao-evacuar-quando-investigar',
    ],
    mappedDiseaseNames: ['Constipação'],
    keywords: ['tratamento constipação', 'intestino preso', 'constipação intestinal'],
    lastUpdated: '2026-11-12',
  },
  {
    slug: 'avaliacao-diarreia-cronica',
    title: 'Avaliação e tratamento de diarreia crônica',
    shortTitle: 'Diarreia crônica',
    homeCardTitle: 'Avaliação de diarreia crônica',
    homeCardDescription: 'Investigação de evacuações frequentes e fezes líquidas',
    category: 'conservative',
    metaTitle: 'Diarreia crônica: avaliação e tratamento | Dra. Dayara Salomão',
    metaDescription:
      'Avaliação de diarreia crônica com investigação de causas intestinais, sinais de alerta e orientação terapêutica individualizada.',
    summary:
      'Conduta para investigar diarreia persistente, orientar exames quando necessários e tratar conforme a causa provável ou confirmada.',
    howItWorks: [
      'A avaliação começa por confirmar do que se trata. Pelas diretrizes, diarreia crônica é a mudança persistente para fezes amolecidas ou líquidas, com aumento da frequência, por mais de quatro semanas. Na consulta também se verifica se a queixa é, na verdade, perda de fezes sem querer, problema que tem outro caminho de tratamento.',
      'Os primeiros exames costumam ser de sangue e de fezes, escolhidos conforme o caso: hemograma, investigação de doença celíaca, função da tireoide e marcadores de inflamação; nas fezes, pesquisa de infecções e de inflamação intestinal. Esses resultados, somados à idade, aos sinais de alerta e ao histórico familiar, definem se é preciso ir além.',
      'Quando os achados apontam para inflamação, sangramento ou outra causa no intestino grosso, o passo seguinte pode ser a colonoscopia com biópsias, inclusive de áreas de aparência normal. A colonoscopia não é realizada pela Dra. Dayara neste local; quando indicada, a orientação de onde fazê-la faz parte da consulta.',
      'Com a causa identificada, o tratamento é dirigido a ela: revisão de um medicamento que provoca diarreia, ajuste alimentar em uma intolerância confirmada, tratamento de uma infecção, controle de uma doença inflamatória ou manejo de um quadro funcional. Quando a queixa principal é o escape de fezes, entram medidas para firmar as fezes, treino do hábito intestinal e, em casos selecionados, exames da função anorretal e biofeedback.',
    ],
    overview: [
      'Diarreia crônica é a presença de fezes líquidas ou pastosas por período prolongado, muitas vezes associada a urgência, cólicas, gases, muco ou perda de controle.',
      'As causas podem incluir intolerâncias alimentares, infecções, medicamentos, síndrome do intestino irritável, doenças inflamatórias intestinais e outras condições que precisam ser diferenciadas com cuidado.',
      'A conduta se organiza em torno de três perguntas: há sinais de alerta? Os exames mostram inflamação? A queixa é diarreia ou escape de fezes? Em pessoas mais jovens, sem sangramento e com exame de fezes normal, a diretriz britânica procura evitar exames invasivos desnecessários; em pessoas mais velhas ou com sinais de alerta, a investigação tende a ser mais ampla.',
    ],
    indications: [
      'Diarreia persistente ou recorrente por várias semanas.',
      'Urgência evacuatória, muco, cólicas, gases ou impacto importante na rotina.',
      'Escape de fezes ou dificuldade de chegar ao banheiro a tempo, mesmo quando as fezes não estão muito líquidas.',
      'Diarreia associada a sangue nas fezes, emagrecimento, febre, anemia ou sintomas noturnos.',
    ],
    benefits: [
      'Investigação orientada por sinais clínicos e padrão dos sintomas.',
      'Diferenciação entre diarreia e incontinência fecal, que muitas vezes são confundidas.',
      'Redução do uso empírico de medicamentos sem diagnóstico claro.',
      'Encaminhamento para exames específicos quando há sinais de alerta ou suspeitas relevantes.',
    ],
    carePath: [
      'A consulta revisa duração, frequência, alimentação, medicamentos, histórico familiar, viagens, exames prévios e sinais de alerta.',
      'O plano pode incluir medidas dietéticas, exames laboratoriais, avaliação endoscópica quando indicada e tratamento direcionado à causa.',
      'Exames anteriores ajudam, mesmo os antigos: leve resultados de sangue, de fezes, colonoscopias e biópsias que já tenha feito.',
    ],
    recovery: [
      'A investigação costuma acontecer em etapas ao longo de algumas semanas: primeiro os exames de sangue e de fezes, depois o retorno para interpretar os resultados e, se necessário, exames mais específicos. O tempo total depende de quais exames são pedidos e de onde são realizados.',
      'Quando a causa tem correção direta, como um medicamento que pode ser trocado ou uma infecção tratável, a melhora pode vir logo após o ajuste. Em quadros funcionais ou inflamatórios, o acompanhamento é mais longo, e o tratamento é revisto nos retornos conforme a resposta.',
      'Durante esse período, vale manter a hidratação e procurar atendimento antes do retorno se surgirem sangue nas fezes, febre, sinais de desidratação ou piora importante.',
    ],
    limitations: [
      'Sangue nas fezes, perda de peso, anemia, febre, sintomas que acordam à noite ou início recente em pessoa mais velha exigem investigação, e não apenas medidas para controlar o sintoma.',
      'Algumas causas, como a colite microscópica e a diarreia por ácidos biliares, dependem de exames específicos, feitos em serviços de referência.',
      'Antidiarreicos podem aliviar o sintoma, mas não tratam a causa e não substituem a investigação quando há sinais de alerta.',
      'Doenças como a doença celíaca e as doenças inflamatórias intestinais exigem acompanhamento contínuo, muitas vezes conduzido em conjunto com a gastroenterologia.',
      'Diarreia com desidratação, febre alta, sangramento volumoso ou fraqueza importante precisa de atendimento de urgência, e não de consulta agendada.',
    ],
    faqs: [
      {
        question: 'Quais exames são pedidos primeiro na diarreia crônica?',
        answer:
          'Em geral, exames de sangue, como hemograma, função da tireoide e o teste de doença celíaca, e exames de fezes que procuram infecções e inflamação intestinal. A escolha depende da idade, dos sintomas e dos sinais de alerta.',
      },
      {
        question: 'O que é calprotectina fecal?',
        answer:
          'É um exame de fezes que sinaliza inflamação no intestino. Ajuda a diferenciar quadros funcionais, como a síndrome do intestino irritável, de doenças inflamatórias e, em pessoas mais jovens sem sinais de alerta, pode evitar exames invasivos desnecessários.',
      },
      {
        question: 'Posso tomar antidiarreico enquanto investigo?',
        answer:
          'Por pouco tempo e com orientação, ele pode aliviar o sintoma. Mas o antidiarreico não trata a causa, e, quando há sangue nas fezes, febre ou outros sinais de alerta, a avaliação deve vir antes.',
      },
      {
        question: 'O que é diarreia por ácidos biliares?',
        answer:
          'É uma causa de diarreia aquosa em que ácidos biliares em excesso chegam ao intestino grosso. Ela tem exames próprios. Quando o exame não está disponível, a diretriz americana admite um teste com medicamento, enquanto a britânica prefere confirmar o diagnóstico antes de tratar.',
      },
      {
        question: 'Diarreia crônica pode ser intolerância à lactose?',
        answer:
          'Pode. A suspeita pode ser avaliada por um teste respiratório com lactose ou pela retirada orientada do leite e derivados por um período, observando a resposta. Cortes amplos na alimentação sem orientação, porém, podem atrapalhar a investigação de outras causas.',
      },
      {
        question: 'Coloproctologista trata diarreia crônica?',
        answer:
          'Participa da avaliação, especialmente quando há sangramento, urgência, escape de fezes ou sintomas anais, e ajuda a organizar a investigação. Quando a causa exige acompanhamento contínuo de outra especialidade, como a gastroenterologia, o cuidado é compartilhado.',
      },
    ],
    sources: [
      {
        title:
          'Guidelines for the investigation of chronic diarrhoea in adults: British Society of Gastroenterology, 3rd edition',
        organization: 'British Society of Gastroenterology (BSG) — Gut 2018;67:1380–1399',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6204957/',
        accessedAt: '2026-11-12',
      },
      {
        title:
          'AGA Clinical Practice Guidelines on the Laboratory Evaluation of Functional Diarrhea and Diarrhea-Predominant Irritable Bowel Syndrome in Adults (IBS-D)',
        organization: 'American Gastroenterological Association (AGA) — Gastroenterology 2019;157(3):851–854',
        url: 'https://gastro.org/clinical-guidance/laboratory-evaluation-of-functional-diarrhea-and-diarrhea-predominant-irritable-bowel-syndrome-in-adults-ibs-d/',
        accessedAt: '2026-11-12',
      },
      {
        title:
          'The American Society of Colon and Rectal Surgeons Clinical Practice Guidelines for the Management of Fecal Incontinence',
        organization: 'American Society of Colon and Rectal Surgeons (ASCRS) — Dis Colon Rectum 2023;66(5):647–661',
        url: 'https://journals.lww.com/dcrjournal/fulltext/2023/05000/the_american_society_of_colon_and_rectal_surgeons.6.aspx',
        accessedAt: '2026-11-12',
      },
    ],
    relatedBlogSlugs: [
      'diarreia-cronica-causas-sinais-alerta',
      'alteracoes-habito-intestinal-quando-avaliar',
    ],
    mappedDiseaseNames: ['Diarreia Crônica'],
    keywords: ['diarreia crônica tratamento', 'diarreia persistente', 'coloproctologista diarreia'],
    lastUpdated: '2026-11-12',
  },
  {
    slug: 'tratamento-sindrome-intestino-irritavel',
    title: 'Tratamento da síndrome do intestino irritável',
    shortTitle: 'Síndrome do intestino irritável',
    homeCardTitle: 'Tratamento da síndrome do intestino irritável',
    homeCardDescription: 'Cuidado para dor abdominal e alteração do hábito intestinal',
    category: 'conservative',
    metaTitle: 'Síndrome do intestino irritável: tratamento | Dra. Dayara Salomão',
    metaDescription:
      'Acompanhamento para síndrome do intestino irritável com avaliação de sintomas, sinais de alerta e plano individualizado.',
    summary:
      'Cuidado para quadros compatíveis com síndrome do intestino irritável, com foco em controle de sintomas, segurança diagnóstica e orientação de longo prazo.',
    howItWorks: [
      'O diagnóstico é feito pelo padrão dos sintomas, com dor abdominal recorrente ligada à evacuação ou a mudanças na frequência e no aspecto das fezes, e por poucos exames bem escolhidos. As diretrizes atuais tratam esse diagnóstico como positivo, e não como algo que só se conclui depois de excluir todas as outras doenças.',
      'O tratamento começa por medidas de base: explicação clara de como a síndrome funciona, refeições regulares, atividade física, hidratação e revisão de cafeína, álcool, bebidas gaseificadas e do tipo de fibra consumida. Manter um diário de sintomas ajuda a identificar gatilhos sem cortar alimentos à toa.',
      'Se os sintomas persistem, o tratamento passa a ser dirigido ao sintoma predominante: laxantes para a constipação, antidiarreicos para a diarreia e antiespasmódicos para as cólicas, com doses ajustadas pela consistência das fezes. Dietas de exclusão, como a de baixo teor de FODMAPs, entram como segunda etapa, conduzidas por profissional com experiência em nutrição e com reintrodução planejada dos alimentos.',
      'Quando essas medidas não bastam, podem ser usados medicamentos que modulam a comunicação entre intestino e cérebro, em doses baixas, e terapias psicológicas voltadas para o intestino, como a terapia cognitivo-comportamental e a hipnoterapia. Elas não significam que os sintomas sejam "da cabeça": atuam na sensibilidade aumentada do intestino.',
    ],
    overview: [
      'A síndrome do intestino irritável é uma condição funcional que pode causar dor abdominal, gases, distensão e alternância entre constipação e diarreia.',
      'A avaliação procura primeiro os sinais de alerta, que mudam o caminho e levam à investigação de doenças inflamatórias, doença celíaca, infecções e outras causas orgânicas. Sem esses sinais, o diagnóstico se apoia no padrão dos sintomas, com exames básicos de sangue e, quando há diarreia, um exame de fezes que procura inflamação.',
      'O plano é definido pelo subtipo predominante (constipação, diarreia ou padrão misto), pela intensidade dos sintomas e pelo impacto na rotina. As diretrizes americana e britânica concordam na maior parte das recomendações, mas divergem sobre probióticos e antiespasmódicos, e a evidência para ambos é limitada. Por isso, essas opções são discutidas caso a caso, com prazo definido para avaliar se ajudam.',
    ],
    indications: [
      'Dor abdominal recorrente associada a mudança do padrão evacuatório.',
      'Alternância entre intestino preso e diarreia, gases ou distensão abdominal.',
      'Sintomas persistentes que exigem diagnóstico diferencial e plano de acompanhamento.',
      'Diagnóstico prévio de síndrome do intestino irritável com sintomas que continuam atrapalhando a rotina.',
    ],
    benefits: [
      'Avaliação cuidadosa para diferenciar quadro funcional de sinais de alerta.',
      'Exames na medida do necessário, sem testes que as diretrizes não recomendam de rotina.',
      'Plano de cuidado adaptado ao subtipo predominante: constipação, diarreia ou padrão misto.',
      'Atenção a sintomas anais e à dificuldade para evacuar, que podem coexistir com a síndrome e têm tratamento próprio.',
      'Orientação sobre alimentação, rotina intestinal, medicamentos e acompanhamento conforme evolução.',
    ],
    carePath: [
      'A consulta mapeia sintomas, duração, gatilhos, padrão das fezes, histórico de exames e impacto na rotina.',
      'O acompanhamento ajusta o tratamento ao longo do tempo, pois os sintomas podem variar conforme alimentação, estresse, sono e outras condições associadas.',
      'Sinais de alerta que surgirem durante o acompanhamento, como sangramento ou perda de peso, levam à reavaliação e a novos exames.',
    ],
    recovery: [
      'A síndrome do intestino irritável é uma condição crônica, com fases melhores e piores. O objetivo do tratamento é reduzir os sintomas e o impacto na rotina, e o acompanhamento avança por etapas.',
      'Cada medida nova tem um prazo para ser avaliada. A diretriz britânica do NICE sugere testar um probiótico por pelo menos quatro semanas e rever o uso de medicamentos moduladores cerca de quatro semanas após o início. Dietas de exclusão também seguem um período de teste antes da reintrodução. Esses intervalos são referências e são ajustados a cada caso.',
      'Quando os sintomas persistem por muitos meses apesar do tratamento, as diretrizes recomendam rever o diagnóstico e considerar terapias psicológicas específicas, com abordagem multiprofissional nos casos mais difíceis.',
    ],
    limitations: [
      'Sangue nas fezes, perda de peso sem explicação, anemia, febre, sintomas que acordam à noite, início em idade mais avançada ou histórico familiar de câncer colorretal ou doença inflamatória intestinal mudam o caminho e exigem investigação antes de atribuir os sintomas à síndrome.',
      'Testes de intolerância alimentar por IgG, dieta sem glúten sem diagnóstico de doença celíaca e cortes amplos de alimentos sem acompanhamento não são recomendados pelas diretrizes para tratar a síndrome.',
      'A síndrome não tem tratamento cirúrgico, e a Sociedade Britânica de Gastroenterologia alerta contra cirurgias e exames desnecessários motivados apenas pelos sintomas.',
      'Analgésicos opioides não são indicados para a dor da síndrome e podem piorar o funcionamento do intestino.',
      'Dietas restritivas e alguns medicamentos de segunda linha exigem acompanhamento compartilhado com nutrição e gastroenterologia.',
    ],
    faqs: [
      {
        question: 'Síndrome do intestino irritável tem cura?',
        answer:
          'Não há um tratamento que elimine a síndrome de forma definitiva. Ela costuma ter fases de melhora e de piora, e o tratamento busca controlar os sintomas e reduzir o impacto na rotina, com ajustes ao longo do tempo.',
      },
      {
        question: 'Probiótico ajuda no intestino irritável?',
        answer:
          'As diretrizes divergem. A americana não recomenda probióticos para os sintomas gerais da síndrome; a britânica do NICE aceita que quem quiser experimente por pelo menos quatro semanas, observando o efeito. A evidência disponível é limitada, e a decisão é individual.',
      },
      {
        question: 'Por que um antidepressivo foi indicado se eu não estou deprimido?',
        answer:
          'Em doses baixas, alguns antidepressivos agem como moduladores da comunicação entre intestino e cérebro e reduzem a sensibilidade à dor intestinal. A dose costuma ser bem menor que a usada para depressão, e o uso é acompanhado de perto por causa dos efeitos colaterais.',
      },
      {
        question: 'A dieta low FODMAP funciona? Posso fazer sozinho?',
        answer:
          'Pode ajudar parte das pessoas, mas é uma estratégia de segunda etapa, indicada quando as medidas iniciais não resolveram. Deve ser feita com acompanhamento de profissional com experiência em nutrição, por tempo limitado e com reintrodução planejada dos alimentos, para não restringir a dieta sem necessidade.',
      },
      {
        question: 'Preciso fazer dieta sem glúten?',
        answer:
          'Não para tratar a síndrome: a dieta sem glúten não é recomendada pelas diretrizes para quem tem intestino irritável. O que se faz é pesquisar doença celíaca, que é outro diagnóstico, antes de qualquer mudança desse tipo.',
      },
      {
        question: 'Quando o coloproctologista entra no tratamento?',
        answer:
          'Quando há mudança do hábito intestinal que precisa ser avaliada, sangramento, dor ou sintomas anais, dificuldade para evacuar ou escape de fezes. Nesses casos, exames da função anorretal e reabilitação do assoalho pélvico podem fazer parte do plano, em conjunto com a gastroenterologia quando necessário.',
      },
    ],
    sources: [
      {
        title: 'Irritable bowel syndrome in adults: diagnosis and management (CG61)',
        organization: 'National Institute for Health and Care Excellence (NICE), Reino Unido — revisada em 2025',
        url: 'https://www.nice.org.uk/guidance/cg61',
        accessedAt: '2026-11-12',
      },
      {
        title: 'ACG Clinical Guideline: Management of Irritable Bowel Syndrome',
        organization: 'American College of Gastroenterology (ACG) — Am J Gastroenterol 2021;116:17–44',
        url: 'https://doi.org/10.14309/ajg.0000000000001036',
        accessedAt: '2026-11-12',
      },
      {
        title: 'British Society of Gastroenterology guidelines on the management of irritable bowel syndrome',
        organization: 'British Society of Gastroenterology (BSG) — Gut 2021;70:1214–1240',
        url: 'https://www.bsg.org.uk/clinical-resource/british-society-of-gastroenterology-guidelines-on-the-management-of-irritable-bowel-syndrome/',
        accessedAt: '2026-11-12',
      },
      {
        title: 'Diet, lifestyle and medicines for IBS (irritable bowel syndrome)',
        organization: 'NHS (Serviço Nacional de Saúde do Reino Unido)',
        url: 'https://www.nhs.uk/conditions/irritable-bowel-syndrome-ibs/treatment/',
        accessedAt: '2026-11-12',
      },
    ],
    relatedBlogSlugs: [
      'sindrome-intestino-irritavel-sintomas-manejo',
      'alteracoes-habito-intestinal-quando-avaliar',
      'constipacao-intestinal-quando-investigar',
      'diarreia-cronica-causas-sinais-alerta',
    ],
    mappedDiseaseNames: ['Síndrome do Intestino Irritável'],
    keywords: [
      'síndrome do intestino irritável tratamento',
      'intestino irritável',
      'dor abdominal alteração intestinal',
    ],
    lastUpdated: '2026-11-12',
  },
  {
    slug: 'tratamento-hidradenite-supurativa',
    title: 'Tratamento de hidradenite supurativa',
    shortTitle: 'Hidradenite supurativa',
    homeCardTitle: 'Tratamento de hidradenite supurativa',
    homeCardDescription: 'Avaliação de nódulos, abscessos e fístulas em áreas de dobra',
    category: 'conservative',
    metaTitle: 'Hidradenite supurativa: avaliação e tratamento | Dra. Dayara Salomão',
    metaDescription:
      'Avaliação de hidradenite supurativa em áreas perianais, virilhas e regiões de dobra, com plano individualizado.',
    summary:
      'Avaliação de hidradenite supurativa com atenção a dor, abscessos, drenagem, fístulas e impacto funcional, especialmente quando há acometimento perianal ou genital.',
    howItWorks: [
      'O diagnóstico da hidradenite é clínico, feito pelo exame das lesões, pelos locais acometidos e pela história de recorrência; não existe um exame de sangue que confirme a doença. Quando as lesões estão perto do ânus, o exame proctológico verifica se há envolvimento do canal anal, o que ajuda a separar hidradenite de fístula anal, doença de Crohn perianal e cisto pilonidal.',
      'O tratamento combina duas frentes. A primeira é clínica e busca controlar a inflamação: cuidados com a pele, antissépticos, antibióticos em cursos prolongados com efeito anti-inflamatório e, nos casos moderados a graves que não respondem, medicamentos imunobiológicos, prescritos e acompanhados pela dermatologia. A segunda é cirúrgica e remove o tecido que já não volta ao normal, como túneis e cicatrizes.',
      'Entre os procedimentos, a drenagem de um abscesso alivia a dor, mas tem efeito temporário. Para túneis localizados, pode ser feito o destelhamento, que remove o teto do trajeto e deixa a ferida cicatrizar. Áreas extensas podem exigir retirada mais ampla do tecido doente. A escolha depende da extensão da doença, do local e do controle da inflamação.',
      'Medidas gerais acompanham todas as fases: controle da dor, roupas que reduzam o atrito e apoio para parar de fumar e para o controle do peso, quando forem relevantes. Elas ajudam, mas o tratamento não depende de resolvê-las primeiro.',
    ],
    overview: [
      'A hidradenite supurativa é uma doença inflamatória crônica da pele que pode causar nódulos dolorosos, abscessos, drenagem e trajetos fistulosos em regiões como virilhas, períneo, região genital, perianal e axilas.',
      'Quando há acometimento próximo ao ânus, a avaliação coloproctológica ajuda a diferenciar hidradenite de fístula anal, abscessos anorretais e outras doenças que exigem condutas diferentes.',
      'A conduta é definida pela gravidade e pela extensão. O estadiamento de Hurley separa os casos com abscessos sem túneis nem cicatrizes, os com abscessos recorrentes, túneis e cicatrizes, e os com túneis interligados ocupando toda uma região. Nos estágios mais avançados, a cirurgia associada ao tratamento clínico ganha mais espaço.',
      'Por envolver pele, região anal e, às vezes, doenças associadas, o cuidado costuma ser compartilhado com a dermatologia. A diretriz europeia recomenda abordagem multiprofissional, e a parte coloproctológica se concentra nas lesões perianais e perineais e no diagnóstico diferencial com doenças anorretais.',
    ],
    indications: [
      'Nódulos dolorosos, abscessos ou secreção recorrente em virilhas, períneo, região genital ou perianal.',
      'Lesões que deixam cicatrizes, túneis na pele ou drenagem persistente.',
      'Diagnóstico de hidradenite com lesões perianais ou perineais que não melhoraram com o tratamento clínico.',
      'Suspeita de associação com fístula anal, doença inflamatória intestinal ou infecções locais.',
    ],
    benefits: [
      'Avaliação anatômica da região perianal e diferenciação de outras causas de fístulas e abscessos.',
      'Planejamento integrado com dermatologia ou outras especialidades quando necessário.',
      'Orientação sobre controle de inflamação, cuidados locais e indicação cirúrgica em casos selecionados.',
      'Explicação clara das fases da doença e do que cada tratamento pode e não pode fazer.',
    ],
    carePath: [
      'A consulta examina a extensão das lesões, histórico de recorrência, drenagem, dor e relação com a região anal.',
      'O seguimento pode envolver tratamento clínico, cuidados locais, exames de imagem e procedimentos quando houver abscessos, trajetos ou cicatrizes importantes.',
      'Se houver dor intensa, febre ou um abscesso que aumenta rapidamente, procure atendimento sem esperar a consulta agendada.',
    ],
    recovery: [
      'A hidradenite é uma doença crônica, com crises e períodos de calmaria. O acompanhamento é de longo prazo, e o objetivo é reduzir a frequência e a intensidade das crises, a dor e a progressão para túneis e cicatrizes.',
      'Os tratamentos clínicos levam tempo para mostrar efeito. Nas diretrizes, os cursos de antibiótico com finalidade anti-inflamatória duram em geral cerca de três meses, e a resposta aos medicamentos costuma ser avaliada após semanas a meses de uso. São referências médias e variam de pessoa para pessoa.',
      'Depois de um destelhamento, a ferida costuma cicatrizar ao longo de algumas semanas; retiradas mais amplas têm cicatrização mais demorada, muitas vezes com curativos por um período. A doença pode reaparecer em outras áreas, por isso o seguimento continua mesmo após a cirurgia.',
    ],
    limitations: [
      'A drenagem isolada de abscessos alivia a crise, mas não trata a doença de base e não impede novas lesões.',
      'Medicamentos imunobiológicos e outros tratamentos sistêmicos de longo prazo são indicados e acompanhados pela dermatologia, e não pela coloproctologia.',
      'Cirurgia não elimina a doença: novas lesões podem surgir em áreas não operadas, e o controle clínico continua necessário.',
      'Febre, dor intensa e progressiva ou abscesso volumoso podem indicar infecção e exigem atendimento rápido.',
      'Diarreia persistente, sangue nas fezes ou perda de peso exigem investigação de doença inflamatória intestinal, que pode estar associada à hidradenite.',
    ],
    faqs: [
      {
        question: 'Hidradenite supurativa tem cura?',
        answer:
          'Não existe tratamento que elimine a doença de forma definitiva. Ela costuma persistir por anos, mas pode ficar inativa com o tempo, e o tratamento ajuda a reduzir o número e a intensidade das crises.',
      },
      {
        question: 'Hidradenite é contagiosa?',
        answer:
          'Não. A hidradenite não passa de uma pessoa para outra. Ela pode, porém, se repetir na mesma família: cerca de um terço das pessoas afetadas tem parentes com a doença.',
      },
      {
        question: 'O que fazer durante uma crise até a consulta?',
        answer:
          'Compressas mornas ou um banho podem ajudar o pus a drenar, e analgésicos usados conforme orientação aliviam a dor. Roupas folgadas e evitar depilar a área reduzem o atrito. Se houver febre, dor intensa ou abscesso que cresce rapidamente, procure atendimento.',
      },
      {
        question: 'Antibiótico cura a hidradenite?',
        answer:
          'Não cura, mas ajuda a controlar. Nas crises com sinais de infecção, podem ser usados cursos curtos. Para prevenir novas crises, as diretrizes descrevem cursos mais longos, em geral de cerca de três meses, em que o antibiótico age principalmente contra a inflamação.',
      },
      {
        question: 'O que é destelhamento na hidradenite?',
        answer:
          'É um procedimento que remove a parte de cima de um túnel sob a pele, deixando o fundo aberto para cicatrizar. É indicado para túneis localizados, costuma ser feito com anestesia local, e a ferida cicatriza ao longo de algumas semanas.',
      },
      {
        question: 'Hidradenite tem relação com doença de Crohn?',
        answer:
          'Pode haver associação, e as duas doenças podem causar lesões parecidas perto do ânus. Por isso, quem tem hidradenite e apresenta diarreia persistente, sangue nas fezes ou perda de peso deve ser avaliado, e o exame do canal anal ajuda a diferenciar os quadros.',
      },
    ],
    sources: [
      {
        title: 'European S2k guidelines for hidradenitis suppurativa/acne inversa part 2: Treatment',
        organization:
          'European Hidradenitis Suppurativa Foundation / EADV — J Eur Acad Dermatol Venereol 2025;39(5):899–941',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12023723/',
        accessedAt: '2026-11-12',
      },
      {
        title: 'Hidradenitis suppurativa — patient information leaflet',
        organization: 'British Association of Dermatologists (BAD) — atualizado em março de 2025',
        url: 'https://www.bad.org.uk/pils/hidradenitis-suppurativa/',
        accessedAt: '2026-11-12',
      },
      {
        title: 'Hidradenitis suppurativa (HS)',
        organization: 'NHS (Serviço Nacional de Saúde do Reino Unido)',
        url: 'https://www.nhs.uk/conditions/hidradenitis-suppurativa/',
        accessedAt: '2026-11-12',
      },
      {
        title: 'Hidradenitis Suppurativa Perineal and Perianal',
        organization: 'Luporini RL, et al. — Benign Anorectal Disorders: An Update (IntechOpen, 2022)',
        url: 'https://doi.org/10.5772/intechopen.105632',
        accessedAt: '2026-11-12',
      },
    ],
    relatedBlogSlugs: [
      'hidradenite-supurativa-sintomas-tratamento',
      'fistula-anal-o-que-e-sintomas',
      'cisto-pilonidal-sinais-diagnostico',
    ],
    mappedDiseaseNames: ['Hidradenite Supurativa'],
    keywords: [
      'hidradenite supurativa tratamento',
      'hidradenite perianal',
      'abscessos recorrentes virilha períneo',
    ],
    lastUpdated: '2026-11-12',
  },
  {
    slug: 'acompanhamento-doencas-inflamatorias-intestinais',
    title: 'Acompanhamento de doenças inflamatórias intestinais',
    shortTitle: 'Doenças inflamatórias intestinais',
    homeCardTitle: 'Acompanhamento de doenças inflamatórias intestinais',
    homeCardDescription: 'Cuidado para retocolite ulcerativa e doença de Crohn',
    category: 'conservative',
    metaTitle: 'Doenças inflamatórias intestinais: acompanhamento | Dra. Dayara Salomão',
    metaDescription:
      'Acompanhamento de retocolite ulcerativa e doença de Crohn com avaliação coloproctológica, sinais de alerta e cuidado individualizado.',
    summary:
      'Acompanhamento para pacientes com suspeita ou diagnóstico de retocolite ulcerativa e doença de Crohn, com atenção a sintomas intestinais, doença perianal e seguimento seguro.',
    howItWorks: [
      'As doenças inflamatórias intestinais são cuidadas em equipe. O tratamento medicamentoso de longo prazo, que controla a inflamação e mantém a doença em remissão, é conduzido pela gastroenterologia. A coloproctologia participa da avaliação dos sintomas no reto e no ânus, do tratamento das complicações perianais e das decisões cirúrgicas.',
      'Quando ainda não há diagnóstico, a consulta organiza o caminho. A confirmação depende de colonoscopia com biópsias de vários segmentos, incluindo o íleo e o reto, que mostram o tipo e a extensão da inflamação. A colonoscopia não é realizada pela Dra. Dayara neste local; quando indicada, a orientação de onde fazê-la faz parte da consulta.',
      'Na doença de Crohn com fístula ou abscesso perianal, o primeiro passo é controlar a infecção. Abscessos precisam de drenagem, e fístulas complexas costumam receber um sedenho, fio colocado no trajeto para mantê-lo drenando, antes ou junto do tratamento medicamentoso. Fístulas simples e sem sintomas podem não precisar de tratamento específico, e cirurgias locais são planejadas, de preferência, com a inflamação intestinal controlada.',
      'Ao longo do acompanhamento, exames de sangue, de fezes, de imagem e endoscópicos avaliam a atividade da doença. Pessoas com inflamação extensa do intestino grosso têm risco maior de câncer colorretal e precisam de vigilância com colonoscopia, em intervalos definidos pela equipe.',
    ],
    overview: [
      'As doenças inflamatórias intestinais incluem principalmente retocolite ulcerativa e doença de Crohn. Elas podem causar diarreia, sangue nas fezes, dor abdominal, perda de peso, anemia e manifestações fora do intestino.',
      'As duas doenças têm comportamentos diferentes. Na retocolite, a inflamação começa no reto e se estende de forma contínua pelo intestino grosso, atingindo a camada interna da parede. Na doença de Crohn, ela pode surgir em qualquer parte do tubo digestivo, de forma salteada, atravessa toda a espessura da parede e pode acometer a região perianal.',
      'Na coloproctologia, o acompanhamento é especialmente importante quando há sintomas no reto e ânus, doença perianal, fístulas, abscessos ou necessidade de avaliação cirúrgica em situações específicas.',
      'A conduta depende do tipo de doença, da extensão, da atividade inflamatória, das complicações e dos tratamentos já usados. Por isso, decisões sobre cirurgia ou procedimentos anais são tomadas em conjunto com a gastroenterologia.',
    ],
    indications: [
      'Suspeita ou diagnóstico de retocolite ulcerativa ou doença de Crohn.',
      'Diarreia com sangue, muco, dor abdominal, anemia, perda de peso ou sintomas persistentes.',
      'Fístulas, abscessos, fissuras complexas ou dor perianal em pacientes com doença inflamatória intestinal.',
      'Necessidade de opinião sobre cirurgia ou sobre lesões anais em quem já trata a doença com a gastroenterologia.',
    ],
    benefits: [
      'Avaliação coloproctológica dos sintomas intestinais e perianais.',
      'Identificação de sinais que exigem investigação, exames ou acompanhamento conjunto.',
      'Planejamento das condutas anais em sintonia com o tratamento intestinal conduzido pela gastroenterologia.',
      'Planejamento de cuidado com foco em segurança, controle de sintomas e prevenção de complicações.',
    ],
    carePath: [
      'A consulta revisa sintomas, exames anteriores, colonoscopias, biópsias, medicamentos e histórico de crises.',
      'O acompanhamento pode ser feito em conjunto com gastroenterologia, especialmente quando há necessidade de terapia medicamentosa de longo prazo ou controle de atividade inflamatória.',
      'Dor anal intensa, febre, inchaço ou saída de pus perto do ânus podem indicar abscesso e precisam de avaliação rápida.',
    ],
    recovery: [
      'As doenças inflamatórias intestinais alternam períodos de atividade e de remissão, e o acompanhamento é contínuo. A frequência dos retornos depende da atividade da doença, dos medicamentos em uso e das complicações.',
      'Na doença perianal, o seguimento acompanha a cicatrização depois da drenagem de um abscesso ou da colocação de um sedenho. Pela diretriz europeia, a retirada do sedenho pode ser considerada depois de boa resposta ao tratamento medicamentoso, e o momento varia bastante de um caso para outro.',
      'Mesmo em remissão, o acompanhamento continua, porque a doença pode voltar a ficar ativa. A cicatrização da mucosa, observada nos exames, é um dos objetivos do tratamento, e a vigilância do câncer colorretal segue o calendário definido para cada caso.',
    ],
    limitations: [
      'O acompanhamento coloproctológico não substitui o tratamento medicamentoso da doença, que é conduzido pela gastroenterologia.',
      'Na doença de Crohn, o sedenho usado sozinho e por tempo indefinido não é recomendado como tratamento da fístula perianal, exceto como medida paliativa, e sedenhos que cortam o músculo são evitados pelo risco de incontinência.',
      'Cirurgia não cura a doença de Crohn: a inflamação pode voltar em outros segmentos, e o acompanhamento continua depois de qualquer procedimento.',
      'Febre alta, vômitos persistentes, dor abdominal forte ou barriga muito distendida podem indicar crise grave ou complicação e exigem atendimento de urgência.',
      'Anti-inflamatórios comuns podem agravar as manifestações da doença de Crohn e não devem ser usados sem orientação.',
    ],
    faqs: [
      {
        question: 'Doença de Crohn e retocolite têm cura?',
        answer:
          'Não há cura definitiva. O protocolo do Ministério da Saúde descreve a doença de Crohn como uma condição que alterna crises e remissões, e o tratamento busca controlar a inflamação e manter a remissão. Na retocolite, o curso também costuma alternar atividade e calmaria, com acompanhamento de longo prazo.',
      },
      {
        question: 'Quem trata doença inflamatória intestinal: gastroenterologista ou coloproctologista?',
        answer:
          'Os dois, em papéis diferentes. A gastroenterologia conduz o tratamento medicamentoso de longo prazo. A coloproctologia avalia os sintomas no reto e no ânus, trata fístulas e abscessos perianais e participa das decisões cirúrgicas.',
      },
      {
        question: 'A Dra. Dayara faz colonoscopia?',
        answer:
          'Não neste local. A colonoscopia com biópsias é necessária para confirmar o diagnóstico e acompanhar a doença, e a orientação de onde realizá-la faz parte da consulta.',
      },
      {
        question: 'O que é sedenho na fístula perianal?',
        answer:
          'É um fio flexível passado pelo trajeto da fístula para mantê-lo aberto e drenando, o que ajuda a controlar a infecção. Na doença de Crohn, costuma ser usado antes ou junto do tratamento medicamentoso, e o momento de retirá-lo é definido conforme a resposta.',
      },
      {
        question: 'Quem tem doença inflamatória intestinal precisa de colonoscopia de controle?',
        answer:
          'Muitas pessoas, sim. Além de avaliar a atividade da doença, a colonoscopia é usada na vigilância do câncer colorretal, indicada sobretudo quando a inflamação atinge boa parte do intestino grosso, onde o risco é maior. O intervalo entre os exames é definido pela equipe conforme a extensão, o tempo de doença e outros fatores.',
      },
      {
        question: 'Fumar piora a doença de Crohn?',
        answer:
          'O tabagismo é um fator de risco associado à doença de Crohn, e o protocolo do Ministério da Saúde orienta que pessoas com a doença que fumam recebam apoio para parar. Essa orientação faz parte do tratamento, mas o cuidado não depende de a pessoa já ter parado.',
      },
    ],
    sources: [
      {
        title:
          'British Society of Gastroenterology consensus guidelines on the management of inflammatory bowel disease in adults',
        organization: 'British Society of Gastroenterology (BSG) — Gut 2019;68(Suppl 3):s1–s106',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6872448/',
        accessedAt: '2026-11-12',
      },
      {
        title: 'ECCO Guidelines on Therapeutics in Crohn’s Disease: Surgical Treatment',
        organization: 'European Crohn’s and Colitis Organisation (ECCO) — J Crohns Colitis 2024;18(10):1556–1582',
        url: 'https://vbn.aau.dk/ws/files/726048807/Adamina_et_al._2024_._ECCO_Guidelines_on_Therapeutics_in_Crohn_s_Disease_-_Surgical_Treatment.pdf',
        accessedAt: '2026-11-12',
      },
      {
        title: 'Protocolo Clínico e Diretrizes Terapêuticas da Doença de Crohn',
        organization: 'Ministério da Saúde — Portaria Conjunta SAES/SCTIE nº 51, de 18 de maio de 2026',
        url: 'https://www.gov.br/saude/pt-br/assuntos/pcdt/d/pcdt-doenca-de-crohn.pdf',
        accessedAt: '2026-11-12',
      },
    ],
    relatedBlogSlugs: [
      'doencas-inflamatorias-intestinais-crohn-retocolite',
      'alteracoes-habito-intestinal-quando-avaliar',
      'historico-crohn-retocolite-familia-acompanhamento-coloproctologista',
      'fistula-anal-o-que-e-sintomas',
    ],
    mappedDiseaseNames: ['Doenças Inflamatórias Intestinais'],
    keywords: [
      'doenças inflamatórias intestinais',
      'retocolite ulcerativa',
      'doença de Crohn acompanhamento',
    ],
    lastUpdated: '2026-11-12',
  },
]

const treatmentsBySlug = new Map(TREATMENTS.map((treatment) => [treatment.slug, treatment]))

/**
 * Signature procedures shown on the homepage. The complete clinical catalog
 * remains available at `/tratamentos`; keeping this list explicit prevents the
 * landing page from growing whenever a new treatment page is published.
 */
export const HOME_FEATURED_TREATMENT_SLUGS = [
  'hemorroidectomia-laser-co2',
  'hemorroidas-sem-corte-laser-diodo',
  'ligadura-elastica-hemorroidas-internas',
  'fistula-anal-laser-vaaft-filac',
  'cisto-pilonidal-laser-epsit',
  'plicoma-anal-laser-co2',
] as const

export const TREATMENT_CARD_TO_SLUG: Record<string, string> = Object.fromEntries(
  TREATMENTS.map((treatment) => [treatment.homeCardTitle, treatment.slug]),
)

export const DISEASE_TO_TREATMENT_SLUG: Record<string, string> = {
  'Doença Hemorroidária': 'hemorroidectomia-laser-co2',
  'Fissura Anal': 'toxina-botulinica-fissura-anal',
  'Fístula Anal': 'fistula-anal-laser-vaaft-filac',
  'Prurido Anal': 'tratamento-prurido-anal',
  'HPV Anal': 'hpv-perianal-laser-co2',
  'Cisto Pilonidal': 'cisto-pilonidal-laser-epsit',
  Constipação: 'tratamento-constipacao-intestino-preso',
  'Diarreia Crônica': 'avaliacao-diarreia-cronica',
  'Síndrome do Intestino Irritável': 'tratamento-sindrome-intestino-irritavel',
  'Hidradenite Supurativa': 'tratamento-hidradenite-supurativa',
  'Doenças Inflamatórias Intestinais':
    'acompanhamento-doencas-inflamatorias-intestinais',
}

export function getAllTreatments(): Treatment[] {
  return TREATMENTS
}

export function getFeaturedHomeTreatments(): Treatment[] {
  return HOME_FEATURED_TREATMENT_SLUGS.map((slug) => treatmentsBySlug.get(slug)).filter(
    (treatment): treatment is Treatment => treatment !== undefined,
  )
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
