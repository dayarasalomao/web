# Project state

## Decisions

- AD-001 (2026-10-12): Preservar a página local como destino principal de buscas comerciais; artigo sobre encontrar especialista tem intenção educativa complementar.
- AD-002 (2026-10-12): Usar `Campo Grande (MS)` nos títulos locais e `seoTitle` separado do H1 nos artigos. Não criar páginas para sinônimos comerciais.
- AD-003 (2026-10-12): Material do Word é preparado na PR; revisão clínica e confirmação das imagens continuam sendo passos antes do merge, conforme docs.
- AD-004 (2026-10-12): A entidade estável da médica declara Person + Physician para permitir relações pessoais sem criar uma terceira entidade comercial. Auditoria conta links realmente renderizados e referências de corpo; fontes quebradas usam o PDF oficial ASCRS U.

## Handoff

Feature: pr21-review-fixes. Branch: codex/seo-local-campo-grande.
R1 26bd238, R2 e4b5d37, F2 8b632d9, R3 1e3343a concluídos.
71 unitários, 51 e2e, lint, TypeScript, build (69 páginas) e auditoria 0/0 aprovados.
Verificação independente PASS: 4/4 critérios, 3/3 mutações detectadas. Correções concluídas para a PR #21. Alteração de WhatsApp a068ecd preservada.
Próximo passo após esta entrega: revisão clínica/procedência já registrada na PR antes do merge.
