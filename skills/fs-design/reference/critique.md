# /fs-design critique — UX review scored against the FS principles

Evaluate a surface the way Fair Supply's own principles demand, with evidence for every claim. Critique reports; it does not fix. Offer the matching fix command per finding (`polish`, `clarify`, `distill`, `normalize`…).

## Before scoring

- Render or read the real surface (Storybook story, running app, or the component tree). Screenshot when possible; otherwise reason from the code and say so.
- Identify the surface mode and primary persona (context.mjs target-note, or infer and state it).
- Run `luz-lint` on the surface's files — vocabulary violations feed the Craft dimension.

## The persona walkthrough

Walk the surface three times, in character. Record where each persona stalls:

1. **Pete (daily operator, low ESG literacy):** Within 5 seconds, does he know what this screen is, what changed, and what he must do next? Is every action labelled by its outcome? Does anything require ESG knowledge to parse?
2. **Petra (periodic overseer):** Can she answer "What is the risk? Is action required? Has it been completed?" without opening anything? Do statuses explain themselves (recognition over recall — she was last here three weeks ago)? Is consequence ranked — or is everything the same size?
3. **Esther (ESG expert):** From any number or rating, is there a path one step deeper — methodology, evidence, provenance, uncertainty? Is anything simplified into inaccuracy? Can she tell data from interpretation from assumption?

## Scoring — six dimensions, 1–5 each

Score honestly; 3 is "competent", 5 is "exemplary". Every score cites evidence (element + what you observed).

1. **Consequence hierarchy** (Data as Credibility) — the most important risk/action/insight is the most prominent thing; visual weight tracks meaning, not layout accident. Metrics wear the MetricText anatomy; colour appears only where it answers "what does this tell me?".
2. **Progressive depth** (Meaning First) — default state is outcomes; methodology is one step deeper and actually reachable; nothing expert-only sits on the surface, nothing load-bearing hides two steps down.
3. **Language** (Translate, Don't Simplify) — risk/action/outcome phrasing; specialist terms explained in context (`Tooltip variant="help"`); no alarmism or false certainty; uncertainty stated calmly.
4. **Contextual continuity** (Work Happens in Place) — drill-downs preserve the parent context (overlays, side panels, expandables over navigation); no destructive jumps; scorecards persist.
5. **Perceived performance** (Engineered Responsiveness) — skeletons mirror real content; the shell survives component-level data failure; nothing blocks on slow data it doesn't need.
6. **Luz craft** — token vocabulary clean (lint), 10px grid intact, states complete, correct components used (no hand-rolled primitives), domain scales correct (exposure bands, mitigation triads, tier colours).

## Findings format

For each finding: **severity** (P0 blocks a persona's core question · P1 materially degrades one dimension · P2 quality gap · P3 nit), **where** (file:line or element), **evidence** (what you saw), **why it matters** (which principle/persona), **fix** (concrete, with the luz token/component to use, and which fs-design command owns it).

## Report

```
Surface · mode · primary persona
Scores: consequence X · depth X · language X · continuity X · performance X · craft X → overall (mean, one decimal)
Persona walkthrough: where Pete/Petra/Esther each stalled (or didn't)
Findings: P0s first, each with evidence and its fix command
Top 3 moves: the highest-leverage changes, in order
```

Keep it evidenced, composed, guiding — the same voice the product aims for. No alarmism about the design either: state what is, what it costs, and the way out.
