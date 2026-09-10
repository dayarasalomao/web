# Dayara Medical design system

The rendered source of truth is `/design-system` in local and Vercel preview environments. It imports the real tokens and components, so changes in `globals.css`, `tailwind.config.ts`, or `src/components/ui` appear there immediately. Production requests to that route return 404.

This document records the choices that a specimen page cannot explain. Do not copy class strings from this file. Find the matching specimen, import its component, and use the API shown in code.

## Direction

The site should feel calm, clinical, warm, and direct. Cream and white keep the page quiet. Teal carries professional authority. Copper marks actions and emphasis. Beige separates surfaces. Straw is a restrained decorative accent.

Medical content remains patient-friendly and factual. Avoid urgency theater, unverifiable promises, aggressive conversion language, or casual humor.

## Typography

Cinzel is reserved for short page and section titles. It works as display type but becomes dense when Portuguese medical terms wrap.

Montserrat is used for body copy, labels, navigation, buttons, and every card title. Card titles must declare `font-sans` because the global heading rule uses Cinzel.

Use relaxed line height for explanatory copy. Overlines are short, uppercase, and letter-spaced; they classify a page or item rather than repeat information already obvious from a homogeneous grid.

## Colour

New UI uses the tokens declared in `tailwind.config.ts` and `src/app/globals.css`:

- `copper` and `copper-deep`: conversion, links, active emphasis
- `teal` and `teal-deep`: headings, dark surfaces, secondary actions
- `beige` and `beige-soft`: hairlines and quiet fills
- `cream`: page ground and inverse buttons
- `straw`: small decorative accents and ratings

Do not introduce raw brand-colour literals in component styles. Decorative gradients should compose these tokens. Semantic exceptions need a specific meaning; they are not alternate brand colours.

## Shape and depth

Cards use `rounded-card`, currently 1.5rem, with a beige hairline. Large editorial panels may use a larger radius because they structure a page rather than repeat in a card grid.

Interactive destination cards rest on a small tinted shadow and lift 4px with a copper edge. Static information cards do not lift. A surface must not imply clickability unless it has a destination.

Shadows should be soft and tinted toward teal or the element’s own colour. Avoid default black shadows on content cards.

## Section openings

`SectionHeader` owns both section-opening forms because they serve different levels:

- Homepage content sections use the copper-to-straw rule. It is the recurring brand signature and separates long sections in the single-page composition.
- Route and article introductions use a left-aligned uppercase overline. It classifies the page before its `h1` and supports scanning across deeper routes.

This is a contextual distinction, not two competing implementations. Do not hand-roll either form.

## Component choices

Use `LinkCard` when the whole surface leads to one destination. The title is the only anchor and its stretched pseudo-element covers the card. This keeps the accessible name concise. Keep every hover treatment mirrored for keyboard focus.

Use `InfoCard` for non-interactive facts, quotes, and timeline items. Its optional accent edge communicates status or emphasis without suggesting a destination.

Use `CallToActionCard` for a light closing argument with actions or supporting content. Use `HighlightCta`, `SoftCta`, and `InlinePromptCta` for their distinct dark, muted, and horizontal compositions. Their layouts carry different meaning and should not be hidden behind a broad tone prop.

Use `BookingCard` where WhatsApp and phone are the paired booking routes. Use `.tile` for grouped facts and chips that do not need a full card surface.

## Interaction and accessibility

Every interactive element needs a visible keyboard focus state. Hover motion must be subtle and should be disabled or avoided when reduced motion is requested. Touch devices must not retain hover-only surface states.

Preserve semantic heading order when using component props such as `titleAs`. Decorative CTA labels inside stretched-link cards stay hidden from assistive technology; the title names the link.

All `data-conversion` values are analytics contracts. Preserve each value verbatim during presentation refactors.

## Content and implementation rules

- Keep public copy in Brazilian Portuguese.
- Use local optimized images through `next/image` with accurate alt text and responsive `sizes`.
- Prefer the existing Tailwind brand tokens and shared components over inline styles.
- Keep contact data and medical credentials aligned with `src/constants.ts`, public content, metadata, schema, and crawler guidance.
- Treat `.design-ref/` as historical layout evidence only. Its Curitiba details, old phone numbers, and Newsreader/Manrope typography are stale and must never be copied into public content.

The migration inventory and rationale live in `docs/design-system-audit.md`. The implementation sequence and acceptance constraints live in `.specs/features/design-system-consolidation/spec.md`.
