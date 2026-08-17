# /fs-design onboard — first-run, empty states, and re-entry

Fair Supply's onboarding problem is unusual: the *frequent* user (Pete) learns the system anyway; the *important* users (Petra, Esther) return after weeks and must re-learn nothing. Design for **recognition over recall** — every re-entry is a first run.

## Where it applies

- True first-run: a new customer account, a supplier's first portal visit, a module just enabled.
- Empty states: no suppliers onboarded yet, no engagements, no mitigation actions, a filtered view with zero results.
- Re-entry: Petra opening the portfolio after three weeks; Esther landing on a methodology page from a report link.

## Method

1. **Name the first question.** For this persona arriving cold: what must they understand within five seconds? Write the answer as the surface's opening statement (heading + one `text-body-md` line), in risk/action/outcome language — not feature language.
2. **Empty states are teachers.** Every empty region states, in domain terms: what would appear here, why it's empty now, and the one action that fills it (a real `Button`, not a hint). Distinguish *nothing yet* (invite action) from *nothing matches* (show the active filters and a clear-filters action) from *nothing applicable* (explain calmly). Never a bare "No data".
3. **Statuses explain themselves.** Petra shouldn't need to remember what "Developing" means — the `MitigationTag` pairs with an in-context definition (`Tooltip variant="help"`) on first encounter surfaces. Status vocabulary comes from `STATUS_LABELS`/`ENGAGEMENT_STATUS_LABELS`, never ad-hoc synonyms.
4. **Sequence with the existing machinery.** Multi-step flows use `ProgressDots`/`SectionToggleTab` with named steps; uploads use `Dropzone` with its validation messaging; guided setup belongs in the flow itself (Work Happens in Place), not a tour overlay. No coach marks, no confetti — the informed advisor shows the work, it doesn't celebrate itself.
5. **Progressive activation.** Show value with partial data: a dashboard with one supplier assessed still demonstrates the full anatomy (real DataBlock with one live metric beats a wall of empty charts). Skeletons for *loading*, empty states for *absent* — never confuse the two.
6. **The supplier side is a first-run every time.** Suppliers arrive via email link, low context, possibly once ever: the portal surface leads with who is asking, what is required, how long it takes, and what happens after — before any form field.

## Verify

Walk each persona in cold: fresh account, empty module, three-weeks-later re-entry. Every dead end has a next action; every status is decodable without memory; luz-lint clean. Report: states added (with stories), the first-question answer per surface, and any flow that still requires recall.
