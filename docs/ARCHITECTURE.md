# Architecture Overview (Bulletproof Structure)

This document lays out the target "bulletproof" structure for the codebase.

## Goals

- Predictable & discoverable layout
- Strong boundaries (features vs generic UI vs framework shell)
- Zero `any` leakage across layers
- Testable & evolvable worker pipeline

## Directory Layout

```
src/
  app/                # Next.js App Router: routes, layouts
  components/         # Reusable presentational components (cross-domain)
  config/             # Runtime/env config (validated)
  features/           # Vertical domain slices (testimonials, projects, ...)
  hooks/              # Cross-cutting hooks
  lib/                # Low-level pure helpers / adapters
  sections/           # Page section composition components
  shared/             # constants / types / utils shared widely
  worker/             # Worker implementation (monolith -> planned split)
  wrappers/           # Error boundaries & context wrappers
  test/               # Global test setup
```

## Feature Conventions

Each feature gets a folder under `features/` with:

```
types.ts        # domain types
hooks.ts        # (optional) feature-centric hooks
adapters.ts     # (planned) map raw -> domain shapes
selectors.ts    # (planned) memoized derivations
index.ts        # (future) barrel
```

Current initialised: testimonials, projects, contact, performance (types only).

## Worker Modularization Plan

Planned extraction sequence (atomic commits):

1. constants -> worker.constants.ts
2. types -> worker.types.ts (internal only)
3. utils -> worker.utils.ts
4. processors -> worker.processors.ts
5. handlers/state remain in `worker.ts` (entry) OR final separate handler file referenced.

Earlier attempt failed due to keeping original definitions plus partial duplicates. Next attempt will: move (cut) segments, not copy.

## Env Handling

`src/config/env.ts` centralizes reading & (later) validation. Use a schema library (e.g. Zod) when real env vars arrive.

## Future Enhancements

- [ ] Execute safe worker split (constants → types → utils → processors)
- [ ] Add adapters mapping worker results to feature domain types
- [ ] Enforce import boundaries (eslint-plugin-boundaries or custom rules)
- [ ] Add performance regression tests
- [ ] Add route-level error pages

---

Keep this file updated as the architecture evolves.
