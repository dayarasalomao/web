# Execução e cobertura — 2026-10-12

## Commits por entrega

| Entrega | Commit | Verificação antes do commit |
| --- | --- | --- |
| T1 — títulos e seoTitle | 24b63c7 | 45 unitários; 8 testes de títulos renderizados; lint |
| T2 — ilustrações existentes | fc62343 | cruzamento original/destino; unitários de imagens e dimensões; testes mobile de 7 imagens; auditoria 0/0 |
| T3 — cinco artigos e pauta consolidada | 05bf2cd | 61 unitários, 44 e2e, lint, build com 69 páginas e auditoria 0/0 |
| F1 — schema factual e H1 mobile | 736dae6 | testes novos reproduziram os dois problemas antes da correção; 62 unitários, 46 e2e, lint, build com 69 páginas e auditoria 0/0 |
| T4 — documentação e encerramento | Commit final de documentação | relatório independente, revisão visual, estado e PR sincronizados |

Os gates de integração acima cobrem a árvore final. T1/T2 foram staged seletivamente para separar títulos, imagens e novos textos sem misturar as entregas.

## Adequação dos testes (mapeamento direto e reverso)

| Critério | Evidência / asserção | Resultado esperado / motivo para manter |
| --- | --- | --- |
| SEO-01 | `tests/unit/editorial-update.test.ts:11` — `assert.equal(SEO_TITLE, 'Dra. Dayara Salomão \u007c Coloproctologista em Campo Grande (MS)')`; `:17` compara os 14 tratamentos; `tests/e2e/editorial-update.spec.ts:17` — `toHaveTitle(title)` | Grafia pedida e assunto/local distintos, inclusive metadata renderizada |
| SEO-02 | `tests/unit/editorial-update.test.ts:29` — `post.seoTitle.length <= 65`; `:31–37` — title/OG/Twitter e unicidade; `:43–45` — fallback | Títulos concisos, únicos e fallback exato; nenhum H1 existente alterado |
| IMG-01/02 | `tests/unit/editorial-images-update.test.ts:23–31` — destino, dimensões, presença e WebP; `:36` — retalho 1024 × 558; `:50–51` — dimensões reais em OG | Detectar imagem errada, asset ausente, proporção falsa e metadata social falsa |
| IMG-01 / F1 | `tests/unit/editorial-images-update.test.ts:62–63` — `image.creator === undefined`, `image.copyrightHolder === undefined` | Evitar inferir propriedade/autoria sem origem confirmada |
| BLOG-01 | `tests/unit/editorial-new-posts.test.ts:19–30` — slugs, datas, fontes, FAQs, backlinks, citações e ausência de revisão inventada; `:50–55` — roteiro e alertas; `:60–61` — consolidação sem URL duplicada | Garantir preparação completa dos artigos e limites definidos |
| LOCAL-01 | `tests/unit/editorial-new-posts.test.ts:36–43` — propriedade comercial/informacional e informações confirmadas; `tests/e2e/editorial-update.spec.ts:111` — backlink visível | Complementar a página local sem canibalizar intenção de agendamento |
| GRAPH-01 | `tests/e2e/editorial-update.spec.ts:59–79` — fontes/FAQ espelham schema; imagens e URLs no sitemap | Verificar resultados visíveis e machine-readable, não apenas execução de helpers |
| QA-01 / F1 | `tests/e2e/editorial-update.spec.ts:128` — `textRight <= columnRight + 1` após fonts.ready em 320/390 px | Detectar clipping de texto que overflow do documento não revela |

Todos os testes novos se ligam a estes critérios; não há testes especulativos, skips ou exclusão de asserções para obter sucesso. Diretrizes: `.specs/codebase/TESTING.md`. A expectativa do canonical da homepage foi corrigida com confirmação explícita do usuário; o canonical de produção não mudou.

## Revisão visual

- Browser local em 390 px: diagramas de diodo, ligadura, fissura, retalho, pomadas e trombose sem distorção; legendas legíveis.
- Guia local e cronograma do CO2: hierarquia, autoria, datas, corpo e links verificados.
- A revisão após carregar fontes encontrou um título longo cortado. F1 ajustou fonte fluida e quebra de palavras; medição final: texto direito 348,98 px, limite da coluna 368 px em viewport 390 px.
- Todas as 10 imagens preservam dimensões do Word; 8.013.422 bytes em PNG se tornam 559.386 bytes em WebP. Não há originais PNG publicados.

## Limites de entrega

Preparação de PR, sem merge/produção. Revisão clínica das adaptações e cronograma, origem/licença e fidelidade anatômica continuam no checklist anterior ao merge. AGA é citada pelo resumo institucional acessado, sem alegar leitura da revisão original bloqueada. Não há garantia de ranking ou posição inferida da captura.
