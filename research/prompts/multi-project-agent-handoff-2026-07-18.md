# Handoff dos três projetos — 18/07/2026

Este documento registra qual prompt deve ser entregue a cada agente e qual é o limite de entrega. Nenhum dos fluxos autoriza deploy em produção.

## 1. Dayara Salomão

- Workspace: `/Users/diegovfeder/workspace/jobs/dayarasalomao`
- Prompt: `research/prompts/campo-grande-launch-agent-prompt-2026-07-18.md`
- Entrega: atualizar a branch `feat/campo-grande-launch-prep` e o draft PR #11.
- Limite: manter Campo Grande em pré-lançamento/noindex; não fazer deploy nem ativar automaticamente em 05/08.
- Fatos confirmados: Instituto do Aparelho Digestivo, R. Alagoas 700, Jardim dos Estados, Campo Grande/MS, CEP 79020-120, início em 05/08/2026 e CRM-MS 16556/RQE 9819.
- Bloqueios: telefone/WhatsApp, coordenadas, confirmação de Sala 8 e conclusão do Google Business Profile.

## 2. Ana Luiza Rocha

- Workspace: `/Users/diegovfeder/workspace/jobs/analuizarocha`
- Prompt: `research/prompts/seo-implementation-agent-prompt-2026-07-18.md`
- Entrega: branch própria e draft PR para `main`.
- Limite: implementação e preview local; sem deploy, pedido de indexação ou alteração de sistemas externos.
- Referências principais: `research/seuseo-study-2026-07-18.md`, `research/seo-growth-plan-328-keywords-2026-07-18.md` e `research/seuseo-keywords-2026-08.csv`.

## 3. ICAB Chocolates

- Workspace: `/Users/diegovfeder/workspace/jobs/icab/shopify`
- Prompt: `research/shopify-seo-coding-agent-prompt.md`
- Entrega: alterações locais e, somente depois de `shopify theme check` sem erros, um novo tema **unpublished** para preview.
- Limite: nunca usar `--live`, `--publish`, `--allow-live` ou o ID do tema ao vivo. Não executar mutações de Admin GraphQL sem aprovação adicional.
- Verificação de acesso: `shopify theme list --store icabchocolates.myshopify.com --json --path theme` funcionou em 18/07/2026; revalidar no início do trabalho.

## Regra de encerramento para todos

Cada agente deve devolver arquivos alterados, decisões de SEO, validações, screenshots quando aplicável, bloqueios, rollback e a frase explícita de que nenhum deploy em produção foi realizado.
