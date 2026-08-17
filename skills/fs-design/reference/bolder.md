# /fs-design bolder — sharpen consequence

In generic systems "bolder" means louder: more colour, bigger shadows, decoration. In Luz, boldness is **hierarchy with the courage of its convictions** — the important thing unmistakably large, black, and alone; everything else visibly subordinate. A timid FS surface isn't under-decorated, it's under-decided: it ranks nothing.

## Diagnose the timidity

- Everything the same size: metrics in `data-sm` rows when one number is the story.
- Hedged hierarchy: three "equally important" cards because nobody chose; headings one size apart instead of two.
- Meaning diluted: the risk verdict buried in a table while chrome (filters, toolbars) dominates the viewport.
- Space fear: content packed to fill, no whitespace doing structural work.

## Amplify — with Luz's own instruments

1. **Scale, not colour.** Promote the consequential number to `data-xl` (35px, weight 200) in a `DataBlock`/`MetricText` hero; drop supporting figures a full rank (`data-sm`), not half a step. The Lausanne ultra-light at large sizes is the system's voice raised.
2. **Black is the emphasis colour.** The verdict gets `text-black`; context recedes to `text-medium`/`text-light`. A black primary `Button` (or the `action` capsule for the one true CTA) is the loudest element the system owns — one per surface.
3. **Whitespace as rank.** Give the hero step 8–9 separation (70/100px) from everything else; tighten subordinate groups to steps 1–2. Contrast of density *is* the drama.
4. **Consequential colour at full strength.** Where a domain scale applies, let it speak plainly: a High exposure wears `product-red-700` at `ExposureTag` size `large`, not a polite footnote. That's not decoration — the colour *is* the information. Never extend colour beyond what the scales license.
5. **One decisive statement per surface.** Pick the single insight (the number, the band, the delta) the primary persona came for; compose the viewport so it lands first, and let the next action sit directly beneath it.

## Refuse (still)

Gradients, glows, decorative purple, invented hues, bolded Inter metrics, stock shadows, animation as attention-grabbing. If the surface still feels flat after ranking honestly, the problem is content (no insight worth leading with) — say so rather than decorating around it.

Verify with the squint: from arm's length, exactly one thing leads, the next action is obvious, and nothing routine competes. luz-lint clean. Report: what was promoted/demoted and why that ranking is the true one.
