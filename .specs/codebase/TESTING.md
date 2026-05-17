# Testing

## Gate Check Commands

| Gate | Command | Use When |
| --- | --- | --- |
| quick | `npm run test:unit` | Pure library/data-model changes with unit coverage |
| lint | `npm run lint` | Static validation after TypeScript/TSX edits |
| full | `npm run test:unit && npm run e2e` | Route, metadata, sitemap, schema, or user-facing behavior changes |
| build | `npm run lint && npm run build && npm run test:unit` | Final validation before PR or after structural changes |

## Test Coverage Matrix

| Code Layer | Required Test Type | Notes |
| --- | --- | --- |
| `src/lib/*.ts` data/model/schema helpers | unit | Use `tests/unit/*.test.ts`; keep functions deterministic |
| `src/app/**/page.tsx` routes and metadata | e2e | Verify rendered headings, links, meta robots/canonicals, sitemap inclusion/exclusion |
| `src/components/**/*.tsx` UI changes | e2e | Verify visible behavior and important links |
| `content/posts/*.md` content-only posts | e2e smoke or build | Build must parse frontmatter; e2e only when route/listing behavior changes |
| `public/llm.txt` or `public/llms.txt` | unit or build | Prefer unit checks for expected route/fact coverage if practical |
| Docs/spec-only changes | none | No app validation required unless docs claim a command changed |

## Parallelism Assessment

| Test Type | Parallel-Safe | Reason |
| --- | --- | --- |
| unit | Yes | Node test files are independent |
| e2e | No | Playwright uses the dev server and shared app routes |
| build | No | Build/lint should run once after integration |
| none | Yes | Documentation-only tasks can run independently |

## Baseline Notes

- The checked-in `package.json` uses `eslint`, not `next lint`.
- Existing e2e coverage is concentrated in `tests/e2e/blog.spec.ts`.
- When changing SEO routes, update tests so sitemap, robots, noindex, and key internal links remain covered.
