# Prompt para agente — portar os padrões do repo do Dr. Paulo Araújo

Você trabalha no site da Dra. Dayara Salomão. Sua missão é portar um conjunto de
padrões já validados em outro projeto médico do mesmo estúdio, adaptando-os ao
que **já existe aqui** — sem refazer o que está feito e sem publicar afirmação
clínica que não passou pela revisão da médica.

## Workspace e referência

- **Repo de trabalho**: `/Users/diegovfeder/workspace/jobs/dayarasalomao` (`dayarasalomao/web`)
- **Repo de referência (somente leitura)**: `/Users/diegovfeder/workspace/jobs/pauloaraujoneuro`
- Site público: `https://www.dayarasalomao.com.br/`
- PR aberta que é a spec do mês: `https://github.com/dayarasalomao/web/pull/17`

Leia primeiro, no repo de referência:

- `AGENTS.md` — as regras não-negociáveis e as convenções
- `app/lib/content-validation.ts` — as regras de referência cruzada e de completude
  (ignore o `state`/`indexable` que aparece ali: ver A1)
- `app/lib/faqs.ts` — o hub de FAQ montado a partir do catálogo
- `app/lib/seo.ts` + `app/llms.txt/route.ts` — inventário único de rotas
- `app/lib/og.tsx` — gerador de imagem OG por rota
- `app/components/content/ContentCard.tsx` + `.content-card`/`.card-link` em `app/globals.css`
- `docs/pesquisa/brief.md` — o brief de pesquisa reutilizável

⚠️ **Referência, não fonte.** O stack difere: lá é Tailwind v4 com `@theme inline`
e classes semânticas em `globals.css`; aqui é Tailwind v3.4 com tokens no
`tailwind.config.ts` e código em `src/`. Porte a **ideia e a regra**, escreva o
código no idioma deste repo. Não copie arquivo.

## Branch

A PR #17 está aberta em `feat/seo-growth-content-and-conversion-tracking` e
mexe forte em `src/lib/treatments.ts`, nos componentes de `src/components/ui/` e
em `src/app/globals.css` — que é justamente o que você vai tocar.

- Se a #17 **já foi mergeada**: branch a partir de `main`.
- Se ainda está aberta: branch a partir do HEAD dela e avise no PR que precisa
  rebase depois do merge.

Confirme com `gh pr view 17 --json state` antes de começar.

---

# Lotes de trabalho

Cada lote é um commit (ou uma PR própria, se crescer). **Lotes B, C e D não
dependem do A** — se o tempo for curto, o par de maior retorno é **A2 + D**.

---

## Lote A — fundação de conteúdo

### A1. Política de publicação: sem gate

**Decisão do estúdio, e vale tanto para este repo quanto para o do Dr. Paulo.**
Não existe `state: 'draft'` nem `indexable: false` em post ou tratamento. Tudo o
que está no repositório está publicado e indexável. **Não introduza esses
campos.**

O gate resolvia o problema errado: ele permitia que texto clínico não revisado
**existisse em produção** esperando aprovação, e na prática o flag virava
depósito de pendência. A regra que o substitui é mais simples e mais estrita:

> Texto clínico é revisado pela Dra. Dayara **antes do merge**, não depois.
> Enquanto não foi revisado, ele fica na branch — que é exatamente para isso.

Consequências práticas:

- Uma página no repo é uma página no ar. Um post em `content/posts/` está no ar.
- **Completude passa a ser incondicional** (ver A2): se está no repo, está
  completo. Não há mais "completo porque é público" versus "porque é indexável".
- **`indexable` em `src/lib/locations.ts` fica onde está.** Local em
  pré-lançamento é um caso real e diferente — endereço confirmado, data de início
  futura. Não estenda o campo para os outros catálogos, e não o remova de lá.
- O hub do blog em `noindex` quando está vazio continua valendo: é propriedade da
  página, não estado de conteúdo.

### A2. Validação de conteúdo que quebra o build

**Por quê.** `tests/unit/content-model.test.ts` hoje checa presença de
frontmatter e slug duplicado. Não checa referência cruzada — e os mapas
`DISEASE_TO_TREATMENT_SLUG`, `TREATMENT_CARD_TO_SLUG`, `relatedPosts` e
`relatedTreatmentSlugs` são strings soltas. O commit `34eea93` corrigiu à mão um
mapeamento duplicado de blog, e a fusão dos dois posts de prurido/coceira foi
descoberta na leitura, não pelo build. Uma regra de `primaryKeyword` único teria
pegado aquela canibalização no primeiro `npm run build`.

**O quê.** Crie `src/lib/content-validation.ts` e chame-o no carregamento dos
módulos de catálogo, para que `next build` **falhe** — não só o teste.

Regras a portar:

1. `slug` único, em minúsculas e hifenizado.
2. **`primaryKeyword` único entre posts, e intenção primária única entre
   tratamentos.** Guarda estrutural contra canibalização.
3. Datas de calendário reais — rejeite `2026-02-31`, que casa com o shape ISO.
4. `lastModified >= publishDate`.
5. **Toda referência resolve**: `relatedPosts`, `relatedTreatmentSlugs`, as duas
   tabelas `DISEASE_TO_*`/`TREATMENT_CARD_TO_*` e os hrefs de FAQ apontam para
   entrada que existe. Link interno quebrado passa a ser erro de build — é a
   regra que mais paga, e a única de referência cruzada que sobra sem o gate.
6. **Completude, incondicional**: metaTitle, metaDescription, resumo, mínimo de
   seções, indicações, carePath e FAQ presentes em toda entrada. Sem gate, não há
   entrada "meio pronta" legítima — se está no repo, está pronta.
7. Nenhum post pode ficar sem `author`/assinatura, e o CRM/RQE vem de
   `src/lib/profile.ts`, nunca hardcoded.

Mensagem de erro no formato `<fonte>.<campo>: <detalhe>` — ex.
`posts.prurido-anal-causas-cuidados.primaryKeyword: duplicates posts.coceira-anal-persistente`.
Cubra cada regra com um teste unitário.

### A3. Hub de FAQ montado a partir do catálogo

**Por quê.** `src/lib/faq.ts` são 15 perguntas escritas à mão em 3 grupos fixos,
enquanto os 14 tratamentos carregam FAQs próprias que **nunca chegam** a
`/perguntas-frequentes`. Toda pergunta nova hoje tem que ser escrita duas vezes.

**O quê.**

- Tratamentos passam a **autorar sementes de FAQ**; o catálogo decide categoria,
  ordem e posição. Nenhum arquivo de tratamento redeclara campo que não escolhe.
- As perguntas da home são classificadas **por `id`, não por posição no array**:
  reordenar a lista não pode recategorizar uma resposta em silêncio.
- Cada resposta carrega `relatedHref` de volta para a página que a cobre — o hub
  vira motor de link interno.
- **Lição já paga no outro projeto:** os grupos fixos param de separar qualquer
  coisa quando o catálogo cresce (lá, 114 de 117 perguntas caíram num bucket
  só). Agrupe por `topic`/`topicId` derivado do próprio tratamento, com índice de
  tópicos no alto e listas longas dobradas. Os 3 grupos atuais já mostram a mesma
  forma — não repita o beco sem saída.
- O schema `FAQPage` só inclui resposta **visível na página**. Isso já é regra em
  `docs/cfm-compliance-guidelines.md`; garanta que continua verdade depois da
  montagem automática.

---

## Lote B — aquisição e CTR

### B1. `llms.txt` gerado a partir de um inventário único de rotas

**Por quê.** `public/llms.txt` é arquivo estático. Ele deriva. A PR #17 teve que
repontá-lo à mão depois de fundir dois posts — trabalho que o build devia fazer.

**O quê.** Uma função `getRouteInventory()` (path, título, descrição,
`lastModified`, prioridade) alimentando **sitemap e `llms.txt` da mesma fonte**,
para que não possam discordar. Troque o arquivo estático por
`src/app/llms.txt/route.ts` com `dynamic = 'force-static'`. Delete
`public/llms.txt` no mesmo commit.

`lastModified` vem do conteúdo. Onde a rota não tem data própria (home,
privacidade), use **uma** constante nomeada de baseline — nunca `new Date()`, que
mente para o crawler a cada deploy.

### B2. Imagens OG por rota

**Por quê.** Não existe um único `opengraph-image.tsx` no repo. O problema medido
é CTR de 1,3% e cada compartilhamento hoje sai sem cartão de marca.

**O quê.** Um helper `renderOgImage({ eyebrow, title, description })` com
`ImageResponse` do `next/og`, mais um `opengraph-image.tsx` por família de rota
(`/tratamentos/[slug]`, `/blog/[slug]`, `/locais-de-atendimento/[slug]`, e os
hubs). Composição sobre `teal-deep`, com `copper`/`straw` como acento e a linha
`CRM-MS 16556 · RQE 9819` no pé — os tokens já existem no `tailwind.config.ts`.

Uma vez feito, **toda página futura ganha cartão sem trabalho de design.**

Aproveite para consolidar um único builder de metadata, como
`app/lib/metadata.ts` no repo de referência. O motivo está no comentário de lá e
vale aqui: uma rota que define só `openGraph` herda em silêncio o Twitter card da
home, e o compartilhamento passa a mostrar o título errado.

---

## Lote C — sistema visual

A PR #17 já tem esses itens como TODO ("Ritmo `eyebrow → H2 → parágrafo`",
"Hover dos cards"). Faça-os com os detalhes abaixo, que são o que faz o padrão
parecer desenhado em vez de montado.

### C1. Dois bugs de verdade, primeiro

1. **`.card:hover` e `.btn:hover` não estão dentro de `@media (hover: hover)`.**
   Com ~90% de tráfego mobile, o `translateY(-3px)` e a borda copper **grudam**
   depois do toque. Envolva todo hover de card e botão nessa media query.
2. **Nada respeita `prefers-reduced-motion`.** Adicione o kill switch que zera as
   `transition` de `.card`, `.btn` e do acordeão de FAQ.

E duas dívidas a atacar na raiz, não no sintoma:

3. **`h1, h2, h3, h4, h5, h6 { font-family: cinzel }`** é global. A #17 remendou
   os títulos de card com `font-sans` um por um; a regra continua vazando para
   todo componente novo. Inverta: Cinzel entra por classe de título de seção,
   não por seletor de elemento.
4. **`body { overflow-x: hidden }`** esconde o overflow em vez de corrigi-lo.
   Ache o elemento que estoura, corrija, e verifique a 320px. A regra do outro
   projeto: 390px é o viewport de design, 320px não pode estourar.

### C2. `SectionHeader` e um `ContentCard` compartilhado

- `SectionHeader` com o ritmo `eyebrow → H2 → parágrafo de intro`. É a mudança
  mais barata com maior ganho de hierarquia, e vale para todas as seções.
- Um **átomo** `ContentCard` (chip + meta + título + descrição + ação), com
  `BlogCard`/card de tratamento/card de doença como wrappers finos. Hoje cada um
  tem tratamento próprio. No outro repo isso alcançou o site inteiro num commit.

Detalhes que valem portar:

- **Cor chega na aproximação**, não fica em repouso: uma hairline de 3px no topo
  do card em `opacity: 0`, subindo para 1 no hover. Evita a grade virar arco-íris.
- **Barra de ação sangrada** no pé do card em vez de link de texto: margem
  negativa até a borda, fundo levemente distinto, e seta circular preenchida que
  translada 3px no hover **e no `:focus-visible`** — paridade de teclado é o que
  quase todo mundo esquece.
- `min-height` + `justify-content: space-between`, para as barras de ação
  alinharem entre os cards de uma linha independente do tamanho do texto.
- Chip por tipo de conteúdo, para escanear a grade e saber o que é cada card.
  A pílula do `BlogCard` já lê a condição do tratamento — mantenha essa taxonomia
  real e estenda o mesmo raciocínio aos outros cards.
- Alvo de toque mínimo 44px; ação primária mobile 48px.

---

## Lote D — brief de pesquisa reutilizável

**Por quê.** É o que destrava os 7 posts do item 2a da PR #17. Hoje todo conteúdo
clínico depende de um documento que a Dra. Dayara mandou, e quando o tema não
está lá, o post empaca. O brief cria um caminho repetível para gerar **material
com fonte** — que ela revisa e assina — em vez de esperar por um novo documento.

**O quê.** Crie `docs/pesquisa/brief.md`, adaptando a estrutura de
`docs/pesquisa/brief.md` do repo de referência. Uma rodada por tema, resultado
salvo em `docs/pesquisa/<slug>.research.md`.

O que **muda** em relação ao original:

- **Hierarquia de fontes para coloproctologia**: guidelines da ASCRS, NICE e NICE
  CKS, ESCP; depois Cochrane e revisões sistemáticas no PubMed/PMC; depois
  literatura primária (*Diseases of the Colon & Rectum*, *Colorectal Disease*,
  *Techniques in Coloproctology*, *BJS*, *Annals of Surgery*); por último
  educação de paciente de centro acadêmico (Mayo, Cleveland Clinic, NHS).
- Contexto de prática: coloproctologia ambulatorial privada em **Campo
  Grande - MS**, com laser de CO₂, laser de diodo, VAAFT, EPSiT e toxina
  botulínica disponíveis, e **colonoscopia não realizada nesse local** — marque
  onde a recomendação assume recurso que não existe aqui.
- Os 7 temas travados entram como a fila de rodadas: SII, Crohn e retocolite,
  diarreia crônica, constipação, hidradenite supurativa, alteração do hábito
  intestinal, e DII com histórico familiar.

O que **não muda**, porque é o que faz o brief funcionar:

- **Regra dura: não usar site de clínica, hospital ou médico brasileiro, nem
  blog em pt-BR.** É o que impede reaproveitar o trabalho de um colega — e aqui
  esses sites são exatamente os concorrentes na SERP. Artigo revisado por par de
  autor brasileiro publicado em inglês é bem-vindo; a restrição é sobre copiar
  site, não sobre ciência brasileira.
- **Nunca escrever prosa publicável.** A saída é bullet factual com tag
  `[GUIDELINE] | [SR/MA] | [RCT] | [COHORT] | [EXPERT-OPINION]` e número de
  fonte. Deliberadamente impossível de colar direto numa página.
- **Toda URL citada é uma que você abriu e leu.** Paywall ou link morto: diga,
  e ache outra ou marque a afirmação como não verificada.
- **Reportar conflito** (guidelines discordam? dê as duas posições) e **reportar
  ausência** (evidência fraca é achado útil, não lacuna a preencher).
- Seções obrigatórias que quase todo brief esquece: **sinais de alarme**
  explícitos e completos; **onde a guideline recomenda *contra* exame de
  imagem**; **desfechos sempre como faixa, com população e seguimento, marcados
  `⚠ VERIFICAR COM A MÉDICA`**; um **mapa de terminologia** inglês → termo
  clínico pt-BR → o termo leigo que a paciente digita no Google (é a pesquisa de
  palavra-chave, feita com honestidade); e um **"não afirmar"**, com as alegações
  a evitar.
- **CFM Resolução nº 2.336/2023** declarada de saída: sem promessa ou garantia de
  resultado, sem alegação de superioridade sobre colega ou técnica, sem
  sensacionalismo, sem sugerir exclusividade. Quando a fonte declara um desfecho,
  preserve a incerteza dela. Imagem antes/depois **não é vedada de forma
  categórica** pela resolução vigente — uso educativo é permitido sob condições —
  mas trate como revisão de conformidade especial, e registre que este projeto
  pode manter a política editorial mais estrita de não usar.
- **"Já está na nossa página"** e **"Contexto da prática"**, anexados por rodada,
  para a segunda passada não reescrever o que já foi respondido.

Amarre isso ao que já existe: `docs/cfm-compliance-guidelines.md` fica sendo o
check de publicação, e o brief o de captação. Referencie um no outro.

⚠️ **Você não escreve conteúdo clínico novo e assina com o CRM dela.** O brief
produz notas com fonte; a redação em pt-BR e a revisão da Dra. Dayara são passos
separados e obrigatórios. Isso não muda com o brief — o brief só faz a nota
existir.

---

# Não fazer

- ❌ Copiar arquivo do repo do Paulo. Tailwind v4 vs v3, `app/` vs `src/`, CSS
  semântico vs tokens de config. Porte a regra, escreva o código daqui.
- ❌ Trocar as fontes. Montserrat + Cinzel fica. Trocar tipografia é decisão de
  marca com custo de CLS, e está pendente na #17.
- ❌ Trocar a navegação. Os 7 itens incluem Blog, Dúvidas e Locais — que são
  justamente as páginas que trazem tráfego.
- ❌ Portar **conteúdo** de `.design-ref/`. Os mocks dizem Curitiba, Eco Medical
  Center, Rua Goiás 70 e telefone (41). Layout sim, conteúdo nunca.
- ❌ Mexer no botão flutuante do WhatsApp. O círculo verde foi restaurado de
  propósito em `d0b0287`; o `data-conversion` não pode mudar, senão quebra a série
  histórica de `whatsapp_click`.
- ❌ Inventar fato da prática. Endereço, telefone, horário, preço, convênio,
  volume: vêm de `src/constants.ts` ou de campo de catálogo. Não está no repo,
  não vai no site.
- ❌ Misturar a passada de títulos e meta descriptions (item 5 da PR #17) nesta
  branch. É PR separada.
- ❌ Introduzir `state: 'draft'` ou `indexable: false` em post ou tratamento.
  Decisão tomada (A1): conteúdo é revisado antes do merge, não noindexado depois.
- ❌ Deploy. Nada em produção.

# Convenções

- TypeScript; `const Component = () => {}`. Early return. Handler com prefixo
  `handle`.
- Padrão visual compartilhado em `globals.css` como classe semântica; Tailwind
  para layout. Não replique a mesma string de utilitários em 40 lugares.
- Ícones `lucide-react`, `strokeWidth={1.5}`, 18–20px, só onde ajudam. Sem emoji.
- Conteúdo opcional some limpo: endereço, mapa ou FAQ ausente não pode deixar
  container vazio.
- **Ao adicionar qualquer `cast` no código, adicione o TODO correspondente.**
- Commits convencionais (`feat(scope):`, `fix(scope):`). O corpo explica o porquê
  e diz o que foi verificado. Uma mudança lógica por commit.

# Verificação antes de abrir o PR

```bash
npm run lint
npm run test:unit
npm run build
PLAYWRIGHT_PORT=3411 npm run e2e
```

Além disso, e explicitamente no corpo do PR:

- **Diff de `sitemap.xml`, `llms.txt` e `robots.txt` antes/depois.** O conjunto
  de URLs tem que ser idêntico — nenhuma rota entra ou sai. O Lote B troca só
  *como* esses arquivos são gerados, nunca o que eles listam.
- Todo link interno e toda imagem resolvem.
- Verificação visual a **390px e 320px**, e a 1440px. Screenshot pega o que
  assertion não pega: título duplicado, gap no footer, card que lê mal.
- Header de CSP e schema de produção inalterados.
- Toque num dispositivo real (ou emulação de touch) confirmando que o hover do
  card **não gruda** depois do Lote C1.
- Nenhum `state` ou `indexable` novo em post ou tratamento (ver A1).

Registre o trabalho substantivo em `.specs/features/<feature>/tasks.md` com a
evidência da verificação, não só a alegação.
