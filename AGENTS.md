# AGENTS.md

This file provides guidance to Codex when working with code in this repository.

## Project Overview

This repository contains the public website for Dra. Dayara Salomão, a coloproctologist based in Curitiba, Brazil. The site is primarily a Portuguese landing page focused on trust, medical positioning, and appointment conversion, plus a dedicated privacy policy route.

Most work in this repo falls into one of four categories:

- content updates for medical copy, credentials, or contact details
- visual polish on the single-page marketing experience
- SEO / metadata / structured-data maintenance
- deployment-safe fixes for accessibility, performance, or analytics

## Current Stack

- **Framework**: Next.js `16.2.1` with the App Router
- **React**: React `19.2.4`
- **Language**: TypeScript `5`
- **Styling**: Tailwind CSS `3.4.16` plus custom CSS in [`src/app/globals.css`](./src/app/globals.css)
- **Linting**: ESLint `9` with flat config in [`eslint.config.mjs`](./eslint.config.mjs)
- **Analytics**: `@vercel/analytics`, `@vercel/speed-insights`, and Google Tag Manager via `@next/third-parties/google`
- **Deployment target**: Vercel

Do not assume older documentation in the repo is correct. The checked-in `README.md`, `CLAUDE.md`, `public/llm.txt`, and previous `AGENTS.md` content have drifted from the actual app setup.

## Development Commands

```bash
npm run dev    # next dev --turbopack
npm run build  # production build
npm run start  # production server
npm run lint   # currently broken: script still points to `next lint`
```

Linting is currently misconfigured for the checked-in dependency set:

- `npm run lint` fails because `next lint` is no longer valid in the current setup.
- Direct ESLint invocation also errors with the current `eslint.config.mjs` compat usage.

If a task requires linting, expect to fix the lint command/config first instead of treating it as a healthy baseline.

## Repository Layout

```text
src/
  app/
    layout.tsx                 # global metadata, JSON-LD, fonts, analytics, skip link
    page.tsx                   # assembles the homepage sections
    politica-privacidade/      # privacy policy route
    robots.ts                  # robots metadata route
    sitemap.ts                 # sitemap metadata route
    globals.css                # CSS variables and shared utility classes
  components/
    Header.tsx
    Hero.tsx
    About.tsx
    WhenToSeek.tsx
    Diseases.tsx
    Treatments.tsx
    Testimonials.tsx
    CV.tsx
    Contact.tsx
    Footer.tsx
  constants.ts                 # contact info, SEO strings, schema inputs, analytics flags

public/
  assets/                      # production photos used by the UI
  core/                        # logos and brand marks
  backup/                      # original/backup image files
  llm.txt                      # AI crawler guidance

docs/
  website_content.md           # editorial/reference copy, not imported by the app
```

There is no active `public/temp` directory in the repo.

## How the App Is Put Together

The homepage is a single composition in [`src/app/page.tsx`](./src/app/page.tsx). Each major section is a separate component under [`src/components`](./src/components):

- `Header`: sticky navigation with a mobile menu and WhatsApp CTA
- `Hero`: main positioning, logo lettering, primary CTA
- `About`: short professional introduction and portrait
- `WhenToSeek`: symptom-oriented education section
- `Diseases`: treated conditions
- `Treatments`: procedures and technologies
- `Testimonials`: client-side testimonial carousel
- `CV`: qualifications timeline
- `Contact`: location, phone, email, and booking CTAs
- `Footer`: credentials, contact summary, and privacy-policy link

There is one additional public route at [`src/app/politica-privacidade/page.tsx`](./src/app/politica-privacidade/page.tsx).

## Content Source of Truth

Content is split across multiple places. This matters when editing.

- [`src/constants.ts`](./src/constants.ts) contains shared business/contact data, SEO metadata, schema inputs, sitemap image list, and analytics flags.
- Most on-page medical copy is hardcoded directly inside the section components.
- [`docs/website_content.md`](./docs/website_content.md) is a reference document that mirrors much of the content, but the app does not import it at runtime.
- [`public/llm.txt`](./public/llm.txt) is another manually maintained content surface for AI crawlers.

When updating copy, do not assume a single source of truth exists. If the change affects contact details, credentials, treatments, testimonials, or SEO messaging, check whether the same information also appears in:

- [`src/constants.ts`](./src/constants.ts)
- the relevant component file in [`src/components`](./src/components)
- [`docs/website_content.md`](./docs/website_content.md)
- [`public/llm.txt`](./public/llm.txt)
- [`src/app/politica-privacidade/page.tsx`](./src/app/politica-privacidade/page.tsx)

Phone and WhatsApp data are currently not perfectly aligned across all files. Verify public-facing numbers before changing them.

## Styling System

The current design system is a mix of Tailwind utilities and CSS variables.

- Brand color variables live in [`src/app/globals.css`](./src/app/globals.css):
  - `--color-copper`: `#A35442`
  - `--color-teal`: `#1D414C`
  - `--color-beige`: `#D7CBBF`
  - `--color-cream`: `#F4F3F2`
  - `--color-straw`: `#D1AF8B`
- Tailwind extends those colors in [`tailwind.config.ts`](./tailwind.config.ts) as `copper`, `teal`, `beige`, `cream`, and `straw`.
- Fonts are loaded in [`src/app/layout.tsx`](./src/app/layout.tsx):
  - Montserrat -> `--font-geist-sans`
  - Cinzel -> `--font-cinzel`
- Shared utility classes such as `.container`, `.card`, `.btn`, `.btn-primary`, and `.btn-secondary` are defined in [`src/app/globals.css`](./src/app/globals.css).

Prefer the current CSS-variable and Tailwind-token approach when editing styles.

Some files still contain stale utility names from an earlier styling pass, especially in [`src/components/About.tsx`](./src/components/About.tsx), such as:

- `brand-*`
- `primary-*`
- `secondary-*`
- `shadow-elegant`
- `shadow-soft`
- sizing/opacity utilities that are not part of the current Tailwind config

Do not copy those patterns into new work. Either use the existing CSS variables with inline styles, or use the actual Tailwind tokens defined in `tailwind.config.ts`.

## SEO, Metadata, and Security

SEO and machine-readable metadata are an important part of this repo.

- [`src/app/layout.tsx`](./src/app/layout.tsx) defines the global `metadata` object and injects medical-business JSON-LD.
- [`src/app/sitemap.ts`](./src/app/sitemap.ts) publishes entries for the homepage and privacy-policy page.
- [`src/app/robots.ts`](./src/app/robots.ts) publishes crawler rules and a sitemap reference.
- [`next.config.ts`](./next.config.ts) adds:
  - a canonical redirect from `dayarasalomao.vercel.app` to `https://www.dayarasalomao.com.br`
  - security headers including CSP, HSTS, `X-Frame-Options`, and related hardening

If you change domain, images, doctor metadata, contact details, or privacy-policy behavior, review all of those files together.

## Analytics and Environment Variables

Runtime analytics behavior is controlled from [`src/constants.ts`](./src/constants.ts):

- `NEXT_PUBLIC_GOOGLE_TAG_ID`
- `NEXT_PUBLIC_ANALYTICS_DEBUG`

Google Tag Manager is only rendered when analytics are enabled and the tag starts with `GTM-`.

[`.env.example`](./.env.example) exists, but it does not document every runtime flag currently used by the app. Keep that in mind when changing analytics behavior.

## Content and Tone Constraints

- Keep all user-facing content in Brazilian Portuguese.
- Medical copy should stay accurate, patient-friendly, and non-sensational.
- The site should remain professional, approachable, and conversion-oriented.
- Preserve accessibility basics: semantic headings, usable focus states, alt text, and readable contrast.
- This is a healthcare site, so avoid introducing casual humor, aggressive marketing language, or unverifiable medical claims.

## Practical Editing Notes

- Many sections are static arrays embedded in component files. Simple content edits may require touching multiple files rather than a CMS-like data source.
- Images are local and already optimized to `.webp` for production; originals/backups also exist under [`public/backup`](./public/backup).
- If you update contact details, review CTA links in `Header`, `Hero`, `Diseases`, `Treatments`, `Contact`, and `Footer`.
- If you update credentials or specialties, review both visible copy and schema data in [`src/constants.ts`](./src/constants.ts).
- If you clean up docs, note that `README.md` and `CLAUDE.md` currently contain outdated stack information.
