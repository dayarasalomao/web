# Campo Grande SEO Migration Context

**Status**: Website cutover implemented — pending merge and coordinated external-profile updates (2026-07-20)

> The inventory below began as a pre-cutover snapshot. The final implementation now points the
> website, schema and sitemap at Campo Grande, removes Curitiba as a practice location, and keeps
> Curitiba only where it is a truthful professional-history fact.

## User Decisions Captured

- The doctor will start attending in Campo Grande/MS on 2026-08-05.
- Confirmed clinic: Instituto do Aparelho Digestivo.
- Confirmed written address: R. Alagoas, 700, Sala 8, Jardim dos Estados, Campo Grande/MS, CEP 79020-120.
- Keep the current booking WhatsApp temporarily; the clinic's public general phone is (67) 3320-9500.
- The doctor's future hours are Monday–Friday, 09:00–18:00.
- After the move, Curitiba will no longer be an active practice location.
- Confirmed professional registration for the site: CRM-MS 16556 / RQE 9819.
- Colonoscopy will not be offered by the doctor at this location.
- Remove Curitiba as a practice location; keep only truthful CV/history items such as Santa Casa de Curitiba.
- Clinic, written address, Maps URL, coordinates and start date are confirmed.
- Campo Grande is the sole active/indexable location and drives the site NAP, schema, sitemap and contact UI.
- `/locais-de-atendimento` redirects to `/locais-de-atendimento/campo-grande`; the retired Curitiba route returns 404.
- The old Curitiba Doctoralia URL is intentionally omitted from the footer and structured data until the migrated profile URL is confirmed.

## Compliance Constraints

- Medical copy must stay educational and sober.
- Do not use guarantees, superiority claims, fake reviews, fake clinic ownership, fake NAP, or unverifiable credentials.
- CRM/RQE/specialty should remain visible where relevant.
- If a clinic is not owned by the doctor, schema must not model it as her owned business.

## Open Facts Required Before Final Campo Grande Launch

| Fact | Needed For |
| --- | --- |
| Campo Grande clinic name | ✅ Instituto do Aparelho Digestivo |
| Full street address and postal code | ✅ R. Alagoas, 700, Sala 8, Jardim dos Estados, Campo Grande/MS, 79020-120 |
| Google Maps place URL or map link | ✅ Provided 2026-07-17; Sala 8 confirmed 2026-07-18 |
| Geo coordinates | ✅ -20.4530096, -54.5956825, confirmed from the clinic's Google Maps listing |
| Phone/WhatsApp strategy | ✅ Keep current booking WhatsApp; clinic general phone (67) 3320-9500 |
| Doctor's future hours | ✅ Monday–Friday, 09:00–18:00 |
| Active availability date | ✅ 2026-08-05 |
| CRM/MS status if applicable | ✅ CRM-MS 16556 / RQE 9819; client authorized site change |
| Confirmed services in Campo Grande | Treatment/location service lists; keep current documented scope unless revised |
| Colonoscopy applicability | ✅ Not offered; do not create colonoscopy pages |

## Current Repo Evidence

- Active global city is derived from `BUSINESS_ADDRESS_LOCALITY = 'Campo Grande'` in `src/constants.ts`.
- Active NAP is centralized in `src/constants.ts`: Instituto do Aparelho Digestivo, R. Alagoas, 700, Sala 8, Jardim dos Estados, Campo Grande/MS, CEP 79020-120.
- Blog engine exists under `content/posts/*.md` and `src/lib/blog.ts`.
- Treatment engine exists in `src/lib/treatments.ts`.
- The location route is `/locais-de-atendimento/campo-grande`; the plural route redirects there while only one location is configured.
- `public/llms.txt` describes the active Campo Grande address and public routes.

## Curitiba → Campo Grande Reference Change Map

Pre-cutover inventory retained as a migration record. Values in the "Current" columns below describe the old Curitiba state, not the implementation after the cutover.

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
