# /fs-design document — regenerate and verify DESIGN.md

DESIGN.md at the platform root is the portable export of the design system: YAML frontmatter mirroring `packages/luz/src/styles.css` **verbatim**, plus the prose spec (rules, components, do/do-not). This command refreshes it against production and reports what moved. The mirror rule: if a token changes in styles.css, update both — the frontmatter is never allowed to drift silently.

## Method

1. **Diff the frontmatter against styles.css** (ground truth: `main`, not the working branch — check `git status`; if the checkout is a prototype branch, read via `git show origin/main:packages/luz/src/styles.css`). Compare every `--color-*`, `--spacing-*`, `--radius-*`, `--font-*`, `--shadow-*`, `--size-*`, `--breakpoint-*`, `--animate-*`, `--ease-*` declaration to the frontmatter's `colors:`/`spacing:`/`rounded:`/`typography:`/`shadows:`/`layout:`/`motion:` entries. Three finding types: **changed value** (token exists both sides, values differ), **new token** (in CSS, missing from frontmatter), **ghost token** (in frontmatter, gone from CSS).
2. **Diff the component inventory** against the barrel (`packages/luz/src/index.ts` + category barrels): new exports missing from §7/the cheatsheet, removed exports still documented, legacy-list candidates (exports with zero app consumers — verify with a grep across `apps/` before declaring).
3. **Verify the composite utilities** still exist (the `@utility` blocks for `text-heading-*`, `text-body-*`, `text-data-*`, input metrics, containers) — the prose references them by name.
4. **Apply updates to DESIGN.md**: frontmatter values verbatim from CSS (keep comments and ordering style); prose only where facts changed (a new component gets its one-liner in the right section; a changed default gets its table row fixed). Never rewrite voice or structure as a side effect. Show the user the diff before writing when changes are non-trivial.
5. **Propagate**: the fs-design plugin carries a snapshot (`reference/DESIGN.snapshot.md`) and sentinel values in `scripts/context.mjs` + hint maps in `scripts/luz-lint.mjs` — if tokens changed, apply the same values to `context.mjs` SENTINELS and `luz-lint.mjs` HEX_TO_TOKEN in the same plugin edit as the snapshot, so one bump/commit/update cycle leaves snapshot, sentinels, and hint maps consistent (still list every change explicitly in the report).
6. **Check the neighbours** (report, don't fix unasked): `apps/storybook/public/landing/luz-reference.md` (dated — is it stale vs this refresh?), the repo's `.claude/skills/luz/SKILL.md` (known to drift), Figma library parity for any changed value (flag for a Figma pass; the systems link by value).

## Report

```
styles.css @ <commit> vs DESIGN.md
Changed: token — old → new (each)
New: token = value (each) · Ghost: token (each)
Components: added / removed / legacy candidates
Files updated · plugin files needing the same change · neighbours flagged
```

If nothing moved: say exactly that — "frontmatter matches production styles.css" — and stamp the verification date in the report (not the file).
