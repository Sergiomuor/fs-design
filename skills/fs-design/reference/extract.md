# /fs-design extract — promote patterns into the system

When the same UI idea appears twice in app code, the third home is `@repo/luz`. Extract finds repeated patterns, hardcoded near-tokens, and app-local components doing system work, and promotes them properly. This is how the system grows without forking.

## Find the candidates

- **Repeated compositions:** the same Card+DataLabel+MetricText arrangement in three places; a filter row rebuilt per page; a status header pattern.
- **App-local components with system ambitions:** anything in `apps/web/src/components/` that a second app surface imports or copies.
- **Near-tokens:** the same arbitrary value (`w-[3px]`, an off-scale gap) or the same hex appearing repeatedly — a token proposal in disguise.
- **Variant pressure:** per-page `className` overrides bending a luz component the same way in multiple places — that's a missing variant/prop.

Rank by blast radius: promote what's used ≥ 3 places or sits on a flagship surface first.

## The promotion path

1. **Confirm it's not already there.** Search `packages/luz/src/` and reference/components.md — extending an existing component's variants beats a sibling component every time. Creating a genuinely new component requires asking the user first.
2. **Design the API before moving code.** Props follow luz conventions (variant/size/colorScheme patterns; token-name props like `indicatorColor` take token names, no `bg-` prefix); compound components for multi-part patterns (Root/Item/…); controlled + uncontrolled where interactive; polymorphic `as` where it renders links.
3. **Build it complete or don't ship it:** PascalCase folder in the right category (`foundation` / `inputs-and-forms` / `navigation-and-toolbars` / `page-structure` / `status-and-indicators` / `data-visualisation` / `domain-components`), `Component.tsx` + `Component.styles.ts` (tv, slots) + `Component.stories.tsx` (a story per variant, states visible, tag `draft` until reviewed then `stable`) + barrel export + tests where behavior exists. Full state set: hover, focus, disabled, error, loading, empty.
4. **Tokens go to styles.css, not the component.** A promoted value becomes a named token in the `@theme` block (and DESIGN.md's frontmatter mirror — flag the doc update); the component consumes it. Naming follows the families (`--color-*`, `--spacing-*`, `--size-*`, `--radius-*`).
5. **Migrate every call site in the same change**, deleting the local copies. An extraction that leaves the old pattern alive has added a third variant, not consolidated two.
6. **Figma parity is part of done:** if the pattern has no Figma component, flag it for the design library; if it has one, verify names/variants align (the two systems link by value — check values, not names). Storybook MDX docs pages get no app decorators — bring your own providers; runtime-composed classes in docs may need a safelist entry.

## Verify

Storybook renders every variant/state; call sites diff shows net deletion; luz-lint clean across touched files; component checklist complete. Report: what was promoted (with API), tokens added, call sites migrated, Figma parity status, the plugin's `reference/components.md` flagged for refresh (a promoted component or variant makes its export map stale — point the user at `doctor`), anything deliberately left local (and why it doesn't qualify).
