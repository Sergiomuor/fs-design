# /fs-design layout — the 5px scale, owned gaps, region rhythm

Layout problems in FS code are almost always ownership problems (margins fighting gaps), scale problems (off-grid values, the step-ten trap), or rhythm problems (sections breathing unevenly). Fix the system, not the pixel.

## Diagnose

1. **Read computed values, not class names.** Luz overrides the scale: `gap-5` renders 30px (not 20), `gap-4` is the 20px one, `p-7` is 50px. An element that "looks 10px off" usually wears the wrong *step*, not a broken style.
2. **Find the double-owners.** A parent `gap` plus child `mb`; `space-y-*` fighting `Stack`; a component positioning itself with outer margin. One owner per gap: padding on containers, gap between siblings, and the container owns it.
3. **Find the off-scale values.** Anything not on 5/10/15/20/30/40/50/70/100(/120/150/200) or the sanctioned `gap-field` 6px. `p-10`+ and fractionals are broken-scale bugs (lint catches them). An off-scale need means restructure — or a token proposal — never an invented number.

## Compose

- **Steps by distance:** 1–2 (5/10px) inside a component · 3–4 (15/20px) between components · 5–7 (30/50px) between sections · 8–9 (70/100px) between page regions. The dominant content gap is step 2; the dominant container padding is step 7 (every Region/ModuleSection breathes at 50px).
- **Lean on component defaults** — they *are* the spacing contract: Stack `gap={3}`, Card `p={5}`, RegionHeader/RegionContent `p={7}`, SidebarLayout `gap={4}`, DataTable cells `px-4 py-4`. Override via props (`<Card p={7}>`), never wrappers.
- **Structure from size tokens:** header 70px (sticky offsets read `size-header-offset`, 82px — never a raw pixel), sidebar 300px, side panel 280+30px gap, input geometry from `size-input-*`. Width caps from container presets (narrow 755 / admin 1200 / default 1440 / large 1900 / wide 1920 / fluid) — content width is a preset, not page padding.
- **Whitespace is structure.** Separation ranks importance: give the hero region step 8–9 isolation; tighten subordinate clusters. More space above a heading than below it, so headings bind to their content.
- **Grid for grids, Stack for flows.** `Grid` for genuinely two-dimensional layouts, `Stack`/`Flex` otherwise; `space-y-*` only for content you don't control.

## Verify

One render pass measuring the key gaps (inspector or computed styles): every value on-scale, every gap owned once, regions at the 50px rhythm, container preset correct at 1280/1440/1920. luz-lint clean (step-ten, fractional, arbitrary values flagged). Squint: sections read as clear bands with honest separation ranks. Report: ownership fixes, step corrections (wrong-step vs off-scale), any token proposal.
