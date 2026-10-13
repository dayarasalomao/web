# Validação das correções da PR #21

**Data:** 2026-10-13 (verificação iniciada em 2026-10-12). **Verificador:** subagente independente, autor ≠ verificador.
**Spec:** `.specs/features/pr21-review-fixes/spec.md`.
**Escopo:** `a068ecd..1e3343a`: `26bd238`, `e4b5d37`, `8b632d9`, `1e3343a`.
**Veredito técnico:** **PASS** — 4/4 critérios verificados no escopo técnico, sem lacunas de implementação ou de precisão; 3/3 mutações detectadas.
O envio dos commits e a sincronização da descrição da PR, parte administrativa de QA-01/R4, ficam com o orquestrador. Este relatório não afirma que esse envio já ocorreu.

## Tarefas e isolamento

R1, R2, R3 e F2 concluídos e verificados. R4: verificação concluída por este relatório; publicação/documentação final sob responsabilidade do orquestrador.
O código foi lido na árvore real e executado em `/private/tmp/dayara-pr21-verifier.kr50Io`, criado por `git archive 1e3343a`. A base para integridade dos testes foi outro archive de `a068ecd`, em `/private/tmp/dayara-pr21-baseline`.
Nenhum código ou teste real foi alterado, nenhum stash foi usado e o servidor compartilhado na porta 3003 permaneceu intacto. Nenhum `.env.local` foi copiado. A alteração concorrente de WhatsApp em `a068ecd` permaneceu preservada e fora do diff auditado.

## Critérios ancorados na spec

| Critério / resultado esperado | Evidência `file:line` e asserção exata | Resultado |
| --- | --- | --- |
| SCHEMA-01: médica com os tipos exatos e o mesmo ID nos dois grafos | `tests/unit/pr-review-schema.test.ts:9` percorre os dois grafos; `:12` busca `https://www.dayarasalomao.com.br/#physician`; `:14` — `assert.deepEqual(physician['@type'], ['Person', 'Physician'])` | PASS |
| SCHEMA-01: worksFor e workLocation referem o MedicalClinic da localização | `tests/unit/pr-review-schema.test.ts:15` e `:16` — `assert.deepEqual(..., { '@id': buildPracticeLocationId('campo-grande') })`; `tests/unit/lib.test.ts:300` verifica o ID da clínica. `tests/e2e/pr-review-fixes.spec.ts:13` exige o ID literal `https://www.dayarasalomao.com.br/locais-de-atendimento/campo-grande#medical-clinic` no schema renderizado | PASS |
| SCHEMA-01: perfis pessoais e da clínica continuam separados | `tests/unit/lib.test.ts:283` inclui o perfil pessoal; `:284` exclui o perfil da clínica; `:301` e `:302` fazem o inverso para MedicalClinic | PASS |
| SCHEMA-01: author, publisher e ProfilePage preservam seus IDs | `tests/unit/lib.test.ts:291` — `assert.deepEqual(website.publisher, { '@id': ...#physician })`; `tests/e2e/blog.spec.ts:362` exige o ID pessoal. Verificação independente adicional descrita abaixo exige os valores exatos de ProfilePage.mainEntity e Article.author/publisher | PASS |
| AUDIT-01: somente as quatro sugestões efetivamente renderizadas contam | `tests/unit/pr-review-audit.test.ts:19` — `assert.deepEqual(warnings([...earlier, target.slug]), [{severity: 'warning', code: 'weak-editorial-inbound', message: ...}])`; `:27` — sugestões visíveis geram `[]`; `:31` — filtra própria página e inexistentes antes do limite e exige `[]` | PASS |
| AUDIT-01: links Markdown no corpo contam após remover fragmento, query e barra final | `tests/unit/pr-review-audit.test.ts:35` percorre os três formatos; `:36` — `assert.deepEqual(warnings([], '[Leia o guia](...)'), [])` | PASS |
| AUDIT-01: links da própria página não contam | `tests/unit/pr-review-audit.test.ts:41` fornece auto-referência em relatedPosts e no corpo; `:42` — `assert.equal(issues.length, 1)`; `:43` — `assert.equal(issues[0].code, 'weak-editorial-inbound')` | PASS |
| AUDIT-01: tratamento usa artigos existentes efetivamente retornados pelo renderer | `tests/unit/pr-review-audit.test.ts:49` fornece `['missing-post', target.slug]`; `:51` — `assert.deepEqual(issues, [])`. `src/lib/seo-audit.ts:69` chama `getRelatedPostsForTreatment`, o mesmo helper usado em `src/app/tratamentos/[slug]/page.tsx:51`; ele filtra artigos inexistentes em `src/lib/treatments.ts:841` | PASS |
| AUDIT-01: conteúdo atual sem erros e alertas | `tests/unit/pr-review-audit.test.ts:55` — `assert.deepEqual(runSeoContentAudit(), [])`; execução independente da auditoria retorna `Erros: 0 · Alertas: 0` | PASS |
| SOURCE-01: três bibliografias com URL literal oficial, acesso e atualização em 2026-10-12 | `tests/unit/pr-review-sources.test.ts:9` percorre os três artigos; `:14` — `assert.equal(source.url, GUIDELINE_URL)`; `:15` e `:16` exigem `'2026-10-12'`. URL literal em `:6`. O artigo de doença hemorroidária já tinha lastModified correto na base e o preservou | PASS |
| SOURCE-01: fonte visível igual à Article.citation e URL antiga ausente | `tests/unit/pr-review-sources.test.ts:20` exige a URL exata da citação da mesma fonte; `:21` exclui a URL antiga. `tests/e2e/pr-review-fixes.spec.ts:23` — `toHaveCount(1)` no link da seção de fontes; `:26` — `toContain(GUIDELINE_URL)` nas citações; `:27` — ausência da URL antiga | PASS |
| SOURCE-01: identidade do PDF e texto clínico preservado | PDF oficial aberto independentemente em 2026-10-12: primeira página identifica Hawkins et al., Dis Colon Rectum 2024;67:614–623 e DOI 10.1097/DCR.0000000000003276. Comparação independente dos três corpos Markdown com `a068ecd` usa `assert.equal(currentBody, baselineBody)` e passou | PASS |
| QA-01: gates e sensores passam; commits limitados ao escopo | Gates abaixo; as três mutações abaixo falham por asserções pertinentes e a restauração passa 71/71. `git diff a068ecd..1e3343a` contém somente schema, auditoria, fontes, testes pertinentes e documentação. F2 adiciona `assert.ok(post)` em `tests/unit/editorial-images-update.test.ts:38`, preservando as asserções existentes e permitindo o narrowing do TypeScript | PASS técnico; envio da PR reservado ao orquestrador |

### Asserções independentes complementares

Executadas com sucesso em `/private/tmp/dayara-pr21-verifier-preservation.mjs`:

- `:8` — `assert.deepEqual(globalNodes.find(n => n['@type'] === 'WebSite').publisher, {'@id': physicianId})`.
- `:10` — `assert.equal(profile['@id'], 'https://www.dayarasalomao.com.br/sobre#webpage')`.
- `:11` — `assert.deepEqual(profile.mainEntity, {'@id': physicianId})`.
- `:14` e `:15` — `assert.deepEqual(article.author, {'@id': physicianId})` e `assert.deepEqual(article.publisher, {'@id': physicianId})`, para cada um dos três artigos.
- `:18` — `assert.equal(current.split(/^---\s*$/m).slice(2).join('---'), baseline.split(/^---\s*$/m).slice(2).join('---'))`, comparando o corpo integral depois do frontmatter.

`physicianId` é literalmente `https://www.dayarasalomao.com.br/#physician`. Os construtores preservados estão em `src/lib/structured-data.ts:246`, `:256`, `:313` e `:316`.

### Fontes externas e limitações de rede

O [PDF oficial ASCRS U](https://www.ascrsu.com/ascrs/repview?name=3_2851101_PDF&type=784-156) foi lido pelo navegador de pesquisa do verificador como `application/pdf`, com 10 páginas; a identificação bibliográfica está na primeira página. HTTP 200 e assinatura `%PDF-` são evidência fornecida pelo autor. O `curl` do verificador não conseguiu resolver o host no shell restrito; portanto, o verificador não atribui a si a conferência independente do status HTTP.
O [W3C JSON-LD 1.1, §3.5 / Example 15](https://www.w3.org/TR/json-ld11/#specifying-the-type) foi lido independentemente e permite array de tipos em um mesmo nó. Isso sustenta a representação, sem alegar validação em uma ferramenta externa de rich results.

## Gates e integridade

Runtime usado: `/Users/diegovfeder/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node`, explicitamente; o Node padrão do shell não foi usado para os gates.
Diretrizes aplicadas: `.specs/codebase/TESTING.md`, `AGENTS.md` e `references/coding-principles.md` do skill tlc-spec-driven. O gate de build do projeto equivale a lint + build + unitários; o gate completo adiciona e2e. Auditoria e TypeScript também foram conferidos.

| Gate | Origem da evidência | Resultado |
| --- | --- | --- |
| Unitários — `node --test --experimental-transform-types --no-warnings tests/unit/*.test.ts` | Execução independente no archive; `/private/tmp/dayara-pr21-verifier-unit.log` | 71 passaram, 0 falharam, 0 ignorados |
| Auditoria — `node --experimental-transform-types --no-warnings scripts/audit-seo-content.ts` | Execução independente no archive | 0 erros / 0 alertas, exit 0 |
| Lint — `node node_modules/eslint/bin/eslint.js src tests playwright.config.ts next.config.ts eslint.config.mjs` | Execução independente no archive | exit 0 |
| TypeScript — `node node_modules/typescript/bin/tsc --noEmit` | Execução independente no archive | exit 0 |
| Build padrão — `npm run build` | Log fornecido pelo autor, `/private/tmp/dayara-review-fixes-build.log:9`, `:11`, `:17` | Compilação e TypeScript concluídos, 69/69 páginas geradas |
| E2E completo | Log fornecido pelo autor, `/private/tmp/dayara-review-fixes-e2e.log:72`, `:75`–`:78`, `:80` | 51 passaram, incluindo os 5 novos casos SCHEMA-01/SOURCE-01 |
| Unitários após restaurar os sensores | Execução independente; `/private/tmp/dayara-pr21-verifier-restored.log` | 71 passaram, 0 falharam, 0 ignorados |

**Contagem anterior:** execução independente de `a068ecd` passou 62/62 (`/private/tmp/dayara-pr21-verifier-baseline.log`); **contagem final:** 71/71; **delta:** +9. Nenhum teste foi removido, ignorado ou enfraquecido. O seletor antigo de schema foi adaptado para o ID estável, preservando as asserções; F2 fortalece a precondição de existência.

O build independente em scratch inicialmente encontrou a fronteira de symlink externo do Turbopack. Após copiar dependências fisicamente, ficou impedido pelo acesso às fontes Cinzel/Montserrat do Google; o log local não representa um build aprovado. Usa-se o build concluído no projeto como evidência do autor. A primeira tentativa de e2e do autor teve um ECONNRESET; o rerun completo passou 51/51 sem alteração de testes. Não há skips a justificar.

## Sensores de discriminação

Mutações proporcionais, uma por área alterada; todas executadas somente no archive. Script: `/private/tmp/dayara-pr21-verifier-sensors.py`. Cada arquivo foi restaurado em `finally` antes da mutação seguinte.

| Mutação | Local original / falha injetada | Asserção que detectou | Resultado |
| --- | --- | --- | --- |
| Tipagem pessoal removida | `src/lib/structured-data.ts:135` e `:461`: `['Person', 'Physician']` → `'Physician'` | `tests/unit/pr-review-schema.test.ts:14`: actual `'Physician'`, expected `['Person', 'Physician']` | Detectada, exit 1, 1/1 teste falhou |
| Referências ocultas passam a contar | `src/lib/seo-audit.ts:60`: substitui o helper renderizado por `post.relatedPosts ?? []` sem filtro/limite | `tests/unit/pr-review-audit.test.ts:19`: faltou o alerta exato; `:42`: auto-referência produziu 0 em vez de 1 | Detectada, exit 1, 2/7 testes falharam |
| URL antiga reintroduzida | `content/posts/doenca-hemorroidaria-sintomas-graus.md:31`: troca URL ASCRS U pela URL antiga | `tests/unit/pr-review-sources.test.ts:14`: actual URL antiga, expected URL oficial literal | Detectada, exit 1, 1/1 teste falhou |

Logs: `/private/tmp/dayara-pr21-verifier-mutant-schema.log`, `/private/tmp/dayara-pr21-verifier-mutant-hidden-inbound.log`, `/private/tmp/dayara-pr21-verifier-mutant-ascrs-url.log`.
**Resultado:** 3 injetadas, 3 detectadas, 0 sobreviventes. Suite restaurada: 71/71.

## Qualidade, casos de borda e rastreabilidade

- Mudanças cirúrgicas, sem abstrações adicionais ou flexibilidade não solicitada; o helper exportado permite testar a contagem editorial isoladamente e reaproveita a lógica de renderização.
- As sete unidades novas de auditoria mapeiam limite, visibilidade, filtragem, normalização de URL, auto-referência, tratamento e estado atual a AUDIT-01; os outros dois unitários e cinco e2e mapeiam SCHEMA-01/SOURCE-01. O ajuste F2 mapeia o gate TypeScript de QA-01.
- Domínio tem asserções dos valores definidos na spec. As rotas existentes foram verificadas quanto ao schema e às fontes renderizadas; estes ajustes não introduzem novas rotas, fluxos interativos ou estados de erro. UAT visual não se aplica a este escopo.
- Casos de borda cobertos: referência depois da quarta posição; inexistente e auto-referência antes do limite; query, fragmento e barra final; auto-link como única entrada; artigo relacionado por tratamento; fonte e citação consistentes nos três artigos.
- SCHEMA-01, AUDIT-01 e SOURCE-01: **Verified**. QA-01: validação técnica **Verified**, finalização de PR/R4 delegada ao orquestrador.

**Lacunas ranqueadas:** nenhuma no código ou nos testes. **Lições:** nenhuma adicionada; PASS limpo sem mutação sobrevivente, critério descoberto sem evidência ou desvio da spec. As limitações do scratch são restrições de ambiente registradas, não falhas da implementação.
