# /fs-design doctor — drift report

Reports disagreement between the four layers that must stay aligned: **production styles.css** (ground truth, on `main`) → **root DESIGN.md** (the mirror) → **this plugin's snapshots/scripts** → **the neighbours** (luz-reference.md, the repo's own luz skill, Figma). Doctor only reports; repairs run through `document` (DESIGN.md), plugin maintenance (snapshot/scripts), or explicit user asks. Never repair drift as a side effect.

## Checks, in order

1. **Sentinels** — `context.mjs` already verified ten sentinel tokens against live styles.css this session; re-read its DRIFT/SENTINEL-MISSING lines. Any hit means layers 1↔3 disagree.
2. **DESIGN.md ↔ styles.css** — run the `document` diff read-only (changed/new/ghost tokens, component inventory). Note whether the checkout is a prototype branch: compare against `origin/main`, and say which branch the working tree is on.
3. **Plugin internals** — `reference/DESIGN.snapshot.md` vs root DESIGN.md (should be byte-identical after each `document` run); `luz-lint.mjs` HEX_TO_TOKEN map vs the frontmatter colour table (a renamed/added colour needs a map entry); `context.mjs` SENTINELS vs current values.
4. **Neighbours** —
   - `apps/storybook/public/landing/luz-reference.md`: read its self-declared audit date; older than the last token change → stale flag.
   - `.claude/skills/luz/SKILL.md` in the platform repo: known to drift (old category names, legacy components, off values) — spot-check its component categories against `packages/luz/src/components/` and list concrete wrong lines, so the team can decide whether to refresh or retire it.
   - Figma (FS-Luz: UI): can't be read from here — list the changed values that need a Figma-side verification pass, linked by value not name.
5. **Enforcement health** — hook state (on/off + toggle file present), lint self-test (`luz-lint.mjs` runs and returns JSON on a known file), hooks.json intact.
6. **Install freshness** — the version in `~/.claude/plugins/installed_plugins.json` for `fs-design@fs-design` vs `.claude-plugin/plugin.json` in the source repo (path in `~/.claude/plugins/known_marketplaces.json`), and uncommitted changes in that repo. A stale or behind cache means runs obey an old plugin — repair is commit + `claude plugin update fs-design`. Also spot-check that learnings entries marked `promoted → <file>` actually appear in their destination files.

## Report

```
Layer state: styles.css@<commit> · DESIGN.md (fresh|stale: N findings) · plugin (fresh|stale: files) · neighbours (flags)
Findings: each with layer pair, the exact disagreement, and the repair owner:
  → DESIGN.md drift: run /fs-design document
  → plugin drift: update <file> (snapshot / SENTINELS / HEX_TO_TOKEN) — list exact edits
  → neighbour drift: recommendation only (refresh luz-reference.md · refresh/retire .claude/skills/luz · Figma pass)
Verdict: aligned | drift contained to <layer> | ground truth moved (document first, then propagate)
```

If everything matches: say so plainly, with the styles.css commit hash checked against.
