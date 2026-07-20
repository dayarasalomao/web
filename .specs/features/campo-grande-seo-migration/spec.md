# Campo Grande SEO Migration Specification

**Status**: Implemented — the website cutover to Campo Grande, including confirmed coordinates, active schema, sitemap, contact UI and Curitiba retirement, is complete in the migration PR. Production publication still needs coordination with Google Business Profile and Doctoralia (updated 2026-07-20).
**Context**: `.specs/features/campo-grande-seo-migration/context.md`

> The requirements below are retained as the original pre-cutover specification and implementation
> record. Where they describe Curitiba as active or Campo Grande as planned, the final implementation
> outcome above takes precedence.

## Problem Statement

The site currently targets a truthful Curitiba coloproctology presence, but the client is planning a move to Campo Grande/MS. SEO should be prepared ahead of the move without making false local claims before address, clinic, phone, map, and availability facts are confirmed.

## Goals

- [ ] Prepare a migration-safe local SEO architecture that can publish Campo Grande quickly after confirmation.
- [ ] Preserve truthful Curitiba references until the transition is finalized.
- [ ] Improve treatment, blog, schema, sitemap, internal-linking, and AI-search readiness in a way that supports future Campo Grande ranking.
- [ ] Reduce medical advertising compliance risk before adding more local-intent pages.

## Out of Scope

| Feature | Reason |
| --- | --- |
| Claiming active Campo Grande atendimento before launch approval | Site and external profiles must change in one controlled window |
| Adding unconfirmed Campo Grande geo coordinates or activating local schema early | Would create fake, unverifiable, or premature local signals |
| Removing all Curitiba references | Some are factual CV/history/current-location references |
| Creating fake reviews or review schema | Compliance and trust risk |
| Colonoscopy page | The doctor confirmed she will not offer colonoscopy at this location |
| Google Business Profile setup | External operational work, not in this repo |

---

## User Stories

### P1: Migration-Safe Location Model - MVP

**User Story**: As the site owner, I want location and SEO city data separated from doctor credentials and historical CV data so that we can prepare Campo Grande without corrupting truthful Curitiba information.

**Why P1**: This prevents accidental false NAP/schema claims and gives every later task a safe source of truth.

**Acceptance Criteria**:

1. WHEN the app needs active NAP data THEN the system SHALL read it from an explicit current practice location model.
2. WHEN the app needs future Campo Grande planning data THEN the system SHALL keep it separate from active NAP data.
3. WHEN a location is not confirmed THEN the system SHALL not emit indexable pages, schema geo coordinates, active CTAs, or sitemap entries that imply active service there.

**Independent Test**: Unit tests can assert confirmed vs planned location behavior and sitemap/schema inclusion rules.

### P1: Compliance Cleanup - MVP

**User Story**: As a medical advertiser, I want copy and schema to avoid exaggerated outcomes or unverifiable trust signals so that the site remains sober and defensible before expanding SEO.

**Why P1**: New local pages amplify risk if existing claims are too strong.

**Acceptance Criteria**:

1. WHEN content mentions treatment benefits THEN copy SHALL use conditional, patient-specific language.
2. WHEN schema includes ratings or reviews THEN the data SHALL be backed by a visible, verified public source or be omitted.
3. WHEN copy references credentials THEN CRM/RQE and CFM links SHALL remain visible and accurate.

**Independent Test**: Search the code/content for banned claim patterns and verify schema no longer emits unverifiable rating data.

### P1: Location Hub Scaffold - MVP

**User Story**: As a future patient, I want a clear locations area so that I can understand where the doctor attends once each location is confirmed.

**Why P1**: Local SEO needs real location pages, but unpublished/draft Campo Grande content must be guarded.

**Acceptance Criteria**:

1. WHEN only Curitiba is confirmed THEN `/locais-de-atendimento` SHALL list only confirmed active or historical/publicly safe locations.
2. WHEN Campo Grande is configured as draft/planned THEN its page SHALL be `noindex`, excluded from sitemap, and avoid active appointment/NAP claims.
3. WHEN Campo Grande becomes confirmed THEN its page SHALL have unique title, meta description, visible NAP, services, related treatments, related blog posts, FAQ, CTA, and matching schema.

**Independent Test**: E2E can verify hub route, noindex behavior for draft location, sitemap exclusion, and later sitemap inclusion.

### P2: Treatment SEO Expansion

**User Story**: As a patient searching by condition or treatment, I want dedicated treatment pages with clear explanations, FAQs, and related content so that I can decide whether to seek evaluation.

**Why P2**: Treatment pages already exist, but they need FAQ modeling, broader condition coverage, and future local metadata hooks.

**Acceptance Criteria**:

1. WHEN a treatment page renders THEN it SHALL include canonical metadata, breadcrumb UI/schema, CTA, related blog links, and medical/procedure schema.
2. WHEN FAQ content exists for a treatment THEN visible FAQ content and schema SHALL match.
3. WHEN a treatment is localized to Campo Grande THEN localization SHALL only be enabled for confirmed locations.

**Independent Test**: E2E can visit representative treatment pages and assert headings, related links, FAQ, and schema presence.

### P2: Blog Cluster Expansion

**User Story**: As the doctor preparing for Campo Grande SEO, I want a planned blog cluster strategy so that new posts support both patient education and future local-intent searches.

**Why P2**: Google discovery can take months, but local-intent posts must not be near-duplicate or premature.

**Acceptance Criteria**:

1. WHEN new posts are added THEN each post SHALL use required frontmatter and produce metadata, article schema, FAQ schema when present, reading time, author identity, and disclaimer.
2. WHEN a Campo Grande local-intent post is not yet launch-safe THEN it SHALL remain unindexed or unpublished.
3. WHEN posts cover the same condition THEN they SHALL have distinct intent, H1, primary keyword, and internal links.

**Independent Test**: Unit/build checks validate frontmatter; e2e verifies listing/detail rendering for representative posts.

### P2: Internal Linking and AI Search Readiness

**User Story**: As a search engine or AI assistant, I want machine-readable and human-readable links between doctor, locations, treatments, and articles so that the site can be discovered and cited accurately.

**Why P2**: The repo has `/llm.txt`, but it is stale and lacks the new route/content model.

**Acceptance Criteria**:

1. WHEN important SEO routes exist THEN nav/footer/homepage SHALL expose them with descriptive anchors where appropriate.
2. WHEN treatments, blog posts, and locations are related THEN pages SHALL link between them without generic "click here" anchors.
3. WHEN `/llms.txt` or `/llm.txt` is requested THEN it SHALL summarize real pages, treatments, blog clusters, locations, sitemap, credentials, and disclaimers accurately.

**Independent Test**: E2E can verify critical links; unit/build can verify crawler summary files include required sections.

### P3: Final Campo Grande Launch Switch

**User Story**: As the site owner, I want a short launch checklist so that once the doctor confirms the new details, we can switch SEO from Curitiba to Campo Grande safely.

**Why P3**: This depends on external facts and should be executed only after confirmation.

**Acceptance Criteria**:

1. WHEN all Campo Grande facts are confirmed THEN constants, metadata, schema, contact UI, sitemap, and `/llms.txt` SHALL switch from planned to active Campo Grande.
2. WHEN Curitiba remains historically relevant but no longer active THEN copy SHALL preserve CV/history references but de-emphasize Curitiba as a service area.
3. WHEN URL changes occur THEN redirects SHALL be explicit and permanent only for intentionally renamed pages.

**Independent Test**: Final PR checklist plus e2e assertions for active Campo Grande NAP/schema/sitemap.

---

## Edge Cases

- WHEN Campo Grande address is missing THEN no `PostalAddress`, map URL, or `GeoCoordinates` for Campo Grande SHALL be emitted.
- WHEN both Curitiba and Campo Grande are active temporarily THEN the site SHALL model two distinct locations without duplicate doorway copy.
- WHEN a clinic is a workplace but not owned by the doctor THEN schema SHALL model work location/affiliation, not ownership.
- WHEN a planned page is noindex THEN it SHALL also be excluded from sitemap.
- WHEN a blog post references local availability THEN it SHALL match the active confirmed location state.

---

## Requirement Traceability

| Requirement ID | Story | Phase | Status |
| --- | --- | --- | --- |
| CGSEO-01 | P1: Migration-Safe Location Model | Design | Pending |
| CGSEO-02 | P1: Compliance Cleanup | Design | Pending |
| CGSEO-03 | P1: Location Hub Scaffold | Design | Pending |
| CGSEO-04 | P2: Treatment SEO Expansion | Design | Pending |
| CGSEO-05 | P2: Blog Cluster Expansion | Design | Pending |
| CGSEO-06 | P2: Internal Linking and AI Search Readiness | Design | Pending |
| CGSEO-07 | P3: Final Campo Grande Launch Switch | Design | Pending |

**Coverage**: 7 total, 7 mapped to tasks, 0 unmapped.

## Success Criteria

- [ ] The next PR can be opened without changing active SEO claims from Curitiba to Campo Grande.
- [ ] Campo Grande draft/planned content cannot accidentally index or appear in sitemap before confirmation.
- [ ] The final launch switch is limited to known config/content points rather than a broad rewrite.
- [ ] Compliance-risk language and unverified schema are reduced before local SEO expansion.
