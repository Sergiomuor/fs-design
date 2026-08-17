# /fs-design delight — calm-confidence details

Delight at Fair Supply is not whimsy — the emotional goal is **defensibility**: informed, in control, able to justify the decision. What delights this product's users is the feeling of an interface that has already done the work. Add the touches that produce *"this thing is competent"*, never *"this thing is cute"*.

## The instruments

1. **Numbers that acknowledge change.** `Odometer` on KPIs that update in place — the metric visibly settles into its new value instead of teleporting. Quiet proof the system is live.
2. **The one earned flourish.** The `action` button's arrow-slide on `ease-button-action` is the system's single playful gesture — reserve it for the surface's true CTA so it stays special.
3. **Loading that respects attention.** Skeletons shaped exactly like the content they become (shimmer, correct dimensions, no shift on arrival). The absence of jank *is* the delight.
4. **Hover that rewards curiosity.** Chart segments answering with `ChartTooltip` detail; table rows lifting subtly; `DataLabel` tooltips offering the definition exactly when wondered about (asChild, focusable). Depth appears on request — the informed-advisor gesture.
5. **Micro-acknowledgements.** A save that confirms with a calm success halo (`input-success-*`/Alert success) then recedes; a filter that shows its effect immediately; focus states so crisp (the purple halo) that keyboard users feel seen.
6. **Copy with quiet authority.** Empty states that teach; errors that name the fix; a well-placed `body-aside` line that anticipates the next question. Personality lives in precision, not exclamation marks.
7. **Craft users feel but don't see:** optical alignment of icons to text, table numerals right-aligned and lining up, tooltips arriving from the right side, dialogs restoring focus on close.

## Refuse

Confetti, mascots, emoji-as-UI, celebratory animations, easter eggs, gamification, seasonal skins, playful microcopy on serious surfaces ("Yay! Risk assessed!"). This is a compliance platform: a user mid-audit must never feel the product is performing for them. If a delight idea wouldn't feel right in front of a regulator, it isn't right.

## Method

Walk the surface's main task start-to-finish and note every moment that feels inert, abrupt, or mute (a number that jumps, a save with no acknowledgement, a hover with no answer). Add the smallest instrument that makes that moment feel attended-to. Two or three touches per surface, done perfectly, beat ten scattered ones.

Verify: each touch demonstrably answers a moment (name it); reduced-motion paths exist; nothing added noise to the consequence hierarchy; luz-lint clean. Report: moment → touch → the confidence it produces.
