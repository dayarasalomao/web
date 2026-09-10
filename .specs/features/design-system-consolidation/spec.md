# Spec: `/design-system` route + card consolidation

**Status**: Steps 0–6 complete (2026-09-10); specialized CTA layouts and symptom rows intentionally remain distinct.
**Input**: read [`brief.md`](./brief.md) first — it holds the audit, the measured evidence, and the full card inventory. This document is the build order.

---

## The idea

Add a dev-only `/design-system` route that renders every primitive in the system, and use it as the workbench for collapsing ~20 hand-rolled card variants down to 6 primitives.

## The one condition that makes it work

**The gallery must import the real primitives. It must never re-implement them.**

If `/design-system` renders `<LinkCard>` imported from `src/components/ui/LinkCard.tsx`, the page physically cannot lie about what the site looks like — change the component, the gallery changes. If instead it holds its own copies of the markup, it becomes a second source of truth that drifts from the first.

This repo already had that exact failure. Before this migration, `DESIGN.md` was a careful, thorough, hand-maintained description that said `.btn` was `rounded-xl` after the code had moved to `rounded-full`, and described a card utility that no longer matched the approved surfaces. Nobody was careless; hand-maintained descriptions of code drift. A gallery that imports is a description that cannot.

Corollary: **`DESIGN.md` stops being the spec and becomes the prose companion to the route.** Tokens, radii, and component anatomy get demonstrated at `/design-system`; `DESIGN.md` keeps only the things a rendered page can't show — the *why*, the do's and don'ts, the content rules.

## Sequencing — the gallery is the tool, not the trophy

Do **not** build the primitives first and document them after. Build the gallery *as* the extraction harness, one primitive at a time:

```
extract primitive → render every current variant of it side by side on /design-system
  → the drift becomes obvious (7 radii in one screen) → collapse to one
  → migrate the call sites → delete the variants from the gallery
```

The page earns its keep during the refactor, when you need to see `Diseases`' bare card next to `Treatments`' cramped one next to the canonical `locais-de-atendimento` card in the same viewport. That comparison is the whole point and it is nearly impossible to do by scrolling three routes.

---

## Route requirements

### Path and gating

`src/app/design-system/page.tsx`

Gate on `VERCEL_ENV`, not `NODE_ENV`:

| Environment | `VERCEL_ENV` | Behaviour |
|---|---|---|
| Local `next dev` | undefined | renders |
| Vercel preview deploy | `preview` | renders |
| Vercel production | `production` | `notFound()` |

`NODE_ENV` is the wrong gate: Vercel preview builds run as `production`, so a `NODE_ENV` check would kill the route exactly where it is most useful — reviewing the system on a real preview URL, on a phone, with the client.

```tsx
import { notFound } from 'next/navigation'

export default function DesignSystemPage() {
  if (process.env.VERCEL_ENV === 'production') notFound()
  // …
}
```

Note this ships the route's code in the production bundle even though it 404s. For a static marketing site that is a few KB and leaks nothing. Accept it; don't add a build-time exclusion for it.

### Not indexable

- `export const metadata = { robots: { index: false, follow: false } }` on the route.
- **Do not** add it to `src/app/sitemap.ts` — that file is an explicit allowlist, so a new route is already excluded. Leave it alone.
- **Do not** add it to `src/lib/navigation.ts` (header or footer).
- **Do not** add `Disallow: /design-system` to `public/robots.txt`. The route 404s in production, so a disallow line would only advertise a path that isn't there. Vercel already sends `X-Robots-Tag: noindex` on preview deployments; the metadata above is the belt to that braces.

### Testable

`playwright.config.ts` runs `next dev`, so `VERCEL_ENV` is undefined and the route renders under e2e. Add `tests/e2e/design-system.spec.ts` asserting the page renders and every primitive section is present. This is what stops the gallery from silently breaking as primitives change.

### Content

Sections, in this order — each rendering the **imported** primitive:

1. **Tokens** — the five brand colours plus `copper-deep` / `teal-deep` / `beige-soft`, as swatches with their hex and token name. Radii, shadows, and hover-lift distances as labelled specimens.
2. **Type scale** — Cinzel and Montserrat at every size in use, with the token name.
3. **Buttons** — `.btn` × `primary` / `secondary` / `ghost` / `soft`, on both cream and teal grounds, each in rest / hover / focus-visible / disabled.
4. **Primitives** — one section per component from §4 of the brief, showing every prop combination.
5. **Migration staging** (temporary) — the not-yet-migrated variants, side by side with their target primitive. This section shrinks to nothing as the work lands, and is deleted with the last migration.

Every specimen gets its source path as a visible label (`src/components/ui/LinkCard.tsx`). When someone building a new page finds the right card here, they need to know what to import.

---

## Build order

Follow the leverage order from `brief.md` §7. At each step: extract → stage on `/design-system` → migrate call sites → delete the old variants.

| # | Step | Why first |
|---|---|---|
| 0 | ✅ **Done (2026-09-10)** — route skeleton + tokens + radius + elevation + motion + type scale + buttons | Standing structure to hang everything on. No refactor risk. |
| 1 | ✅ **Done (2026-09-10)** — `SectionHeader` | 6 byte-identical blocks → 1 component. Inline styles 115 → 95. Zero visual change (parity verified). Hero excluded: it is a page hero with its own composition (rule *above* an eyebrow + `h1`), not a section header — its `w-20 h-1` is the only one left. Ships with an `eyebrow` variant so the rule-vs-overline choice can be made by looking at `/design-system#section-header`. |
| 2 | ✅ **Done (2026-09-10)** — `LinkCard` | Both canonical call sites, `Diseases`, `Treatments`, the treatment index, and `BlogCard` migrated. `WhenToSeek` remains a purpose-built urgency row because it is horizontal and dense rather than a card. |
| 3 | ✅ **Done (2026-09-10)** — CTA consolidation | The byte-identical `Treatments` / `CV` pair, Contact’s one-off panel, and the blog closing panel now use `CallToActionCard`. `HighlightCta` and `InlinePromptCta` remain separate because their layouts carry distinct hierarchy. |
| 3b | ✅ **Retired (2026-09-10)** — `ValueGrid` | The extracted trio still read as generic nested cards. The redundant consultation trio was removed; CV now uses a section-specific evidence rail with shared dividers and no item surfaces. |
| 4 | ✅ **Done (2026-09-10)** — `InfoCard` | `Contact`, `Testimonials`, the `CV` timeline, and `LocationCard` now share the quiet non-interactive surface. |
| 5 | ✅ **Done (2026-09-10)** — `Contact.tsx` | Contact facts use `InfoCard`; the booking panel uses `CallToActionCard`; the isolated green WhatsApp button now uses the brand CTA system. Conversion attributes are unchanged. |
| 6 | ✅ **Done (2026-09-10)** — prose companion and audit | `DESIGN.md` now explains intent and points visual facts to `/design-system`; `docs/design-system-audit.md` records the verified mapping. `.design-ref/` remains while shipped primitives still cite its source layouts. |

---

## `LinkCard` — what is left, and what the migration revealed

Migrated: `locais-de-atendimento/[slug]/page.tsx` (both instances), `Diseases`, `Treatments` (via the new `compact` density), `tratamentos/page.tsx`, and `BlogCard`.

- **`tratamentos/page.tsx`** now uses the narrowly scoped `details` slot and `titleAs="h2"`. The button-shaped duplicate destination became the standard visual CTA row, avoiding nested links while preserving the full-card target.
- **`WhenToSeek.tsx`** is a horizontal urgency row rather than a destination card. It now uses `InfoCard` for the static surface and semantic accent tokens; the nested article link remains the only interactive target.
- **`BlogCard.tsx`** delegates to `LinkCard`. Its real category and reading time share the eyebrow; the unlabeled hashed stripe cycle was removed. The stretched-title-link accessibility pattern remains inside the primitive.

Two things surfaced during the migration:

1. **The accessible-name fix broke two e2e tests, correctly.** `blog.spec.ts` asserted `getByRole('link', { name: /…/ }).getByText(/conhecer tratamento/i)` — which only passed because the whole card was one anchor whose accessible name was every word inside it. With the stretched-`::after` pattern the link's name is the title alone, so the assertions were updated to match the better structure. Worth knowing: those tests encoded the bug.
2. **An eyebrow on every card in a homogeneous grid is noise.** "Tratamento" earns its place on the location page because it sits next to "Artigo". Eleven cards all reading "CONDIÇÃO" carry no information, so `LinkCard` now renders the icon badge without a label when `eyebrow` is omitted.

## On not building `CtaBlock` yet

The audit called for one `CtaBlock` with a `tone` prop collapsing five components. Half of that turned out to be unnecessary: the duplicated `Treatments` / `CV` panels were already what `CallToActionCard` is, so they were pointed at it (plus `align` and a `children` slot) instead of at something new.

`HighlightCta` (dark, two-column with evidence rows) and `InlinePromptCta` (dashed bar) remain separate because their layouts carry distinct hierarchy. The former `SoftCta` was retired after the blog closing panel deliberately moved to the standard vertical `CallToActionCard`; its teal tone changes color only and does not hide a layout switch inside the component.

## Decisions to force (and then demonstrate on the route)

These are open today and the refactor cannot proceed cleanly without answers. Pick one each, render it at `/design-system`, delete the alternatives.

1. ~~**One card radius.**~~ **RESOLVED (2026-09-10): `rounded-card` = `1.5rem`.** This preserves the two approved canonical cards. Larger radii remain panel/layout primitives rather than card variants.
2. ~~**One hairline.**~~ **RESOLVED (2026-09-10): `border-beige`.** The extracted card primitives share it; neutral gray dividers remain in navigation, policy content, and gallery chrome where they are not card edges.
3. ~~**One hover lift and shadow pair.**~~ **RESOLVED (2026-09-10): 4px with a teal-tinted lifted shadow.** Interactive cards use it; `InfoCard` deliberately has no lift.
3b. ~~**Section opening: copper→straw rule, or uppercase overline?**~~ **RESOLVED (2026-09-10): contextual variants in one primitive.** Homepage content sections use the brand rule; route introductions use the left-aligned overline. They represent different hierarchy levels and are both rendered from `SectionHeader`.
4. ~~**Card titles: Cinzel or Montserrat?**~~ **RESOLVED (2026-09-10): Montserrat.**
   Cinzel is an inscriptional display face with no real lowercase. It works for a section title — three to five words on one line. A card title in medical Portuguese ("Pós-operatório de cirurgia de hemorroidas: o que esperar de cada técnica") wraps to three lines, and in Cinzel it stops being scannable, which is a card title's only job. The accents make it worse: ã, ç, é in small caps go dense at small sizes.
   `BlogCard.tsx` was right to override. The global `h1–h6` Cinzel rule stays (it correctly serves section and page titles); card primitives declare `font-sans` explicitly. Both specimens are rendered at `/design-system#type` so the comparison is visible rather than argued.

---

## Constraints

Carried from `brief.md` §6, restated because they are the ways this refactor can do real damage:

- **`data-conversion` attributes survive verbatim.** They feed `src/lib/analytics.ts` and the conversion funnel. Collapsing five CTA components into one must preserve each call site's existing suffix exactly — a rename silently breaks reporting with no error.
- **A11y wins become requirements of the primitives, not casualties of the merge.** `BlogCard`'s stretched-`::after` link (so the accessible name is the title, not the whole card as one run-on link); the canonical card's full `focus-visible` ring with every hover state mirrored onto `group-focus-visible`; `.tile`'s `@media (hover: hover)` guard and `prefers-reduced-motion` handling.
- **Portuguese copy is untouched.** Presentation refactor only. The medical content rules in `CLAUDE.md` still apply.
- **No new colours.** Five brand tokens plus the three deep/soft variants. The green WhatsApp button in `Contact.tsx` and the legacy browns/golds in `CV.tsx` are the outstanding exceptions — promote or remove, don't leave them undecided.
- **No redesign.** Every visual answer already exists in `src/components/ui/` or `.design-ref/`. Propagate; don't invent.
- **`.design-ref/` content is stale** — Curitiba, a (41) phone, Newsreader/Manrope fonts. Port layout, never content. The practice is Campo Grande/MS and the site ships Montserrat + Cinzel.
- **Visual parity on the GOOD / VERY GOOD components is a pass condition.** Those were graded by the human and are not to change. The BAD ones move to match them.

Run `npm run lint`, `npm run test:unit`, and `npm run e2e` after each step in the build order.
