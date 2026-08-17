---
name: FS-Luz
description: Luz system. Light, spacious surfaces under strong black type. Colour is deliberate and earned by consequence; purple only ever means focus. One primitive (Box), one token vocabulary, one light theme.

# All values below mirror packages/luz/src/styles.css verbatim. That file is the
# source of truth; this frontmatter is the portable export. If a token changes
# there, update both. Names are code names (the Tailwind v4 @theme tokens without
# their --color-/--spacing-/--radius- prefixes). The Figma library (FS-Luz: UI)
# uses a different naming system linked to these by value, not by name — Figma
# names appear in parentheses on first mention in the body, then never again.

colors:
  # Base
  white: "#ffffff"
  base-black: "#000000"            # primary button fill, foreground text, links
  base-black-600: "#404040"        # dark toolbar / filter chrome surfaces
  base-black-800: "#222126"        # primary button hover, dark toolbar media
  base-white: "#ffffff"            # card & page surface, text on dark fills

  # Base gray (the neutral ramp)
  base-gray-dark: "#353a3c"        # input value text, table labels
  base-gray-medium: "#585b5d"      # secondary body text, primary button active
  base-gray-light: "#656e72"       # column headers, placeholders, muted text
  base-gray-disabled: "#9eacb2"    # disabled input text
  base-gray-input: "#bbbbbb"       # "other"/unknown chart segments, unset pills
  base-gray-border: "#e2e2e3"      # THE default border (global * border-color)
  base-gray-background: "#fbfbfc"  # page ground, muted panels, disabled fills
  base-gray-active: "#fcfaff"      # secondary/tertiary button hover fill
  base-gray-other: "#eeeeee"       # muted fills, disabled button bg

  # Brand
  brand-blue-100: "#f2fbfd"
  brand-blue-500: "#00ace1"
  brand-blue-700: "#00799e"
  brand-blue-900: "#004b62"
  branded-biodiversity-background: "#e5f7fc"   # biodiversity summary card bg
  brand-green-100: "#eef8f1"
  brand-green-500: "#51af82"
  brand-green-700: "#286e37"
  brand-green-900: "#1f3312"
  brand-orchid-100: "#f8f2ff"
  brand-orchid-500: "#9e2eb2"
  brand-orchid-accent: "#9333ea"   # legacy — declared, barely consumed
  brand-orchid-700: "#6c409f"
  brand-orchid-900: "#310761"

  # Product families (100 tint / 500 identity / 700 text / 900 heading)
  product-pink-100: "#fcf6f7"
  product-pink-500: "#fbc6da"
  product-pink-700: "#ad468c"
  product-pink-900: "#7e1b5e"
  product-meadow-100: "#fbf8f4"
  product-meadow-500: "#cccc91"
  product-meadow-700: "#6d5534"
  product-meadow-900: "#28121a"
  product-blue-100: "#f2f6ff"
  product-blue-500: "#416a9d"
  product-blue-700: "#354a85"
  product-blue-900: "#22216c"
  product-purple-100: "#f2f2ff"
  product-purple-500: "#bdc2f2"
  product-purple-accent: "#8082ff"  # tier-3 in supply-chain charts
  product-purple-700: "#4c2fff"     # THE focus ring; selection
  product-purple-900: "#301ab7"
  product-red-100: "#fff7f9"
  product-red-400: "#c75e7e"
  product-red-500: "#d90034"        # destructive actions, field error text
  product-red-700: "#b2002b"        # highest exposure band, destructive hover
  product-red-900: "#73001c"
  product-orange-100: "#faf1ec"
  product-orange-500: "#fa5c03"     # warnings, moderate-high exposure, pending
  product-orange-700: "#b45018"
  product-orange-900: "#551f00"
  product-green-100: "#edf7f4"
  product-green-500: "#06d18b"      # success, moderate-low exposure, active
  product-green-700: "#00754d"
  product-green-900: "#002a1b"
  product-yellow-100: "#fffbeb"
  product-yellow-500: "#fecb00"     # moderate exposure, draft status
  product-yellow-700: "#c9a000"
  product-yellow-900: "#7a6100"

  # Domain ramps (meaning, not brand)
  product-data-100: "#06d18b"       # good score
  product-data-300: "#00ace1"
  product-data-500: "#fecb00"       # average score
  product-data-700: "#fa5c03"       # pending
  product-data-900: "#bf002e"       # bad score, input error border
  product-mitigation-100: "#ffffff"
  product-mitigation-300: "#fff7fa" # Basic mitigation tag bg
  product-mitigation-700: "#ff005c" # Basic mitigation pill/text
  product-mitigation-900: "#73001c" # Basic mitigation indicator
  product-recommendation-100: "#ffffff"
  product-recommendation-300: "#ebf1fc" # Developing mitigation tag bg
  product-recommendation-700: "#3c76e0" # Developing mitigation pill/text
  product-recommendation-900: "#002872" # Developing indicator; confirm button
  product-advanced-100: "#ffffff"
  product-advanced-300: "#f2fbfd"   # Advanced mitigation tag bg
  product-advanced-700: "#00adb0"   # Advanced mitigation pill/text
  product-advanced-900: "#094848"   # Advanced mitigation indicator
  product-emissions-500: "#06d18b"
  product-emissions-700: "#00754d"

  # Interaction halos (the only coloured "glow" in the system)
  stroke-shadow: "rgba(76, 47, 255, 0.2)"          # purple focus halo
  stroke-error-shadow: "rgba(191, 0, 46, 0.2)"     # error halo
  stroke-success-shadow: "rgba(6, 209, 139, 0.2)"  # success halo

  # Semantic aliases — values are references, exactly as in source
  button-primary-bg: "{colors.base-black}"
  button-primary-text: "{colors.base-white}"
  button-primary-border: "{colors.base-black}"
  button-primary-hover: "{colors.base-black-800}"
  button-primary-active: "{colors.base-gray-medium}"
  button-secondary-bg: "{colors.base-white}"
  button-secondary-text: "{colors.base-black}"
  button-secondary-hover: "{colors.base-gray-active}"
  button-secondary-active: "{colors.base-gray-active}"
  button-focus-ring: "{colors.product-purple-700}"
  button-confirm-bg: "{colors.product-recommendation-900}"
  button-confirm-text: "{colors.base-white}"
  button-confirm-border: "{colors.product-recommendation-900}"
  button-confirm-hover: "color-mix(in srgb, {colors.product-recommendation-900} 85%, black)"
  button-confirm-active: "color-mix(in srgb, {colors.product-recommendation-900} 70%, black)"
  button-disabled-bg: "{colors.base-gray-other}"
  button-disabled-text: "{colors.base-gray-border}"
  button-disabled-border: "{colors.base-gray-border}"
  input-bg: "{colors.base-white}"
  input-border: "{colors.base-gray-border}"
  input-text: "{colors.base-gray-dark}"
  input-placeholder: "{colors.base-gray-light}"
  input-focus-border: "{colors.product-purple-700}"
  input-focus-ring: "{colors.stroke-shadow}"
  input-disabled-bg: "{colors.base-gray-background}"
  input-disabled-text: "{colors.base-gray-disabled}"
  input-error-border: "{colors.product-data-900}"
  input-error-ring: "{colors.stroke-error-shadow}"
  input-success-border: "{colors.brand-green-700}"
  input-success-ring: "{colors.stroke-success-shadow}"
  input-error-text: "{colors.product-red-500}"
  input-success-text: "{colors.product-green-500}"
  surface-background: "{colors.base-gray-background}"
  surface-border: "{colors.base-gray-border}"
  muted: "{colors.base-gray-other}"
  text-black: "{colors.base-black}"
  text-dark: "{colors.base-gray-dark}"
  text-medium: "{colors.base-gray-medium}"
  text-light: "{colors.base-gray-light}"
  foundation-text-light: "{colors.product-red-400}"  # legacy — luz docs accent only

typography:
  families:
    heading: "TWK Lausanne, sans-serif"   # --font-heading → var(--font-twk-lausanne)
    body: "Inter, sans-serif"             # --font-body → var(--font-inter)
    mono: "Roboto Mono, monospace"        # --font-mono → var(--font-roboto-mono)
  # Roles are composite @utility classes: one class sets family, size,
  # line-height, and weight together. Pick a role, never assemble one by hand.
  heading-lg: { size: "30px", lineHeight: "40px", weight: 300, family: heading }
  heading-md: { size: "24px", lineHeight: "30px", weight: 300, family: heading }
  heading-sm: { size: "18px", lineHeight: "20px", weight: 500, family: heading }
  heading-xs: { size: "16px", lineHeight: "20px", weight: 400, family: heading }
  heading-xxs: { size: "14px", lineHeight: "20px", weight: 300, family: heading }
  body-lg: { size: "16px", lineHeight: "30px", weight: inherit, family: body }
  body-md: { size: "14px", lineHeight: "24px", weight: inherit, family: body }
  body-sm: { size: "13px", lineHeight: "24px", weight: inherit, family: body }
  body-tiny: { size: "12px", lineHeight: "14px", weight: inherit, family: body }
  body-aside: { size: "12px", lineHeight: "14px", weight: 300, style: italic, family: body }  # reuses the body-tiny size/line-height tokens
  data-xl: { size: "35px", lineHeight: "40px", weight: 200, family: heading }
  data-lg: { size: "24px", lineHeight: "30px", weight: 200, family: heading }
  data-md: { size: "16px", lineHeight: "30px", weight: 200, family: heading }
  data-sm: { size: "14px", lineHeight: "20px", weight: 300, family: heading }
  data-label: { size: "10px", lineHeight: "20px", weight: 400, family: body, transform: uppercase }
  label-xs: { size: "10px", lineHeight: "14px", weight: 500, family: body, transform: uppercase, letterSpacing: "0.7px" }
  data-small-alt: { size: "14px", lineHeight: "20px", weight: 400, family: mono }
  data-tiny-alt: { size: "12px", lineHeight: "20px", weight: 400, family: mono }
  button-xs: { size: "12px" }   # button utilities set size only; the Button
  button-sm: { size: "13px" }   # base adds font-body, weight, and leading-4
  button-md: { size: "14px" }

rounded:
  input: "4px"
  xsmall: "2px"
  button: "4px"
  spotlight: "20px"
  toolbar: "20px"
  toolbar-sm: "10px"
  pill: "10px"        # a soft rectangle, not a capsule — capsules use rounded-full
  "1": "5px"
  "2": "10px"
  "3": "20px"

spacing:
  "1": "5px"      # icon-to-label, tight inline pairs
  "2": "10px"     # default inline gap between related controls
  "3": "15px"     # Stack default; vertical rhythm inside a group
  "4": "20px"     # padding inside compact containers
  "5": "30px"     # Card padding; gap between sibling cards
  "6": "40px"     # gap between subsections
  "7": "50px"     # page gutters; Region/ModuleSection padding
  "8": "70px"     # separation between major page sections
  "9": "100px"    # page-level top/bottom rhythm
  ds-10: "120px"  # full-bleed blocks — props-only territory, see The Step-Ten Boundary Rule
  ds-11: "150px"
  ds-12: "200px"

shadows:
  subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.03)"
  light: "0 3px 3px 0 rgba(0, 0, 0, 0.02), 0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 1px 0 0 rgba(0, 0, 0, 0.09), 0 0 0 1px rgba(0, 0, 0, 0.1)"
  heavy: "0 29px 50px 0 rgba(0, 0, 0, 0.11), 0 18.8px 29px 0 rgba(0, 0, 0, 0.08), 0 11.17px 15.93px 0 rgba(0, 0, 0, 0.07), 0 5.8px 8.13px 0 rgba(0, 0, 0, 0.05), 0 2.36px 4.07px 0 rgba(0, 0, 0, 0.04), 0 0.54px 1.97px 0 rgba(0, 0, 0, 0.03)"
  focus: "0 0 0 2px rgba(76, 47, 255, 0.2)"
  button-secondary: "0 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 0 0 rgba(0, 0, 0, 0.09), 0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 3px 3px 0 rgba(0, 0, 0, 0.02)"
  button-secondary-hover: "0 0 0 1px rgba(76, 47, 255, 0.1), 0 1px 0 0 rgba(76, 47, 255, 0.09), 0 1px 2px 0 rgba(76, 47, 255, 0.04), 0 3px 3px 0 rgba(76, 47, 255, 0.02)"
  button-secondary-active: "0 0 0 2px rgba(76, 47, 255, 0.15), 0 1px 0 0 rgba(76, 47, 255, 0.1), 0 1px 2px 0 rgba(76, 47, 255, 0.05), 0 3px 3px 0 rgba(76, 47, 255, 0.04)"

motion:
  ease-button-action: "cubic-bezier(0.4, 1.8, 0.6, 1)"   # the action-button spring
  spin: "spin 1s linear infinite"
  spin-slow: "spin 2s linear infinite"
  pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
  shimmer: "shimmer 1.5s infinite"                        # Skeleton
  rotate-to-45: "rotate-to-45 0.3s ease-in-out forwards"
  rotate-from-45: "rotate-from-45 0.3s ease-in-out forwards"

layout:
  breakpoint-xl: "1440px"                 # the only breakpoint token
  width-container: "1440px"
  width-container-narrow: "755px"
  width-container-admin: "1200px"
  width-container-large: "1900px"
  width-container-wide: "1920px"
  width-container-fluid: "100%"
  size-sidebar-width: "300px"
  size-header-height: "70px"
  size-header-offset: "82px"              # sticky offsets read this, never a raw px
  size-datablock-bookend-block: "335px"
  size-side-panel-width: "280px"
  size-side-panel-gap: "30px"
  size-side-panel-offset: "calc(var(--size-side-panel-width) + var(--size-side-panel-gap))"
  size-toolbar-result-item-height: "calc(2 * var(--spacing-4) + var(--line-height-heading-xs) + var(--line-height-body-md) + 0.25rem)"
  size-toolbar-results-max-h: "500px"
  size-input-height: "40px"
  size-input-padding-x: "15px"
  size-input-padding-y: "10px"
  size-input-padding-with-prefix: "40px"
  size-input-padding-with-suffix: "50px"
  size-input-prefix-left: "12px"
  size-input-suffix-right: "8px"
  border-width-input-focus: "0.5px"
  size-field-gap: "6px"                   # label-to-input; deliberately off-scale
  size-dropdown-menu-min-width: "230px"
  size-dialog-content-min-height: "320px"
  size-dialog-scrollable-max-height: "280px"
  size-dialog-error-area-height: "50px"
  size-upload-modal-padding: "50px"
  size-upload-modal-height: "750px"

components:
  button-primary:
    backgroundColor: "{colors.button-primary-bg}"
    textColor: "{colors.button-primary-text}"
    borderColor: "{colors.button-primary-border}"
    hoverBackground: "{colors.button-primary-hover}"
    activeBackground: "{colors.button-primary-active}"
    rounded: "{rounded.button}"
    height: "40px"                # medium; micro 20 / tiny 25 / small 30 / large 50
    typography: "{typography.button-md}"
  button-secondary:
    backgroundColor: "{colors.button-secondary-bg}"
    textColor: "inherit"          # black — no text class is set
    borderColor: "transparent"    # the hairline is drawn by the shadow ring
    shadow: "{shadows.button-secondary}"
    hoverBackground: "{colors.button-secondary-hover}"
    hoverShadow: "{shadows.button-secondary-hover}"
  button-tertiary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.base-black-800}"
    borderColor: "transparent"
    hoverBackground: "{colors.button-secondary-hover}"
  button-confirm:
    backgroundColor: "{colors.button-confirm-bg}"
    textColor: "{colors.base-white}"
    borderColor: "{colors.button-confirm-border}"
    hoverBackground: "{colors.button-confirm-hover}"
  button-destructive:
    backgroundColor: "{colors.product-red-500}"
    textColor: "{colors.white}"
    hoverBackground: "{colors.product-red-700}"
    activeBackground: "{colors.product-red-900}"
    focusOutline: "{colors.product-red-500}"   # the one non-purple focus ring
  button-action:
    shape: "rounded-full pill with a sliding arrow slot"
    textColor: "{colors.white}"
    palette: "colorPalette prop — black, white, brand.* and product.* fills"
    easing: "{motion.ease-button-action}"
  button-lozenge:
    backgroundColor: "{colors.base-white}"
    borderColor: "{colors.base-gray-border}"
    rounded: "{rounded.1}"
    height: "20px"
    typography: "{typography.button-xs}"
  input-text:
    backgroundColor: "{colors.input-bg}"
    textColor: "{colors.input-text}"
    borderColor: "{colors.input-border}"
    placeholderColor: "{colors.input-placeholder}"
    rounded: "{rounded.input}"
    height: "{layout.size-input-height}"
    padding: "{layout.size-input-padding-y} {layout.size-input-padding-x}"
    focusBorder: "{colors.input-focus-border}"
    focusRing: "{colors.input-focus-ring}"
  card:
    backgroundColor: "{colors.base-white}"
    borderColor: "{colors.surface-border}"
    padding: "{spacing.5}"
    rounded: "none by default — radius is opt-in via the radius prop"
  region:
    backgroundColor: "{colors.base-white}"
    borderColor: "{colors.surface-border}"
    headerPadding: "{spacing.7}"
    contentPadding: "{spacing.7}"
---

# Design System: FS-Luz

## 1. Overview: Luz

**Creative North Star: "Luz"**

FairSupply is a light, spacious interface built around clarity, consequence and confidence. The product should feel like an informed consultant: structured, precise and calm, using space and hierarchy to make complex information easy to scan, understand and act on.

The interface never competes with the data. Visual emphasis is earned by consequence: the most important insight, risk or decision should be immediately clear, followed naturally by the next step. Depth, methodology and evidence remain accessible without overwhelming the primary experience.

**Key characteristics**

- Generous whitespace used as structure, not decoration.
- Clear hierarchy that prioritises consequence over volume of information.
- Strong black typography on calm, light surfaces.
- Colour used deliberately, based on purpose, context, and the models it represents.
- Data presented with enough context to feel credible and defensible.
- Complexity progressively revealed rather than shown all at once.
- Every important state makes clear what it means and what happens next.
- Minimal decoration; every visual element supports comprehension, navigation or decision-making.

**Who it serves.** The platform spans a spectrum of users — daily procurement operators with little ESG background, periodic overseers, and deep ESG experts. The governing product principle: *design each experience for its primary user, but make it understandable to every user.* Luz's job is to translate that into surfaces: meaning first, methodology one step deeper.

## 2. The Library: One Vocabulary For Every Screen

Luz ships as `@repo/luz`, one package with one barrel import. Tokens live in `packages/luz/src/styles.css` (a Tailwind v4 `@theme` block), components in `packages/luz/src/components/` grouped by category, stories co-located next to every component. Storybook is the living catalogue: `pnpm --filter @repo/storybook dev` → http://localhost:6006, published at https://luz.fairsupply.io/.

### The Box Composition Rule

Everything composes from `Box`, a single foundational primitive that maps design tokens to type-safe props. Higher-level components (`Card`, `Flex`, `Stack`, `Region`) add semantic defaults while inheriting Box's API. Application code uses named components, not raw `<div>`s and not Box directly when a semantic component exists.

When styling, take the first rung of this ladder that works:

1. **A component default** — `<Stack>` already gaps at 15px; don't restate it.
2. **Luz component props** — `<Box p={4} gap={2}>`, `<Card p={7}>`. Type-checked, token-constrained.
3. **`tv()` variants in a `.styles.ts` file** — for conditional styles, slots, and pseudo-states.
4. **Raw `className`** — last resort. One off-the-shelf utility is fine; several means you needed rung 2 or 3.

### The Reuse-Before-Create Rule

Search `packages/luz/src/` before building anything. Extend via props and variants before creating new components. New or changed components ship complete: the full variant set; hover, focus, disabled, error, loading and empty states; and a story per variant. Figma and code stay in parity — when they disagree, stop and flag it; never silently diverge.

### What's In The Library (cheatsheet)

Exact exported names from the `@repo/luz` barrel. **Bold** = core (fully documented in §7). *Legacy* items are listed in §7's legacy block — do not use them in new work.

**foundation** — **Box**, **Button**, **Card**, **Dialog** (+ DialogTrigger/Content/Title/Description/Close), **Skeleton**, **Tooltip**, **Icon**, CrosshairsIcon, ClockIcon, List, ListItem, ScrollArea, Separator, SplitButton, and the typography four: **Heading**, **Text**, **DataText**, HeadingLink.

**inputs-and-forms** — **Input**, **Dropdown**, **Form**, **FormField**, FieldWrapper, FormSubmit, useForm, Checkbox, Radio, RadioGroup, Switch, Calendar, DayPicker, DayRangePicker, DateRangePicker, SpendRangePicker, Dropzone (+ validateFile), SearchCombobox, TitleSelect, FormOTP, InputOTP, FormContext, FilterVariantContext.

**navigation-and-toolbars** — **SectionToggleTab** (+ Root/List), **BigTabs** (compound), Breadcrumb, BreadcrumbItem, Toolbar (+ ToolbarSearch/Results/ResultItem/ResultsEmpty), FilterToolbar (+ FilterPanel, filter registry helpers), BulkActionsToolbar, HeaderMenu, NumberedPagination, SidebarNav, ViewToggle.

**page-structure** — **Stack**, **Flex**, **Grid**, **Region**, **RegionHeader**, **RegionContent**, **ModuleSection** (+ Header/TabList/Tab/Panel), **LayoutContainer**, **LayoutHeader**, **HeaderAction**, **SidebarLayout**, ExpandableSection, *LayoutPage*.

**status-and-indicators** — **Alert**, **Tag**, **Badge**, **Loader**, Indicator, ProgressBar, ProgressDots, NotFound, AlertDialog, *AlertTitle*, *AlertDescription*.

**data-visualisation** — **DataBlock** (+ .Grid/.Item/.Title), **DataLabel**, **DataTable** (+ column helpers), **Table** (compound), **MetricText** (+ MetricMitigation/MetricExposure/MetricWrapper), **CategoryBar**, BarChart, DonutChart, BubbleChart, SparkBar, StatDisplay, Odometer, WorldMap (+ Interactive/Static), ChartTooltip, ChartTooltipContent, SelectableDataTable.

**domain-components** — **MitigationTag**, **ExposureTag**, **BrandedInsight**, BrandedSummary, Scorecard family (Scorecard/Header/HeaderLeft/HeaderRight/Body/Content/Actions/Link), AssessmentPieChart, EngagementInsightsChart, EngagementReviewProgressBar, MitigationProfile, RiskProfile, SectorExposure, TierAnalysisDisplay, Item, branded icons.

**context & i18n** — ReportModeContext, useReportMode, createLuzTranslator, defaultMessages, enMessages (consumed by `packages/core` for PDF reports).

**lib** — `cn`, luz-configured `tv`, `formatCurrency`, `formatNumber`, `formatPercent`, `formatCurrencyAbbreviated`, `formatNumberAbbreviated`, `formatTooltipPercent`, `formatTooltipImpact`, DataTable column factories (`createTextColumn`, `createDateColumn`, `createCurrencyColumn`, `createSelectionColumn`, `createExposureColumn`, `createColumnVisibilityConfig`, `createOrderedSortFn`, `createLocaleSortFn`), CSV export (`downloadCsv`, `serializeCsv`, `buildCsvFilename`), chart palettes (`CHART_EXPOSURE_COLORS`, `CHART_MITIGATION_COLORS`, `CHART_CATEGORY_COLORS`, `CHART_TIER_COLORS`, `CHART_ACTIVE_STATUS_COLORS`, `CHART_EMISSION_DONUT_COLORS`, …), status maps (`STATUS_COLORS`, `STATUS_LABELS`, `ENGAGEMENT_STATUS_LABELS`, `ENGAGEMENT_STATUS_ORDER`), domain token maps (`EXPOSURE_TOKENS`, `MITIGATION_TOKENS`, `TIER_TOKENS`), `MODULE_OPTIONS`/`MODULE_LABELS`, `REPORT_TYPE_OPTIONS`, `segment-fill` helpers, `useDebounceCallback` (re-export), `toSentenceCase` (re-export from `@repo/core/domain/utils/string-utils` — never from the `@repo/core` main barrel, which pulls server-only code).

### Tokens vs Classes

Components consume tokens through composite utilities and semantic classes. When you need a value outside a component, use the utility first, the raw `var()` second, and a literal never:

- Type roles: `text-heading-lg` … `text-data-label`, `text-label-xs`, `text-body-aside`, plus `leading-body-*` for mixing body rhythm with a non-body size and `font-heading`/`font-body`/`font-mono`.
- Input metrics: `h-input`, `px-input`, `py-input`, `pl-input-with-prefix`, `pr-input-with-suffix`, `left-input-prefix`, `right-input-suffix`, `border-input-focus`.
- Field rhythm: `gap-field`, `space-y-field` (6px — the one deliberate off-scale value).
- Spacing escape hatches: `gap-ds-5`, `gap-ds-7`, `pl-ds-5`, `pl-ds-7`, `px-ds-7`, `py-ds-7`, `px-ds-11`, `py-ds-9`.
- Containers: `container-layout` (1440px), `container-narrow` (755px), `container-admin` (1200px), `container-wide` (1920px).
- Colours: `bg-`/`text-`/`border-` + any token name (`bg-surface-background`, `text-text-medium`, `border-surface-border`).

If a value isn't in `styles.css`, it is either a token that needs adding or a sign the moment is bespoke — either way that's a deliberate decision, not a `text-[11px]` in passing.

## 3. Colour: Light Ground, Black Ink, Deliberate Colour

84 primitive colour tokens in 18 families, 40 semantic aliases on top. **One light theme.** There is no dark mode — dark surfaces like the filter toolbar and dropdown popovers are components built from `base-black`/`base-black-800` on the same palette, not a theme.

### Ground and Surface

- **Page ground** (`surface-background`, `#fbfbfc`): the app shell and muted panels. Off-white, never pure grey.
- **Content surface** (`base-white`, `#ffffff`): cards, regions, data cells. Content lives on white.
- **The default border** (`surface-border` → `base-gray-border`, `#e2e2e3`): every card, table rule, divider and data box. A global base rule sets `* { border-color: var(--color-surface-border) }` — you set border *width*, the colour is already right.
- **Muted fill** (`muted` → `base-gray-other`, `#eeeeee`): disabled buttons, quiet fills.

### Text

- **Primary** (`text-black`, `#000000`): headings, table content, links. Ink is black, not near-black.
- **Dark** (`text-dark`, `#353a3c`): input values, table labels.
- **Medium** (`text-medium`, `#585b5d`): secondary body text.
- **Light** (`text-light`, `#656e72`): column headers, captions, placeholders.

### The Family Rhythm

Eleven brand/product families share one rhythm — **100** tint for section and tag backgrounds, **500** the identifying hue, **700** body text and bar fills, **900** headings and pressed states. Branded modules (Emissions, Modern Slavery, Biodiversity and the content-type surfaces) theme themselves entirely from one family: `brand-blue`, `brand-green`, `brand-orchid`, `product-pink`, `product-meadow`, `product-blue`, `product-purple`, `product-red`, `product-orange`, `product-green`, `product-yellow`.

The Figma library (FS-Luz: UI) organises the same values differently — primitive ramps like `Grey/950` (= `base-black`), `Blue/300` (= `brand-blue-500`), mode-responsive `Foundation/…` tokens, and `Status/…` groups like `Status/Performing/700` (= `product-advanced-700`). The two naming systems are linked **by value, not by name**; this document uses code names everywhere.

**Figma colour modes.** The Figma Colour collection carries 10 modes — Default, Dark, Emissions, Modern Slavery, BioDiversity, Summary, Additional Information, Guidance, FairSupply, Red Status. None of them have any CSS expression: code ships the Default mode only, and branded surfaces theme by family tokens instead. Treat the modes as design intent worth keeping in Figma, not as shipped API.

### Domain Scales

Where colour carries meaning. These are the sequences a reader is expected to decode, and they are locked by code (`ExposureTag`, `MitigationTag`, `chart-colors.ts`) and by an alignment test that pins PDF report colours to chart colours.

**Exposure / risk — five bands** (shared by `ExposureTag`, exposure charts, PDF `RISK_LEVELS`):

| Band | Token | Hex |
|---|---|---|
| Low | `brand-blue-500` | `#00ace1` |
| Moderate-low | `product-green-500` | `#06d18b` |
| Moderate | `product-yellow-500` | `#fecb00` |
| Moderate-high | `product-orange-500` | `#fa5c03` |
| High | `product-red-700` | `#b2002b` |
| Unknown | `base-gray-input` / `base-gray-disabled` | `#bbbbbb` / `#9eacb2` |

**Mitigation rating** (pill/text · tag background · indicator):

| Rating | Pill / text | Tag background | Indicator |
|---|---|---|---|
| None | `base-gray-input` | `muted` | — |
| Basic | `product-mitigation-700` | `product-mitigation-300` | `product-mitigation-900` |
| Developing | `product-recommendation-700` | `product-recommendation-300` | `product-recommendation-900` |
| Advanced | `product-advanced-700` | `product-advanced-300` | `product-advanced-900` |

**Score quality — the `product-data` ramp** (drives `ProgressBar`): 100 good → 500 average → 900 bad.

**Supply-chain tiers:** Tier 1 `brand-orchid-500`, Tier 2 `product-purple-700`, Tier 3 `product-purple-accent`, Tier 4+ collapse into `base-gray-input`.

**Alert tones** (background · icon/border · text): Info `brand-blue-100 · brand-blue-500 · brand-blue-900`; Success `product-green-100 · product-green-500 · product-green-900`; Warning `product-orange-100 · product-orange-500 · product-orange-900`; Error `product-red-100 · product-red-500 · product-red-900`.

### Colour Rules

**The Black Carries The Brand Rule.** Black on white is the FairSupply signal: primary buttons, ink, links. If one colour must say FairSupply, it is black — not a hue.

**The Purple Means Focus Rule.** In chrome, `product-purple-700` (`#4c2fff`) is focus and selection machinery: every focus ring, input focus border, table row selection, plus the 20% halo (`stroke-shadow`). In data it may appear as a series (tiers, choropleth). It is never decoration.

**The Colour Is Consequence Rule.** Colour appears where meaning does — risk bands, ratings, statuses, alert tones, branded modules. Everything else stays neutral. If an element is coloured, a reader should be able to ask "what does this colour tell me?" and get an answer.

**The Tint-Text-Heading Rhythm Rule.** Inside a family: 100 for the surface, 700 for the text and bars, 900 for the headings and pressed states. 500 identifies; it rarely carries text.

**The One Light Theme Rule.** No `.dark`, no `prefers-color-scheme`. A dark surface is a component decision (toolbar, dropdown popup), built from `base-black`/`base-black-800`/`base-black-600`, and its popups stay dark regardless of trigger context.

### Marked legacy — do not use in new work

- `brand-orchid-accent` (`#9333ea`) — declared, barely consumed anywhere.
- `foundation-text-light` (→ `product-red-400`) — a luz-internal documentation accent, not an app text tier.
- `ENGAGEMENT_STATUS_COLORS` (lib) — built from stock Tailwind classes (`bg-slate-100`, `bg-amber-100`…) that `--color-*: initial` wipes; zero consumers. Use `ENGAGEMENT_STATUS_LABELS`/`ENGAGEMENT_STATUS_ORDER` with luz tokens instead.
- Hardcoded chart one-offs (`#ffab7b`, `#6800bd`, `#ff6dd8`, `#15dede`, `#3b487b`, `#f5a623`, `#ffa200`, `#6b7280`, `#d1d5db`) — literals living in chart and icon code. They are drift, not vocabulary; do not copy them into new work.

## 4. Typography: Three Roles, One Grid

**Heading and numeric face:** TWK Lausanne (`font-heading`), self-hosted via `next/font/local`, seven cuts from 200 to 700.
**Body and label face:** Inter (`font-body`), via `next/font/google`.
**Alt-data face:** Roboto Mono (`font-mono`) for IDs and codes.

The distinguishing idea: **Data is a first-class type role alongside Heading and Body.** Metrics use the display face at ultra-light weights (200–300), giving numbers their own visual language separate from prose. In practice this is a dense data product — the most-used text style in the codebase is the 10px uppercase micro-label, not a heading.

### Hierarchy

Every role is a composite utility — one class sets family, size, line-height and weight together (see the frontmatter for the full table):

- **heading-lg · 30/40 · 300** — page titles. Light, calm, never bold.
- **heading-md · 24/30 · 300** — section titles. The `Heading` default.
- **heading-sm · 18/20 · 500** — card headers that need weight at small size.
- **heading-xs · 16/20 · 400** and **heading-xxs · 14/20 · 300** — compact headers.
- **body-lg · 16/30**, **body-md · 14/24** (the workhorse), **body-sm · 13/24**, **body-tiny · 12/14** — Inter; body is the only role that leaves weight open, which is why `Text` alone has a `weight` prop.
- **body-aside · 12/14 · 300 italic** — asides and fine print.
- **data-xl · 35/40 · 200** — hero metrics. **data-lg · 24/30 · 200**, **data-md · 16/30 · 200**, **data-sm · 14/20 · 300** — figures at descending scale.
- **data-label · 10/20 · 400 · uppercase** — the platform's most common style: table and card micro-labels.
- **label-xs · 10/14 · 500 · uppercase · 0.7px tracking** — the Figma-faithful label (Figma `Data/label`); `data-label` is the de-facto dominant one.
- **data-small-alt · 14/20** and **data-tiny-alt · 12/20** — Roboto Mono, for IDs and codes.

### Component API

Four wrappers in `foundation/typography/`. Semantics are decoupled from appearance: `as` sets the element, `size` sets the look — an `<h1>` can be visually small.

| Component | Default element | Default size | Sizes | Weight prop |
|---|---|---|---|---|
| `Heading` | `h2` | `md` | `lg` `md` `sm` `xs` `xxs` | no — baked per size |
| `Text` | `p` | `md` | `lg` `md` `sm` `tiny` `aside` | yes |
| `DataText` | `data` | `md` | `xl` `lg` `md` `sm` `label` `label-bold` `small-alt` `tiny-alt` | only via `label-bold` |
| `HeadingLink` | external link in `data-md` styling with an inline icon | | | |

All three share seven `color` options: `black` (default), `dark`, `medium`, `light`, `brand.blue`, `brand.green`, `brand.orchid`. `DataText` renders a real `<data>` element and takes a machine-readable `value`.

### Typography Rules

**The Weight-Inverse-To-Size Rule.** The larger the type, the lighter the cut: 35px runs at 200, 30px at 300, 18px at 500, 10px labels at 500. Optical compensation, not accident. (Known wobble: `heading-xxs` at 14px drops back to 300.)

**The Ten-Pixel Grid Rule.** Line-heights snap to the spacing grid — 20, 30, 40 dominate. This is load-bearing: layout tokens are computed from type tokens (`--size-toolbar-result-item-height` sums two paddings, a heading line and a body line). Raw Tailwind text classes are quietly incompatible: `text-sm` is 14/**20** where `text-body-md` is 14/**24** — same size, broken rhythm.

**The Composite Utility Rule.** Pick a role class; never assemble family + size + leading by hand. If you need body rhythm on a non-body size, that's what `leading-body-*` is for.

**The Data Is A Role Rule.** Metrics are Lausanne at 200–300 via `DataText`/`MetricText` — never bold Inter. A number that reads like body text has lost its rank.

**Practical cautions.** All sizes are fixed px (no responsive type, no rem). Nothing sets Inter on `<body>` — bare text outside a role class renders in the system font. The `font-twk` class does not exist; it silently falls back. 10px labels sit below common accessibility minimums yet are the most-used style; don't shrink further.

## 5. Space: The Five-Pixel Voice

Spacing is one named scale (frontmatter `spacing`), **not** the stock Tailwind scale — luz overrides steps 1–9. It is non-linear on purpose: 5px increments up to step 4 for component-internal detail, 10px increments to step 7, then coarse jumps (70/100/120/150/200) for page composition.

### The Step-Ten Boundary Rule

Steps 10–12 are named `--spacing-ds-10/11/12`, not `--spacing-10/11/12`. Tailwind v4 falls back to its own multiplier when a named token is missing, so:

- `p-1` … `p-9` compile to design tokens — **safe**.
- `p-10` is **40px, not 120px**; `px-12` is 48px, not 200px. Fractional utilities (`gap-1.5`, `py-0.5`) are off-scale too.
- The Box prop API is the safe path across the whole range: `p={10}` emits `var(--spacing-ds-10)`.

Never use a numeric spacing utility ≥ 10 or a fractional one. Use props or the `*-ds-*` named utilities.

### Choosing a value

1. Use the smallest step that separates two things clearly: 1–2 inside a component, 3–4 between components, 5–7 between sections, 8–9 between page regions.
2. Never introduce a value that is not on the scale. If nothing fits, restructure the layout instead of inventing a number.
3. Structural dimensions (header, sidebar, side panel) come from `--size-*` tokens, not the spacing scale; sticky offsets read `--size-header-height`/`--size-header-offset`, never a hardcoded pixel.

### Component defaults are the real spacing contract

Most spacing is never written by the page author — it ships in component defaults. Override them as the extension point (`<Card p={7}>` beats a wrapper).

| Component | Default |
|---|---|
| `Stack` | `gap={3}` (15px) |
| `Card` | `p={5}` (30px), `border={1}` |
| `Region` | `p={0}`, `border={1}` — container only |
| `RegionHeader` | `p={7}` (50px), `gap={2}`, bottom border |
| `RegionContent` | `p={7}` (50px) |
| `ModuleSectionHeader` | `p={7}` (50px) |
| `SidebarLayout` | `gap={4}` (20px) |
| `LayoutContainer` | `padding="none"` |
| `Button` medium | `px-4` (20px), `h-[40px]` |
| `DataTable` cell | `px-4 py-4`; compact `px-3 py-2` |

The dominant container padding is **50px (step 7)** — every Region and ModuleSection breathes at it. The dominant content gap is **10px (step 2)**.

### Composing space

**The Gap-Over-Margin Rule.** Spacing belongs to the container, not the child. Padding on containers, gap between children; a component never adds outer margin to position itself. One owner per gap — if the parent sets `gap`, children don't also set `mb`. `space-y-*` is a fallback for content you don't control; for your own layout, use `Stack`.

### Widths and structure

Content width is capped by container presets, not page padding: `narrow` 755px, `admin` 1200px, `default` 1440px, `large` 1900px, `wide` 1920px, `fluid` 100%. Page geometry comes from size tokens: header 70px (sticky offset 82px), sidebar 300px, side panel 280px + 30px gap. One breakpoint exists: `--breakpoint-xl` at 1440px.

## 6. Elevation and Material: Flat, Bordered, Lit By Focus

The system is flat. Depth comes from hairline borders and background shifts between `#ffffff` surfaces and the `#fbfbfc` ground — almost never from shadow.

### Shadow Vocabulary

- **subtle** — the quietest lift, two soft black layers at 3–4% alpha.
- **light** — a bordered lift: its outermost layer is a 1px ring at 10% black, so it doubles as a hairline. The code twin of Figma's `Shadow/Light`.
- **heavy** — six layers for large overlays. The code twin of Figma's `Shadow/Heavy`.
- **focus** — `0 0 0 2px rgba(76, 47, 255, 0.2)`: the purple halo.
- **button-secondary / -hover / -active** — the secondary button draws its border with a shadow ring, and the ring turns purple-tinted on hover and press.

### Material Rules

**The Border Before Shadow Rule.** Reach for a 1px `surface-border` hairline before any shadow. Cards and regions rest on borders; the global border-colour rule means you only ever set the width.

**The Purple Glow Means Interaction Rule.** Coloured halos exist only as interaction feedback: purple for focus (`stroke-shadow`), crimson for field errors (`stroke-error-shadow`), emerald for field success (`stroke-success-shadow`). Decorative glows do not exist in this system.

**The Dark Surface Is A Component Rule.** Dark chrome (filter toolbar, dropdown popups) is a deliberate component surface on `base-black`/`base-black-800` — not a theme, and it doesn't adapt to context.

### Radius

Controls sit at 4px (`rounded-input`, `rounded-button`); `xsmall` is 2px for the tightest chips. The numbered scale (5/10/20px — Figma Radius `1/2/3`) covers everything else; `toolbar` 20px and `toolbar-sm` 10px round the floating toolbar; `spotlight` 20px frames the spotlight surface. `pill` is 10px — a soft rectangle; true capsules use `rounded-full` (the action button).

### Texture and imagery

TODO: not yet defined in FS-Luz. No texture or material asset vocabulary exists in code; the Figma library has an Illustrations page but it has no code twin. Until one is defined, surfaces stay flat colour.

## 7. Components

Core components carry full documentation; the long tail is one line each; the legacy block at the end is the do-not-use list. Component and prop names below are exact exports from `@repo/luz`.

### Foundation and layout

- **Box** — the primitive. Type-safe token props: `p/px/py/pt/pr/pb/pl`, `m/mx/my/mt/mr/mb/ml`, `gap/gapX/gapY` (all `0`–`12`), plus `border`, `radius`, and `shadow` variants. Everything else composes it; reach for a semantic component before Box, and Box before a raw div.
- **Stack** / **Flex** / **Grid** — layout wrappers over Box. Stack defaults to `direction="column"` with `gap={3}`; Flex defaults to row; all expose `direction`, `align`, `justify`, `wrap`.
- **Card** — Box with `p={5}`, `border={1}`, white surface. Square by default; radius is opt-in (`radius={2}`). Its own JSDoc offers the alternative: `border={0} shadow="light"` when a shadowed card is genuinely wanted.
- **Region / RegionHeader / RegionContent** — the page-section scaffolding. `Region` renders a bordered white `<section>` with no padding; `RegionHeader` (a `<header>`, `p={7}`, `gap={2}`, bottom border) and `RegionContent` (`p={7}`) provide the 50px rhythm. This is the default answer to "how do I put a titled block on a page?"
- **ModuleSection** family — Region's tabbed sibling: `ModuleSection` (takes `title`), `ModuleSectionHeader` (`p={7}`), `ModuleSectionTabList`/`ModuleSectionTab` (aliases of the SectionToggleTab parts), `ModuleSectionPanel`.
- **LayoutContainer** — centered max-width wrapper. `maxWidth` presets: `default` (1440px), `narrow` (755px), `admin` (1200px), `large` (1900px), `fluid` — or any CSS value. `padding` is `"none"` by default. The `size` prop is deprecated; use `maxWidth`.
- **LayoutHeader** / **HeaderAction** — the page header band and its action slot.
- **SidebarLayout** — two-column shell (`sidebar` prop + children) with `gap={4}`; **SidebarNav** — the left navigation list.
- **Breadcrumb / BreadcrumbItem** — path navigation above page titles.

### Actions

- **Button** — variants `primary` (black), `secondary` (white, hairline drawn by shadow ring, purple-tinted on hover), `tertiary` (borderless quiet), `confirm` (ink-blue `product-recommendation-900` for save/confirm), `destructive` (red ramp 500→700→900; its focus ring is red — the one exception to purple), `lozenge` (bordered chip-button, 20px), and `action` — the animated capsule whose arrow slides in on hover, springing on `ease-button-action`, filled via `colorPalette` (`black`, `white`, `brand.blue`, `brand.green`, `brand.orchid`, `product.*` at 500 and `.700` depths). Sizes `micro/tiny/small/medium/large` = 20/25/30/40/50px heights; default `medium`. Also: `iconLeft`/`iconRight`, `fullWidth` (action), and polymorphism via `as` (`"a"`, Next `Link`) with `href`/`target`/`prefetch`.
- Disabled state is tokenised (`button-disabled-bg/text/border`) — never restyle it per-page.

### Forms

- **Input** — 40px control on the input tokens: white fill, `#e2e2e3` border, 4px radius, 15px/10px padding; prefix/suffix adornment slots with their own padding tokens; focus swaps the border to purple and adds the 20% halo; error/success states use `input-error-*`/`input-success-*` with matching halos; disabled uses the muted fill and text.
- **Dropdown** — select on Base UI with `options` (`{ value, label }`), single or multi `mode`, controlled or uncontrolled, `clearable`, and `variant="default" | "toolbar"` — the toolbar variant is the dark-chrome form; popups are always dark regardless of trigger variant. (Menu-style dropdown parts ship as types only; the runtime export is `Dropdown` itself.)
- **Form / FormField / FieldWrapper / FormSubmit / useForm** — the TanStack Form integration: `useForm` creates the instance, `Form` wires a Zod `schema` with `validationMode="onBlur"` default, `FormField` binds fields, `FieldWrapper` provides the 6px `gap-field` label rhythm.
- One-liners: **Checkbox**, **Radio/RadioGroup**, **Switch**, **Calendar** (+ **DayPicker**, **DayRangePicker**, **DateRangePicker**, **SpendRangePicker**), **Dropzone** (`validateFile`, accept/size defaults), **SearchCombobox**, **TitleSelect**, **FormOTP/InputOTP** (the OTP flow).

### Overlays

- **Dialog** — Base UI compound: `Dialog` root (`open`/`onOpenChange`), `Dialog.Trigger`, `Dialog.Content` (with a `size` variant), `Dialog.Title`, `Dialog.Description`, `Dialog.Close`. Dialog geometry tokens (`size-dialog-*`) cap content and scroll areas.
- **Tooltip** — `side` (`top/right/bottom/left`), `align` (`start/center/end`), `variant` (`default` | `help`), `asChild`, `focusableTrigger`. **Always pass `asChild` for inline triggers** — the default wrapper is a block element that breaks inline and baseline layouts. `focusableTrigger` makes icon-only triggers keyboard-reachable.

### Status and feedback

- **Alert** — `variant`: `info`, `success`, `warning`, `error`, on the four alert tone triads (100 background / 500 icon and border / 900 text). Renders its own title and body; the separately exported `AlertTitle`/`AlertDescription` are legacy.
- **Tag** — `label` (required), `indicatorColor` (a **token name**, e.g. `"product-red-700"` — no `bg-` prefix), `indicatorShape` (`square/circle/triangle` + `triangleDirection`), `indicatorSize` (`small/large`), `size`, `bordered`, polymorphic `as` for interactive tags.
- **Badge** — `variant` (`default/ghost`), `color` (`none/red/blue/green/orange/purple/yellow`), `size` (`alias/small/medium`), `rounded` (`none/square/pill`).
- **Loader** (spinner; `color`, `size` in px) and **Skeleton** — shimmer placeholder; loading states mirror the real content's shape rather than showing generic spinners.

### Data display

- **DataBlock** compound — the KPI band: `DataBlock` (takes `title`, `variant`), `DataBlock.Grid`, `DataBlock.Item`, `DataBlock.Title`. The standard opening of a dashboard page.
- **DataLabel** — micro-label with optional indicator: `indicatorColor` (token name), `tooltip`, `size` (`sm/md/lg`). Pairs under metrics and chart legends.
- **MetricText** (+ **MetricMitigation**, **MetricWrapper**) — the standardised metric unit: `title`, optional `tooltip`, `value`, `unit`/`unitColor`, `label`. This is the product principle "data as credibility" made concrete: label, hero figure, caption — always the same anatomy.
- **DataTable** — the TanStack Table grid: `columns` + `data`, column factories from lib (`createTextColumn`, `createDateColumn`, `createCurrencyColumn`, `createSelectionColumn`, `createExposureColumn`), `sentenceCase` (uses `toSentenceCase`), alignment via column `meta`, CSV export (`exportAlign`), pagination, column visibility config.
- **Table** compound — the lightweight styled table for static and reference content: `Table.Root/Header/Body/Row/Cell/ColumnHeaderCell`. Reach for `DataTable` when you need sorting/filtering/selection; `Table` when you need rows on a page.
- **CategoryBar** — proportional segment bar (segments with `value`, `color`, `label`, `tooltip`).
- **SectionToggleTab** family — `SectionToggleTabRoot` (`value`/`onValueChange`), `SectionToggleTabList`, `SectionToggleTab`; `variant` `default/filled/toolbar/input`, `colorScheme` `default/orchid`, `size` `sm/md`. The standard in-page section switcher.
- **BigTabs** — `BigTabs.Root/List/Trigger/Panel` with `orientation` `horizontal/vertical`; triggers carry a `title`. For page-level tab navigation.
- **Icon** — Heroicons by `name`, `variant` (`solid/outline`), `size` (`xs/sm/md/lg/xl`), `color`, or a custom SVG via `as`.

### Domain components

- **ExposureTag** — `level` (an `ExposureLevel` from `@repo/core/domain/constants`, re-exported here), `size` (`small/large`), `bordered`. Colours are the locked exposure scale of §3.
- **MitigationTag** — `level`: `none/basic/developing/advanced`; each level's pill, background and text colours come from the exported `MITIGATION_CONFIG` (the §3 mitigation table).
- **BrandedInsight** — the themed insight card: `theme` (a `BrandedTheme` — emissions, modern slavery, biodiversity and the content-type surfaces), `orientation` (`tall/wide`), with per-theme CTA button palettes.

### Long tail — exists, works, documented by its stories

ProgressBar, ProgressDots, Indicator, NotFound, AlertDialog, Separator, ScrollArea, SplitButton, List/ListItem, CrosshairsIcon, ClockIcon, ExpandableSection, Toolbar (+ ToolbarSearch/Results/ResultItem/ResultsEmpty), FilterToolbar (+ FilterPanel and the filter registry), BulkActionsToolbar, HeaderMenu, NumberedPagination, ViewToggle, BarChart, DonutChart, BubbleChart, SparkBar, StatDisplay, Odometer, WorldMap (+ WorldMapInteractive/WorldMapStatic), ChartTooltip/ChartTooltipContent, SelectableDataTable, Scorecard family, BrandedSummary, AssessmentPieChart, EngagementInsightsChart, EngagementReviewProgressBar, MitigationProfile, RiskProfile, SectorExposure, TierAnalysisDisplay, Item, MetricExposure, FormOTP/InputOTP, SearchCombobox, TitleSelect, Dropzone, the picker family, Checkbox, Radio/RadioGroup, Switch.

### Legacy — do not use in new work

- **Menu, MenuTrigger, MenuContent, MenuItem, MenuCheckboxItem, MenuLabel, MenuSeparator** — zero usage anywhere, stories included. Use `Dropdown` or `HeaderMenu`.
- **AlertTitle, AlertDescription** — unused; `Alert` renders its own title and body.
- **SidebarNavLink** — unused; `SidebarNav` builds its own links.
- **LayoutPage** — zero product usage (stories only); an unproven scaffold. Compose `LayoutContainer` + `LayoutHeader` + `Region` instead.
- **LayoutContainer `size` prop** — deprecated in source; use `maxWidth`.
- **ENGAGEMENT_STATUS_COLORS** — broken and unused (§3).
- **Unadopted helper surface** — `arrayFilter`, `dateRangeFilter`, `rangeFilter`, `multiSelectFilter`, `createBadgeColumn`, `createBooleanBadgeColumn`, `tableToCsv`, `escapeCsvValue`, `clearFilter`, `clearAllFilters`, `getActiveFilters`, `hasActiveFilters`, `useFilterToolbar`, `CHART_BRAND_COLORS`, `CHART_QUADRANT_COLORS`, `CHART_SCOPE_COLORS` — zero app consumers; prefer the used equivalents before reaching for these.
- **Leaked style internals** — `boxStyles`, `boxSpacingStyles`, `borderVariants`, `gapVariants`, `marginVariants`, `paddingVariants`, `radiusVariants`, `shadowVariants`, `alertStyles`, `dialogStyles`, `progressBarStyles`, `shouldHideOnMobile` — internal implementation exported through the barrel. Never import them in app code.
- Note: bare config constants (`MITIGATION_CONFIG`, `MITIGATION_LEVELS`, `SCORE_THRESHOLDS`, `STATUS_COLORS`, `STATUS_LABELS`, `STATUS_VALUES`, `DATA_MITIGATION_LABELS`, `DEFAULT_ACCEPT`, `DEFAULT_MAX_SIZE`, `DEFAULT_COLUMN_VISIBILITY`) are **not** legacy — they are live internal plumbing with real consumers inside luz; you just rarely need them directly.

## 8. Do and Do Not

### Do

- Do use luz tokens for every colour, spacing, radius, and type value. If the value isn't a token, question the design before questioning the scale.
- Do search `packages/luz/src/` and extend via props/variants before creating anything new — and ask before creating a component that doesn't exist in luz.
- Do climb the styling ladder in order: component default → luz props → `tv()` styles file → raw `className` last.
- Do ship components complete: full variant set; hover, focus, disabled, error, loading, empty states; a story per variant.
- Do keep Figma ↔ code parity, and stop and flag when Figma, the prototype, and code disagree — never pick silently.
- Do use `Region`/`RegionHeader`/`RegionContent` for titled page sections and `DataBlock` for KPI bands — they carry the 50px rhythm for you.
- Do render every visible currency through `formatCurrency` (live pages convert via `useCurrency()`, reports via `CurrencySnapshot`).
- Do make loading states mirror the real content with `Skeleton` — perceived performance is a product principle, not a nicety.
- Do pass `asChild` to `Tooltip` for inline triggers, and keep tooltip triggers keyboard-reachable (`focusableTrigger`).
- Do use gap over margin: padding on containers, gap between children, one owner per gap.
- Do write for designer-readers: descriptive names, simple structure, comments that explain sections.

### Do Not

- Do not hardcode hex values, arbitrary pixel sizes (`text-[11px]`, `p-[25px]`), or any second styling vocabulary. One deliberate exception needs a comment.
- Do not use raw Tailwind type classes (`text-sm`, `text-xs`, `text-2xl`) — same sizes, wrong line-heights; they break the 10px grid.
- Do not use stock Tailwind palette classes (`bg-slate-100`, `text-amber-800`) — `--color-*: initial` wipes that palette; they resolve to nothing you designed.
- Do not use numeric spacing utilities ≥ 10 (`p-10` is 40px, not 120px) or fractional ones (`gap-1.5`) — use Box props or `*-ds-*` utilities.
- Do not use purple as decoration. Purple is focus, selection, and a data series — nothing else.
- Do not colour without consequence: no decorative tints, no alarmist red on routine information, no gradients, no glassmorphism, no decorative glows or shadows.
- Do not append currency codes to formatted values (`$1,000 (USD)`) — the symbol convention already carries it.
- Do not copy prototype HTML/CSS into production — prototypes are references, not sources.
- Do not rename tokens or change a component's public API as a side effect of another task — propose that separately.
- Do not reach for the legacy exports in §7, the deprecated `size` prop on LayoutContainer, or the phantom `font-twk` class (it doesn't exist).
- Do not put outer margins on components to position them — that's the container's job.
- Do not shrink type below the 10px label roles or set body copy in the data face — each face keeps its job.
