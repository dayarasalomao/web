# Plano de crescimento orgânico — Dra. Dayara Salomão em Campo Grande

**Data da análise:** 18 de julho de 2026
**Site:** <https://www.dayarasalomao.com.br/>
**Mercado de destino:** Campo Grande/MS
**Arquivo de importação SeuSEO:** `research/seuseo-keywords-campo-grande-2026-08.csv`

## Resumo executivo

O site já tem uma base técnica e editorial acima do ponto de partida comum de um consultório: páginas de tratamento, 25 artigos, metadados por rota, sitemap, conteúdo médico assinado, dados estruturados e links internos. O problema não é falta de páginas. O problema é que toda a presença local ainda aponta para Curitiba e a autoridade externa em Campo Grande ainda não foi estabelecida.

O relatório SeuSEO de 18 de julho confirma esse diagnóstico. As cinco variações de marca estão no Top 3 e a página de ligadura elástica chegou à posição 6 para uma busca localizada em Curitiba, mas as outras consultas comerciais não encontraram o domínio. Isso demonstra duas coisas:

1. Google reconhece a entidade “Dra. Dayara Salomão”.
2. O site consegue ranquear uma página específica quando intenção e conteúdo se alinham.

A mudança para Campo Grande abre uma oportunidade melhor do que insistir em Curitiba. As buscas atuais mostram agregadores e alguns sites de clínicas/equipes dominando a primeira página, mas poucas páginas de médicos com a profundidade de tratamentos e artigos que Dayara já possui. A prioridade é transformar esse conteúdo em uma presença local verdadeira e consistente assim que o novo NAP estiver confirmado.

## Limite factual desta implementação

O repositorio confirma a mudança iminente, mas ainda não contém nome da clínica, endereço, CEP, telefone, link do Google Maps, coordenadas ou data inicial de atendimento em Campo Grande.

Por isso, este trabalho:

- prepara a arquitetura de Campo Grande;
- cria uma página planejada com `noindex` e sem chamada de agendamento local;
- não publica endereço, mapa, telefone, horário ou disponibilidade inventados;
- mantém Curitiba como atendimento ativo até a virada coordenada;
- deixa a ativação final reduzida a dados confirmados e uma mudança controlada de estado.

## O que o mercado de Campo Grande mostra

### Concorrentes visíveis

- [Doctoralia — coloproctologistas em Campo Grande](https://www.doctoralia.com.br/coloproctologista/campo-grande) ocupa espaço relevante e agrega avaliações, disponibilidade e endereço.
- [Coloprocto MS](https://www.coloproctoms.com.br/) tem NAP forte, equipe, tratamentos, conteúdo local e uma página específica sobre laser para fístula/cisto.
- [Hospital Regional de Mato Grosso do Sul](https://www.hospitalregional.ms.gov.br/ambulatorio/proctologia/) reforça autoridade institucional local.
- [Instituto do Aparelho Digestivo](https://www.institutodigestivo.com.br/coloproctologia) reúne especialidade, profissional, endereço e conteúdo educativo em uma página local.

### Lacuna que Dayara pode ocupar

Há espaço para uma entidade médica individual com:

- perfil local completo e consistente;
- páginas de decisão para cada tratamento realmente oferecido;
- conteúdo que responde dúvidas anteriores à consulta;
- linguagem acolhedora para reduzir tabu e hesitação;
- navegação simples entre sintoma, diagnóstico, tratamento, local e agendamento;
- dados estruturados que reflitam apenas fatos visíveis e confirmados.

## Estratégia de palavras-chave

O novo tracker tem 60 consultas e substitui a carteira baseada em Curitiba. Ele não é uma estimativa de volume: é uma carteira operacional para medir descoberta, progresso e conversão. Volume e novas variações devem ser validados após 30 dias com Google Search Console, Google Ads Keyword Planner e dados de conversão.

### Distribuição

| Cluster | Quantidade | Papel |
| --- | ---: | --- |
| Marca | 5 | Saúde da entidade e migração de cidade |
| Aquisição local | 10 | Consulta e descoberta do especialista |
| Hemorroidas | 12 | Maior conjunto de intenção comercial/procedimental |
| Fissura anal | 7 | Tratamento, toxina e dúvidas de decisão |
| Fístula anal | 7 | Cirurgia, laser, VAAFT e FiLaC |
| Cisto pilonidal | 6 | Tratamento, cirurgia, laser e EPSiT |
| HPV anal | 6 | Tratamento de lesões, condiloma e prevenção |
| Sintomas/intestino | 7 | Entrada por dor, sangue, prurido e hábito intestinal |

### Termos P1 que devem orientar páginas comerciais

- coloproctologista campo grande
- proctologista campo grande
- consulta coloproctologista campo grande
- tratamento hemorroidas campo grande
- cirurgia hemorroidas laser campo grande
- ligadura elástica hemorroidas campo grande
- tratamento fissura anal campo grande
- toxina botulínica fissura anal campo grande
- tratamento fístula anal campo grande
- fístula anal laser campo grande
- tratamento cisto pilonidal campo grande
- cisto pilonidal laser campo grande
- tratamento hpv anal campo grande

## Mapa de intenção para as páginas

| Intenção | Página principal | Papel do blog |
| --- | --- | --- |
| Especialista/consulta local | Página inicial + local confirmado de Campo Grande | Explicar primeira consulta, exame e quando procurar |
| Hemorroidas/ligadura/laser | `/tratamentos/ligadura-elastica-hemorroidas-internas`, `/tratamentos/hemorroidectomia-laser-co2`, `/tratamentos/hemorroidas-sem-corte-laser-diodo` | Responder dor, indicação, cirurgia e recuperação |
| Fissura/toxina | `/tratamentos/toxina-botulinica-fissura-anal` | Diferenciar fissura aguda/crônica e dúvidas sobre continência |
| Fístula/VAAFT/FiLaC | `/tratamentos/fistula-anal-laser-vaaft-filac` | Explicar sinais, seton, técnicas e recorrência |
| Cisto/EPSiT | `/tratamentos/cisto-pilonidal-laser-epsit` | Explicar crise, drenagem, recorrência e seleção da técnica |
| HPV/condiloma | `/tratamentos/hpv-perianal-laser-co2` | Explicar lesões, prevenção, retorno e sinais de alerta |
| Sintomas | Artigos correspondentes | Conduzir para a página de tratamento ou consulta, sem diagnóstico online |

Não criar um artigo por variação de cidade. A página comercial deve concentrar a intenção local; artigos devem responder dúvidas distintas e enviar autoridade interna para essa página.

## Plano de execução

### Fase 0 — agora, sem inventar NAP

1. Terminar o modelo de locais com hub, página ativa e página planejada protegida por `noindex`.
2. Remover avaliação agregada não verificável do JSON-LD.
3. Acrescentar FAQs visíveis às páginas de tratamentos prioritários e emitir schema apenas com as mesmas perguntas/respostas.
4. Tornar metadados de tratamentos dependentes da localização ativa para uma virada centralizada.
5. Expor artigos recentes na página inicial e reforçar links sintoma → artigo → tratamento → consulta.
6. Melhorar o cabeçalho e a conversão móvel com CTA persistente, rótulos acessíveis e evento mensurável.
7. Corrigir a Content Security Policy que hoje bloqueia recursos do Google Ads/DoubleClick usados pela medição.
8. Reduzir frases de superioridade, promessa ou resultado absoluto nas áreas mais visíveis.

### Fase 1 — janela coordenada da mudança

Executar somente quando clínica, endereço, CEP, telefone/WhatsApp, mapa, coordenadas, data e serviços estiverem confirmados:

1. Alterar Campo Grande de `planned` para `active` e Curitiba para `historical` ou manter ambos ativos se isso for verdadeiro.
2. Atualizar o NAP visível, metadados, schema, sitemap e `llms.txt` na mesma publicação.
3. Exibir CRM-MS/RQE confirmados e manter credenciais anteriores apenas quando fizer sentido histórico/profissional.
4. Editar o Google Business Profile existente, em vez de criar outro, para preservar histórico e avaliações.
5. Atualizar Doctoralia, CFM/SBCP, Instagram e demais citações na mesma semana.
6. Enviar sitemap e solicitar indexação das páginas local e comerciais prioritárias.

### Fase 2 — primeiros 90 dias em Campo Grande

1. Medir os 60 termos em mobile, Campo Grande/MS, sempre com a mesma configuração.
2. Monitorar Search Console por página, consulta, clique e impressão; não apenas posição média.
3. Publicar dois conteúdos úteis por mês, escolhidos por impressão real e lacuna de intenção.
4. Coletar avaliações autênticas de forma contínua e responder todas sem revelar dados clínicos.
5. Conseguir citações locais legítimas: clínica onde atende, diretórios médicos, sociedade profissional e mídia local quando houver pauta real.
6. Medir cliques em WhatsApp, telefone e mapa como conversões separadas.

## Backlog editorial inicial

Prioridade recomendada após a ativação local:

1. **Primeira consulta com coloproctologista: como funciona e como se preparar**
   Suporta aquisição local, reduz tabu e leva à página de atendimento.
2. **Ligadura elástica dói? O que costuma acontecer antes e depois**
   Suporta o atual ranking e conduz à página do tratamento.
3. **Toda hemorroida precisa de cirurgia? Como a indicação é definida**
   Captura consideração e distribui para as três páginas de hemorroidas.
4. **Fissura anal cicatriza sozinha? Quando investigar persistência**
   Conduz à toxina botulínica sem prometer indicação.
5. **Cirurgia de fissura anal causa incontinência? Entenda o risco e as opções**
   Conteúdo YMYL que precisa de revisão médica e referências primárias.
6. **Fístula anal: quando entram seton, VAAFT e FiLaC**
   Diferencia técnicas sem sugerir superioridade universal.
7. **Cisto pilonidal volta? Fatores de recorrência e cuidados de seguimento**
   Complementa a página EPSiT.
8. **HPV anal pode evoluir para câncer? Risco, acompanhamento e prevenção**
   Deve usar fontes oficiais e deixar claro que HPV/lesão não equivale automaticamente a câncer.

## Métricas de sucesso

### 30 dias

- Campo Grande indexada apenas após NAP verdadeiro.
- Conversões de WhatsApp/telefone/mapa mensuráveis.
- Zero contradição de cidade entre site, GBP, Doctoralia e schema.
- Primeiras impressões não relacionadas à marca no Search Console.

### 90 dias

- Páginas P1 aparecendo no Top 20 para parte das consultas comerciais.
- Crescimento de cliques orgânicos não relacionados à marca.
- Pelo menos três páginas de tratamento recebendo impressões locais.
- Taxa de clique e taxa de contato acompanhadas por landing page.

### 6 a 12 meses

- Presença consistente na primeira página ou Map Pack para consultas centrais de especialista, condicionada a proximidade, avaliações, concorrência e qualidade do GBP.
- Crescimento de conversões orgânicas, não apenas posições.
- Autoridade distribuída por vários clusters, sem depender do nome da médica.

## Regras para não perder qualidade

- Não prometer posição, prazo clínico ou resultado terapêutico.
- Não publicar páginas de bairro sem endereço e atendimento reais.
- Não duplicar o mesmo conteúdo trocando apenas a palavra-chave.
- Não usar FAQ schema sem FAQ visível.
- Não adicionar nota, reviews, horários ou procedimentos ao schema sem confirmação.
- Não ativar Campo Grande no sitemap antes da página ter NAP verificável.
- Não produzir conteúdo médico sem revisão da Dra. Dayara e referências adequadas para afirmações clínicas.
