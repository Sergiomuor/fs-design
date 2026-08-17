# /fs-design distill — strip to meaning

For surfaces that answer slowly because they say too much at once. Distill removes and demotes; it never hides anything Esther needs — it moves the how one step deeper and leaves the what.

## The test

For every element ask: **which persona question does this answer, right now?** (Pete: what do I do? Petra: what's the risk / is action required / is it done? Esther: how was this derived?) Elements answering no current question are cut; elements answering Esther's questions move behind progressive disclosure; elements answering the primary persona's questions stay and gain the room the cuts free up.

## Where FS surfaces bloat

- **Label redundancy:** a `data-label`, a heading, and a tooltip all naming the same thing; units repeated per row when a column header carries them; currency codes appended after symbols.
- **Methodology on the surface:** calculation notes, source caveats, and framework references inline where a `Tooltip variant="help"` or an `ExpandableSection` one step deeper serves Esther without taxing Pete.
- **Chart junk:** legends restating the only series; gridlines competing with data; axis labels a `DataLabel` under the metric already covers; a donut where a single `MetricText` says it plainly.
- **Status noise:** system-routine information (sync times, record counts, internal ids) at the same visual rank as risk. Demote to `text-light`/`data-label` or move to a detail view. Mono (`data-*-alt`) is for real ids, not decoration.
- **Container nesting:** cards inside cards, a Region wrapping a single Card. One container owns each boundary.
- **Duplicate pathways:** two controls reaching the same action on one surface; keep the one in the workflow's path.

## Method

1. Inventory every element with its persona-question answer (or lack of one).
2. Propose the cut list + demote list + keep list. Cuts that remove *information* (not just presentation) are decisions — confirm with the user before deleting content; presentation-only cuts proceed.
3. Rebuild the default state around the primary question; wire the demoted depth (expandables, tooltips, drill-ins — Work Happens in Place: no navigation away for a detail).
4. Let the freed space work: whitespace is structure. Don't refill it.

Verify with the squint test (one prominent thing, obvious next step) and one Esther pass (every removed how is still reachable in ≤ 1 step). Report: cut/demoted/kept, and the questions each surface state now answers.
