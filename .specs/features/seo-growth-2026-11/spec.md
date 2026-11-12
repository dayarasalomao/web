# SEO growth while new posts are pending (2026-11)

**Status**: Planned (2026-11-12)
**Related**: `.specs/features/campo-grande-launch-growth/spec.md`, `docs/pesquisa/pauta-posts-2026-11.md`, `docs/seo-local-operacao.md`

## Problem

The site ranks mostly for branded and long-tail informational queries. New posts depend on the client's time, so this plan lists what can be improved on our side in the meantime.

Indexing coverage is not the bottleneck: the production sitemap lists all 60 public URLs (5 hubs, 40 posts, 14 treatments, 1 location), robots allows everything, and only `/politica-privacidade` and `/design-system` are `noindex`. Pages reported in Search Console as "Discovered/Crawled – currently not indexed" are a content-quality and authority signal, not a sitemap problem.

## Baseline (measured 2026-11-12)

| Surface | Words (visible copy) | Notes |
| --- | --- | --- |
| Blog posts | 316–873, average ~590 | Visible sources, FAQ, images |
| Laser/procedural treatments | 364–632 | 2–4 FAQs, no visible sources |
| `ligadura-elastica-hemorroidas-internas` | 250 | No "how it works" |
| Clinical treatments (prurido, constipação, diarreia, SII, hidradenite, DII) | 164–193 | No FAQ, no "how it works" |

Sibling references: Ana Luiza Rocha's treatment pages run ~1,200–1,600 words; Paulo Araújo's ~900–1,200 with question-shaped H2s, limits, care steps, FAQ and related posts. `clinic-site-kit` sets no word minimum but requires the sections and about six real FAQs per service page.

Tooling: `test:unit` and `audit:seo` failed on Node ≥ 23 because of `--experimental-transform-types`, and CI only ran Playwright, so neither gated merges.

## Pull requests

| # | Branch | Scope | Needs physician review |
| --- | --- | --- | --- |
| 1 | `df/ci-quality-gates` | Run unit tests and SEO audit through `tsx`; add a CI job for lint, unit tests and SEO audit; this spec | No |
| 2 | `df/sitemap-inventory-tests` | Tests that the sitemap equals the indexable inventory, robots/llms agree with it, treatment images in the sitemap, data-derived `lastModified` for `/sobre` and `/perguntas-frequentes` | No |
| 3 | `df/treatment-page-depth-model` | Optional treatment fields: visible `sources`, `lastReviewed` with reviewer, `limitations`, `recovery`; question-shaped H2s; schema `citation`/`lastReviewed` | No (no new medical facts) |
| 4 | `df/treatment-depth-clinical` | Expand the six clinical treatments to ~900–1,200 words with ~6 FAQs and sources | **Yes** |
| 5 | `df/treatment-depth-procedures` | Expand ligadura elástica and the laser/procedure pages | **Yes** |
| 6 | `df/post-afastamento-cirurgia-hemorroida` | Draft pauta A1 (`cirurgia-hemorroida-afastamento-atestado`, ~300 impressions at position 8–10), unpublished until review; then A2–A8 | **Yes** |
| 7 | `df/gsc-fixes` | 301s for Search Console 404s; title/description rewrites for pages at position 4–20 | Depends on export |

PR 7 needs a Search Console export: Pages → reasons not indexed, and Performance → queries/pages for the last 90 days.

## Rules for content PRs

- Never add facts the HTML does not publish to `src/lib/markdown.ts` or `public/llms.txt`.
- FAQ text rendered on the page must equal `FAQPage` schema text.
- Sources must be visible before they are emitted as `citation`.
- No guaranteed outcomes, prices, or recovery promises; ranges come from cited studies and are framed as averages.
- Keep `STRATEGIC_SEARCH_TARGETS` ownership: expanding a treatment must not compete with the blog post that owns the condition query. Run `npm run audit:seo`.

## Off-site levers (client-executed, highest ROI)

Unchanged from `campo-grande-launch-growth`: Google reviews after each consult, weekly Google Business Profile posts and photos, Doctoralia migration to Campo Grande, MS directory citations.

## Out of scope

IndexNow (no sibling uses it, Google ignores it), neighborhood pages, per-city doorway pages, changing which page owns "coloproctologista campo grande" without Search Console evidence of cannibalization.
