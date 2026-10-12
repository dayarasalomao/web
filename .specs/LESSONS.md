# LESSONS — auto-maintained by scripts/lessons.py

> Machine-owned. Do NOT hand-edit. Changes are overwritten on the next `lessons.py` write.
> Canonical state lives in `.specs/lessons.json`. Edit lessons only via the script.
> promote_threshold=2 distinct features · window_days=45 · quarantine_threshold=2

## Confirmed (load these at Specify/Design)

Corroborated across multiple features. Safe to apply as guidance.

_none_

## Candidates (under observation — do NOT load as guidance yet)

Seen once or not yet corroborated. Tracked, not trusted.

### L-001 — Emit editorial image creator and copyright ownership only when image-specific provenance is verified.
- signal: `ac_gap` · recurrence: 1 feature(s) · scope: `structured-data` · harmful: 0
- features: blog-images-local-titles
- evidence: src/lib/structured-data.ts:280 (structured-data)
- last seen: 2026-10-12T22:52:01Z

### L-002 — Check heading text bounds after document.fonts.ready because global overflow clipping can hide mobile text overflow.
- signal: `ac_gap` · recurrence: 1 feature(s) · scope: `editorial-ui` · harmful: 0
- features: blog-images-local-titles
- evidence: tests/e2e/editorial-update.spec.ts:114 (editorial-ui)
- last seen: 2026-10-12T22:52:01Z

## Quarantined (failed when applied — ignore)

A confirmed lesson that recurred alongside failure. Kept for the maintainer to review.

_none_
