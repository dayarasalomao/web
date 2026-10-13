# SEO Spec

> **Relocation update (2026-07-20):** Titles, metadata, H1s, schema and local copy now target Campo Grande/MS. Curitiba remains only in truthful CV/history references. Production publication should be coordinated with Google Business Profile and Doctoralia updates.

## URLs indexáveis

- `/`
- `/blog`
- `/blog/[slug]`
- `/sobre`
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
- JSON-LD global para médica (`Person` + `Physician`) e website; clínica vinculada com ID próprio
- JSON-LD por post com artigo, breadcrumb e FAQ quando existir
- JSON-LD `ProfilePage` em `/sobre`, conectado ao nó global da médica
- JSON-LD do local ativo com endereço, coordenadas, horário e vínculo profissional
- Breadcrumb visível nas rotas profundas
- Links internos da landing page para posts relacionados
- Sitemap com Campo Grande e sem a rota aposentada de Curitiba
- Links editoriais entre artigos relacionados e bylines ligadas ao perfil profissional

## Pendências operacionais

- Atualizar `DOCTORALIA_URL` quando o perfil público for migrado para Campo Grande/CRM-MS
- Confirmar se `@dradayarasalomao` continua sendo o handle correto para metadata social

## Validação da revisão da PR #21

- Os grafos global/local da médica declaram `Person` e `Physician` no mesmo ID. A tipagem pessoal torna `worksFor`, `workLocation` e formação compatíveis com o vocabulário; os perfis da clínica seguem separados.
- A auditoria de entrada editorial usa os mesmos artigos relacionados renderizados (máximo de quatro), os links Markdown do corpo e os artigos efetivos das páginas de tratamento. Referências ocultas não contam.
- A diretriz ASCRS de 2024 foi conferida em 12/10/2026 no [PDF oficial do portal ASCRS U](https://www.ascrsu.com/ascrs/repview?name=3_2851101_PDF&type=784-156), substituindo a URL antiga que retornava 404.
