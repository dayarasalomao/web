# Redesign brief — apply the new visual system to the site

You are working in the existing **Next.js + Tailwind** codebase for Dra. Dayara Salomão's site (coloproctologist, Curitiba, Brazil — content is in **pt-BR** and must stay that way). This is an **SEO-focused** site; do not regress semantics, metadata, headings, or performance.

Your job is **not** a rewrite. It is a **visual redesign**: adopt the design system below and progressively refactor pages, sections, and components so the site looks and feels like the reference — calmer, more elegant, more premium/clinical, with clearer hierarchy, warmer personality, and stronger booking CTAs. Keep all copy, routes, data, and functionality intact unless a change clearly improves clarity.

---

## 0. Before you touch anything

1. **Map the codebase.** List routes/pages (`app/` or `pages/`), shared layout, and every reusable component. Read `globals.css`, the Tailwind config, and any existing tokens.
2. **Inventory the current design.** For each page, note the sections in order, and catalogue the recurring patterns: buttons, cards, badges/pills, section headers, testimonial cards, timeline, contact blocks, footer.
3. **Write a short plan** (`REDESIGN-PLAN.md`) with: the token changes, a component-by-component refactor list, and the page order you'll tackle. Confirm the plan reflects what's actually in the repo before coding.
4. Work **incrementally** — one component or section per commit, verify it renders, then move on. Never do a giant find-and-replace across the whole app in one shot.

---

## 1. Design tokens (source of truth)

These already exist in `globals.css` / Tailwind. Standardize on them and remove ad-hoc hex values that don't map to one of these.

| Token | Hex | Role |
|---|---|---|
| `cream` | `#F4F3F2` | Page background |
| `copper` | `#A35442` | **Primary / accent** — CTAs, links, eyebrows, active nav, markers |
| copper-deep | `#8A4436` | Hover/pressed state for copper |
| `teal` | `#1D414C` | Dark accent — headings, dark sections, timeline chips |
| teal-deep | `#16323B` | Darkest — footer, heading emphasis, deepest surfaces |
| `straw` | `#D1AF8B` | Secondary accent — soft buttons on dark, image moldings, avatars |
| `beige` | `#D7CBBF` | Neutral — soft fills, dividers, subtle borders |
| surface | `#FFFFFF` | Cards and light sections (alternate with `cream`) |
| soft fill | `#EDE6DE` | Muted card/fill on cream (beige-tinted) |
| body text | `#374151` | Default paragraph text (gray-700) |
| muted text | `#6B7280` | Labels, meta, captions |
| border | `rgba(29,65,76,0.10–0.14)` | Hairline borders on cream |

**Usage rules**
- **Backgrounds alternate** `cream` ↔ `#FFFFFF`, with occasional full-bleed `teal` sections for contrast (testimonials, CTA banners, footer uses `teal-deep`). Max ~2 dark sections per page.
- **copper is the only "loud" color** — reserve it for things you want clicked (primary buttons, links, "Ver detalhes →", eyebrows). Don't flood the page with it.
- On dark `teal` sections: light text `#EDE6DE`, muted `#c3d0cc`, straw for the secondary button, copper stays the primary button.
- Add a copper-deep hover token if it's missing.

---

## 2. Typography

Two families, loaded via `next/font`:

- **Newsreader** (serif, optical sizing) — all display/headings and short italic emphasis. Weights 400–600. Use *italic* for a warm accent phrase inside a headline (e.g. *"minimamente invasivo"* in copper or teal).
- **Manrope** (sans) — body, UI, buttons, labels. Weights 400–700.

**Scale & treatment**
- H1: `clamp(2.25rem, 5vw, 3.6rem)`, `line-height: 1.04`, `letter-spacing: -0.02em`, color `teal-deep`.
- H2: `clamp(1.9rem, 4vw, 2.9rem)`, `line-height: 1.08`.
- **Eyebrow** (above most section titles): Manrope 600, `12px`, `letter-spacing: 0.18em`, uppercase, `copper`.
- Body: `16–18px`, `line-height: 1.7`, color `#374151`, `text-wrap: pretty`, measure capped ~60–65ch.
- Section headers follow the rhythm: **eyebrow → H2 → one-line intro paragraph.**

---

## 3. Component patterns

Refactor the shared components to these specs (Tailwind classes or `@apply`):

**Buttons** (all `border-radius: 999px`, Manrope 600, `~15px`)
- Primary: `bg-copper text-cream`, hover `bg-[#8A4436]`; add a soft copper drop-shadow on hero CTAs.
- Soft (on dark): `bg-straw text-teal-deep`, hover `bg-cream`.
- Ghost/secondary: transparent, `1px` border `rgba(29,65,76,.2)`, text `teal-deep`, hover fill `#FFFFFF`.

**Cards** — `#FFFFFF` (or `#EDE6DE` for muted), `border 1px rgba(29,65,76,.10)`, `border-radius: 16–18px`, `padding 24–26px`. Hover: `border-color: copper`, `translateY(-2px)`, soft shadow `0 20px 36px -26px rgba(29,65,76,.45)`. Link cards end with a copper `"Ver detalhes →"`.

**Pills / tags** — uppercase Manrope 600 `11px`, `letter-spacing .1em`, copper text on `#EDE6DE`, `border-radius 999px`, `padding 5–6px 11–13px`. The "eyebrow-in-a-pill" (with a small copper dot) is the hero locator chip.

**Image treatment** — rounded `24px`, and a **`straw` or `beige` offset block behind** the image (`position:absolute; inset:16px -16px -16px 16px`) for a layered, editorial feel. Soft shadow `0 34px 60px -34px rgba(29,65,76,.5)`.

**Dark feature/CTA block** — `bg-teal`, `border-radius 24px`, generous padding, white heading + muted body + copper button. Used for mid-page conversions.

**Testimonials** — on a `teal` section: translucent white cards (`rgba(255,255,255,.055)`, `border rgba(255,255,255,.1)`), big serif open-quote in `straw`, straw circular avatar with initial.

**Timeline** (formação) — year in a `teal` pill, connected by a hairline, title + copper place + muted description.

**Sidebar (treatment detail)** — sticky booking card (`bg-teal`) + a "Onde é feito" location card; main column flows eyebrow → H2 → paragraphs → symptom list → step cards (`#EDE6DE` with numbered teal chip) → FAQ cards → related-treatment grid.

**Header** — sticky, `backdrop-blur`, translucent `cream`, hairline bottom border. Logo = serif name + copper uppercase "Coloproctologista" kicker. Active nav item in copper 700. Persistent copper "Agendar consulta" button.

**Footer** — `teal-deep`, serif name, straw credential line (CRM/RQE), nav columns, contact, copper CTA.

**Floating CTA** — fixed bottom-right copper WhatsApp pill on long pages.

---

## 4. Spacing, layout & motion

- **Section padding:** `clamp(64px, 8vw, 120px)` vertical, `clamp(20px, 5vw, 56px)` horizontal. Content max-width `~1180px`, centered.
- **Responsive without breakpoints where possible:** card grids use `repeat(auto-fit, minmax(280px, 1fr))`; two-column layouts use `minmax(300px, 1fr)` so they stack naturally on mobile. Use `gap`, never margin-based spacing between siblings.
- **Generous whitespace is the point** — let sections breathe; don't crowd. When in doubt, add space.
- **Touch targets ≥ 44px** on mobile; verify the mobile nav/menu.
- Motion is subtle: hover lifts and border/shadow transitions (~150–200ms), nothing flashy.

---

## 5. Reference designs

The target look is captured in these standalone files (in the design project, openable in a browser):
- **Homepage-Copper** — full homepage in this palette.
- **Tratamentos** — treatments listing, grouped by category.
- **Tratamento** — treatment detail template (hero + facts + body + sticky sidebar + FAQ + related).
- **Blog** — article index with featured post + category chips + card grid.
- **Design System** — the tokens/type/components on one page.

Match their *structure, hierarchy, spacing, and component styling* — not pixel-for-pixel. If a real page has content the references don't, apply the same patterns to it.

---

## 6. Guardrails

- **Preserve SEO:** keep semantic HTML, one H1 per page, heading order, `alt` text, metadata, structured data, canonical URLs, and existing routes/slugs. Keep images optimized (`next/image`), keep or improve Lighthouse/CLS.
- **Keep all pt-BR copy** unless fixing an obvious typo.
- **Accessibility:** color contrast (copper on cream, white on teal all pass AA for the given sizes — re-check any new combos), visible focus states, keyboard nav, `aria` on the floating/menu buttons.
- **No new heavy dependencies.** Use Tailwind + the existing stack. No emoji unless already part of the brand.
- **Don't invent medical claims.** Reuse existing copy; only restructure/relabel for clarity.
- After each page, run the build and a quick visual check before continuing.

---

## 7. Suggested order

1. Tokens + Tailwind config + fonts (`next/font`) + base typography.
2. Shared primitives: Button, Card, Pill, SectionHeader (eyebrow/H2/intro), Header, Footer.
3. Homepage, section by section (hero → about → sinais → doenças → tratamentos → depoimentos → formação → contato).
4. Tratamentos listing.
5. Treatment detail template (drives all `/tratamentos/[slug]`).
6. Blog index (+ article template if in scope).
7. Contato / privacy / 404 polish pass.
8. Full responsive + a11y + Lighthouse sweep.

Start by reading the repo and producing `REDESIGN-PLAN.md`. Then implement step 1 and show me the result before continuing.
