# Blog, imagens e títulos locais — validação independente

**Data:** 2026-10-12
**Spec:** `.specs/features/blog-images-local-titles/spec.md`
**Diff final:** `7c01737..736dae6`
**Delta da correção:** `05bf2cd..736dae6`
**Verificador:** subagente independente; autor ≠ verificador
**Veredito final:** **PASS — os dois gaps foram corrigidos e revalidados.**

## Revalidação final — F1, commit `736dae6`

O delta foi lido independentemente. O `ImageObject` mantém URL, dimensões e legenda, omitindo `creator`/`copyrightHolder` sem comprovação. O H1 preserva `post.title` e usa quebra de palavra e tamanho fluido no mobile. A captura `/private/tmp/dayara-local-final.png` foi inspecionada: título legível e completo, sem palavra cortada.

| Critério | Evidência final | Estado |
| --- | --- | --- |
| SEO-01 | Asserções exatas de títulos/canonicals em `tests/unit/editorial-update.test.ts:10–23` e `tests/e2e/editorial-update.spec.ts:17–20`; código de títulos inalterado no F1. | PASS |
| SEO-02 | `tests/unit/editorial-update.test.ts:28–45`: presença, limite, unicidade, metadata/OG/Twitter e fallback; H1 ainda usa `post.title` em `src/app/blog/[slug]/page.tsx:89`. | PASS |
| IMG-01 | Reconstrução independente das dez conversões, descrita no histórico; regressão adicional em `tests/unit/editorial-images-update.test.ts:62–63`: `assert.equal(image.creator, undefined)` e `assert.equal(image.copyrightHolder, undefined)` para todos os posts com imagem. | PASS |
| IMG-02 | Destinos/dimensões/retalho preservados; `tests/unit/editorial-images-update.test.ts:23–39` e `tests/e2e/editorial-update.spec.ts:99–104`. | PASS |
| BLOG-01 | Conteúdo inalterado no F1; `tests/unit/editorial-new-posts.test.ts:20–30,50–61` e fontes/FAQs/limites inspecionados no histórico. | PASS para preparação da PR |
| LOCAL-01 | `tests/unit/editorial-new-posts.test.ts:35–43` e `tests/e2e/editorial-update.spec.ts:109–111`; mapa/intenção/conteúdo preservados. | PASS |
| GRAPH-01 | Graph mantém imagens/citações, referências resolvem e audit passa; atribuições não comprovadas agora ausentes nas asserções `editorial-images-update.test.ts:62–63`. | PASS |
| QA-01 | Unitários e audit executados independentemente; logs finais de build/e2e inspecionados; `tests/e2e/editorial-update.spec.ts:119,128`: aguarda fontes e exige `textRight <= columnRight + 1`. A mesma asserção foi executada independentemente em navegador isolado, nos dois tamanhos. | PASS técnico |

**Cobertura final:** 8/8 critérios técnicos compatíveis com a spec; zero gaps de implementação abertos e zero lacunas de precisão. A sincronização final de T4/STATE/PR é a etapa documental do orquestrador, não uma falha de código. Revisão clínica e procedência/licença continuam pendentes antes do merge, como definido desde o início.

### Gates finais

- `npm run test:unit`, execução independente: **62 passam, 0 falham, 0 skips**, exit 0. Baseline independente: 41; aumento total de 21 unitários, sem exclusões.
- `npm run audit:seo`, execução independente: **0 erros, 0 alertas**, exit 0.
- Lint final: sucesso informado pelo autor.
- Build final: sucesso informado pelo autor e log `/private/tmp/dayara-final-build.log` inspecionado; 69 páginas. Não foi repetido.
- E2E final: log `/private/tmp/dayara-final-e2e.log` inspecionado, **46 passaram**, incluindo 320 e 390 px após fontes; zero skips informado pelo autor. Não foi repetida a suíte inteira.

### Sensores adicionais de F1

| Mutação | Estado temporário e asserção | Resultado |
| --- | --- | --- |
| F1-M1 — recolocar autoria e copyright da médica | `git archive 736dae6` em `/private/tmp/dayara-f1-validation-c8nmy8ga`; campos reinseridos apenas na cópia. `tests/unit/editorial-images-update.test.ts:62` falha; 8 passam, 1 falha; exit 1. | MORTA |
| F1-M2 — restaurar text-4xl e retirar break-words/tamanho fluido | Build de produção copiado para scratch, excluindo dev/cache; servidor isolado na porta 3421. Mutação somente no DOM de contextos descartáveis do Chromium. A mesma asserção de `tests/e2e/editorial-update.spec.ts:128` falha em ambos os tamanhos. | MORTA |

| Viewport | Texto final: margem direita | Coluna: margem direita | Texto mutado: margem direita | Resultado final |
| --- | --- | --- | --- | --- |
| 320 px | 289.22 px | 298 px | 407.03 px | Cabe na coluna; mutant excede por 109.03 px. |
| 390 px | 348.98 px | 368 px | 407.03 px | Cabe na coluna; mutant excede por 39.03 px. |

No estado final, scrollWidth/clientWidth do H1 foram 282/282 px em 320 px e 352/352 px em 390 px. O script `/private/tmp/playwright-test-dayara-f1-sensor.js` e o resultado `/private/tmp/dayara-f1-typography-sensor.json` registram as medidas. O browser/contextos e o servidor scratch foram encerrados. Nenhuma mutação ocorreu na árvore real.

**Sensor total:** 5 comportamentos mutados, 5 mortos, 0 sobreviventes; a mutação tipográfica foi avaliada em dois viewports. Os três sensores iniciais permanecem documentados abaixo.

### Histórico e lições

A validação inicial de `05bf2cd` foi FAIL pelos dois gaps abaixo. O autor acrescentou regressões antes das correções, com falhas reproduzidas, e o commit `736dae6` corrigiu ambos. Esta revalidação fecha os dois gaps em uma única rodada. As lições L-001 (procedência) e L-002 (fontes/limites de texto) permanecem candidatas e foram criadas exclusivamente pelo script da skill. Nenhuma entrada duplicada foi adicionada na revalidação limpa.

## Histórico — verificação inicial de `05bf2cd`

### Conclusão e escopo inicial

Os títulos, as dez conversões, os cinco artigos, os links e os três sensores de regressão conferem com o escopo. Há uma falha de procedência no caminho de schema reutilizado: imagens fornecidas pelo Word recebem `creator` e `copyrightHolder` da médica sem comprovação. A revisão de origem/licença está explicitamente pendente, portanto essas atribuições não podem ser inferidas. A revisão visual do autor encontrou também overflow do H1 do guia local após as fontes carregarem; a especificação foi explicitada para cobrir autoria não inferida e H1 dentro da coluna em 320 e 390 px antes da correção.

Este relatório verifica preparação de PR. Não certifica revisão médica, licença das imagens, rankings, merge ou publicação. Revisão clínica/procedência antes do merge permanece obrigatória conforme `spec.md:5–8` e `docs/blog-images-word-cross-reference.md:31–37`.

## Tarefas — estado inicial

| Tarefa | Estado observado |
| --- | --- |
| T1 — títulos | Implementada; valores e fallback verificados. |
| T2 — imagens | Implementada; arquivos e cruzamento verificados. Atribuição de propriedade no schema exige correção. |
| T3 — conteúdo | Implementada; cinco posts, referências, FAQs e links verificados. |
| T4 — encerramento | Pendente: correção, revalidação, revisão visual final e atualização da PR pelo orquestrador. |

## Critérios e evidências derivadas — estado inicial

| Critério | Resultado esperado da spec | `file:line` + asserção / inspeção | Resultado |
| --- | --- | --- | --- |
| SEO-01 | Título exato da homepage/local; hubs e perfil locais; 14 tratamentos distintos; title/OG/Twitter e canonicals coerentes. | `tests/unit/editorial-update.test.ts:10–11`: `assert.equal(SEO_TITLE, 'Dra. Dayara Salomão \u007c Coloproctologista em Campo Grande (MS)')`; `:17–23`: título por tratamento, igualdade OG/Twitter/canonical e `new Set(titles).size === 14`. `tests/e2e/editorial-update.spec.ts:3–20`: tabela com valores exatos dos hubs/perfil/local e `toHaveTitle(title)`, `toHaveAttribute('content', title)`, canonical exato. | PASS |
| SEO-02 | 35 artigos existentes com seoTitle único ≤65 caracteres; fallback para title; H1 editorial preservado e artigos gerais sem cidade artificial. | `tests/unit/editorial-update.test.ts:28–37`: presença, `length <= 65`, igualdade de metadata/OG/Twitter e unicidade; `:42–45`: fallback exato. `src/app/blog/[slug]/page.tsx:88–90`: H1 usa `post.title`. Comparação independente dos 35 arquivos com `git show 7c01737:<path>`: `assert.equal(now.title,before.title)` e `assert.equal(now.slug,before.slug)` passaram em todos; `assert.doesNotMatch(now.seoTitle,/Campo Grande/)` passou nos artigos existentes gerais. | PASS |
| IMG-01 | Dez originais cruzados com destino, dimensões e limites; WebP sem alteração editorial, proporção preservada e PNGs originais fora de public. | `docs/blog-images-word-cross-reference.md:7–18` e manifesto: dez correspondências. `tests/unit/editorial-images-update.test.ts:23–31`: src/width/height/cadastro e assinatura RIFF/WEBP. Verificação independente em PIL do DOCX: `len(rows) == 10`; `src.size == out.size == (width,height)`; `Image.convert('RGB').save(format='WEBP',quality=88,method=6)` produz bytes **idênticos** aos dez assets; nenhuma cópia binária dos PNGs do Word em public. | PASS arquivos; FAIL procedência de schema, ver gap 1 |
| IMG-02 | Seis artigos existentes ilustrados e retalho substituído na URL existente; alt contextual e legendas sem promessa/paciente inferido. | `tests/unit/editorial-images-update.test.ts:8–15,23–28`: seis destinos, dimensões, imagem no Markdown e caption. `:35–39`: retalho permanece na URL e legenda contém `não mostra todas as etapas`. `tests/e2e/editorial-update.spec.ts:83–104`: sete imagens, width/height exatos, carga real e proporção. Inspeção do manifesto e legendas: equipamento/HPV não afirmam procedimento ou diagnóstico; produtos não são recomendações. `src/components/ui/MdxImage.tsx:18,28,34–39` renderiza alt e caption. | PASS |
| BLOG-01 | Sem corte integrado na URL existente; quatro guias distintos com fontes acessíveis, FAQs, datas reais, links, limites; nenhuma oferta THD ou promessa universal. | `tests/unit/editorial-new-posts.test.ts:7–30`: cinco slugs/títulos exatos, datas 2026-10-12, sources ≥1, FAQs ≥3, links locais, backlinks e ausência de reviewedBy. `:50–55`: marcos do CO2, ausência de garantia em 30 dias, sangramento intenso e dificuldade para urinar. `:60–61`: pauta sem corte e ausência de rota duplicada. `tests/e2e/editorial-update.spec.ts:35–67`: HTTP 200, fontes visíveis e FAQ com texto igual ao schema. Leitura independente dos cinco artigos confirma limites específicos, sem doses/automedicação recomendada ou THD. Fontes verificadas online abaixo. | PASS para preparação de revisão clínica |
| LOCAL-01 | Guia explica termos, CRM/RQE, preparo/escolha/endereço; links para local/primeira consulta; buscas comerciais pertencem à local. | `tests/unit/editorial-new-posts.test.ts:35–43`: três queries comerciais → `/locais-de-atendimento/campo-grande`, query informacional → guia, termos/CRM-MS 16556 / RQE 9819/endereço/sala. `tests/e2e/editorial-update.spec.ts:108–111`: backlinks visíveis na local e primeira consulta. `content/posts/como-encontrar-coloproctologista-campo-grande-ms.md:63–104`: consulta oficial, critérios de escolha, preparo, endereço e limites do atendimento. | PASS |
| GRAPH-01 | Novos posts com entradas de artigos existentes; relatedPosts resolvem; imagens primárias em Article/ImageObject/sitemap; citações visíveis; audit sem erros/alertas. | `tests/unit/editorial-new-posts.test.ts:26,29`: backlink e número de citations. `tests/unit/content-model.test.ts:63–72`: referências resolvem, não apontam para si mesmas e retorno relatedPosts exato. `tests/e2e/editorial-update.spec.ts:59–79`: cada citation resolve uma fonte visível, imagem no Article e URLs/imagens no sitemap. Inspeção independente dos oito assets fornecidos usados como primários: `article.image['@type'] === 'ImageObject'`, URL/width/height/caption iguais ao manifesto. `src/app/sitemap.ts:76–83` usa cardImage das mesmas fontes. `npm run audit:seo`: **0 erros/0 alertas**. | PASS conteúdo/graph; FAIL atribuições adicionais não comprovadas, gap 1 |
| QA-01 | Gates passam, verificação independente e mutações isoladas; PR/evidências concluídas. | Unitários executados pelo verificador: **61/61**, zero skips; audit executado pelo verificador: **0/0**. Lint, build com 69 páginas e e2e com 44 testes foram informados pelo autor, sem repetição por instrução do orquestrador. Sensores abaixo: **3/3 mortos**. Relatório persistido; PR e revisão visual final ainda cabem a T4. | Técnica passa; encerramento pendente da correção e T4 |

Não foram identificadas lacunas de precisão da spec que impedissem definir estes resultados. Os critérios clínicos descrevem limites editoriais deliberados, não prazos/estimativas universais a inventar.

## Fontes e cruzamento independente

- O DOCX foi lido de `/Users/diegovfeder/Downloads/Conteudo novo dayara.docx`. A posição/relacionamento das imagens foi confrontada com `/private/tmp/dayara-docx/content.txt`: CO2→image7, sem corte→image5, ligadura→image3, HPV→image1, prurido→image9, troca do retalho→image10, fissura→image4, pomada→image2, trombose→image8/image6.
- As dez saídas WebP foram reconstruídas a partir dos PNGs internos no DOCX e coincidem byte a byte com qualidade 88 / method 6. Isso prova ausência de crop/resize/alteração visual editorial além da compressão WebP com perdas documentada.
- Os 35 slugs e H1 editoriais preexistentes permanecem iguais ao baseline; o total é agora 40 posts.
- A [ASCRS](https://www.fascrs.org/Web/Patients/Diseases-and-Conditions/A-Z/Hemorrhoids-Expanded-Information.aspx) estava acessível e sustenta anatomia, diferenciação, hábitos, avaliação da trombose e cuidado pós-operatório geral.
- O [NHS](https://www.guysandstthomas.nhs.uk/health-information/piles-haemorrhoids/surgery) estava acessível e sustenta cuidado de ferida, dor, sangramento e retomada gradual; não foi usado para garantir datas/protocolo específicos da médica.
- O [resumo institucional da AGA de 29/04/2026](https://news.gastro.org/issues/2026/april-2026/hemorrhoid-care-new-clinical-practice-update/) estava acessível: limitações dos tópicos/corticoides estão presentes e a fonte é descrita como resumo de opinião especializada, não ensaio nem guideline formal.
- [Busca por Médicos do CFM](https://portal.cfm.org.br/busca-medicos/) e [orientação do CFM sobre registros](https://portal.cfm.org.br/noticias/voce-sabe-se-quem-esta-te-atendendo-e-mesmo-medico-veja-como-se-proteger) estavam acessíveis. Não foi realizada uma certificação externa nova dos registros individuais; o guia identifica os dados como informados pelo site e remete à consulta oficial atualizada.

## Sensor de discriminação

Cópias criadas por `git archive` em `/private/tmp/dayara-independent-validation-aa3ppm8t/{baseline,current}`, com node_modules apenas como symlink. O código/testes reais nunca foram mutados, stashed ou restaurados. Cada mutação foi aplicada separadamente e revertida somente na cópia temporária.

| Mutação | Local / comportamento incorreto | Teste que falhou | Resultado |
| --- | --- | --- | --- |
| M1 | `src/lib/seo.ts:84`: `const title = post.title` ignora seoTitle. | `tests/unit/editorial-update.test.ts:31`: `assert.equal(metadata.title, post.seoTitle)`; 3 passam/1 falha; exit 1. | MORTA |
| M2 | `src/lib/seo.ts:102`: `imageWidth:1200` publica proporção social falsa. | `tests/unit/editorial-images-update.test.ts:50`: `assert.equal(images[0].width,width)`; 7 passam/1 falha; exit 1. | MORTA |
| M3 | `src/lib/seo-map.ts:35`: queries comerciais atribuídas ao guia. | `tests/unit/editorial-new-posts.test.ts:36`: `canonicalPath === '/locais-de-atendimento/campo-grande'`; 7 passam/1 falha; exit 1. | MORTA |

**Resultado:** 3 injetadas, 3 mortas, 0 sobreviventes; profundidade leve adequada a conteúdo estático. Logs temporários em `mutation-{1,2,3}.log` e `results.json` no mesmo diretório.

## Gates e integridade dos testes

| Gate | Origem da evidência | Resultado |
| --- | --- | --- |
| `npm run test:unit` | Independente, árvore real e cópia do commit 05bf2cd | 61 passam, 0 falham, 0 skips; exit 0 |
| `npm run audit:seo` | Independente, árvore real | 0 erros, 0 alertas; exit 0 |
| `npm run lint` | Informado pelo autor | Passou |
| `npm run build` | Informado pelo autor | Passou;69 páginas |
| `PLAYWRIGHT_PORT=3420 npm run e2e` | Informado pelo autor | 44 passaram |

O baseline 7c01737 foi executado independentemente na cópia:41/41 testes, 0 skips. Delta: +20 unitários. Nenhum teste foi removido/desativado. A única alteração em asserção antiga é a regex exata da descrição local em `tests/e2e/blog.spec.ts:210`, acompanhando a troca especificada de `Campo Grande, MS` para `Campo Grande (MS)`; não reduz sua força.

Uma tentativa adicional de fetch independente ao preview foi bloqueada pelo sandbox (`EPERM127.0.0.1:3420`), não por erro do site. Não se pede nova permissão nem se duplica e2e; sua evidência acima permanece explicitamente informada pelo autor.

## Qualidade e casos relevantes

- Implementação pequena: um campo opcional, reutilização dos builders, Markdown, MdxImage e sitemap; sem biblioteca/CMS adicional.
- Escopo cirúrgico, documentação e testes correspondem aos critérios; sem exclusão de cobertura ou mudanças unrelated detectadas.
- Fallback seoTitle ausente, proporção vertical do diodo, URL antiga do retalho, rota duplicada ausente, distinção CO2/diodo e propriedade de busca comercial possuem evidência.
- As orientações consultadas foram AGENTS.md, `.specs/codebase/TESTING.md` e referências validate/sub-agents/coding-principles de tlc-spec-driven.
- UAT interativo não realizado por este verificador. O autor reproduziu overflow do H1 do guia local após `document.fonts.ready`: em 390 px, coluna 352 px / scrollWidth 391 px, range direito 407.03 px versus coluna direita 368 px. O documento ainda reporta overflow 0 por clipping global. Essa evidência é explicitamente fornecida pelo autor, não uma medição independente. O teste adicional mede o texto após carregamento das fontes em 320 e 390 px.

## Gaps iniciais — fechados pelo F1

### 1. P2 — não inferir autoria/propriedade das ilustrações fornecidas

- **Evidência:** `src/lib/structured-data.ts:280–281` emite `creator:{'@id':physicianId}` e `copyrightHolder:{'@id':physicianId}` para qualquer post.image. As oito imagens primárias fornecidas passam por esse caminho. `docs/blog-images-word-cross-reference.md:33` diz que origem/licença ainda precisam ser confirmadas; o autor confirmou que não existe evidência de autoria/propriedade.
- **Critério afetado:** IMG-01/GRAPH-01 e limite de procedência explicitado na spec/relatório de cruzamento. O conteúdo visual e as dimensões estão corretos; as atribuições adicionais não estão comprovadas.
- **Causa:** builder preexistente atribui propriedade da médica universalmente; novos assets de procedência pendente ampliam essa afirmação.
- **Fix task:** remover creator/copyrightHolder não comprovados ou usar atribuição específica verificada, sem preencher por inferência.
- **Verificar:** teste do payload ImageObject confirma dimensões/caption/URL e ausência de atribuição quando não há procedência comprovada; executar unitários/audit e gates afetados; revalidar delta independente.
- **Done when:** nenhuma imagem fornecida assume autoria/propriedade; revisão médica/procedência antes do merge segue explicitamente pendente.

### 2. P2 — H1 do guia local ultrapassa a coluna após carregar a fonte

- **Evidência:** `src/app/blog/[slug]/page.tsx:88` usa text-4xl e o termo longo coloproctologista; medidas acima fornecidas pelo autor. `tests/e2e/editorial-update.spec.ts:114` começa nova cobertura com `document.fonts.ready` e `expect(bounds.textRight).toBeLessThanOrEqual(bounds.columnRight + 1)` em 320 e 390 px.
- **Critério afetado:** QA-01, agora explícito no H1 mobile. As asserções anteriores de overflow do documento não detectam texto cortado por overflow-x global.
- **Fix task:** ajustar quebra/tamanho responsivo do H1 para caber na coluna; conservar o teste que mede limites do texto após carregar as fontes.
- **Verificar:** teste novo passa em 320 e 390 px, imagem/revisão visual confirmam ausência de texto cortado; repetir gates afetados e revalidar o delta.
- **Done when:** textRight ≤ columnRight + 1 depois de fonts.ready nos dois tamanhos.

**Encerramento:** os gaps 1–2 foram corrigidos e revalidados. O orquestrador conclui T4, STATE e a atualização da PR. Esse FAIL inicial foi resolvido na revalidação final acima.
