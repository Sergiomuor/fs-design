# Luz component cheatsheet

Exact exports from the `@repo/luz` barrel, verified against `packages/luz/src/` on `main` (2026-08-17). Eight categories: `foundation`, `inputs-and-forms`, `navigation-and-toolbars`, `page-structure`, `status-and-indicators`, `data-visualisation`, `domain-components`, `context`. Component folders are PascalCase with co-located `.styles.ts` (tailwind-variants) and `.stories.tsx`.

**Never hand-roll a primitive that exists here.** Reuse-before-create: search `packages/luz/src/` first, extend via props/variants second, propose a new component (and ask) last.

## Foundation & layout

- **Box** — the primitive. Token props: `p/px/py/pt/pr/pb/pl`, `m/*`, `gap/gapX/gapY` (all `0`–`12`), `border`, `radius`, `shadow`. Semantic component > Box > raw div.
- **Stack / Flex / Grid** — layout wrappers. Stack: `direction="column"`, `gap={3}`; Flex: row. All expose `direction align justify wrap`.
- **Card** — Box with `p={5}`, `border={1}`, white surface, square by default (`radius={2}` opt-in). Shadowed alternative: `border={0} shadow="light"`.
- **Region / RegionHeader / RegionContent** — the titled page-section scaffolding; header and content at `p={7}` (50px rhythm). The default answer to "titled block on a page".
- **ModuleSection** family — Region's tabbed sibling (`title`, Header `p={7}`, TabList/Tab, Panel).
- **LayoutContainer** — centered max-width (`maxWidth`: default 1440 / narrow 755 / admin 1200 / large 1900 / fluid; `size` prop is deprecated). **LayoutHeader / HeaderAction** — page header band + action slot. **SidebarLayout** (`sidebar` + children, `gap={4}`), **SidebarNav**.
- **Breadcrumb / BreadcrumbItem** — path above page titles.
- Typography: **Heading** (h2, md), **Text** (p, md, `weight`), **DataText** (`<data>` + machine `value`; sizes xl…tiny-alt), **HeadingLink**.
- Also: **Dialog** (compound: Trigger/Content(size)/Title/Description/Close; geometry capped by `size-dialog-*` tokens), **Tooltip** (`side`, `align`, `variant="default"|"help"`, `asChild`, `focusableTrigger` — **always pass `asChild` for inline triggers**; the default wrapper is a block div that breaks inline/baseline layout; `focusableTrigger` makes icon-only triggers keyboard-reachable), **Skeleton** (shimmer; loading states mirror real content shape), **Icon** (Heroicons by `name`, `variant solid|outline`, `size xs–xl`, custom SVG via `as`), **Loader**, List/ListItem, ScrollArea, Separator, SplitButton, CrosshairsIcon, ClockIcon.

## Actions

- **Button** — variants: `primary` (black) · `secondary` (white; hairline drawn by shadow ring, purple-tinted on hover/press) · `tertiary` (borderless quiet) · `confirm` (ink-blue `product-recommendation-900`) · `destructive` (red 500→700→900; its focus ring is red — the one non-purple exception) · `lozenge` (20px bordered chip) · `action` (animated `rounded-full` capsule, arrow slides in on `ease-button-action` spring; `colorPalette`: black, white, brand.*, product.* at 500/.700). Sizes micro/tiny/small/medium/large = 20/25/30/40/50px. `iconLeft/iconRight`, `fullWidth` (action), polymorphic `as` with `href/target/prefetch`. Disabled state is tokenised — never restyle per-page.

## Forms

- **Input** — 40px, white fill, #e2e2e3 border, 4px radius, 15/10 padding; prefix/suffix slots with own padding tokens; focus = purple border + 20% halo; error/success = `input-error-*`/`input-success-*` halos; disabled = muted fill.
- **Dropdown** — Base UI select; `options {value,label}`, single/multi `mode`, `clearable`, `variant="default"|"toolbar"`; popups always dark regardless of trigger variant.
- **Form / FormField / FieldWrapper / FormSubmit / useForm** — TanStack Form + Zod `schema`, `validationMode="onBlur"` default; FieldWrapper provides the 6px `gap-field` label rhythm.
- Checkbox, Radio/RadioGroup, Switch, Calendar (+ DayPicker, DayRangePicker, DateRangePicker, SpendRangePicker), Dropzone (+ `validateFile`), SearchCombobox, TitleSelect, FormOTP/InputOTP, FormContext, FilterVariantContext.

## Navigation & toolbars

- **SectionToggleTab** (+ Root/List) — in-page section switcher; `variant default/filled/toolbar/input`, `colorScheme default/orchid`, `size sm/md`.
- **BigTabs** (Root/List/Trigger/Panel, `orientation`) — page-level tabs; triggers carry `title`.
- Toolbar (+ Search/Results/ResultItem/ResultsEmpty), FilterToolbar (+ FilterPanel, filter registry), BulkActionsToolbar, HeaderMenu, NumberedPagination, ViewToggle, Breadcrumb.

## Status & indicators

- **Alert** — `variant info|success|warning|error` on the four tone triads (100 bg / 500 icon+border / 900 text). Renders its own title/body.
- **Tag** — `label` (required), `indicatorColor` (**token name**, e.g. `"product-red-700"`, no `bg-` prefix), `indicatorShape square/circle/triangle` (+ direction), `indicatorSize`, `size`, `bordered`, polymorphic `as`.
- **Badge** — `variant default/ghost`, `color none/red/blue/green/orange/purple/yellow`, `size alias/small/medium`, `rounded none/square/pill`.
- **Loader**, **Skeleton**, Indicator, ProgressBar (drives the `product-data` ramp), ProgressDots, NotFound, AlertDialog.

## Data display

- **DataBlock** compound (`title`, `variant`; .Grid/.Item/.Title) — the KPI band; standard opening of a dashboard page.
- **DataLabel** — micro-label; `indicatorColor` (token name), `tooltip`, `size sm/md/lg`. Pairs under metrics and chart legends. (Its tooltip trigger needs `focusableTrigger` for keyboard reach.)
- **MetricText** (+ MetricMitigation, MetricExposure, MetricWrapper) — the standardised metric anatomy: `title`, optional `tooltip`, `value`, `unit`/`unitColor`, `label`. "Data as credibility" made concrete.
- **DataTable** — TanStack grid: `columns` + `data`, factories from lib (`createTextColumn`, `createDateColumn`, `createCurrencyColumn`, `createSelectionColumn`, `createExposureColumn`), `sentenceCase`, alignment via column `meta`, CSV export, pagination, column visibility. **Table** compound (Root/Header/Body/Row/Cell/ColumnHeaderCell) for static/reference rows. **SelectableDataTable**.
- **CategoryBar** (segments: `value color label tooltip`), BarChart, DonutChart, BubbleChart, SparkBar, StatDisplay, Odometer, WorldMap (+ Interactive/Static), ChartTooltip/ChartTooltipContent.

## Domain components

- **ExposureTag** — `level` (an `ExposureLevel`), `size small/large`, `bordered`; colours are the locked exposure scale.
- **MitigationTag** — `level none/basic/developing/advanced`; colours from exported `MITIGATION_CONFIG`.
- **BrandedInsight** — themed insight card (`theme` a `BrandedTheme`, `orientation tall/wide`, per-theme CTA palettes). BrandedSummary, Scorecard family (Scorecard/Header/HeaderLeft/HeaderRight/Body/Content/Actions/Link), AssessmentPieChart, EngagementInsightsChart, EngagementReviewProgressBar, MitigationProfile, RiskProfile, SectorExposure, TierAnalysisDisplay, Item, branded icons.

## Lib

`cn`, luz-configured `tv` · formatters: `formatCurrency` (**every visible currency**; live pages convert via `useCurrency()`, reports via `CurrencySnapshot`; never append currency codes — the symbol carries it), `formatNumber`, `formatPercent`, `formatCurrencyAbbreviated`, `formatNumberAbbreviated`, `formatTooltipPercent`, `formatTooltipImpact` · DataTable column factories + `createColumnVisibilityConfig`, `createOrderedSortFn`, `createLocaleSortFn` · CSV: `downloadCsv`, `serializeCsv`, `buildCsvFilename` · chart palettes: `CHART_EXPOSURE_COLORS`, `CHART_MITIGATION_COLORS`, `CHART_CATEGORY_COLORS`, `CHART_TIER_COLORS`, `CHART_ACTIVE_STATUS_COLORS`, `CHART_EMISSION_DONUT_COLORS` · status maps: `STATUS_COLORS`, `STATUS_LABELS`, `ENGAGEMENT_STATUS_LABELS`, `ENGAGEMENT_STATUS_ORDER` · domain token maps: `EXPOSURE_TOKENS`, `MITIGATION_TOKENS`, `TIER_TOKENS` · `MODULE_OPTIONS`/`MODULE_LABELS`, `REPORT_TYPE_OPTIONS`, segment-fill helpers, `useDebounceCallback` · `toSentenceCase` — **import from `@repo/core/domain/utils/string-utils`, never the `@repo/core` main barrel** (it pulls server-only code into the client bundle).

## Context & i18n

ReportModeContext / useReportMode (print/PDF surfaces), createLuzTranslator, defaultMessages, enMessages.

## Legacy — do not use in new work

- **Menu, MenuTrigger, MenuContent, MenuItem, MenuCheckboxItem, MenuLabel, MenuSeparator** — zero usage; use `Dropdown` or `HeaderMenu`.
- **AlertTitle, AlertDescription** — `Alert` renders its own title/body.
- **SidebarNavLink**, **LayoutPage** (compose LayoutContainer + LayoutHeader + Region instead), LayoutContainer's **`size`** prop.
- **ENGAGEMENT_STATUS_COLORS** — built from stock Tailwind classes that `--color-*: initial` wipes; zero consumers.
- Colours: `brand-orchid-accent` (#9333ea), `foundation-text-light` (luz-docs accent only).
- Unadopted helpers: `arrayFilter`, `dateRangeFilter`, `rangeFilter`, `multiSelectFilter`, `createBadgeColumn`, `createBooleanBadgeColumn`, `tableToCsv`, `escapeCsvValue`, `clearFilter`, `clearAllFilters`, `getActiveFilters`, `hasActiveFilters`, `useFilterToolbar`, `CHART_BRAND_COLORS`, `CHART_QUADRANT_COLORS`, `CHART_SCOPE_COLORS`.
- Leaked style internals (never import in app code): `boxStyles`, `boxSpacingStyles`, `borderVariants`, `gapVariants`, `marginVariants`, `paddingVariants`, `radiusVariants`, `shadowVariants`, `alertStyles`, `dialogStyles`, `progressBarStyles`, `shouldHideOnMobile`.
- Hardcoded chart one-offs living in old chart/icon code (`#ffab7b`, `#6800bd`, `#ff6dd8`, `#15dede`, `#3b487b`, `#f5a623`, `#ffa200`, `#6b7280`, `#d1d5db`) — drift, not vocabulary; never copy into new work.

(Bare config constants — `MITIGATION_CONFIG`, `MITIGATION_LEVELS`, `SCORE_THRESHOLDS`, `STATUS_*`, `DATA_MITIGATION_LABELS`, `DEFAULT_ACCEPT`, `DEFAULT_MAX_SIZE`, `DEFAULT_COLUMN_VISIBILITY` — are live internal plumbing, not legacy; you just rarely need them directly.)

## Deeper references

- Full spec with every token value: repo-root `DESIGN.md` (frontmatter mirrors `styles.css` verbatim).
- Figma-audited deep reference: `apps/storybook/public/landing/luz-reference.md` (72KB; token tables, per-component Figma↔code inventory, known gaps).
- Living catalogue: `pnpm --filter @repo/storybook dev` → http://localhost:6006, published at https://luz.fairsupply.io/.
