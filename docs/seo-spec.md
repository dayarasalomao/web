# SEO Spec

> **Relocation guardrail (recorded 2026-05-26):** The practice is expected to move from Curitiba/PR to Campo Grande/MS around July 2026. Do **not** add new Curitiba-focused page titles, meta descriptions, H1s, schema area targeting, or local SEO copy. Keep current Curitiba business data until confirmation, then retarget local signals to Campo Grande/MS.

## URLs indexáveis

- `/`
- `/blog`
- `/blog/[slug]`

## URL não indexável

- `/politica-privacidade`

## Requisitos implementados

- Metadata dedicada para `/blog` e `/blog/[slug]`
- Canonical por página indexável
- Open Graph e Twitter metadata para blog
- Sitemap com índice do blog e entradas dinâmicas dos posts
- JSON-LD global para organização, médica e website
- JSON-LD por post com artigo, breadcrumb e FAQ quando existir
- Breadcrumb visível nas rotas profundas
- Links internos da landing page para posts relacionados

## Pendências operacionais

- Confirmar URL pública do Doctoralia
- Confirmar URL pública do Google Maps da clínica
- Confirmar se `@dradayarasalomao` continua sendo o handle correto para metadata social
- Corrigir a configuração de lint em um passo separado
