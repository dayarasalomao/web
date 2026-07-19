# Dra. Dayara Salomão Website

Public website for Dra. Dayara Salomão, a coloproctologist in Campo Grande, Brazil. The site is a Next.js App Router project focused on medical positioning, patient education, SEO, and appointment conversion.

> **Relocation completed (2026-07-19):** The practice moved from Curitiba/PR to Campo Grande/MS, with the first attendance on 2026-08-05. Curitiba is preserved as a historical, noindexed entry in `src/lib/locations.ts`. The Doctoralia profile still points at Curitiba/CRM-PR until it is migrated.

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

Most homepage copy lives directly in section components. Shared contact details, SEO strings, credentials, schema inputs, sitemap images, and analytics flags live in `src/constants.ts`. Blog articles live in `content/posts`, while treatment landing pages are backed by structured data in `src/lib/treatments.ts`.

When changing contact details, credentials, treatments, or SEO positioning, check the relevant component, `src/constants.ts`, `docs/website_content.md`, and `public/llms.txt`.

## Environment

Analytics-related flags:

```bash
NEXT_PUBLIC_GOOGLE_TAG_ID=
NEXT_PUBLIC_ANALYTICS_DEBUG=
```

Google Tag Manager renders only when analytics are enabled and the tag starts with `GTM-`.

## Deployment

The deployment target is Vercel. `next.config.ts` includes a canonical redirect from `dayarasalomao.vercel.app` to `https://www.dayarasalomao.com.br` plus security headers.
