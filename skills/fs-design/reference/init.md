# /fs-design init — install FS context into a project

Puts the two context files every fs-design command reads — `PRODUCT.md` (personas, principles, brand) and `DESIGN.md` (the FS-Luz spec) — at the project root. Unlike generic init flows, there is no discovery interview: Fair Supply's context is already codified in this plugin's snapshots. Init is installation plus local tailoring.

## Method

1. **Check what exists.** Root `PRODUCT.md` / `DESIGN.md` present → report and stop (offer `document` for a freshness check instead). Never overwrite an existing file without showing the diff and getting a yes.
2. **Classify the project.**
   - **The platform repo** (has `packages/luz/src/styles.css`): copy the DESIGN snapshot to root `DESIGN.md`, then immediately run the `document` diff against live styles.css so it lands current, not stale. Write `PRODUCT.md` from `reference/product.md`.
   - **A satellite** (prototype, showcase, marketing experiment): copy both snapshots and prepend a note to DESIGN.md: ground truth lives in the platform repo (`packages/luz/src/styles.css` on main); this copy is a reference for building Luz-faithful UI outside the platform. Ask one question: does this project follow Luz strictly (product surface) or loosely (brand-adjacent, e.g. marketing)? Loose followers get the note extended: tokens are the palette, but layout/type scale may flex — say which rules bind.
3. **Offer the enforcement layer.** Ask whether to enable the luz-lint hook here (`node <plugin-root>/skills/fs-design/scripts/hook-admin.mjs on`) — recommended for product surfaces, optional for satellites. Mention `lint --diff` as the manual alternative.
4. **Confirm the wiring.** Rerun nothing; state what was installed, where, and that every fs-design command will now read the project copies instead of the plugin snapshots. Recommend the natural next command (`shape` for new work, `audit`/`critique` for existing surfaces).

Init never modifies application code, `.claude/settings.json`, or anything beyond the two root files and (if accepted) the local hook toggle.
