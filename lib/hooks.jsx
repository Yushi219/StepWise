// lib/hooks.jsx — scroll, reveal, in-view, count-up
const { useState, useEffect, useRef, useCallback } = React;

/* Reveal-on-scroll: attach ref to any element; toggles .is-in once visible.
   Scroll-based for preview/iframe reliability. */
function useReveal(options) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in"); setShown(true); return;
    }
    let raf = 0;
    const check = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) {
        el.classList.add("is-in"); setShown(true);
        if (!(options && options.repeat)) cleanup();
      } else if (options && options.repeat) {
        el.classList.remove("is-in"); setShown(false);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    const cleanup = () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
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
    const el = ref.current; if (!el) return;
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
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    check();
    const timers = [80, 300, 700].map((d) => setTimeout(check, d));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); timers.forEach(clearTimeout); if (raf) cancelAnimationFrame(raf); };
  }, [threshold]);
  return [ref, inView];
}

/* Scroll progress 0..1 through a tall pinned section.
   Returns {ref, progress}. Attach ref to the OUTER tall wrapper. */
function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
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
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return { ref, progress };
}

/* Count up a number when it enters view. */
function useCountUp(target, opts) {
  const [ref, inView] = useInView((opts && opts.threshold) || 0.6);
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;
    const dur = (opts && opts.duration) || 1100;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      setVal(target * ease(t));
      if (t < 1) requestAnimationFrame(tick);
      else setVal(target);
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

Object.assign(window, { useReveal, useInView, useScrollProgress, useCountUp, clamp, mapRange });
