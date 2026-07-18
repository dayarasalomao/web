# SEO Spec

> **Relocation guardrail (updated 2026-07-18):** First Campo Grande/MS attendance is planned for 2026-08-05, after which Curitiba will no longer be active. Do **not** add new Curitiba-focused page titles, metadata, H1s, schema targeting or local copy. Keep current production signals on Curitiba until the coordinated site/Google/Doctoralia cutover.

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
