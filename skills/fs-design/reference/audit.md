# /fs-design audit — technical quality checks

Mechanical, evidence-based checks across vocabulary, accessibility, theming, responsiveness, i18n, and performance. Audit reports with P0–P3 severities and an action plan; it fixes nothing.

## Run order

1. **Vocabulary:** `node <plugin-root>/skills/fs-design/scripts/luz-lint.mjs <target files> --json`. Every error is at least P2; hex/stock-palette/dark-variant errors on user-facing surfaces are P1 (stock palette classes render as *nothing* — `--color-*: initial` wipes them, so the styling is silently absent).
2. **Static component checks** (read the code):
   - Legacy exports in use (lint catches imports; also check JSX usage).
   - Hand-rolled primitives: `<div>` buttons, bespoke tooltips/tables where luz components exist.
   - `Tooltip` without `asChild` on inline triggers (breaks baseline layout); icon-only tooltip triggers without `focusableTrigger` (keyboard-unreachable).
   - Conditional same-slot `<Button type="button">`/`<Button type="submit">` swaps without distinct `key`s — React reuses the DOM node and a nav click can implicitly submit the form.
   - Currency rendered outside `formatCurrency`; appended currency codes.
   - Sticky offsets hardcoded instead of `size-header-offset`.
3. **Accessibility:**
   - Contrast at the real surface: body ≥ 4.5:1, large ≥ 3:1. Flag new sub-AA combinations; note (don't re-flag) the known system gaps: 10px `data-label` text is below common minimums but is the system's floor, and disabled buttons sit at ~1.12:1 by design.
   - Focus: every interactive element keyboard-reachable, purple ring/halo visible (destructive: red). No `outline-none` without replacement.
   - Semantics: real `<button>`/`<a>` via luz; `DataText` for machine-readable values; labels on all inputs (FieldWrapper); `alt` on images; heading order sane.
   - Tab order follows visual order; dialogs trap and restore focus (Dialog does this — verify custom overlays).
4. **Theming:** no `dark:` variants, no `prefers-color-scheme`, no stock Tailwind palette. Dark chrome only via component surfaces (toolbar/popup patterns).
5. **Responsive:** one breakpoint token exists (1440px). Check: container preset fits the surface (admin 1200 / default 1440 / narrow 755); no horizontal scroll at 1280; tables degrade (DataTable column visibility) rather than crush; side panel offsets use the size tokens.
6. **i18n:** user-facing strings through the i18n layer (next-intl on web; `createLuzTranslator` in luz); no concatenated sentence fragments; dates/numbers through the formatters; sentence case via `toSentenceCase` (correct import path).
7. **Performance (perceived first):**
   - Loading states mirror real content with `Skeleton` — a generic centered spinner is a finding.
   - Component-level failure containment: one failed data region must not blank the shell.
   - Suspense boundaries: app-shell Suspense that awaits backend data can hang hydration and block the whole page — check what the boundary actually awaits.
   - Bundle: `toSentenceCase` from the `@repo/core` main barrel leaks server-only code into the client; heavy chart libs loaded on surfaces that don't render them.
8. **Stories & tests:** changed luz components have a story per variant and updated tests; states (hover/focus/disabled/error/loading/empty) each visible in some story.

## Verification tactics (auth-gated app)

When the live page is auth-gated: verify rendered classes with a vitest render test (JSDOM) asserting the luz token classes; or use Storybook (`pnpm --filter @repo/storybook dev`); or a Vercel preview URL from the branch's deployments. Synthetic pointer sequences (incl. `pointermove`/`mousemove`) do open Base-UI tooltips in tests.

## Report

```
Scope · files scanned · lint totals
P0 (broken/unreachable/wrong data shown) → P1 (materially degraded) → P2 (quality) → P3 (nits)
Each: where (file:line) · evidence · fix (token/component/command)
Known-issue ledger: pre-existing system gaps observed but not introduced here
Plan: ordered fixes; which fs-design command owns each
```
