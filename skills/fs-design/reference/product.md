# Fair Supply — product context (PRODUCT.md snapshot)

Fair Supply is a supplier risk and ESG compliance platform: companies onboard, screen, monitor, and report on the risk profiles of their suppliers, and suppliers participate to complete documentation and action mitigation requests. The platform's job is to track risk and compliance status, automate monitoring at scale, surface issues, and generate documentation that proves regulatory compliance.

Key workflows: supplier onboarding & screening · risk management across the supplier base · compliance & regulatory reporting · supplier-side participation.

## The three personas

| Persona | Role | Usage | ESG knowledge |
|---|---|---|---|
| **Procurement Pete** | Executes day-to-day procurement and supplier-risk activities | High / daily | Low–moderate |
| **Procurement Petra** | Oversees procurement, risk, processes, escalations, performance | Periodic | Low–moderate |
| **Sustainability Esther** | Defines/validates ESG requirements, methodology, reporting | Periodic / specialist | Very high / expert |

**The spectrum tension:** the most frequent users have the least ESG expertise, while some of the most important decision-makers and evaluators use the product rarely but understand the subject deeply.

**The governing principle: design each experience for its primary user, but make it understandable to every user.**

Four implications, always in force:

1. **Immediate comprehension** — a less ESG-literate or infrequent user must quickly grasp what they're looking at, why it matters, and what to do. Petra's questions are "What is the risk?", "Is action required?", "Has it been completed?"
2. **Progressive depth** — start with meaning and outcome; let Esther drill into methodology, evidence, calculations, uncertainty, and provenance one step deeper.
3. **Recognition over recall** — Petra and Esther return infrequently; navigation, terminology, statuses, and actions must explain themselves.
4. **Expert credibility without expert-only UX** — never simplify ESG concepts into inaccuracy. Esther needs enough depth to interrogate and trust the methodology.

## Surface modes

Every fs-design command asks first: which mode is this surface in? The mode names whose success matters most here.

- **Operate** (primary: Pete) — daily task execution: onboarding flows, engagement forms, tables, actions. Scanability, in-place work, and clear next steps outrank everything.
- **Oversee** (primary: Petra) — dashboards, portfolio monitoring, approvals, status. Consequence hierarchy: what's at risk, what needs action, what's done. Translate ESG into risk/action/outcome language.
- **Interrogate** (primary: Esther) — methodology, evidence, audit trails, calculations. Depth, provenance, and precision; density is acceptable, obscurity is not.
- **Report** (audience: regulators, boards, external stakeholders) — PDF reports, exports, regulatory documents. Print-grade typography, defensibility, `ReportModeContext` surfaces.

A surface has one primary mode but must stay consumable across the spectrum: an Oversee dashboard still needs Esther's drill-down; an Interrogate view still needs Pete's plain-language framing.

## Brand personality

- **Evidenced, composed, guiding.** Expert, not academic. Serious, not intimidating. Authoritative, not absolute.
- The platform behaves like an **informed advisor**: it has already done the analysis, explains what matters, and makes the basis for its conclusions easy to inspect.
- Lead with meaning and consequence; keep methodology, evidence, and detail one step deeper.
- Precise, plain language over ESG jargon; where a specialist term is necessary, explain it in context.
- Confidence comes from evidence: clearly distinguish data, analysis, assumptions, and Fair Supply's interpretation. Never present every conclusion as fact.
- Visual hierarchy reflects consequence: important risks, actions, and insights feel more prominent than routine system information.
- **No alarmism, inflated claims, or false certainty.** Uncertainty and limitations are communicated clearly and calmly.
- **Emotional goal: defensibility.** Pete knows what to do, Petra understands what matters, Esther can interrogate why. Every user leaves feeling informed, in control, and able to justify the decision.

## The five design principles

1. **Work Happens in Place (Contextual Continuity)** — interactions are non-destructive and context-preserving. Use non-modal overlays, sliding sidebars, and persistent scorecards; users drill into detail without losing sight of the parent container or portfolio view.
2. **Meaning First, Methodology Second (Progressive Depth)** — outcomes and consequences are the default state; the "how" (data sources, uncertainty, methodology) is hidden but accessible via progressive disclosure.
3. **Translate, Don't Simplify (Language Adaptability)** — translate ESG concepts into the user's domain language (procurement, risk) without stripping accuracy. Centralized terminology catalogs adapt labels per customer (e.g. "investment/company" vs "spend/supplier"). In-context definitions over assumed knowledge.
4. **Data as Credibility (Visual Hierarchy of Consequence)** — the MetricText anatomy (label, hero figure, caption) everywhere; distinguish verified data from interpretation and assumption; communicate uncertainty calmly, never through alarmism.
5. **Engineered Responsiveness (Perceived Performance)** — loading states mirror real content (Skeleton, never generic spinners); synchronous root layouts; component-level failure containment keeps a usable shell; the user always feels in control.
