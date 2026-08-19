# /fs-design typeset — type roles on the 10px grid

Typography here is a closed system: three faces with fixed jobs, composite roles that set family+size+line-height+weight together, and a 10px vertical grid that layout tokens are computed from. Typeset work is casting — putting every text node in its correct role — not font styling.

## The casting table

- Page title → `heading-lg` (30/40·300) · section → `heading-md` · card header needing weight at small size → `heading-sm` (18/20·500) · compact headers → `heading-xs`/`heading-xxs`.
- Prose → `body-md` (14/24, the workhorse); dense secondary → `body-sm` (13/24); generous intro → `body-lg` (16/30); fine print → `body-tiny`/`body-aside`.
- Metrics → `data-xl` (35/40·200) hero · `data-lg`/`data-md`/`data-sm` descending. **Numbers are Lausanne at 200–300 — a metric in bold Inter has lost its rank.** Use `DataText`/`MetricText`, which also emit the machine-readable `<data>` element.
- Micro-labels → `data-label` (10/20·400·uppercase, the platform's most-used style) or `label-xs` (10/14·500·0.7px tracking, the Figma-faithful one). Pick one per context and stay consistent.
- IDs/codes → `data-small-alt`/`data-tiny-alt` (Roboto Mono). Mono is for identifiers and measurements, never a "technical" costume.

## The rules in force

1. **Composite roles only.** Never assemble family+size+leading by hand; `leading-body-*` exists for the one legal mix (body rhythm on a non-body size). Raw Tailwind classes are incompatible by line-height (`text-sm` = 14/20 vs `text-body-md` = 14/24) — they silently break the grid that `--size-*` tokens are computed from.
2. **Weight inverse to size.** 35px runs at 200; 10px labels at 500. If a heading needs more presence, step its *size* rank, don't bolden it. (`Text` is the only wrapper with a `weight` prop, because body is the only role that leaves weight open.)
3. **Everything wears a role.** Bare text renders in the system font — nothing sets Inter on `<body>`. Any unclassed text node is a bug. `font-twk` doesn't exist; the heading face is `font-heading` (or a role that includes it).
4. **The floor is 10px.** Nothing below `data-label`/`label-xs`. They already sit under common a11y minimums — don't compound it, and don't put long-form content in them.
5. **Semantics decoupled from appearance.** `as` sets the element, `size` sets the look — an `<h1>` can be visually `sm`; heading order stays logical for screen readers regardless of visual scale.

## Method

Inventory every text node on the surface → assign its role from the casting table → flag hierarchy dishonesty (two adjacent ranks looking identical; a label outranking its value) → fix rank by size steps, not weight → verify line-heights land on the grid (computed styles: 20/30/40 dominate) → check colour tiers (`black` content · `dark` values · `medium` secondary · `light` captions).

Verify: luz-lint clean (raw type classes, phantom fonts, raw leading all flagged); one render pass confirming rhythm — consecutive baselines of heading/data/label roles step in 10px increments (body prose runs its own 24/30 leading and is exempt); the most consequential number is the typographic hero. Report: recastings by node, any deliberate `leading-body-*` mixes and why.
