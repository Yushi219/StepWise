# StepWise for Revit — Design System

> A design language and case-study toolkit for **StepWise** (formerly "StairSense"), a proposed Autodesk Revit feature that lets architects design stairs as **one system across every floor** — instead of editing them floor-by-floor through a maze of types and sub-types. Tagline: *Edit globally. Vary locally. Preview impact.* · Thesis: *Manage stair intent, not stair accidents.*

This project was built to support an **Autodesk Principal Experience Designer** interview case study. The deliverable is a flagship, scroll-driven product-launch-style webpage (`StepWise.html`) presenting the concept in **bilingual EN / 中文** (top-right toggle), plus the reusable design foundations (tokens, components, specimen cards) behind it.

---

## 1. Product & problem context

**Revit** is Autodesk's Building Information Modeling (BIM) tool for architects and engineers. Stair design in Revit is widely considered one of its most frustrating workflows: stairs are built from **types and sub-types** (Run, Landing, Stringer, Carriage, Cut Mark…), small edits force new types, and a single change can silently propagate across every instance — so users defensively duplicate stair types and the model fills with bespoke, unmanageable stairs.

**StepWise** reframes the problem: *users think in stair systems and building stair networks; Revit exposes types and sub-types.* Its five principles:

1. **Make hierarchy visible** — show how Stair / Run / Landing / Railing / Cut Mark relate.
2. **Make scope explicit** — before an edit, show exactly which stairs it affects.
3. **Manage exceptions without duplication** — a floor can differ without cloning a type.
4. **Coordinate connected components** — stair, landing, railing and baluster are one assembly.
5. **Preview impact before apply** — show the geometry, types, levels and warnings that will change.

Core capabilities: System Stack View · Scope Control · Exception Manager · Impact Preview · Building Stair Network Awareness, plus supporting layers — Visual Parameter Explainer, Connected Component Map, Smart Reconcile (floor-height change), and a read-only AI explanation layer. Research is framed as **triangulation** across the case prompt, directional expert input, recent public Autodesk-forum/Ideas feedback (2025), and a plugin-market scan (see the Sources section).

### Sources used as input
- **Case study brief** — `background/case-study.pdf` (the interview prompt: persona "Anna", customer quotes, known UI issues). The original `uploads/` PDF is the same document.
- **Job description** — Autodesk *Principal Experience Designer* (ACRD, Shanghai), pasted into the brief.
- **Concept outline** — the candidate's own detailed feature plan (provided in chat), which this site realizes.
- **GitHub** — `https://github.com/Yushi219/StairSense` (the repo was empty at build time) and the author's portfolio repo `https://github.com/Yushi219/studio`. Explore these for more of the author's work; nothing from them was pre-loaded.

> StepWise is an **original concept and design language** — it deliberately does *not* copy Autodesk's proprietary Revit UI or brand. This both respects IP and better demonstrates design vision.

---

## 2. Content fundamentals (voice & tone)

- **Voice:** confident, precise, calm. The brand promise is *predictability* — copy never overpromises or hypes.
- **Person:** speaks about the user ("designers", "Anna", "users"), occasionally second person in product UI ("Apply this change to…"). First person only in persona quotes.
- **Casing:** Sentence case for headlines and UI. ALL-CAPS reserved for tracked mono eyebrows/labels (e.g. `AUTODESK REVIT`, `SYSTEM STACK`). Product name is `StepWise` (one word, capital S + W); lockup `StepWise for Revit`.
- **Three-beat tagline rhythm:** `Edit globally. Vary locally. Preview impact.` / `Hierarchy visible. Scope explicit. Exceptions managed. Impact predictable.`
- **Numbers & data:** concrete and quantified — "24 typical levels", "+600 mm", "exceeds maximum by 8 mm". Mono font, tabular feel.
- **No emoji. No exclamatory marketing.** Em dashes for reframes. Verbatim customer quotes in curly quotes.
- **Example headlines:** "Users think in stair systems. Revit exposes types and sub-types." · "When the floor height changes, reconcile — don't rebuild." · "Revit users can handle complexity. They just need to see it clearly."

---

## 3. Visual foundations

**Concept:** a *professional BIM tool, elevated to a flagship product launch* (Apple / Nvidia / Autodesk register) — architectural photography, generous whitespace, restrained motion, and a recurring **building-section / stair-stack** diagram as the signature motif.

- **Two worlds:** a dark **"modeling canvas"** (`--ink-*`, near-black blue) and light **"operational panels"** (`--paper-*`). The narrative moves from dark problem-space to light, clear solution panels. Light tool windows float above the dark canvas on soft shadows.
- **Functional color = meaning, not decoration:** Typical/baseline = **blue** (`--typical-500 #3D7DFF`), Exception = **amber** (`#F5841F`), Warning = **red** (`#F24438`), OK/in-sync = **green** (`#1EAE6E`), unintended external dependency = **pink dashed** (`#F76FB0`), proposed/ghost geometry = translucent blue. These same semantics drive every diagram, tag and status dot.
- **Type:** Display **Space Grotesk** (geometric, technical) · Body/UI **Hanken Grotesk** (clean grotesque) · Data/labels **JetBrains Mono** (engineering voice). Big, tight display (`letter-spacing −0.03em`); mono eyebrows tracked to `0.18em`.
- **Backgrounds:** full-bleed architectural imagery (stairwells) with cinematic dark gradient overlays for the hero, an interstitial, and the closing; a faint masked grid + radial vignette on dark sections. No purple gradients, no decorative noise.
- **Imagery vibe:** architectural, sculptural, strong light/shadow; the user supplies real photos/video via drag-and-drop `<image-slot>` placeholders.
- **Motion:** calm and precise — *predictability is the brand*. Reveal-on-scroll fades (translateY 22px, 600ms `cubic-bezier(0.22,1,0.36,1)`), scroll-linked parallax/scale on hero imagery, the stair-stack *draws in* level by level, diagram lines stroke in. **No bounce, no infinite loops.** All animations degrade to visible end-states under `prefers-reduced-motion`.
- **Hover/press:** subtle background lift (`rgba(255,255,255,0.03–0.06)`) on dark, tint on light; press = 1px nudge down, never scale-bounce. Active selections get a filled accent icon + raised surface + 1px border.
- **Borders & hairlines:** 1px, low-opacity (`rgba(255,255,255,0.10)` on dark; `#E2E6EC` on light). Corner radii are restrained — `--r-sm 5 / --r-md 8 / --r-lg 12`; full pills only for tags/labels.
- **Shadows:** four-step elevation; light panels use soft, large-radius shadows to read as floating UI; dark sections rely on borders not shadow.
- **Layout:** `max-width 1240px`, fluid gutter `clamp(20–80px)`, section rhythm `clamp(80–160px)`. Fixed top bar + a right-edge section progress rail + a top scroll-progress bar.

See the **Design System tab** for live specimen cards of all of the above.

---

## 4. Iconography

- **Custom inline SVG icon set** (`Icon` in `lib/ui.jsx`): geometric line icons at **1.7px stroke**, round caps/joins, 24px grid — matching the technical-but-warm tool aesthetic. Names: `tree, target, branch, eye, lock, warn, check, layers, arrowR, sliders, sparkle, grid, plus, clock, copy`.
- The **stair glyph** wordmark (ascending line) is the only brand mark, drawn in `--accent`.
- **No emoji, no icon-font dependency, no third-party CDN icon set** — keeps the system self-contained and on-brand. If you need a broader set, match the 1.7px-stroke / rounded style (Lucide is the closest CDN equivalent) and flag the substitution.
- Status is communicated by **colored dots** (`.dot--typical/exception/warn/ok`) and tags, not iconography.

---

## 5. Repository index / manifest

**Root**
- `StepWise.html` — the deliverable: the full scroll-driven case-study site.
- `styles.css` — design-system entry point (imports only; consumers link this).
- `site.css` — page-specific chrome for the case-study site (not part of shipped tokens).
- `image-slot.js` — drag-and-drop image placeholder web component (user fills hero / interstitial / closing imagery).
- `SKILL.md` — Agent-Skill manifest for reuse in Claude Code.

**`tokens/`** — `colors.css`, `typography.css`, `layout.css` (spacing/radius/shadow/motion), `base.css` (reset + shared primitives). All `@import`ed by `styles.css`.

**`lib/`** — `hooks.jsx` (scroll/reveal/in-view/count-up), `StairStack.jsx` (the reusable building-section diagram + `makeTower`), `ui.jsx` (Eyebrow, SectionHead, AppWindow, Btn, ParamRow, Icon).

**`sections/`** — one file per narrative section: `Hero, ProblemReframe, Research, Scenario, Principles, ConceptOverview, Features, FloorHeightFlow, AIAssistant, Delivery, Closing`; plus `features/FeaturePanels.jsx` (the six interactive module demos). `app.jsx` composes them with the top bar + progress rail.

**`guidelines/`** — Design System tab specimen cards (Colors, Type, Spacing, Components).

**`background/`** — the case-study PDF.

---

## 6. Caveats
- **Fonts** are loaded from Google Fonts (Space Grotesk, Hanken Grotesk, JetBrains Mono) via `<link>` for reliability; no self-hosted `@font-face` binaries are shipped. Upload the font files if you need consumers to embed them.
- **Imagery is intentionally empty** — the hero, interstitial and closing use `<image-slot>` placeholders. Drag in real architectural photography/video; drops persist.
- StairSense is a **concept**, not a real Autodesk product; all screens are high-fidelity recreations of the *proposed* design, not Revit's actual UI.
