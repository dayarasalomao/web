import type { FaqEntry } from './structured-data.ts'

export interface FaqGroup {
  id: string
  title: string
  description: string
  items: FaqEntry[]
}

// Grouped so the page reads as a guided path (chegar à consulta → entender os
// sintomas → entender as tecnologias) instead of a flat wall of questions.
export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'consulta',
    title: 'Antes da consulta',
    description:
      'As dúvidas que mais adiam a primeira consulta com a coloproctologista.',
    items: [
      {
        question: 'Morro de vergonha de ir ao proctologista. Como funciona a consulta?',
        answer:
          'Fique tranquilo(a). A vergonha é a reação mais comum, mas ter seu problema resolvido vale mais a pena do que viver no sofrimento. A consulta começa com uma conversa leve, sem pressa, para entender seu histórico e suas dúvidas. Se o exame físico for necessário, ele é feito com todo o respeito, privacidade, cuidado e adaptação ao seu nível de conforto. Aqui o ambiente é leve e sem tabus, e o foco é devolver a sua qualidade de vida.',
      },
      {
        question: 'Homem também precisa ir ao coloproctologista ou essa consulta é só para mulheres?',
        answer:
          'É para todo mundo que quer viver bem e sem dores. O intestino e a região anal não escolhem gênero. Cuidar dessa região é tão natural e essencial quanto ir ao dentista ou ao cardiologista. Deixar a "bobeira" ou o tabu de lado é o primeiro passo para resolver incômodos que você não precisa carregar no dia a dia.',
      },
      {
        question: 'Como sei se já está na hora de marcar uma consulta?',
        answer:
          'Se você sente dor, sangramento, coceira persistente, alteração no ritmo intestinal ou simplesmente quer fazer um check-up de prevenção (como rastreio de lesões de HPV ou prevenção de câncer colorretal), a hora é agora. O sofrimento sozinho tem que ter data para acabar.',
      },
    ],
  },
  {
    id: 'sintomas',
    title: 'Sintomas e sinais de alerta',
    description:
      'O que cada sintoma pode significar e por que a automedicação costuma atrasar o diagnóstico.',
    items: [
      {
        question: 'Sangue no papel ou no vaso sanitário é sempre hemorroida?',
        answer:
          'Esse é o maior engano. Nem todo sangramento é hemorroida. Ele pode indicar fissuras, pólipos, inflamações intestinais e outras condições que precisam de diagnóstico exato. Mudar a cor das fezes ou ver sangue nunca deve ser ignorado ou tratado com "pomadinha da farmácia" por conta própria. Uma avaliação oportuna evita surpresas no futuro.',
      },
      {
        question: 'Sinto dores intensas "em agulhada" durante ou após evacuar. O que pode ser?',
        answer:
          'A dor intensa durante e após a evacuação costuma ser o sinal clássico de uma fissura anal, um pequeno corte na mucosa. Quando a dor é muito forte, o músculo local se contrai em espasmo, impedindo que a ferida se feche. Na consulta, avaliamos o quadro para propor desde tratamentos tópicos até a aplicação de toxina botulínica ou abordagens a laser, aliviando a dor sem necessidade de cirurgias agressivas.',
      },
      {
        question: 'Sinto uma coceira (prurido anal) constante que não passa. Isso é sujeira ou falta de higiene?',
        answer:
          'Pelo contrário. Na maioria das vezes, o excesso de higiene ou o uso de sabonetes inadequados e papel higiênico piora o quadro. O prurido anal pode ser provocado por umidade crônica, plicomas (sobras de pele), alergias da pele, fissuras ou alterações locais. A investigação clínica é imperativa para tratar a raiz do problema, devolvendo o conforto sem que você precise usar pomadas por conta própria.',
      },
      {
        question: 'É verdade que o estresse pode influenciar o intestino e causar dor abdominal?',
        answer:
          'Sem dúvidas. O intestino é considerado nosso "segundo cérebro". Condições como a Síndrome do Intestino Irritável (SII) estão diretamente ligadas às nossas emoções e hábitos. Se o seu intestino alterna entre o "preso" e o "solto", ou se você sente estufamento constante, não se acostume com o desconforto: existe investigação e tratamento específico para isso.',
      },
      {
        question: 'Tenho uma "sobra de pele" na região anal que me incomoda esteticamente ou na higiene. Dá para tirar?',
        answer:
          'Sim, essas dobras são chamadas de plicomas anais. Além do desconforto estético, elas podem dificultar a higienização diária. Com a tecnologia do laser de CO₂ é possível realizar a plicomectomia com precisão: a energia do laser faz a remoção selando os vasos simultaneamente, reduzindo o inchaço e promovendo uma cicatrização mais limpa e rápida.',
      },
    ],
  },
  {
    id: 'tecnologias',
    title: 'Cirurgias e tecnologias',
    description:
      'Laser, vídeo e toxina botulínica: o que cada tecnologia faz e quando ela é indicada.',
    items: [
      {
        question: 'É verdade que hoje em dia dá para operar hemorroidas a laser e "sem corte"?',
        answer:
          'Sim, a medicina evoluiu muito. Hoje utilizamos tecnologias como o laser de CO₂ ou o laser de diodo com técnicas minimamente invasivas, em casos selecionados com critério e experiência. A energia do laser atua com precisão, promovendo a cauterização dos vasos sem a necessidade dos grandes cortes tradicionais. Isso se traduz em menos sangramento, preservação tecidual e uma recuperação mais confortável e rápida.',
      },
      {
        question: 'Qual a diferença real entre a cirurgia convencional de hemorroidas e a cirurgia a laser?',
        answer:
          'A cirurgia tradicional remove os tecidos com bisturi e exige cortes que necessitam de pontos ou cicatrizam de forma aberta, o que gera o famoso pós-operatório doloroso. Para cirurgias a laser temos duas opções, laser de CO₂ ou laser de diodo, e cada uma tem uma indicação adequada, podendo inclusive ser usadas juntas para um tratamento completo. O resultado é menos dor pós-operatória, menor risco de sangramento e um retorno mais ágil ao trabalho e às atividades rotineiras.',
      },
      {
        question: 'É possível usar laser de diodo e de CO₂ na mesma cirurgia para hemorroida?',
        answer:
          'É sim, e é uma estratégia muito inteligente em mãos experientes. Cada tecnologia tem sua indicação, e o paciente pode ter as duas necessidades. Com isso conseguimos abordar de forma individualizada a doença e as queixas do paciente.',
      },
      {
        question: 'E no caso de cisto pilonidal ou fístula, o laser e as cirurgias por vídeo também ajudam?',
        answer:
          'Com certeza. Com técnicas como a EPSiT (para cisto pilonidal) e a VAAFT (para fístulas anais), conseguimos mapear e tratar o trajeto da doença por vídeo e tratar com laser. O objetivo é evitar grandes feridas abertas e curativos dolorosos por meses, permitindo que você volte à sua rotina muito mais rápido.',
      },
      {
        question: 'O que são as técnicas VAAFT e EPSiT de que tanto se fala?',
        answer:
          'São cirurgias videoassistidas de ponta. A VAAFT é utilizada no tratamento de fístulas anais: introduzimos um microendoscópio pelo trajeto da fístula para visualizar todo o caminho por vídeo, guiar a fibra do laser nos múltiplos trajetos e tratá-los por dentro. A EPSiT é a técnica semelhante indicada para o cisto pilonidal, na região do cóccix. Ambas evitam cortes extensos na pele, mantendo a anatomia preservada e facilitando os curativos no pós-operatório.',
      },
      {
        question: 'Toxina botulínica (Botox) no ânus? Para que serve isso?',
        answer:
          'Parece curioso, mas o Botox vai muito além da estética. Em casos de fissuras anais crônicas ou dores musculares anais intensas, a toxina botulínica ajuda a relaxar a musculatura (esfíncter). Esse relaxamento reduz a dor quase que de imediato e permite que a fissura finalmente cicatrize sem a necessidade de uma cirurgia imediata. Como bônus, a aplicação 15 dias antes de uma cirurgia de hemorroida reduz a dor no pós-operatório.',
      },
      {
        question: 'Tenho verrugas na região perianal (HPV). Como é feito o tratamento a laser?',
        answer:
          'As lesões causadas pelo HPV (condilomas) podem ser tratadas com laser. O procedimento vaporiza seletivamente as lesões visíveis sem agredir o tecido saudável ao redor, e é realizado com anestesia local ou sedação rápida. O acompanhamento preventivo contínuo ajuda a evitar recidivas, com total sigilo e acolhimento.',
      },
    ],
  },
]

export const FAQ_ITEMS: FaqEntry[] = FAQ_GROUPS.flatMap((group) => group.items)
