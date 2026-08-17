# /fs-design overdrive — flagship craft for hero surfaces

For the surfaces that sell the platform's competence: the dashboard a prospect sees in a demo, the supply-chain map, the engagement insights view, the flagship report. Overdrive pushes execution past "correct" to "impressive" — **entirely inside the token vocabulary**. Ambition here means data made vivid and interaction made seamless, never effects.

Confirm the surface deserves it first: overdrive spends real effort and perf budget. One hero per product area.

## Where the ceiling is

The system's own exemplars set the bar: `WorldMapInteractive` (a choropleth users explore), `BubbleChart`/`EngagementInsightsChart` (dense relationships readable at a glance), `BrandedInsight` (a themed editorial moment inside a data product), `Odometer` (numbers that live). Overdrive work should feel like a sibling of these.

## The moves

1. **Data density with progressive reveal.** A flagship view holds more information than a standard one *because* its disclosure is better: overview → hover detail (ChartTooltip) → drill-in (in place — Work Happens in Place holds even here). Every added layer keeps Pete's 5-second read intact.
2. **Orchestrated, single-narrative motion.** One composed sequence where data assembles meaning (bars easing to proportion, the map settling into its bands, an Odometer roll) — triggered by data arrival, run once, 400–700ms total, transform/opacity only, reduced-motion fallback. Not an entrance zoo: a single authored moment.
3. **Typography at full rank.** The `data-xl` hero earning its 35px; Lausanne's 200-weight at scale is the system's signature — compose the viewport so one number, one verdict, and one action form the spine.
4. **Interaction fidelity.** Sub-100ms hover response on charts; crosshairs/selection states; keyboard paths through data (arrow keys across segments); tooltips positioned to never occlude what they describe. The wow is in *nothing lagging, ever*.
5. **Bespoke-within-vocabulary.** A flagship chart may need custom SVG work — its colours still come from the chart palettes/domain scales, type from the roles, spacing from the scale. If it needs a value the system lacks, that's a token proposal in the PR, not a literal.

## The budget

60fps under real data volume (test with the largest customer-scale dataset, not the demo fixture); no main-thread stalls > 50ms; skeleton-first load; bundle impact measured (dynamic-import heavy viz). If an effect can't hold the budget, it doesn't ship — perceived performance is a product principle, and jank on a hero surface is anti-marketing.

Verify: batched inspection at real data scale (interaction latency, fps, keyboard path, reduced motion), luz-lint clean, one confirming round. Report: the narrative the surface now tells, each move made, measured perf.
