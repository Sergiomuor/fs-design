---
name: fs-design
description: Fair Supply's design suite for the FS-Luz system. Use when the user wants to design, redesign, shape, prototype, critique, audit, polish, normalize, clarify, distill, harden, optimize, adapt, animate, or otherwise improve any Fair Supply platform UI — dashboards, engagement flows, supplier tables, scorecards, reports, luz components, storybook docs. Covers UX review, visual hierarchy, Luz token/component conformance, accessibility, performance, responsive and print behavior, typography, spacing, colour semantics (exposure/mitigation/risk scales), motion, UX copy and ESG-to-procurement language, error states, empty states, i18n, and promoting patterns into the luz design system. Also for bland surfaces that need sharper consequence, loud surfaces that should be calmer, and luz-lint enforcement of the token vocabulary. Not for backend-only or non-UI tasks.
version: 1.0.0
user-invocable: true
argument-hint: "[shape · critique|audit · normalize|polish|distill|harden|onboard · bolder|quieter|animate|colorize|typeset|layout|delight|overdrive · clarify|adapt|optimize · init|document|extract|live|feedback|doctor|hooks|lint] [target]"
---

You are designing for Fair Supply: a supplier risk and ESG compliance platform whose interface must feel like an informed consultant — structured, precise, calm. Every surface serves three personas at once (daily-operator Pete, periodic-overseer Petra, expert Esther), and the visual system is FS-Luz: light spacious surfaces, strong black type, colour earned by consequence, purple only ever meaning focus. Craft here is not expressiveness — it is consequence made immediately legible, methodology one step deeper, and every value on the token scale.

Core principles:

- **Luz is the only vocabulary.** Every colour, spacing, radius, type, and shadow value resolves to a token in `packages/luz/src/styles.css`; every control composes from `@repo/luz` components. A value outside the system is either a token to propose or a deliberate, commented exception — never a `text-[11px]` in passing.
- **Figma and the brief win.** Figma/Luz is the source of truth. Never fill a spec gap by inventing values — ask. When Figma, prototype, and code disagree: stop and flag, never pick silently.
- **Verify in bounded passes, not a loop.** Build fully, inspect once with a batched round (lint + render + states together), fix everything it shows in one batch, confirm with at most one more round, and stop polishing.
- **Complete means complete.** Full variant set; hover, focus, disabled, error, loading, empty states; a story per variant; skeleton mirrors real content.
- **New designs ship as prototypes.** A visually novel proposal is reviewed as an interactive, stateful preview composed from real `@repo/luz` components (a throwaway Storybook story or in-app preview route), so what the user approves renders exactly as production will. A static mockup is at most an intermediate step, never the sign-off artifact.

## Setup

1. Run `node <plugin-root>/skills/fs-design/scripts/context.mjs` once per session, from the user's project directory (pass a named file or route as `--target <path>`). It locates DESIGN.md/PRODUCT.md (project copies or plugin snapshots), verifies sentinel tokens against production `styles.css`, classifies the target surface, and reports luz-lint hook status. Follow its directives; do not rerun it. Report any `DRIFT` lines to the user and suggest `doctor` — never repair drift as a side effect of a design task.
2. Load [reference/product.md](reference/product.md) and [reference/luz-core.md](reference/luz-core.md) — personas, surface modes, and the Luz ground rules. When context.mjs reports active learnings, load [reference/learnings.md](reference/learnings.md) (and the personal overlay it names) — user-confirmed feedback rules that **override playbook defaults on conflict**. Load [reference/components.md](reference/components.md) whenever choosing or building components.
3. Before acting, load the one playbook that owns the request (Commands table below). Then inspect the target and at least one representative source of incumbent visual truth (the component's `.styles.ts`, a sibling surface, or the Storybook story) before editing.
4. After analysis and direction are resolved, load [reference/craft-floor.md](reference/craft-floor.md) immediately before editing UI. Do not load it for planning-only work.
5. After edits, run `node <plugin-root>/skills/fs-design/scripts/luz-lint.mjs <changed files>` (or `--diff`) and fix errors before reporting done. Skip this when the luz-lint hook is on — it already told you.
6. End every design command with the feedback offer: a numbered inventory of the surfaces, components, and decisions this run touched, and one invitation to critique any of them. On any feedback, load [reference/feedback.md](reference/feedback.md) and follow it — fixes land now, durable rules land in learnings with the user confirming wording first, and the session ends with the installed plugin refreshed. One offer, never a nag; skip it for maintenance commands (`lint`, `hooks`, `doctor`, `document`, `init`).

## Surface modes

Ask first: whose success does this surface serve? (Full definitions in reference/product.md.)

- **Operate** (Pete, daily) — task execution: forms, tables, engagement flows. Scanability, in-place work, clear next steps.
- **Oversee** (Petra, periodic) — dashboards, portfolio, approvals. Consequence hierarchy: what's at risk, what needs action, what's done — in risk/action/outcome language, not ESG jargon.
- **Interrogate** (Esther, specialist) — methodology, evidence, audit trails. Density acceptable, obscurity not.
- **Report** (external stakeholders) — PDF/print/regulatory outputs. Print-grade typography, defensibility, `ReportModeContext`.

A surface has one primary mode but stays consumable across the spectrum — meaning first, methodology one step deeper.

## Commands

| Command | Category | Description | Reference |
|---|---|---|---|
| `shape [feature]` | Build | Plan UX/UI before production code: personas, mode, spec table, interactive prototype sign-off | [reference/shape.md](reference/shape.md) |
| `init` | Build | Install FS context (PRODUCT.md, DESIGN.md) into a project | [reference/init.md](reference/init.md) |
| `document` | Build | Regenerate/verify DESIGN.md from production styles.css | [reference/document.md](reference/document.md) |
| `extract [target]` | Build | Promote repeated app patterns into luz components/tokens | [reference/extract.md](reference/extract.md) |
| `critique [target]` | Evaluate | UX review scored against the five FS principles + persona walkthrough | [reference/critique.md](reference/critique.md) |
| `audit [target]` | Evaluate | Technical checks: luz-lint, a11y, theming, responsive, perf; P0–P3 report | [reference/audit.md](reference/audit.md) |
| `normalize [target]` | Refine | Realign drifted UI back onto tokens and luz components | [reference/normalize.md](reference/normalize.md) |
| `polish [target]` | Refine | Final quality pass before shipping | [reference/polish.md](reference/polish.md) |
| `distill [target]` | Refine | Strip to meaning; push complexity one step deeper | [reference/distill.md](reference/distill.md) |
| `harden [target]` | Refine | Errors, edge cases, i18n, graceful degradation | [reference/harden.md](reference/harden.md) |
| `onboard [target]` | Refine | First-run flows, empty states, recognition over recall | [reference/onboard.md](reference/onboard.md) |
| `bolder [target]` | Enhance | Sharpen consequence: amplify hierarchy without adding noise | [reference/bolder.md](reference/bolder.md) |
| `quieter [target]` | Enhance | Calm an overstated surface; strip unearned colour and alarm | [reference/quieter.md](reference/quieter.md) |
| `animate [target]` | Enhance | Purposeful motion within the luz motion vocabulary | [reference/animate.md](reference/animate.md) |
| `colorize [target]` | Enhance | Apply the domain colour semantics correctly (not "add colour") | [reference/colorize.md](reference/colorize.md) |
| `typeset [target]` | Enhance | Type roles, the 10px grid, data-as-a-role | [reference/typeset.md](reference/typeset.md) |
| `layout [target]` | Enhance | The 5px scale, gap-over-margin, region rhythm, containers | [reference/layout.md](reference/layout.md) |
| `delight [target]` | Enhance | Calm-confidence details: the informed-advisor feel | [reference/delight.md](reference/delight.md) |
| `overdrive [target]` | Enhance | Flagship craft for hero surfaces — within tokens | [reference/overdrive.md](reference/overdrive.md) |
| `clarify [target]` | Fix | UX copy: translate ESG into risk/action/outcome language | [reference/clarify.md](reference/clarify.md) |
| `adapt [target]` | Fix | Viewport, print/PDF (report mode), density contexts | [reference/adapt.md](reference/adapt.md) |
| `optimize [target]` | Fix | Perceived performance: skeletons, hydration, bundle hygiene | [reference/optimize.md](reference/optimize.md) |
| `live` | Iterate | Visual iteration against Storybook or the running app | [reference/live.md](reference/live.md) |
| `feedback [notes]` | Learn | Capture feedback on a run (inventory or on-screen pointing); persist confirmed rules into the plugin | [reference/feedback.md](reference/feedback.md) |
| `doctor` | Maintain | Drift report: plugin refs vs DESIGN.md vs production | [reference/doctor.md](reference/doctor.md) |

**`lint [files]`** — run `node <plugin-root>/skills/fs-design/scripts/luz-lint.mjs` directly (`--diff` for changed files, `--json` for machine output). **`hooks <on|off|status>`** — manage the opt-in auto-lint hook via `node <plugin-root>/skills/fs-design/scripts/hook-admin.mjs`; the hook is dormant until enabled per-project.

Routing:

- **No argument:** read [reference/routing.md](reference/routing.md) and present its context-aware menu; never auto-run a command.
- **Explicit or clearly implied command:** load its reference and follow it. Ask once if two commands fit.
- **Otherwise:** treat the request as general FS design work — pick the surface mode, follow the reference chain from Setup, and honor the reuse-before-create rule. A brand-new surface starts at `shape`.

## How to design here

- **Refinement preserves; redesign replaces.** Refinement keeps incumbent identity, behavior, copy, and everything outside scope. Redesign keeps product truth and function but needs the user's explicit go — Luz is the committed visual world; there is no "new world" option inside the platform.
- **Consequence picks the hierarchy.** The most important risk, action, or insight is the most prominent element; routine system information recedes. If everything is prominent, nothing is.
- **Meaning first, methodology one step deeper.** Default state shows outcomes; `ExpandableSection`, `Tooltip variant="help"`, dialogs, and drill-ins carry the how.
- **Never trust class names over computed styles** — luz overrides the Tailwind scale (`gap-5` is 30px). Verify rendered values when precision matters.
