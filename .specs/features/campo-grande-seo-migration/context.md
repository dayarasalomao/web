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
