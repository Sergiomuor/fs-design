# /fs-design live — visual iteration against the running UI

Iterate on real renders: change → hot reload → inspect → change. The loop runs against Storybook (preferred — isolated, auth-free) or the running app, using the in-app browser tools. This is a working method, not a variant generator: propose, render, judge, refine — in bounded passes.

## Set up the loop

1. **Storybook first.** `pnpm --filter @repo/storybook dev` → http://localhost:6006 (use the repo's launch config / preview tooling when available). Component work always iterates here: the story renders every variant and state side by side, and prop knobs beat code-flipping. If the component lacks a story for the state you're designing, write the story first — it outlives the session.
2. **The app when composition is the question.** The `web` launch config is auth-gated — expect a login wall; for visual QA of a specific region it is often faster to force the relevant provider/open state in code temporarily (marked clearly, reverted after) than to fight the gate. App-shell Suspense can hang hydration on backend data — if the page never paints, that's likely why, not your change.
3. **A branch preview when sharing.** Pushing a platform branch auto-deploys previews; fetch the live URLs from the deployment statuses (`environment_url`). Use for showing the user options on real infrastructure.

## The iteration protocol

- **One axis per round.** Vary spacing *or* type rank *or* component choice — a round that changes three things teaches nothing. State the axis before editing.
- **Render → screenshot → measure.** After each change: screenshot the surface, and when the question is rhythm/geometry, read computed styles (luz classes lie to intuition — `gap-5` is 30px). Compare against the previous round's capture, not memory.
- **Judge against the system, then taste.** Each variant first passes the floor (tokens, grid, states) — then pick by consequence hierarchy and the surface's persona questions. A prettier variant that muddies Petra's 5-second read loses.
- **Interactions need real sequences.** Hover/tooltip states in the browser need full pointer event sequences (`pointermove`/`mousemove` included); keyboard states need actual Tab-walks. Verify open/close/focus-restore per round when overlays are involved.
- **Bounded passes.** Agree the round budget up front (default: 3 rounds per axis). Present each round as: what changed, screenshot, verdict, next axis. When two rounds in a row produce no clear winner, stop and ask — taste calls belong to the user.

## Wrap up

Winning variant lands via the ordinary flow: styles into the component/`.styles.ts` (climbing the ladder), any forced states reverted, story updated to capture the final state, `luz-lint --diff` clean, one confirming render. Report: axes explored, rounds per axis, the decision and its rationale, before/after captures.
