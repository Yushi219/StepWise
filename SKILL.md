---
name: stepwise-design
description: Use this skill to generate well-branded interfaces and assets for StepWise for Revit (a proposed Autodesk Revit stair-system feature concept, formerly "StairSense"), either for production or throwaway prototypes/mocks/decks. Contains essential design guidelines, colors, type, fonts, an icon set, reusable UI components, and a full case-study UI kit for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Where things live
- `readme.md` — full design guide: product context, voice & tone, visual foundations, iconography, manifest. **Read this first.**
- `styles.css` — link this one file to inherit all tokens (`@import`s everything in `tokens/`).
- `tokens/` — color, type, spacing/radius/shadow/motion custom properties.
- `lib/` — React primitives: `StairStack.jsx` (the signature building-section diagram + `makeTower`), `ui.jsx` (Eyebrow, SectionHead, AppWindow, Btn, ParamRow, Icon), `hooks.jsx` (scroll/reveal).
- `sections/` + `app.jsx` — the full scroll-driven case-study site (`StepWise.html`, the StepWise deliverable), one component per section.
- `guidelines/` — specimen cards for the Design System tab.
- `image-slot.js` — drag-and-drop image placeholder component.

## Brand in one breath
A professional BIM tool elevated to a flagship product launch. Dark "modeling canvas" + light "operational panels"; functional color = meaning (blue typical · amber exception · red warning · green ok); Space Grotesk / Hanken Grotesk / JetBrains Mono; calm precise motion (no bounce); architectural photography; custom 1.7px-stroke line icons; sentence-case copy with tracked-mono eyebrows. **Predictability is the brand.** No emoji, no purple gradients.

## Reuse notes
- Components are loaded as multiple `<script type="text/babel">` files; each exports to `window` (e.g. `Object.assign(window, { Btn })`). Reference shared components via `window.X`, not bare identifiers across files.
- Fonts come from Google Fonts via `<link>`; include the same `<link>` in any new HTML.
- The `<StairStack>` diagram (status-colored building section) is the brand's hero motif — reuse it for any stair/level/system visualization.
