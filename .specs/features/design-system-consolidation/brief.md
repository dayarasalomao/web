# Brief: consolidate the card & surface system

**For:** an agent doing an audit + refactor pass on `dayarasalomao`
**Goal:** stop having ~20 hand-rolled card variants. Land on ~6 primitives, defined once in `globals.css` / `tailwind.config.ts`, used everywhere.
**Not the goal:** a redesign. The winning pattern already exists in the repo. Propagate it.

---

## 1. The finding that explains everything

The site has **two design generations living side by side**, and the human's quality ranking maps onto them almost perfectly:

| | Generation A — legacy homepage | Generation B — redesign ports |
|---|---|---|
| **Where** | `src/components/*.tsx` (Contact, CV, Testimonials, Treatments, Diseases, Hero, Footer, WhenToSeek) | `src/components/ui/*` and `src/app/*/page.tsx` |
| **Origin** | Original build | Ported from `.design-ref/*.dc.html` (see PR #17) |
| **Section header** | `font-serif font-bold` + a `w-20 h-1` copper→straw gradient rule, centred | uppercase eyebrow at `tracking-[0.16em]` → serif title → one lead line, left-aligned |
| **Colour** | inline `style={{ color: 'var(--color-teal)' }}` | Tailwind brand tokens |
| **Card** | `bg-white/80 rounded-2xl border-gray-200 hover:shadow-lg` | `rounded-[1.5rem] border-beige bg-white shadow-sm` + copper top-stripe on hover |
| **Buttons** | inline-styled anchors, decorative floating dots | `.btn btn-primary` / `.btn btn-secondary` (pill) |
| **Focus states** | none | `focus-visible:ring-2 ring-copper ring-offset-2` |
| **Human's verdict** | BAD / VERY BAD | VERY GOOD / GOOD |

Everything the human marked **VERY GOOD** is Gen B. Everything marked **BAD** is Gen A. So this is not a taste problem to solve from scratch — it is a **migration** that stalled halfway.

`DESIGN.md` already names this under "Known Gaps" ("The system has two card eras"), but it has since drifted from the code — see §5.

### Measured evidence

```
115  inline style={{ }} occurrences   (CV 22, Testimonials 18, Contact 18, Hero 14,
                                       Treatments 13, WhenToSeek 10, Footer 10, Diseases 5,
                                       Header 4 — and exactly 1 in the whole app/ tree)
 12  distinct border-radius values    (rounded-full 67, [2rem] 24, 2xl 18, [1.5rem] 11,
                                       xl 6, lg 5, [1.125rem] 4, [1.25rem] 3, [1.75rem] 2,
                                       sm 1, md 1, 3xl 1)
 14  distinct border colours          (border-beige 44, border-copper 10, border-gray-200 9,
                                       border-teal/20 5, border-copper/20 4, border-teal/10 3, …)
  6  shadow treatments                (shadow-sm 35, shadow-lg 21, shadow-md 2, shadow-xl 1,
                                       + 2 one-off arbitrary values)
  4  hover-lift distances             (-translate-y-0.5, -1, -[3px], and none)
  7  copies of the `w-20 h-1` divider (Hero, WhenToSeek, Contact, Testimonials,
                                       Treatments, CV, Diseases)
  7  uses of the global `.card` class — against ~20 card-shaped things on the site
```

That last number is the tell: **the shared `.card` utility exists and is barely used.** Most cards re-declare their own surface inline.

---

## 2. The canonical card — extract this first

`src/app/locais-de-atendimento/[slug]/page.tsx:217` (related treatments) and `:262` (related articles).

These are the two the human called out as the best on the site. **They are the same ~40-line `className` string pasted twice in one file**, differing only in: icon, eyebrow label, title, body, CTA label, and `min-h`. That is a component that never got extracted.

Anatomy worth preserving:

1. Accent top-stripe: `absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-copper` → `scale-x-100` on `group-hover` **and** `group-focus-visible`
2. Eyebrow row: lucide icon inside a `h-9 w-9 rounded-full bg-copper/10` badge, next to uppercase `tracking-[0.12em] text-copper` label with optional `·` metadata
3. `ArrowUpRight` in a `h-9 w-9 rounded-full border-beige` badge, top-right, that inverts to solid copper on hover/focus
4. Serif title, `mt-5 text-lg font-semibold text-teal`
5. Body, `text-sm leading-relaxed text-gray-600`
6. `mt-auto` CTA row with an `ArrowRight` that `translate-x-1` on hover
7. Surface: `rounded-[1.5rem] border-beige bg-white p-6 shadow-sm`, `hover:-translate-y-1 hover:border-copper/70 hover:shadow-lg`, full `focus-visible` ring

Proposed API:

```tsx
<LinkCard
  href={...}
  icon={Stethoscope}
  eyebrow="Tratamento"          // or "Artigo · 5 min de leitura"
  title={...}
  body={...}
  ctaLabel="Conhecer tratamento"
  minHeight?={...}
/>
```

Then re-point every list card in §3 group A at it.

---

## 3. Full inventory — every card-shaped thing on the site

### A. Link cards (the whole surface is a destination)

| # | Location | Current treatment | Verdict | Target |
|---|---|---|---|---|
| 1 | `locais-de-atendimento/[slug]/page.tsx:217` | canonical | ⭐ VERY GOOD | **becomes `LinkCard`** |
| 2 | `locais-de-atendimento/[slug]/page.tsx:262` | verbatim copy of #1 | ⭐ VERY GOOD | `LinkCard` |
| 3 | `ui/BlogCard.tsx` | `rounded-[1.125rem] border-teal/10`, hashed accent stripe, category pill, stretched-link | OK | `LinkCard` — but keep its a11y pattern, see §6 |
| 4 | `tratamentos/page.tsx:109` | `.card` + variable grid span | OK | `LinkCard` |
| 5 | `Diseases.tsx:145` | `.card` + variable grid span, **no icon, no arrow, no eyebrow** | BAD | `LinkCard` |
| 6 | `Treatments.tsx:159` / `:167` | `.card p-4`, cramped, `opacity-40` top stripe that reads as a render artifact | BAD | `LinkCard` (needs a `compact` density) |
| 7 | `WhenToSeek.tsx:169` | `.card` + inline `borderLeftWidth`/`borderLeftColor` for urgency | GOOD | `LinkCard` with an `accent` prop — move urgency colour to a token |

### B. Static info cards (no destination)

| # | Location | Current treatment | Verdict | Target |
|---|---|---|---|---|
| 8 | `WhenToSeek.tsx:210` (`CONSULTATION_VALUES`) | hand-rolled clone of `.card`'s hover — re-declares the exact same border/lift/shadow instead of using the class | BAD | `InfoCard` |
| 9 | `Testimonials.tsx:232` | `bg-white/80 rounded-2xl border-gray-200` | BAD | `InfoCard` (quote variant) |
| 10 | `Contact.tsx` contact rows | `bg-white/80 rounded-2xl border-gray-200` — same string as #9 | VERY BAD | `InfoCard` |
| 11 | `CV.tsx:92` timeline entries | `.card p-4` + inline colours | BAD | `InfoCard` |
| 12 | `ui/LocationCard.tsx` | `rounded-[1.5rem] border-beige bg-white p-6` | fine | `InfoCard` |
| 13 | `sobre/page.tsx:141`, `:156` | `rounded-[2rem]` panels | GOOD/OK | `InfoCard` (large) |
| 14 | `.tile` in `globals.css` | used **3 times**, all in the location page | good idea, unused | keep, adopt for chips/rows |

### C. CTA blocks — five components, no shared base

| # | Location | Surface | Radius | Button |
|---|---|---|---|---|
| 15 | `ui/CallToActionCard.tsx` | white/95 + border-beige | `[2rem]` | slot |
| 16 | `ui/HighlightCta.tsx` | dark teal, 2-col | `[1.5rem]` | straw pill |
| 17 | `ui/SoftCta.tsx` | beige-soft, 2-col | `[1.5rem]` | copper pill |
| 18 | `ui/InlinePromptCta.tsx` | beige-soft, dashed border, horizontal bar | `[1.125rem]` | teal pill |
| 19 | `ui/BookingCard.tsx` | dark teal sidebar | `[1.5rem]` | copper + phone fallback |
| 20 | `Treatments.tsx:231` **and** `CV.tsx:142` | `.card p-8 border-2` + inline `borderColor` | `[1.125rem]` | `.btn` |
| 21 | `Contact.tsx` "Agende sua consulta" panel | bespoke, plus a **green WhatsApp button that exists nowhere else in the system** | — | one-off |

**#20 is the same code twice** — `Treatments.tsx:231` and `CV.tsx:142` are byte-identical apart from the border colour and the copy. #15–#18 are one component with a `tone` prop. #21 should be deleted and replaced with existing pieces.

### D. Quotes

| # | Location | Verdict |
|---|---|---|
| 22 | `sobre/page.tsx:174` blockquote | GOOD — the pattern to keep |
| 23 | `Testimonials.tsx:336` trust panel | BAD — `bg-white/60 rounded-2xl border-gray-200` |

---

## 4. Proposed primitive set (target: 6)

| Primitive | Replaces | Notes |
|---|---|---|
| `SectionHeader` | the 7 `w-20 h-1` dividers + `font-serif font-bold` + most of the 115 inline styles | props: `eyebrow, title, lead, align`. **Highest leverage single change.** |
| `LinkCard` | group A (7 variants) | the exemplar from §2; `density` and `accent` props |
| `InfoCard` | group B (7 variants) | non-interactive; no lift, no arrow |
| `CtaBlock` | #15–#18, #20, #21 | `tone: "light" \| "dark" \| "soft" \| "bar"` |
| `BookingCard` | keep as-is | genuinely specific (WhatsApp + phone fallback) |
| `Pill` / `.tile` | chips, category labels, qualification rows | `.tile` already exists — adopt it |

Everything else should be deleted, not migrated.

---

## 5. Token drift — `DESIGN.md` no longer describes the code

`DESIGN.md` is treated as the source of truth but has fallen behind `src/app/globals.css`. An agent trusting it will produce Gen-A output. Fix as part of the work, not after:

| `DESIGN.md` claims | `globals.css` actually has |
|---|---|
| `.btn` uses `rounded-xl` (12px) | `rounded-full` |
| `.card` = `bg-white/90 rounded-2xl border-gray-200` + black shadow | `rounded-[1.125rem] border-teal/10 bg-white`, copper hover border, teal-tinted shadow |
| canonical large radius = `rounded-[2rem]` | the best card on the site uses `rounded-[1.5rem]`; `rounded-2xl` appears 18× |
| — (not documented) | `.tile`, `--color-beige-soft`, `--color-copper-deep`, `--color-teal-deep` all exist and are in use |

Decisions the agent should force and then write down:

- **One card radius.** Pick from `[1.125rem]` / `[1.5rem]` / `[2rem]`, promote it to a Tailwind token (`rounded-card`), delete the rest.
- **One hairline.** `border-beige` (44 uses) vs `border-teal/10` (3) vs `border-gray-200` (9) are three answers to the same question. `border-gray-200` is Gen A — it should go to zero.
- **One hover lift** and one shadow pair (rest / lifted).
- **Card titles: serif or sans?** Right now they are both. `globals.css` sets all `h1–h6` to Cinzel, so the exemplar card's `<h3>` renders in Cinzel, while `BlogCard.tsx` explicitly overrides to `font-sans` (with a comment explaining why Cinzel hurts scannability at two lines). Both are card titles on the same site. Pick one and apply it everywhere.

---

## 6. Constraints — do not break these

- **Don't redesign.** Propagate Gen B. Every visual decision already has an answer somewhere in `src/components/ui/` or `.design-ref/`.
- **Definitions go in `globals.css` / `tailwind.config.ts`**, not in per-component `className` strings. If a pattern is written twice, it belongs in a class or a component.
- **Portuguese copy is untouched.** This is a refactor of presentation only. Medical accuracy rules in `CLAUDE.md` still apply.
- **`data-conversion` attributes must survive verbatim.** They feed `src/lib/analytics.ts` and the conversion funnel. Renaming a suffix silently breaks reporting. Any `CtaBlock` consolidation must keep the existing per-instance suffixes.
- **Keep the a11y wins already in the code**, and treat them as requirements of the extracted primitives:
  - `BlogCard.tsx` uses a stretched `::after` link so the accessible name is the title alone, not the whole card read as one run-on link. Any full-card link must do this.
  - The exemplar card has a full `focus-visible` ring and mirrors every hover state onto `group-focus-visible`. Keyboard parity is not optional.
  - `.tile` guards its hover behind `@media (hover: hover)` and respects `prefers-reduced-motion`. Same for any new interactive surface.
- **No new colours.** Five brand tokens plus `copper-deep` / `teal-deep` / `beige-soft`. The green WhatsApp button in `Contact.tsx` and the legacy browns/golds in `CV.tsx` are the exceptions to remove or promote — decide, don't leave them.
- `.design-ref/` is **temporary and its content is stale** — Curitiba, a (41) phone number, and Newsreader/Manrope fonts. Port layout, never content. The site is Campo Grande/MS and ships Montserrat + Cinzel.

---

## 7. Deliverables

1. `docs/design-system-audit.md` — the inventory above, verified and extended, with a **mapping table: every current card → its target primitive**, so the migration is mechanical.
2. A concrete proposal for the ≤6 primitives: file paths, props, and the CSS/token changes each needs.
3. A migration order. Suggested, by leverage:
   1. `SectionHeader` — touches 7 sections, removes most of the 115 inline styles
   2. `LinkCard` — extract from `locais-de-atendimento/[slug]/page.tsx`, then migrate `Diseases` → `Treatments` → `tratamentos/page.tsx` → `WhenToSeek` → `BlogCard`
   3. `CtaBlock` — collapse the five CTA components; delete the duplicated `Treatments.tsx:231` / `CV.tsx:142` block
   4. `InfoCard` — `Contact` → `Testimonials` → `CV`
   5. `Contact.tsx` last: it is the worst offender and depends on all of the above
4. An updated `DESIGN.md` that matches `globals.css` when the work lands.

Run `npm run lint`, `npm run test:unit`, and `npm run e2e` after each step. Visual parity on the GOOD/VERY GOOD components is a pass condition — those are not to change.
