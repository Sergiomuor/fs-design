# /fs-design shape — plan UX/UI before writing code

Use before building any new surface, feature, or component. Shape produces an agreed plan — never production code. The deliverable is a spec plus, for visually novel work, an interactive prototype the user signs off; production implementation is a separate step.

## Method

1. **Name the job and the mode.** What does the user accomplish here, and which surface mode owns it (Operate/Oversee/Interrogate/Report)? Write one sentence: "Petra scans portfolio mitigation status and spots the engagements needing escalation." If the primary persona is unclear, ask — don't average.

2. **Walk the spectrum.** For the primary persona, list the 2–4 questions the surface must answer instantly (Petra's are always variants of: What is the risk? Is action required? Has it been completed?). Then check the other two personas can still use it: Pete needs the next action obvious; Esther needs a path one step deeper to methodology/evidence. Note what goes in the default state vs behind progressive disclosure.

3. **Inventory before invention.** Search `packages/luz/src/` and reference/components.md for everything the plan needs. Map each UI element to an existing luz component + variant. Anything unmapped is either (a) an existing component needing a new variant — note the extension, or (b) genuinely new — flag it explicitly and ask before planning a new component.

4. **Source-backed spec table.** When a Figma design exists, build the spec table from verified Figma values (use `get_variable_defs` + screenshots — never trust generated fallback names) mapped to luz tokens. Format:

   | Element | Figma value | Luz token/component | Notes |
   |---|---|---|---|

   Every row's mapping is either exact or flagged. **Gaps in the design are questions for the user, not blanks to fill with taste.** When Figma and luz disagree (a hex with no token, an off-scale gap), stop and flag it as a decision line.

5. **Structure with the standard skeleton.** Titled sections → `Region`/`RegionHeader`/`RegionContent` (50px rhythm); KPI opening → `DataBlock`; in-page switching → `SectionToggleTab`; page tabs → `BigTabs`; metric anatomy → `MetricText` (label, hero figure, caption). Layout math uses container presets and `--size-*` tokens, never invented widths.

6. **Plan the whole lifecycle.** For each element: loading (skeleton mirroring its real shape), empty (what it says, what action it offers), error (component-level containment — the shell stays usable), and the states of every control. A plan without these is half a plan.

7. **Prototype sign-off when visual.** For visually novel work, the sign-off artifact is an interactive, stateful prototype composed from real `@repo/luz` components — a throwaway Storybook story or in-app preview route — demonstrating the step-6 lifecycle states, so what the user approves renders exactly as production will. Get explicit sign-off before any production code; iterate on the prototype with `live`. Only when no render environment is available may a static HTML mockup with real token values stand in, and it must be flagged to the user as lower-fidelity (hand-rolled markup can visibly diverge from real luz rendering). Either artifact is a reference, never a source to copy from.

## Output

A plan the user can approve in one read: job + mode + persona questions → component map (with the ask-list for anything new) → spec table → lifecycle table → interactive prototype (when visual) → open questions. End with the decision lines that block implementation, if any.
