# fs-design

Fair Supply's design suite for Claude Code — a full mirror of the [Impeccable](https://github.com/anthropics/claude-code) design-skill capability set, rebuilt around the **FS-Luz** design system and the Fair Supply product principles. Where Impeccable is generic, fs-design already knows your world: the token vocabulary in `packages/luz/src/styles.css`, the `@repo/luz` component library, the locked exposure/mitigation colour scales, and the three personas (Pete, Petra, Esther) every surface must serve.

Internal Fair Supply tooling.

## What's inside

- **One hub skill** — `/fs-design <command> [target]` with 24 commands across Build / Evaluate / Refine / Enhance / Fix / Iterate / Maintain.
- **Baked-in context** — `reference/product.md` (personas, brand, the five design principles from Product MD) and `reference/DESIGN.snapshot.md` (the complete FS-Luz spec), plus distilled working references (`luz-core.md`, `components.md`, `craft-floor.md`).
- **luz-lint** — a zero-dependency scanner enforcing the Luz vocabulary: hex/rgb literals (with token-name fix hints), stock Tailwind palette/type classes, spacing utilities ≥ 10 and fractionals, arbitrary values, stock radius/shadow, `dark:` variants, gradients, legacy `@repo/luz` exports, purple-as-decoration, appended currency codes.
- **An opt-in hook** — auto-lints every UI file edit Claude makes, feeding findings straight back into the session. Dormant until you switch it on per project.
- **Drift detection** — `context.mjs` verifies sentinel tokens against production `styles.css` every session; `doctor` reports layer-by-layer drift.

## Install

Teammates install straight from GitHub (public repo, no special access needed):

```bash
claude plugin marketplace add Sergiomuor/fs-design
claude plugin install fs-design@fs-design
```

From a local clone instead:

```bash
claude plugin marketplace add /path/to/fs-design
claude plugin install fs-design@fs-design
```

This is a per-person, per-machine install — each teammate runs it once themselves; it isn't pulled in automatically via the platform repo. It also assumes a local clone of `FairSupply/platform` on disk, since most commands (`critique`, `normalize`, `audit`, …) operate on real files there.

## Commands

| | |
|---|---|
| **Build** | `shape` (plan before code) · `init` (install context files) · `document` (regenerate DESIGN.md) · `extract` (promote patterns into luz) |
| **Evaluate** | `critique` (scored UX review + persona walkthrough) · `audit` (technical checks, P0–P3) |
| **Refine** | `normalize` (realign drift onto tokens) · `polish` (final pass) · `distill` (strip to meaning) · `harden` (errors/edges/i18n) · `onboard` (empty states, first-run) |
| **Enhance** | `bolder` (sharpen consequence) · `quieter` (calm overstated surfaces) · `animate` (luz motion vocabulary) · `colorize` (domain colour semantics) · `typeset` (type roles, 10px grid) · `layout` (5px scale, gap ownership) · `delight` (calm-confidence details) · `overdrive` (flagship craft) |
| **Fix** | `clarify` (ESG→risk/action/outcome copy) · `adapt` (viewports + print/PDF report mode) · `optimize` (perceived performance) |
| **Iterate** | `live` (Storybook/browser iteration loop) |
| **Maintain** | `doctor` (drift report) · `lint` (run luz-lint) · `hooks` (manage the auto-lint hook) |

Examples:

```
/fs-design critique apps/web/src/app/(dashboard)
/fs-design normalize apps/web/src/components/engagement-tabs.tsx
/fs-design shape supplier risk timeline card
/fs-design lint --diff
```

The four "expressive" Impeccable commands are deliberately reinterpreted for Luz's minimalist, colour-is-consequence ethos: **bolder** amplifies hierarchy (scale, black ink, whitespace) instead of adding colour; **colorize** applies the locked domain scales correctly instead of decorating; **delight** builds informed-advisor confidence instead of whimsy; **overdrive** pushes data-viz and interaction craft within tokens instead of effects.

## luz-lint

```bash
# changed files vs HEAD (default), from anywhere in the platform repo
node <plugin-root>/skills/fs-design/scripts/luz-lint.mjs --diff

# specific files, machine output
node <plugin-root>/skills/fs-design/scripts/luz-lint.mjs apps/web/src/foo.tsx --json
```

Exit 1 on errors, 0 otherwise. Escapes: `luz-lint-ignore` suppresses its own line and the next one; `luz-lint-disable` in a file's first 10 lines skips the file. Findings in `*.test.*`/`*.spec.*` downgrade to warnings.

### The hook

The plugin registers a `PostToolUse` hook for `Edit|MultiEdit|Write`, but it is **dormant by default** — nothing changes for anyone until a project opts in:

```bash
node <plugin-root>/skills/fs-design/scripts/hook-admin.mjs on     # enable for this project
node <plugin-root>/skills/fs-design/scripts/hook-admin.mjs status
node <plugin-root>/skills/fs-design/scripts/hook-admin.mjs off
```

The toggle lives in `.claude/fs-design.local.json` at the project root (a per-person setting — add it to `.gitignore`). `FS_DESIGN_HOOK=1` forces it on for a session. When active, every UI file Claude edits is scanned and findings return as context, so violations get fixed in the same turn. The hook never blocks an edit.

## Keeping it current

Ground truth is `packages/luz/src/styles.css` on platform `main`. When tokens or components change:

1. `/fs-design document` — refresh the repo-root `DESIGN.md` and get the exact list of plugin files needing the same values.
2. Update `skills/fs-design/reference/DESIGN.snapshot.md`, the `SENTINELS` in `scripts/context.mjs`, and `HEX_TO_TOKEN` in `scripts/luz-lint.mjs` per that report.
3. `/fs-design doctor` — confirm all layers align.

`context.mjs` runs at the start of every session and shouts `DRIFT` if production has moved under the plugin, so staleness surfaces itself.

## Layout

```
fs-design/
├── .claude-plugin/
│   ├── plugin.json           # plugin manifest
│   └── marketplace.json      # lets this repo act as its own marketplace
├── hooks/hooks.json          # PostToolUse registration (dormant until opted in)
└── skills/fs-design/
    ├── SKILL.md              # the hub: setup, surface modes, command table, routing
    ├── reference/            # product.md · luz-core.md · components.md · craft-floor.md
    │                         # routing.md · DESIGN.snapshot.md · one playbook per command
    └── scripts/
        ├── context.mjs       # session setup + sentinel drift check + target classification
        ├── luz-lint.mjs      # the vocabulary scanner (also exports scanFile for the hook)
        ├── hook.mjs          # PostToolUse entry — opt-in, non-blocking
        └── hook-admin.mjs    # on | off | status
```
