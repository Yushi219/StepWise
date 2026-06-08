/* @ds-bundle: {"format":3,"namespace":"StairSystemManagerAutodeskCaseStudy_cf6ec4","components":[],"sourceHashes":{"app.jsx":"276ff5e919e9","image-slot.js":"9309434cb09c","lib/StairStack.jsx":"e2cc5bb6f139","lib/hooks.jsx":"aaf77f3e79c3","lib/i18n.jsx":"2c1b436e1138","lib/ui.jsx":"1b294d4213bb","sections/chapters-a.jsx":"c04bb4c670f8","sections/chapters-b.jsx":"517075505354"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.StairSystemManagerAutodeskCaseStudy_cf6ec4 = window.StairSystemManagerAutodeskCaseStudy_cf6ec4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// app.jsx
try { (() => {
// app.jsx — composes the case study, top bar, and progress rail.
const {
  useState: useAppState,
  useEffect: useAppEffect,
  useRef: useAppRef
} = React;

/* Autodesk-agnostic concept wordmark: a small stair glyph */
function StairGlyph({
  size = 22
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 20h4v-4h4v-4h4V8h4V4",
    stroke: "var(--accent)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 20h4v-4h4v-4h4V8h4V4",
    stroke: "var(--accent)",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    opacity: "0"
  }));
}
function TopBar() {
  const lang = useLang();
  return /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "topbar__brand"
  }, /*#__PURE__*/React.createElement(StairGlyph, null), /*#__PURE__*/React.createElement("span", {
    className: "topbar__name"
  }, "StepWise ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-on-dark-lo)",
      fontWeight: 500
    }
  }, "for Revit"))), /*#__PURE__*/React.createElement("div", {
    className: "lang-toggle",
    role: "group",
    "aria-label": "Language"
  }, /*#__PURE__*/React.createElement("button", {
    className: "lang-toggle__btn" + (lang === "en" ? " is-active" : ""),
    onClick: () => setLang("en")
  }, "EN"), /*#__PURE__*/React.createElement("span", {
    className: "lang-toggle__sep"
  }), /*#__PURE__*/React.createElement("button", {
    className: "lang-toggle__btn" + (lang === "zh" ? " is-active" : ""),
    onClick: () => setLang("zh")
  }, "\u4E2D")));
}
function ProgressRail({
  sections
}) {
  const [active, setActive] = useAppState(0);
  useAppEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let best = 0,
        bestDist = Infinity;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          best = i;
          bestDist = 0;
        } else {
          const d = Math.min(Math.abs(r.top - mid), Math.abs(r.bottom - mid));
          if (bestDist > 0 && d < bestDist) {
            bestDist = d;
            best = i;
          }
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return /*#__PURE__*/React.createElement("nav", {
    className: "rail",
    "aria-label": "Section navigation"
  }, sections.map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: s.id,
    className: "rail__item" + (i === active ? " is-active" : ""),
    onClick: () => {
      const el = document.getElementById(s.id);
      if (el) window.scrollTo({
        top: el.offsetTop + 2,
        behavior: "smooth"
      });
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "rail__label"
  }, t(s.label[0], s.label[1])), /*#__PURE__*/React.createElement("span", {
    className: "rail__tick"
  }))));
}
function ScrollProgressBar() {
  const [w, setW] = useAppState(0);
  useAppEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setW(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "scrollbar-top",
    style: {
      width: (w * 100).toFixed(2) + "%"
    }
  });
}
const SECTIONS = [{
  id: "hero",
  label: ["Intro", "开场"],
  el: () => /*#__PURE__*/React.createElement(Hero, null)
}, {
  id: "ch01",
  label: ["Thesis", "立论"],
  el: () => /*#__PURE__*/React.createElement(ChThesis, null)
}, {
  id: "ch02",
  label: ["Research", "研究"],
  el: () => /*#__PURE__*/React.createElement(ChResearch, {
    "data-comment-anchor": "3bf78d4a28-div-153-15"
  })
}, {
  id: "ch03",
  label: ["Problem", "问题"],
  el: () => /*#__PURE__*/React.createElement(ChRootProblem, null)
}, {
  id: "ch04",
  label: ["Principles", "原则"],
  el: () => /*#__PURE__*/React.createElement(ChPrinciples, null)
}, {
  id: "ch05",
  label: ["Model-first", "建模"],
  el: () => /*#__PURE__*/React.createElement(ChModelFirst, null)
}, {
  id: "ch06",
  label: ["Workspace", "工作台"],
  el: () => /*#__PURE__*/React.createElement(ChWorkspace, null)
}, {
  id: "ch07",
  label: ["Core flow", "操作流"],
  el: () => /*#__PURE__*/React.createElement(ChFlow, null)
}, {
  id: "ch08",
  label: ["Network", "网络"],
  el: () => /*#__PURE__*/React.createElement(ChNetwork, null)
}, {
  id: "ch09",
  label: ["Details", "细节"],
  el: () => /*#__PURE__*/React.createElement(ChLab, null)
}, {
  id: "ch10",
  label: ["MVP", "取舍"],
  el: () => /*#__PURE__*/React.createElement(ChMVP, null)
}, {
  id: "ch11",
  label: ["Metrics", "指标"],
  el: () => /*#__PURE__*/React.createElement(ChMetrics, null)
}, {
  id: "closing",
  label: ["Close", "结语"],
  el: () => /*#__PURE__*/React.createElement(ChClosing, null)
}];
function App() {
  const lang = useLang();
  // Global reveal-on-scroll. Uses a scroll listener + getBoundingClientRect rather
  // than IntersectionObserver, which does not fire reliably in preview/iframe
  // rendering contexts (it would leave every section stuck at opacity:0).
  useAppEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-in"));
      return;
    }
    let raf = 0;
    const check = () => {
      raf = 0;
      const vh = window.innerHeight;
      document.querySelectorAll(".reveal:not(.is-in)").forEach(el => {
        const r = el.getBoundingClientRect();
        // reveal anything whose top has crossed the trigger line — including
        // elements already scrolled past, so jumps/fast scroll never strand content.
        if (r.top < vh * 0.92) el.classList.add("is-in");
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    // initial + delayed scans (sections mount as Babel scripts resolve)
    check();
    const timers = [80, 240, 600, 1200].map(d => setTimeout(check, d));
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", onScroll);
    const mo = new MutationObserver(onScroll);
    mo.observe(document.getElementById("root"), {
      childList: true,
      subtree: true
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mo.disconnect();
      timers.forEach(clearTimeout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // On language switch, content reflows — re-run the reveal scan so anything
  // now in view stays visible.
  useAppEffect(() => {
    const id = requestAnimationFrame(() => window.dispatchEvent(new Event("scroll")));
    return () => cancelAnimationFrame(id);
  }, [lang]);
  return /*#__PURE__*/React.createElement("div", {
    className: "site-root"
  }, /*#__PURE__*/React.createElement(VideoBackdrop, null), /*#__PURE__*/React.createElement(ScrollProgressBar, null), /*#__PURE__*/React.createElement(TopBar, null), /*#__PURE__*/React.createElement(ProgressRail, {
    sections: SECTIONS.filter(s => isReady(s))
  }), SECTIONS.filter(s => isReady(s)).map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    id: s.id
  }, s.el())));
}
function componentName(s) {
  return s.id;
}
function isReady(s) {
  const map = {
    hero: "Hero",
    ch01: "ChThesis",
    ch02: "ChResearch",
    ch03: "ChRootProblem",
    ch04: "ChPrinciples",
    ch05: "ChModelFirst",
    ch06: "ChWorkspace",
    ch07: "ChFlow",
    ch08: "ChNetwork",
    ch09: "ChLab",
    ch10: "ChMVP",
    ch11: "ChMetrics",
    closing: "ChClosing"
  };
  return typeof window[map[s.id]] === "function";
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "app.jsx", error: String((e && e.message) || e) }); }

// image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever you want the user to
 * supply an image. You control the slot's shape and size; the user fills it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The host bridge only allows sidecar writes at the project root, so the
 * HTML that uses this component is assumed to live at the project root too
 * (same constraint as design_canvas.jsx).
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          object-fit: cover | contain | fill.       (default 'cover')
 *                With cover (the default) double-clicking the filled slot
 *                enters a reframe mode: the whole image spills past the mask
 *                (translucent outside, opaque inside), drag to reposition,
 *                corner-drag to scale. The crop persists alongside the image
 *                in the sidecar. contain/fill stay static.
 *   position     object-position for fit=contain|fill.     (default '50% 50%')
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. A user drop overrides
 *                it; clearing the drop reveals src again.
 *
 * Size and layout come from ordinary CSS on the element — width/height
 * inline or from a parent grid — so it composes with any layout.
 *
 * Usage:
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet = ':host{display:inline-block;position:relative;vertical-align:top;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);width:240px;height:160px}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  '.spill{position:absolute;transform:translate(-50%,-50%);display:none;z-index:1;' + '  cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .spill{display:block}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls sit BELOW the mask (top:100%), absolutely positioned so the
  // author-declared slot height is unaffected. The gap is padding, not a
  // top offset, so the hover target stays contiguous with the frame.
  '.ctl{position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:8px;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'position', 'placeholder', 'src', 'id'];
    }
    constructor() {
      super();
      const root = this.attachShadow({
        mode: 'open'
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' + '<div class="spill">' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' + '<div class="ctl"><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="clear" title="Remove image">Remove</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'replace') {
          this._exitReframe(true);
          this._input.click();
        }
        if (act === 'clear') {
          this._exitReframe(false);
          this._gen++;
          this._local = null;
          if (this.id) setSlot(this.id, null);else this._render();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated on editable + fit=cover so share links and contain/fill slots
      // stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const base = Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (commit) this._commitView();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is only meaningful for fit=cover — contain/fill
    // keep the old object-fit path and double-click is a no-op.
    _reframes() {
      return this.hasAttribute('data-filled') && (this.getAttribute('fit') || 'cover') === 'cover';
    }

    // Cover-baseline geometry, shared by clamp/apply/resize. Null until the
    // img has loaded (naturalWidth is 0 before that) or when the slot has no
    // layout box — ResizeObserver fires with a 0×0 rect under display:none,
    // and clamping against a degenerate 1×1 frame would silently pull the
    // stored pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      return {
        iw,
        ih,
        fw,
        fh,
        base: Math.max(fw / iw, fh / ih)
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      const fit = this.getAttribute('fit') || 'cover';
      if (fit !== 'cover' || !g) {
        // Non-cover, or dimensions not known yet (before img load).
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = fit;
        this._img.style.objectPosition = this.getAttribute('position') || '50% 50%';
        return;
      }
      // Cover baseline: img fills the frame on its tighter axis at s=1, so
      // pan works immediately on the overflowing axis without zooming first.
      // Width/height and left/top are all frame-% — depends only on the
      // frame aspect ratio, so a responsive resize keeps the same crop. The
      // spill layer mirrors the same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      this._spill.style.width = w;
      this._spill.style.height = h;
      this._spill.style.left = l;
      this._spill.style.top = t;
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      if (url) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        this._empty.style.display = 'flex';
        this.removeAttribute('data-filled');
      }
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "image-slot.js", error: String((e && e.message) || e) }); }

// lib/StairStack.jsx
try { (() => {
// lib/StairStack.jsx — the core reusable building-section / stair-stack diagram.
// Renders a vertical stack of floors as a clean architectural section, with a
// stepped stair flight per floor. Status-colored (typical / exception / warn).
const {
  useMemo: _useMemo
} = React;
const STATUS_STROKE = {
  ok: "var(--typical-500)",
  typical: "var(--typical-500)",
  exception: "var(--exception-500)",
  warn: "var(--warn-500)",
  dim: "var(--ink-400)"
};
const STATUS_FILL = {
  ok: "rgba(61,125,255,0.10)",
  typical: "rgba(61,125,255,0.10)",
  exception: "rgba(245,132,31,0.13)",
  warn: "rgba(242,68,56,0.13)",
  dim: "rgba(255,255,255,0.02)"
};

/* Build a stepped stair flight path inside a floor band. */
function flightPath(x0, yBottom, w, h, steps, dir) {
  const sx = w / steps;
  const sy = h / steps;
  let d = `M ${x0} ${yBottom}`;
  let x = x0,
    y = yBottom;
  for (let i = 0; i < steps; i++) {
    y -= sy;
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`; // riser (up)
    x += sx;
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`; // tread (over)
  }
  return d;
}

/*
  props:
    floors: [{ label, status, ghost, landing }]  bottom-first
    width, floorHeight
    activeIndex: highlight one floor band
    affected: array of indices to outline (scope highlight)
    showLabels, showGrid, dimUnhighlighted
    drawProgress: 0..1 — fraction of flights drawn (for hero stroke-in)
    onFloorClick(i)
*/
function StairStack(props) {
  const {
    floors = [],
    width = 360,
    floorHeight = 46,
    activeIndex = -1,
    affected = [],
    showLabels = true,
    showGrid = true,
    dimUnhighlighted = false,
    drawProgress = 1,
    onFloorClick,
    compact = false,
    ghostOverlay = null
  } = props;
  const padT = 18,
    padB = 18;
  const labelW = showLabels ? 52 : 8;
  const rightPad = 18;
  const n = floors.length;
  const H = padT + padB + n * floorHeight;
  const stairX0 = labelW + 18;
  const stairW = width - stairX0 - rightPad - (compact ? 0 : 70);
  const steps = compact ? 5 : 7;
  const affectedSet = new Set(affected);

  // y of a floor's bottom line (floor i sits above line i)
  const lineY = i => H - padB - i * floorHeight;
  const flightsToDraw = Math.round(drawProgress * n);
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${width} ${H}`,
    width: "100%",
    style: {
      display: "block",
      overflow: "visible"
    },
    role: "img",
    "aria-label": "Building section showing a multi-level stair system"
  }, showGrid && floors.map((f, i) => {
    const y = lineY(i);
    return /*#__PURE__*/React.createElement("line", {
      key: "g" + i,
      x1: labelW,
      y1: y,
      x2: width - rightPad,
      y2: y,
      stroke: "var(--line-on-dark)",
      strokeWidth: "1"
    });
  }), showGrid && /*#__PURE__*/React.createElement("line", {
    x1: labelW,
    y1: lineY(n),
    x2: width - rightPad,
    y2: lineY(n),
    stroke: "var(--line-on-dark)",
    strokeWidth: "1"
  }), floors.map((f, i) => {
    const yB = lineY(i);
    const yT = lineY(i + 1);
    const fh = yB - yT;
    const isActive = i === activeIndex;
    const isAffected = affectedSet.has(i);
    const status = f.status || "typical";
    const stroke = STATUS_STROKE[status];
    const dimmed = dimUnhighlighted && !isActive && !isAffected && activeIndex >= 0;
    const drawn = i < flightsToDraw;
    const opacity = drawn ? dimmed ? 0.22 : 1 : 0;
    return /*#__PURE__*/React.createElement("g", {
      key: i,
      style: {
        transition: "opacity 360ms var(--ease-out)",
        opacity
      },
      onClick: onFloorClick ? () => onFloorClick(i) : undefined,
      cursor: onFloorClick ? "pointer" : "default"
    }, (isActive || isAffected) && /*#__PURE__*/React.createElement("rect", {
      x: labelW,
      y: yT,
      width: width - rightPad - labelW,
      height: fh,
      fill: STATUS_FILL[status]
    }), isAffected && /*#__PURE__*/React.createElement("rect", {
      x: labelW + 0.5,
      y: yT + 0.5,
      width: width - rightPad - labelW - 1,
      height: fh - 1,
      fill: "none",
      stroke: stroke,
      strokeWidth: "1.25",
      strokeDasharray: status === "exception" ? "0" : "0",
      opacity: "0.8"
    }), /*#__PURE__*/React.createElement("path", {
      d: flightPath(stairX0, yB, stairW, fh, steps, 1),
      fill: "none",
      stroke: stroke,
      strokeWidth: isActive ? 2.4 : 1.7,
      strokeLinejoin: "round",
      strokeLinecap: "round",
      strokeDasharray: f.ghost ? "3 4" : "0",
      opacity: f.ghost ? 0.7 : 1,
      style: {
        filter: isActive ? "drop-shadow(0 0 6px " + stroke + ")" : "none"
      }
    }), /*#__PURE__*/React.createElement("line", {
      x1: stairX0 + stairW,
      y1: yT,
      x2: stairX0 + stairW + 26,
      y2: yT,
      stroke: stroke,
      strokeWidth: isActive ? 2.4 : 1.7,
      strokeLinecap: "round",
      opacity: f.ghost ? 0.6 : 1
    }), /*#__PURE__*/React.createElement("circle", {
      cx: labelW,
      cy: yB,
      r: "2.5",
      fill: stroke,
      opacity: dimmed ? 0.3 : 1
    }));
  }), ghostOverlay && ghostOverlay.map((g, k) => {
    const i = g.index;
    const yB = lineY(i);
    const yT = lineY(i + 1);
    const fh = yB - yT;
    return /*#__PURE__*/React.createElement("path", {
      key: "gh" + k,
      d: flightPath(stairX0, yB, stairW, fh, steps, 1),
      fill: "none",
      stroke: "var(--ghost-line)",
      strokeWidth: "2",
      strokeDasharray: "4 4",
      strokeLinejoin: "round",
      opacity: "0.9"
    });
  }), showLabels && floors.map((f, i) => {
    const yB = lineY(i);
    const isActive = i === activeIndex;
    const isAffected = affectedSet.has(i);
    const status = f.status || "typical";
    const dimmed = dimUnhighlighted && !isActive && !isAffected && activeIndex >= 0;
    const drawn = i < flightsToDraw;
    return /*#__PURE__*/React.createElement("text", {
      key: "l" + i,
      x: labelW - 10,
      y: yB - floorHeight / 2 + 3,
      textAnchor: "end",
      fontFamily: "var(--font-mono)",
      fontSize: "9.5",
      fill: isActive || isAffected ? STATUS_STROKE[status] : "var(--text-on-dark-lo)",
      opacity: drawn ? dimmed ? 0.3 : 1 : 0,
      style: {
        transition: "opacity 360ms var(--ease-out)"
      }
    }, f.label);
  }));
}

/* Helper to generate a tower of floors with periodic exceptions. */
function makeTower(count, opts) {
  const o = opts || {};
  const exceptionEvery = o.exceptionEvery || 0;
  const warnAt = new Set(o.warnAt || []);
  const arr = [];
  for (let i = 0; i < count; i++) {
    const levelNum = i + 1;
    let status = "typical";
    if (warnAt.has(levelNum)) status = "warn";else if (exceptionEvery && levelNum % exceptionEvery === 0 && levelNum !== count) status = "exception";
    const label = levelNum === 1 ? "L01" : "L" + String(levelNum).padStart(2, "0");
    arr.push({
      label,
      status,
      level: levelNum
    });
  }
  return arr;
}
Object.assign(window, {
  StairStack,
  makeTower
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "lib/StairStack.jsx", error: String((e && e.message) || e) }); }

// lib/hooks.jsx
try { (() => {
// lib/hooks.jsx — scroll, reveal, in-view, count-up
const {
  useState,
  useEffect,
  useRef,
  useCallback
} = React;

/* Reveal-on-scroll: attach ref to any element; toggles .is-in once visible.
   Scroll-based for preview/iframe reliability. */
function useReveal(options) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      setShown(true);
      return;
    }
    let raf = 0;
    const check = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) {
        el.classList.add("is-in");
        setShown(true);
        if (!(options && options.repeat)) cleanup();
      } else if (options && options.repeat) {
        el.classList.remove("is-in");
        setShown(false);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    check();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", onScroll);
    return cleanup;
  }, []);
  return [ref, shown];
}

/* Is this element currently intersecting? (repeat)
   Scroll-based (not IntersectionObserver) so it works in preview/iframe contexts. */
function useInView(threshold) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.height === 0) return;
      // visible fraction of the element within the viewport
      const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
      const frac = visible / Math.min(r.height, vh);
      setInView(frac >= (threshold || 0.2));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    const timers = [80, 300, 700].map(d => setTimeout(check, d));
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      timers.forEach(clearTimeout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [threshold]);
  return [ref, inView];
}

/* Scroll progress 0..1 through a tall pinned section.
   Returns {ref, progress}. Attach ref to the OUTER tall wrapper. */
function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height - vh;
        const passed = Math.min(Math.max(-rect.top, 0), total);
        setProgress(total > 0 ? passed / total : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return {
    ref,
    progress
  };
}

/* Count up a number when it enters view. */
function useCountUp(target, opts) {
  const [ref, inView] = useInView(opts && opts.threshold || 0.6);
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;
    const dur = opts && opts.duration || 1100;
    const start = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 3);
    const tick = now => {
      const t = Math.min((now - start) / dur, 1);
      setVal(target * ease(t));
      if (t < 1) requestAnimationFrame(tick);else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return [ref, val];
}

/* clamp + map helpers */
const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const mapRange = (v, inA, inB, outA, outB) => {
  if (inB === inA) return outA;
  const t = clamp((v - inA) / (inB - inA), 0, 1);
  return outA + (outB - outA) * t;
};
Object.assign(window, {
  useReveal,
  useInView,
  useScrollProgress,
  useCountUp,
  clamp,
  mapRange
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "lib/hooks.jsx", error: String((e && e.message) || e) }); }

// lib/i18n.jsx
try { (() => {
// lib/i18n.jsx — tiny bilingual layer.
// Usage in any component: t("English text", "中文文本").
// The top-level <App> calls useLang() so the whole tree re-renders on toggle.
window.__lang = window.__lang || localStorage.getItem("ss_lang") || "en";
function setLang(l) {
  window.__lang = l;
  try {
    localStorage.setItem("ss_lang", l);
  } catch (e) {}
  document.documentElement.setAttribute("lang", l === "zh" ? "zh-CN" : "en");
  document.documentElement.setAttribute("data-lang", l);
  window.dispatchEvent(new CustomEvent("ss-langchange", {
    detail: l
  }));
}
function useLang() {
  const [lang, setL] = React.useState(window.__lang);
  React.useEffect(() => {
    const h = e => setL(e.detail);
    window.addEventListener("ss-langchange", h);
    return () => window.removeEventListener("ss-langchange", h);
  }, []);
  return lang;
}

/* Read the right string for the current language. */
function t(en, zh) {
  return window.__lang === "zh" ? zh != null ? zh : en : en;
}

// set initial document attributes
document.documentElement.setAttribute("lang", window.__lang === "zh" ? "zh-CN" : "en");
document.documentElement.setAttribute("data-lang", window.__lang);
Object.assign(window, {
  setLang,
  useLang,
  t
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "lib/i18n.jsx", error: String((e && e.message) || e) }); }

// lib/ui.jsx
try { (() => {
// lib/ui.jsx — shared presentational primitives for the case study.
const {
  useState: _uS
} = React;

/* Eyebrow / section index label */
function Eyebrow({
  idx,
  children,
  muted,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "eyebrow" + (muted ? " eyebrow--muted" : ""),
    style: style
  }, idx && /*#__PURE__*/React.createElement("span", {
    className: "eyebrow__idx"
  }, idx), idx && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 1,
      background: "currentColor",
      opacity: 0.4,
      display: "inline-block"
    }
  }), children);
}

/* Section header block: eyebrow + headline + optional lede */
function SectionHead({
  idx,
  eyebrow,
  title,
  lede,
  align = "left",
  maxw,
  light
}) {
  const color = light ? "var(--text-strong)" : "var(--text-on-dark-hi)";
  const ledeColor = light ? "var(--text-body)" : "var(--text-on-dark-mid)";
  return /*#__PURE__*/React.createElement("header", {
    style: {
      textAlign: align,
      maxWidth: maxw || 760,
      marginInline: align === "center" ? "auto" : 0
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "reveal"
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    idx: idx
  }, eyebrow)), /*#__PURE__*/React.createElement("h2", {
    className: "reveal",
    "data-delay": "1",
    style: {
      fontSize: "var(--fs-2xl)",
      color,
      marginTop: 18,
      textWrap: "balance",
      fontWeight: 500
    }
  }, title), lede && /*#__PURE__*/React.createElement("p", {
    className: "reveal",
    "data-delay": "2",
    style: {
      fontSize: "var(--fs-md)",
      lineHeight: "var(--lh-relaxed)",
      color: ledeColor,
      marginTop: 20,
      maxWidth: 620,
      marginInline: align === "center" ? "auto" : 0,
      textWrap: "pretty"
    }
  }, lede));
}

/* Light "tool window" chrome — represents the Stair System Manager app surface. */
function AppWindow({
  title,
  sub,
  children,
  style,
  tabs,
  activeTab,
  onTab,
  statusRight,
  flush
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-panel)",
      borderRadius: "var(--r-lg)",
      boxShadow: "var(--shadow-panel)",
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.06)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "11px 14px",
      borderBottom: "1px solid var(--line-on-light)",
      background: "var(--surface-sunken)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "#E0E3E9"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "#E0E3E9"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: "50%",
      background: "#E0E3E9"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 8,
      marginLeft: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 13.5,
      color: "var(--text-strong)",
      letterSpacing: "-0.01em"
    }
  }, title), sub && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--text-muted)"
    }
  }, sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto"
    }
  }, statusRight)), tabs && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 2,
      padding: "0 10px",
      borderBottom: "1px solid var(--line-on-light)",
      background: "var(--surface-panel)"
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => onTab && onTab(t),
    style: {
      appearance: "none",
      border: 0,
      background: "none",
      cursor: "pointer",
      fontFamily: "var(--font-sans)",
      fontSize: 12.5,
      fontWeight: 500,
      padding: "11px 12px",
      color: t === activeTab ? "var(--accent-strong)" : "var(--text-muted)",
      borderBottom: t === activeTab ? "2px solid var(--accent)" : "2px solid transparent",
      marginBottom: -1,
      transition: "color var(--dur-fast) var(--ease-out)"
    }
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: flush ? 0 : 0
    }
  }, children));
}

/* Button */
function Btn({
  children,
  variant = "primary",
  size = "md",
  icon,
  onClick,
  style,
  disabled
}) {
  const sizes = {
    sm: {
      p: "7px 12px",
      fs: 12.5
    },
    md: {
      p: "10px 16px",
      fs: 13.5
    },
    lg: {
      p: "13px 22px",
      fs: 15
    }
  };
  const s = sizes[size];
  const variants = {
    primary: {
      background: "var(--accent)",
      color: "#fff",
      border: "1px solid var(--accent)"
    },
    strong: {
      background: "var(--accent-strong)",
      color: "#fff",
      border: "1px solid var(--accent-strong)"
    },
    ghost: {
      background: "transparent",
      color: "var(--text-body)",
      border: "1px solid var(--line-on-light-2)"
    },
    ghostDark: {
      background: "rgba(255,255,255,0.06)",
      color: "var(--text-on-dark-hi)",
      border: "1px solid var(--line-on-dark-2)"
    },
    warn: {
      background: "var(--warn-500)",
      color: "#fff",
      border: "1px solid var(--warn-500)"
    },
    quiet: {
      background: "var(--surface-inset)",
      color: "var(--text-body)",
      border: "1px solid transparent"
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    disabled: disabled,
    style: {
      appearance: "none",
      cursor: disabled ? "default" : "pointer",
      borderRadius: "var(--r-sm)",
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: s.fs,
      padding: s.p,
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      lineHeight: 1,
      opacity: disabled ? 0.5 : 1,
      transition: "filter var(--dur-fast), transform var(--dur-fast)",
      ...variants[variant],
      ...style
    },
    onMouseDown: e => !disabled && (e.currentTarget.style.transform = "translateY(1px)"),
    onMouseUp: e => e.currentTarget.style.transform = "none",
    onMouseLeave: e => e.currentTarget.style.transform = "none"
  }, icon, children);
}

/* Parameter row used in property panels */
function ParamRow({
  label,
  value,
  status,
  overridden,
  locked,
  onHover,
  active
}) {
  const statusColor = status === "warn" ? "var(--warn-500)" : status === "exception" ? "var(--exception-500)" : "var(--text-strong)";
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: onHover,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "9px 12px",
      borderRadius: "var(--r-sm)",
      gap: 12,
      background: active ? "var(--accent-tint)" : "transparent",
      cursor: onHover ? "pointer" : "default",
      transition: "background var(--dur-fast) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      fontSize: 12.5,
      color: "var(--text-body)",
      fontFamily: "var(--font-sans)"
    }
  }, locked && /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 12,
    color: "var(--text-faint)"
  }), label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7
    }
  }, overridden && /*#__PURE__*/React.createElement("span", {
    className: "tag tag--exception",
    style: {
      padding: "2px 6px"
    }
  }, "override"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: statusColor,
      fontWeight: overridden ? 600 : 400
    }
  }, value)));
}

/* Minimal inline icon set (stroke, 1.6) — geometric to match the tool */
function Icon({
  name,
  size = 16,
  color = "currentColor",
  style
}) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style
  };
  const paths = {
    tree: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M12 4v6M12 14v6M6 14v2M18 14v2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "4",
      r: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "6",
      cy: "18",
      r: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "18",
      cy: "18",
      r: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M6 16v-2h12v2"
    })),
    target: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "8"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3.5"
    })),
    branch: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "6",
      cy: "6",
      r: "2.2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "6",
      cy: "18",
      r: "2.2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "18",
      cy: "8",
      r: "2.2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M6 8.2v7.6M8.2 6h5.2a2.6 2.6 0 0 1 2.6 2.6v.2"
    })),
    eye: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    })),
    lock: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "5",
      y: "11",
      width: "14",
      height: "9",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M8 11V8a4 4 0 0 1 8 0v3"
    })),
    warn: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M12 3 2 20h20L12 3Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 10v4M12 17.5v.2"
    })),
    check: /*#__PURE__*/React.createElement("path", {
      d: "M5 12.5 10 17 19 7"
    }),
    layers: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M12 3 3 8l9 5 9-5-9-5Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 13l9 5 9-5M3 18l9 5 9-5"
    })),
    arrowR: /*#__PURE__*/React.createElement("path", {
      d: "M5 12h14M13 6l6 6-6 6"
    }),
    sliders: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M4 7h10M18 7h2M4 17h2M10 17h10"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "16",
      cy: "7",
      r: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "8",
      cy: "17",
      r: "2"
    })),
    sparkle: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("path", {
      d: "M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"
    })),
    grid: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "7",
      height: "7",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "3",
      width: "7",
      height: "7",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "14",
      width: "7",
      height: "7",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "14",
      width: "7",
      height: "7",
      rx: "1"
    })),
    plus: /*#__PURE__*/React.createElement("path", {
      d: "M12 5v14M5 12h14"
    }),
    clock: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 7v5l3 2"
    })),
    copy: /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("rect", {
      x: "9",
      y: "9",
      width: "11",
      height: "11",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 15V5a2 2 0 0 1 2-2h8"
    }))
  };
  return /*#__PURE__*/React.createElement("svg", p, paths[name] || null);
}

/* ---- Slide foreground head: index + eyebrow + big title + copy ---- */
function SlideHead({
  idx,
  eyebrow,
  title,
  copy,
  copy2,
  align = "left",
  max = 680,
  accent
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      textAlign: align,
      maxWidth: max,
      marginInline: align === "center" ? "auto" : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      justifyContent: align === "center" ? "center" : "flex-start"
    }
  }, idx && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-mono-sm)",
      letterSpacing: "0.14em",
      color: "var(--text-on-dark-lo)"
    }
  }, idx), eyebrow && /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      color: accent || "var(--accent)"
    }
  }, eyebrow)), /*#__PURE__*/React.createElement("h2", {
    className: "reveal",
    "data-delay": "1",
    style: {
      fontSize: "clamp(2rem, 1.3rem + 2.8vw, 3.4rem)",
      fontWeight: 500,
      color: "#fff",
      marginTop: 18,
      lineHeight: 1.06,
      letterSpacing: "-0.025em",
      textWrap: "balance"
    }
  }, title), copy && /*#__PURE__*/React.createElement("p", {
    className: "reveal",
    "data-delay": "2",
    style: {
      fontSize: "clamp(1.05rem, 0.95rem + 0.5vw, 1.3rem)",
      lineHeight: 1.5,
      color: "var(--text-on-dark-mid)",
      marginTop: 22,
      maxWidth: 600,
      marginInline: align === "center" ? "auto" : 0,
      textWrap: "pretty"
    }
  }, copy), copy2 && /*#__PURE__*/React.createElement("p", {
    className: "reveal",
    "data-delay": "3",
    style: {
      fontSize: "clamp(1.05rem, 0.95rem + 0.5vw, 1.3rem)",
      lineHeight: 1.5,
      color: "var(--text-on-dark-hi)",
      marginTop: 16,
      maxWidth: 600,
      marginInline: align === "center" ? "auto" : 0,
      fontWeight: 500,
      textWrap: "pretty"
    }
  }, copy2));
}

/* ---- Visual placeholder: dashed zone the user will replace with video / a UI screenshot ---- */
function Placeholder({
  label,
  sub,
  kind = "ui",
  style,
  minHeight
}) {
  const meta = {
    video: {
      icon: "eye",
      tone: "var(--typical-400)",
      tag: "VIDEO"
    },
    model: {
      icon: "layers",
      tone: "var(--typical-400)",
      tag: "3D"
    },
    ui: {
      icon: "grid",
      tone: "var(--accent)",
      tag: "UI"
    },
    evidence: {
      icon: "tree",
      tone: "var(--exception-400)",
      tag: "REF"
    },
    abstract: {
      icon: "sparkle",
      tone: "var(--ok-400)",
      tag: "ABSTRACT"
    }
  }[kind] || {
    icon: "grid",
    tone: "var(--accent)",
    tag: "UI"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "ph",
    style: {
      ...(minHeight ? {
        minHeight
      } : {}),
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ph__inner"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ph__tag",
    style: {
      color: meta.tone,
      borderColor: meta.tone
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: meta.icon,
    size: 13,
    color: meta.tone
  }), meta.tag), /*#__PURE__*/React.createElement("span", {
    className: "ph__label"
  }, label), sub && /*#__PURE__*/React.createElement("span", {
    className: "ph__sub"
  }, sub)), /*#__PURE__*/React.createElement("span", {
    className: "ph__corner ph__corner--tl"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ph__corner ph__corner--tr"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ph__corner ph__corner--bl"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ph__corner ph__corner--br"
  }));
}
Object.assign(window, {
  Eyebrow,
  SectionHead,
  SlideHead,
  AppWindow,
  Btn,
  ParamRow,
  Icon,
  Placeholder
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "lib/ui.jsx", error: String((e && e.message) || e) }); }

// sections/chapters-a.jsx
try { (() => {
// sections/chapters-a.jsx — intro act (Thesis → Research → Root Problem → Principles)
// over a scroll-scrubbed 3-clip video backdrop, plus Model-first setup.
const {
  useState: useA,
  useEffect: useAE,
  useRef: useARef
} = React;

/* Fixed video backdrop. Scrubs clips 1→2→3 by scroll across the intro act
   (hero … principles = #ch04). Muted (BGM removed). Fades out after the act. */
function VideoBackdrop() {
  const v0 = useARef(null),
    v1 = useARef(null),
    v2 = useARef(null);
  const layer = useARef(null);
  const lastIdx = useARef(-1);
  useAE(() => {
    const vids = [v0.current, v1.current, v2.current];
    // Fetch each clip fully into memory as a Blob → makes it seekable so scroll can
    // scrub currentTime frame-by-frame (the server has no byte-range support).
    const urls = [];
    ["assets/video/1.mp4", "assets/video/2.mp4", "assets/video/3.mp4"].forEach((src, i) => {
      const v = vids[i];
      if (!v) return;
      v.muted = true;
      v.pause();
      fetch(src).then(r => r.blob()).then(b => {
        const u = URL.createObjectURL(b);
        urls[i] = u;
        v.src = u;
        v.load();
      }).catch(() => {});
    });
    const setActive = idx => {
      vids.forEach((v, i) => {
        if (v) v.style.opacity = i === idx ? "1" : "0";
      });
    };
    setActive(0);
    // Each intro chapter owns a frame-slice of one clip. The video ADVANCES while
    // you scroll between chapters, but HOLDS a frame while a chapter dwells at
    // centre (plateau) — so the black region stays put under the text. Frame anchors
    // are chosen so clip-1's "model-on-right" frames sit under the left-aligned hero,
    // and "model-on-left" frames sit under the right-aligned chapters.
    const SEG = [{
      clip: 0,
      a: 0.00,
      b: 0.42
    },
    // 00 hero      — clip1 open (black on left)
    {
      clip: 0,
      a: 0.42,
      b: 1.00
    },
    // 01 thesis    — clip1 close (model left, black right)
    {
      clip: 1,
      a: 0.00,
      b: 0.55
    },
    // 02 research  — clip2 (black right)
    {
      clip: 1,
      a: 0.55,
      b: 1.00
    },
    // 03 root      — clip2
    {
      clip: 2,
      a: 0.00,
      b: 1.00
    } // 04 principles— clip3 (model to centre)
    ];
    const ids = ["hero", "ch01", "ch02", "ch03", "ch04"];
    // Frame moves only in the entry (0–0.34) and exit (0.66–1) of each chapter;
    // it HOLDS through the centre dwell (0.34–0.66). Normalised over the chapter's
    // real pinned distance so lp reaches a full 1.0 → every clip plays to its end.
    const plateau = lp => lp < 0.34 ? lp / 0.34 * 0.5 : lp < 0.66 ? 0.5 : 0.5 + (lp - 0.66) / 0.34 * 0.5;
    const smoothT = [0, 0, 0];
    let rafId = 0;
    const loop = () => {
      const els = ids.map(id => document.getElementById(id));
      if (els[0] && els[4]) {
        const vh = window.innerHeight;
        // active = last chapter whose top has passed the viewport centre
        let active = 0;
        for (let i = 0; i < els.length; i++) {
          if (els[i] && els[i].getBoundingClientRect().top <= vh * 0.5) active = i;
        }
        const el = els[active];
        const r = el.getBoundingClientRect();
        const total = Math.max(1, el.offsetHeight - vh); // sticky scroll distance
        const lp = Math.min(1, Math.max(0, -r.top / total)); // 0→1 across the pin
        const s = SEG[active];
        const v = vids[s.clip];
        if (v && v.duration && isFinite(v.duration)) {
          const frac = s.a + plateau(lp) * (s.b - s.a);
          const target = Math.min(v.duration - 0.03, frac * v.duration);
          smoothT[s.clip] += (target - smoothT[s.clip]) * 0.18;
          if (Math.abs(v.currentTime - smoothT[s.clip]) > 0.003) {
            try {
              v.currentTime = smoothT[s.clip];
            } catch (e) {}
          }
        }
        if (s.clip !== lastIdx.current) {
          lastIdx.current = s.clip;
          setActive(s.clip);
        }
        // fade to black only once principles has fully scrolled past (clip-3 finished)
        const lr = els[4].getBoundingClientRect();
        const over = vh - lr.bottom;
        if (layer.current) layer.current.style.opacity = over > 0 ? String(Math.max(0, 1 - over / (vh * 0.5))) : "1";
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      urls.forEach(u => u && URL.revokeObjectURL(u));
    };
  }, []);
  const vs = i => ({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity .5s ease",
    willChange: "opacity"
  });
  return /*#__PURE__*/React.createElement("div", {
    ref: layer,
    "aria-hidden": "true",
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 0,
      background: "#000",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("video", {
    ref: v0,
    muted: true,
    playsInline: true,
    preload: "auto",
    style: vs(0)
  }), /*#__PURE__*/React.createElement("video", {
    ref: v1,
    muted: true,
    playsInline: true,
    preload: "auto",
    style: vs(1)
  }), /*#__PURE__*/React.createElement("video", {
    ref: v2,
    muted: true,
    playsInline: true,
    preload: "auto",
    style: vs(2)
  }));
}

/* intro text block with a soft scrim for legibility over video. side: 'left' | 'right'.
   Full-bleed flex so a right block hugs the true right gutter (over the video's black). */
function IntroBlock({
  side = "left",
  children,
  max = 480
}) {
  const isR = side === "right";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 2,
      width: "100%",
      paddingInline: "clamp(26px, 5.5vw, 112px)",
      display: "flex",
      justifyContent: isR ? "flex-end" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "min(100%, " + max + "px)",
      padding: "26px 30px",
      borderRadius: 18,
      textAlign: "left",
      background: isR ? "radial-gradient(135% 135% at 78% 50%, rgba(0,0,0,0.66), transparent 76%)" : "radial-gradient(135% 135% at 22% 50%, rgba(0,0,0,0.66), transparent 76%)"
    }
  }, children));
}
function DwellDots({
  progress,
  n = 4,
  color = "var(--accent)"
}) {
  const lit = Math.round(mapRange(progress, 0.12, 0.9, 0, n));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 7,
      marginTop: 24,
      alignItems: "center"
    }
  }, Array.from({
    length: n
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: i < lit ? 22 : 7,
      height: 7,
      borderRadius: 7,
      background: i < lit ? color : "var(--line-on-dark-2)",
      transition: "all .35s var(--ease-out)"
    }
  })));
}
const introSection = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  position: "relative",
  background: "transparent",
  paddingBlock: "12vh"
};

/* 00 · Thesis intro — title, video 1 (left black) → text left */
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "00 Thesis",
    style: {
      ...introSection,
      height: "150vh",
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      bottom: "12vh",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(IntroBlock, {
    side: "left",
    max: 780
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, t("Autodesk Revit · UX case study", "Autodesk Revit · 体验设计案例"))), /*#__PURE__*/React.createElement("h1", {
    className: "reveal",
    "data-delay": "1",
    style: {
      fontSize: "clamp(3rem, 1.8rem + 6.5vw, 6.8rem)",
      fontWeight: 500,
      letterSpacing: "-0.04em",
      lineHeight: 0.95,
      color: "#fff",
      marginTop: 20
    }
  }, "StepWise ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-on-dark-mid)",
      fontWeight: 400
    }
  }, "for Revit")), /*#__PURE__*/React.createElement("p", {
    className: "reveal",
    "data-delay": "2",
    style: {
      fontSize: "clamp(1.15rem, 0.9rem + 1vw, 1.6rem)",
      color: "#fff",
      marginTop: 22,
      letterSpacing: "-0.01em"
    }
  }, t("Edit globally. Vary locally. Preview impact.", "全局编辑，局部例外，影响可见。")), /*#__PURE__*/React.createElement("div", {
    className: "reveal scroll-hint",
    "data-delay": "3",
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "scroll-hint__bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "scroll-hint__dot"
  })), /*#__PURE__*/React.createElement("span", null, t("Scroll", "向下滚动"))))));
}

/* 01 · Thesis · from parameters to intent — text left + keyword pills light up */
function ChThesis() {
  const {
    ref,
    progress
  } = useScrollProgress();
  const kws = [["Hierarchy", "层级", "var(--typical-400)"], ["Scope", "范围", "var(--exception-400)"], ["Exceptions", "例外", "var(--external-400)"], ["Impact", "影响", "var(--warn-400)"]];
  const lit = Math.floor(mapRange(progress, 0.25, 0.92, 0, kws.length + 0.5));
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    "data-screen-label": "01 Thesis",
    style: {
      ...introSection,
      height: "240vh"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      height: "100vh",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(IntroBlock, {
    side: "right",
    max: 600
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    idx: "01"
  }, t("Thesis · from parameters to intent", "立论 · 从参数到意图")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "clamp(1.8rem,1.2rem+1.9vw,2.9rem)",
      fontWeight: 500,
      color: "#fff",
      letterSpacing: "-0.025em",
      margin: "16px 0",
      lineHeight: 1.1,
      textWrap: "balance"
    }
  }, t("Users don't need another stair parameter panel.", "用户要的不是又一个楼梯参数面板。")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      color: "var(--text-on-dark-hi)",
      lineHeight: 1.55,
      marginBottom: 14
    }
  }, t("Revit exposes scattered parameters, types, sub-types and nested dialogs. But users want to manage one stair system across levels — runs, landings, railings, balusters, height changes, local exceptions and the drawings downstream.", "Revit 暴露的是零散的参数、类型、子类型和嵌套窗口；但用户想管理的是一套跨楼层的楼梯系统——梯段、平台、栏杆、栏杆柱、层高变化、局部例外，以及下游图纸表达。")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.1rem,0.95rem+0.6vw,1.45rem)",
      fontWeight: 500,
      color: "var(--typical-300)",
      lineHeight: 1.3,
      letterSpacing: "-0.01em"
    }
  }, t("StepWise helps users manage stair intent — not stair accidents.", "StepWise 帮助用户管理楼梯的设计意图——而不是意外。")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 26,
      flexWrap: "wrap"
    }
  }, kws.map((k, i) => {
    const on = i < lit;
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        padding: "9px 16px",
        borderRadius: "var(--r-pill)",
        border: "1px solid " + (on ? k[2] : "var(--line-on-dark)"),
        color: on ? "#fff" : "var(--text-on-dark-lo)",
        background: on ? "rgba(255,255,255,0.05)" : "transparent",
        boxShadow: on ? "0 0 18px " + k[2] + "44" : "none",
        transition: "all .4s var(--ease-out)"
      }
    }, t(k[0], k[1]));
  })), /*#__PURE__*/React.createElement(DwellDots, {
    progress: progress,
    n: 4
  }))));
}

/* 02 · Research signals — evidence cards slide in (left) + text (right) */
function ChResearch() {
  const {
    ref,
    progress
  } = useScrollProgress();
  const sigs = [{
    n: "01",
    l: ["Case prompt", "题目信号"],
    d: ["Unintuitive tool · small change → new type · floor-height rework · repeated vertical edits · shared-component dependencies.", "工具不直观 · 小改动→新类型 · 层高返工 · 重复纵向编辑 · 共享组件依赖。"]
  }, {
    n: "02",
    l: ["Directional expert input", "方向性专家输入"],
    d: ["“Fine once you learn it” on school/hospital work — but heavy modelers hand-tune landings, railings, balusters after every change.", "学校/医院项目里“学会就还行”——但重度建模者每次改动后都要手调平台、栏杆、栏杆柱。"]
  }, {
    n: "03",
    l: ["Market scan", "市场扫描"],
    d: ["Plugins solve generation, rebar, scan-to-BIM, Dynamo scripts — rarely hierarchy, scope, exceptions or impact preview.", "插件解决生成、配筋、扫描转BIM、Dynamo 脚本——很少触及层级、范围、例外或影响预览。"]
  }];
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    "data-screen-label": "02 Research signals",
    style: {
      ...introSection,
      height: "290vh"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      height: "100vh",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-2",
    style: {
      width: "100%",
      maxWidth: 1640,
      marginInline: "auto",
      paddingInline: "clamp(26px,5.5vw,112px)",
      display: "grid",
      gridTemplateColumns: "1fr 1.05fr",
      gap: "clamp(28px,4vw,72px)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, sigs.map((s, i) => {
    const on = progress > 0.12 + i * 0.16;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        padding: "15px 16px",
        borderRadius: "var(--r-md)",
        background: "rgba(10,13,19,0.72)",
        border: "1px solid " + (on ? "var(--line-on-dark-2)" : "var(--line-on-dark)"),
        backdropFilter: "blur(6px)",
        opacity: on ? 1 : 0,
        transform: on ? "none" : "translateX(-28px)",
        transition: "all .5s var(--ease-out)",
        boxShadow: on ? "0 14px 40px rgba(0,0,0,0.5)" : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--accent)"
      }
    }, s.n), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14.5,
        fontWeight: 600,
        color: "#fff"
      }
    }, t(s.l[0], s.l[1]))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13.5,
        color: "var(--text-on-dark-mid)",
        lineHeight: 1.5
      }
    }, t(s.d[0], s.d[1])));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      opacity: progress > 0.7 ? 1 : 0,
      transform: progress > 0.7 ? "none" : "translateY(10px)",
      transition: "all .5s var(--ease-out)",
      marginTop: 4,
      padding: "12px 14px",
      borderRadius: "var(--r-md)",
      border: "1px solid var(--accent)",
      background: "rgba(61,125,255,0.08)",
      display: "flex",
      flexWrap: "wrap",
      gap: 6,
      alignItems: "center",
      fontFamily: "var(--font-mono)",
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--typical-400)"
    }
  }, t("Repeated floors", "重复楼层")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-on-dark-lo)"
    }
  }, "+"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--exception-400)"
    }
  }, t("Local exceptions", "局部例外")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-on-dark-lo)"
    }
  }, "+"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--external-400)"
    }
  }, t("Shared types", "共享类型")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-on-dark-lo)"
    }
  }, "+"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--warn-400)"
    }
  }, t("Frequent change", "频繁变更")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-on-dark-lo)"
    }
  }, "="), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)",
      fontWeight: 600
    }
  }, t("High-value pain point", "高价值痛点")))), /*#__PURE__*/React.createElement("div", {
    style: {
      justifySelf: "end",
      maxWidth: 480,
      padding: "26px 28px",
      margin: "-26px",
      borderRadius: 16,
      background: "radial-gradient(120% 120% at 80% 50%, rgba(0,0,0,0.6), transparent 78%)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    idx: "02"
  }, t("Research · calibrating the problem", "研究 · 校准问题")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "clamp(1.7rem,1.2rem+1.6vw,2.55rem)",
      fontWeight: 500,
      color: "#fff",
      letterSpacing: "-0.025em",
      margin: "16px 0",
      lineHeight: 1.12,
      textWrap: "balance"
    }
  }, t("The pain is real — but contextual.", "痛点真实——但因场景而异。")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      color: "var(--text-on-dark-mid)",
      lineHeight: 1.55
    }
  }, t("Three signals — the prompt, directional expert input, and a market scan — converge on the same high-value scenario.", "三路信号——题目、方向性专家输入、市场扫描——汇聚于同一个高价值场景。")), /*#__PURE__*/React.createElement(DwellDots, {
    progress: progress,
    n: 3
  })))));
}

/* 03 · Root problem — exploded dependency diagram (left) + text (right) */
function ChRootProblem() {
  const {
    ref,
    progress
  } = useScrollProgress();
  const probs = [{
    l: ["Hidden hierarchy", "隐藏的层级"],
    d: ["Stair, run, landing, stringer, railing, baluster, cut mark — relationships buried in types.", "楼梯、梯段、平台、斜梁、栏杆、栏杆柱、剪切标记——关系都埋在类型里。"],
    c: "var(--typical-400)"
  }, {
    l: ["Unclear scope", "范围不清"],
    d: ["This stair? this level? the whole stair? every shared type? Users can't tell.", "这部楼梯？这一层？整套楼梯？所有共享类型？用户无从判断。"],
    c: "var(--exception-400)"
  }, {
    l: ["Poor exception management", "例外难管理"],
    d: ["“Consistent overall, different locally” — but the only tool is duplicate type.", "“整体一致、局部不同”——但唯一的办法是复制类型。"],
    c: "var(--external-400)"
  }, {
    l: ["Fragile connected parts", "脆弱的连接组件"],
    d: ["Landing, railing, baluster feel like one system, behave as scattered objects.", "平台、栏杆、栏杆柱本是一套系统，工具里却各自为政。"],
    c: "var(--warn-400)"
  }];
  const PARTS = [["Run", "梯段", -90], ["Landing", "平台", -30], ["Railing", "栏杆", 30], ["Baluster", "栏杆柱", 90], ["Support", "支撑", 150], ["Cut mark", "剪切", 210]];
  const spread = mapRange(progress, 0.12, 0.55, 0, 1),
    deps = mapRange(progress, 0.5, 0.82, 0, 1),
    R = 130 * spread + 26;
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    "data-screen-label": "03 Root problem",
    style: {
      ...introSection,
      height: "290vh"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      height: "100vh",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-2",
    style: {
      width: "100%",
      maxWidth: 1640,
      marginInline: "auto",
      paddingInline: "clamp(26px,5.5vw,112px)",
      display: "grid",
      gridTemplateColumns: "1fr 1.05fr",
      gap: "clamp(28px,4vw,72px)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "1",
      maxWidth: 420,
      width: "100%",
      justifySelf: "center"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "-210 -210 420 420",
    style: {
      width: "100%",
      height: "100%",
      overflow: "visible"
    }
  }, PARTS.map((p, i) => {
    const a = p[2] * Math.PI / 180,
      x = Math.cos(a) * R,
      y = Math.sin(a) * R;
    return /*#__PURE__*/React.createElement("line", {
      key: "l" + i,
      x1: "0",
      y1: "0",
      x2: x,
      y2: y,
      stroke: "var(--line-on-dark-2)",
      strokeWidth: "1",
      opacity: spread
    });
  }), deps > 0 && [[0, 1], [1, 2], [2, 3], [4, 5]].map(([a, b], i) => {
    const aa = PARTS[a][2] * Math.PI / 180,
      ab = PARTS[b][2] * Math.PI / 180;
    return /*#__PURE__*/React.createElement("line", {
      key: "d" + i,
      x1: Math.cos(aa) * R,
      y1: Math.sin(aa) * R,
      x2: Math.cos(ab) * R,
      y2: Math.sin(ab) * R,
      stroke: "var(--external-500)",
      strokeWidth: "1.2",
      strokeDasharray: "4 4",
      opacity: deps * 0.85
    });
  }), /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
    r: "20",
    fill: "rgba(61,125,255,0.14)",
    stroke: "var(--accent)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M-9 7 L-9 2 L-3 2 L-3 -3 L3 -3 L3 -9 L10 -9",
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: "1.6",
    strokeLinejoin: "round"
  })), PARTS.map((p, i) => {
    const a = p[2] * Math.PI / 180,
      x = Math.cos(a) * R,
      y = Math.sin(a) * R;
    const risk = deps > 0 && (i === 1 || i === 3);
    return /*#__PURE__*/React.createElement("g", {
      key: "p" + i,
      opacity: spread,
      transform: `translate(${x},${y})`
    }, /*#__PURE__*/React.createElement("rect", {
      x: "-28",
      y: "-14",
      width: "56",
      height: "28",
      rx: "4",
      fill: "#0b0e13",
      stroke: risk ? "var(--external-500)" : "var(--line-on-dark-2)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      textAnchor: "middle",
      y: "4",
      fontFamily: "var(--font-mono)",
      fontSize: "9",
      fill: risk ? "var(--external-400)" : "var(--text-on-dark-mid)"
    }, t(p[0], p[1])), risk && /*#__PURE__*/React.createElement("circle", {
      cx: "24",
      cy: "-11",
      r: "3",
      fill: "var(--warn-500)"
    }));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      justifySelf: "end",
      maxWidth: 480,
      padding: "26px 28px",
      margin: "-26px",
      borderRadius: 16,
      background: "radial-gradient(120% 120% at 80% 50%, rgba(0,0,0,0.62), transparent 78%)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    idx: "03"
  }, t("Root problem", "根本问题")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "clamp(1.7rem,1.2rem+1.6vw,2.55rem)",
      fontWeight: 500,
      color: "#fff",
      letterSpacing: "-0.025em",
      margin: "16px 0 18px",
      lineHeight: 1.12,
      textWrap: "balance"
    }
  }, t("Hidden hierarchy. Unclear scope. Unmanaged exceptions.", "隐藏的层级。不清的范围。无人管理的例外。")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 11,
      marginBottom: 16
    }
  }, probs.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: p.c,
      flex: "none",
      marginTop: 7
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: "#fff"
    }
  }, t(p.l[0], p.l[1]), " \u2014 "), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      color: "var(--text-on-dark-mid)",
      lineHeight: 1.5
    }
  }, t(p.d[0], p.d[1])))))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.05rem,0.95rem+0.5vw,1.35rem)",
      fontWeight: 500,
      color: "var(--typical-300)",
      lineHeight: 1.3
    }
  }, t("Users think in stair systems, but Revit asks them to manage fragmented types and dependencies.", "用户以“楼梯系统”思考，Revit 却要他们管理零散的类型与依赖。")), /*#__PURE__*/React.createElement(DwellDots, {
    progress: progress,
    n: 4,
    color: "var(--external-400)"
  })))));
}

/* 04 · Design principles — left (video 3, model center) */
function ChPrinciples() {
  const {
    ref,
    progress
  } = useScrollProgress();
  const prins = [{
    l: ["Make hierarchy visible", "让层级可见"],
    c: "var(--typical-500)"
  }, {
    l: ["Make scope explicit", "让范围明确"],
    c: "var(--exception-500)"
  }, {
    l: ["Manage exceptions without duplication", "管理例外，无需复制"],
    c: "var(--external-500)"
  }, {
    l: ["Preview impact before apply", "应用前先预览影响"],
    c: "var(--warn-500)"
  }];
  const lit = Math.floor(mapRange(progress, 0.1, 0.85, 0, prins.length + 0.5));
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    "data-screen-label": "04 Principles",
    style: {
      ...introSection,
      height: "230vh"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      height: "100vh",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(IntroBlock, {
    side: "left",
    max: 620
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    idx: "04"
  }, t("Design principles", "设计原则")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "clamp(1.7rem,1.2rem+1.6vw,2.55rem)",
      fontWeight: 500,
      color: "#fff",
      letterSpacing: "-0.025em",
      margin: "16px 0 24px",
      lineHeight: 1.12,
      textWrap: "balance"
    }
  }, t("Make complexity visible — not hidden.", "让复杂可见——而非隐藏。")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, prins.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "11px 0",
      borderTop: i ? "1px solid rgba(255,255,255,0.12)" : "0",
      opacity: i < lit ? 1 : 0.32,
      transition: "opacity .4s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: p.c,
      flex: "none",
      boxShadow: i < lit ? `0 0 12px ${p.c}` : "none"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.2rem,1rem+0.9vw,1.7rem)",
      fontWeight: 500,
      color: "#fff",
      letterSpacing: "-0.02em"
    }
  }, t(p.l[0], p.l[1]))))), /*#__PURE__*/React.createElement(DwellDots, {
    progress: progress,
    n: 4,
    color: "var(--ok-400)"
  }))));
}

/* 05 · Model-first setup — 6-step sequence (black, after the video act) */
function ChModelFirst() {
  const {
    ref,
    progress
  } = useScrollProgress();
  const steps = [{
    t: ["Select stair shaft", "选择楼梯井"],
    d: ["Pick the stairwell boundary or an existing shaft opening in plan.", "在平面里选择楼梯间边界，或已有的竖井开口。"],
    k: "ui",
    pl: ["Plan — pick boundary", "平面 — 选择边界"]
  }, {
    t: ["Set base & top level", "设定起止楼层"],
    d: ["L1 → L20. The system reads each floor-to-floor height.", "L1 → L20。系统读取每层的层高。"],
    k: "ui",
    pl: ["Level range L1–L20", "楼层范围 L1–L20"]
  }, {
    t: ["Define the typical rule", "定义典型规则"],
    d: ["Run, width, landing, support, railing, baluster — clear, not nested dialogs.", "梯段、宽度、平台、支撑、栏杆、栏杆柱——清晰，而非嵌套对话框。"],
    k: "ui",
    pl: ["Typical stair rule", "典型楼梯规则"]
  }, {
    t: ["Preview the stair stack", "预览楼梯堆叠"],
    d: ["A non-committed preview: riser count, landing location, basic rule checks per level.", "未提交的预览：每层的踢面数、平台位置、基础规则校验。"],
    stack: "preview"
  }, {
    t: ["Mark exceptions", "标记例外"],
    d: ["L10 / L20 equipment floors become local overrides — not duplicate types.", "L10 / L20 设备层成为本地覆盖——而非复制类型。"],
    stack: "exc"
  }, {
    t: ["Apply after impact review", "影响审阅后应用"],
    d: ["See how many runs, landings, railings and views/tags are affected — then commit.", "先看会影响多少梯段、平台、栏杆与视图/标签——再提交。"],
    stack: "apply"
  }];
  const active = Math.min(steps.length - 1, Math.floor(mapRange(progress, 0.05, 0.97, 0, steps.length)));
  const s = steps[active];
  const floors = makeTower(14, {
    exceptionEvery: 5
  });
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    "data-screen-label": "05 Model-first setup",
    style: {
      height: "320vh",
      position: "relative",
      background: "#000"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      height: "100vh",
      display: "flex",
      alignItems: "center",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap mf-grid",
    style: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "0.92fr 1.08fr",
      gap: "clamp(28px,4vw,64px)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    idx: "05"
  }, t("Model-first setup", "明确建模，不靠魔法")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "clamp(1.7rem,1.2rem+1.6vw,2.5rem)",
      fontWeight: 500,
      color: "#fff",
      letterSpacing: "-0.025em",
      margin: "16px 0 8px",
      lineHeight: 1.12
    }
  }, t("Explicit modeling, not “generate me a stair.”", "明确的建模操作，而不是“帮我生成一部楼梯”。")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15.5,
      color: "var(--text-on-dark-mid)",
      marginBottom: 22,
      maxWidth: 440,
      lineHeight: 1.5
    }
  }, t("If the building exists but the stair doesn't yet, the flow stays in a Revit user's mental model.", "如果楼已经在、楼梯还没画，流程仍贴合 Revit 用户的心智。")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, steps.map((st, i) => {
    const on = i === active,
      done = i < active;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        gap: 13,
        padding: "9px 0",
        opacity: on || done ? 1 : 0.4,
        transition: "opacity .3s"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 24,
        height: 24,
        borderRadius: "50%",
        flex: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        fontWeight: 600,
        background: on ? "var(--accent)" : done ? "rgba(61,125,255,0.18)" : "transparent",
        color: on ? "#fff" : done ? "var(--accent)" : "var(--text-on-dark-lo)",
        border: "1px solid " + (on || done ? "var(--accent)" : "var(--line-on-dark-2)")
      }
    }, done ? "✓" : i + 1), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15.5,
        fontWeight: 600,
        color: on || done ? "#fff" : "var(--text-on-dark-mid)"
      }
    }, t(st.t[0], st.t[1])), on && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14.5,
        color: "var(--text-on-dark-mid)",
        marginTop: 3,
        maxWidth: 420
      }
    }, t(st.d[0], st.d[1]))));
  }))), /*#__PURE__*/React.createElement("div", {
    key: active,
    className: "scene-swap",
    style: {
      borderRadius: "var(--r-lg)",
      border: "1px solid var(--line-on-dark)",
      background: "#050608",
      padding: 22,
      aspectRatio: "4 / 3",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, s.stack ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 170
    }
  }, /*#__PURE__*/React.createElement(StairStack, {
    floors: floors,
    width: 170,
    floorHeight: 20,
    affected: s.stack === "exc" ? [4, 9] : s.stack === "apply" ? [0, 1, 2, 3, 5, 6, 7, 8] : [],
    dimUnhighlighted: s.stack === "exc",
    drawProgress: s.stack === "preview" ? mapRange(progress, 0.5, 0.62, 0, 1) : 1,
    showLabels: true,
    compact: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--text-on-dark-lo)",
      lineHeight: 1.7
    }
  }, s.stack === "preview" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, t("riser ✓", "踢面 ✓")), /*#__PURE__*/React.createElement("div", null, t("landing ✓", "平台 ✓")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--text-faint)"
    }
  }, t("not committed", "未提交"))), s.stack === "exc" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--exception-400)"
    }
  }, "L10 \xB7 ", t("Equip.", "设备")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--exception-400)"
    }
  }, "L20 \xB7 ", t("Equip.", "设备")), /*#__PURE__*/React.createElement("div", null, t("local override", "本地覆盖"))), s.stack === "apply" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, t("34 runs", "34 梯段")), /*#__PURE__*/React.createElement("div", null, t("17 landings", "17 平台")), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "var(--warn-400)"
    }
  }, t("1 warning", "1 警告"))))) : /*#__PURE__*/React.createElement(Placeholder, {
    kind: s.k,
    label: t(s.pl[0], s.pl[1]),
    sub: t("Self-made UI / model keyframe", "自制 UI / 模型关键帧"),
    style: {
      width: "100%",
      height: "100%",
      aspectRatio: "auto"
    }
  })))));
}
Object.assign(window, {
  VideoBackdrop,
  Hero,
  ChThesis,
  ChResearch,
  ChRootProblem,
  ChPrinciples,
  ChModelFirst
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "sections/chapters-a.jsx", error: String((e && e.message) || e) }); }

// sections/chapters-b.jsx
try { (() => {
// sections/chapters-b.jsx — UI chapters 06–12, built around the real StepWise screenshots.
const {
  useState: useB
} = React;
const UI = {
  system: "assets/ui/system-view.png",
  exception: "assets/ui/exception-manager.png",
  impact: "assets/ui/impact-preview.png"
};
function Head({
  idx,
  eye,
  title,
  copy,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    idx: idx
  }, eye), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "clamp(1.75rem,1.2rem+1.7vw,2.7rem)",
      fontWeight: 500,
      color: "#fff",
      letterSpacing: "-0.025em",
      margin: "14px 0 0",
      lineHeight: 1.12
    }
  }, title), copy && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      color: "var(--text-on-dark-mid)",
      marginTop: 12,
      lineHeight: 1.5,
      maxWidth: 460
    }
  }, copy));
}

/* framed real screenshot + positioned callouts. callouts: [{x,y,label,tone}] in % */
function RealUI({
  src,
  alt,
  callouts,
  dim
}) {
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      position: "relative",
      margin: 0,
      borderRadius: "var(--r-lg)",
      overflow: "hidden",
      border: "1px solid var(--line-on-dark-2)",
      boxShadow: "var(--shadow-float-dark)",
      background: "#0b0e13"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      display: "block",
      width: "100%",
      height: "auto",
      filter: dim ? "saturate(0.85) brightness(0.92)" : "none"
    }
  }), (callouts || []).map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: "absolute",
      left: c.x + "%",
      top: c.y + "%",
      transform: "translate(-50%,-50%)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "callout-ring",
    style: {
      borderColor: c.tone
    }
  }), c.label && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: "50%",
      top: "calc(100% + 6px)",
      transform: "translateX(-50%)",
      whiteSpace: "nowrap",
      fontFamily: "var(--font-mono)",
      fontSize: 10.5,
      color: "#fff",
      background: c.tone,
      padding: "3px 8px",
      borderRadius: "var(--r-pill)",
      boxShadow: "0 4px 14px rgba(0,0,0,0.5)"
    }
  }, c.label))));
}

/* 06 · Workspace reveal — the real hero UI, callouts fade in on scroll */
function ChWorkspace() {
  const {
    ref,
    progress
  } = useScrollProgress();
  const zones = [{
    x: 12,
    y: 42,
    tone: "var(--typical-500)",
    label: t("System View", "系统视图"),
    at: 0.30
  }, {
    x: 88,
    y: 38,
    tone: "var(--exception-500)",
    label: t("Scope", "范围"),
    at: 0.48
  }, {
    x: 96,
    y: 8,
    tone: "var(--warn-500)",
    label: t("Preview Impact", "预览影响"),
    at: 0.64
  }, {
    x: 50,
    y: 52,
    tone: "var(--accent)",
    label: t("Stair system · L12", "楼梯系统 · L12"),
    at: 0.20
  }];
  const shown = zones.filter(z => progress >= z.at);
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    "data-screen-label": "06 Workspace",
    style: {
      height: "230vh",
      position: "relative",
      background: "#000"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      height: "100vh",
      display: "flex",
      alignItems: "center",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(Head, {
    idx: "06",
    eye: t("The StepWise workspace", "StepWise 工作台"),
    title: t("A stair, as a visible, editable system.", "把楼梯变成一个可见、可编辑的系统。"),
    copy: t("System View · Model · Scope · Impact — the four regions of one workspace.", "系统视图 · 模型 · 范围 · 影响——同一工作台的四个区域。"),
    style: {
      maxWidth: 680,
      marginBottom: 22
    }
  }), /*#__PURE__*/React.createElement(RealUI, {
    src: UI.system,
    alt: "StepWise System View",
    callouts: shown
  }))));
}

/* 07 · Core flow — one workspace, real screenshots switch by scroll */
function ChFlow() {
  const {
    ref,
    progress
  } = useScrollProgress();
  const steps = [{
    s: ["Detect", "侦测"],
    t: ["L12 changed — review required.", "L12 改变了——需要复查。"],
    d: ["The system flags it. It does not change anything yet.", "系统先标记，但不擅自改动。"],
    img: UI.system,
    co: [{
      x: 14,
      y: 45,
      tone: "var(--warn-500)",
      label: "L12 · Warning"
    }, {
      x: 50,
      y: 50,
      tone: "var(--warn-500)"
    }]
  }, {
    s: ["Understand", "理解"],
    t: ["See what L12 actually touches.", "看清 L12 究竟牵动什么。"],
    d: ["Run, landing, railing, baluster, views/tags — the hidden hierarchy, made visible.", "梯段、平台、栏杆、栏杆柱、视图/标签——把隐藏的层级呈现出来。"],
    img: UI.system,
    co: [{
      x: 88,
      y: 70,
      tone: "var(--accent)",
      label: t("Related components", "关联组件")
    }]
  }, {
    s: ["Choose scope", "选范围"],
    t: ["Apply to all typical levels.", "应用到所有标准层。"],
    d: ["17 typical levels. L10 / L20 equipment-floor exceptions are preserved.", "17 个标准层。L10 / L20 的设备层例外被保留。"],
    img: UI.system,
    co: [{
      x: 88,
      y: 48,
      tone: "var(--accent)",
      label: t("All typical · 17", "所有标准 · 17")
    }]
  }, {
    s: ["Manage exceptions", "管例外"],
    t: ["Equipment floors keep their overrides.", "设备层保留各自的覆盖。"],
    d: ["Inherited vs overridden, side by side — compare, revert, apply to similar.", "继承 vs 覆盖，并排对比——比较、还原、应用到同类。"],
    img: UI.exception,
    co: [{
      x: 84,
      y: 52,
      tone: "var(--exception-500)",
      label: t("Inherited / Overridden", "继承 / 覆盖")
    }]
  }, {
    s: ["Preview impact", "预览影响"],
    t: ["Explain before you apply.", "应用之前，先解释。"],
    d: ["Proposed (blue) over current (grey), exceptions orange, warnings red — across geometry, types, docs.", "拟改（蓝）叠在现状（灰）上，例外橙、警告红——覆盖几何、类型、图纸。"],
    img: UI.impact,
    co: [{
      x: 50,
      y: 45,
      tone: "var(--typical-500)"
    }, {
      x: 88,
      y: 28,
      tone: "var(--warn-500)",
      label: t("Impact summary", "影响摘要")
    }]
  }, {
    s: ["Apply", "应用"],
    t: ["Commit — with control.", "提交——但掌控在手。"],
    d: ["Railing warning still open? “Apply with warning”, or review it first. The user commits.", "还有栏杆警告？可“带警告应用”，或先复查。由用户提交。"],
    img: UI.impact,
    co: [{
      x: 92,
      y: 95,
      tone: "var(--warn-500)",
      label: t("Apply changes", "应用更改")
    }]
  }];
  const active = Math.min(steps.length - 1, Math.floor(mapRange(progress, 0.04, 0.98, 0, steps.length)));
  const s = steps[active];
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    "data-screen-label": "07 Core flow",
    style: {
      height: "440vh",
      position: "relative",
      background: "#000"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      height: "100vh",
      display: "flex",
      alignItems: "center",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap flow-grid",
    style: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "0.62fr 1.05fr",
      gap: "clamp(24px,3.5vw,56px)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    idx: "07"
  }, t("Core flow · L12 changed", "核心流程 · L12 变更")), /*#__PURE__*/React.createElement("div", {
    key: active,
    className: "scene-swap",
    style: {
      marginTop: 18,
      minHeight: 196
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--accent)",
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-on-dark-lo)"
    }
  }, String(active + 1).padStart(2, "0")), t(s.s[0], s.s[1])), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "clamp(1.7rem,1.2rem+1.6vw,2.55rem)",
      fontWeight: 500,
      color: "#fff",
      letterSpacing: "-0.025em",
      lineHeight: 1.1
    }
  }, t(s.t[0], s.t[1])), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      color: "var(--text-on-dark-mid)",
      marginTop: 14,
      lineHeight: 1.55,
      maxWidth: 420
    }
  }, t(s.d[0], s.d[1]))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginTop: 26
    }
  }, steps.map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "scene__tick" + (i === active ? " is-active" : "") + (i < active ? " is-done" : "")
  })))), /*#__PURE__*/React.createElement("div", {
    key: "img" + active,
    className: "scene-swap"
  }, /*#__PURE__*/React.createElement(RealUI, {
    src: s.img,
    alt: t(s.t[0], s.t[1]),
    callouts: s.co
  })))));
}

/* 08 · Stair network — the real impact view, West Stair related-system notice */
function ChNetwork() {
  const {
    ref,
    progress
  } = useScrollProgress();
  const co = progress > 0.45 ? [{
    x: 78,
    y: 36,
    tone: "var(--exception-500)",
    label: t("West Stair · related", "西楼梯 · 关联")
  }, {
    x: 92,
    y: 82,
    tone: "var(--exception-500)",
    label: t("Review suggested", "建议复查")
  }] : [{
    x: 50,
    y: 45,
    tone: "var(--accent)",
    label: t("East Stair · active", "东楼梯 · 活动")
  }];
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    "data-screen-label": "08 Stair network",
    style: {
      height: "210vh",
      position: "relative",
      background: "#000"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      height: "100vh",
      display: "flex",
      alignItems: "center",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap flow-grid",
    style: {
      width: "100%",
      display: "grid",
      gridTemplateColumns: "0.6fr 1.05fr",
      gap: "clamp(24px,3.5vw,56px)",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Head, {
    idx: "08",
    eye: t("Building stair network", "建筑楼梯网络"),
    title: t("Many systems. Visible, not auto-linked.", "多套系统。可见，但不自动联动。"),
    copy: t("Anna edits East Stair; StepWise surfaces that West Stair has a corresponding L12 condition — and suggests a review. It never changes West silently.", "Anna 编辑东楼梯；StepWise 提示西楼梯在 L12 有对应条件，并建议复查。它绝不静默改动西楼梯。")
  }), /*#__PURE__*/React.createElement(RealUI, {
    src: UI.impact,
    alt: "Stair network \u2014 related system",
    callouts: co,
    dim: true
  }))));
}

/* 09 · Supporting detail lab — 2x2, four different micro-demos incl AI boundary */
function ChLab() {
  const [ref, inView] = useInView(0.2);
  const cells = [{
    l: ["Visual Parameter Explainer", "参数可视解释"],
    d: ["Hover a parameter → its geometry lights up, with a before/after preview.", "悬停参数 → 对应几何点亮，附前后预览。"],
    k: "ui"
  }, {
    l: ["Connected Component Map", "连接组件图"],
    d: ["Click a landing → its runs, railings, balusters, views/tags surface.", "点击平台 → 它的梯段、栏杆、栏杆柱、视图/标签浮现。"],
    k: "ui"
  }, {
    l: ["Smart Reconcile", "智能协调"],
    d: ["A run change suggests reconcile options — preview, never silent auto-edit.", "梯段变化时给出协调建议——预览，绝不静默自动改。"],
    k: "ui"
  }, {
    l: ["AI: prepare, don't commit", "AI：准备，不提交"],
    d: ["Explain · query · summarize · prepare options. Scope / Preview / Apply stay human.", "解释 · 查询 · 总结 · 准备选项。范围 / 预览 / 应用始终由人掌控。"],
    k: "abstract",
    ai: true
  }];
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "09 Supporting lab",
    className: "slide",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(Head, {
    idx: "09",
    eye: t("Supporting detail lab", "支撑细节实验室"),
    title: t("Small details make the system trustworthy.", "小细节让系统值得信任。"),
    copy: t("AI can prepare decisions. Users commit decisions.", "AI 可以准备决策。用户提交决策。"),
    style: {
      maxWidth: 680,
      marginBottom: 28
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    },
    className: "ch12-grid"
  }, cells.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderRadius: "var(--r-lg)",
      border: "1px solid " + (c.ai ? "rgba(61,125,255,0.3)" : "var(--line-on-dark)"),
      background: "#070a0f",
      overflow: "hidden",
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateY(20px)",
      transition: `all .5s ${i * 0.1}s var(--ease-out)`,
      display: "flex",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "13px 16px",
      borderBottom: "1px solid var(--line-on-dark)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: "#fff"
    }
  }, t(c.l[0], c.l[1])), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-on-dark-mid)",
      marginTop: 3,
      lineHeight: 1.45
    }
  }, t(c.d[0], c.d[1]))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      flex: 1,
      minHeight: 140
    }
  }, c.ai ? /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      minHeight: 120,
      borderRadius: "var(--r-md)",
      background: "radial-gradient(60% 80% at 50% 50%, rgba(61,125,255,0.16), transparent 70%)",
      border: "1px dashed rgba(61,125,255,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 16
    }
  }, [["Explain", "解释"], ["Query", "查询"], ["Summarize", "总结"], ["Prepare", "准备"]].map((a, k) => /*#__PURE__*/React.createElement("span", {
    key: k,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10.5,
      color: "var(--typical-300)"
    }
  }, t(a[0], a[1])))) : /*#__PURE__*/React.createElement(Placeholder, {
    kind: c.k,
    label: t("Micro-demo", "微演示"),
    sub: t(c.l[0], c.l[1]),
    style: {
      height: "100%",
      minHeight: 120,
      aspectRatio: "auto"
    }
  })))))));
}

/* 10 · MVP scope board — In / Out + the core loop */
function ChMVP() {
  const [ref, inView] = useInView(0.25);
  const inn = [["System View", "系统视图"], ["Scope Selector", "范围选择器"], ["Exception Manager", "例外管理器"], ["Impact Preview", "影响预览"], ["Connected warnings", "连接警告"], ["Related system notice", "关联系统提示"]];
  const out = [["Redo the creation toolbar", "重做创建工具栏"], ["Full code-compliance engine", "完整合规引擎"], ["AI auto-generate stairs", "AI 自动生成楼梯"], ["Replace Revit's type system", "替换 Revit 类型系统"], ["Auto-sync all stair systems", "自动同步所有楼梯"]];
  const loop = [["Detect", "侦测"], ["Scope", "范围"], ["Exceptions", "例外"], ["Preview", "预览"], ["Apply", "应用"]];
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "10 MVP scope",
    className: "slide",
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(Head, {
    idx: "10",
    eye: t("MVP scope", "MVP 取舍"),
    title: t("Solve maintenance first. Keep Revit's precision.", "先解决维护。保留 Revit 的精确。"),
    style: {
      maxWidth: 680,
      marginBottom: 28
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      flexWrap: "wrap",
      marginBottom: 28
    }
  }, loop.map((l, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 13.5,
      color: "#fff",
      border: "1px solid var(--accent)",
      background: "rgba(61,125,255,0.1)",
      borderRadius: "var(--r-pill)",
      padding: "8px 16px",
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateY(10px)",
      transition: `all .4s ${i * 0.08}s`
    }
  }, t(l[0], l[1])), i < loop.length - 1 && /*#__PURE__*/React.createElement(Icon, {
    name: "arrowR",
    size: 15,
    color: "var(--text-on-dark-lo)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    },
    className: "ch12-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--r-lg)",
      border: "1px solid rgba(30,174,110,0.3)",
      background: "rgba(30,174,110,0.04)",
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot dot--ok"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      color: "var(--text-on-dark-hi)"
    }
  }, t("In MVP", "MVP 包含"))), inn.map((x, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 9,
      fontSize: 14.5,
      color: "var(--text-on-dark-mid)",
      padding: "6px 0"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14,
    color: "var(--ok-400)",
    style: {
      flex: "none",
      marginTop: 1
    }
  }), t(x[0], x[1])))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--r-lg)",
      border: "1px solid var(--line-on-dark)",
      background: "#070a0f",
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--text-on-dark-lo)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13.5,
      fontWeight: 600,
      color: "var(--text-on-dark-lo)"
    }
  }, t("Out of MVP", "MVP 不做"))), out.map((x, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 9,
      fontSize: 14.5,
      color: "var(--text-on-dark-lo)",
      padding: "6px 0"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      textAlign: "center",
      flex: "none"
    }
  }, "\u2014"), t(x[0], x[1])))))));
}

/* 11 · Success metrics — before / after workflow timeline */
function ChMetrics() {
  const {
    ref,
    progress
  } = useScrollProgress();
  const reveal = progress > 0.4;
  const before = [["Open nested dialogs", "打开嵌套对话框"], ["Copy / paste vertically", "纵向复制粘贴"], ["Duplicate types", "复制类型"], ["Hunt for impact", "排查影响"], ["Hope nothing broke", "祈祷没弄坏"]];
  const after = [["Detect", "侦测"], ["Scope", "范围"], ["Exceptions", "例外"], ["Preview", "预览"], ["Apply", "应用"]];
  const metrics = [["Update time", "更新耗时", "↓", "½ day → minutes", "半天 → 几分钟"], ["Duplicate types", "重复类型", "↓", "fewer, traceable", "更少、可追踪"], ["Missed updates", "漏改", "↓", "landing / railing", "平台 / 栏杆"], ["Confidence before Apply", "应用前的信心", "↑", "predictable", "可预测"]];
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    "data-screen-label": "11 Success metrics",
    style: {
      height: "230vh",
      position: "relative",
      background: "#000"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "sticky",
      top: 0,
      height: "100vh",
      display: "flex",
      alignItems: "center",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement(Head, {
    idx: "11",
    eye: t("Success metrics", "成功指标"),
    title: t("From an afternoon to a short, legible flow.", "从一个下午，到一条简短、可读的流程。"),
    style: {
      maxWidth: 680,
      marginBottom: 26
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16,
      marginBottom: 18
    },
    className: "ch12-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--r-lg)",
      border: "1px solid var(--line-on-dark)",
      background: "#070a0f",
      padding: 18,
      opacity: 0.6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10.5,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--warn-400)",
      marginBottom: 12
    }
  }, t("Before", "之前")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, before.map((b, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--text-on-dark-mid)",
      border: "1px solid var(--line-on-dark)",
      borderRadius: "var(--r-sm)",
      padding: "5px 9px"
    }
  }, t(b[0], b[1]))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: "var(--r-lg)",
      border: "1px solid var(--accent)",
      background: "rgba(61,125,255,0.05)",
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10.5,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--accent)",
      marginBottom: 12
    }
  }, t("After", "之后")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap"
    }
  }, after.map((a, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "#fff",
      background: "rgba(61,125,255,0.16)",
      borderRadius: "var(--r-sm)",
      padding: "5px 9px"
    }
  }, t(a[0], a[1])), i < after.length - 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-on-dark-lo)"
    }
  }, "\u2192")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 12
    },
    className: "metrics-grid"
  }, metrics.map((m, i) => {
    const up = m[2] === "↑";
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderRadius: "var(--r-md)",
        border: "1px solid var(--line-on-dark)",
        background: "var(--bg-canvas-raised)",
        padding: 16,
        opacity: reveal ? 1 : 0.3,
        transform: reveal ? "none" : "translateY(12px)",
        transition: `all .45s ${i * 0.08}s`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "var(--text-on-dark-mid)",
        marginBottom: 8,
        lineHeight: 1.3
      }
    }, t(m[0], m[1])), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-display)",
        fontSize: 24,
        fontWeight: 600,
        color: up ? "var(--ok-400)" : "var(--accent)"
      }
    }, m[2]), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        color: "var(--text-on-dark-lo)",
        marginTop: 6
      }
    }, t(m[3], m[4])));
  })))));
}

/* 12 · Closing */
function ChClosing() {
  return /*#__PURE__*/React.createElement("section", {
    "data-screen-label": "12 Closing",
    className: "slide",
    style: {
      flexDirection: "column",
      justifyContent: "space-between",
      paddingBottom: 34,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ph ph-bg",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ph__inner"
  }, /*#__PURE__*/React.createElement(Placeholder, {
    kind: "model",
    label: t("Complexity resolves to a clean stair system", "复杂收束为干净的楼梯系统"),
    sub: t("Parameter windows fade · lines contract · warnings clear · camera settles", "参数窗口淡出 · 连线收束 · 警告消失 · 镜头定格"),
    style: {
      border: 0,
      background: "transparent",
      padding: 0
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      position: "relative",
      zIndex: 2,
      marginTop: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 920
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, t("Closing · 12", "结语 · 12"))), /*#__PURE__*/React.createElement("h2", {
    className: "reveal",
    "data-delay": "1",
    style: {
      fontSize: "clamp(2rem,1.2rem+3.4vw,3.9rem)",
      fontWeight: 500,
      letterSpacing: "-0.03em",
      lineHeight: 1.08,
      marginTop: 22,
      color: "#fff",
      textWrap: "balance"
    }
  }, t("StepWise doesn't make stairs less complex.", "StepWise 不会让楼梯变得不复杂。"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--typical-400)"
    }
  }, t("It makes complexity visible, scoped and predictable.", "它让复杂变得可见、可界定、可预测。"))))), /*#__PURE__*/React.createElement("div", {
    className: "wrap",
    style: {
      position: "relative",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    "data-delay": "2",
    style: {
      borderTop: "1px solid rgba(255,255,255,0.14)",
      paddingTop: 22,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: 16,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--accent)"
    }
  }, t("The thesis", "核心主张")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "clamp(1.5rem,1rem+2vw,2.6rem)",
      fontWeight: 500,
      color: "#fff",
      letterSpacing: "-0.02em",
      marginTop: 10,
      lineHeight: 1.1
    }
  }, t("Manage stair intent — not stair accidents.", "管理楼梯的设计意图——而不是意外。"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "rgba(255,255,255,0.5)",
      letterSpacing: "0.06em",
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#fff",
      fontFamily: "var(--font-display)",
      fontWeight: 600,
      fontSize: 14
    }
  }, "StepWise ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,0.5)",
      fontWeight: 500
    }
  }, "for Revit")), t("Autodesk Revit case study · 2026", "Autodesk Revit 案例研究 · 2026")))));
}
Object.assign(window, {
  ChWorkspace,
  ChFlow,
  ChNetwork,
  ChLab,
  ChMVP,
  ChMetrics,
  ChClosing
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "sections/chapters-b.jsx", error: String((e && e.message) || e) }); }

})();
