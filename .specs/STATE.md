# Project state

## Decisions

- AD-001 (2026-10-12): Preservar a página local como destino principal de buscas comerciais; artigo sobre encontrar especialista tem intenção educativa complementar.
- AD-002 (2026-10-12): Usar `Campo Grande (MS)` nos títulos locais e `seoTitle` separado do H1 nos artigos. Não criar páginas para sinônimos comerciais.
- AD-003 (2026-10-12): Material do Word é preparado na PR; revisão clínica e confirmação das imagens continuam sendo passos antes do merge, conforme docs.
- AD-004 (2026-10-12): A entidade estável da médica declara Person + Physician para permitir relações pessoais sem criar uma terceira entidade comercial. Auditoria conta links realmente renderizados e referências de corpo; fontes quebradas usam o PDF oficial ASCRS U.

- AD-005 (2026-10-13): Imagens do blog são posicionadas editorialmente no Markdown; nenhuma após o último H2, por decisão explícita do usuário. Cards usam mídia decorativa 16:9 sem recorte (contain), com marca nos posts sem cardImage; preservar a resolução de imagens SEO.

- AD-006 (2026-10-13): coverImage pode diferenciar cards/SEO sem trocar diagramas do corpo. Todas as figuras de corpo entram no sitemap. Por preferência explícita do usuário, legendas públicas novas são neutras, com procedência IA no manifest e revisão editorial.

## Handoff

Feature: blog-final-release-qa. Branch: codex/seo-local-campo-grande, PR21.
R1 932dcad, R2 d1a372c, R3 f0b890d e R4 c981623 concluídos.
23 ilustrações geradas, 40 cards distintos, telefone v2 com pose corrigida e captions públicas neutras.
Lint, build69, unit131, e2e65 no build local de produção e auditSEO0/0 aprovados.
Sitemap:60 rotas indexáveis e43 imagens de blog; llms/robots/canonicals coerentes.
Verificação independente PASS: F1–F5/F7 e artefato F6, três mutações detectadas, zero sobreviventes.
Mensagem pt-BR salva em docs/client-updates/revisao-final-site-blog-2026-10-13.md para entrega ao usuário; não enviada à cliente.
Próximo passo editorial: revisão da Dra. Dayara dos artigos, imagens/legendas e procedência antes de merge/publicação. Nenhuma implementação pendente.
