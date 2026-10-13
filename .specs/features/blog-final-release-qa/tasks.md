# Tarefas

1. [x] R1 — Ilustrações editoriais: 23 assets, manifest/prompts, inspeção visual e teste de integridade. Gate: unitários de assets + lint; commit atômico.
2. [x] R2 — Integração de imagem/capa e SEO: lib/blog, structured-data, 23 frontmatters, 16 linhas Markdown, dimensões, testes ajustados/adicionados. Gate: unitários + lint + e2e relevantes; commit atômico. F1–3.
3. [ ] R3 — Crawler coverage, documentação, mensagem cliente e QA final: llms/sitemap/robots/canonicals verificados, docs sincronizados, testes completos e smoke de produção/capturas. Gate: lint/build/unit/audit/e2e + smoke produção; commit atômico. F4–6.

Depois do último commit: Verifier independente com spec, diff e sensor em scratch; persistir validation.md e STATE sem merge de produção.

## Matriz de testes

| Requisito | Evidência |
| --- | --- |
| F1 | Manifest tem 23 arquivos distintos, WebP válido, dimensão/razão e peso; revisão visual da série |
| F2 | 40 cards resolvidos e únicos; primárias originais iguais à base; guardrails e mapa editorial do corpo |
| F3 | src e dimensões do card iguais a OG/Twitter/schema e sitemap por post; case legado e cover validado |
| F4 | sitemap/llms/robots endpoints cobrem catálogo de posts/tratamentos/páginas; destinos indexáveis/canônicos |
| F5 | comandos completos e screenshots + smoke build produção desktop/375px |
| F6 | mensagem pt-BR com resumo fiel e solicitação de revisão IA/imagens/conteúdo, salva e entregue |
