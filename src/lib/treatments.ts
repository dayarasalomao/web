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
    relatedBlogSlugs: ['hemorroidectomia-laser-co2', 'doenca-hemorroidaria-sintomas-graus'],
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
    relatedBlogSlugs: [
      'ligadura-elastica-hemorroidas-internas',
      'sangramento-anal-dor-quando-procurar-coloproctologista',
    ],
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
    relatedBlogSlugs: ['fistula-anal-laser-vaaft-filac', 'fistula-anal-o-que-e-sintomas'],
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
    relatedBlogSlugs: ['cisto-pilonidal-laser-epsit', 'cisto-pilonidal-sinais-diagnostico'],
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
    relatedBlogSlugs: [
      'toxina-botulinica-fissura-anal',
      'fissura-anal-causas-sintomas',
      'dor-ao-evacuar-quando-investigar',
    ],
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
    relatedBlogSlugs: [
      'hpv-perianal-laser-co2',
      'hpv-anal-identificar-tratar',
      'lesoes-verrugas-nodulos-regiao-anal-o-que-observar',
    ],
    mappedDiseaseNames: ['HPV Anal'],
    keywords: ['HPV perianal laser CO2', 'tratamento HPV anal', 'HPV anal'],
    lastUpdated: '2026-04-17',
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
