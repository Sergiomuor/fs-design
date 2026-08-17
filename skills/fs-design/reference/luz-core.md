# FS-Luz ground rules

The distilled operating rules of the Luz design system. Ground truth is `packages/luz/src/styles.css` on `main` (a Tailwind v4 `@theme` block); the repo-root `DESIGN.md` is the full portable spec with every token value in its frontmatter. This file is the working subset every command needs. Values here were verified against production on 2026-08-17; run `doctor` if you suspect drift.

## The vocabulary

**One package** (`@repo/luz`, one barrel import), **one primitive** (`Box`), **one light theme** (no `.dark`, no `prefers-color-scheme` — dark surfaces like the filter toolbar are components built from `base-black`/`base-black-800`, not a theme).

### The styling ladder — take the first rung that works

1. **Component default** — `<Stack>` already gaps at 15px; don't restate it.
2. **Luz component props** — `<Box p={4} gap={2}>`, `<Card p={7}>`. Type-checked, token-constrained.
3. **`tv()` variants in a `.styles.ts` file** — conditional styles, slots, pseudo-states.
4. **Raw `className`** — last resort. One off-the-shelf utility is fine; several means you needed rung 2 or 3.

Application code uses named components, never raw `<div>`s, and not Box directly when a semantic component exists.

### Reuse before create

Search `packages/luz/src/` before building anything. Extend via props and variants before creating new components; ask before creating a component that doesn't exist in luz. New or changed components ship complete: full variant set; hover, focus, disabled, error, loading, and empty states; a story per variant. Figma and code stay in parity — when they disagree, stop and flag; never silently diverge.

## Colour

- **Page ground** `surface-background` (#fbfbfc) · **content surface** `base-white` (#ffffff) · **default border** `surface-border` → `base-gray-border` (#e2e2e3, set globally — you set border *width*, colour is already right) · **muted fill** `muted` → `base-gray-other` (#eeeeee).
- **Text tiers:** `text-black` #000000 (headings, table content, links) · `text-dark` #353a3c (input values, table labels) · `text-medium` #585b5d (secondary body) · `text-light` #656e72 (column headers, captions, placeholders).
- **Family rhythm:** eleven brand/product families share one shape — **100** tint for backgrounds, **500** the identifying hue, **700** text and bar fills, **900** headings and pressed states. Branded modules theme entirely from one family.

**The five colour rules:**

1. **Black carries the brand.** Black on white is the FairSupply signal: primary buttons, ink, links. If one colour must say FairSupply, it is black.
2. **Purple means focus.** `product-purple-700` (#4c2fff) is focus and selection machinery only (every focus ring, input focus border, row selection, the 20% halo `stroke-shadow`), plus a legitimate data series (tiers, choropleth). Never decoration.
3. **Colour is consequence.** Colour appears where meaning does — risk bands, ratings, statuses, alert tones, branded modules. If an element is coloured, a reader must be able to ask "what does this colour tell me?" and get an answer.
4. **Tint-text-heading rhythm.** Inside a family: 100 surface, 700 text/bars, 900 headings/pressed. 500 identifies; it rarely carries text.
5. **One light theme.** Dark surfaces are component decisions (toolbar, dropdown popups — always dark regardless of trigger context), not themes.

**Domain scales are locked** (by `ExposureTag`, `MitigationTag`, `chart-colors.ts`, and a PDF-alignment test):

- **Exposure (5 bands):** Low `brand-blue-500` #00ace1 · Mod-low `product-green-500` #06d18b · Moderate `product-yellow-500` #fecb00 · Mod-high `product-orange-500` #fa5c03 · High `product-red-700` #b2002b · Unknown `base-gray-input`/`base-gray-disabled`.
- **Mitigation (pill/text · tag bg · indicator):** None `base-gray-input`/`muted`/— · Basic `product-mitigation-700` #ff005c / `-300` / `-900` · Developing `product-recommendation-700` #3c76e0 / `-300` / `-900` · Advanced `product-advanced-700` #00adb0 / `-300` / `-900`.
- **Score quality:** `product-data` ramp, 100 good → 500 average → 900 bad (#bf002e; also the input error border).
- **Tiers:** T1 `brand-orchid-500`, T2 `product-purple-700`, T3 `product-purple-accent`, T4+ `base-gray-input`.
- **Alert tones (bg · icon/border · text):** info `brand-blue-100/500/900` · success `product-green-100/500/900` · warning `product-orange-100/500/900` · error `product-red-100/500/900`.

## Typography

Three faces: **TWK Lausanne** (`font-heading`, headings *and* numbers), **Inter** (`font-body`), **Roboto Mono** (`font-mono`, IDs/codes). Data is a first-class type role: metrics use the display face at ultra-light weights (200–300) — never bold Inter.

Roles are composite utilities — one class sets family, size, line-height, weight together:

| Role | Spec | Use |
|---|---|---|
| `text-heading-lg` | 30/40 · 300 | page titles |
| `text-heading-md` | 24/30 · 300 | section titles (`Heading` default) |
| `text-heading-sm` | 18/20 · 500 | card headers |
| `text-heading-xs` / `-xxs` | 16/20 · 400 / 14/20 · 300 | compact headers |
| `text-body-lg` / `-md` / `-sm` / `-tiny` | 16/30 · 14/24 (workhorse) · 13/24 · 12/14 | Inter body; only body leaves weight open |
| `text-body-aside` | 12/14 · 300 italic | fine print |
| `text-data-xl` | 35/40 · 200 | hero metrics |
| `text-data-lg` / `-md` / `-sm` | 24/30 · 200 / 16/30 · 200 / 14/20 · 300 | descending figures |
| `text-data-label` | 10/20 · 400 · uppercase | THE most-used style: micro-labels |
| `text-label-xs` | 10/14 · 500 · uppercase · 0.7px | Figma-faithful label |
| `text-data-small-alt` / `-tiny-alt` | 14/20 · 12/20 mono | IDs and codes |

**Rules:** weight is inverse to size (35px runs at 200, 10px labels at 500). Line-heights snap to the 10px grid (20/30/40) — this is load-bearing; layout tokens are computed from type tokens. Raw Tailwind text classes are quietly incompatible (`text-sm` is 14/**20** where `text-body-md` is 14/**24**). Pick a role class, never assemble family+size+leading by hand; `leading-body-*` exists for body rhythm on a non-body size. Components: `Heading` (h2/md default), `Text` (p/md, has `weight`), `DataText` (real `<data>` element, takes `value`), `HeadingLink`. Shared `color` options: `black` (default), `dark`, `medium`, `light`, `brand.blue`, `brand.green`, `brand.orchid`.

**Cautions:** all sizes are fixed px. Nothing sets Inter on `<body>` — bare text outside a role class renders in the system font. `font-twk` does not exist (silent fallback). 10px labels are the floor; never smaller.

## Space

One named 5px-based scale, **not** stock Tailwind: `1`=5 `2`=10 `3`=15 `4`=20 `5`=30 `6`=40 `7`=50 `8`=70 `9`=100, then `ds-10`=120 `ds-11`=150 `ds-12`=200.

**The step-ten boundary:** steps 10–12 are named `--spacing-ds-*`. Tailwind falls back to its own multiplier for missing names, so `p-10` is **40px, not 120px**, and fractional utilities (`gap-1.5`) are off-scale. Never use a numeric spacing utility ≥ 10 or a fractional one — use Box props (`p={10}` emits `var(--spacing-ds-10)`) or the `*-ds-*` utilities.

**Choosing:** 1–2 inside a component, 3–4 between components, 5–7 between sections, 8–9 between page regions. Never invent an off-scale value — restructure instead. Structural dimensions come from `--size-*` tokens (header 70px, sticky offset 82px via `size-header-offset`, sidebar 300px, side panel 280px+30px); one breakpoint token exists: 1440px.

**Component defaults are the spacing contract** — override via props (`<Card p={7}>` beats a wrapper): Stack `gap={3}` (15) · Card `p={5}` (30) + border · Region `p={0}` + border · RegionHeader/RegionContent/ModuleSectionHeader `p={7}` (50 — the dominant container padding) · SidebarLayout `gap={4}` · Button md `px-4`, h-40 · DataTable cell `px-4 py-4`. Field rhythm is `gap-field` (6px — the one deliberate off-scale value).

**Gap over margin:** padding on containers, gap between children, one owner per gap. A component never adds outer margin to position itself. Containers cap width: `container-narrow` 755 · `container-admin` 1200 · `container-layout` 1440 · `container-wide` 1920 · fluid.

## Material

Flat, bordered, lit by focus. Depth = hairline borders + background shifts (#ffffff on #fbfbfc), almost never shadow.

- **Border before shadow.** 1px `surface-border` hairline first; the global rule means you only set width.
- **Shadow vocabulary:** `subtle` (quietest lift) · `light` (bordered lift, doubles as hairline) · `heavy` (large overlays) · `focus` (the purple halo `0 0 0 2px rgba(76,47,255,0.2)`) · `button-secondary/-hover/-active` (the secondary button draws its border with a shadow ring that turns purple-tinted on hover/press).
- **Coloured halos are interaction feedback only:** purple focus, crimson field error, emerald field success. Decorative glows do not exist.
- **Radius:** controls at 4px (`rounded-input`, `rounded-button`); `rounded-xsmall` 2px; numbered scale `rounded-1/2/3` = 5/10/20; `toolbar` 20 / `toolbar-sm` 10; `pill` is a soft 10px rectangle — true capsules use `rounded-full` (the action button).

## Utilities to reach for (instead of raw values)

Type roles `text-heading-*`/`text-body-*`/`text-data-*`, `leading-body-*`, `font-heading|body|mono` · input metrics `h-input px-input py-input pl-input-with-prefix pr-input-with-suffix border-input-focus` · field rhythm `gap-field space-y-field` · spacing escapes `*-ds-5/7/9/11` · containers `container-layout|narrow|admin|wide` · colours `bg-/text-/border-` + any token name (`bg-surface-background`, `text-text-medium`, `border-surface-border`).

If a value isn't in `styles.css`, it is either a token that needs adding or a sign the moment is bespoke — a deliberate decision with a comment, never a `text-[11px]` in passing.
