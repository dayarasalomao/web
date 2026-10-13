# Project state

## Decisions

- AD-001 (2026-10-12): Preservar a página local como destino principal de buscas comerciais; artigo sobre encontrar especialista tem intenção educativa complementar.
- AD-002 (2026-10-12): Usar `Campo Grande (MS)` nos títulos locais e `seoTitle` separado do H1 nos artigos. Não criar páginas para sinônimos comerciais.
- AD-003 (2026-10-12): Material do Word é preparado na PR; revisão clínica e confirmação das imagens continuam sendo passos antes do merge, conforme docs.
- AD-004 (2026-10-12): A entidade estável da médica declara Person + Physician para permitir relações pessoais sem criar uma terceira entidade comercial. Auditoria conta links realmente renderizados e referências de corpo; fontes quebradas usam o PDF oficial ASCRS U.

- AD-005 (2026-10-13): Imagens do blog são posicionadas editorialmente no Markdown; nenhuma após o último H2, por decisão explícita do usuário. Cards usam mídia decorativa 16:9 sem recorte (contain), com marca nos posts sem cardImage; preservar a resolução de imagens SEO.

- AD-006 (2026-10-13): coverImage pode diferenciar cards/SEO sem trocar diagramas do corpo. Todas as figuras de corpo entram no sitemap. Por preferência explícita do usuário, legendas públicas novas são neutras, com procedência IA no manifest e revisão editorial.

- AD-007 (2026-10-13): EPSiT reutiliza a figura fornecida no próprio artigo e no comparativo pilonidal; a capa gerada defeituosa foi retirada. Alt e legendas são específicos por imagem no catálogo editorial, com ressalvas literais e preservação de prosa/metadados clínicos e pixels por hashes.

## Handoff

Feature: blog-image-editorial-review. Branch: codex/seo-local-campo-grande, PR21.
E1 c41b0d5, E2 367214e e E3 2cfb1eb concluídos sobre a rodada anterior5a275c9.
22 ilustrações geradas ativas, 40 cards com imagem/39 fontes distintas; única duplicação intencional EPSiT/comparativo pilonidal. Telefone v2 mantido.
42 imagens revisadas; todas as45 figuras de corpo com alt/legenda específicos. Prosa e metadados clínicos dos40 artigos,11 ressalvas e pixels das42 imagens preservados.
Lint, build69, unit134, e2e67 no build local de produção e auditSEO0/0 aprovados.
Sitemap:60 rotas indexáveis e42 imagens de blog; llms/robots/canonicals coerentes.
Verificação independente PASS I1–I5: unit134, build69, e2e focado8, lint/audit aprovados; três mutações detectadas, zero sobreviventes.
Mensagem pt-BR salva em docs/client-updates/revisao-final-site-blog-2026-10-13.md para entrega ao usuário; não enviada à cliente.
Próximo passo editorial: revisão da Dra. Dayara dos artigos, imagens/legendas e procedência antes de merge/publicação. Nenhuma implementação pendente.
