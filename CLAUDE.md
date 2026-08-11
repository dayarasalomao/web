# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

This repository contains the public website for Dra. Dayara Salomão, a coloproctologist in Campo Grande, Brazil. The website is a Portuguese medical marketing and education site with homepage sections, a practitioner profile, treatment pages, blog articles, SEO metadata, structured data, analytics, and a privacy policy route.

> **Campo Grande cutover prepared (2026-07-19):** The site now targets Campo Grande/MS (Instituto do Aparelho Digestivo), with the first attendance on 2026-08-05. `BUSINESS_ADDRESS`, `BUSINESS_GEO`, `GOOGLE_MAPS_URL`, `SEO_LOCATION` and city mentions in `src/constants.ts` point to Campo Grande. Curitiba was removed from `src/lib/locations.ts`, and `/locais-de-atendimento/curitiba` returns 404; only truthful professional-history references remain. The external Doctoralia profile is not yet migrated, so `DOCTORALIA_URL` stays empty until a confirmed Campo Grande URL exists. The migration record lives in `.specs/features/campo-grande-seo-migration/context.md`.

## Stack

- Framework: Next.js 16 with App Router
- React: 19
- Language: TypeScript
- Styling: Tailwind CSS 3.4 plus `src/app/globals.css`
- Content: static TSX sections, structured treatment data, and Markdown blog posts
- Deployment: Vercel

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run test:unit
npm run e2e
```

## Important Paths

```text
content/posts/                  Blog source markdown
docs/website_content.md         Editorial reference copy
public/assets/                  WebP production photos
public/core/                    Logo and lettering assets
public/llms.txt                 AI crawler guidance
public/robots.txt               Static robots policy
src/app/layout.tsx              Global metadata, fonts, analytics, JSON-LD
src/app/sitemap.ts              Sitemap route
src/components/                 Homepage sections and shared components
src/constants.ts                Shared contact, SEO, schema, sitemap, analytics data
src/lib/blog.ts                 Blog parsing and metadata helpers
src/lib/profile.ts              Shared biography, qualifications, memberships
src/lib/treatments.ts           Treatment page data and mapping helpers
src/lib/structured-data.ts      Schema.org JSON-LD builders
```

## Content Rules

- Keep user-facing copy in Brazilian Portuguese.
- Medical copy should stay accurate, patient-friendly, and non-sensational.
- Avoid diagnosis, guaranteed outcomes, or aggressive marketing language.
- Preserve accessibility basics: semantic headings, meaningful alt text, keyboard access, focus states, and readable contrast.
- Contact details, credentials, treatments, testimonials, and SEO language can appear in more than one place. Check `src/constants.ts`, the relevant component, `docs/website_content.md`, and `public/llms.txt` before changing them.

## Styling Notes

Brand tokens are defined in `src/app/globals.css` and exposed through `tailwind.config.ts`:

- `copper`: `#A35442`
- `teal`: `#1D414C`
- `beige`: `#D7CBBF`
- `cream`: `#F4F3F2`
- `straw`: `#D1AF8B`

Fonts are loaded in `src/app/layout.tsx`:

- Montserrat as `--font-geist-sans`
- Cinzel as `--font-cinzel`

Use the existing tokens and utility classes instead of introducing new visual systems.

## SEO And Metadata

Global metadata is in `src/app/layout.tsx`; shared values live in `src/constants.ts`. Blog and treatment routes generate route-specific metadata and JSON-LD from `src/lib/seo.ts` and `src/lib/structured-data.ts`.

If domain, image, doctor credentials, contact information, or treatment content changes, review:

- `src/constants.ts`
- `src/app/layout.tsx`
- `src/app/sitemap.ts`
- `src/lib/structured-data.ts`
- `public/llms.txt`
- `public/robots.txt`

## Asset Policy

Production UI images should use optimized WebP files in `public/assets`. Keep only assets that are referenced by the app or needed for public SEO/social metadata. Original backups should live outside `public` if they are needed for design work.
