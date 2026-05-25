---
version: alpha
name: Dayara Medical
description: "A calm medical landing-page system for a coloproctology practice: cream and white surfaces, teal editorial headings, copper conversion accents, and soft beige dividers. The visual signature is a warm copper-to-straw underline rule beneath Cinzel headings, supported by rounded clinical cards and restrained motion."
colors:
  brand-copper: "#A35442"
  brand-teal: "#1D414C"
  brand-beige: "#D7CBBF"
  brand-cream: "#F4F3F2"
  brand-straw: "#D1AF8B"
  canvas-white: "#FFFFFF"
  text-body: "#374151"
  text-muted: "#4B5563"
  text-subtle: "#6B7280"
  text-inverse: "#FFFFFF"
  hairline: "#E5E7EB"
  surface-soft: "#F3F4F6"
  footer-ink: "#1A1A1A"
  footer-ink-soft: "#2D2D2D"
  whatsapp: "#16A34A"
  whatsapp-hover: "#15803D"
  warning-red: "#DC2626"
  legacy-brown: "#8B4513"
  legacy-brown-dark: "#654321"
  legacy-gold: "#B8860B"
typography:
  display-xl:
    fontFamily: "var(--font-cinzel), Georgia, serif"
    fontSize: 60px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0
  display-lg:
    fontFamily: "var(--font-cinzel), Georgia, serif"
    fontSize: 48px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0
  display-md:
    fontFamily: "var(--font-cinzel), Georgia, serif"
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0
  title-md:
    fontFamily: "var(--font-cinzel), Georgia, serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: 0
  body-lg:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: 0
  body-md:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-sm:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0
  caption-overline:
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "0.14em"
rounded:
  sm: 4px
  lg: 8px
  xl: 12px
  card: 16px
  card-lg: 32px
  media-inner: 20px
  disclosure: 24px
  media-frame: 28px
  full: 9999px
spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 20px
  6: 24px
  8: 32px
  10: 40px
  12: 48px
  14: 56px
  16: 64px
  20: 80px
  24: 96px
components:
  button-primary:
    backgroundColor: "{colors.brand-copper}"
    textColor: "{colors.text-inverse}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "{colors.brand-teal}"
    textColor: "{colors.text-inverse}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
  card-base:
    backgroundColor: "{colors.canvas-white}"
    textColor: "{colors.text-body}"
    typography: "{typography.body-md}"
    rounded: "{rounded.card}"
    padding: "24px"
  card-editorial:
    backgroundColor: "{colors.canvas-white}"
    textColor: "{colors.text-body}"
    typography: "{typography.body-md}"
    rounded: "{rounded.card-lg}"
    padding: "24px"
  callout-card:
    backgroundColor: "{colors.canvas-white}"
    textColor: "{colors.text-body}"
    typography: "{typography.body-md}"
    rounded: "{rounded.card-lg}"
    padding: "32px"
  nav-header:
    backgroundColor: "{colors.canvas-white}"
    textColor: "{colors.text-body}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.sm}"
    padding: "16px"
  overline:
    backgroundColor: "{colors.canvas-white}"
    textColor: "{colors.brand-copper}"
    typography: "{typography.caption-overline}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  floating-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.text-inverse}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: "14px"
---

## Overview

Dayara Medical is a warm clinical system: white and cream canvases keep the site calm, teal carries the professional voice, and copper marks conversion paths, section rules, and hover emphasis. The strongest visual signature is the copper-to-straw horizontal accent rule that appears under major section headings and the hero lettering in `src/components/Hero.tsx`, `src/components/Diseases.tsx`, `src/components/Treatments.tsx`, `src/components/Contact.tsx`, `src/components/CV.tsx`, and `src/components/Testimonials.tsx`. Typography pairs Cinzel for medical-editorial headings with Montserrat-loaded `--font-geist-sans` body text from `src/app/layout.tsx` and `src/app/globals.css`.

Key Characteristics:

- Warm medical palette: copper, teal, beige, cream, straw.
- Cream page backgrounds with white or translucent white cards.
- Cinzel headings, Montserrat/system body copy.
- Rounded cards and media frames, usually 16px or 32px.
- Thin beige or gray hairlines instead of heavy dividers.
- Copper-to-straw section underline as the recurring brand mark.
- Soft shadows and small upward hover movement.
- Sober, patient-friendly CTA language.

## Colors

### Brand & Accent

**Brand Copper** ({colors.brand-copper} — #A35442): Primary accent and conversion color from `tailwind.config.ts` and `src/app/globals.css`; used for buttons, overlines, links, and underline gradients.

**Brand Teal** ({colors.brand-teal} — #1D414C): Primary heading and secondary button color from `tailwind.config.ts` and `src/app/globals.css`; used across headings and clinical emphasis.

**Brand Straw** ({colors.brand-straw} — #D1AF8B): Warm secondary accent from `tailwind.config.ts`; used in section rules, decorative glows, stars, and footer text.

### Surface

**Brand Cream** ({colors.brand-cream} — #F4F3F2): Site canvas from `src/app/globals.css`; used by body background and subpage wrappers.

**Canvas White** ({colors.canvas-white} — #FFFFFF): Card and hero surface; appears as `bg-white`, `bg-white/95`, and literal `#ffffff` in hero gradients.

**Surface Soft** ({colors.surface-soft} — #F3F4F6): Soft hover/menu surface from `hover:bg-gray-100` and scrollbar track.

### Hairlines

**Brand Beige** ({colors.brand-beige} — #D7CBBF): Brand border and divider color from `tailwind.config.ts`; used as `border-beige`, `text-beige`, and scrollbar thumb.

**Hairline** ({colors.hairline} — #E5E7EB): Neutral card/nav border from `border-gray-200` in header, cards, and privacy surfaces.

### Text

**Text Body** ({colors.text-body} — #374151): Default body color from `src/app/globals.css` and `text-gray-700`.

**Text Muted** ({colors.text-muted} — #4B5563): Secondary copy from `text-gray-600`.

**Text Subtle** ({colors.text-subtle} — #6B7280): Metadata and tertiary labels from `text-gray-500`.

**Text Inverse** ({colors.text-inverse} — #FFFFFF): Text on copper, teal, green, and dark footer surfaces.

### Semantic

**WhatsApp** ({colors.whatsapp} — #16A34A): Floating WhatsApp CTA background from `bg-green-600` in `src/components/FloatingWhatsAppButton.tsx`.

**WhatsApp Hover** ({colors.whatsapp-hover} — #15803D): Floating WhatsApp hover from `hover:bg-green-700`.

**Warning Red** ({colors.warning-red} — #DC2626): High-urgency symptom border and warning text in `src/components/WhenToSeek.tsx`.

### Decorative

**Footer Ink** ({colors.footer-ink} — #1A1A1A): Footer gradient start in `src/components/Footer.tsx`.

**Footer Ink Soft** ({colors.footer-ink-soft} — #2D2D2D): Footer gradient end in `src/components/Footer.tsx`.

**Legacy Brown** ({colors.legacy-brown} — #8B4513): CV timeline accent in `src/components/CV.tsx`; documented as legacy.

**Legacy Brown Dark** ({colors.legacy-brown-dark} — #654321): CV timeline accent in `src/components/CV.tsx`; documented as legacy.

**Legacy Gold** ({colors.legacy-gold} — #B8860B): CV timeline accent in `src/components/CV.tsx`; documented as legacy.

## Typography

Font Family declaration: `src/app/layout.tsx` loads Montserrat into `--font-geist-sans` and Cinzel into `--font-cinzel`; `tailwind.config.ts` maps them to `font-sans` and `font-serif`.

| Token | Family | Size | Weight | Line Height | Letter Spacing | Use |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| `{typography.display-xl}` | Cinzel | 60px | 600 | 1 | 0 | Subpage H1 at `lg:text-6xl` in blog/treatment routes |
| `{typography.display-lg}` | Cinzel | 48px | 600 | 1 | 0 | Homepage section headings at `lg:text-5xl` |
| `{typography.display-md}` | Cinzel | 30px | 700 | 1.2 | 0 | Mobile section headings and emphasized homepage H2s |
| `{typography.title-md}` | Cinzel | 24px | 600 | 1.33 | 0 | Card titles, FAQ headings, treatment headings |
| `{typography.body-lg}` | Montserrat/system | 18px | 400 | 1.625 | 0 | Intro paragraphs, hero supporting copy |
| `{typography.body-md}` | Montserrat/system | 16px | 400 | 1.6 | 0 | Default body and card copy |
| `{typography.body-sm}` | Montserrat/system | 14px | 400 | 1.43 | 0 | Nav, metadata, footer, breadcrumbs |
| `{typography.caption-overline}` | Montserrat/system | 12px | 600 | 1.33 | 0.14em | Badges and overlines in route headers/cards |

Principles:

- Use Cinzel only for headings, brand names, and editorial section titles; keep paragraphs in sans.
- Display headings stay semibold or bold; avoid light display typography.
- Overlines are uppercase, small, and letter-spaced at `tracking-[0.14em]` or `tracking-[0.16em]`.
- Body copy uses relaxed line-height (`leading-relaxed` or body `line-height: 1.6`) for medical readability.
- Links and emphasis change color to copper or teal; avoid underlines except nav accent rules.

## Layout

Base unit: Tailwind's 4px scale. The shared `.container` in `src/app/globals.css` is `max-w-6xl mx-auto px-4`, and most top-level sections use `container mx-auto px-4`.

Spacing tokens: `{spacing.1}` 4px, `{spacing.2}` 8px, `{spacing.3}` 12px, `{spacing.4}` 16px, `{spacing.5}` 20px, `{spacing.6}` 24px, `{spacing.8}` 32px, `{spacing.10}` 40px, `{spacing.12}` 48px, `{spacing.14}` 56px, `{spacing.16}` 64px, `{spacing.20}` 80px, `{spacing.24}` 96px.

Grid and container rules: homepage sections use wide constrained containers (`max-w-6xl`/`max-w-7xl`) with `grid-cols-1` progressing to `md:grid-cols-2`, `lg:grid-cols-3`, or `lg:grid-cols-12`. Detail pages use narrower reading columns (`max-w-4xl` and `max-w-5xl`) in `src/app/blog/[slug]/page.tsx` and `src/app/tratamentos/[slug]/page.tsx`.

Breakpoints: mobile-first; `sm` appears for compact CTA/footer row changes, `md` for nav visibility and two-column cards, `lg` for primary desktop layout, and `xl` for three-column treatment index cards.

Whitespace philosophy: section vertical rhythm is generous (`pt-16 pb-12`, `lg:pt-24 lg:pb-20`), with tighter subpage wrappers (`py-8 lg:py-12`). Cards use 24px padding by default and 32px or 40px for CTA panels.

## Elevation & Depth

| Level | Evidence | Use |
| --- | --- | --- |
| Flat | `bg-cream`, `bg-white`, no shadow | Page canvases and prose regions |
| Hairline | `border border-beige`, `border border-gray-200` | Cards, nav, FAQ panels, dividers |
| Soft Shadow | `shadow-sm`, global `.card` custom `0 2px 15px -3px rgb(0 0 0 / 0.1)` | Editorial cards and default system cards |
| Lifted Shadow | `shadow-lg`, hover shadow in cards and image frames | Interactive cards, contact tiles, media frames |
| Atmospheric | `rounded-full blur-3xl opacity-*` decorative glows | Hero/section background depth |

Decorative Depth: hierarchy is often carried by the copper-to-straw underline rule (`w-20 h-1` gradients), beige borders, translucent white surfaces (`bg-white/95`, `bg-white/90`, `bg-white/80`), and subtle gradient backgrounds rather than heavy box shadows.

## Shapes

| Token | Value | Use |
| --- | ---: | --- |
| `{rounded.sm}` | 4px | Hamburger bars and tiny primitives via `rounded` |
| `{rounded.lg}` | 8px | Mobile nav links, privacy card, footer icons |
| `{rounded.xl}` | 12px | Global buttons and some icon containers |
| `{rounded.card}` | 16px | Global `.card`, image frames, homepage cards |
| `{rounded.media-inner}` | 20px | MDX image inner frame |
| `{rounded.disclosure}` | 24px | FAQ disclosures and related-blog inner cards |
| `{rounded.media-frame}` | 28px | MDX image outer frame |
| `{rounded.card-lg}` | 32px | Blog cards, treatment cards, CTA cards, subpage panels |
| `{rounded.full}` | 9999px | Badges, profile initials, decorative circles, floating WhatsApp |

Canonical card corner: current subpage/editorial cards use `{rounded.card-lg}` (32px). The older global `.card` utility uses `{rounded.card}` (16px) and still appears on homepage sections.

Canonical CTA corner: `.btn` uses `{rounded.xl}` (12px), while the floating WhatsApp CTA uses `{rounded.full}`.

## Components

**{components.button-primary}** uses `.btn btn-primary`: `inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium`, copper background, white text, and a custom soft shadow from `src/app/globals.css`. Hover uses `color-mix(in srgb, var(--color-copper) 90%, black)` plus a copper-tinted larger shadow.

**{components.button-secondary}** uses `.btn btn-secondary`: the same structure as primary but with teal background and teal-tinted hover shadow. It is the dominant appointment CTA on blog, treatment, and hero surfaces.

**{components.card-base}** maps to the global `.card`: `bg-white/90 rounded-2xl border border-gray-200`, custom soft shadow, and `transition: all 0.3s ease` in `src/app/globals.css`. It is still used in homepage disease, CV, header mobile menu, and contact blocks.

**{components.card-editorial}** maps to newer subpage cards such as `src/components/ui/BlogCard.tsx` and treatment detail panels: `rounded-[2rem] border border-beige bg-white/95 p-6 shadow-sm transition-all duration-300`, often with `hover:-translate-y-1 hover:shadow-lg`.

**{components.callout-card}** maps to `src/components/ui/CallToActionCard.tsx`: `rounded-[2rem] border border-beige bg-white/95 p-8 shadow-sm lg:p-10`, teal title, gray body, and stacked-to-row action layout.

**{components.nav-header}** maps to `src/components/Header.tsx`: sticky `bg-white/95 backdrop-blur-sm`, `border-b border-gray-200`, custom soft shadow, `container py-4`, and text nav links with copper underline growth on hover or active subpage state.

**{components.overline}** maps to route-header and post/treatment badges: small uppercase text, `tracking-[0.14em]` or `tracking-[0.16em]`, copper text, and in badges `rounded-full border border-copper/20 bg-copper/10 px-3 py-1`.

**{components.floating-whatsapp}** maps to `src/components/FloatingWhatsAppButton.tsx`: fixed 56px circular green button at bottom-right with white icon, `shadow-lg`, `duration-300`, `hover:-translate-y-0.5`, `hover:bg-green-700`, and `hover:shadow-xl`.

## Motion

Canonical interaction motion is small and calm: `transition-all duration-300` for cards and CTAs, `transition-colors` for text links, and modest movement (`hover:-translate-y-1`, `hover:-translate-y-0.5`, `group-hover:translate-x-1`). The carousel in `src/components/Testimonials.tsx` uses `transition-transform duration-500 ease-out`. Avoid adding bouncy or spring-like motion; the medical tone relies on restrained feedback.

## Responsive Behavior

The header switches from desktop nav to a mobile card menu at `md`. Homepage feature sections generally stack on mobile and become two-column or twelve-column desktop layouts at `lg`. Detail pages preserve readable `max-w-4xl` content and avoid full-width prose. Buttons often stack on mobile with `flex-col` and switch to rows at `sm`.

## Known Gaps

- No dark mode is implemented: there is no `.dark`, `[data-theme]`, or dark counterpart token usage in `src/app/globals.css`, `tailwind.config.ts`, or components.
- The system has two card eras: older `.card rounded-2xl border-gray-200` homepage cards and newer `rounded-[2rem] border-beige bg-white/95` editorial cards.
- Footer and CV use extra decorative colors outside the five brand tokens; keep them contained unless intentionally refactored.
- `src/components/Contact.tsx` has one `rounded-3xl` CTA panel, while the dominant large-card radius is `rounded-[2rem]`.

## Do's and Don'ts

Do's:

- Do use the five brand tokens from `tailwind.config.ts`: copper, teal, beige, cream, and straw.
- Do use teal for headings and copper for links, overlines, CTA emphasis, and section rules.
- Do keep page sections on cream or white canvases with beige/gray hairlines.
- Do use Cinzel headings and Montserrat/system body text through `font-serif` and `font-sans`.
- Do use `rounded-[2rem] border border-beige bg-white/95 p-6 shadow-sm` for new editorial cards.
- Do use the copper-to-straw `w-20 h-1` rule under major section headings.
- Do keep hover states subtle: color shift, soft shadow, or a small upward translate.

Don'ts:

- Don't introduce new decorative browns/golds beyond the existing CV timeline values (`#8B4513`, `#654321`, `#B8860B`) without first promoting them into the real token set.
- Don't use `rounded-3xl` for new cards just because it appears once in `src/components/Contact.tsx`; use `{rounded.card-lg}` for large editorial cards or `{rounded.card}` for legacy `.card` surfaces.
- Don't create a third card pattern; current code already has legacy `.card` surfaces and newer `rounded-[2rem] border-beige bg-white/95` editorial surfaces.
- Don't extend the dark palette until a real `.dark` or `[data-theme]` mechanism exists in code.
- Don't add custom utility names unless they are backed by `tailwind.config.ts` or `src/app/globals.css`; the active custom tokens are the five brand colors and two font families.
