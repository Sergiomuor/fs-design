# Craft floor

Load this after direction is settled, immediately before editing UI. Build without announcing the checklist. A signed-off Figma spec, an explicit user instruction, or an active learnings rule overrides anything here; your own habit does not. When the luz-lint hook is active it already catches the mechanical vocabulary violations as you edit — act on its findings instead of re-auditing each rule.

## Verify

Checks on the built result, not intentions. Run them together in one batched inspection round (screenshot or Storybook render + computed styles), fix everything in one batch, confirm with at most one more round, and stop polishing.

- **Tokens:** every colour, spacing, radius, type, and shadow value resolves to a luz token. `node <plugin>/skills/fs-design/scripts/luz-lint.mjs <files>` exits clean. One deliberate exception carries a comment.
- **Grid:** line-heights and vertical rhythm land on the 10px grid; spacing values on the 5px scale. Verify **computed styles**, not class names — `gap-5` is 30px in luz, not 20px.
- **Contrast:** body text ≥ 4.5:1, large text ≥ 3:1 against its real surface. Known system gaps (10px labels, disabled buttons at 1.12:1) are not licenses to add new ones.
- **States:** hover, focus, active, disabled, loading, error, empty — all present. Focus is the purple ring/halo (destructive buttons: red). Loading mirrors the real content's shape with `Skeleton`, never a generic spinner.
- **Type:** every text node wears a role class (bare text renders in the system font — that's a bug). Metrics are Lausanne at 200–300 via `DataText`/`MetricText`, never bold Inter. Nothing below the 10px label roles.
- **Structure:** padding on containers, gap between children, one owner per gap, no outer margins positioning components. Sticky offsets read `size-header-offset`.
- **Tooltips:** inline triggers pass `asChild`; icon-only triggers pass `focusableTrigger`.
- **Currency:** every visible amount renders through `formatCurrency` (live: `useCurrency()`; reports: `CurrencySnapshot`); no appended currency codes.
- **Copy:** the platform's advisor voice — controls name their action, errors name the problem and the recovery, statuses explain themselves (recognition over recall).
- **Consequence:** squint test — the most important risk/action/insight on the surface is the most visually prominent thing; routine system information recedes.

## Refuse

Reaching for one of these when nothing demanded it means you were not deciding. Recognizing it means rewriting the element, not softening it.

- Hex, rgb(), or any literal colour value in app code. Stock Tailwind palette classes (`bg-slate-100`, `text-amber-800` — `--color-*: initial` wipes them; they resolve to nothing).
- Raw Tailwind type classes (`text-sm`, `text-xs`, `text-2xl`) — same sizes, wrong line-heights, broken grid. The phantom `font-twk` class.
- Numeric spacing utilities ≥ 10 (`p-10` is 40px, not 120px) and fractional ones (`gap-1.5`). Arbitrary values (`text-[11px]`, `p-[25px]`) without a comment earning the exception.
- Purple as decoration. Purple is focus, selection, and a data series — nothing else.
- Colour without consequence: decorative tints, alarmist red on routine information, gradients, glassmorphism, decorative glows or shadows, coloured borders as accents.
- `dark:` variants or any second theme. Dark surfaces are components, not themes.
- A hand-rolled version of anything in the luz cheatsheet (a div-styled button, a bespoke tooltip, a homemade table). A new component nothing in luz covers — without asking first.
- The legacy exports (Menu family, AlertTitle/AlertDescription, SidebarNavLink, LayoutPage, `size` on LayoutContainer, ENGAGEMENT_STATUS_COLORS, leaked style internals).
- Emoji or unicode glyphs standing in for icons — icons come from `Icon` (Heroicons) or authored SVG in one consistent stroke.
- Nested cards; a modal for a task that needs neither interruption nor protected focus (Work Happens in Place — prefer in-context overlays, sidebars, expandable sections).
- Copying prototype HTML/CSS into production; renaming tokens or changing a component's public API as a side effect of another task.
- Filling a gap the Figma spec leaves open by inventing values. Figma/Luz is the source of truth; when Figma, the prototype, and code disagree — stop and flag, never pick silently.

The floor holds the mechanics; it never picks the direction. With every check green, spend the surface on consequence: what the primary persona must see, decide, and do.
