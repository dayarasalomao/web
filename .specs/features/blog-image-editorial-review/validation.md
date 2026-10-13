# Revisão editorial de imagens — validação independente

**Data:** 2026-10-13. **Veredito:** PASS técnico/editorial. **Verifier:** agente independente, autor ≠ verifier. **Spec:** `spec.md`, I1–I5. **Diff:** `5a275c9..2cfb1eb`.

Revisão limitada a imagens, alt e legendas, conforme a solicitação. Títulos, excerpts, prosa clínica, FAQs e fontes não são alvo de reescrita. A aprovação médica e a avaliação de procedência/licença continuam pendentes; este PASS não as presume.

## Tarefas concluídas

| Tarefa | Commit | Resultado |
| --- | --- | --- |
| E1 — reutilização da imagem cliente/EPSiT e retirada da capa | `c41b0d5` | PASS |
| E2 — revisão de alt/legendas e preservação | `367214e` | PASS |
| E3 — QA integrado/documentação/capturas | `2cfb1eb` | PASS |

## Evidência ancorada na spec

| Critério | Resultado esperado | Arquivo:linha e assertion/valor observado | Resultado |
| --- | --- | --- | --- |
| I1 — imagem EPSiT e repetição autorizada | 40 cards com imagem, 39 src; só EPSiT/comparativo duplicam `/assets/blog/cisto-pilonidal-convencional-x-laser-silac.webp` | `tests/unit/blog-covers.test.ts:19` — `assert.equal(posts.length, 40)`; `:20` — imagem em40; `:21` — `new Set(...).size === 39`; `:24` — `assert.deepEqual` afirma o src e os dois slugs exatos. `content/posts/cisto-pilonidal-laser-epsit.md:56` declara o src esperado, sem coverImage. | PASS |
| I1 — retirada da capa problemática | Arquivo ausente/404 e fora do sitemap/manifests ativos; procedência retirada preservada | `tests/e2e/image-editorial-review.spec.ts:26` — `expect(retired.status()).toBe(404)`; `:28` — sitemap não contém a URL retirada. `tests/unit/generated-blog-assets.test.ts:13` —22 ativos, `:14` —16 image, `:15` —6 cover. Diff remove apenas aquele bitmap e sua entrada no registro; `docs/blog-generated-images-retired.json` conserva a procedência e motivo. | PASS |
| I2 —42 imagens revisadas com valores específicos | Catálogo cobre22 geradas +20 anteriores; alt/caption por src, pt-BR, sem legenda genérica e sem atribuir cena real à médica | `tests/unit/image-editorial-review.test.ts:30` — `catalog.length === 42`; `:31` — sources iguais ao registro de dimensões; `:34`/`:35` — limites de texto; `:36` — `assert.doesNotMatch` rejeita IA/legenda genérica. `:49`/`:50` — igualdade exata de alt/caption com o catálogo. Catálogo e galeria lidos integralmente; inspeção independente dos quatro exemplos abaixo confirmou correspondência física/contextual. | PASS |
| I3 — ressalvas e escopo clínico preservados |11 ressalvas literais; nenhuma mudança de prosa/títulos/excerpts/FAQs/fontes/URLs; sem nova promessa nas legendas | `tests/unit/image-editorial-review.test.ts:37` — `caption.includes(preservedDisclaimer)`; `:72`/`:73` — SHA de prosa/metadata igual à base. Recalculei os40 registros diretamente de `git show 5a275c9:content/posts/...`; todos os hashes batem com clinical-baseline.json. As11 frases preservedDisclaimer foram encontradas literalmente nos textos da base. Catálogo não acrescenta promessa de resultado. | PASS |
| I3 — figuras mantidas em posição permitida | Mesmas seções, antes do H2 final; retalho migra somente sua legenda avulsa para título Markdown | `tests/unit/blog-image-placement.test.ts:68` — `assert.deepEqual(placementErrors(...), [])`, incluindo `:49` (antes do H2 final); `:108` — seções/arquivos iguais ao placement documentado. Diff do comparativo confirma a migração permitida e preserva literalmente a ressalva. | PASS |
| I4 — metadata/captions/pixels/dimensões |40 primárias enriquecidas,45 figuras com legenda visível, textos exatos por src, pixels/dimensões mantidos | `tests/unit/image-editorial-review.test.ts:44` —40 image; `:54`/`:55` — alt e caption/título Markdown exatos; `:59` —45 figuras. `tests/e2e/image-editorial-review.spec.ts:42`/`:43` — alt/caption exatos no navegador; `:44`/`:45` — role group e aria-label da caption; `:49` —45. `tests/unit/image-editorial-review.test.ts:33` — SHA atual; conferência independente de todos42 SHA diretamente da base também passou. Registro de dimensões só perde a capa retirada; fontes mantidas não mudam. | PASS |
| I5 — crawlers/metadados e QA |60 URLs canônicas no sitemap,42 imagens de blog, OG/Twitter/Article seguem a capa; llms/robots íntegros; gates aprovados | `tests/e2e/release-qa.spec.ts:39` — lista exata de rotas; `:46` — conjunto de imagens igual ao registro42; `:53` — capas/corpo deduplicados por post; `:63`/`:64` — llms/robots200; `:66`/`:68` — catálogo/sitemap; `:83`/`:84`/`:88` — OG/Twitter/Article iguais ao card. Todos esses testes passaram na produção local. `tests/e2e/image-editorial-review.spec.ts:20`/`:21` afirma também a URL exata do EPSiT. | PASS |

**Cobertura:** 5/5 requisitos correspondem aos resultados definidos. Os valores editoriais esperados são definidos por src no catálogo, como previsto na spec. Nenhuma lacuna de precisão identificada nesse contrato; adequação médica não é inferida desses assertions.

## Inspeção visual e documental

Inspecionados independentemente os bitmaps: comparativo pilonidal/EPSiT (dois quadros, excisão e fibra; sem vídeo), retalho (região sacrococcígea e instrumentos), primeira consulta (mesa/caderno/duas poltronas) e trombectomia (diagrama da retirada de coágulo). Alt e legendas correspondem aos elementos; a primeira consulta se declara fictícia, o retalho preserva a ressalva de etapas incompletas e a trombectomia preserva a proibição de manipulação em casa. O catálogo registra42 revisões visuais da autora; este verifier conferiu os quatro exemplos diretamente e a cobertura/textos/hashes de todos42.

Cards EPSiT desktop/mobile das capturas foram vistos: usam a figura cliente inteira e mantêm título/resumo. Oito registros em `screenshots/checks.json` indicam overflow0; as capturas e o relatório são coerentes com o resultado dos testes de viewport. Manifest ativo contém22 assets com procedência/prompt e pending-physician-review; retirado contém a capa rejeitada. `docs/client-updates/revisao-final-site-blog-2026-10-13.md:5` informa16+6 e reutilização EPSiT; `:9` solicita avaliação médica/visual e licença/procedência. O texto permanece rascunho; nenhuma mensagem foi enviada por este verifier.

## Gates executados pelo verifier

Node usado explicitamente: `/Users/diegovfeder/.vite-plus/js_runtime/node/24.21.0/bin/node`.

| Gate | Execução | Resultado |
| --- | --- | --- |
| Unit | `npm run test:unit`, árvore real somente leitura |134/134;0 fail;0 skipped |
| Integridade dos testes | `npm run test:unit` em archive temporário de5a275c9 |131/131; delta +3 unitários, sem redução |
| Lint | `npm run lint` | exit0 |
| Audit SEO | `npm run audit:seo` | exit0;0 erros;0 alertas |
| Build | `npm run build` em cópia temporária com node_modules físico | exit0;69/69 páginas geradas |
| E2E focado | image-editorial-review + release-qa + blog-covers, contra next start existente em `127.0.0.1:3015`, com config temporária sem webServer |8/8;0 fail;0 skipped; inclui todos40 artigos/45 figuras e rotas canônicas |
| Diff | `git diff --check 5a275c9..2cfb1eb` | exit0 |

O primeiro build temporário falhou exclusivamente porque o sandbox bloqueou o fetch das fontes declaradas; após acesso de rede aprovado, o mesmo source build passou. A primeira tentativa de e2e não conseguiu conectar pelo sandbox e o fallback webServer falhou EPERM antes de ouvir a porta; nenhum teste rodou. A repetição com acesso de rede e config temporária sem webServer passou; o servidor/build reais não foram alterados. A execução autoral integral67/67 consta em execution.md; a repetição independente foi delimitada aos oito casos relevantes. Gates finais completos da autoria e gates independentes acima são distinguidos para evitar atribuição indevida.

## Sensor obrigatório — scratch only

Controle:6/6 unitários pertinentes passaram antes e depois. Cópias de content/docs/.specs em diretório temporário; public/src/node_modules acessados somente leitura. Mutantes restaurados após cada tentativa; nada foi modificado no conteúdo real.

| Mutação | Alvo | Falha discriminante | Resultado |
| --- | --- | --- | --- |
|1 — retirar a ressalva sobre etapas incompletas da caption revisada do retalho | cópia de `docs/blog-image-editorial-review.json:221` | `tests/unit/image-editorial-review.test.ts:37` — `includes(preservedDisclaimer)` falha; igualdade da caption também falha | Killed, exit1 |
|2 — trocar a caption EPSiT pela legenda genérica antiga | cópia de `content/posts/cisto-pilonidal-laser-epsit.md:58` | `tests/unit/image-editorial-review.test.ts:50` — caption ≠ catálogo | Killed, exit1 |
|3 — adicionar coverImage de primeira consulta ao EPSiT | cópia de `content/posts/cisto-pilonidal-laser-epsit.md:61` | `tests/unit/blog-covers.test.ts:24` — par/src duplicado difere do esperado; igualdade com catálogo também falha | Killed, exit1 |

**Resultado:**3/3 mutantes mortos;0 sobreviventes. Sensor leve proporcional ao risco editorial.

## Qualidade, limites e conclusão

Mudanças cirúrgicas: nenhuma alteração de renderer/framework; apenas remoção de entrada órfã, metadata de imagem, alt/captions, catálogo/procedência, documentação e testes associados. As atualizações de assertions antigos refletem o pedido explícito para reescrever alt/legendas e permitir a única duplicação cliente; a seleção do src/par continua exata. A mudança de seletor no teste CO2 delimita a figura primária sem eliminar a nova verificação global das figuras secundárias. Nenhum teste removido/skip/only ou enfraquecimento fora do contrato.

Guia aplicado: AGENTS.md, CLAUDE.md e coding-principles.md de tlc-spec-driven. Os novos três unitários mapeiam I2–I4; os dois e2e novos mapeiam I1/I2/I4; os testes ajustados mapeiam o contrato explícito de reutilização/captions e I5. Sem alterações alheias ao escopo.

**PASS:** I1–I5 verificados. **Gaps classificados:** nenhum. Sem lição nova a registrar (não houve falha de produto, mutante sobrevivente ou desvio). Aprovação médica/procedência permanece etapa externa documentada antes do merge/publicação. Nenhuma UAT humana foi presumida e nenhuma mudança/commit/merge foi realizada pelo verifier; somente este relatório foi escrito na árvore real.
