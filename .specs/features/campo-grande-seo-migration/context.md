# Campo Grande SEO Migration Context

**Status**: Draft

## User Decisions Captured

- The doctor is expected to move from Curitiba to Campo Grande/MS, but the new address and final go-live details are not confirmed.
- For now, keep factual Curitiba references where they are true:
  - Eco Medical Center contact/location
  - current Curitiba address and phone
  - CV/history items such as Santa Casa de Curitiba
- Do not add active Campo Grande address, clinic, phone, Google Maps URL, schema geo coordinates, or appointment availability until confirmed.
- The goal is to prepare a PR ahead of time so the final Campo Grande SEO switch can happen quickly once the doctor says "GO".
- The PR may prepare architecture, draft content, noindex pages, tests, and implementation hooks before the final migration.

## Compliance Constraints

- Medical copy must stay educational and sober.
- Do not use guarantees, superiority claims, fake reviews, fake clinic ownership, fake NAP, or unverifiable credentials.
- CRM/RQE/specialty should remain visible where relevant.
- If a clinic is not owned by the doctor, schema must not model it as her owned business.

## Open Facts Required Before Final Campo Grande Launch

| Fact | Needed For |
| --- | --- |
| Campo Grande clinic name | Visible NAP, schema, location page |
| Full street address and postal code | `PostalAddress`, contact page, location page |
| Google Maps place URL or map link | Local page, `sameAs`, user navigation |
| Geo coordinates | `GeoCoordinates`, local schema |
| Phone/WhatsApp strategy | CTAs, schema telephone, footer/contact |
| Active availability date | Launch copy and whether Curitiba remains active |
| CRM/MS status if applicable | Credential display and CFM link strategy |
| Confirmed services in Campo Grande | Treatment/location service lists |
| Colonoscopy applicability | Whether to create colonoscopy SEO pages |

## Current Repo Evidence

- Active global city is `SEO_LOCATION = 'Curitiba'` in `src/constants.ts`.
- Active NAP is Eco Medical Center, Rua Goias, 70, Curitiba/PR.
- Blog engine exists under `content/posts/*.md` and `src/lib/blog.ts`.
- Treatment engine exists in `src/lib/treatments.ts`.
- There is no location hub route yet.
- `public/llm.txt` is stale and does not include new blog/treatment routes.

## Curitiba → Campo Grande Reference Change Map

Inventory of every Curitiba reference in the repo, so the July 2026 cutover is mechanical. There is **no literal `"em Curitiba"` string** — it is composed at runtime from `SEO_LOCATION`.

### 1. Single source of truth (change one line, six surfaces update)

| File · Line | Current | Cascades to |
| --- | --- | --- |
| `src/constants.ts:31` | `SEO_LOCATION = 'Curitiba'` | `SEO_TITLE` (33), `SEO_DESCRIPTION` (34), `SEO_KEYWORDS` (35), `SEO_OG_DESCRIPTION` (37), `SEO_TWITTER_DESCRIPTION` (38), `SEO_IMAGE_ALT` (41), `BLOG_DEFAULT_OG_IMAGE_ALT` (46) |

Changing line 31 to `'Campo Grande'` updates the page title, meta description, OG/Twitter descriptions, image alts, and keyword list in one edit.

### 2. NAP / location data — update with confirmed Campo Grande facts

| File · Line | Current (Curitiba) | What |
| --- | --- | --- |
| `src/constants.ts:20` | `ECO_TELEPHONE_NUMBER = '(41) 3123-6550'` | Clinic phone (area code 41 = PR) |
| `src/constants.ts:58-59` | `DOCTORALIA_URL` `.../coloproctologista/curitiba` | Doctoralia profile (city slug) |
| `src/constants.ts:61` | `GOOGLE_MAPS_URL` `maps.app.goo.gl/8pzUEGq1YnVFmsf4A` | Maps pin (Água Verde) |
| `src/constants.ts:76-82` | `BUSINESS_ADDRESS` Rua Goiás 70, Água Verde, Curitiba/PR, 80620-060 | Schema `PostalAddress` |
| `src/constants.ts:84-87` | `BUSINESS_GEO` lat -25.4646652, lng -49.2905794 | Schema `GeoCoordinates` |
| `src/constants.ts:52` | `CRM_STATE = 'PR'` | Only if she registers CRM-MS (affects `CFM_REGISTRY_URL`) |
| `src/constants.ts:100` | `PHYSICIAN_DATA.clinic = 'Eco Medical Center'` | Clinic name in schema |
| `src/components/Footer.tsx:27` | `'Eco Medical Center - Curitiba, PR'` | Footer contact line |
| `src/components/Contact.tsx:24` | `'Curitiba, Paraná'` | Contact section |
| `public/llms.txt:9` | `Atendimento atual: Eco Medical Center, Água Verde, Curitiba/PR` | AI crawler guidance |
| `docs/website_content.md:91` | `Rua Góias, 70 - Água Verde, Curitiba, Paraná` | Editorial reference copy |

### 3. Historical / factual — KEEP (do not change on move)

| File · Line | Current | Why keep |
| --- | --- | --- |
| `src/components/CV.tsx:15` | `'Santa Casa de Curitiba'` | Residency history — true regardless of where she practices |
| `docs/website_content.md:82` | `Residência médica em Cirurgia Geral pela Santa Casa de Curitiba em 2022` | Same — CV fact |

### 4. Project prose docs — update overview text when finalized

| File · Line | Current |
| --- | --- |
| `CLAUDE.md:7` | "a coloproctologist in Curitiba, Brazil" |
| `README.md:3` | "a coloproctologist in Curitiba, Brazil" |
| `AGENTS.md:7` | "a coloproctologist based in Curitiba, Brazil" |

> Keep this table in sync if files move. The exact Campo Grande values (clinic, address, phone, geo, Maps, Doctoralia) come from the "Open Facts Required" table above once confirmed.
