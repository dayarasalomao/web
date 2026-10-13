# Dra. Dayara Salomão Website

Public website for Dra. Dayara Salomão, a coloproctologist in Campo Grande, Brazil. The site is a Next.js App Router project focused on medical positioning, patient education, SEO, and appointment conversion.

> **Campo Grande cutover prepared (2026-07-19):** The site now targets Campo Grande/MS, with the first attendance on 2026-08-05. Curitiba was removed as a practice location; only truthful professional-history references remain. The external Doctoralia profile still points at Curitiba/CRM-PR, so the site omits that link until the profile is migrated.

## Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS 3 plus shared styles in `src/app/globals.css`
- Vercel Analytics, Speed Insights, and optional Google Tag Manager
- Markdown/MDX-powered blog content under `content/posts`

## Common Commands

```bash
npm run dev
npm run build
npm run lint
npm run test:unit
npm run audit:seo
npm run e2e
```

## Project Layout

```text
content/posts/                  Blog article source files
docs/                           Editorial and SEO reference docs
public/assets/                  Production WebP photos used by the UI
public/core/                    Logo and lettering assets used by the UI
public/llms.txt                 AI crawler guidance
public/robots.txt               Static crawler policy
src/app/                        App Router routes, metadata, sitemap, layout
src/components/                 Homepage sections and shared UI
src/constants.ts                Contact, SEO, schema, sitemap, and analytics constants
src/lib/                        Blog parsing, treatment data, SEO, structured data
tests/                          Unit and Playwright tests
```

## Content Notes

Most homepage copy lives directly in section components. Shared contact details, SEO strings, credentials, schema inputs, sitemap images, and analytics flags live in `src/constants.ts`. Blog articles live in `content/posts`, treatment landing pages are backed by structured data in `src/lib/treatments.ts`, and reusable practitioner biography data lives in `src/lib/profile.ts`. The standalone `/sobre` route is the canonical professional profile linked from article bylines.

All WhatsApp CTAs use `WHATSAPP_URL`, which pre-fills the shared `WHATSAPP_MESSAGE` and identifies the website as the contact source.

When changing contact details, credentials, treatments, or SEO positioning, check the relevant component, `src/constants.ts`, `docs/website_content.md`, and `public/llms.txt`. The repeatable Search Console/GA4 workflow and the attributed Google Business Profile URL are documented in `docs/seo-local-operacao.md`.

Blog frontmatter supports structured `sources` and an enriched primary `image` (`src`, `alt`, `caption`, `width`, and `height`). Sources are rendered visibly and mirrored to `Article.citation`; enriched images generate `ImageObject` data and sitemap image entries. Keep intrinsic dimensions for every Markdown image in `src/lib/editorial-images.ts` to prevent layout shift.

Optional `coverImage` uses the same fields/validation as `image` and overrides only card/social/schema/sitemap media; `image` continues to describe the main body illustration. The selected image is `coverImage ?? image ?? first Markdown image`. The sitemap lists the selected cover and all Markdown body images, without duplicates per article. Generated editorial imagery is tracked in `docs/blog-generated-images-manifest.json`; keep AI provenance in the manifest, use neutral illustration captions, and obtain physician/editorial review before merge.

Blog images are placed editorially in Markdown beside the matching explanation, before the final H2. Never stack figures or put them inside lists, tables, FAQ, sources, or CTA sections. Secondary image captions may use the Markdown title (`![alt](src "existing caption")`); preserve medical disclaimers. Blog cards use decorative, uncropped 16:9 media and a branded panel when no image exists.

Blog search titles use optional `seoTitle` (fallback: `title`); `title` remains the editorial H1. Use `Campo Grande (MS)` for local page titles. Keep educational articles specific to their questions, and link the specialist-choice guide to the canonical Campo Grande location page. Supplied Word image mappings are documented in `docs/blog-images-word-cross-reference.md` and `docs/blog-images-word-manifest.json`. Clinical adaptations and illustration provenance still need physician review before merge.

Local entity links are intentionally separate: `GOOGLE_BUSINESS_PROFILE_URL` belongs to the physician, while `CLINIC_GOOGLE_MAPS_URL` belongs to the Instituto clinic location. `src/lib/seo-map.ts` assigns strategic searches to canonical pages and `npm run audit:seo` checks the editorial graph for conflicts and broken links.

## Environment

Analytics-related flags:

```bash
NEXT_PUBLIC_GOOGLE_TAG_ID=
NEXT_PUBLIC_ANALYTICS_DEBUG=
```

Google Tag Manager renders only when analytics are enabled and the tag starts with `GTM-`.

## Deployment

The deployment target is Vercel. `next.config.ts` includes a canonical redirect from `dayarasalomao.vercel.app` to `https://www.dayarasalomao.com.br` plus security headers.
