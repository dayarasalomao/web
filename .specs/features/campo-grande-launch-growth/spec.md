# Campo Grande Launch & Growth Plan

**Status**: Active — move is **imminent** (confirmed with client 2026-07-10)
**Depends on code work in**: `.specs/features/campo-grande-seo-migration/` (tasks T1–T11)
**Related memory**: `campo-grande-relocation`

## Problem Statement

Dra. Dayara Salomão has a technically excellent website (top ~10% of medical sites: clean JSON-LD graph, per-route metadata, 25-post blog engine, treatment engine, WebP, `llms.txt`, AI-crawler-friendly robots) but ranks only for **branded** queries. For competitive non-branded queries ("coloproctologia Curitiba hemorroidas laser") she is **not in the top 10**.

**Diagnosis**: On-page technical SEO is not the bottleneck — it is already strong. Local medical (YMYL) ranking is won **off the website**, in this order: (1) Google Business Profile / Map Pack, (2) domain authority & backlinks, (3) review volume & citations, (4) content depth on bottom-funnel queries. She is a young domain competing against 5–15-year-old Curitiba sites, exact-match domains (`cirurgiahemorroidas.com.br`), and press-mentioned competitors, with Doctoralia occupying aggregator slots.

**Strategic pivot**: She is relocating to **Campo Grande/MS** and authorized CRM-MS 16556 / RQE 9819 for the site. The public site remains on Curitiba until the coordinated launch. Campo Grande is a **less saturated organic market** in the current manual review, so the plan is a coordinated relocation of her digital footprint while preserving existing brand and review assets.

## Goals

- [ ] Rank page-1 / map-pack for high-intent coloproctology queries in Campo Grande/MS.
- [ ] Convert clicks to consults (WhatsApp) — not just rank.
- [ ] Migrate the site's local signals Curitiba → Campo Grande **without** losing reviews, rating, or domain trust.
- [ ] Get patients **now** via paid, while organic authority compounds over 6–12 months.
- [ ] Keep everything CFM-compliant (sober, no guarantees, no fake NAP/reviews).

## Remaining blockers before launch switch

The website launch switch (CGSEO T11) and the GBP move both require confirmed Campo Grande facts that we **do not have yet**:

| Fact | Needed for | Status |
| --- | --- | --- |
| Campo Grande clinic name | GBP, schema, NAP, site | ✅ Instituto do Aparelho Digestivo |
| Full street address + CEP | GBP, `PostalAddress`, contact | ✅ R. Alagoas, 700, Jardim dos Estados, Campo Grande/MS, 79020-120 |
| Phone / WhatsApp for MS | CTAs, schema telephone | ❌ MISSING (site WhatsApp 5541… is a PR number) |
| Google Maps place URL | GBP, `sameAs`, navigation | ✅ Provided; visible “Sala 8” still needs confirmation |
| Geo coordinates | `GeoCoordinates` | ❌ MISSING |
| First active consult date | Launch timing, ad start | ✅ 2026-08-05 |
| CRM-MS status | Credential display | ✅ CRM-MS 16556 / RQE 9819 (from Instagram) |
| Services offered in CG | Treatment/service lists | ⚠️ Assume same unless told otherwise |
| Colonoscopy offered? | Whether to build colonoscopy pages | ✅ No; keep out of scope |

**Action: collect these from the client before executing WS1 launch switch or WS2 GBP move.**

---

## Workstreams & Requirements

### WS1 — Website local-signal migration (code) — mostly specced

Covered by `campo-grande-seo-migration` tasks T1–T11. Posture change: those tasks were written to *prepare quietly*; now we execute toward the **launch switch**. Blocked on the Critical Facts above.

| ID | Requirement | Maps to |
| --- | --- | --- |
| CGGROW-01 | Update displayed credentials to CRM-MS 16556 / RQE 9819 (or show both during transition) once practicing in CG | `src/constants.ts` (CRM_NUMBER/CRM_STATE/RQE), CV, footer |
| CGGROW-02 | Flip active NAP/geo/maps/Doctoralia from Curitiba to confirmed Campo Grande | CGSEO T2, T6, T11 |
| CGGROW-03 | Preserve Curitiba only as historical CV (Santa Casa residency), de-emphasize as service area | CGSEO T9, T11 |
| CGGROW-04 | Refresh `llms.txt` / crawler summary to Campo Grande active NAP | CGSEO T8 |

### WS2 — Off-site playbook (client-executed, highest ROI)

Actions Dayara (or the user on her behalf) performs outside the repo. **This is lever #1.**

| ID | Requirement | Priority |
| --- | --- | --- |
| CGGROW-10 | **Move GBP by EDITING the existing profile** (never create new) — preserves 13 reviews, 5.0, profile age. Change address to Campo Grande. | P1 |
| CGGROW-11 | Fix GBP **primary category** from generic "Centro médico" → specific "Proctologista" (+ secondary: Cirurgião/a, Gastroenterologista if applicable) | P1 |
| CGGROW-12 | **Remove "\| Proctologista" suffix** from GBP business name (real name only — keyword suffix risks suspension during the address-edit re-review) | P1 |
| CGGROW-13 | **Review engine**: WhatsApp direct-review-link after each consult + desk QR; reply to all existing reviews; target 50+ | P1 |
| CGGROW-14 | GBP **photos** (15–20: exterior, interior, working, equipment, team; refresh monthly) | P2 |
| CGGROW-15 | GBP **Services** populated (map to treatment pages) + weekly **Google Posts** + Q&A seeding + WhatsApp appointment link + attributes | P2 |
| CGGROW-16 | **NAP consistency** across GBP + website + Doctoralia + CFM — update all four *together* at move time | P1 |
| CGGROW-17 | Update **Doctoralia** profile city slug (currently `.../curitiba`) and directories (SBCP, CatalogoMed, Escavador) to Campo Grande | P2 |
| CGGROW-18 | Backlink/citation building: MS medical directories, clinic website (if employed), local press, SBCP listing | P3 |

### WS3 — Paid acquisition (bridge to organic)

**Division of labor**: the client has a dedicated **ads person** who builds and runs campaigns.
Our role (dev/consultant) is **advisory + technical enablement** — recommend keywords/geo/negatives
and own the on-site conversion-tracking wiring. We do **not** build or manage the campaigns.

| ID | Requirement | Owner | Priority |
| --- | --- | --- | --- |
| CGGROW-20 | Advise the ads person: high-intent keywords ("proctologista campo grande", "cirurgia hemorroida campo grande", "coloproctologista campo grande") geo-fenced to CG metro | Us → ads person | P1 |
| CGGROW-21 | Conversion tracking: WhatsApp click + call as conversions (GTM already wired in `layout.tsx`) | Us (dev) | P1 |
| CGGROW-22 | Advise negative-keyword list + exact/phrase match + small starter budget scaling on CPA | Us → ads person | P2 |
| CGGROW-23 | (Optional) Meta/Instagram retargeting off her 2.3k IG following once CG is live | Ads person | P3 |

---

## Sequencing (recommended order)

```text
STEP 0  Collect Critical Facts from client  ──────────────► unblocks everything
STEP 1  WS2 GBP move+optimize (CGGROW-10..16)  ── highest ROI, do first at move
STEP 2  WS1 website launch switch (CGSEO T11 + CGGROW-01..04)  ── same window as GBP
STEP 3  WS3 Google Ads starter (CGGROW-20..22)  ── switch on the day CG consults open
STEP 4  WS2 ongoing: reviews, posts, directories, backlinks (CGGROW-13..18)  ── compounding
STEP 5  Content: Campo Grande local-intent posts (CGSEO T10 backlog)  ── after NAP live
```

**Why GBP before website**: the Map Pack drives more local medical clicks than organic, and the review/rating asset is the hardest to rebuild — protecting it during the move is priority one. Website and GBP NAP must flip in the **same window** to keep consistency.

---

## Success Criteria

- [ ] GBP shows Campo Grande address, specific category, real-name, all 13+ reviews intact (no profile reset).
- [ ] Website active NAP/schema/`llms.txt`/credentials reflect Campo Grande + CRM-MS, Curitiba only as CV.
- [ ] Google Ads live and generating WhatsApp consults within the first launch week.
- [ ] Within ~3–6 months: page-1 organic + map-pack for ≥3 high-intent Campo Grande coloproctology queries.
- [ ] No CFM-compliance violations, no fake NAP, no lost reviews.

## Out of Scope

| Item | Reason |
| --- | --- |
| Fabricated phone, geo, room number or hours before confirmation | Compliance / trust |
| Fake or incentivized reviews | CFM + Google policy |
| Modeling a non-owned clinic as her business in schema | Trust / accuracy |
| Aggressive/superiority medical claims | CFM advertising rules |
| Colonoscopy pages | Client confirmed she will not offer it at this location |

## Requirement Traceability

| ID | Workstream | Priority | Status |
| --- | --- | --- | --- |
| CGGROW-01..04 | WS1 Website | P1 | Partially unblocked; phone/geo/room/publication approval remain |
| CGGROW-10..12 | WS2 GBP core | P1 | Ready (client action) |
| CGGROW-13 | WS2 Reviews | P1 | Ready (client action) |
| CGGROW-14..17 | WS2 Off-site | P2 | Ready |
| CGGROW-18 | WS2 Backlinks | P3 | Ongoing |
| CGGROW-20..22 | WS3 Paid | P1 | Blocked on move date |
| CGGROW-23 | WS3 Paid | P3 | Later |
