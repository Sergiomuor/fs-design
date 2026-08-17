# No-argument routing: the context-aware menu

Read this when the user invokes `/fs-design` with no argument. They are asking "what should I do?" — recommend, don't auto-run.

Setup has already run `context.mjs`. Reason over its output:

- Not in the platform repo (no `packages/luz/src/styles.css` found) and no `DESIGN.md` at root → lead with `init` (install the FS context files into this project), then the menu.
- `DRIFT` lines in the context output → lead with `doctor` (report what moved), and mention `document` if DESIGN.md itself is stale.
- Uncommitted UI changes in git (`.tsx`/`.css` files) → run `node <plugin>/skills/fs-design/scripts/luz-lint.mjs --diff --json` once and fold the result in: many findings → recommend `normalize` (bring the changed files back onto the system) or `audit` scoped to those files, naming them. A clean lint with visual work in flight → `critique` or `polish` on that surface.
- Files under `packages/luz/src/` touched → `polish` (component completeness: variants, states, stories) or `extract` if app-side patterns are being promoted.
- Storybook or the web app dev server running → `live` is available for in-browser iteration; don't lead with it otherwise.
- Nothing in flight → offer by intent: **plan something new** (`shape`), **evaluate what exists** (`critique`, `audit`), **improve what exists** (`polish`, `normalize`, `distill`, `clarify`).

Lead with the 2–3 highest-value picks, each with a one-line reason and the exact command to type (e.g. `/fs-design critique apps/web/src/app/(dashboard)`), then show the full Commands table from SKILL.md grouped by category. Never auto-run a command; the recommendation is a suggestion the user confirms.
