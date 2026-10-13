# Tarefas e verificação

1. [x] T1 — Mídia nos cards (`LinkCard`, `BlogCard`, listagem, `LatestArticles`, e2e de cards). Gate: lint + unitários + e2e de cards. AC5/6.
2. [x] T2 — Colocação e legendas (`content/posts`, `MdxImage`, unitário de guardrails, e2e de figuras; documentação README/CLAUDE/AGENTS/llms). Gate: lint + unitários + e2e de figuras. AC1–4/7.
3. [x] T3 — Verificação integrada e capturas nesta pasta. Gate: lint, build, unitários, `audit:seo`, e2e completos. AC7/8. Em seguida Verifier independente.

Cada tarefa gera um commit atômico após seu gate. Não alterar textos clínicos, frontmatter, alt, seleção de cardImage ou ativos.

## Matriz de testes

| Critério | Evidência planejada |
| --- | --- |
| AC1/2/3 | unitário: árvore Markdown GFM, todos os posts + negativos de imagens consecutivas, lead inválido, listas/tabelas/áreas finais |
| AC4 | e2e: legenda principal/secundária, ausência de group sem legenda |
| AC5/6 | e2e: cada card com imagem correta/marca, alt vazio, link, aspect ratio, carregamento, desktop/375px/homepage |
| AC7 | unitário baseline das imagens escolhidas e OG/schema; e2e sitemap e metadados existentes |
| AC8 | comandos completos + capturas + relatório independente |
