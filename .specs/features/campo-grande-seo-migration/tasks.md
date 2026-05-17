# Campo Grande SEO Migration Tasks

**Design**: `.specs/features/campo-grande-seo-migration/design.md`
**Content backlog**: `.specs/features/campo-grande-seo-migration/content-backlog.md`
**Status**: Draft

---

## Execution Plan

### Phase 1: Foundation

```text
T1 -> T2 -> T3
```

### Phase 2: Safe Local SEO Scaffold

```text
T3 -> T4 -> T5 -> T6
```

### Phase 3: SEO Expansion

```text
T6 -> T7 -> T8 -> T9
```

### Phase 4: Validation and Launch Readiness

```text
T9 -> T10 -> T11
```

---

## Task Breakdown

### T1: Create Location Data Model

**What**: Add a typed location model with current Curitiba active data and Campo Grande planned placeholder data.
**Where**: `src/lib/locations.ts`, `tests/unit/lib.test.ts`
**Depends on**: None
**Reuses**: `src/lib/treatments.ts` static data pattern
**Requirement**: CGSEO-01, CGSEO-03

**Tools**:

- MCP: none
- Skill: tlc-spec-driven

**Done when**:

- [ ] `PracticeLocation` supports `active`, `planned`, and `historical` statuses.
- [ ] Campo Grande exists only as planned/non-indexable without address, geo, map, or active CTA.
- [ ] Curitiba data preserves current Eco Medical Center facts.
- [ ] Unit tests verify `getIndexableLocations()` excludes planned locations.
- [ ] Gate check passes: `npm run test:unit`.

**Tests**: unit
**Gate**: quick
**Commit**: `feat(seo): add practice location model`

### T2: Refactor Current Location Constants to Reuse Location Model

**What**: Keep existing exported constants stable while deriving active NAP fields from the location model where practical.
**Where**: `src/constants.ts`, `src/lib/locations.ts`, `tests/unit/lib.test.ts`
**Depends on**: T1
**Reuses**: Existing constants API used by components/schema
**Requirement**: CGSEO-01

**Tools**:

- MCP: none
- Skill: tlc-spec-driven

**Done when**:

- [ ] Existing imports continue to work.
- [ ] Active address/phone/geo still represent Curitiba.
- [ ] Planned Campo Grande data does not affect global metadata or CTAs.
- [ ] Unit tests verify active location selection.
- [ ] Gate check passes: `npm run test:unit`.

**Tests**: unit
**Gate**: quick
**Commit**: `refactor(seo): derive active nap from location data`

### T3: Remove Unverified Rating Schema and Add Schema Guardrails

**What**: Stop emitting aggregate rating unless a verified source is configured; add tests for planned-location schema exclusions.
**Where**: `src/lib/structured-data.ts`, `src/constants.ts`, `tests/unit/lib.test.ts`
**Depends on**: T2
**Reuses**: Existing global graph builder
**Requirement**: CGSEO-02

**Tools**:

- MCP: none
- Skill: seo

**Done when**:

- [ ] Global schema no longer emits hard-coded unverifiable rating data.
- [ ] Global schema keeps Physician, MedicalOrganization, WebSite, credentials, and active Curitiba area served.
- [ ] Tests assert planned Campo Grande does not emit address/geo/active clinic schema.
- [ ] Gate check passes: `npm run test:unit`.

**Tests**: unit
**Gate**: quick
**Commit**: `fix(seo): remove unverified rating schema`

### T4: Add Location Hub Route

**What**: Create `/locais-de-atendimento` hub with confirmed locations only and safe metadata.
**Where**: `src/app/locais-de-atendimento/page.tsx`, `src/lib/navigation.ts`, `tests/e2e/blog.spec.ts`
**Depends on**: T3
**Reuses**: `Breadcrumb`, `CallToActionCard`, SEO helpers, location model
**Requirement**: CGSEO-03, CGSEO-06

**Tools**:

- MCP: none
- Skill: tlc-spec-driven

**Done when**:

- [ ] Hub page renders with canonical metadata and breadcrumb schema.
- [ ] Hub lists confirmed/indexable locations only.
- [ ] Header or footer exposes the location hub with descriptive anchor text.
- [ ] E2E verifies hub page, nav/footer link, and absence of planned Campo Grande active claims.
- [ ] Gate check passes: `npm run test:unit && npm run e2e`.

**Tests**: e2e
**Gate**: full
**Commit**: `feat(seo): add locations hub`

### T5: Add Location Detail Route with Draft-Safe Behavior

**What**: Create `/locais-de-atendimento/[slug]` with active-location pages indexable and planned-location pages noindex/excluded from sitemap.
**Where**: `src/app/locais-de-atendimento/[slug]/page.tsx`, `src/lib/seo.ts`, `tests/e2e/blog.spec.ts`
**Depends on**: T4
**Reuses**: Blog/treatment detail page metadata and breadcrumb patterns
**Requirement**: CGSEO-03, CGSEO-07

**Tools**:

- MCP: none
- Skill: tlc-spec-driven

**Done when**:

- [ ] Curitiba detail page can render with factual NAP.
- [ ] Planned Campo Grande page, if routed, is `noindex` and avoids active NAP/CTA claims.
- [ ] Unknown location slugs return 404.
- [ ] E2E verifies robots meta for planned page and visible facts for active page.
- [ ] Gate check passes: `npm run test:unit && npm run e2e`.

**Tests**: e2e
**Gate**: full
**Commit**: `feat(seo): add location detail pages`

### T6: Add Location Sitemap and Structured Data Integration

**What**: Include only indexable locations in sitemap and add accurate location schema for confirmed locations.
**Where**: `src/app/sitemap.ts`, `src/lib/structured-data.ts`, `tests/unit/lib.test.ts`, `tests/e2e/blog.spec.ts`
**Depends on**: T5
**Reuses**: Sitemap treatment/blog mapping, `buildBreadcrumbGraph`
**Requirement**: CGSEO-03, CGSEO-07

**Tools**:

- MCP: none
- Skill: seo

**Done when**:

- [ ] Sitemap includes active/indexable location pages.
- [ ] Sitemap excludes planned Campo Grande pages.
- [ ] Location schema includes `PostalAddress`/`GeoCoordinates` only for confirmed facts.
- [ ] Tests verify sitemap inclusion/exclusion and schema guardrails.
- [ ] Gate check passes: `npm run test:unit && npm run e2e`.

**Tests**: e2e
**Gate**: full
**Commit**: `feat(seo): wire location pages into sitemap and schema`

### T7: Add Treatment FAQ Support

**What**: Extend treatment data and pages with visible FAQ sections and FAQ schema where content exists.
**Where**: `src/lib/treatments.ts`, `src/app/tratamentos/[slug]/page.tsx`, `src/lib/structured-data.ts`, `tests/e2e/blog.spec.ts`
**Depends on**: T6
**Reuses**: Blog FAQ rendering/schema pattern
**Requirement**: CGSEO-04

**Tools**:

- MCP: none
- Skill: seo

**Done when**:

- [ ] Treatment model supports optional FAQs.
- [ ] At least representative high-priority treatments include sober FAQ content.
- [ ] Visible FAQ content and JSON-LD FAQ data match.
- [ ] E2E verifies FAQ on a representative treatment page.
- [ ] Gate check passes: `npm run test:unit && npm run e2e`.

**Tests**: e2e
**Gate**: full
**Commit**: `feat(seo): add treatment faq support`

### T8: Refresh AI Search Summary Files

**What**: Add/update crawler-facing summary with current routes, treatments, blog clusters, locations, credentials, sitemap, and medical disclaimers.
**Where**: `public/llms.txt`, `public/llm.txt`, `tests/unit/lib.test.ts`
**Depends on**: T6
**Reuses**: Existing `public/llm.txt`
**Requirement**: CGSEO-06

**Tools**:

- MCP: none
- Skill: seo

**Done when**:

- [ ] `llms.txt` exists and reflects Next.js 16, blog routes, treatment routes, location strategy, and sitemap.
- [ ] Curitiba remains the only active NAP unless facts are confirmed.
- [ ] Campo Grande is described only as planned/future when mentioned.
- [ ] Unit or build check verifies required sections/facts.
- [ ] Gate check passes: `npm run test:unit`.

**Tests**: unit
**Gate**: quick
**Commit**: `docs(seo): refresh ai crawler summary`

### T9: Compliance Copy Cleanup

**What**: Soften high-risk medical claims in visible copy and blog content.
**Where**: `content/posts/*.md`, `src/components/*.tsx`, `docs/cfm-compliance-guidelines.md`
**Depends on**: T3
**Reuses**: Existing educational tone from treatment detail pages
**Requirement**: CGSEO-02

**Tools**:

- MCP: none
- Skill: seo

**Done when**:

- [ ] Phrases implying guarantees, superiority, cure certainty, "best", or "total safety" are replaced with conditional, patient-specific wording.
- [ ] CRM/RQE/CFM trust signals remain visible.
- [ ] No new casual or aggressive marketing language is introduced.
- [ ] Build parses all content successfully.
- [ ] Gate check passes: `npm run lint && npm run build && npm run test:unit`.

**Tests**: build
**Gate**: build
**Commit**: `fix(content): soften medical advertising claims`

### T10: Create Campo Grande Content Backlog

**What**: Add a content backlog document for future Campo Grande posts/treatments with launch prerequisites and duplicate-avoidance notes.
**Where**: `docs/campo-grande-seo-backlog.md`
**Depends on**: T9
**Reuses**: `docs/blog-content-playbook.md`, `docs/seo-spec.md`
**Requirement**: CGSEO-05, CGSEO-07

**Tools**:

- MCP: none
- Skill: seo

**Done when**:

- [ ] Backlog separates launch-safe generic posts from Campo Grande-only posts.
- [ ] Each proposed post has intent, primary keyword, related treatment, and publish condition.
- [ ] Colonoscopy is explicitly gated on doctor confirmation.
- [ ] No app code changes are required.

**Tests**: none
**Gate**: none
**Commit**: `docs(seo): add campo grande content backlog`

### T11: Final Validation Checklist and PR Notes

**What**: Add a launch checklist for the doctor "GO" moment and verify the branch is ready for PR.
**Where**: `.specs/features/campo-grande-seo-migration/tasks.md`, `docs/campo-grande-launch-checklist.md`
**Depends on**: T10
**Reuses**: This spec/design/task package
**Requirement**: CGSEO-07

**Tools**:

- MCP: none
- Skill: tlc-spec-driven

**Done when**:

- [ ] Checklist lists every fact needed before activating Campo Grande SEO.
- [ ] Checklist lists exact files/routes to update in final launch PR.
- [ ] Final validation command is documented.
- [ ] Gate check passes: `npm run lint && npm run build && npm run test:unit`.

**Tests**: build
**Gate**: build
**Commit**: `docs(seo): add campo grande launch checklist`

---

## Parallel Execution Map

Current task boundaries are intentionally mostly sequential because the location model affects metadata, schema, sitemap, and route behavior. After T6, T8 and T9 can be developed in either order, but final validation should run after both.

```text
T1 -> T2 -> T3 -> T4 -> T5 -> T6 -> T7
                         \        \-> T8
                          \-------> T9 -> T10 -> T11
```

---

## Pre-Approval Checks

### Task Granularity

| Task | Scope | Status |
| --- | --- | --- |
| T1 | One model module + co-located unit tests | OK |
| T2 | Constants integration + co-located unit tests | OK |
| T3 | Schema guardrail + co-located unit tests | OK |
| T4 | One hub route + e2e coverage | OK |
| T5 | One detail route + e2e coverage | OK |
| T6 | Sitemap/schema integration + co-located tests | OK |
| T7 | Treatment FAQ capability + e2e coverage | OK |
| T8 | AI summary files + unit coverage | OK |
| T9 | Compliance content pass + build gate | OK |
| T10 | One backlog doc | OK |
| T11 | One launch checklist + final gate | OK |

### Diagram-Definition Cross-Check

| Task | Depends On | Diagram Shows | Status |
| --- | --- | --- | --- |
| T1 | None | Start | OK |
| T2 | T1 | T1 -> T2 | OK |
| T3 | T2 | T2 -> T3 | OK |
| T4 | T3 | T3 -> T4 | OK |
| T5 | T4 | T4 -> T5 | OK |
| T6 | T5 | T5 -> T6 | OK |
| T7 | T6 | T6 -> T7 | OK |
| T8 | T6 | T6 -> T8 | OK |
| T9 | T3 | T3 -> T9 | OK |
| T10 | T9 | T9 -> T10 | OK |
| T11 | T10 | T10 -> T11 | OK |

### Test Co-Location Validation

| Task | Code Layer Modified | Matrix Requires | Task Says | Status |
| --- | --- | --- | --- | --- |
| T1 | `src/lib/*.ts` | unit | unit | OK |
| T2 | `src/lib/*.ts`, constants | unit | unit | OK |
| T3 | `src/lib/*.ts` schema | unit | unit | OK |
| T4 | route + nav | e2e | e2e | OK |
| T5 | route + metadata | e2e | e2e | OK |
| T6 | sitemap + schema | e2e/unit | e2e | OK |
| T7 | treatment route/model/schema | e2e | e2e | OK |
| T8 | crawler static files | unit/build | unit | OK |
| T9 | content + components | build | build | OK |
| T10 | docs | none | none | OK |
| T11 | docs + final validation | build | build | OK |

---

## Tool Choice Before Execution

Before executing implementation tasks, confirm whether to run them directly in this session or create separate task-focused branches/commits manually. Default recommended execution is one task at a time on `df/main`, with one atomic commit per completed task.
