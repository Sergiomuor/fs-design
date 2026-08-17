# /fs-design colorize — apply the domain colour semantics

In generic systems "colorize" adds colour to dull UIs. In Luz that instinct is inverted: **monochrome is the design**, and colour is a semantic layer that must be *correct*, not abundant. This command makes every colour on a surface mean what the system says it means — adding colour only where meaning exists uncoloured, removing it where it lies.

## The audit

For every coloured element, and every element carrying meaning without its colour, check against the locked scales (full tables in reference/luz-core.md):

1. **Exposure/risk (five bands)** — Low `brand-blue-500` · Mod-low `product-green-500` · Moderate `product-yellow-500` · Mod-high `product-orange-500` · High `product-red-700` · Unknown gray. An exposure chart, tag, or table cell off these exact values is a correctness bug — these are pinned by `ExposureTag`, the chart palettes, and the PDF alignment test.
2. **Mitigation (triads)** — None gray/muted · Basic `product-mitigation-*` · Developing `product-recommendation-*` · Advanced `product-advanced-*` (canonical identity `#00adb0` = `product-advanced-700`), each as pill/text · tag-bg · indicator. Use `MitigationTag`/`MITIGATION_TOKENS` — never per-page maps.
3. **Score quality** — the `product-data` ramp (100 good → 500 average → 900 bad) drives ProgressBar and score displays.
4. **Tiers** — T1 `brand-orchid-500` · T2 `product-purple-700` · T3 `product-purple-accent` · T4+ gray. (The one place purple is data.)
5. **Statuses & alerts** — `STATUS_COLORS`/labels for record states; Alert tone triads for feedback. Draft yellow, pending orange, active green — from the maps, not memory.
6. **Branded modules** — Emissions/Modern Slavery/Biodiversity theme entirely from one family (100 surface · 500 identity · 700 text/bars · 900 headings). No cross-family borrowing inside a branded surface.
7. **Charts** — series colours from `CHART_EXPOSURE_COLORS`/`CHART_MITIGATION_COLORS`/`CHART_CATEGORY_COLORS`/`CHART_TIER_COLORS`/`CHART_EMISSION_DONUT_COLORS`; "other/unknown" segments `base-gray-input`. The nine known hardcoded chart one-offs are drift — replace on contact, never copy.

## Adding colour (the rare direction)

Meaning present but uncoloured — a risk table showing bands as text only, statuses reading as plain strings — gets its scale colour via the proper component (`ExposureTag`, `MitigationTag`, `Tag indicatorColor`, `DataLabel indicatorColor` — token names, no `bg-` prefix). Colour supplements the label; it never replaces it (colour-blind users read the word).

## Removing colour

Any hue that answers no meaning-question goes neutral: decorative tints → `surface-background`; coloured icons on uniform actions → default ink; purple anywhere outside focus/selection/tier-data → out. Red reserved for High exposure and real errors — an orange-tinted "notice" on routine info becomes neutral or `info` blue.

## Verify

Every colour on the surface now decodes via a scale, a status map, a branded family, or an interaction state — list the answer per element. Contrast holds (700-depth text on 100 tints; text on 500 fills checked case by case). luz-lint clean (it flags stock palette, hex, and suspicious purple). Report: corrected / added / removed, with the scale each maps to.
