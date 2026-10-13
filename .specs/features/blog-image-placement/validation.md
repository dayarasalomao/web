# Blog image placement — validação independente

**Resultado: PASS.** 8/8 critérios conferidos; nenhuma lacuna técnica bloqueante ou lacuna de precisão da spec. Sensor: 2 mutações, 2 detectadas, 0 sobreviventes.

Data: 2026-10-13. Verificador: subagente independente, distinto do autor. Fonte de verdade: `spec.md`, inclusive a instrução explícita de não haver imagem depois do último H2 clínico. Diff: `1f2964c5feaf335d489248eafaf29f0bd05d0cb5..29071a0`. Escopo: os 54 arquivos desse intervalo; implementação e testes reais foram somente lidos. Este relatório é o único arquivo escrito no checkout pelo verificador.

## Tarefas

T1, T2 e T3 estão concluídas em `tasks.md`. Mídia compartilhada, edição de Markdown, legendas, testes, documentação e capturas estão presentes. Nenhuma tarefa parcial encontrada.

## Critérios e resultados esperados

As referências abaixo são linhas verificadas dos arquivos atuais, não apenas referências copiadas do relatório do autor.

| AC | Resultado definido na spec | Evidência e expressão exata | Resultado |
| --- | --- | --- | --- |
| AC1 | 29 figuras junto à explicação, sem adjacência, múltiplas figuras separadas por H2 e em ordem editorial | `tests/unit/blog-image-placement.test.ts:105` — `assert.deepEqual(sort(actual), sort(placements.map(({ slug, src, section }) => ({ slug, src, section }))))`; `:68` — `assert.deepEqual(placementErrors(content, data.image?.src), [])`; `tests/e2e/blog.spec.ts:74` — `toHaveCount(2)`, `:81` — `expect(separated).toBe(true)` nos cinco artigos duplos. Tabela editorial de `spec.md` confrontada com Markdown e figuras nas capturas. | PASS |
| AC2 | No máximo uma lead correspondente ao frontmatter; zero imagens em listas/tabelas/FAQ/fontes/CTA ou depois do último H2, incluindo seções clínicas | `tests/unit/blog-image-placement.test.ts:68` — erro esperado `[]` em todos os 40 posts; `:89` — `assert.ok(placementErrors(content, '/assets/blog/a.webp').includes(error))`, com casos específicos em `:76`–`:86`; em particular `:86` exige `image-after-last-h2` mesmo com prosa posterior. `:92` permite somente a lead válida e figura antes do H2 final. | PASS |
| AC3 | Unitário examina todos os posts e inclui negativos de cada regra | `tests/unit/blog-image-placement.test.ts:65` enumera todos os `.md`; `:68` compara com `[]`; `:89` exige o código de erro de cada um dos 12 exemplos negativos de `:75`–`:86`. Executado: 55/55 testes desse arquivo na cópia intacta e novamente depois de restaurar as mutações. | PASS |
| AC4 | Legenda primária do frontmatter; secundária do título Markdown; group/aria-label somente com legenda; alt e ressalvas preservados | `tests/e2e/blog.spec.ts:84` — `toHaveText(post.image!.caption!)`, `:85` — `toHaveAttribute('role', 'group')`, `:86` — `toHaveAttribute('aria-label', \`Imagem: ${post.image!.caption}\`)`; `:90`/`:91` exigem literalmente a ressalva secundária existente; `:94`/`:95` — `not.toHaveAttribute('role'/'aria-label')`; `:96` exige a ressalva do retalho visível. `src/components/ui/MdxImage.tsx:18`–`:24` preserva alt e seleciona a origem da legenda. Comparação independente contra a base encontrou zero diferenças de alt, frontmatter ou linhas clínicas/ressalvas nos 40 posts. | PASS |
| AC5 | Card correto ou marca decorativa, 16:9, imagem inteira, next/image fill, nome do link igual ao título | `tests/e2e/blog.spec.ts:13`/`:17` — cards conforme todos os posts e uma imagem por card; `:18` — `toHaveAttribute('alt', '')`; `:19` — src correspondente a `post.cardImage?.src ?? '/core/lettering-blue.png'`; `:20` — `toHaveCSS('object-fit', 'contain')`; `:23` — link com nome exato `post.title` e href `/blog/${post.slug}`; `:28` — desvio da razão 16/9 menor que 0.02. Homepage: `:46`, `:49`, `:50`. `src/components/ui/BlogCard.tsx:38`–`:45` usa Image/fill. Conferência independente adicional no navegador: 40 imagens de `/blog` e 3 da homepage, todas com `assert.equal(img.fill, 'fill')` e `assert.equal(img.position, 'absolute')`. | PASS |
| AC6 | Somente cards 0/1 do blog eager/high; demais/homepage lazy; sizes exatos; zero overflow em 375px | `tests/e2e/blog.spec.ts:21` — `toHaveAttribute('loading', index < 2 ? 'eager' : 'lazy')`; `:22` — fetchpriority `high`/`auto`; `:33` — sizes `(max-width: 768px) 100vw, 50vw`; `:51` — homepage `loading='lazy'`; `:52` — sizes `(max-width: 768px) 100vw, (max-width: 1279px) 50vw, 33vw`; `:31` e `:56` — overflow `toBe(0)`. Executados em 1280/375px conforme cada caso. `screenshots/checks.json:48`, `:56`, `:64`, `:72`, `:80` também registram overflow 0 em 375px. | PASS |
| AC7 | Seleção de cardImage, OG, Article/JSON-LD, sitemap, ativos, frontmatter e significado clínico preservados | `tests/unit/blog-image-placement.test.ts:111` — `assert.deepEqual(getAllPosts().map(({ slug, cardImage }) => ({ slug, ...(cardImage ? { cardImage } : {}) })), baseline)`; `:115` — URL OG normalizada igual à URL canônica da imagem; `:118` — URL de Article igual à mesma URL. O verificador extraiu a base em outra pasta temporária e confirmou que o fixture `image-baseline.json` corresponde exatamente à seleção da base para os 40 posts. `tests/e2e/blog.spec.ts:582` — sitemap response ok; `:591`–`:600` — URLs de blog/artigos e imagem esperadas presentes. `src/lib/blog.ts`, SEO/schema/sitemap e ativos não mudaram no diff. Comparação independente de frontmatter, pares alt/src e linhas clínicas preservou todos os 40 posts. | PASS |
| AC8 | Gates aprovados, capturas desktop/375px de blog/homepage/três artigos duplos, verificação independente e regressão em cópia | Gate independente abaixo: lint exit 0, build 69, unitários 126/126, SEO 0/0, e2e relevantes 9/9. Gate completo do autor: e2e 59/59 registrado em `execution.md`, confirmado pelo orchestrador para o último commit de implementação; commit final acrescenta documentação/capturas. `screenshots.md:7`–`:12` referencia os 12 JPG existentes. Inspeção visual independente de sete capturas, incluindo as três páginas de artigo; métricas das dez combinações em `checks.json`. Sensor abaixo demonstra duas regressões detectadas. | PASS |

### Interpretação editorial confirmada

A figura de retalho fica em `content/posts/cisto-pilonidal-cirurgia-convencional-x-laser.md:82`, com a ressalva original em `:84`, imediatamente antes do último H2 em `:86`. Seu agrupamento técnico pertence ao H2 anterior na árvore Markdown, conforme a tabela da spec; sua referência editorial é a seção de retalho que vem em seguida. Isso cumpre a restrição explícita do usuário sem alterar a redação clínica. O quadro de instrumentos fica na seção CO2 antes do resumo final. Não foi criada uma exceção para a última seção clínica.

## Gate independente

Comando build-level de `.specs/codebase/TESTING.md`: `npm run lint && npm run build && npm run test:unit`.

- Lint: exit 0.
- Build: exit 0, Next 16.2.10, 69 páginas. A tentativa inicial em sandbox não conseguiu buscar Cinzel/Montserrat no Google Fonts; repetição com acesso de rede autorizado aprovou. Nenhuma mudança de código para contornar essa falha ambiental.
- Unitários: 126 aprovados, 0 falhas, 0 skips, 0 cancelados. Baseline: 71; acréscimo: 55. Os oito arquivos unitários anteriores estão byte a byte iguais aos da base.
- `npm run audit:seo`: exit 0, 0 erros, 0 alertas.
- `PLAYWRIGHT_PORT=3003 PLAYWRIGHT_BASE_URL=http://127.0.0.1:3003 npm run e2e -- tests/e2e/blog.spec.ts --grep 'AC1/4|AC5/6|sitemap and robots' --workers=2`: 9 aprovados, 0 falhas/skips, Chromium, servidor existente do checkout. A tentativa sandbox foi impedida de acessar/iniciar o servidor; repetição com acesso local autorizado aprovou.
- E2e completo anterior: 59/59, registrado pelo autor para o código final. A feature acrescenta 8 casos; todos os casos antigos de `blog.spec.ts`, desde `homepage renders`, permanecem byte a byte iguais. Nenhuma assertion antiga enfraquecida, removida ou ignorada.

## Sensor de discriminação

Profundidade leve conforme `references/validate.md`. Uma cópia de `git archive 29071a0` em `/private/tmp/blog-image-verifier-scratch` recebeu os mutantes; node_modules foi apenas vinculado para leitura. Runtime explícito Node 24.21.0, igual ao checkout. Nenhum arquivo real de conteúdo, implementação ou teste foi modificado.

Comando: `/Users/diegovfeder/.vite-plus/js_runtime/node/24.21.0/bin/node --test --experimental-transform-types --no-warnings tests/unit/blog-image-placement.test.ts`, executado na cópia. A primeira tentativa usou o Node global 26, que não aceita mais o flag; isso foi descartado como falha de infraestrutura e não contado como mutante morto. Baseline intacta com Node 24 aprovou antes da injeção.

| Mutação | Alvo na cópia | Resultado discriminante | Veredito |
| --- | --- | --- | --- |
| Reintroduzir as duas imagens adjacentes na introdução | `content/posts/hemorroidectomia-laser-co2.md`, figuras antes do primeiro H2 | Exit 1; `:68` detectou `multiple-lead-images`, `invalid-lead-image`, `adjacent-images`, `images-in-same-section`; mapa de posição também falhou. Log `/private/tmp/blog-image-mutant-lead.log`. | KILLED |
| Mover a figura de retalho para depois do último H2, mantendo prosa clínica posterior | `content/posts/cisto-pilonidal-cirurgia-convencional-x-laser.md`, figura após o H2 final | Exit 1; `:68` detectou especificamente `image-after-last-h2`; mapa de posição também falhou. Log `/private/tmp/blog-image-mutant-last-h2.log`. | KILLED |

Cada arquivo foi restaurado imediatamente depois do respectivo teste. Cópia restaurada: 55/55 aprovados. Resultado: 2/2 mortos, 0 sobreviventes.

## Qualidade, bordas e rastreabilidade

- Mudanças limitadas à solicitação: mídia de cards, posição editorial, legendas, documentação e evidências. Sem novos hooks, dependências, regras SEO ou conteúdo clínico.
- `LinkCard` preserva link estendido/foco, CTA e estilo existente, envolvendo apenas o texto para permitir mídia sem padding. Os demais usos continuam sem mídia.
- Sem figura: painel com marca, mesma proporção; com figura: contain e espaço reservado. Com e sem legenda: atributos de agrupamento corretos. Lead válida, tabela/lista, múltiplas figuras, áreas finais e último H2: cobertos por positivos/negativos explícitos.
- Matriz por camada de `.specs/codebase/TESTING.md` atendida: componentes/rotas por e2e; dados/Markdown por unitários e build. Sem nova rota ou caminho de erro introduzido. Casos antigos de rota/metadados continuam preservados.
- Todo teste novo se vincula a AC1–7; capturas e gates cobrem AC8. Nenhum teste novo sem requisito e nenhum campo de payload validado apenas por presença quando a spec define seu valor.
- README, CLAUDE, AGENTS e llms descrevem as novas convenções sem mudar fatos médicos. Orientações de `CLAUDE.md`, `AGENTS.md` e princípios da skill seguidos.

## Revisão visual e limites

Inspecionadas independentemente: visões gerais desktop/mobile do blog, homepage desktop/mobile, hemorroidectomia desktop, HPV perianal mobile e cisto desktop. Os painéis preservam figuras e rótulos; as imagens dos artigos estão distribuídas perto das explicações; retalho precede o H2 final com a ressalva intacta. Os demais cinco arquivos de captura existem e são referenciados em `screenshots.md`; os dez registros de overflow são 0.

Não houve UAT interativa adicional nesta verificação. A aprovação técnica não substitui a revisão médica e de procedência já exigida por `CLAUDE.md` antes do merge. Nenhum merge/commit foi realizado.

**Lacunas ranqueadas: nenhuma.** AC1–8: verificados. Sem sobrevivente, desvio ou lacuna de precisão, portanto nenhuma lição de falha foi criada. O orchestrador pode atualizar o estado da feature a partir deste relatório; a spec e os testes reais permaneceram intactos.
