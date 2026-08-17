# /fs-design quieter — calm an overstated surface

For surfaces that shout: alarm colours on routine facts, competing emphasis, decoration pretending to be information. The FS voice is composed — **no alarmism, inflated claims, or false certainty**. Quieter removes unearned intensity while keeping every earned signal at full strength.

## Diagnose the noise

- **Unearned colour:** red/orange on information that isn't High/Moderate-high exposure or an actual error; branded tints on neutral panels; coloured icons where meaning doesn't vary; purple used decoratively.
- **Rank inflation:** several `data-xl` heroes; multiple primary buttons; headings all `heading-lg`; badges on everything.
- **Decoration:** shadows where a hairline border belongs; backgrounds alternating for texture; borders thicker than 1px as accents; icon noise on labels that read fine alone.
- **Alarmist copy:** exclamation marks, "critical!!"-style urgency, warnings phrased as threats, uncertainty hidden behind fake precision.

## Method

1. **Re-audit every colour against the Consequence rule.** For each coloured element: what does this colour tell the reader? No answer → neutral it (`text-medium`/`text-light`, `surface-border`, `muted`). A correct answer keeps full strength — quieting a genuine High-exposure red is falsifying data, not calming design.
2. **Restore single-rank hierarchy.** One hero, one primary action, headings stepping down honestly (`lg` → `md` → `sm`). Demoted metrics drop to `data-md`/`data-sm`; routine counts to `data-label` + `text-light`.
3. **Swap decoration for structure.** Shadow → 1px `surface-border`; tinted panel → `surface-background`; heavy divider → whitespace (step up the gap instead). Flat, bordered, lit by focus.
4. **Rewrite the alarm.** Warnings state the condition, the consequence, and the action, in that order, calmly ("3 engagements pass their review date this week" — not "⚠️ URGENT: overdue engagements!"). Alert variants match actual severity: `info` for awareness, `warning` only when action prevents a consequence, `error` only for failures.
5. **Let whitespace absorb the energy.** Quieting usually frees visual budget — spend it on separation (steps 5–7 between sections), not on new content.

Verify: squint test shows one calm hierarchy; every remaining colour answers its question; genuine signals (exposure bands, mitigation ratings, real errors) survived untouched; luz-lint clean. Report: what was quieted, what was deliberately kept loud and the consequence that earns it.
