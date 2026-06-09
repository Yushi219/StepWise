// sections/chapters-a.jsx — intro act (Thesis → Research → Root Problem → Principles)
// over a scroll-scrubbed 3-clip video backdrop, plus Model-first setup.
const { useState: useA, useEffect: useAE, useRef: useARef } = React;

/* Fixed video backdrop. Four clips (1→2→3→4) scrubbed frame-by-frame by scroll
   across the intro act: hero → Model-first setup (#ch05). Muted and PAUSED — we
   drive currentTime from scroll position, so scrolling forward plays forward and
   scrolling back rewinds, seamlessly across clip boundaries.

   Timing contract (durations read LIVE from the files; ~10.04 / 10.04 / 10.10 / 10.10s,
   total ≈ 40.29s):
     • When #ch05's text reaches screen centre — i.e. its sticky pin engages and
       rect.top = 0 — the global timeline is at clip1 + clip2 + 6.000s = 26.084s,
       so clip 3 is at EXACTLY its 6-second mark.
       (pre-anchor budget  = clip1 + clip2 + first 6.000s of clip3)
     • As #ch05 scrolls away — its pin releases at offsetHeight − vh — the timeline
       reaches the very end, so clip 4 finishes EXACTLY then.
       (post-anchor budget = remaining 4.101s of clip3 + all 10.101s of clip4)
   The scroll→time map is piecewise-linear, anchored to those two LIVE positions,
   so the contract holds no matter how the section heights change. */
function VideoBackdrop() {
  const v0 = useARef(null),v1 = useARef(null),v2 = useARef(null),v3 = useARef(null),v4 = useARef(null),v5 = useARef(null),v6 = useARef(null),v7 = useARef(null);
  const layer = useARef(null);
  const lastIdx = useARef(-1);
  useAE(() => {
    const vids = [v0.current, v1.current, v2.current, v3.current, v4.current, v5.current, v6.current, v7.current];
    // Fetch each clip fully into memory as a Blob → makes it seekable so scroll can
    // scrub currentTime frame-by-frame (the static server has no byte-range support).
    const urls = [];
    ["assets/video/1.mp4", "assets/video/2.mp4", "assets/video/3.mp4", "assets/video/4.mp4", "assets/video/5.mp4", "assets/video/6.mp4", "assets/video/7.mp4", "assets/video/8.mp4"].forEach((src, i) => {
      const v = vids[i];if (!v) return;v.muted = true;v.pause();
      fetch(src).then((r) => r.blob()).then((b) => {const u = URL.createObjectURL(b);urls[i] = u;v.src = u;v.load();}).catch(() => {});
    });
    const setActive = (idx) => {vids.forEach((v, i) => {if (v) v.style.opacity = i === idx ? "1" : "0";});};
    setActive(0);

    const ANCHOR_CLIP_T = 6.0;        // clip 3 must sit here when #ch05 centres
    const smoothT = [0, 0, 0, 0, 0, 0, 0, 0];  // lerped currentTime per clip
    let rafId = 0;
    const loop = () => {
      const hero = document.getElementById("hero");
      const ch05 = document.getElementById("ch05");
      const durs = vids.map((v) => v && isFinite(v.duration) ? v.duration : 0);
      if (hero && ch05 && durs.every((d) => d > 0)) {
        const vh = window.innerHeight;
        const sy = window.pageYOffset || document.documentElement.scrollTop || 0;
        // continuous-timeline offsets (6 clips)
        const cum = [0]; for (let i = 1; i < 8; i++) cum[i] = cum[i - 1] + durs[i - 1];
        const clip4End = cum[4], clip5End = cum[5], clip6End = cum[6];
        const total = cum[7] + durs[7];                                  // end of clip8 (page end)
        const anchorTime = cum[2] + ANCHOR_CLIP_T;                       // clip3 @ 6s
        // live scroll milestones (absolute document coords)
        const heroTop = hero.getBoundingClientRect().top + sy;           // timeline t=0
        const ch05Top = ch05.getBoundingClientRect().top + sy;           // text centres (pin engages)
        const pinEnd = ch05Top + Math.max(1, ch05.offsetHeight - vh);    // pin releases — clip4 ends
        const ch07 = document.getElementById("ch07");
        const ch07Top = ch07 ? ch07.getBoundingClientRect().top + sy : pinEnd + vh * 4;   // clip5 ends
        const ch09 = document.getElementById("ch09");
        const ch09Top = ch09 ? ch09.getBoundingClientRect().top + sy : ch07Top + vh * 6;  // clip6 ends, right after the AI chapter
        const docBottom = Math.max(ch09Top + vh, (document.documentElement.scrollHeight || 0) - vh);  // clips 7–8 run to here
        // piecewise-linear scroll → global video time. clips 1–4 scrub hero→ch05; clip5
        // covers the architecture + workspace chapters; clip6 runs through the flagship +
        // AI chapters; clips 7–8 carry the remaining chapters to the closing.
        const vt = sy <= ch05Top ? mapRange(sy, heroTop, ch05Top, 0, anchorTime) :
        sy <= pinEnd ? mapRange(sy, ch05Top, pinEnd, anchorTime, clip4End) :
        sy <= ch07Top ? mapRange(sy, pinEnd, ch07Top, clip4End, clip5End) :
        sy <= ch09Top ? mapRange(sy, ch07Top, ch09Top, clip5End, clip6End) :
        mapRange(sy, ch09Top, docBottom, clip6End, total);
        // which clip owns this instant + its local time
        let idx = 0;
        if (vt >= cum[7]) idx = 7;else if (vt >= cum[6]) idx = 6;else if (vt >= cum[5]) idx = 5;else if (vt >= cum[4]) idx = 4;else if (vt >= cum[3]) idx = 3;else if (vt >= cum[2]) idx = 2;else if (vt >= cum[1]) idx = 1;else idx = 0;
        const local = Math.min(durs[idx] - 0.03, Math.max(0, vt - cum[idx]));
        // on a clip switch, snap the incoming clip to its frame so the crossfade
        // blends matching frames (clips are authored to connect seamlessly).
        if (idx !== lastIdx.current) {
          lastIdx.current = idx;smoothT[idx] = local;
          const vv = vids[idx];if (vv) {try {vv.currentTime = local;} catch (e) {}}
          setActive(idx);
        }
        const v = vids[idx];
        if (v) {
          smoothT[idx] += (local - smoothT[idx]) * 0.3;                  // smoothing lerp
          // clips are all-intra (every frame a keyframe) so a seek lands in ~1 frame;
          // only issue the next seek once the previous finished (v.seeking) so seeks
          // never backlog → silky scrub instead of stutter.
          if (!v.seeking && Math.abs(v.currentTime - smoothT[idx]) > 0.004) {try {v.currentTime = smoothT[idx];} catch (e) {}}
        }
        // Clips 7–8 now carry the backdrop through the rest of the page, so keep it
        // visible all the way to the closing (the legibility veil handles contrast).
        if (layer.current) layer.current.style.opacity = "1";
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {cancelAnimationFrame(rafId);urls.forEach((u) => u && URL.revokeObjectURL(u));};
  }, []);
  const vs = () => ({ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0, transition: "opacity .28s linear", willChange: "opacity" });
  return (
    <div ref={layer} aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, background: "#000", pointerEvents: "none" }}>
      <video ref={v0} muted playsInline preload="auto" style={vs()} />
      <video ref={v1} muted playsInline preload="auto" style={vs()} />
      <video ref={v2} muted playsInline preload="auto" style={vs()} />
      <video ref={v3} muted playsInline preload="auto" style={vs()} />
      <video ref={v4} muted playsInline preload="auto" style={vs()} />
      <video ref={v5} muted playsInline preload="auto" style={vs()} />
      <video ref={v6} muted playsInline preload="auto" style={vs()} />
      <video ref={v7} muted playsInline preload="auto" style={vs()} />
    </div>);

}

/* intro text block with a soft scrim for legibility over video. side: 'left' | 'right'.
   Full-bleed flex so a right block hugs the true right gutter (over the video's black). */
function IntroBlock({ side = "left", children, max = 480 }) {
  const isR = side === "right";
  return (
    <div style={{ position: "relative", zIndex: 2, width: "100%", paddingInline: "clamp(26px, 5.5vw, 112px)", display: "flex", justifyContent: isR ? "flex-end" : "flex-start" }}>
      <div style={{ width: "min(100%, " + max + "px)", padding: "26px 30px", borderRadius: 18, textAlign: "left", background: isR ? "radial-gradient(135% 135% at 78% 50%, rgba(0,0,0,0.66), transparent 76%)" : "radial-gradient(135% 135% at 22% 50%, rgba(0,0,0,0.66), transparent 76%)" }}>
        {children}
      </div>
    </div>);

}
function DwellDots({ progress, n = 4, color = "var(--accent)" }) {
  const lit = Math.round(mapRange(progress, 0.12, 0.9, 0, n));
  return (
    <div style={{ display: "flex", gap: 7, marginTop: 24, alignItems: "center" }}>
      {Array.from({ length: n }).map((_, i) =>
      <span key={i} style={{ width: i < lit ? 22 : 7, height: 7, borderRadius: 7, background: i < lit ? color : "var(--line-on-dark-2)", transition: "all .35s var(--ease-out)" }} />
      )}
    </div>);

}
const introSection = { minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", background: "transparent", paddingBlock: "12vh" };

/* 00 · Thesis intro — title, video 1 (left black) → text left */
function Hero() {
  return (
    <section data-screen-label="00 Thesis" style={{ ...introSection, height: "150vh", alignItems: "flex-end" }}>
      <div style={{ position: "sticky", bottom: "12vh", width: "100%" }}>
        <IntroBlock side="left" max={780}>
          <div className="reveal"><Eyebrow>{t("Autodesk Revit · UX case study", "Autodesk Revit · 体验设计案例")}</Eyebrow></div>
          <h1 className="reveal" data-delay="1" style={{ fontSize: "clamp(3rem, 1.8rem + 6.5vw, 6.8rem)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 0.95, color: "#fff", marginTop: 20 }}>StepWise <span style={{ color: "var(--text-on-dark-mid)", fontWeight: 400 }}>for Revit</span></h1>
          <p className="reveal" data-delay="2" style={{ fontSize: "clamp(1.15rem, 0.9rem + 1vw, 1.6rem)", marginTop: 22, letterSpacing: "-0.01em" }}><span style={{ color: "#fff" }}>{t("Edit globally. ", "全局编辑，")}</span><span style={{ color: "var(--exception-400)" }}>{t("Vary locally. ", "局部例外，")}</span><span style={{ color: "var(--typical-400)" }}>{t("Preview impact.", "影响可见。")}</span></p>
          <div className="reveal scroll-hint" data-delay="3" style={{ marginTop: 40 }}><span className="scroll-hint__bar"><span className="scroll-hint__dot" /></span><span>{t("Scroll", "向下滚动")}</span></div>
        </IntroBlock>
      </div>
    </section>);

}

/* Reliable right-side act stage. The section is a plain BLOCK (not flex), so the
   sticky child's width:100% resolves to the full viewport — fixing the earlier
   flex-shrink bug that pulled the text toward centre. The scroll-driven graphic
   sits on the LEFT (over the video); the text block hugs the RIGHT gutter. */
function RightAct({ inRef, label, height, graphic, graphicAlign = "left", graphicWidth, textMax = 470, graphicPE = false, children }) {
  const gCenter = graphicAlign === "center";
  const gw = graphicWidth || (gCenter ? "min(50%, 540px)" : "min(52%, 600px)");
  return (
    <section ref={inRef} data-screen-label={label} style={{ height: height, position: "relative", background: "transparent" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {graphic &&
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: gCenter ? "center" : "flex-start", paddingLeft: gCenter ? 0 : "clamp(20px,5vw,96px)", pointerEvents: graphicPE ? "auto" : "none" }}>
            <div style={{ position: "relative", width: gw }}>{graphic}</div>
          </div>}
        <div style={{ position: "relative", height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingInline: "clamp(26px,5.5vw,112px)", pointerEvents: "none" }}>
          <div style={{ width: "min(100%, " + textMax + "px)", padding: "28px 30px", borderRadius: 18, background: "radial-gradient(150% 130% at 84% 50%, rgba(4,6,11,0.88), rgba(4,6,11,0.5) 52%, transparent 82%)", pointerEvents: "auto" }}>
            {children}
          </div>
        </div>
      </div>
    </section>);

}

/* slim scroll/dwell indicator — fills as the interaction completes, then holds */
function ActProgress({ progress, tint = "var(--accent)" }) {
  const p = clamp(progress, 0, 1),done = p > 0.6;
  return (
    <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ position: "relative", width: 200, maxWidth: "62%", height: 2, background: "var(--line-on-dark-2)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, transformOrigin: "left", transform: "scaleX(" + p.toFixed(3) + ")", background: tint, transition: "transform .12s linear" }} />
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.05em", color: done ? "var(--ok-400)" : "var(--text-on-dark-lo)", transition: "color .3s" }}>{done ? t("hold ·", "停留 ·") : t("scroll", "向下滚动")}</span>
    </div>);

}

/* 01 · Product direction — Revit 2027 folds the Options Bar into the contextual
   ribbon. Left graphic: a scroll-driven 2026→2027 UI-state migration; the settings
   token rises into the ribbon and the "eye-travel" measure collapses. */
function ChThesis() {
  const { ref, progress } = useScrollProgress();
  return (
    <RightAct inRef={ref} label="01 Product direction" height="320vh" textMax={500}>
      <Eyebrow idx="01">{t("Product direction", "产品方向")}</Eyebrow>
      <h2 style={{ fontSize: "clamp(1.7rem,1.2rem+1.7vw,2.7rem)", fontWeight: 500, color: "#fff", letterSpacing: "-0.025em", margin: "16px 0", lineHeight: 1.12, textWrap: "balance" }}>{t("Revit is already reducing fragmented tool state.", "Revit 已经在减少工具状态的碎片化。")}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "9px 12px", alignItems: "center", margin: "4px 0 14px" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-on-dark-lo)", border: "1px solid var(--line-on-dark)", borderRadius: "var(--r-pill)", padding: "3px 9px", whiteSpace: "nowrap", textAlign: "center" }}>2026</span>
        <span style={{ fontSize: 14, color: "var(--text-on-dark-mid)", lineHeight: 1.4 }}>{t("Stair settings sit in the Options Bar, away from the ribbon.", "楼梯参数在 Options Bar，远离上下文工具栏。")}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", border: "1px solid var(--accent)", borderRadius: "var(--r-pill)", padding: "3px 9px", whiteSpace: "nowrap", textAlign: "center" }}>2027</span>
        <span style={{ fontSize: 14, color: "#fff", lineHeight: 1.4 }}>{t("Folded into the Modify | Create Stair ribbon.", "收进 Modify | Create Stair 工具栏本身。")}</span>
      </div>
      <p style={{ fontSize: 14, color: "var(--text-on-dark-mid)", lineHeight: 1.5, marginBottom: 14 }}>{t("Less eye-travel to read the current tool state.", "要读懂当前工具状态，眼睛走的路更短了。")}</p>
      <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.05rem,0.95rem+0.5vw,1.35rem)", fontWeight: 500, color: "var(--typical-300)", lineHeight: 1.32, letterSpacing: "-0.01em", marginBottom: 16 }}>{t("StepWise follows the same direction, but applies it to a harder problem: not stair creation, but stair-system maintenance.", "StepWise 延续同一方向，但把它推进到更难的问题：不是创建楼梯，而是维护楼梯系统。")}</p>
      <figure style={{ margin: 0, borderRadius: "var(--r-md)", overflow: "hidden", border: "1px solid var(--line-on-dark-2)", background: "#0b0e13" }}
        onMouseEnter={(e) => { const im = e.currentTarget.querySelector("img"); if (im) im.style.transform = "scale(1.04)"; }}
        onMouseLeave={(e) => { const im = e.currentTarget.querySelector("img"); if (im) im.style.transform = "none"; }}>
        <img src="assets/ui/direction.jpg" alt="Revit 2026 vs 2027 stair tool" loading="lazy" style={{ display: "block", width: "100%", height: "auto", transition: "transform .4s var(--ease-out)" }} />
        <figcaption style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--text-on-dark-lo)", padding: "7px 10px", borderTop: "1px solid var(--line-on-dark)" }}>{t("Observed product direction: options move into context.", "观察到的产品方向：选项并入上下文。")}</figcaption>
      </figure>
      <ActProgress progress={progress} />
    </RightAct>);

}

/* 02 · Problem reframe — the work is fragmented into many Type windows. Left graphic:
   five real Type Properties windows erupt from a faint stair model, wired by hidden
   dependency lines; the clutter peaks, then resolves to one framing label. */
function ChResearch() {
  const { ref, progress } = useScrollProgress();
  const wins = [
    { src: "assets/ui/type1.png", l: 3, top: 5, w: 38, at: 0.08, ax: 46, ay: 30 },
    { src: "assets/ui/type2.png", l: 41, top: 2, w: 36, at: 0.20, ax: 55, ay: 40 },
    { src: "assets/ui/type3.png", l: 6, top: 40, w: 37, at: 0.32, ax: 44, ay: 60 },
    { src: "assets/ui/type4.png", l: 47, top: 45, w: 36, at: 0.44, ax: 57, ay: 66 },
    { src: "assets/ui/type5.png", l: 26, top: 24, w: 39, at: 0.56, ax: 50, ay: 48 },
  ];
  const graphic = (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1.12" }}>
      {/* the Type Properties windows */}
      {wins.map((w, i) => {
        const ap = mapRange(progress, w.at, w.at + 0.1, 0, 1);
        const op = ap;
        return <img key={i} src={w.src} alt="Type Properties window" loading="lazy" style={{ position: "absolute", left: w.l + "%", top: w.top + "%", width: w.w + "%", height: "auto", borderRadius: 6, border: "1px solid var(--line-on-dark-2)", boxShadow: "0 12px 32px rgba(0,0,0,0.62)", opacity: op.toFixed(2), transform: "scale(" + (0.94 + 0.06 * ap).toFixed(3) + ")", transformOrigin: "center" }} />;
      })}
    </div>);
  return (
    <RightAct inRef={ref} label="02 Problem reframe" height="340vh" graphic={graphic} graphicAlign="center" textMax={490}>
      <Eyebrow idx="02">{t("Problem reframe", "问题重定义")}</Eyebrow>
      <h2 style={{ fontSize: "clamp(1.6rem,1.2rem+1.6vw,2.55rem)", fontWeight: 500, color: "#fff", letterSpacing: "-0.025em", margin: "16px 0", lineHeight: 1.12, textWrap: "balance" }}>{t("The hard part is not creating a stair. It is maintaining stair intent when the building changes.", "难点不是画出楼梯，而是在建筑变化后维护楼梯意图。")}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 13, margin: "4px 0 14px" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-on-dark-lo)", marginBottom: 7 }}>{t("Revit exposes parts", "Revit 暴露的是零件")}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {[["Stair Type", "Stair Type"], ["Run Type", "Run Type"], ["Landing", "Landing"], ["Railing", "Railing"], ["Baluster", "Baluster"], ["Support", "Support"], ["Cut Mark", "Cut Mark"]].map((c, i) => (
              <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--text-on-dark-mid)", background: "rgba(255,255,255,0.04)", border: "1px solid var(--line-on-dark)", borderRadius: "var(--r-sm)", padding: "4px 9px" }}>{t(c[0], c[1])}</span>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--typical-300)", marginBottom: 7 }}>{t("The designer thinks in a system", "设计师想的是一套系统")}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {[["East Stair", "East Stair"], ["typical levels", "典型层"], ["exceptions", "例外"], ["related West Stair", "关联 West Stair"], ["downstream drawings", "下游图纸"]].map((c, i) => (
              <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "#fff", background: "rgba(61,125,255,0.14)", border: "1px solid var(--typical-400)", borderRadius: "var(--r-sm)", padding: "4px 9px" }}>{t(c[0], c[1])}</span>
            ))}
          </div>
        </div>
      </div>
      <p style={{ fontSize: 14, color: "var(--text-on-dark-mid)", lineHeight: 1.5, marginBottom: 12 }}>{t("Intent lives at the system level; the tool splits it into objects and hidden dependencies.", "意图在系统层，工具却把它拆成零件和隐藏的依赖。")}</p>
      <ActProgress progress={progress} tint="var(--exception-400)" />
    </RightAct>);

}

/* 03 · Research calibration — three evidence cards (Case signals / Practitioner
   feedback / Market scan). Each shows a headline + insight; bullets fade in on
   scroll, hover expands a card and reveals its read of the signal; a summary band
   converges the three onto one opportunity: maintain stair intent across change. */
function ChRootProblem() {
  const { ref, progress } = useScrollProgress();
  const [hov, setHov] = useA(-1);
  const cards = [
    {
      tint: "var(--typical-400)",
      title: ["Case signals", "题目信号"],
      insight: ["The brief keeps describing maintenance failure, not just drawing.", "题目反复在说维护失效，而不只是画图难。"],
      bullets: [
        ["Floor-by-floor edits; small changes force new types", "逐层修改，小改动也要新建类型"],
        ["Shared components create unwanted dependencies", "共享组件带来意外依赖"],
        ["Wants global edits with local variation, plus impact preview", "想全局编辑、保留局部变化，并能预览影响"],
      ],
      detail: ["Signal: users are trying to manage a stair as a system, but the interface exposes it as scattered edit points.", "信号：用户想管理的是一套楼梯系统，但界面暴露给他们的是分散的编辑点。"],
    },
    {
      tint: "var(--exception-400)",
      title: ["Practitioner feedback", "设计师反馈"],
      insight: ["Pain is uneven, but sharp in model-heavy, change-heavy work.", "痛点不均匀，但在建模重、变更多时很尖锐。"],
      bullets: [
        ["Once learned, many cope (schools / hospitals rarely hit the worst)", "学会后多数能应对（学校 / 医院少有最极端的）"],
        ["Model-heavy work still needs cleanup after height changes", "建模重的流程在层高变化后仍要手动清理"],
        ["They want predictability, not more automation", "他们要的是可预测，而非更多自动化"],
      ],
      detail: ["Signal: the opportunity is not universal stair simplification. It is change management for complex stair systems.", "信号：机会点不是泛泛简化所有楼梯操作，而是复杂楼梯系统的变更管理。"],
    },
    {
      tint: "var(--external-400)",
      title: ["Market scan", "市场扫描"],
      insight: ["Most tools help create stairs; few maintain intent inside Revit.", "多数工具帮生成楼梯，很少帮在 Revit 内维护意图。"],
      bullets: [
        ["Tools for generation, rebar, scan-to-BIM, special geometry", "生成、钢筋、scan-to-BIM、特殊几何的工具"],
        ["Gap: hierarchy, scope, exceptions, impact preview", "空白：层级、范围、例外、影响预览"],
      ],
      detail: ["Signal: existing tools add capability around Revit, but the deeper gap is native system visibility inside Revit.", "信号：现有工具更多是在 Revit 周围增加能力，真正的空白是 Revit 内部的系统可见性。"],
    },
  ];
  const bandOp = mapRange(progress, 0.66, 0.86, 0, 1);
  const cardsBlock = (
    <div onMouseLeave={() => setHov(-1)} style={{ display: "flex", gap: 10, alignItems: "stretch", height: "clamp(300px, 42vh, 360px)" }}>
      {cards.map((c, i) => {
        const dim = hov !== -1 && hov !== i;
        const flex = hov === i ? "1.5 1 0%" : dim ? "0.85 1 0%" : "1 1 0%";
        const cardOp = mapRange(progress, 0.04 + i * 0.07, 0.18 + i * 0.07, 0, 1);
        return (
          <div key={i} onMouseEnter={() => setHov(i)}
            style={{ flex: flex, minWidth: 0, opacity: (cardOp * (dim ? 0.6 : 1)).toFixed(2), background: "rgba(8,10,14,0.62)", border: "1px solid " + (hov === i ? c.tint : "var(--line-on-dark)"), borderRadius: 10, padding: "14px 15px", display: "flex", flexDirection: "column", gap: 8, transition: "flex .4s var(--ease-out), opacity .35s, border-color .3s", overflow: "hidden", willChange: "flex-grow" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.tint, flex: "none" }} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: 14.5, fontWeight: 600, color: "#fff", letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{t(c.title[0], c.title[1])}</span>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--text-on-dark-mid)", lineHeight: 1.45 }}>{t(c.insight[0], c.insight[1])}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 2 }}>
              {c.bullets.map((b, j) => {
                const isGap = i === 2 && j === c.bullets.length - 1;
                const bOp = mapRange(progress, 0.22 + j * 0.04, 0.30 + j * 0.04, 0, 1);
                return (
                  <div key={j} style={{ display: "flex", gap: 6, opacity: bOp.toFixed(2) }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: isGap ? "var(--ok-500)" : "var(--text-on-dark-lo)", flex: "none", marginTop: 6 }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, lineHeight: 1.4, color: isGap ? "var(--ok-400)" : "var(--text-on-dark-mid)", fontWeight: isGap ? 600 : 400 }}>{t(b[0], b[1])}</span>
                  </div>
                );
              })}
            </div>
            {/* expanded read — always mounted; reveals via max-height so the panel never flickers */}
            <div style={{ maxHeight: hov === i ? 150 : 0, opacity: hov === i ? 1 : 0, overflow: "hidden", transition: "max-height .4s var(--ease-out), opacity .3s", marginTop: hov === i ? 8 : 0 }}>
              <div style={{ padding: "9px 11px", borderRadius: 8, background: "rgba(61,125,255,0.08)", borderLeft: "2px solid " + c.tint }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, lineHeight: 1.5, color: "var(--typical-300)" }}>{t(c.detail[0], c.detail[1])}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>);
  const band = (
    <div style={{ marginTop: 14, opacity: bandOp.toFixed(2) }}>
      <div style={{ height: 1, background: "linear-gradient(90deg, var(--line-on-dark-2), transparent)", marginBottom: 12 }} />
      <div style={{ borderLeft: "2px solid var(--accent)", padding: "12px 16px", background: "rgba(61,125,255,0.06)", borderRadius: "0 8px 8px 0" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-on-dark-lo)" }}>{t("Where the signals converge", "三路证据的交汇点")}</div>
        <div style={{ fontSize: 13.5, color: "var(--text-on-dark-hi)", marginTop: 5, lineHeight: 1.45 }}>{t("Repeated floors + local exceptions + shared dependencies + frequent change.", "重复楼层 + 局部例外 + 共享依赖 + 频繁变更。")}</div>
      </div>
    </div>);
  return (
    <section ref={ref} data-screen-label="03 Research calibration" style={{ height: "320vh", position: "relative", background: "transparent" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ flex: "0 0 60%", marginLeft: "40%", boxSizing: "border-box", paddingRight: "clamp(24px,4vw,80px)", paddingLeft: "clamp(16px,2vw,36px)" }}>
          <div style={{ padding: "26px 28px", borderRadius: 18, background: "radial-gradient(150% 120% at 55% 50%, rgba(4,6,11,0.82), rgba(4,6,11,0.46) 60%, transparent 88%)" }}>
            <Eyebrow idx="03">{t("Research calibration", "研究校准")}</Eyebrow>
            <h2 style={{ fontSize: "clamp(1.7rem,1.2rem+1.7vw,2.7rem)", fontWeight: 500, color: "#fff", letterSpacing: "-0.025em", margin: "16px 0 22px", lineHeight: 1.12, textWrap: "balance" }}>{t("Maintain stair intent across change.", "在变化中维护楼梯意图。")}</h2>
            {cardsBlock}
            {band}
          </div>
        </div>
      </div>
    </section>);

}

/* 04 · Design principles — five principles grounded in Revit's native model. Left
   graphic: a workflow spine Context → Hierarchy → Scope → Exceptions → Preview gate;
   each node lights as its principle activates on scroll. Preview is the safety gate. */
function ChPrinciples() {
  const { ref, progress } = useScrollProgress();
  const active = Math.min(4, Math.floor(mapRange(progress, 0.10, 0.92, 0, 5)));
  const prins = [
    { l: ["Keep state in context", "让状态留在上下文里"], d: ["Don't force users to scan across disconnected UI zones to read the active stair edit.", "不要逼用户在彼此脱节的界面区域之间扫视，才能读懂当前的楼梯编辑。"], icon: "sliders", c: "var(--accent)" },
    { l: ["Make hierarchy visible", "让层级可见"], d: ["Show how stair, run, landing, railing, baluster, support and documentation relate.", "展示楼梯、梯段、平台、栏杆、栏杆柱、支撑与图纸之间的关系。"], icon: "tree", c: "var(--typical-400)" },
    { l: ["Make scope explicit", "让范围明确"], d: ["Every change says whether it affects one level, selected levels, all typical levels, the stair system or shared types.", "每次变更都说明它影响一层、选定层、所有标准层、整套楼梯，还是共享类型。"], icon: "target", c: "var(--typical-400)" },
    { l: ["Treat variation as managed exception", "把差异当作受管理的例外"], d: ["Local differences should be traceable exceptions, not defensive duplicate types.", "局部差异应是可追溯的例外，而不是防御性的复制类型。"], icon: "lock", c: "var(--exception-400)" },
    { l: ["Preview before Apply", "应用前先预览"], d: ["Professional users can handle complexity. They cannot accept surprise.", "专业用户能应对复杂，但不能接受意外。"], icon: "eye", c: "var(--typical-300)", gate: true },
  ];
  const graphic = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", paddingLeft: 6 }}>
      {prins.map((nd, i) => {
        const lit = i <= active;
        return (
          <React.Fragment key={i}>
            {i > 0 && <div style={{ width: 2, height: 24, marginLeft: 18, background: lit ? nd.c : "var(--line-on-dark-2)", opacity: lit ? 0.85 : 0.4, transition: "all .35s" }} />}
            <div style={{ display: "flex", alignItems: "center", gap: 13, opacity: lit ? 1 : 0.4, transition: "opacity .35s" }}>
              <span style={{ width: 38, height: 38, borderRadius: nd.gate ? 9 : "50%", border: "1.5px solid " + (lit ? nd.c : "var(--line-on-dark-2)"), background: lit ? "rgba(61,125,255,0.10)" : "#0b0e13", boxShadow: lit ? "0 0 0 4px rgba(61,125,255,0.07)" : "none", display: "flex", alignItems: "center", justifyContent: "center", flex: "none", transition: "all .35s" }}>
                <Icon name={nd.icon} size={18} color={lit ? nd.c : "var(--text-on-dark-lo)"} />
              </span>
              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.04em", color: lit ? "#fff" : "var(--text-on-dark-lo)", fontWeight: nd.gate ? 600 : 400 }}>{t(nd.l[0], nd.l[1])}</span>
                {nd.gate && <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--typical-300)", marginTop: 3, opacity: lit ? 1 : 0, transition: "opacity .35s" }}>{t("No surprise changes.", "不出意外。")}</div>}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>);
  return (
    <RightAct inRef={ref} label="04 Design principles" height="300vh" graphic={graphic} textMax={490}>
      <Eyebrow idx="04">{t("Design principles", "设计原则")}</Eyebrow>
      <h2 style={{ fontSize: "clamp(1.6rem,1.2rem+1.5vw,2.5rem)", fontWeight: 500, color: "#fff", letterSpacing: "-0.025em", margin: "16px 0", lineHeight: 1.12, textWrap: "balance" }}>{t("Design principles, grounded in Revit's native workflow.", "设计原则，扎在 Revit 原生工作流里。")}</h2>
      <p style={{ fontSize: 15, color: "var(--text-on-dark-mid)", lineHeight: 1.55, marginBottom: 16 }}>{t("Not a web app bolted onto Revit. The same complexity, reorganized inside patterns users already know: ribbon entry points, dockable palettes, properties-style grouping, preview, explicit Apply.", "不是把 Revit 做成网页应用，而是在用户已熟悉的交互里重组复杂性：工具栏入口、可停靠面板、properties 式分组、预览、显式 Apply。")}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {prins.map((p, i) => {
          const lit = i <= active;
          return (
            <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderTop: i ? "1px solid rgba(255,255,255,0.10)" : "0", opacity: lit ? 1 : 0.4, transition: "opacity .4s" }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: p.c, flex: "none", marginTop: 6, boxShadow: lit ? "0 0 10px " + p.c : "none", transition: "box-shadow .4s" }} />
              <div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.05rem,0.95rem+0.5vw,1.3rem)", fontWeight: 600, color: "#fff", letterSpacing: "-0.01em" }}>{t(p.l[0], p.l[1])}</span>
                <div style={{ fontSize: 13, color: "var(--text-on-dark-mid)", marginTop: 3, lineHeight: 1.45 }}>{t(p.d[0], p.d[1])}</div>
              </div>
            </div>
          );
        })}
      </div>
    </RightAct>);

}

/* 05 · Entry flow — StepWise adopts an existing native Revit stair (or multistory
   stair) into a managed stair system. Left-hand step list over the scrubbed video:
   it does not create geometry; it scans, groups by behavior and surfaces exceptions. */
function ChModelFirst() {
  const { ref, progress } = useScrollProgress();
  const steps = [
    { t: ["Start with native Revit stairs", "从原生 Revit 楼梯开始"], d: ["The user creates the stair with Revit's existing tools.", "用户用 Revit 现有工具创建楼梯。"] },
    { t: ["Create Stair System", "创建楼梯系统"], d: ["A contextual ribbon action adopts the selected stair as a managed stair system.", "上下文工具栏的一个操作，把选中的楼梯接入为受管理的楼梯系统。"] },
    { t: ["Scan existing structure", "扫描已有结构"], d: ["StepWise reads the selected stair, connected levels, shared types and related components.", "StepWise 读取选中的楼梯、关联楼层、共享类型与相关组件。"] },
    { t: ["Group by behavior", "按行为分组"], d: ["Levels with the same stair behavior become typical levels; differences surface as potential exceptions.", "行为相同的楼层成为典型层；差异作为潜在例外被标出。"] },
    { t: ["Review exceptions", "确认例外"], d: ["The user confirms which local differences are preserved as managed exceptions.", "用户确认哪些局部差异保留为受管理的例外。"] },
    { t: ["Enter System View", "进入系统视图"], d: ["The stair is now managed as a system, while native Revit types stay unchanged.", "楼梯现在作为系统被管理，而原生 Revit 类型保持不变。"] },
  ];
  const active = Math.min(5, Math.floor(mapRange(progress, 0.05, 0.95, 0, 6)));
  return (
    <section ref={ref} data-screen-label="05 Entry flow" style={{ height: "320vh", position: "relative", background: "transparent" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ width: "100%", paddingInline: "clamp(26px,5.5vw,112px)", display: "flex", justifyContent: "flex-start" }}>
          <div style={{ width: "min(100%, 520px)", padding: "26px 30px", margin: "-26px -30px", borderRadius: 18, background: "radial-gradient(135% 130% at 18% 45%, rgba(0,0,0,0.84), rgba(0,0,0,0.5) 55%, transparent 82%)" }}>
            <Eyebrow idx="05">{t("Entry flow", "接入流程")}</Eyebrow>
            <h2 style={{ fontSize: "clamp(1.6rem,1.2rem+1.5vw,2.5rem)", fontWeight: 500, color: "#fff", letterSpacing: "-0.025em", margin: "16px 0 10px", lineHeight: 1.13 }}>{t("From native stair to managed system.", "从原生楼梯，到可管理的系统。")}</h2>
            <p style={{ fontSize: 15, color: "var(--text-on-dark-mid)", marginBottom: 18, lineHeight: 1.5 }}>{t("StepWise does not create the stair. It adopts an existing Revit stair or multistory stair, then makes its levels, exceptions, shared types and connected components easier to manage.", "StepWise 不负责画楼梯。它把已有的 Revit 楼梯或 Multistory Stairs 接入为一个可管理的楼梯系统，让它的楼层、例外、共享类型与关联组件更易管理。")}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {steps.map((st, i) => {
                const on = i === active, done = i < active;
                return (
                  <div key={i} style={{ display: "flex", gap: 13, padding: "8px 0", opacity: on || done ? 1 : 0.4, transition: "opacity .3s" }}>
                    <span style={{ width: 24, height: 24, borderRadius: "50%", flex: "none", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 600, background: on ? "var(--accent)" : done ? "rgba(61,125,255,0.18)" : "transparent", color: on ? "#fff" : done ? "var(--accent)" : "var(--text-on-dark-lo)", border: "1px solid " + (on || done ? "var(--accent)" : "var(--line-on-dark-2)") }}>{done ? "✓" : i + 1}</span>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: on || done ? "#fff" : "var(--text-on-dark-mid)" }}>{t(st.t[0], st.t[1])}</div>
                      {on && <div style={{ fontSize: 14, color: "var(--text-on-dark-mid)", marginTop: 3, lineHeight: 1.45 }}>{t(st.d[0], st.d[1])}</div>}
                    </div>
                  </div>);
              })}
            </div>
          </div>
        </div>
      </div>
    </section>);

}

Object.assign(window, { VideoBackdrop, Hero, ChThesis, ChResearch, ChRootProblem, ChPrinciples, ChModelFirst });