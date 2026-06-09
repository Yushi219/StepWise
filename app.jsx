// app.jsx — composes the case study, top bar, and progress rail.
const { useState: useAppState, useEffect: useAppEffect, useRef: useAppRef } = React;

/* Autodesk-agnostic concept wordmark: a small stair glyph */
function StairGlyph({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 20h4v-4h4v-4h4V8h4V4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 20h4v-4h4v-4h4V8h4V4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0" />
    </svg>);

}

function TopBar() {
  const lang = useLang();
  // Hide the EN/中 toggle by default; reveal it only when the cursor approaches the
  // top-right corner AND we are still on the home screen (hero in view).
  const [showLang, setShowLang] = useAppState(false);
  useAppEffect(() => {
    const atHome = () => (window.pageYOffset || document.documentElement.scrollTop || 0) < window.innerHeight * 0.6;
    const onMove = (e) => {
      const near = e.clientX >= window.innerWidth - 240 && e.clientY <= 140;
      setShowLang(near && atHome());
    };
    const onScroll = () => { if (!atHome()) setShowLang(false); };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("scroll", onScroll); };
  }, []);
  return (
    <div className="topbar">
      <div className="topbar__brand">
        <StairGlyph />
        <span className="topbar__name">StepWise <span style={{ color: "var(--text-on-dark-lo)", fontWeight: 500 }}>for Revit</span></span>
      </div>
      <div className="lang-toggle" role="group" aria-label="Language" style={{ opacity: showLang ? 1 : 0, pointerEvents: showLang ? "auto" : "none", transition: "opacity .25s var(--ease-out)" }}>
        <button className={"lang-toggle__btn" + (lang === "en" ? " is-active" : "")} onClick={() => setLang("en")}>EN</button>
        <span className="lang-toggle__sep" />
        <button className={"lang-toggle__btn" + (lang === "zh" ? " is-active" : "")} onClick={() => setLang("zh")}>中</button>
      </div>
    </div>);

}

function ProgressRail({ sections }) {
  const [active, setActive] = useAppState(0);
  useAppEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let best = 0,bestDist = Infinity;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {best = i;bestDist = 0;} else
        {
          const d = Math.min(Math.abs(r.top - mid), Math.abs(r.bottom - mid));
          if (bestDist > 0 && d < bestDist) {bestDist = d;best = i;}
        }
      });
      setActive(best);
    };
    const onScroll = () => {if (!raf) raf = requestAnimationFrame(check);};
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {window.removeEventListener("scroll", onScroll);window.removeEventListener("resize", onScroll);if (raf) cancelAnimationFrame(raf);};
  }, []);
  return (
    <nav className="rail" aria-label="Section navigation">
      {sections.map((s, i) =>
      <button key={s.id} className={"rail__item" + (i === active ? " is-active" : "")}
      onClick={() => {const el = document.getElementById(s.id);if (el) window.scrollTo({ top: el.offsetTop + 2, behavior: "smooth" });}}>
          <span className="rail__label">{t(s.label[0], s.label[1])}</span>
          <span className="rail__tick" />
        </button>
      )}
    </nav>);

}

function ScrollProgressBar() {
  const [w, setW] = useAppState(0);
  useAppEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setW(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {window.removeEventListener("scroll", onScroll);window.removeEventListener("resize", onScroll);};
  }, []);
  return <div className="scrollbar-top" style={{ width: (w * 100).toFixed(2) + "%" }} />;
}

const SECTIONS = [
{ id: "hero", label: ["Intro", "开场"], el: () => <Hero /> },
{ id: "ch01", label: ["Direction", "方向"], el: () => <ChThesis /> },
{ id: "ch02", label: ["Problem", "问题"], el: () => <ChResearch /> },
{ id: "ch03", label: ["Research", "研究"], el: () => <ChRootProblem /> },
{ id: "ch04", label: ["Principles", "原则"], el: () => <ChPrinciples /> },
{ id: "ch05", label: ["Adopt", "接入"], el: () => <ChModelFirst /> },
{ id: "arch", label: ["Fit", "融合"], el: () => <ChArchitecture /> },
{ id: "ch06", label: ["Workspace", "工作台"], el: () => <ChWorkspace /> },
{ id: "ch07", label: ["Core flow", "操作流"], el: () => <ChFlow /> },
{ id: "ch08", label: ["AI", "AI助手"], el: () => <ChNetwork /> },
{ id: "ch09", label: ["Details", "细节"], el: () => <ChLab /> },
{ id: "ch10", label: ["MVP", "取舍"], el: () => <ChMVP /> },
{ id: "ch11", label: ["Metrics", "指标"], el: () => <ChMetrics /> },
{ id: "closing", label: ["Close", "结语"], el: () => <ChClosing /> }];


function App() {
  const lang = useLang();
  // Global reveal-on-scroll. Uses a scroll listener + getBoundingClientRect rather
  // than IntersectionObserver, which does not fire reliably in preview/iframe
  // rendering contexts (it would leave every section stuck at opacity:0).
  useAppEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
      return;
    }
    let raf = 0;
    const check = () => {
      raf = 0;
      const vh = window.innerHeight;
      document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => {
        const r = el.getBoundingClientRect();
        // reveal anything whose top has crossed the trigger line — including
        // elements already scrolled past, so jumps/fast scroll never strand content.
        if (r.top < vh * 0.92) el.classList.add("is-in");
      });
    };
    const onScroll = () => {if (!raf) raf = requestAnimationFrame(check);};
    // initial + delayed scans (sections mount as Babel scripts resolve)
    check();
    const timers = [80, 240, 600, 1200].map((d) => setTimeout(check, d));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const mo = new MutationObserver(onScroll);
    mo.observe(document.getElementById("root"), { childList: true, subtree: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mo.disconnect();timers.forEach(clearTimeout);if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // On language switch, content reflows — re-run the reveal scan so anything
  // now in view stays visible.
  useAppEffect(() => {
    const id = requestAnimationFrame(() => window.dispatchEvent(new Event("scroll")));
    return () => cancelAnimationFrame(id);
  }, [lang]);

  return (
    <div className="site-root">
      <VideoBackdrop />
      <ScrollProgressBar />
      <TopBar />
      <ProgressRail sections={SECTIONS.filter((s) => isReady(s))} />
      {SECTIONS.filter((s) => isReady(s)).map((s) =>
      <div key={s.id} id={s.id}>{s.el()}</div>
      )}
    </div>);

}
function componentName(s) {return s.id;}
function isReady(s) {
  const map = {
    hero: "Hero", ch01: "ChThesis", ch02: "ChResearch", ch03: "ChRootProblem", ch04: "ChPrinciples", ch05: "ChModelFirst", arch: "ChArchitecture",
    ch06: "ChWorkspace", ch07: "ChFlow", ch08: "ChNetwork", ch09: "ChLab", ch10: "ChMVP",
    ch11: "ChMetrics", closing: "ChClosing"
  };
  return typeof window[map[s.id]] === "function";
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);