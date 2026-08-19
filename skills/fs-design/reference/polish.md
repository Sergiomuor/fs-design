# /fs-design polish — final quality pass before shipping

The last step, not the first: polish only functionally complete work. Polish is subtractive precision — catching the small failures that separate shipped from credible. Triage to the ship date; fix systematically, not one pixel at a time.

## The pass, in order

1. **Vocabulary sweep.** `luz-lint --diff` (or pass the target's files explicitly when the working tree is clean — a committed target scans zero files under `--diff`). Zero errors; every surviving warning has a comment earning it.
2. **Rhythm.** Spacing values on the 5px scale and owned once (container pads, gap separates; no child margins). Region/ModuleSection at the 50px rhythm; field label-to-input at `gap-field` (6px). Verify computed values, not class names.
3. **Type.** Every text node wears a role; line-heights land on the 10px grid; metrics in the data roles (Lausanne 200–300), labels in `data-label`/`label-xs`; no bare unstyled text (it falls to the system font); weights follow the inverse-to-size rule.
4. **States.** Every interactive element: hover, focus (purple ring/halo; red for destructive), active, disabled (tokenised — never restyled per-page). Every async region: loading skeleton mirroring the real shape, error contained at component level, empty state with a next action. Every form field: error/success halos, validation timing consistent (onBlur default).
5. **Details that read as competence.**
   - `Tooltip asChild` on inline triggers; `focusableTrigger` on icon-only ones.
   - Icons via `Icon`, one variant family per context, optically aligned to text.
   - Table columns aligned by type (numbers right via column `meta`), currency through `formatCurrency`, sentence case consistent.
   - Truncation with title/tooltip for long supplier/entity names; no layout shift when data arrives (skeleton dimensions match).
   - Capitalisation and punctuation consistent (labels bare, sentences pointed).
6. **Consequence squint.** Step back: is the most important thing on the surface the most prominent? Did polish accidentally equalize hierarchy? Routine chrome must recede.

## Bounded verification

One batched inspection round (render the changed surfaces at the relevant container width; keyboard-walk the interactive path; screenshot or vitest-assert the classes when auth blocks the page). Fix everything it shows in one batch. At most one confirming round. Then stop — open-ended self-QA is worse than the finish it delays.

**Never:** polish incomplete work, introduce behavior changes, restyle system-owned states, or fix a systemic issue locally (if the spacing is off everywhere, that's `normalize` on the pattern, not a patch here).

Report: what changed by category, what was verified and how, anything deliberately left (with why).
