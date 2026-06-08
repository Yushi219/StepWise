// sections/chapters-b.jsx — UI chapters 06–12, built around the real StepWise screenshots.
const { useState: useB } = React;

// Real high-fidelity StepWise mockups (content-accurate filenames).
//   main      → System View + Selected issue + Apply-scope + impact ribbon (the workspace)
//   exception → L10 Equipment-Floor Exception manager (inherit / override / no duplicate type)
//   preview   → Impact Preview section view (Review before Apply, related-system notice)
//   ai        → Autodesk Assistant read-only layer  (file pending — graceful fallback until added)
const UI = { main: "assets/ui/main.png", exception: "assets/ui/exception.png", preview: "assets/ui/preview.png", ai: "assets/ui/ai.png" };

function Head({ idx, eye, title, copy, style }) {
  return (
    <div style={style}>
      <Eyebrow idx={idx}>{eye}</Eyebrow>
      <h2 style={{ fontSize: "clamp(1.75rem,1.2rem+1.7vw,2.7rem)", fontWeight: 500, color: "#fff", letterSpacing: "-0.025em", margin: "14px 0 0", lineHeight: 1.12 }}>{title}</h2>
      {copy && <p style={{ fontSize: 17, color: "var(--text-on-dark-mid)", marginTop: 12, lineHeight: 1.5, maxWidth: 460 }}>{copy}</p>}
    </div>
  );
}

/* framed real screenshot + positioned, animated callouts.
   callouts: [{x,y,label,tone,up,key}] in % of the image. `up` flips the label above
   the ring (for bottom-row targets). If the image is missing (e.g. ai.png not yet
   dropped in) it degrades to a labelled "add screenshot" panel instead of a broken img. */
function RealUI({ src, alt, callouts, dim, missingLabel }) {
  const [err, setErr] = useB(false);
  return (
    <figure style={{ position: "relative", margin: 0, borderRadius: "var(--r-lg)", overflow: "hidden", border: "1px solid var(--line-on-dark-2)", boxShadow: "var(--shadow-float-dark)", background: "#0b0e13", aspectRatio: err ? "16 / 9" : "auto" }}>
      {err
        ? <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0 12px, transparent 12px 24px), #070a0f" }}>
            <div style={{ textAlign: "center", padding: 24 }}>
              <div style={{ display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--accent)", border: "1px solid var(--accent)", borderRadius: "var(--r-pill)", padding: "3px 10px", marginBottom: 12 }}>{t("ADD SCREENSHOT", "待补充截图")}</div>
              <div style={{ fontSize: 13.5, color: "var(--text-on-dark-mid)", lineHeight: 1.5, maxWidth: 360, marginInline: "auto" }}>{missingLabel || alt}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-on-dark-lo)", marginTop: 8 }}>{src}</div>
            </div>
          </div>
        : <img src={src} alt={alt} onError={() => setErr(true)} style={{ display: "block", width: "100%", height: "auto", filter: dim ? "saturate(0.85) brightness(0.92)" : "none" }} />}
      {!err && (callouts || []).map((c, i) => (
        <div key={c.key || i} style={{ position: "absolute", left: c.x + "%", top: c.y + "%", transform: "translate(-50%,-50%)", pointerEvents: "none", animation: "fadeSwap .45s var(--ease-out) both" }}>
          <span className="callout-ring" style={{ borderColor: c.tone, boxShadow: "0 0 0 3px rgba(8,10,14,0.32)" }} />
          {c.label && <span style={{ position: "absolute", left: "50%", [c.up ? "bottom" : "top"]: "calc(100% + 7px)", transform: "translateX(-50%)", whiteSpace: "nowrap", fontFamily: "var(--font-mono)", fontSize: 11.5, color: "#fff", background: c.tone, padding: "3px 8px", borderRadius: "var(--r-pill)", boxShadow: "0 4px 14px rgba(0,0,0,0.5)" }}>{c.label}</span>}
        </div>
      ))}
    </figure>
  );
}

/* 06 · How it fits Revit — two parts. (A) The data model as four layers: native Revit
   types stay the source of record; StepWise adds a management layer above them
   (Stair System / Typical Rule / Managed Exceptions) that references, never replaces.
   (B) Five native entry points where that layer surfaces inside the existing workflow:
   Properties, Edit Type, parameter rows, the ribbon, and right-click. All CSS-drawn. */
function ChArchitecture() {
  const [ref, inView] = useInView(0.12);
  const rev = (d) => ({ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(18px)", transition: "opacity .55s var(--ease-out), transform .55s var(--ease-out)", transitionDelay: d + "s" });
  const chip = { fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--text-on-dark-mid)", background: "rgba(255,255,255,0.04)", border: "1px solid var(--line-on-dark)", borderRadius: "var(--r-sm)", padding: "6px 9px" };
  const bchip = { ...chip, background: "rgba(61,125,255,0.14)", borderColor: "var(--typical-400)", color: "#fff" };
  const mock = { borderRadius: 8, border: "1px solid var(--line-on-dark-2)", background: "#0b0e13", overflow: "hidden" };
  const bar = { fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-on-dark-lo)", padding: "6px 10px", borderBottom: "1px solid var(--line-on-dark)", background: "rgba(255,255,255,0.03)" };
  const row = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "4px 0", fontSize: 11.5, color: "var(--text-on-dark-mid)" };
  const partEye = { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 600 };
  const partTitle = { fontSize: "clamp(1.15rem,1rem+0.7vw,1.6rem)", fontWeight: 500, color: "#fff", letterSpacing: "-0.02em", margin: "8px 0 0", lineHeight: 1.2 };
  const partCopy = { fontSize: 14, color: "var(--text-on-dark-mid)", marginTop: 9, lineHeight: 1.5, maxWidth: 760 };
  const lo = { color: "var(--text-on-dark-lo)" };
  const val = { color: "#fff", fontFamily: "var(--font-mono)", fontSize: 11 };
  const btn = (en, zh, solid) => <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: solid ? "#fff" : "var(--text-on-dark-mid)", background: solid ? "var(--accent)" : "rgba(255,255,255,0.04)", border: "1px solid " + (solid ? "var(--accent)" : "var(--line-on-dark-2)"), borderRadius: "var(--r-sm)", padding: "4px 8px", whiteSpace: "nowrap" }}>{t(en, zh)}</span>;
  const etag = (n, en, zh) => <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 7 }}><span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)" }}>{n}</span><span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text-on-dark-mid)" }}>{t(en, zh)}</span></div>;
  const menuItem = (en, zh) => <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 4px", fontSize: 11.5, color: "var(--text-on-dark-mid)" }}><span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--text-on-dark-lo)", flex: "0 0 auto" }} />{t(en, zh)}</div>;
  const swLayers = [
    { n: "04", name: ["Managed Exceptions", "受管理的例外"], desc: ["stores only what differs from the typical rule", "只记录与典型规则不同的部分"], items: [["L10 / L20", "L10 / L20"], ["floor-height override", "层高覆盖"], ["riser-count override", "踏步数覆盖"], ["landing-type override", "平台类型覆盖"], ["railing review", "栏杆复查"]] },
    { n: "03", name: ["Typical Rule", "典型规则"], desc: ["the default, built from existing type params, not a new set", "系统默认值，引用现有类型参数，不另造一套"], items: [["typical stair", "典型 stair"], ["run", "run"], ["landing", "landing"], ["railing", "railing"], ["support", "support"]] },
    { n: "02", name: ["Stair System", "楼梯系统"], desc: ["a new system object (e.g. East Stair) that references cross-floor instances", "新的系统级对象，如 East Stair，引用跨楼层实例"], items: [["cross-floor instances", "跨楼层实例"], ["related components", "关联组件"]] },
  ];
  const foundation = { n: "01", name: ["Existing Revit Types", "Revit 原有类型"], desc: ["unchanged · the source of record", "保持不变 · 基础数据"], items: [["Stair Type", "楼梯类型"], ["Run Type", "梯段类型"], ["Landing Type", "平台类型"], ["Railing Type", "栏杆类型"], ["Baluster", "栏杆柱"], ["Support", "支撑"], ["Cut Mark", "剖断标记"], ["View / Tag / Doc", "视图 / 标签 / 图纸"]] };
  const band = (L, blue, d) => (
    <div style={{ ...rev(d), display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", borderRadius: "var(--r-lg)", border: "1px solid " + (blue ? "var(--accent)" : "var(--line-on-dark)"), borderLeft: "3px solid " + (blue ? "var(--accent)" : "var(--line-on-dark-2)"), background: blue ? "rgba(61,125,255,0.10)" : "rgba(8,10,14,0.5)", padding: "11px 14px" }}>
      <div style={{ flex: "0 0 auto", minWidth: 186, maxWidth: 252 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: blue ? "var(--typical-300)" : "var(--text-on-dark-lo)" }}>{L.n}</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "#fff" }}>{t(L.name[0], L.name[1])}</span>
        </div>
        <div style={{ fontSize: 12, color: "var(--text-on-dark-mid)", marginTop: 3, lineHeight: 1.4 }}>{t(L.desc[0], L.desc[1])}</div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, flex: "1 1 240px" }}>
        {L.items.map((it, j) => <span key={j} style={blue ? bchip : chip}>{t(it[0], it[1])}</span>)}
      </div>
    </div>);
  return (
    <section ref={ref} data-screen-label="06 How it fits Revit" className="slide" style={{ background: "transparent" }}>
      <div className="wrap" style={{ width: "100%", maxWidth: "min(1480px, 95vw)" }}>
        {/* header */}
        <div style={{ maxWidth: 880, marginBottom: 28, ...rev(0) }}>
          <Eyebrow idx="06">{t("How it fits Revit", "与原生模型的融合")}</Eyebrow>
          <h2 style={{ fontSize: "clamp(1.7rem,1.2rem+1.6vw,2.6rem)", fontWeight: 500, color: "#fff", letterSpacing: "-0.025em", margin: "14px 0 0", lineHeight: 1.12 }}>{t("StepWise adds a system-level management layer above Revit's existing types.", "StepWise 在 Revit 原有类型之上，加一层楼梯系统管理层。")}</h2>
          <p style={{ fontSize: 15, color: "var(--text-on-dark-mid)", marginTop: 13, lineHeight: 1.55 }}>{t("You rarely start from a blank model. StepWise adopts onto the stairs, types and projects you already have, and does not replace Revit's existing stair, run, landing or railing types. It relates those scattered objects into one stair system, defines which levels inherit the typical rule and which are exceptions, and tracks which parameters are inherited or locally overridden, so Revit stays Revit, only better managed.", "你很少从一个空模型开始。StepWise 可以接入你已有的楼梯、类型与项目，而不替代 Revit 原有的 stair / run / landing / railing type。它把这些分散的对象关联成一个楼梯系统，定义哪些楼层继承典型规则、哪些是例外，并记录哪些参数是继承、哪些是局部覆盖，让 Revit 仍是 Revit，只是被更好地管理。")}</p>
        </div>

        {/* PART A — the data model, four layers */}
        <div style={{ ...rev(0.06) }}>
          <div style={partEye}>{t("The data model · four layers", "底层模型 · 四层")}</div>
          <p style={partCopy}>{t("The management layer references existing Revit type parameters and never invents a parallel set.", "管理层引用现有的 Revit 类型参数，不另造一套并行体系。")}</p>
        </div>
        <div className="arch-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr auto 0.95fr", gap: "clamp(12px,1.8vw,30px)", alignItems: "center", marginTop: 16 }}>
          {/* LEFT — the StepWise management layer (references the natives) */}
          <div>
            <div style={{ ...rev(0.1), fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--typical-300)", marginBottom: 9 }}>{t("StepWise · management layer", "StepWise · 管理层")}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {band(swLayers[0], true, 0.14)}
              {band(swLayers[1], true, 0.20)}
              {band(swLayers[2], true, 0.26)}
            </div>
          </div>
          {/* ARROW → references, not replaces */}
          <div className="arch-arrow" style={{ ...rev(0.30), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 7 }}>
            <Icon name="arrowR" size={26} color="var(--text-on-dark-lo)" />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.04em", color: "var(--text-on-dark-lo)", textAlign: "center", lineHeight: 1.35, whiteSpace: "pre-line" }}>{t("references,\nnot replaces", "引用，\n不替换")}</span>
          </div>
          {/* RIGHT — existing Revit types, the source of record */}
          <div>
            <div style={{ ...rev(0.34), fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-on-dark-lo)", marginBottom: 9 }}>{t("Native Revit", "Revit 原生")}</div>
            {band(foundation, false, 0.36)}
          </div>
        </div>

        {/* PART B — native entry points */}
        <div style={{ ...rev(0.42), marginTop: 36 }}>
          <div style={partEye}>{t("Native entry points · five seams", "原生入口 · 五个缝合点")}</div>
          <h3 style={partTitle}>{t("You don't start from StepWise. It meets you where you already work.", "你不必从 StepWise 开始，它就出现在你本来工作的地方。")}</h3>
          <p style={partCopy}>{t("Users keep selecting stairs, opening Properties and clicking Edit Type. StepWise surfaces system awareness at each point and never blocks the change. It shows the impact first, then offers a safer path.", "用户照旧选中楼梯、打开 Properties、点击 Edit Type。StepWise 在每个位置浮现系统感知，且从不阻止改动，而是先展示影响，再给出更安全的路径。")}</p>
        </div>
        <div className="arch-entries" style={{ marginTop: 16 }}>
          {/* entry 1 — Properties */}
          <div style={{ ...rev(0.50) }}>
            {etag("entry 1", "Properties · select a stair", "Properties · 选中楼梯")}
            <div style={mock}>
              <div style={bar}>Properties · Stair System</div>
              <div style={{ padding: "7px 10px" }}>
                <div style={row}><span style={lo}>System</span><span style={val}>East Stair</span></div>
                <div style={row}><span style={lo}>Level role</span><span><span style={{ color: "var(--ok-400)", fontFamily: "var(--font-mono)", fontSize: 11 }}>Typical</span><span style={{ ...lo, fontFamily: "var(--font-mono)", fontSize: 10 }}> / Exception / Warning</span></span></div>
                <div style={row}><span style={lo}>Inherited from</span><span style={{ ...val, color: "var(--text-on-dark-mid)" }}>East Stair Typical Rule</span></div>
                <div style={{ display: "flex", gap: 6, marginTop: 9, flexWrap: "wrap" }}>{btn("Open System View", "打开系统视图")}{btn("Edit as Exception", "编辑为例外")}</div>
              </div>
            </div>
          </div>
          {/* entry 2 — Edit Type (the key seam) */}
          <div style={{ ...rev(0.58) }}>
            {etag("entry 2", "Edit Type · the key seam", "Edit Type · 关键缝合点")}
            <div style={{ ...mock, borderColor: "var(--accent)" }}>
              <div style={{ ...bar, color: "var(--accent)" }}>Edit Type · impact banner</div>
              <div style={{ padding: "8px 10px" }}>
                <div style={{ fontSize: 12, color: "var(--text-on-dark-hi)", lineHeight: 1.45 }}>{t("Used by East Stair typical rule across 17 levels and 2 related stair systems.", "被 East Stair 典型规则使用，覆盖 17 个楼层、2 个关联楼梯系统。")}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 9, flexWrap: "wrap" }}>{btn("Edit Type Globally", "全局编辑类型")}{btn("Create Managed Exception", "创建受管理的例外")}{btn("Preview Impact", "预览影响", true)}</div>
              </div>
            </div>
          </div>
          {/* entry 3 — parameter rows */}
          <div style={{ ...rev(0.66) }}>
            {etag("entry 3", "Parameter rows · status", "参数行 · 状态")}
            <div style={mock}>
              <div style={bar}>Type Parameters</div>
              <div style={{ padding: "5px 10px 7px" }}>
                <div style={row}><span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="lock" size={12} color="var(--text-on-dark-lo)" />Landing Type</span><span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--text-on-dark-lo)" }}>{t("inherited", "继承")}</span></div>
                <div style={row}><span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--exception-500)", flex: "0 0 auto" }} />Riser Count · 25</span><span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--exception-400)" }}>{t("local override", "局部覆盖")}</span></div>
                <div style={row}><span style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="warn" size={12} color="var(--warn-400)" />Railing offset</span><span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--warn-400)" }}>{t("conflict", "冲突")}</span></div>
              </div>
            </div>
          </div>
          {/* entry 4 — ribbon */}
          <div style={{ ...rev(0.74) }}>
            {etag("entry 4", "Ribbon · just an entry", "Ribbon · 仅作入口")}
            <div style={mock}>
              <div style={bar}>Modify | Stair</div>
              <div style={{ padding: "8px 10px" }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{btn("System View", "系统视图")}{btn("Scope", "范围")}{btn("Exceptions", "例外")}{btn("Preview Impact", "预览影响")}</div>
                <div style={{ fontSize: 11, color: "var(--text-on-dark-lo)", marginTop: 9, lineHeight: 1.4 }}>{t("Just an entry. No complex state lives in the ribbon.", "只把人带进系统视图，不在 ribbon 里堆复杂状态。")}</div>
              </div>
            </div>
          </div>
          {/* entry 5 — right-click / project browser */}
          <div style={{ ...rev(0.82) }}>
            {etag("entry 5", "Right-click · Project Browser", "右键 · 项目浏览器")}
            <div style={mock}>
              <div style={bar}>Right-click</div>
              <div style={{ padding: "6px 6px" }}>
                {menuItem("Open Stair System", "打开楼梯系统")}
                {menuItem("Create System from Selection", "由所选创建系统")}
                {menuItem("Convert Type Variation to Exception", "把类型变体转为例外")}
                {menuItem("Review Related Components", "复查关联组件")}
              </div>
            </div>
          </div>
        </div>

        {/* closing */}
        <p style={{ ...rev(0.9), fontFamily: "var(--font-display)", fontSize: "clamp(1.05rem,0.95rem+0.5vw,1.4rem)", fontWeight: 500, color: "var(--typical-300)", lineHeight: 1.35, marginTop: 30, maxWidth: 860, letterSpacing: "-0.01em" }}>{t("Users keep their Revit workflow. StepWise adds system awareness where mistakes happen.", "用户保留原有的 Revit 工作流；StepWise 只在最容易出错的地方，补上系统感知。")}</p>
      </div>
    </section>);

}

/* 07 · Workspace reveal — the real main UI; callouts reveal region-by-region on scroll.
   Reading order = the mental model: levels (left) → model (centre) → issue + scope
   (right) → impact (bottom). Dwell-then-leave: each ring holds while you read. */
function ChWorkspace() {
  const { ref, progress } = useScrollProgress();
  const zones = [
    { key: "sys", x: 12, y: 50, tone: "var(--typical-500)", label: t("System Browser · every level", "系统浏览器 · 逐层可见"), at: 0.12 },
    { key: "exc", x: 12, y: 31, tone: "var(--exception-500)", label: t("L10 / L20 · exceptions kept", "L10 / L20 · 例外保留"), at: 0.24 },
    { key: "l12", x: 46, y: 54, tone: "var(--warn-500)", label: t("L12 · floor height changed", "L12 · 层高变更"), at: 0.38 },
    { key: "iss", x: 85, y: 28, tone: "var(--accent)", label: t("Selected issue · explained", "选中问题 · 已解释"), at: 0.52 },
    { key: "scope", x: 85, y: 45, tone: "var(--accent)", label: t("Scope · 17 typical levels", "范围 · 17 个标准层"), at: 0.65 },
    { key: "imp", x: 85, y: 61, tone: "var(--typical-400)", label: t("Impact · 34 runs · 17 landings", "影响 · 34 梯段 · 17 平台"), at: 0.78 },
  ];
  const shown = zones.filter((z) => progress >= z.at);
  return (
    <section ref={ref} data-screen-label="07 Workspace" style={{ height: "260vh", position: "relative", background: "transparent" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div className="wrap" style={{ width: "100%", position: "relative", zIndex: 1 }}>
          <Head idx="07" eye={t("The StepWise workspace", "StepWise 工作台")} title={t("A stair, as a system you can see and edit.", "把楼梯，变成一个看得见、改得动的系统。")} copy={t("One workspace replaces the maze of type dialogs: every level in the System Browser on the left, the live stair model in the centre, and the selected change on the right, with its cause, its exact scope and its full impact.", "一个工作台取代层层类型对话框：左侧的系统浏览器列出每一层，中央是实时楼梯模型，右侧是选中的变更，包括它的成因、精确范围与完整影响。")} style={{ maxWidth: 720, marginBottom: 20 }} />
          <RealUI src={UI.main} alt="StepWise workspace, East Stair System View" callouts={shown} />
          <div style={{ marginTop: 13, display: "flex", gap: 9, alignItems: "center", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-on-dark-lo)" }}>
            <span style={{ color: "var(--accent)" }}>{shown.length}/{zones.length}</span>
            <span>{t("scroll to read the workspace, region by region", "向下滚动，逐区读懂这个工作台")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 08 · The two hardest problems, solved — two flagship screens side by side
   (Exception Manager · Impact Preview). Hovering a panel enlarges it (the other
   shrinks) and swaps the detail below; the first shows by default. The panel row is
   a fixed height so only widths animate — no vertical jitter. .wrap keeps the gutters. */
function ChFlow() {
  const [ref, inView] = useInView(0.12);
  const [act, setAct] = useB(0);
  const features = [
    {
      n: t("Capability 1 / 2", "能力 1 / 2"),
      short: t("Exception Manager", "例外管理器"),
      title: t("Vary locally, without cloning a type.", "局部变化，无需复制类型。"),
      copy: t("Equipment floors inherit the typical stair rule and override only what differs. The difference becomes a managed exception, not another type, so the type list stays clean and every difference is intentional and traceable.", "设备层继承典型楼梯规则，只覆盖真正不同的部分。这个差异成为一个受管理的例外，而不是又一个类型，因此类型列表保持干净，每一处不同都有意而为、可追溯。"),
      bullets: [
        t("16 parameters inherited from the typical rule", "16 个参数继承自典型规则"),
        t("5 explicit local overrides: floor height, risers, landing", "5 个显式本地覆盖：层高、踢面数、平台"),
        t("0 duplicate types created, so the type list stays clean", "0 个新复制类型，类型列表保持干净"),
        t("Per-parameter compare · revert · apply-to-similar", "逐参数：比较 · 还原 · 应用到同类"),
      ],
      principle: t("Principle 03 · Manage exceptions without duplication", "原则 03 · 管理例外，无需复制"),
      img: UI.exception, alt: "Exception Manager, L10 equipment floor", tint: "var(--exception-500)",
      co: [
        { x: 14, y: 54, tone: "var(--exception-500)", label: t("L10 · equipment floor", "L10 · 设备层") },
        { x: 86, y: 44, tone: "var(--typical-500)", label: t("16 inherited from typical", "16 项继承自典型") },
        { x: 86, y: 60, tone: "var(--exception-500)", label: t("5 local overrides", "5 项本地覆盖") },
        { x: 30, y: 90, up: true, tone: "var(--ok-500)", label: t("0 duplicate types", "0 个复制类型") },
      ],
    },
    {
      n: t("Capability 2 / 2", "能力 2 / 2"),
      short: t("Impact Preview", "影响预览"),
      title: t("See the blast radius before Apply.", "提交之前，先看清波及范围。"),
      copy: t("StepWise previews geometry, components, exceptions, documentation, and related systems before anything is committed. Proposed geometry (blue) overlays the current model (grey); preserved exceptions stay orange and risks turn red.", "StepWise 在任何改动提交之前，预览几何、组件、例外、图纸与关联系统。拟改几何（蓝）叠加在现状模型（灰）之上；被保留的例外保持橙色，风险转为红色。"),
      bullets: [
        t("17 typical levels · 34 runs recalculated · 17 landings reviewed", "17 个标准层 · 重算 34 段梯段 · 复核 17 处平台"),
        t("Exceptions L10 / L20 preserved automatically", "L10 / L20 例外自动保留"),
        t("1 railing-spacing warning surfaced before Apply", "1 条栏杆间距警告在应用前被提出"),
        t("West Stair flagged as a related system, never changed silently", "西楼梯被标记为关联系统，绝不静默修改"),
      ],
      principle: t("Principle 05 · Preview impact before apply", "原则 05 · 应用前先预览影响"),
      img: UI.preview, alt: "Impact Preview section, review before apply", tint: "var(--accent)",
      co: [
        { x: 43, y: 49, tone: "var(--warn-500)", label: t("L12 · review required", "L12 · 需复查") },
        { x: 86, y: 33, tone: "var(--typical-500)", label: t("17 levels · 34 runs", "17 层 · 34 梯段") },
        { x: 86, y: 58, tone: "var(--warn-500)", label: t("1 railing warning", "1 条栏杆警告") },
        { x: 86, y: 83, tone: "var(--external-500)", label: t("West Stair · review", "西楼梯 · 建议复查") },
        { x: 87, y: 92, up: true, tone: "var(--accent)", label: t("Apply after review", "复查后再应用") },
      ],
    },
  ];
  const f = features[act];
  return (
    <section data-screen-label="08 Flagship features" className="slide" ref={ref} style={{ background: "transparent" }}>
      <div className="wrap" style={{ width: "100%", maxWidth: "min(1480px, 95vw)" }}>
        <div style={{ maxWidth: 760, marginBottom: 22, opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(18px)", transition: "opacity .55s var(--ease-out), transform .55s var(--ease-out)" }}>
          <Eyebrow idx="08">{t("Flagship features", "旗舰能力")}</Eyebrow>
          <h2 style={{ fontSize: "clamp(1.7rem,1.2rem+1.6vw,2.6rem)", fontWeight: 500, color: "#fff", letterSpacing: "-0.025em", margin: "14px 0 0", lineHeight: 1.12 }}>{t("The two hardest problems, solved.", "两个最棘手的问题，解决了。")}</h2>
          <p style={{ fontSize: 15.5, color: "var(--text-on-dark-mid)", marginTop: 12, lineHeight: 1.55 }}>{t("Hover a panel to compare: manage local exceptions without duplicate types, then preview the full impact before Apply.", "悬停任一面板对比：先在不复制类型的前提下管理局部例外，再在应用前预览完整影响。")}</p>
        </div>
        {/* two image panels — hover to enlarge */}
        <div style={{ display: "flex", gap: 14, height: "clamp(320px, 52vh, 520px)", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "opacity .55s var(--ease-out) .08s, transform .55s var(--ease-out) .08s" }}>
          {features.map((ft, i) => {
            const on = act === i;
            return (
              <div key={i} onMouseEnter={() => setAct(i)} onClick={() => setAct(i)}
                style={{ flex: on ? "1.6 1 0%" : "0.82 1 0%", minWidth: 0, position: "relative", borderRadius: "var(--r-lg)", border: "1px solid " + (on ? ft.tint : "var(--line-on-dark-2)"), overflow: "hidden", cursor: "pointer", background: "#0b0e13", boxShadow: on ? "var(--shadow-float-dark)" : "none", transition: "flex .45s var(--ease-out), border-color .3s, box-shadow .3s" }}>
                <img src={ft.img} alt={ft.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: on ? "contain" : "cover", objectPosition: "center", display: "block", filter: on ? "none" : "saturate(0.9) brightness(0.8)", transition: "filter .35s" }} />
                <div style={{ position: "absolute", left: 0, right: 0, top: 0, padding: "12px 15px", background: "linear-gradient(180deg, rgba(4,6,11,0.82), transparent)", display: "flex", alignItems: "center", gap: 9 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: on ? "#fff" : "var(--text-on-dark-mid)" }}>{"0" + (i + 1)}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, color: on ? "#fff" : "var(--text-on-dark-mid)", whiteSpace: "nowrap" }}>{ft.short}</span>
                </div>
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 3, background: ft.tint, opacity: on ? 1 : 0, transition: "opacity .3s" }} />
                {on && (ft.co || []).map((c, k) => (
                  <div key={k} style={{ position: "absolute", left: c.x + "%", top: c.y + "%", transform: "translate(-50%,-50%)", pointerEvents: "none", animation: "fadeSwap .45s var(--ease-out) both" }}>
                    <span className="callout-ring" style={{ borderColor: c.tone, boxShadow: "0 0 0 3px rgba(8,10,14,0.32)" }} />
                    {c.label && <span style={{ position: "absolute", left: "50%", [c.up ? "bottom" : "top"]: "calc(100% + 7px)", transform: "translateX(-50%)", whiteSpace: "nowrap", fontFamily: "var(--font-mono)", fontSize: 11.5, color: "#fff", background: c.tone, padding: "3px 8px", borderRadius: "var(--r-pill)", boxShadow: "0 4px 14px rgba(0,0,0,0.5)" }}>{c.label}</span>}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        {/* detail — swaps with the active panel */}
        <div key={act} className="scene-swap" style={{ marginTop: 20, minHeight: 200 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>{f.n}</span>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem,1.1rem+0.7vw,1.9rem)", fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.12, margin: 0 }}>{f.title}</h3>
          </div>
          <div className="ch12-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "clamp(20px,3vw,48px)", marginTop: 12, alignItems: "start" }}>
            <p style={{ fontSize: 15, color: "var(--text-on-dark-mid)", lineHeight: 1.55, margin: 0 }}>{f.copy}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {f.bullets.map((b, i) => <li key={i} style={{ display: "flex", gap: 10, fontSize: 13.5, color: "var(--text-on-dark-mid)", lineHeight: 1.45 }}><Icon name="check" size={14} color="var(--ok-400)" style={{ flex: "none", marginTop: 2 }} />{b}</li>)}
            </ul>
          </div>
          <div style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.04em", color: "var(--typical-300)", border: "1px solid var(--line-on-dark-2)", borderRadius: "var(--r-pill)", padding: "6px 12px" }}>{f.principle}</div>
        </div>
        {/* persistent punchline */}
        <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--line-on-dark)", fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem,0.95rem+0.6vw,1.45rem)", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--text-on-dark-hi)", lineHeight: 1.3 }}>
          {t("The goal is not fewer parameters. ", "目标不是更少的参数。")}<span style={{ color: "var(--typical-400)" }}>{t("The goal is fewer surprises.", "而是更少的意外。")}</span>
        </div>
      </div>
    </section>
  );
}

/* 08 · The AI boundary — a read-only assistant layer. AI explains, answers,
   summarizes and drafts a report; every model change still routes through
   Preview Impact + the designer's confirmation. Layout: image-hero on the left,
   a vertical "boundary ledger" on the right that lights its commit half on scroll.
   (Function stays named ChNetwork — app.jsx's readiness map references it.) */
function ChNetwork() {
  const { ref, progress } = useScrollProgress();
  const aiMay = [["Explain impact", "解释影响"], ["Answer questions", "回答提问"], ["Summarize", "总结"], ["Prepare a report", "准备报告"]];
  const humanMay = [["Preview Impact", "预览影响"], ["Apply", "应用"]];
  const handoff = mapRange(progress, 0.45, 0.78, 0, 1); // the commit half lights up
  const co = [
    { key: "sum", x: 88, y: 38, tone: "var(--accent)", label: t("Read-only · explains impact", "只读 · 解释影响"), at: 0.10 },
    { key: "ask", x: 89, y: 47, tone: "var(--typical-400)", label: t("Plain-language Q&A", "自然语言问答"), at: 0.30 },
    { key: "prep", x: 88, y: 79, tone: "var(--ok-500)", label: t("Prepares a report", "准备报告"), at: 0.52 },
    { key: "disc", x: 83, y: 85, tone: "var(--text-on-dark-lo)", label: t("Changes need confirmation", "改动需确认"), at: 0.70 },
  ];
  const shownCo = co.filter((c) => progress >= c.at);
  return (
    <section ref={ref} data-screen-label="09 The AI boundary" style={{ height: "300vh", position: "relative", background: "transparent" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div className="wrap flow-grid" style={{ width: "100%", display: "grid", gridTemplateColumns: "1.12fr 0.88fr", gap: "clamp(24px,3.5vw,56px)", alignItems: "center" }}>
          {/* image hero — left */}
          <RealUI src={UI.ai} alt="Autodesk Assistant, read-only AI layer" callouts={shownCo} />
          {/* narrative + boundary ledger — right */}
          <div>
            <Eyebrow idx="09">{t("The AI boundary", "AI 的边界")}</Eyebrow>
            <h2 style={{ fontSize: "clamp(1.6rem,1.2rem+1.5vw,2.45rem)", fontWeight: 500, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.1, margin: "14px 0 0" }}>{t("AI prepares the decision. The designer makes it.", "AI 准备决策。设计师做出决策。")}</h2>
            <p style={{ fontSize: 15.5, color: "var(--text-on-dark-mid)", marginTop: 13, lineHeight: 1.55, maxWidth: 420 }}>{t("A read-only assistant explains the impact, answers questions and drafts a report, but every model change still routes through Preview Impact and your confirmation.", "一个只读助手解释影响、回答提问、起草报告，但任何模型改动仍要经过“预览影响”与你的确认。")}</p>
            {/* boundary ledger — read-only half, then commit half (lights up on scroll) */}
            <div style={{ marginTop: 22, maxWidth: 380 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 9 }}>{t("The assistant may · read-only", "助手可以 · 只读")}</div>
              {aiMay.map((a, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--text-on-dark-mid)", padding: "5px 0" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flex: "none" }} />{t(a[0], a[1])}</div>)}
              <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "15px 0" }}>
                <span style={{ flex: 1, height: 1, background: "var(--line-on-dark-2)" }} />
                <Icon name="lock" size={13} color="var(--text-on-dark-lo)" />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.14em", color: "var(--text-on-dark-lo)" }}>{t("BOUNDARY", "边界")}</span>
                <span style={{ flex: 1, height: 1, background: "var(--line-on-dark-2)" }} />
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: handoff > 0.4 ? "var(--ok-400)" : "var(--text-on-dark-lo)", marginBottom: 9, transition: "color .4s" }}>{t("Only the designer may · commit", "只有设计师可以 · 提交")}</div>
              {humanMay.map((h, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 500, color: handoff > 0.4 ? "var(--text-on-dark-hi)" : "var(--text-on-dark-lo)", padding: "5px 0", transition: "color .4s" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: handoff > 0.4 ? "var(--ok-500)" : "var(--text-on-dark-lo)", flex: "none", transition: "background .4s" }} />{t(h[0], h[1])}</div>)}
            </div>
            {/* verbatim in-product disclaimer */}
            <div style={{ marginTop: 20, paddingLeft: 13, borderLeft: "2px solid var(--line-on-dark-2)", fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--text-on-dark-lo)", lineHeight: 1.55, maxWidth: 400 }}>{t("Assistant can explain and summarize. Model changes require Preview Impact and user confirmation.", "助手可以解释与总结；模型改动需经过预览影响与用户确认。")}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 09 · Trust details — a featured viewer with a 6-thumbnail strip below. The first
   detail shows enlarged by default; hovering (or clicking) any thumbnail swaps the
   enlarged view with a soft fade. Order is by importance, not image number: adoption
   + governance lead, then the day-to-day confidence details. */
function ChLab() {
  const [ref, inView] = useInView(0.15);
  const [active, setActive] = useB(0);
  const details = [
    { num: "01", img: "assets/ui/lab-adopt.png", short: ["Adopt existing", "收编已有"], title: ["Adopt existing stairs into a system.", "把已有楼梯收编成系统。"], desc: ["StepWise can scan an existing stair core, identify typical levels, detect recurring exceptions, and suggest which duplicate types can become managed exceptions.", "StepWise 可以扫描已有楼梯核心，识别典型层、发现周期性例外，并建议哪些重复类型可以转成受管理的例外。"] },
    { num: "02", img: "assets/ui/lab-audit.png", short: ["Audit trail", "审计轨迹"], title: ["Make every exception traceable.", "让每个例外可追踪。"], desc: ["Each managed exception carries its origin, reason, reviewer and downstream checks, so a local variation does not become an unexplained duplicate type.", "每个受管理的例外都记录来源、原因、审阅人和下游检查，局部变化不再变成解释不清的重复类型。"] },
    { num: "03", img: "assets/ui/lab-param.png", short: ["Parameters", "解释参数"], title: ["Explain parameters visually.", "用几何解释参数。"], desc: ["Hover a stair parameter and the affected geometry is highlighted with a small before / after preview.", "悬停楼梯参数，对应几何会被点亮，并显示一个小的前后预览。"] },
    { num: "04", img: "assets/ui/lab-components.png", short: ["Components", "连接组件"], title: ["Reveal connected components.", "显示连接组件。"], desc: ["Click a landing to see the runs, railings, balusters, supports and views / tags that depend on it.", "点击平台，就能看到依赖它的梯段、栏杆、栏杆柱、支撑和视图 / 标签。"] },
    { num: "05", img: "assets/ui/lab-reconcile.png", short: ["Reconcile", "协调几何"], title: ["Reconcile connected geometry.", "协调连接几何。"], desc: ["When a floor-height change affects a run, StepWise suggests landing, railing and baluster checks. It previews options, but never silently changes the model.", "当层高变化影响梯段时，StepWise 提示平台、栏杆和栏杆柱检查。它提供预览，但绝不静默修改模型。"] },
    { num: "06", img: "assets/ui/lab-network.png", short: ["Network", "关联系统"], title: ["Stay aware of related stair systems.", "感知相关楼梯系统。"], desc: ["Editing East Stair flags West Stair's corresponding L12 condition for review. The relationship is visible, but never auto-synchronized.", "编辑 East Stair 时，StepWise 会标记 West Stair 在 L12 的对应条件供复查。关系可见，但绝不自动联动。"] },
  ];
  const a = details[active];
  return (
    <section data-screen-label="10 Trust details" className="slide" ref={ref} style={{ background: "transparent" }}>
      <div className="wrap" style={{ width: "100%" }}>
        <div style={{ maxWidth: 740, marginBottom: 22, opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(18px)", transition: "opacity .55s var(--ease-out), transform .55s var(--ease-out)" }}>
          <Eyebrow idx="10">{t("Trust details", "信任细节")}</Eyebrow>
          <h2 style={{ fontSize: "clamp(1.7rem,1.2rem+1.6vw,2.6rem)", fontWeight: 500, color: "#fff", letterSpacing: "-0.025em", margin: "14px 0 0", lineHeight: 1.12 }}>{t("Small details make the system usable in real Revit projects.", "小细节决定系统能不能进入真实 Revit 项目。")}</h2>
          <p style={{ fontSize: 15.5, color: "var(--text-on-dark-mid)", marginTop: 13, lineHeight: 1.55 }}>{t("StepWise is not only a new workspace. It must fit existing Revit models, existing stair types and existing team workflows: understandable while editing, safe across related systems, adoptable in active projects and traceable over time.", "StepWise 不只是一个新的工作台。它必须能进入已有的 Revit 模型、已有的楼梯类型与团队流程：编辑时可理解，关联系统间可控，进行中的项目可采用，并且能被长期追踪。")}</p>
        </div>
        {/* enlarged viewer — swaps with the hovered thumbnail */}
        <div style={{ borderRadius: "var(--r-lg)", border: "1px solid var(--line-on-dark-2)", background: "#070a0f", overflow: "hidden", boxShadow: "var(--shadow-float-dark)", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "opacity .55s var(--ease-out) .08s, transform .55s var(--ease-out) .08s" }}>
          <div key={active} className="scene-swap">
            <div style={{ aspectRatio: "16 / 9", background: "#0b0e13", borderBottom: "1px solid var(--line-on-dark)", overflow: "hidden" }}>
              <img src={a.img} alt={t(a.title[0], a.title[1])} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
            </div>
            <div style={{ padding: "18px 24px 22px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)" }}>{a.num}</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem,1rem+0.7vw,1.65rem)", fontWeight: 600, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.15 }}>{t(a.title[0], a.title[1])}</span>
              </div>
              <p style={{ fontSize: 14.5, color: "var(--text-on-dark-mid)", marginTop: 10, lineHeight: 1.55, maxWidth: 820 }}>{t(a.desc[0], a.desc[1])}</p>
              {a.why && <div style={{ marginTop: 14, paddingTop: 13, borderTop: "1px solid var(--line-on-dark)", maxWidth: 820 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 6 }}>{t("Why it matters", "为什么重要")}</div>
                <div style={{ fontSize: 13.5, color: "var(--text-on-dark-hi)", lineHeight: 1.5 }}>{t(a.why[0], a.why[1])}</div>
              </div>}
            </div>
          </div>
        </div>
        {/* thumbnail strip — six details, hover to enlarge */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginTop: 14 }}>
          {details.map((d, i) => {
            const on = active === i;
            return (
              <button key={i} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                style={{ textAlign: "left", cursor: "pointer", background: "transparent", border: 0, padding: 0, opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transition: "opacity .5s var(--ease-out) " + (0.2 + i * 0.05).toFixed(2) + "s, transform .5s var(--ease-out) " + (0.2 + i * 0.05).toFixed(2) + "s" }}>
                <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid " + (on ? "var(--typical-500)" : "var(--line-on-dark)"), background: "#0b0e13", opacity: on ? 1 : 0.58, transition: "opacity .3s, border-color .3s" }}>
                  <div style={{ aspectRatio: "16 / 10", overflow: "hidden" }}>
                    <img src={d.img} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 7 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: on ? "var(--accent)" : "var(--text-on-dark-lo)" }}>{d.num}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: on ? "#fff" : "var(--text-on-dark-mid)", letterSpacing: "0.02em" }}>{t(d.short[0], d.short[1])}</span>
                </div>
              </button>
            );
          })}
        </div>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.05rem,0.95rem+0.5vw,1.4rem)", fontWeight: 500, color: "var(--typical-300)", lineHeight: 1.3, maxWidth: 760, letterSpacing: "-0.01em", marginTop: 24, opacity: inView ? 1 : 0, transition: "opacity .6s var(--ease-out) .5s" }}>{t("Together, they turn StepWise from a feature concept into a maintainable BIM workflow.", "合在一起，它们把 StepWise 从一个功能概念，变成一套可维护的 BIM 工作流。")}</p>
      </div>
    </section>
  );
}

/* 10 · MVP scope board — In / Out + the core loop */
function ChMVP() {
  const [ref, inView] = useInView(0.25);
  const inn = [["System View","系统视图"],["Scope Selector","范围选择器"],["Exception Manager","例外管理器"],["Impact Preview","影响预览"],["Connected warnings","连接警告"],["Related system notice","关联系统提示"]];
  const out = [["Redo the creation toolbar","重做创建工具栏"],["Full code-compliance engine","完整合规引擎"],["AI auto-generate stairs","AI 自动生成楼梯"],["Replace Revit's type system","替换 Revit 类型系统"],["Auto-sync all stair systems","自动同步所有楼梯"]];
  const loop = [["Detect","侦测"],["Scope","范围"],["Exceptions","例外"],["Preview","预览"],["Apply","应用"]];
  return (
    <section data-screen-label="11 MVP scope" className="slide" ref={ref} style={{ background: "transparent" }}>
      <div className="wrap" style={{ width: "100%" }}>
        <Head idx="11" eye={t("MVP scope", "MVP 取舍")} title={t("Solve maintenance first. Keep Revit's precision.", "先解决维护。保留 Revit 的精确。")} style={{ maxWidth: 680, marginBottom: 28 }} />
        {/* core loop */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
          {loop.map((l, i) => (
            <React.Fragment key={i}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13.5, color: "#fff", border: "1px solid var(--accent)", background: "rgba(61,125,255,0.1)", borderRadius: "var(--r-pill)", padding: "8px 16px", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(10px)", transition: `all .4s ${i * 0.08}s` }}>{t(l[0], l[1])}</span>
              {i < loop.length - 1 && <Icon name="arrowR" size={15} color="var(--text-on-dark-lo)" />}
            </React.Fragment>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="ch12-grid">
          <div style={{ borderRadius: "var(--r-lg)", border: "1px solid rgba(30,174,110,0.3)", background: "rgba(30,174,110,0.04)", padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><span className="dot dot--ok" /><span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-on-dark-hi)" }}>{t("In MVP", "MVP 包含")}</span></div>
            {inn.map((x, i) => <div key={i} style={{ display: "flex", gap: 9, fontSize: 14.5, color: "var(--text-on-dark-mid)", padding: "6px 0" }}><Icon name="check" size={14} color="var(--ok-400)" style={{ flex: "none", marginTop: 1 }} />{t(x[0], x[1])}</div>)}
          </div>
          <div style={{ borderRadius: "var(--r-lg)", border: "1px solid var(--line-on-dark)", background: "#070a0f", padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--text-on-dark-lo)" }} /><span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-on-dark-lo)" }}>{t("Out of MVP", "MVP 不做")}</span></div>
            {out.map((x, i) => <div key={i} style={{ display: "flex", gap: 9, fontSize: 14.5, color: "var(--text-on-dark-lo)", padding: "6px 0" }}><span style={{ width: 14, textAlign: "center", flex: "none" }}>×</span>{t(x[0], x[1])}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 11 · Success metrics — before / after workflow timeline */
function ChMetrics() {
  const { ref, progress } = useScrollProgress();
  const reveal = progress > 0.4;
  const before = [["Open nested dialogs","打开嵌套对话框"],["Copy / paste vertically","纵向复制粘贴"],["Duplicate types","复制类型"],["Hunt for impact","排查影响"],["Hope nothing broke","祈祷没弄坏"]];
  const after = [["Detect","侦测"],["Scope","范围"],["Exceptions","例外"],["Preview","预览"],["Apply","应用"]];
  const metrics = [["Update time","更新耗时","↓","½ day → minutes","半天 → 几分钟"],["Duplicate types","重复类型","↓","fewer, traceable","更少、可追踪"],["Missed updates","漏改","↓","landing / railing","平台 / 栏杆"],["Confidence before Apply","应用前的信心","↑","predictable","可预测"]];
  return (
    <section ref={ref} data-screen-label="12 Success metrics" style={{ height: "230vh", position: "relative", background: "transparent" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div className="wrap" style={{ width: "100%" }}>
          <Head idx="12" eye={t("Success metrics", "成功指标")} title={t("From an afternoon to a short, legible flow.", "从一个下午，到一条简短、可读的流程。")} style={{ maxWidth: 680, marginBottom: 26 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }} className="ch12-grid">
            <div style={{ borderRadius: "var(--r-lg)", border: "1px solid var(--line-on-dark)", background: "#070a0f", padding: 18, opacity: 0.6 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--warn-400)", marginBottom: 12 }}>{t("Before", "之前")}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>{before.map((b, i) => <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--text-on-dark-mid)", border: "1px solid var(--line-on-dark)", borderRadius: "var(--r-sm)", padding: "6px 11px" }}>{t(b[0], b[1])}</span>)}</div>
            </div>
            <div style={{ borderRadius: "var(--r-lg)", border: "1px solid var(--accent)", background: "rgba(61,125,255,0.05)", padding: 18 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 12 }}>{t("After", "之后")}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>{after.map((a, i) => <React.Fragment key={i}><span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "#fff", background: "rgba(61,125,255,0.16)", borderRadius: "var(--r-sm)", padding: "6px 11px" }}>{t(a[0], a[1])}</span>{i < after.length - 1 && <span style={{ color: "var(--text-on-dark-lo)" }}>→</span>}</React.Fragment>)}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }} className="metrics-grid">
            {metrics.map((m, i) => {
              const up = m[2] === "↑";
              return (
                <div key={i} style={{ borderRadius: "var(--r-md)", border: "1px solid var(--line-on-dark)", background: "var(--bg-canvas-raised)", padding: 16, opacity: reveal ? 1 : 0.3, transform: reveal ? "none" : "translateY(12px)", transition: `all .45s ${i * 0.08}s` }}>
                  <div style={{ fontSize: 14.5, color: "var(--text-on-dark-mid)", marginBottom: 8, lineHeight: 1.35 }}>{t(m[0], m[1])}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 600, color: up ? "var(--ok-400)" : "var(--accent)" }}>{m[2]}</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--text-on-dark-lo)", marginTop: 6, lineHeight: 1.4 }}>{t(m[3], m[4])}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 12 · Closing */
function ChClosing() {
  return (
    <section data-screen-label="13 Closing" className="slide" style={{ flexDirection: "column", justifyContent: "space-between", paddingBottom: 34, overflow: "hidden", background: "transparent" }}>
      <div className="ph ph-bg" aria-hidden="true" style={{ background: "transparent" }}><div className="ph__inner">
        <Placeholder kind="model" label={t("Complexity resolves to a clean stair system", "复杂收束为干净的楼梯系统")} sub={t("Parameter windows fade · lines contract · warnings clear · camera settles", "参数窗口淡出 · 连线收束 · 警告消失 · 镜头定格")} style={{ border: 0, background: "transparent", padding: 0 }} />
      </div></div>
      <div className="wrap" style={{ position: "relative", zIndex: 2, marginTop: "auto" }}>
        <div className="reveal"><Eyebrow>{t("Closing · 13", "结语 · 13")}</Eyebrow></div>
        <h2 className="reveal" data-delay="1" style={{ fontSize: "clamp(2rem,1.2rem+3.2vw,3.7rem)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.08, marginTop: 20, color: "#fff", textWrap: "balance", maxWidth: 1000 }}>{t("StepWise puts stair intent back in the designer's hands.", "StepWise 把楼梯的设计意图，交还到设计师手中。")}</h2>
        <p className="reveal" data-delay="2" style={{ fontSize: "clamp(1.05rem,0.9rem+0.5vw,1.35rem)", color: "var(--text-on-dark-mid)", lineHeight: 1.5, marginTop: 16 }}>{t("From scattered types to a guided stair system, every change becomes visible, scoped, and ready for the next step.", "从零散的类型，到一套有引导的楼梯系统，每一次改动都变得可见、可界定，并为下一步做好准备。")}</p>
        <div className="reveal" data-delay="2" style={{ borderTop: "1px solid rgba(255,255,255,0.14)", marginTop: 24, paddingTop: 20, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.15rem,0.9rem+0.8vw,1.7rem)", color: "#fff", letterSpacing: "-0.01em" }}>StepWise <span style={{ color: "var(--text-on-dark-lo)", fontWeight: 500 }}>for Revit</span></div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", textAlign: "right", lineHeight: 1.65 }}>
            <div style={{ color: "#fff" }}>Yushi Wang · StepWise for Revit</div>
            {t("Autodesk Revit case study · 2026", "Autodesk Revit 案例研究 · 2026")}
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { ChArchitecture, ChWorkspace, ChFlow, ChNetwork, ChLab, ChMVP, ChMetrics, ChClosing });
