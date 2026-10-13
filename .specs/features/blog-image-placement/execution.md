# Execução

## T1 — cards

Suposições: cardImage já é validado; homepage compartilha a mídia; leituras relacionadas mantêm seu componente próprio. Arquivos: LinkCard, BlogCard, blog/page, LatestArticles, blog.spec e esta spec.

Gate aprovado: lint exit 0, 71/71 unitários, 3/3 e2e Chromium. Servidor existente da mesma pasta: http://localhost:3003.

| Critério | Evidência/assertion | Resultado definido | Coberto |
| --- | --- | --- | --- |
| AC5 — todos os cards | blog.spec.ts:13 `toHaveCount(posts.length)`; :17 `toHaveCount(1)`; :19 `toHaveAttribute('src', …)` | 40 cards, mídia correta ou marca | Sim |
| AC5 — acessibilidade | blog.spec.ts:18 `toHaveAttribute('alt', '')`; :23 `getByRole('link', { name: post.title, exact: true })` | imagem decorativa, nome exato | Sim |
| AC5 — figura inteira | blog.spec.ts:20 `toHaveCSS('object-fit', 'contain')`; :28 razão 16/9 | sem cortes, painel estável | Sim |
| AC6 — prioridade | blog.spec.ts:21/22 loading eager/high somente índices <2 | lazy/auto demais | Sim |
| AC6 — responsividade | blog.spec.ts:31 `expect(overflow).toBe(0)`; :33 sizes exato | 1280/375px sem overflow | Sim |
| AC5/6 — homepage | blog.spec.ts:46/49–52 count/src/alt/loading/sizes; :56 overflow | 3 cards, lazy, sizes de 3 colunas | Sim |

Mapeamento reverso: todas as assertions acima cobrem AC5/6; clique/navegação (:36–37) cobre preservação do link. Nenhum teste sem critério, removido ou ignorado. Adequação: resultados públicos e casos de imagem/marca, conforme .specs/codebase/TESTING.md.

## T2 — colocação e legendas

Gate aprovado: lint exit 0, 126/126 unitários, 6/6 e2e (cinco artigos de duas imagens + tabela mobile). Frontmatters, prose clínica e alts dos 40 posts comparados à base e preservados; os dois disclaimers deslocados continuam literais. Corrigida a normalização da URL na nova assertion OG: Next aceita URL relativa e resolve por metadataBase; nenhuma alteração na resolução de imagem.

Decisão do usuário: aplicar literalmente nenhuma imagem após o último H2. Atualizadas expectativas da nova guardrail e colocação de retalho/quadro conforme essa instrução; sem reduzir cobertura. A figura do retalho fica imediatamente antes de sua seção, única solução que preserva a regra literal sem editar a redação clínica.

| Critério | Evidência/assertion | Resultado definido | Coberto |
| --- | --- | --- | --- |
| AC1 — seção por significado | blog-image-placement.test.ts:105 `assert.deepEqual(sort(actual), sort(placements…))` | 29 imagens nas seções documentadas | Sim |
| AC1/2/3 — todos os posts | blog-image-placement.test.ts:68 `assert.deepEqual(placementErrors(content, data.image?.src), [])` | zero violações em 40 posts | Sim |
| AC2/3 — rejeitar posições proibidas | blog-image-placement.test.ts:89 `assert.ok(placementErrors(…).includes(error))` com casos :75–86 | adjacência, lead, listas, tabelas, FAQ/fontes/CTA, fim, mesmo H2 e último H2 rejeitados | Sim |
| AC4 — legenda principal | blog.spec.ts:84/85/86 `toHaveText`, `role=group`, `aria-label` exatos | legendas originais do frontmatter | Sim |
| AC4 — legenda secundária | blog.spec.ts:90/91 `toHaveText(caption)`, aria-label exato | disclaimer existente, palavra por palavra | Sim |
| AC4 — sem legenda | blog.spec.ts:94/95 `not.toHaveAttribute('role'/'aria-label')`; :96 ressalva visível | sem agrupamento vazio | Sim |
| AC7 — imagens escolhidas/OG/schema | blog-image-placement.test.ts:111 deepEqual baseline; :115/:118 equal URL | mesmas imagens de antes | Sim |

Mapeamento reverso: asserts da matriz pertencem somente aos ACs indicados; :92 cobre a lead válida, blog.spec.ts:74/:81 cobre duas figuras separadas por H2. Nenhum teste antigo alterado, removido ou ignorado. Adequação conforme TESTING.md. Alterações editoriais de imagem e a sintaxe de legendas documentadas em README, CLAUDE, AGENTS e llms.
