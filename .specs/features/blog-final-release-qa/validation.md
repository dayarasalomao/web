# Validação independente — blog final release QA

Data: 2026-10-13. Diff: `9d9e7ac..c981623`. Verifier: agente independente, autor ≠ verificador. Contrato: `spec.md`, `design.md`, `tasks.md`, AGENTS.md, CLAUDE.md e `.specs/codebase/TESTING.md`. A preferência final do usuário por legendas públicas neutras prevalece sobre a orientação anterior de mencionar IA nelas.

**Veredito técnico: PASS.** Nenhuma regressão ou lacuna técnica encontrada no escopo. A entrega da mensagem ao usuário é ação final do orquestrador; aprovação médica/editorial e publicação não foram realizadas nem presumidas.

## Tarefas e critérios ancorados na especificação

R1–R4 estão marcadas concluídas; commits correspondentes: `932dcad`, `d1a372c`, `f0b890d`, `c981623`.

| Critério | Resultado esperado e evidência de valor | Resultado |
| --- | --- | --- |
| F1 — assets e procedência | `tests/unit/generated-blog-assets.test.ts:13` `assert.equal(manifest.length, 23)`; :14/15 contagens exatas 16 imagens e sete capas; :16/17 src e hashes únicos23. :24–33 afirma WebP, largura/altura reais, largura≥1200, razão próxima16:9, peso<400KB, bytes/hash exatos, `generationTool === 'OpenAI image_gen (built-in)'` e prompt>100 caracteres. Manifest registra fonte, prompt e revisão pendente; `docs/blog-generated-images-review.md:5` distingue cenas conceituais de pacientes/procedimentos reais. | PASS |
| F2 —40 cards, precedência e preservação | `tests/unit/blog-covers.test.ts:18–20` afirma40 posts,40 imagens resolvidas e40src distintos; :31/32 compara imagem/capa e card ao manifest completo. :68 rejeita cover inválida com mensagem exata. `tests/unit/blog-image-placement.test.ts:68` `assert.deepEqual(placementErrors(...), [])`; :108 compara cada src/seção ao mapa editorial; :118 preserva a imagem original contra baseline. Comparação independente dos40 arquivos com `9d9e7ac` confirmou prosa, figuras/alt/legendas Markdown e cada campo preexistente, exceto a data autorizada de atualização; ver evidência abaixo. | PASS |
| F3 — card, OG/Twitter, schema e sitemap | `tests/unit/blog-covers.test.ts:35/36` compara OG completo e Twitter ao src/dimensões/alt declarados; :40–43 afirma contentUrl, width, height e caption exatos; :44/45 creator/copyrightHolder ausentes; :47 afirma ligação primaryImageOfPage ao ID da imagem. `tests/unit/blog-image-placement.test.ts:123/126` cobre os40 selecionados, inclusive fallback Markdown. `tests/e2e/release-qa.spec.ts:53` compara lista por artigo a `[card, ...imagens AST]` deduplicada. :83/84/88 compara OG, Twitter e Article reais ao card. | PASS |
| F4 — crawlers e60 rotas/43 imagens | `tests/e2e/release-qa.spec.ts:39/40` compara catálogo exato e unicidade; :41–43 exclui privacidade, design-system e Curitiba; :46–48 compara conjunto de imagens ao registro; :55/56 afirma200/WebP; :63–68 afirma200 de llms/robots, catálogo completo e sitemap canônico; :76/79/80 afirma200, canonical exato e ausência de noindex nas60 páginas. Quantidades60 e43 também afirmadas independentemente. `tests/unit/lib.test.ts:283/284/301/302` mantém sameAs distintos para médica e clínica. Auditoria editorial:0 erros/0 alertas. | PASS |
| F5 — gates e smoke visual | Lint0, build0 com69 páginas, unit131/131, audit0/0, seis e2e escopados6/6 neste Verifier; suite e2e final completa65/65 registrada pelo autor em `execution.md`. Smoke independente executado contra build de produção existente em3015, incluindo todas as60 rotas e imagens selecionadas. `tests/e2e/blog-covers.spec.ts:6/12–14/30/31` afirma carregamento/legenda e overflow0 em desktop1280px e mobile375px. Capturas14/checks12 com overflow0 verificadas; overviews desktop/mobile inspecionados. | PASS |
| F6 — mensagem à cliente preparada | `docs/client-updates/revisao-final-site-blog-2026-10-13.md:5/7` explica23 ilustrações,16+7,40 cards e QA; :9 solicita revisão dos textos, fontes, perguntas, imagens/legendas, anatomia e procedência, incluindo origem IA; :11 condiciona publicação à aprovação. Inspeção confirma pt-BR e conteúdo fiel ao trabalho. Mensagem salva; sua entrega ao usuário cabe ao fechamento do orquestrador. Não há evidência de envio à cliente, nem era autorizado fazê-lo. | PASS do artefato; entrega no fechamento |
| F7 — telefonev2 e legenda neutra | `tests/unit/blog-covers.test.ts:25` afirma exatamente nas23 entradas: `Ilustração editorial; não representa paciente, consultório real ou procedimento médico.`; :27 afirma URLv2. `tests/e2e/blog-covers.spec.ts:5/11–14` afirma src novo, imagem carregada, caption exata e overflow0 nos dois viewports; :29 proíbe `inteligência artificial` na legenda. `generated-blog-assets.test.ts:25/26/30/31` confirma1671×941,76074bytes e hash do v2. Inspeção direta por view_image: duas mãos conectadas aos braços, uma no telefone e outra no colo, pose coerente e nenhum membro extra aparente. Manifest :458–469 registra regeneração, IA e revisão médica pendente. | PASS |

Evidência independente adicional: script de leitura `/tmp/dayara-final-verifier-two96pg8/verifier-evidence.mjs:14` executou `assert.equal(tidy(cur.content), tidy(old.content))` para todos os40 posts, removendo apenas as16 linhas de imagem adicionadas e normalizando whitespace. :15 executou `assert.deepEqual(cur.data[key], old.data[key])` para cada campo original, exceto lastModified; :16 permitiu somente campos novos image/coverImage. :19 afirmou60 entradas sitemap, :21 afirmou43 imagens de blog distintas, :23/24/25 afirmou12checks, todos overflow0, e14JPEGs. Saída: PASS. O script e logs estão no scratch; estas expressões e resultados ficam persistidos aqui.

## Gate independente

Comandos do projeto: `npm run lint`, `npm run build`, `npm run test:unit`, `npm run audit:seo`; e2e proporcional ao diff: `PLAYWRIGHT_BASE_URL=http://127.0.0.1:3015 npx playwright test tests/e2e/blog-covers.spec.ts tests/e2e/release-qa.spec.ts --workers=2`.

- Lint: exit0; unit:131 pass,0 fail,0 skip,0 cancelled; audit:0 erros/0 alertas.
- Build na cópia temporária da fonte final: exit0, TypeScript aprovado,69/69 páginas geradas. Node24.21.0 igual ao runtime utilizado pelo autor. Unit pós-build no scratch:131/131,0 skip.
- E2e independente:6/6,0 falhas/ignorados, Chromium contra produção local existente. Não se iniciou nem interrompeu servidor na árvore real.
- Primeiro build scratch com symlink externo de node_modules foi rejeitado pelo Turbopack; dependências foram copiadas fisicamente e repetiu-se. Rede do sandbox impediu Google Fonts e acesso local do e2e; execução autorizada com acesso elevado resolveu ambos. Essas tentativas são limitações do ambiente de scratch, não falhas do código final.
- Integridade de testes: baseline registrado126 unit/59e2e; final131/65 (+5/+6). Diff não remove testes nem introduz skip. Mudanças nos asserts existentes refletem a autorização explícita para capas/datas novas; preservação das imagens originais continua afirmada. Nenhuma assertion foi enfraquecida para ocultar falha.

Logs: `/tmp/dayara-final-verifier-unit.log`, `/tmp/dayara-final-verifier-build.log`, `/tmp/dayara-final-verifier-scratch-unit.log`, `/tmp/dayara-final-verifier-e2e.log`.

## Sensor de discriminação

Executado somente depois do gate aprovado, em `/tmp/dayara-final-verifier-two96pg8`; implementação e testes reais permaneceram intactos. Cada mutação foi revertida em finally e a seguinte começou na fonte restaurada. Testes foram executados com Node24, sem alterar assertions.

| Mutação de comportamento | Assertion que detectou | Resultado |
| --- | --- | --- |
| `src/lib/blog.ts:183`: inverter precedência para `image ?? coverImage ?? extractFirstImage(content)` | `tests/unit/blog-covers.test.ts:20/32` detectou perda de unicidade/card divergente do manifest | Killed, exit1 / AssertionError |
| Acrescentar `Gerada com inteligência artificial.` à caption do telefone no manifest e no frontmatter, simulando regressão pública coerente entre ambos | `tests/unit/blog-covers.test.ts:25` exigiu a caption neutra exata | Killed, exit1 / AssertionError |
| Acrescentar figura ao final do artigo de telefone, após o últimoH2 e com prosa posterior | `tests/unit/blog-image-placement.test.ts:68` detectou `image-after-last-h2`; :108 também detectou figura fora do mapa | Killed, exit1 / AssertionError |

**Sensor:3/3 mortos,0 sobreviventes.** Logs e resultados no scratch: `sensor-cover-precedence.log`, `sensor-public-ai-caption.log`, `sensor-figure-after-final-h2.log`, `sensor-results.json`. Nenhuma tarefa corretiva técnica ou lição por falha foi gerada.

## Qualidade, limites e conclusão

Mudanças seguem os padrões existentes de validação/modelo, imagens locais e sitemap; sem abstrações desnecessárias ou mudanças de layout fora do escopo. Os testes novos mapeiam F1–F5/F7; F6 é artefato editorial inspecionado. Casos sem cover, fallback Markdown, cover inválida, figuras secundárias e deduplicação continuam cobertos. Guardrails de últimaH2/áreas terminais/figuras adjacentes têm assertions negativas próprias. Captions públicas novas não mencionam IA; manifest, review e mensagem conservam procedência.

Não há gaps técnicos classificados. Aprovação da Dra. Dayara quanto a conteúdo médico, adequação das imagens geradas e anatomia/procedência/licença dos diagramas anteriores permanece pendente, como explicitamente requerido. QA técnico e inspeção visual do Verifier não constituem aprovação clínica. Não ocorreu merge/publicação nem envio da mensagem à cliente. O orquestrador deve entregar a mensagem ao usuário ao concluir esta rodada.
