# /fs-design clarify — UX copy in the advisor's voice

Copy is where **Translate, Don't Simplify** lives or dies. Fair Supply's words must let Pete act without ESG literacy, Petra decide in risk language, and Esther keep full technical accuracy one step deeper. The voice: evidenced, composed, guiding — expert not academic, serious not intimidating, authoritative not absolute.

## The translation discipline

1. **Lead in the reader's domain.** Surface copy speaks procurement and risk: "3 suppliers need action" beats "3 entities flagged under MSA §54 criteria". The framework name belongs one step deeper (tooltip, expandable, methodology link) — present, not gone. Translating ≠ deleting the ESG concept; it means carrying its consequence into the reader's language while the precise term stays reachable.
2. **Define in context, once per surface.** First encounter of a specialist term gets an in-place definition (`Tooltip variant="help"` on the `DataLabel`/`MetricText` title). Never assume recall — Petra was last here weeks ago.
3. **Respect the terminology catalogs.** Customer-facing nouns adapt per deployment ("investment/company" vs "spend/supplier") through the centralized i18n catalogs — never hardcode one dialect into a shared component. Status words come from `STATUS_LABELS`/`ENGAGEMENT_STATUS_LABELS`; don't mint synonyms ("Finished" for "Completed").
4. **Distinguish fact from interpretation.** Data reads as data ("Exposure: High"); interpretation announces itself ("Fair Supply assesses this as…"); assumptions are named ("based on industry-average inputs"). Uncertainty is stated calmly and precisely — "insufficient data to assess" is a legitimate, defensible sentence; a hedge-free guess is not.

## Mechanical rules

- **Controls name their outcome:** "Request mitigation", "Export report" — never "Submit", "OK", "Yes". Destructive confirms name the object ("Remove supplier from segment").
- **Errors: problem → consequence → recovery**, calmly. "The file exceeds 10 MB. Compress it or upload a smaller export." No blame, no jargon codes on the surface (codes may sit in a detail line for support).
- **Empty states teach** (see onboard.md): what would be here, why it isn't, the action that fills it.
- **Statuses self-explain**: a status a new reader can't decode from the word plus its tag colour needs its help tooltip.
- **Casing:** sentence case throughout via `toSentenceCase` (imported from `@repo/core/domain/utils/string-utils`); labels bare of punctuation; sentences pointed.
- **Numbers:** currency through `formatCurrency` (symbol only — no appended codes); dates/percentages through the formatters; abbreviations (`formatCurrencyAbbreviated`) where space is fixed.
- **No alarmism:** severity comes from the data's band, not adjectives. Delete "critical!", "⚠️", "urgent" unless the domain scale itself says High — then the copy states the consequence plainly.
- **i18n:** every string through the message layer, no concatenated fragments, interpolation via named variables.

## Method

Inventory the surface's strings (headings, labels, buttons, statuses, errors, empties, tooltips) → run each through: *Which persona reads this? Can Pete act on it? Is anything simplified into inaccuracy? Where is the deeper term reachable?* → rewrite in place, keeping i18n keys stable where possible → flag catalog-level renames (they're product decisions, not copyedits).

Verify: persona re-read (Pete acts, Petra decides, Esther drills), terminology consistent with the catalogs, luz-lint clean (it catches currency suffixes). Report: rewrites with before/after, definitions added, catalog questions raised.
