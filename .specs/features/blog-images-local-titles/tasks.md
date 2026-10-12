# Execução

- [x] T1 — Títulos: constantes, hubs/perfil/local, seoTitle do parser e 35 artigos; testes unitários e e2e da metadata. Gate: unitários + e2e relevante + lint. Commit `feat(seo): refine page titles for Campo Grande (MS)`.
- [x] T2 — Imagens existentes: 7 assets WebP, cadastro de dimensões, 7 artigos e relatório de cruzamento; teste dos arquivos/dimensões/destinos. Gate: unitários + audit:seo. Commit `feat(blog): integrate supplied illustrations into existing articles`.
- [x] T3 — Conteúdo: 5 artigos novos, 3 assets, atualização da pauta sem corte, fontes/notas de pesquisa, links e mapa SEO; testes de conteúdo e e2e dos novos artigos. Gate: lint + build + unitários + audit:seo + e2e completos. Commit `feat(blog): add patient guides and local specialist search article`.
- [ ] T4 — Verificação independente, revisão visual, relatório, STATE e documentação final; atualizar PR. Gate: evidências T1–T3 + sensor independente. Commit `docs(seo): record editorial integration and verification`.

## Cobertura

| Critério | Evidência planejada |
| --- | --- |
| SEO-01/02 | tests/unit/editorial-update.test.ts + tests/e2e/editorial-update.spec.ts |
| IMG-01/02 | relatório de cruzamento + arquivo/dimensões WebP + e2e de imagens |
| BLOG-01/LOCAL-01 | testes do conteúdo/frontmatter/FAQs e renderização de 5 URLs |
| GRAPH-01 | audit:seo, Article.citation/ImageObject, sitemap e links em e2e |
| QA-01 | saída dos gates + validation.md do verificador |
