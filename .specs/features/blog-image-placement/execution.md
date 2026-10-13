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
