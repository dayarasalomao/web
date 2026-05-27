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

- Active global city is derived from `BUSINESS_ADDRESS_LOCALITY = 'Curitiba'` in `src/constants.ts`.
- Active NAP is centralized in `src/constants.ts`: Eco Medical Center, Rua Goiás, 70, 3º andar, Água Verde, Curitiba/PR, CEP 80620-060.
- Blog engine exists under `content/posts/*.md` and `src/lib/blog.ts`.
- Treatment engine exists in `src/lib/treatments.ts`.
- There is no location hub route yet.
- `public/llm.txt` is stale and does not include new blog/treatment routes.

## Curitiba → Campo Grande Reference Change Map

Inventory of every Curitiba reference in the repo, so the July 2026 cutover is mechanical. There is **no literal `"em Curitiba"` string** — it is composed at runtime from `SEO_LOCATION`.

### 1. Single source of truth (change constants once, multiple surfaces update)

| File · Line | Current | Cascades to |
| --- | --- | --- |
| `src/constants.ts` | `BUSINESS_CLINIC_NAME = 'Eco Medical Center'` | SEO descriptions, visible contact cards, footer location, physician schema clinic |
| `src/constants.ts` | `BUSINESS_ADDRESS_LOCALITY = 'Curitiba'` | `SEO_LOCATION`, title/description metadata, visible contact cards, footer location, schema address |
| `src/constants.ts` | `BUSINESS_STREET`, `BUSINESS_STREET_NUMBER`, `BUSINESS_FLOOR`, `BUSINESS_NEIGHBORHOOD`, `BUSINESS_POSTAL_CODE` | `BUSINESS_ADDRESS_LINE`, `BUSINESS_ADDRESS_DETAIL`, `BUSINESS_FULL_ADDRESS`, schema `PostalAddress`, contact UI |

Changing the business location constants updates the page title, meta description, OG/Twitter descriptions, image alts, keyword list, visible contact cards, footer location, and schema address without hunting for hardcoded UI strings.

### 2. NAP / location data — update with confirmed Campo Grande facts

| File · Line | Current (Curitiba) | What |
| --- | --- | --- |
| `src/constants.ts:20` | `ECO_TELEPHONE_NUMBER = '(41) 3123-6550'` | Clinic phone (area code 41 = PR) |
| `src/constants.ts` | `DOCTORALIA_URL` `.../coloproctologista/curitiba` | Doctoralia profile (city slug), footer trust link, Physician `sameAs` |
| `src/constants.ts` | `GOOGLE_MAPS_URL` `maps.app.goo.gl/8pzUEGq1YnVFmsf4A` | Maps pin, contact CTA, footer link, schema `sameAs` |
| `src/constants.ts` | Business address constants for Rua Goiás, 70, 3º andar, Água Verde, Curitiba/PR, 80620-060 | Visible contact UI and schema `PostalAddress` |
| `src/constants.ts:84-87` | `BUSINESS_GEO` lat -25.4646652, lng -49.2905794 | Schema `GeoCoordinates` |
| `src/constants.ts:52` | `CRM_STATE = 'PR'` | Only if she registers CRM-MS (affects `CFM_REGISTRY_URL`) |
| `public/llms.txt:9-10` | `Atendimento atual` and `Endereço` lines | AI crawler guidance |
| `docs/website_content.md:91` | `Rua Goiás, 70 - 3º andar, Água Verde, Curitiba - PR, CEP 80620-060` | Editorial reference copy |

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
