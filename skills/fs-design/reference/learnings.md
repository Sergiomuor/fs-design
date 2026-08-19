# Learnings — user-confirmed feedback rules

Rules recorded by the feedback loop ([feedback.md](feedback.md)). Loaded at setup on every run; **when a rule here conflicts with a playbook default, the rule wins** (and the personal overlay `~/.claude/fs-design.learnings.md`, same format, wins over this file).

Entry format — the header line is parsed by `context.mjs`, keep it exact:

```
## L<seq> · <scope> · added <YYYY-MM-DD> · <status>
<rule text — imperative, testable, no session specifics>
— origin: <what feedback produced this, one line>
```

- **scope**: `global` · `command:<name>` · `component:<LuzName>` · `surface:<area>` · `copy` · `lint`
- **status**: `active` · `retired <date> — <reason>` · `promoted → <file>` — active rules end the header line with the word `active`. Retire, never delete; ids stay stable.

---

## L001 · global · added 2026-08-18 · active
Before the first edit of any run, state in one short block: the playbook being followed and its remaining steps, the surface mode chosen, and the exact files in scope. If a playbook step is skipped or reordered, say which and why at the moment it happens — silent skipping is the failure, not the deviation itself.
— origin: first-run retrospective — playbook process was not visibly followed.

## L002 · global · added 2026-08-18 · active
Every visual value written into code (colour, spacing, type, radius, shadow) must have a citable source: Figma, DESIGN.md/luz-core, or a named incumbent sibling surface. No source → it is a spec gap: stop and ask before writing the value. Cite the source for load-bearing choices in the report.
— origin: first-run retrospective — output visuals were off-spec; values were chosen from intuition instead of read from truth.

## L003 · component:DataLabel · added 2026-08-18 · active
Labels inside data-boxes (DataLabel headings, DataBlock KPI labels) always render Inter 400, 10px/14px, 0.7px letter-spacing, uppercase, in `text-text-medium` #585b5d. Never weight 500 (too bold at 10px — ruled against a live render), never untracked `text-data-label`, and never the hardcoded `color="dark"`. Do not restyle the `text-label-xs` utility to achieve this — it has weight-500 consumers; the recipe lives in DataLabel's heading slot.
— origin: /admin/accounts shape run — user ruled the data-box label recipe against the live render (500 read too bold) and set the colour to text-medium.

## L004 · surface:tables · added 2026-08-18 · active
Entity names (accounts, companies, organisations) in platform tables always render `text-body-md` in `text-text-black` #000000 — never bold/medium weight. Underline only when the name itself is a link; a clickable row does not underline the name.
— origin: /admin/accounts shape run — user ruled table entity names against the mockup; the font-medium incumbent pattern is overruled.

## L005 · component:DataBlock · added 2026-08-18 · active
Numbers in data-boxes (DataBlock/KPI values) render `DataText size="xl"` (`text-data-xl`) in `text-text-black`. When the box's sizing cannot show the full number, step down to `text-data-md` or `text-data-sm` as the format or context allows — never bold Inter.
— origin: /admin/accounts shape run — user set the data-box number role (restated twice; the ladder deliberately skips text-data-lg).

## L006 · command:shape · added 2026-08-19 · active
A platform-page design artifact renders through the platform's real components — the real nav (MainHeader), toolbars, DataBlock/data-boxes, tokens, and charts — as a dev-only preview route with mock data (the `/engage/preview` pattern: NODE_ENV development / VERCEL_ENV preview, 404 in production), interactive toggles and charts included. Static HTML approximations of platform chrome are not acceptable presentation artifacts.
— origin: engage Pipeline run — hand-rolled static chrome read as fake next to the real product.

## L007 · surface:engage · added 2026-08-19 · active
The primary button is reserved for the ready-to-review action (Review); every other engagement action renders the luz secondary or tertiary button.
— origin: engage Pipeline run — user buttons ruling.

## L008 · global · added 2026-08-19 · active
Every rendered design artifact shows the full page context — navigation bar, toolbar, real container width — never an isolated fragment at an assumed width.
— origin: engage Pipeline run — a 1440 frame deformed the KPI band; the real engage page runs at LayoutContainer maxWidth="large" (1900).

## L009 · surface:toolbars · added 2026-08-19 · active
The control row above a table/board fits one row; on overflow hide the least-relevant controls first (person filter → framework → domain filters); search and the display toggle never hide.
— origin: engage Pipeline run — user control-row ruling.

## L010 · global · added 2026-08-19 · active
One toggle vocabulary per page: every view/display switch reuses the toggle component already on the page (SectionToggleTab), never a second variant.
— origin: engage Pipeline run — ViewToggle beside SectionToggleTab ruled inconsistent.

## L011 · component:DataBlock · added 2026-08-19 · active
KPI numbers keep their `text-data-xl` 40px line box; data boxes cap their height rather than stretching. (Complements L005, which sets the number's type role.)
— origin: engage Pipeline run — uncapped data boxes read as deformed.

## L012 · command:shape · added 2026-08-19 · active
Charts and tabs in presentation artifacts must be the real interactive components, not static redraws.
— origin: engage Pipeline run — static CategoryBar/toggle redraws made the presentation harder to evaluate.
