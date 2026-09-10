# Design-system consolidation audit

Verified against the working tree on 2026-09-10. The live component inventory is rendered at `/design-system` outside Vercel production.

## Migration map

| Existing surface | Target | Status | Decision |
| --- | --- | --- | --- |
| Homepage section heading blocks | `SectionHeader` | Migrated | Rule variant on homepage |
| Route/page introduction headings | `SectionHeader` | Supported | Left-aligned overline variant |
| Campo Grande related treatments and articles | `LinkCard` | Migrated | Canonical source pattern |
| Homepage disease cards | `LinkCard` | Migrated | Icon without repeated eyebrow |
| Homepage treatment cards | `LinkCard` | Migrated | Six featured procedures at compact density; full catalog stays on `/tratamentos` |
| Treatment index cards | `LinkCard` | Migrated | `h2` title and indication details |
| Blog index and latest-article cards | `BlogCard` → `LinkCard` | Migrated | Blog adapter supplies taxonomy and reading time |
| Symptom urgency rows | Purpose-built row | Retained | Horizontal urgency list is not a destination-card layout |
| Consultation promise trio | Removed | Retired | Repeated the outcomes already present in the adjacent conversion block |
| Continuing-education trio | Editorial evidence rail | Migrated | Shared dividers and small icons replace three nested card-like items |
| Contact facts | `InfoCard` | Migrated | Translucent static surface |
| Testimonial cards and trust quote | `InfoCard` | Migrated | Quote content stays at call site |
| CV qualification timeline | `InfoCard` | Migrated | Current item uses accent edge |
| Treatment location summary | `LocationCard` → `InfoCard` | Migrated | Location adapter keeps domain content |
| Treatments and CV closing panels | `CallToActionCard` | Migrated | Removed unexplained accent-border difference |
| Contact booking panel | `CallToActionCard` | Migrated | Preserves WhatsApp, email, maps, and analytics values |
| FAQ, blog, profile, location closing panels | `CallToActionCard` | Existing | Shared light or teal closing panel |
| Treatment booking sidebar | `BookingCard` | Existing | Cream primary action and inverse ghost phone action on teal |
| Dark two-column conversion block | `HighlightCta` | Existing | Distinct layout |
| Muted two-column closing block | `SoftCta` | Retired | Blog closing action now uses the teal `CallToActionCard` tone |
| Horizontal catch-all prompt | `InlinePromptCta` | Existing | Distinct layout; white surface, copper left accent |
| Qualification/fact chips | `.tile` | Existing | Quiet non-interactive grouped fact |

## Primitive contracts

| Primitive | File | Key API | Contract |
| --- | --- | --- | --- |
| `SectionHeader` | `src/components/ui/SectionHeader.tsx` | `title`, `lead`, `eyebrow`, `align` | Owns section opening and heading composition |
| `LinkCard` | `src/components/ui/LinkCard.tsx` | `href`, `icon`, `eyebrow`, `title`, `body`, `details`, `ctaLabel`, `density`, `titleAs` | One destination; title-only accessible link; full-card target |
| `InfoCard` | `src/components/ui/InfoCard.tsx` | `as`, `padding`, `surface`, `accent` | Static surface; optional copper, teal, or danger edge; no lift or destination cues |
| `CallToActionCard` | `src/components/ui/CallToActionCard.tsx` | `eyebrow`, `title`, `body`, `actions`, `children`, `footer`, `align`, `tone`, `titleAs` | Light or teal closing panel |
| `BookingCard` | `src/components/ui/BookingCard.tsx` | `title`, `body`, `conversionPrefix` | Dark booking panel with WhatsApp and phone |

The three specialized CTA compositions remain separate because their column structure, border treatment, and hierarchy differ. Combining them under a `tone` prop would hide layout changes inside styling configuration.

## Token decisions

- Card radius: `rounded-card` = 1.5rem.
- Card hairline: `border-beige`.
- Interactive lift: 4px.
- Resting depth: `shadow-sm`; lifted depth uses a teal-tinted shadow.
- Card titles: Montserrat via `font-sans`.
- Section openings: rule for homepage sections, overline for route introductions.

## Non-negotiable behavior

- Keep every existing `data-conversion` value unchanged.
- Keep LinkCard’s stretched title link so the accessible name remains the title alone.
- Mirror hover styling for keyboard focus.
- Preserve `.tile` touch and reduced-motion behavior.
- Keep Portuguese medical copy unchanged during component migrations.
- Use the current Campo Grande business data; `.design-ref/` content is stale.
