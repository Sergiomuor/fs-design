# /fs-design feedback — capture, persist, apply

The loop that makes the suite learn. Every design run ends with one structured feedback offer; what the user says becomes an immediate fix, a persistent rule in [learnings.md](learnings.md), or a direct correction to a playbook/script — and the session ends with the installed plugin refreshed so the very next run obeys it. Nothing durable is written without the user confirming the exact wording.

## When this runs

- **End of every design command** (Build / Evaluate / Refine / Enhance / Fix / Iterate): after reporting done, present the inventory (Step 1) and invite feedback once. Declined or ignored → move on; never nag, never block the report.
- **Standalone** `/fs-design feedback [notes]`: no fresh run to inventory — reconstruct one from the conversation, `git diff`, or ask which surface the feedback concerns, then continue from Step 2.
- Maintenance commands (`lint`, `hooks`, `doctor`, `document`, `init`) skip the offer.

## Step 1 — the inventory

Number everything the run touched or decided, so feedback can point precisely:

```
What this run changed — point by number or name:
1. EngagementCard header row — apps/web/src/components/engagement-card.tsx (type ranks, gap-4)
2. Status colour mapping — chose mitigation scale over exposure (decision)
3. Empty state copy — "No suppliers yet…" (clarify pass)
```

Components and surfaces get file paths; design decisions (token choices, hierarchy calls, copy) are items too — feedback often targets the decision, not the file. Praise is capturable: "keep doing X" persists the same way as "stop doing Y".

## Step 2 — pointing

Two mechanisms; use whichever the user reaches for:

- **By number or name** from the inventory, or any component/surface named in prose ("the buttons overall").
- **On screen** — when Storybook / the app / a preview is reachable (or the user asks), open the surface using the [live.md](live.md) mechanics (Storybook first; the web app is auth-gated), screenshot it, and let the user point by region: "the card top-right", "this gap". **Resolve the pointed region to a component + file before recording anything** and confirm the resolution back ("that's `EngagementCard`'s header row — engagement-card.tsx") so feedback never attaches to the wrong element. When the feedback is geometric, zoom and read computed styles before agreeing about what's on screen.

## Step 3 — classify each item

| Kind | Test | Destination |
|---|---|---|
| **Fix-now** | One-off taste for this surface only | Apply to the current work immediately; nothing persisted |
| **Rule** | Would change how *future* runs behave | learnings.md, via the confirmation protocol below |
| **Reference correction** | A reference file states something factually wrong (value, API, step) | Edit that reference file directly |
| **Script change** | luz-lint gap or false positive; context.mjs misclassification | Edit the script; smoke-test before commit |

One item can be two kinds — "fix this here *and* never do it again" is fix-now + rule. State your classification per item; the user overrides freely. A rule that contradicts DESIGN.md/Figma ground truth is not a rule — it's drift or a spec question: route it to `doctor`/`document` and say so.

## Step 4 — confirm wording (rules only)

For each rule, draft:

- **Text** — imperative, testable at review time ("every metric label gets a tooltip", "never introduce a second accent per card"), free of this session's specifics. Not a vibe ("be more careful").
- **Scope** — `global` · `command:<name>` · `component:<LuzName>` · `surface:<area>` · `copy` · `lint`.

Present all drafts in one numbered pass; the user approves, rewords, or drops each. **Only approved wording is written — no exceptions.** A badly generalized rule poisons every future run; when in doubt, scope narrower.

## Step 5 — write

Resolve the write target first — **never edit the installed cache copy** (`~/.claude/plugins/cache/...`); it is overwritten on every update:

- Read `~/.claude/plugins/known_marketplaces.json` → `fs-design.source`.
- `source: "directory"` → that `path` is the working repo (the maintainer's machine). Rules append to `skills/fs-design/reference/learnings.md` there; reference corrections and script changes edit the repo files directly.
- `source: "github"` (a teammate's install, no local repo) → rules append to the **personal overlay** `~/.claude/fs-design.learnings.md` (same entry format; create with the same header). It loads every session and survives plugin updates. Suggest PRing rules with team-wide value to the repo. Reference/script corrections can't land locally — offer to draft the change as a PR-ready diff instead.

Entry format is defined at the top of learnings.md: next sequential id, scope, date, `active`, one origin line. Script edits get a smoke test before commit (`luz-lint.mjs` on a known-dirty fixture; `context.mjs` run once) — a broken script is worse than a missing rule.

## Step 6 — sync, or nothing happened

The installed plugin is a frozen copy; repo edits are invisible until refreshed:

1. Bump the patch version in `.claude-plugin/plugin.json` (the cache is keyed by version).
2. Commit everything in the plugin repo — message `feedback: <summary> (Ln–Lm)`. Pushing to GitHub is asked, never automatic.
3. `claude plugin update fs-design@fs-design` — the qualified `name@marketplace` form; the bare name is not found.
4. Verify: `~/.claude/plugins/installed_plugins.json` shows the new version and the new cache path contains the entry just written (ignore its `gitCommitSha` — it is not refreshed on update; compare versions and content). Report the verified version and that it applies from the **next** session — the running session keeps the old copy ("rules L004–L005 active as of 1.1.3, from your next session").

Personal-overlay writes (teammate path) skip all of this: the overlay is read live each session.

## Subcommands

- `feedback list` — table of all rules (id · scope · status · first line) from learnings.md and the personal overlay.
- `feedback retire <id> [reason]` — flip the entry's status to `retired <date> — <reason>`. Retire, never delete: ids stay stable, and retirements are how bad generalizations get audited.
- `feedback promote` — for each active rule that has proven itself (the user says so, or it has held across several runs): fold it into the owning file (`command:critique` → critique.md; `component:*` → components.md; `global` visual/process → craft-floor.md or luz-core.md; `lint` → luz-lint.mjs), flip its status to `promoted → <file>`, then one commit + sync. Promotion keeps the playbooks canonical and learnings.md small enough to load every session.

## Rules of the loop

- Confirmed wording before writing, always — and one offer per run, never a nag.
- Precedence when guidance conflicts: personal overlay > shipped learnings > playbooks. Say which rule won when it matters.
- The repo (or overlay) is the only write target; the cache is read-only.
- End every feedback session by restating what is now active and from which version.
