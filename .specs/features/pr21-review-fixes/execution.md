# Evidências de execução

| Entrega | Commit | Gate |
| --- | --- | --- |
| R1 — tipos pessoais e IDs | 26bd238 | 63 unitários, lint |
| R2 — entradas editoriais reais | e4b5d37 | 70 unitários, lint, auditoria 0/0 |
| F2 — estreitamento de artigo no teste | 8b632d9 | unitários e TypeScript |
| R3 — ASCRS, referências e renderização | 1e3343a | 71 unitários, lint, TypeScript, build com 69 páginas, auditoria 0/0, 51 e2e |

## Adequação e rastreabilidade

| Critério | Asserção concreta | Resultado esperado / motivo para manter |
| --- | --- | --- |
| SCHEMA-01 | `tests/unit/pr-review-schema.test.ts:14` — `assert.deepEqual(physician['@type'], ['Person', 'Physician'])`; `:15–16` — IDs de worksFor/workLocation | Tipagem compatível e entidade estável nos dois grafos |
| SCHEMA-01 renderizado | `tests/e2e/pr-review-fixes.spec.ts:12` — `expect(physician['@type']).toEqual(['Person', 'Physician'])`; `:13–14` — relações | Conferir payload HTML, não somente chamada do builder |
| AUDIT-01 limite | `tests/unit/pr-review-audit.test.ts:19` — warning exato quando a entrada fica além da quarta; `:27` — visível sem warning; `:31` — filtro antes do limite | Reproduzir o P2 e preservar semântica real do renderer |
| AUDIT-01 corpo/self/tratamento | `:36` — corpo com fragmento/query/barra sem warning; `:42–43` — self gera alerta; `:51` — tratamento visível sem alerta | Evitar falsos positivos e falsos negativos na entrada editorial |
| AUDIT-01 conteúdo atual | `tests/unit/pr-review-audit.test.ts:55` — `assert.deepEqual(runSeoContentAudit(), [])` | Auditoria completa termina sem erros ou alertas |
| SOURCE-01 | `tests/unit/pr-review-sources.test.ts:14–16` — URL e datas exatas; `:20–21` — citation e ausência do PDF antigo | Mesma diretriz acessível, sem alteração clínica |
| SOURCE-01 renderizado | `tests/e2e/pr-review-fixes.spec.ts:23` — link único; `:26–27` — citation igual e URL antiga ausente | Bibliografia e dados estruturados concordam nos três artigos |

Os testes se ligam apenas ao escopo acima. Asserções antigas foram preservadas; o seletor da entidade usa o ID estável para suportar a tipagem múltipla. A asserção adicional de existência do artigo resolve um erro de TypeScript sem reduzir cobertura.

## Observações operacionais

- A mensagem de WhatsApp de outro trabalho foi preservada e publicada por seu autor no commit a068ecd; este conjunto de correções começa depois dele.
- A tentativa de iniciar um segundo servidor de desenvolvimento foi bloqueada pelo lock existente. O servidor já ativo em 3003 foi reutilizado e preservado.
- A primeira execução no servidor reutilizado teve uma única falha de conexão ECONNRESET ao pedir sitemap; 50 testes passaram. Uma execução completa posterior, sem editar ou desativar testes, passou os 51. Não há erro de aplicação correspondente no log.
- URL ASCRS verificada por HTTP 200, Content-Type application/pdf e assinatura %PDF-. O PDF identifica Hawkins et al., 2024, DOI 10.1097/DCR.0000000000003276.
- Logs locais: `/private/tmp/dayara-r3-unit.log`, `/private/tmp/dayara-review-fixes-build.log`, `/private/tmp/dayara-review-fixes-e2e.log`. Relatório independente em `validation.md`.
