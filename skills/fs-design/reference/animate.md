# /fs-design animate — purposeful motion in the Luz vocabulary

Motion at Fair Supply is feedback, continuity, and quiet confidence — never spectacle. Each animation must answer: *what does the user understand because this moved?* No answer, no animation.

## The vocabulary (all tokenised)

- `ease-button-action` — `cubic-bezier(0.4, 1.8, 0.6, 1)`, the action-button spring: the arrow slot slide on the capsule CTA. The system's one playful gesture; don't spread it to non-CTA elements.
- `shimmer` (1.5s) — Skeleton's loading sheen; the standard "working" signal.
- `spin` / `spin-slow` — Loader rotation only.
- `pulse` — sparing attention hold (a pending state), never permanent.
- `rotate-to-45` / `rotate-from-45` (0.3s ease-in-out) — icon state flips (e.g. plus→close).
- Odometer — number transitions for changing metrics; the correct move when a KPI updates in place.

## Where motion earns its place

1. **State feedback** — hover/press/focus transitions on controls (150–250ms, ease-out). Luz buttons and inputs already carry these; don't re-animate them per page.
2. **Spatial continuity** (Work Happens in Place) — panels sliding in from their origin edge, expandables unfolding in place, dialog scale-fade. The motion explains *where the detail came from*, preserving the parent context.
3. **Data change** — Odometer for in-place value updates; a bar/segment easing to its new proportion. The motion says "this changed", so it must run only on change, not on mount.
4. **Progress** — shimmer skeletons while loading; determinate `ProgressBar` easing between steps.

Entrance choreography (staggered card fades, per-section reveals) is off-voice for Operate/Oversee surfaces — data products open ready to work. At most, a single considered settle on a hero metric, once.

## Mechanics

- Animate `transform` and `opacity`; never layout properties (width/height/top) on data-heavy surfaces — 60fps or don't.
- Durations: micro-feedback 150–200ms · spatial 200–300ms · data transitions ≤ 400ms. Ease-out for arrivals, ease-in for exits.
- **`AnimatePresence` requires a single motion child** — a fragment or multiple children silently breaks exit animations; key the one child.
- Respect `prefers-reduced-motion`: reduce to opacity or nothing; the shimmer and odometer both need reduced variants.
- Motion tokens over inline curves: if a new curve is genuinely needed, that's a token proposal, not a literal.

## Verify

Interact with every animated element (synthetic events need full pointer sequences — include `pointermove`/`mousemove` for hover-driven UI). Check exit animations actually run, reduced-motion path works, and nothing animates on initial data render. Report: each motion added, the understanding it carries, duration/curve used.
