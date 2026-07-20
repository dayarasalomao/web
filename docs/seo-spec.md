# SEO Spec

> **Relocation update (2026-07-20):** Titles, metadata, H1s, schema and local copy now target Campo Grande/MS. Curitiba remains only in truthful CV/history references. Production publication should be coordinated with Google Business Profile and Doctoralia updates.

## URLs indexáveis

- `/`
- `/blog`
- `/blog/[slug]`
- `/tratamentos`
- `/tratamentos/[slug]`
- `/locais-de-atendimento/campo-grande`

## URLs não indexáveis ou aposentadas

- `/politica-privacidade`
- `/locais-de-atendimento` redireciona para o único local confirmado
- `/locais-de-atendimento/curitiba` retorna 404

## Requisitos implementados

- Metadata dedicada para `/blog` e `/blog/[slug]`
- Canonical por página indexável
- Open Graph e Twitter metadata para blog
- Sitemap com índice do blog e entradas dinâmicas dos posts
- JSON-LD global para organização, médica e website
- JSON-LD por post com artigo, breadcrumb e FAQ quando existir
- JSON-LD do local ativo com endereço, coordenadas, horário e vínculo profissional
- Breadcrumb visível nas rotas profundas
- Links internos da landing page para posts relacionados
- Sitemap com Campo Grande e sem a rota aposentada de Curitiba

## Pendências operacionais

- Atualizar `DOCTORALIA_URL` quando o perfil público for migrado para Campo Grande/CRM-MS
- Confirmar se `@dradayarasalomao` continua sendo o handle correto para metadata social
