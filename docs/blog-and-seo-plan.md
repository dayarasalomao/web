# Blog System Port + SEO Completeness — `dayarasalomao.com.br`

Spec-driven plan. Ports the markdown-driven blog from `analu-procto` (production reference) into `dayara-salomao` and finishes the SEO pass from GitHub issue #2. Designed so the same pattern drops into `dra-ana-pierin` and `versiani` next with only `src/constants.ts` changes.

---

## 1. Context

The dayara-salomao marketing site is a single-page Next.js 16 App Router app with a solid SEO foundation already shipped (metadata API, `MedicalOrganization` JSON-LD, GTM/GA4 via `@next/third-parties`, HSTS + canonical redirect, CSP). What it lacks is a **URL surface to capture long-tail medical queries** — today the Diseases / Treatments / WhenToSeek cards are dead static text.

The sibling repo `analu-procto` (Dra. Ana Luiza Rocha) already runs a production markdown-driven blog (`next-mdx-remote` + `gray-matter` + `remark-gfm` + `schema-dts`). Since 2 more medical sites need the same pattern, this port produces a **reusable standard** — not a one-off. Everything generic goes in `src/lib/` + `src/components/ui/`; every client-specific value lives in `src/constants.ts`.

Outcome after merge: `/blog` + `/blog/[slug]` indexable on dayara, landing cards conditionally link to matching posts, sitemap/robots/JSON-LD updated, breadcrumbs on deep routes, authoring playbook + CFM compliance doc in `docs/`. `/blog` is **not** exposed in the header yet (de-risked production rollout).

---

## 2. Architecture decisions

| Decision | Choice | Why |
|---|---|---|
| CMS vs markdown | Local `content/posts/*.md` in git | 1 author, 3 sites, ~weekly cadence. Zero infra, versioned, free preview via `npm run dev`. Revisit if the doctor wants direct editing or post count > 80. |
| Renderer | `next-mdx-remote@^6` (RSC) | Enables `<MdxImage>` (`next/image`) + future components. Matches analu-procto so `lib/` ports verbatim. Output is pure HTML in RSC = zero client JS. |
| Posts dir | `content/posts/` at repo root | Content lives beside `public/`, not under `src/`. Reads as data, not code. Matches reference repo. |
| Validation | Skip vitest for v1 | Playwright e2e + `next build` covers the pipeline. ~40 LOC of pure fns — unit tests premature. |
| E2E | Playwright (chromium only) | Low cost (`npm i -D @playwright/test`), catches deploy regressions on /blog, /sitemap.xml, /robots.txt, JSON-LD. |
| Header link | Not added in v1 | URL-only rollout → revert-friendly if content isn't ready. Link the header in a follow-up after 3–4 posts exist. |

---

## 3. Content model

```ts
export type TargetAudience = 'patients' | 'referring-doctors' | 'general-public'
export type ContentIntent  = 'awareness' | 'consideration' | 'decision'

export interface FAQItem       { question: string; answer: string }
export interface BlogCardImage { src: string; alt: string }

export interface BlogPostMeta {
  title: string                 // < 70 chars
  metaDescription: string       // 140–160 chars
  slug: string                  // kebab-case, must match filename
  publishDate: string           // YYYY-MM-DD
  lastModified: string          // YYYY-MM-DD
  primaryKeyword: string
  secondaryKeywords: string[]   // 3–8
  targetAudience: TargetAudience
  intent: ContentIntent
  featured?: boolean
  order?: number                // lower = earlier; pins above date-sorted
  faqs?: FAQItem[]              // drives FAQPage schema + visible block
}
export interface BlogPost extends BlogPostMeta {
  content: string
  excerpt: string
  readingTime: number
  cardImage?: BlogCardImage
}
```

**Italic-hook excerpt rule (port verbatim):** the first non-heading paragraph of the body — if wrapped in standalone `*…*` or `_…_` — becomes the excerpt/card subtitle with markers stripped. Otherwise, the first paragraph with emphasis stripped. Authors place an italic hook immediately after frontmatter.

**Sort:** two-tier — `order` asc (those with `order` first), then `publishDate` desc.

**Validation:**
- Slug mismatch (filename vs frontmatter) → `console.warn`, filename wins.
- Missing required frontmatter in a single file → skip in `getAllPosts` with `console.error`; `getPostBySlug` throws (build surfaces the error).
- Malformed date → warn + fall back to `Date.now()`; never crash.

---

## 4. File layout

**New:**
```
content/posts/<slug>.md                          (seed posts)
src/lib/blog.ts                                  (parser + schema generator)
src/lib/seo.ts                                   (buildCanonical, buildOgMetadata, buildPostMetadata)
src/lib/structured-data.ts                       (MedicalOrganization, Physician, WebSite, Article, BreadcrumbList, FAQPage builders)
src/lib/post-links.ts                            (getPostHref + DISEASE_TO_SLUG / TREATMENT_TO_SLUG / WHEN_TO_SEEK_TO_SLUG maps)
src/app/blog/page.tsx                            (index)
src/app/blog/[slug]/page.tsx                     (detail)
src/components/ui/Breadcrumb.tsx
src/components/ui/CallToActionCard.tsx
src/components/ui/BlogCard.tsx
src/components/ui/MdxImage.tsx
playwright.config.ts
tests/e2e/blog.spec.ts
docs/blog-content-playbook.md
docs/cfm-compliance-guidelines.md
docs/seo-spec.md
```

**Modified:**
```
src/app/layout.tsx              (replace inline jsonLd with buildGlobalGraph() — adds WebSite + Physician nodes)
src/app/sitemap.ts              (extend with /blog + dynamic post entries, lastModified from frontmatter)
src/constants.ts                (add CRM_NUMBER, RQE_NUMBER, DOCTORALIA_URL, GOOGLE_MAPS_URL, TWITTER_HANDLE, BLOG_DEFAULT_OG_IMAGE)
src/components/Diseases.tsx     (wrap cards in conditional <Link>)
src/components/Treatments.tsx   (wrap cards in conditional <Link>)
src/components/WhenToSeek.tsx   (wrap cards in conditional <Link>)
src/components/Footer.tsx       (add Doctoralia + CFM registry external trust links)
src/components/Hero.tsx         (verify single <h1> per page)
package.json                    (deps + e2e scripts)
```

Reference files in analu-procto to port from:
- `src/lib/blog.ts` — `getAllPosts`, `getPostBySlug`, `getAllPostSlugs`, `generateBlogPostSchema`, `extractItalicHook`, `extractFirstImage`, `calculateReadingTime`.
- `src/lib/constants.ts` — shape of client-specific surface.
- `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx` — routes.
- `src/components/ui/{Breadcrumb,CallToActionCard,MdxImage}.tsx` — UI.
- `tests/e2e/smoke.spec.ts` — Playwright patterns.

---

## 5. Parser / data-layer (`src/lib/blog.ts`)

```ts
export function getAllPosts(): BlogPost[]
export function getPostBySlug(slug: string): BlogPost | null
export function getAllPostSlugs(): string[]
export function generateBlogPostSchema(post: BlogPost): WithContext<Thing>   // @graph
export function getTargetAudienceLabel(a: TargetAudience): string
export function getContentIntentLabel(i: ContentIntent): string
```

**Implementation contract:**
- Reads `path.join(process.cwd(), 'content/posts')`.
- Uses `gray-matter` for frontmatter, `remark-gfm` passed to `<MDXRemote>` options.
- Reading time = `Math.ceil(content.split(/\s+/).filter(Boolean).length / 200)`.
- JSON-LD graph for a post: `MedicalWebPage` + `Article` + `BreadcrumbList` + `FAQPage` (if `faqs` present).
- JSON-LD serialized via `JSON.stringify(graph).replace(/</g,'\\u003c')` before `dangerouslySetInnerHTML`.
- `schema-dts` types used for compile-time schema validation.

---

## 6. Routes

### `/blog` (index)

```ts
export const metadata: Metadata = {
  title: 'Blog — Dra. Dayara Salomão | Coloproctologia',
  description: '...140–160 chars with primary keywords...',
  alternates: { canonical: `${SITE_URL}blog` },
  openGraph: { type: 'website', url: `${SITE_URL}blog`, siteName: BUSINESS_NAME, images: [...] },
  twitter: { card: 'summary_large_image', creator: TWITTER_HANDLE, images: [...] },
  robots: { index: true, follow: true, googleBot: { 'max-image-preview': 'large' } },
}
```

Body: `<Breadcrumb>` → `<h1>` → lede → grid of `<BlogCard>` → `<CallToActionCard>` → "← Voltar ao início" link. Empty-state: "Em breve" if `getAllPosts()` returns `[]`.

### `/blog/[slug]` (detail)

```ts
export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Post não encontrado', robots: { index: false } }
  return buildPostMetadata(post)   // in src/lib/seo.ts
}

export default async function Page({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  // 1. <script type="application/ld+json"> with generateBlogPostSchema(post)
  // 2. <Breadcrumb items={[Início, Blog, post.title]} />
  // 3. <header>: badges, <h1>, metaDescription, byline, date, reading time
  // 4. <article class="prose"><MDXRemote source={post.content} options={{mdxOptions:{remarkPlugins:[remarkGfm]}}} components={{img: MdxImage}} /></article>
  // 5. if post.faqs?.length: <section id="faq"><h2>Perguntas frequentes</h2> <details>…</details></section>
  //    (must render visibly — unrendered FAQ schema risks a Google penalty)
  // 6. <CallToActionCard> with WHATSAPP_URL CTA
  // 7. "← Voltar" + "Última atualização: …"
}
```

`buildPostMetadata` returns OG `article` type with `publishedTime`, `modifiedTime`, `authors`, `article:tag=primaryKeyword`, canonical `${SITE_URL}blog/${slug}`, and post `cardImage` (or `SEO_IMAGE` fallback).

---

## 7. SEO completeness — mapped to issue #2

| # | Requirement | File · Action |
|---|---|---|
| 1 | Unique metadata per indexable page | `layout.tsx` (root) ✅; `blog/page.tsx` const; `blog/[slug]/page.tsx` `generateMetadata` |
| 2 | Canonical URL on every indexable page | `src/lib/seo.ts::buildCanonical(path)` used by every `alternates.canonical` |
| 3 | OG + Twitter | Root ✅; `buildOgMetadata`, `buildTwitterMetadata` consumed by blog pages |
| 4 | robots.txt | `src/app/robots.ts` ✅ — no change |
| 5 | sitemap.xml with blog | `src/app/sitemap.ts` — add `{url:'${SITE_URL}blog',priority:0.8}` + loop posts (`priority:0.7`, `lastModified: new Date(post.lastModified)`) |
| 6 | JSON-LD: MedicalOrganization, Physician, WebSite, Article, BreadcrumbList, FAQPage | Move current inline `jsonLd` into `src/lib/structured-data.ts::buildGlobalGraph()`; add `WebSite` + lift `physician` into its own `@id`-linked `Physician` node with `alumniOf`, `hasCredential` (CRM), `sameAs` (Instagram, Facebook, Doctoralia). `buildBlogPostGraph(post)` lives in same file. |
| 7 | Visible breadcrumb UI | `src/components/ui/Breadcrumb.tsx` on `/blog`, `/blog/[slug]`, `/politica-privacidade` |
| 8 | BreadcrumbList schema | Embedded via `buildBreadcrumbGraph(items)` inside post graph + blog index page |
| 9 | Internal linking | Landing cards → posts (Section 8). "Leia também" block on posts deferred to v2. |
| 10 | External trust links | Footer.tsx: add Doctoralia, CFM registry (`https://portal.cfm.org.br/busca-medicos/?crm=${CRM_NUMBER}&uf=PR`) |
| 11 | Heading hierarchy | Audit Header.tsx + Hero.tsx — one visible `<h1>` per page; demote brand to `<p>` if duplicated |
| 12 | Local SEO | `BUSINESS_ADDRESS` + `BUSINESS_GEO` ✅. Add `areaServed: City(Curitiba)` to Physician node; add Google Maps place URL to `sameAs` |
| 13 | Image alt audit | Grep `Image` / `img`; fix generic alts. All `public/assets/*.webp` already descriptively named |
| 14 | Crawlability | `politica-privacidade/page.tsx` — confirm `robots:{index:false}` in metadata |
| 15 | Search Console ready | Manual: submit `/sitemap.xml`, request indexing for `/` + 2–3 top posts |

**Indexation map** — `index:true`: `/`, `/blog`, `/blog/:slug`. `index:false`: `/politica-privacidade`.

---

## 8. Landing cards → blog posts

Cards stay visually identical. Wrap each in a conditional `<Link>` via `src/lib/post-links.ts::getPostHref(slug)` — returns `/blog/${slug}` if the post file exists, else `null` (render plain card, no dead link). Posts auto-light-up as they ship.

### 8.1 Seed posts — 8 pieces from `docs/blog-posts.md` (all treatment-focused)

| # | Title (H1) | Slug (filename) | Primary keyword |
|---|---|---|---|
| 1 | Hemorroidectomia de Alta Performance: A Precisão do Laser de CO2 | `hemorroidectomia-laser-co2` | hemorroidectomia laser CO2 |
| 2 | Ligadura Elástica: Praticidade e Eficácia no Tratamento de Hemorroidas Internas | `ligadura-elastica-hemorroidas-internas` | ligadura elástica hemorroidas |
| 3 | Cisto Pilonidal: Tratamento Minimamente Invasivo com Laser e Vídeo (EPSiT) | `cisto-pilonidal-laser-epsit` | cisto pilonidal laser EPSiT |
| 4 | Toxina Botulínica: Alívio da Dor e Cicatrização sem Cirurgia | `toxina-botulinica-fissura-anal` | toxina botulínica fissura anal |
| 5 | Cirurgia de Hemorroidas sem Corte: Tecnologia e Rápida Recuperação | `hemorroidas-sem-corte-laser-diodo` | hemorroidas sem corte laser |
| 6 | Fístula Anal: Precisão com Laser e Vídeo para a Preservação da Continência | `fistula-anal-laser-vaaft-filac` | fístula anal laser VAAFT FiLaC |
| 7 | Remoção de Plicomas com Laser de CO2: Estética e Precisão Cirúrgica | `plicoma-anal-laser-co2` | plicoma anal laser CO2 |
| 8 | HPV Perianal: Vaporização a Laser de CO2 | `hpv-perianal-laser-co2` | HPV perianal laser CO2 |

All 8 post bodies exist verbatim in `docs/blog-posts.md` lines 1–155 — step 8 of the implementation copies each section into its own `.md` file, prepends frontmatter, and adds an italic hook paragraph (extracted or lightly adapted from the lede).

**Important content notes**:
- Line 128–130 of `docs/blog-posts.md` contains a copywriting brief leaked into the HPV post ("Para vender o tratamento…" + "Aqui está o texto otimizado…"). **Strip these lines** — they're not for publication.
- All posts currently use `##` for the H1-level title. Parser will not convert — author should either change the first `##` to `#`, or the post page renders the frontmatter `title` as the visible `<h1>` and treats all body `##` as `<h2>`. **Recommend**: page renders frontmatter `title` as `<h1>`; post bodies start directly at `##` subsections. This requires editing each seed body to drop the first `## **Title**` line (it's the title, already in frontmatter).
- Each post gets a `faqs:` array (2–3 Q&A) derived from the content for FAQPage schema + visible FAQ block.

### 8.2 Card → slug mappings (confirm in PR)

*Treatments (`src/components/Treatments.tsx`):*
| Card | Slug |
|---|---|
| Cirurgia de hemorroidas com laser de CO2 | `hemorroidectomia-laser-co2` |
| Cirurgia de hemorroidas sem corte | `hemorroidas-sem-corte-laser-diodo` |
| Ligadura elástica | `ligadura-elastica-hemorroidas-internas` |
| Fístula VAAFT / FiLaC | `fistula-anal-laser-vaaft-filac` |
| Cisto pilonidal EPSiT | `cisto-pilonidal-laser-epsit` |
| Plicoma laser CO2 | `plicoma-anal-laser-co2` |
| Toxina botulínica | `toxina-botulinica-fissura-anal` |
| HPV laser / eletrocoagulação | `hpv-perianal-laser-co2` |

*Diseases (`src/components/Diseases.tsx:6-58`):* map each disease card to its matching treatment post where a clean match exists:
- Doença Hemorroidária → `hemorroidectomia-laser-co2` (primary)
- Fissura Anal → `toxina-botulinica-fissura-anal`
- Fístula Anal → `fistula-anal-laser-vaaft-filac`
- HPV Anal → `hpv-perianal-laser-co2`
- Cisto Pilonidal → `cisto-pilonidal-laser-epsit`
- Prurido Anal, Constipação, Diarreia Crônica, SII, Hidradenite, DII → **no post yet** → cards render plain (no link). Opportunity list for v2 content.

*WhenToSeek (`src/components/WhenToSeek.tsx`):* left unlinked for now — current content is treatment-specific; symptom-awareness posts (e.g., "Sangramento anal quando procurar") are v2 content.

---

## 9. Reusability contract

**Generic — copy-pastes across sites unchanged:**
- `src/lib/{blog,seo,structured-data}.ts`
- `src/components/ui/{Breadcrumb,CallToActionCard,BlogCard,MdxImage}.tsx`
- `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`
- `src/app/sitemap.ts`, `src/app/robots.ts`
- `playwright.config.ts`, `tests/e2e/blog.spec.ts`
- `docs/{seo-spec,blog-content-playbook,cfm-compliance-guidelines}.md`

**Client-specific — only in `src/constants.ts`:**
- `SITE_URL`, `SEO_*`, `BUSINESS_*`, `PHYSICIAN_DATA`, `MEDICAL_PROCEDURES`, `BUSINESS_RATING`
- New: `CRM_NUMBER`, `RQE_NUMBER`, `DOCTORALIA_URL`, `GOOGLE_MAPS_URL`, `TWITTER_HANDLE`, `BLOG_DEFAULT_OG_IMAGE`

Defer workspace-package extraction (`@medical-blog/core`) until site #3 ships the same files for the third time.

---

## 10. Implementation phases

One commit per numbered step unless bundled.

1. `npm i next-mdx-remote@^6 gray-matter@^4 remark-gfm@^4 schema-dts@^1.1.5`
2. `npm i -D @playwright/test && npx playwright install --with-deps chromium`
3. Extend `src/constants.ts` — add CRM, RQE, Doctoralia, Google Maps, Twitter handle, blog default OG.
4. Create `src/lib/seo.ts` — canonical + metadata helpers.
5. Create `src/lib/structured-data.ts` — graph builders; refactor `layout.tsx` to consume `buildGlobalGraph()`; add WebSite + Physician nodes.
6. Create `src/lib/blog.ts` — parser + `generateBlogPostSchema`.
7. Create `src/components/ui/{Breadcrumb,CallToActionCard,MdxImage,BlogCard}.tsx` (one commit).
8. Create `content/posts/` + seed posts (see Section 12 question).
9. Create `src/app/blog/page.tsx`.
10. Create `src/app/blog/[slug]/page.tsx`.
11. Update `src/app/sitemap.ts` with blog routes.
12. Create `src/lib/post-links.ts`; wire conditional `<Link>` in Diseases, Treatments, WhenToSeek.
13. Update `Footer.tsx` (Doctoralia + CFM registry). Audit Hero/Header heading hierarchy. Image alt pass.
14. `playwright.config.ts` + `tests/e2e/blog.spec.ts`; add `"e2e"` script to `package.json`.
15. Create `docs/{blog-content-playbook,cfm-compliance-guidelines,seo-spec}.md`.
16. `npm run build && npm run start && npm run e2e`.
17. Merge → Vercel deploy → Search Console submit sitemap.

---

## 11. Next SEO expansion recommendation — `/tratamentos` (not `/servicos`)

- Keyword volume in pt-BR: "tratamento hemorroidas", "tratamento fissura anal", "tratamento fístula laser" all have meaningful monthly volume. "Serviços de coloproctologia" is thin.
- Intent match: patients search `disease + tratamento`. URL token matches query.
- Schema fit: `MedicalTherapy` / `MedicalProcedure` maps 1:1 to `/tratamentos/:slug`.
- Funnel: blog (awareness) → `/tratamentos/:slug` (consideration) → WhatsApp (decision).
- Precedent: analu-procto already ships `/tratamentos` with per-procedure pages.

Build `/tratamentos` index + `/tratamentos/:slug` for the 8 procedures in `Treatments.tsx` as the phase right after this blog merges.

---

## 12. Confirmed decisions + remaining questions

**Confirmed:**
- **Content source** — 8 posts in `docs/blog-posts.md`, copied into `content/posts/*.md` during step 8 (strip the leaked copywriting brief on lines 128–130; move the `## Title` line into frontmatter).
- **Playwright in v1** — install chromium-only, 6 smoke tests.
- **Visible FAQ block** — render `<details>` on posts when `faqs:` present (matches FAQPage schema → passes Google rich-results).

**Still to confirm during implementation (non-blocking — can default or ask in PR):**
1. **CRM-PR / RQE** — Footer.tsx:115 suggests `CRM-PR 42596` / `RQE 33908`. Confirm before emitting in Physician schema.
2. **Doctoralia URL** — needed for Physician `sameAs` + Footer. Flag as TODO if missing.
3. **Google Maps place URL** — for Physician `sameAs`. Flag as TODO if missing.
4. **Twitter handle** — layout.tsx:87 uses `@dradayarasalomao` — confirm live before shipping.
5. **Faqs content** — draft 2–3 Q&A per post from body content (implementer proposes, user reviews in PR).

---

## 13. Verification

**Local:**
```
npm run build                          # zero errors, zero type errors
npm run start
# click-through: /, /blog, /blog/<slug> (each seed), /politica-privacidade
curl -s http://localhost:3000/sitemap.xml | grep "/blog/"
curl -s http://localhost:3000/robots.txt  | grep "Sitemap:"
npm run e2e
```

**Vercel preview:**
- `/sitemap.xml` includes all post slugs.
- View-source `/blog/<slug>` → canonical `<link>`, JSON-LD `<script>`, OG + Twitter tags.
- Lighthouse on `/` and `/blog/<slug>`: Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO = 100.

**Production:**
- Google Rich Results Test on `https://www.dayarasalomao.com.br/blog/<slug>` → Article + BreadcrumbList (+ FAQPage) recognised, zero errors.
- Schema.org Validator on `/` → zero errors.
- Facebook Sharing Debugger → OG image + description correct.
- Search Console: verify ownership, submit sitemap, request indexing on `/` + top posts, re-check in 7 days.

**Acceptance:**
- All 15 items in Section 7 shipped.
- Playwright green.
- `/blog/<slug>` visible on mobile with WhatsApp CTA.
- At least 1 post indexed within 14 days of Search Console submission.
