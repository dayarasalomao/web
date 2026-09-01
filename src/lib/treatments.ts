import type { BlogPost } from './blog.ts'
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
  faqs?: Array<{
    question: string
    answer: string
  }>
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
      'Taxas de sangramento pós-operatório menores do que na cirurgia tradicional, já que o laser sela pequenos vasos enquanto corta.',
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
    relatedBlogSlugs: ['hemorroidectomia-laser-co2', 'doenca-hemorroidaria-sintomas-graus'],
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
      'Dor significativamente menor do que na cirurgia convencional — no primeiro dia, na primeira semana e no primeiro mês.',
      'Menor uso de analgésicos: em média, cerca de 2 a 3 dias a menos de analgésicos fortes.',
      'Retorno mais rápido às atividades diárias: estudos apontam, em média, cerca de 9 a 11 dias mais cedo do que com a cirurgia convencional.',
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
    relatedBlogSlugs: ['fistula-anal-laser-vaaft-filac', 'fistula-anal-o-que-e-sintomas'],
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
    relatedBlogSlugs: ['cisto-pilonidal-laser-epsit', 'cisto-pilonidal-sinais-diagnostico'],
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
      'plicoma-ou-hpv-perianal-como-diferenciar',
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
    overview: [
      'O prurido anal pode estar relacionado a irritação da pele, umidade, higiene excessiva, dermatites, fissuras, hemorroidas, infecções ou outras condições da região anal.',
      'O tratamento depende de entender o que está provocando ou perpetuando a coceira. Por isso, a avaliação clínica é importante antes de usar pomadas por conta própria ou repetir medidas que irritam ainda mais a pele.',
    ],
    indications: [
      'Coceira anal persistente, recorrente ou associada a ardor e irritação da pele.',
      'Sintomas que pioram após evacuar, durante a noite ou com uso frequente de produtos locais.',
      'Casos em que há sangramento, secreção, feridas, verrugas ou dor junto da coceira.',
    ],
    benefits: [
      'Investigação direcionada das causas mais comuns de coceira anal.',
      'Orientação sobre higiene, umidade, atrito e produtos que podem irritar a pele.',
      'Tratamento individualizado conforme achados do exame e histórico do paciente.',
    ],
    carePath: [
      'A consulta avalia pele, canal anal, hábitos de higiene, evacuação, uso de medicamentos e possíveis doenças associadas.',
      'O acompanhamento ajusta os cuidados locais e define se há necessidade de tratar fissuras, hemorroidas, dermatites, infecções ou outras causas específicas.',
    ],
    relatedBlogSlugs: [
      'prurido-anal-causas-cuidados',
      'coceira-anal-persistente-causas-sinal-alerta',
    ],
    mappedDiseaseNames: ['Prurido Anal'],
    keywords: ['tratamento prurido anal', 'coceira anal', 'prurido anal'],
    lastUpdated: '2026-05-17',
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
    overview: [
      'A constipação pode envolver fezes endurecidas, esforço para evacuar, sensação de evacuação incompleta, baixa frequência evacuatória ou necessidade de manobras para conseguir evacuar.',
      'O plano de tratamento pode incluir ajustes alimentares, hidratação, atividade física, reeducação do hábito evacuatório, medicamentos quando indicados e investigação complementar em casos selecionados.',
    ],
    indications: [
      'Intestino preso persistente, esforço evacuatório ou fezes muito ressecadas.',
      'Sensação frequente de evacuação incompleta ou bloqueio na saída das fezes.',
      'Constipação associada a sangramento, dor, perda de peso, anemia ou mudança recente do padrão intestinal.',
    ],
    benefits: [
      'Avaliação do padrão evacuatório e dos fatores que mantêm a constipação.',
      'Plano individualizado para reduzir esforço e trauma local durante a evacuação.',
      'Identificação de sinais que indicam necessidade de exames ou investigação adicional.',
    ],
    carePath: [
      'A consulta levanta frequência evacuatória, formato das fezes, dieta, ingestão de líquidos, medicamentos em uso e sintomas associados.',
      'O seguimento ajusta as medidas iniciais e avalia resposta, evitando dependência de laxantes sem orientação.',
    ],
    relatedBlogSlugs: [
      'constipacao-intestinal-quando-investigar',
      'alteracoes-habito-intestinal-quando-avaliar',
    ],
    mappedDiseaseNames: ['Constipação'],
    keywords: ['tratamento constipação', 'intestino preso', 'constipação intestinal'],
    lastUpdated: '2026-05-17',
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
    overview: [
      'Diarreia crônica é a presença de fezes líquidas ou pastosas por período prolongado, muitas vezes associada a urgência, cólicas, gases, muco ou perda de controle.',
      'As causas podem incluir intolerâncias alimentares, infecções, medicamentos, síndrome do intestino irritável, doenças inflamatórias intestinais e outras condições que precisam ser diferenciadas com cuidado.',
    ],
    indications: [
      'Diarreia persistente ou recorrente por várias semanas.',
      'Urgência evacuatória, muco, cólicas, gases ou impacto importante na rotina.',
      'Diarreia associada a sangue nas fezes, emagrecimento, febre, anemia ou sintomas noturnos.',
    ],
    benefits: [
      'Investigação orientada por sinais clínicos e padrão dos sintomas.',
      'Redução do uso empírico de medicamentos sem diagnóstico claro.',
      'Encaminhamento para exames específicos quando há sinais de alerta ou suspeitas relevantes.',
    ],
    carePath: [
      'A consulta revisa duração, frequência, alimentação, medicamentos, histórico familiar, viagens, exames prévios e sinais de alerta.',
      'O plano pode incluir medidas dietéticas, exames laboratoriais, avaliação endoscópica quando indicada e tratamento direcionado à causa.',
    ],
    relatedBlogSlugs: [
      'diarreia-cronica-causas-sinais-alerta',
      'alteracoes-habito-intestinal-quando-avaliar',
    ],
    mappedDiseaseNames: ['Diarreia Crônica'],
    keywords: ['diarreia crônica tratamento', 'diarreia persistente', 'coloproctologista diarreia'],
    lastUpdated: '2026-05-17',
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
    overview: [
      'A síndrome do intestino irritável é uma condição funcional que pode causar dor abdominal, gases, distensão e alternância entre constipação e diarreia.',
      'Antes de confirmar essa hipótese, é importante avaliar sinais de alerta e diferenciar o quadro de doenças inflamatórias, infecções, intolerâncias, alterações metabólicas e outras causas orgânicas.',
    ],
    indications: [
      'Dor abdominal recorrente associada a mudança do padrão evacuatório.',
      'Alternância entre intestino preso e diarreia, gases ou distensão abdominal.',
      'Sintomas persistentes que exigem diagnóstico diferencial e plano de acompanhamento.',
    ],
    benefits: [
      'Avaliação cuidadosa para diferenciar quadro funcional de sinais de alerta.',
      'Plano de cuidado adaptado ao subtipo predominante: constipação, diarreia ou padrão misto.',
      'Orientação sobre alimentação, rotina intestinal, medicamentos e acompanhamento conforme evolução.',
    ],
    carePath: [
      'A consulta mapeia sintomas, duração, gatilhos, padrão das fezes, histórico de exames e impacto na rotina.',
      'O acompanhamento ajusta o tratamento ao longo do tempo, pois os sintomas podem variar conforme alimentação, estresse, sono e outras condições associadas.',
    ],
    relatedBlogSlugs: [
      'sindrome-intestino-irritavel-sintomas-manejo',
      'alteracoes-habito-intestinal-quando-avaliar',
    ],
    mappedDiseaseNames: ['Síndrome do Intestino Irritável'],
    keywords: [
      'síndrome do intestino irritável tratamento',
      'intestino irritável',
      'dor abdominal alteração intestinal',
    ],
    lastUpdated: '2026-05-17',
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
    overview: [
      'A hidradenite supurativa é uma doença inflamatória crônica da pele que pode causar nódulos dolorosos, abscessos, drenagem e trajetos fistulosos em regiões como virilhas, períneo, região genital, perianal e axilas.',
      'Quando há acometimento próximo ao ânus, a avaliação coloproctológica ajuda a diferenciar hidradenite de fístula anal, abscessos anorretais e outras doenças que exigem condutas diferentes.',
    ],
    indications: [
      'Nódulos dolorosos, abscessos ou secreção recorrente em virilhas, períneo, região genital ou perianal.',
      'Lesões que deixam cicatrizes, túneis na pele ou drenagem persistente.',
      'Suspeita de associação com fístula anal, doença inflamatória intestinal ou infecções locais.',
    ],
    benefits: [
      'Avaliação anatômica da região perianal e diferenciação de outras causas de fístulas e abscessos.',
      'Planejamento integrado com dermatologia ou outras especialidades quando necessário.',
      'Orientação sobre controle de inflamação, cuidados locais e indicação cirúrgica em casos selecionados.',
    ],
    carePath: [
      'A consulta examina a extensão das lesões, histórico de recorrência, drenagem, dor e relação com a região anal.',
      'O seguimento pode envolver tratamento clínico, cuidados locais, exames de imagem e procedimentos quando houver abscessos, trajetos ou cicatrizes importantes.',
    ],
    relatedBlogSlugs: ['hidradenite-supurativa-sintomas-tratamento'],
    mappedDiseaseNames: ['Hidradenite Supurativa'],
    keywords: [
      'hidradenite supurativa tratamento',
      'hidradenite perianal',
      'abscessos recorrentes virilha períneo',
    ],
    lastUpdated: '2026-05-17',
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
    overview: [
      'As doenças inflamatórias intestinais incluem principalmente retocolite ulcerativa e doença de Crohn. Elas podem causar diarreia, sangue nas fezes, dor abdominal, perda de peso, anemia e manifestações fora do intestino.',
      'Na coloproctologia, o acompanhamento é especialmente importante quando há sintomas no reto e ânus, doença perianal, fístulas, abscessos ou necessidade de avaliação cirúrgica em situações específicas.',
    ],
    indications: [
      'Suspeita ou diagnóstico de retocolite ulcerativa ou doença de Crohn.',
      'Diarreia com sangue, muco, dor abdominal, anemia, perda de peso ou sintomas persistentes.',
      'Fístulas, abscessos, fissuras complexas ou dor perianal em pacientes com doença inflamatória intestinal.',
    ],
    benefits: [
      'Avaliação coloproctológica dos sintomas intestinais e perianais.',
      'Identificação de sinais que exigem investigação, exames ou acompanhamento conjunto.',
      'Planejamento de cuidado com foco em segurança, controle de sintomas e prevenção de complicações.',
    ],
    carePath: [
      'A consulta revisa sintomas, exames anteriores, colonoscopias, biópsias, medicamentos e histórico de crises.',
      'O acompanhamento pode ser feito em conjunto com gastroenterologia, especialmente quando há necessidade de terapia medicamentosa de longo prazo ou controle de atividade inflamatória.',
    ],
    relatedBlogSlugs: [
      'doencas-inflamatorias-intestinais-crohn-retocolite',
      'alteracoes-habito-intestinal-quando-avaliar',
      'historico-crohn-retocolite-familia-acompanhamento-coloproctologista',
    ],
    mappedDiseaseNames: ['Doenças Inflamatórias Intestinais'],
    keywords: [
      'doenças inflamatórias intestinais',
      'retocolite ulcerativa',
      'doença de Crohn acompanhamento',
    ],
    lastUpdated: '2026-05-17',
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
