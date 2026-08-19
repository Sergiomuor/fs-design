# /fs-design normalize — realign drifted UI onto the system

For surfaces that work but have wandered off the vocabulary: hardcoded values, stock Tailwind classes, hand-rolled primitives, wrong domain colours. Normalize changes appearance only where drift made it wrong; behavior and copy stay untouched.

## Method

1. **Measure the drift.** `luz-lint <target> --json` for the mechanical list; then read the code for what lint can't see: hand-rolled primitives (div-buttons, bespoke tables/tooltips), wrong components (Table where DataTable behavior exists, Menu-legacy), off-scale rhythm, wrong domain colours (an exposure chart not using the locked five bands; a mitigation tier off the triads).
2. **Map every violation to its home.**
   - Hex/rgb → the exact token (lint's hint names it; the full table is DESIGN.md frontmatter). A hex with *no* token match is a decision: nearest token, or propose a token — ask, don't guess.
   - Stock type classes → the composite role with the same size (`text-sm` → `text-body-sm` or `text-body-md` — same size, different line-height; take both values from the DESIGN.md frontmatter table and check which line-height the layout actually needs).
   - Spacing → the 5px scale step; `p-10`+ → Box props or `*-ds-*`; verify the rendered value you're preserving vs the one that was intended (`gap-5` renders 30px in luz — the author may have meant 20px = `gap-4`).
   - Hand-rolled primitives → the luz component + variant. Match the existing API; do not add features while migrating.
   - Domain colours → `ExposureTag`/`MitigationTag`/chart palettes (`CHART_*`), `EXPOSURE_TOKENS`/`MITIGATION_TOKENS` — never per-page colour maps.
3. **Climb the ladder as you rewrite:** component default → luz props → `tv()` in a `.styles.ts` → raw className last. Several loose utilities on one element = it wanted a prop or a styles file.
4. **Preserve rendered truth.** Before/after: computed styles for the key elements must match intent, not necessarily the old pixel values (drift sometimes *rendered wrong* — e.g. a stock palette class that resolved to nothing; restoring the intended token changes pixels and that's the fix, not a regression). Note every visible change in the report.
5. **One surface at a time.** Do not rename tokens, change component APIs, or refactor behavior as a side effect. If normalization reveals a missing token or variant, flag it for `extract` instead of inventing locally.

## Verify

Lint exits clean (or every remaining warning carries a deliberate comment). Rendered result inspected once (Storybook/app/vitest class assertions). Report: violations fixed by rule, visible changes, decisions flagged, anything deferred to `extract`.
