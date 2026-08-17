# /fs-design optimize — perceived performance first

**Engineered Responsiveness** is a product principle: a compliance platform that feels fast reads as reliable. Optimize perception first (what the user sees while waiting), then the actual costs. Measure before and after — no blind tuning.

## Perception layer

1. **Skeletons mirror content.** Every async region loads as a `Skeleton` arrangement shaped like its real content (same dimensions — zero layout shift on arrival). A generic centered spinner is a downgrade; a blank flash is a bug.
2. **Synchronous shell.** Root layouts stay synchronous; data awaits live in the components that need them. An app-shell `Suspense` boundary that awaits backend data can hang hydration and blank the entire page — audit what each boundary actually blocks on. The shell (nav, headers, structure) renders instantly, always.
3. **Component-level containment.** One region's slow/failed query never blocks siblings: separate suspense/error boundaries per data region, so the page assembles progressively.
4. **Optimistic and pending states.** Buttons show their loading state during mutations (built in — use it); filters apply visibly immediately; nothing "goes dead" while working.

## Cost layer

- **Bundle hygiene:** `toSentenceCase` (and anything else) from the `@repo/core` main barrel drags server-only code into the client — import from `@repo/core/domain/utils/string-utils` (luz-lint flags it). Heavy viz (WorldMap, BubbleChart) dynamic-imports on surfaces where it's below the fold or conditional. Icons via the `Icon` component, not ad-hoc SVG imports per file.
- **Re-render discipline:** luz components ship memoized; keep it true upstream — stable callbacks/objects into `DataTable` columns and chart props (column defs built once via the factories, not inline per render). Context values memoized; table row selection isolated from full-table re-renders.
- **Data-shape work off the render path:** sorting/grouping/formatting computed once (useMemo or server-side), not per cell. CSV export streams from the existing helpers, not a re-render.
- **Fonts/images:** the three faces load via `next/font` (self-hosted TWK Lausanne) — no additional font requests, ever; images sized + lazy below the fold.
- **Charts at real scale:** test with customer-scale data (thousands of suppliers, not the 12-row fixture); virtualize or paginate before optimizing micro-renders.

## Method

Profile the real surface (Performance panel / React profiler / network) → rank by user-visible cost (blocking hydration > layout shift > slow interaction > bundle bytes) → fix top-down → re-measure. One batched verification round.

Report: metric before/after per fix (LCP/CLS/INP or profiler numbers where measurable, described observations where not), what was deferred and why. Never trade correctness or the token vocabulary for speed.
