# Project state

## Decisions

- AD-001 (2026-10-12): Preservar a página local como destino principal de buscas comerciais; artigo sobre encontrar especialista tem intenção educativa complementar.
- AD-002 (2026-10-12): Usar `Campo Grande (MS)` nos títulos locais e `seoTitle` separado do H1 nos artigos. Não criar páginas para sinônimos comerciais.
- AD-003 (2026-10-12): Material do Word é preparado na PR; revisão clínica e confirmação das imagens continuam sendo passos antes do merge, conforme docs.
- AD-004 (2026-10-12): A entidade estável da médica declara Person + Physician para permitir relações pessoais sem criar uma terceira entidade comercial. Auditoria conta links realmente renderizados e referências de corpo; fontes quebradas usam o PDF oficial ASCRS U.

- AD-005 (2026-10-13): Imagens do blog são posicionadas editorialmente no Markdown; nenhuma após o último H2, por decisão explícita do usuário. Cards usam mídia decorativa 16:9 sem recorte (contain), com marca nos posts sem cardImage; preservar a resolução de imagens SEO.

## Handoff

Feature: blog-image-placement. Branch: codex/seo-local-campo-grande.
T1 7e63912, T2 726baff e T3 29071a0 concluídos.
Lint, build (69 páginas), 126 unitários, 59 e2e e auditoria SEO 0/0 aprovados.
Capturas desktop/375px e tabela editorial anexadas em .specs/features/blog-image-placement/.
Verificação independente PASS: AC1–8, 2/2 mutações detectadas, zero lacunas.
Nenhuma imagem após o último H2, conforme decisão explícita do usuário. Imagens SEO, alt, frontmatter e prosa clínica preservados.
Próximo passo editorial: revisão clínica/procedência antes do merge, conforme CLAUDE.md. Nenhuma implementação pendente nesta feature.
