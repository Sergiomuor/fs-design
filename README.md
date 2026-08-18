# fs-design

Fair Supply's design suite for Claude Code, built around the **FS-Luz** design system. It already knows our world: the Luz token vocabulary from `packages/luz/src/styles.css`, the `@repo/luz` component library, the locked exposure/mitigation colour scales, and the three personas (Pete, Petra, Esther) every surface must serve.

Internal Fair Supply tooling.

## What's inside

- **One hub skill** — `/fs-design <command> [target]`, with commands covering the whole design workflow: plan, review, refine, enhance, fix, iterate, learn, maintain.
- **Baked-in context** — the product principles and personas (`reference/product.md`), the complete FS-Luz spec (`reference/DESIGN.snapshot.md`), and distilled working references.
- **luz-lint** — a zero-dependency scanner that flags anything outside the Luz vocabulary (raw hex colours, stock Tailwind classes, off-scale spacing, gradients, purple used as decoration, and more) with fix hints.
- **An opt-in hook** — auto-lints every UI file edit Claude makes and feeds findings back into the session. Off until a project switches it on.
- **Drift detection** — every session checks the plugin's token knowledge against production `styles.css` and warns if production has moved.

## Install

From GitHub (public repo, no special access needed):

```bash
claude plugin marketplace add Sergiomuor/fs-design
claude plugin install fs-design@fs-design
```

From a local clone instead:

```bash
claude plugin marketplace add /path/to/fs-design
claude plugin install fs-design@fs-design
```

Each teammate installs it once on their own machine — the platform repo doesn't pull it in automatically. Most commands operate on real files, so a local clone of `FairSupply/platform` is assumed.

## How to use it

Everything goes through the hub:

```
/fs-design <command> [target]
```

The target can be a file, a folder, a route, or a plain-language description of the surface you're working on. Run it from your platform checkout so the command can read and edit real files.

A typical run: the command loads its playbook plus the FS-Luz references, does the work, lint-checks what it changed, and ends with a short feedback offer — anything you correct there can become a persistent rule for future runs.

```
/fs-design critique apps/web/src/app/(dashboard)
/fs-design normalize apps/web/src/components/engagement-tabs.tsx
/fs-design shape supplier risk timeline card
/fs-design lint --diff
```

## Commands

| | Command | What it does |
|---|---|---|
| **Build** | `shape` | Plan a feature's UX before any code is written |
| | `init` | Install the FS context files (PRODUCT.md, DESIGN.md) into a project |
| | `document` | Regenerate DESIGN.md from production `styles.css` |
| | `extract` | Promote repeated app patterns into luz components/tokens |
| **Evaluate** | `critique` | Scored UX review with a persona walkthrough |
| | `audit` | Technical checks (lint, a11y, theming, responsive, perf), P0–P3 report |
| **Refine** | `normalize` | Realign drifted UI back onto tokens and luz components |
| | `polish` | Final quality pass before shipping |
| | `distill` | Strip a surface down to its meaning |
| | `harden` | Error states, edge cases, i18n |
| | `onboard` | First-run flows and empty states |
| **Enhance** | `bolder` | Amplify hierarchy without adding noise |
| | `quieter` | Calm an overstated surface |
| | `animate` | Purposeful motion within the luz motion vocabulary |
| | `colorize` | Apply the domain colour scales correctly |
| | `typeset` | Type roles and the 10px type grid |
| | `layout` | The 5px spacing scale, gap ownership, region rhythm |
| | `delight` | Calm-confidence details — the informed-advisor feel |
| | `overdrive` | Flagship craft for hero surfaces, within tokens |
| **Fix** | `clarify` | Rewrite UX copy into risk / action / outcome language |
| | `adapt` | Viewports, density, print/PDF report mode |
| | `optimize` | Perceived performance: skeletons, hydration, bundle hygiene |
| **Iterate** | `live` | Visual iteration loop against Storybook or the running app |
| **Learn** | `feedback` | Capture run feedback; confirmed rules persist (`list` / `retire <id>` / `promote`) |
| **Maintain** | `doctor` | Drift report: plugin vs DESIGN.md vs production |
| | `lint` | Run luz-lint directly |
| | `hooks` | Turn the auto-lint hook `on` / `off` / `status` |

## luz-lint

The scanner behind `audit`, the hook, and `/fs-design lint`. Run it standalone from anywhere in the platform repo:

```bash
# changed files vs HEAD (default)
node <plugin-root>/skills/fs-design/scripts/luz-lint.mjs --diff

# specific files, machine output
node <plugin-root>/skills/fs-design/scripts/luz-lint.mjs apps/web/src/foo.tsx --json
```

Exits 1 on errors, 0 otherwise. Escapes: `luz-lint-ignore` suppresses its own line and the next one; `luz-lint-disable` in a file's first 10 lines skips the file. Findings in `*.test.*` / `*.spec.*` files downgrade to warnings.

### The hook

The plugin registers a `PostToolUse` hook for `Edit|MultiEdit|Write`, but it is **dormant by default** — nothing changes for anyone until a project opts in:

```bash
node <plugin-root>/skills/fs-design/scripts/hook-admin.mjs on     # enable for this project
node <plugin-root>/skills/fs-design/scripts/hook-admin.mjs status
node <plugin-root>/skills/fs-design/scripts/hook-admin.mjs off
```

When on, every UI file Claude edits is scanned and the findings come straight back into the session, so violations get fixed in the same turn. The hook never blocks an edit. The toggle lives in `.claude/fs-design.local.json` at the project root (a per-person setting — add it to `.gitignore`); `FS_DESIGN_HOOK=1` forces it on for a session.

## The feedback loop

Every design command ends with one feedback offer: a numbered inventory of what the run touched (components, files, decisions). Answer by number or name — or just point at the rendered surface in Storybook or the browser. Each piece of feedback becomes a one-off fix (applied now), a durable rule, a reference correction, or a lint/script change. Durable rules are written to `reference/learnings.md` only after you confirm the exact wording; they load on every run and override playbook defaults.

`feedback list` shows the current rules, `feedback retire <id>` deactivates one (ids are never deleted), and `feedback promote` folds a proven rule into the owning playbook or script.

Because the installed plugin is a frozen cache copy, persisting a rule ends with: bump the plugin version, commit, and run `claude plugin update fs-design@fs-design` — new rules apply from the next session. Installs from GitHub (no local clone) write rules to a personal overlay at `~/.claude/fs-design.learnings.md` instead — read live each session, survives updates, and PR-able into the repo when a rule deserves to be shared.

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
    │                         # feedback.md (the loop) · learnings.md (persisted rules)
    └── scripts/
        ├── context.mjs       # session setup + sentinel drift check + target classification
        ├── luz-lint.mjs      # the vocabulary scanner (also exports scanFile for the hook)
        ├── hook.mjs          # PostToolUse entry — opt-in, non-blocking
        └── hook-admin.mjs    # on | off | status
```
