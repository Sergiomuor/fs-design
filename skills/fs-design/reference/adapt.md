# /fs-design adapt — viewports, print, and density contexts

Fair Supply is a desktop-first data product with one breakpoint token (`--breakpoint-xl`, 1440px) and a second first-class rendering context most products don't have: **print/PDF reports**. Adapt means making a surface honest in each context it actually serves — not inventing a mobile app.

## Viewport adaptation

1. **Container presets are the width strategy:** narrow 755 (focused flows) · admin 1200 · default 1440 · large 1900 / wide 1920 (data-wall views) · fluid. Content width is capped by preset, never by page padding; below the cap, the layout breathes via its gaps.
2. **The 1280–1440 band is the honesty test.** Most customer laptops live here. Check: no horizontal scroll, DataTables degrade by column visibility config (`createColumnVisibilityConfig`) rather than crushing cells, side panel (280+30px) and sidebar (300px) still leave the content column workable, sticky headers use `size-header-offset`.
3. **Above 1440 (`xl:`)**, layouts may widen to `large`/`wide` presets and multi-column grids — enhancement, not requirement. There are no other sanctioned breakpoint variants; a `md:`/`sm:` sprinkle is a smell (this system doesn't define those experiences — flag it, don't extend it silently).
4. **Small screens:** the platform is not designed for phones. Where a surface must minimally survive (supplier-side pages opened from email), verify it reflows to a single column without data loss and flag anything beyond that as a product decision. Touch targets: interactive elements ≥ 40px (the input/button height) helps here for free.

## Print / PDF (Report mode)

- `ReportModeContext`/`useReportMode` switches components into report rendering; currency freezes via `CurrencySnapshot` (not live `useCurrency()`).
- **Paged.js realities:** `@page` rules ignore `var()` — page-margin values must be literal in the print stylesheet (one sanctioned literal-exception zone; comment it). Repeating `<thead>` across pages needs the `beforePageLayout` source-insertion handler with fresh data-refs. Running headers via `string-set` — and beware `display:none` sources breaking it.
- Report colours are pinned to chart colours by an alignment test — never restyle a chart "for print" by hand; the domain scales are the print palette.
- Type in reports stays on the roles (print-grade = the same system, tighter rhythm); page breaks respect component boundaries (no split MetricText or half a table row).

## Density contexts

The same data at different altitudes uses the system's own switches, not ad-hoc CSS: DataTable compact cells (`px-3 py-2`) for dense grids; `data-sm`/`data-label` ranks for tight metric rows; `Tag size`/`ExposureTag size small` in tables vs `large` on scorecards; toolbar variants for dark chrome contexts.

## Verify

Render at 1280 / 1440 / 1920 plus the print/report path when the surface feeds a report. Check tables, side panels, sticky offsets, and worst-case content (long names, big numbers) at each width. luz-lint clean. Report: contexts covered, degradations chosen (and what they drop), any product-decision flags (mobile scope, new breakpoints).
