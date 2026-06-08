// lib/ui.jsx — shared presentational primitives for the case study.
const { useState: _uS } = React;

/* Eyebrow / section index label */
function Eyebrow({ idx, children, muted, style }) {
  return (
    <span className={"eyebrow" + (muted ? " eyebrow--muted" : "")} style={style}>
      {idx && <span className="eyebrow__idx">{idx}</span>}
      {idx && <span style={{ width: 18, height: 1, background: "currentColor", opacity: 0.4, display: "inline-block" }} />}
      {children}
    </span>
  );
}

/* Section header block: eyebrow + headline + optional lede */
function SectionHead({ idx, eyebrow, title, lede, align = "left", maxw, light }) {
  const color = light ? "var(--text-strong)" : "var(--text-on-dark-hi)";
  const ledeColor = light ? "var(--text-body)" : "var(--text-on-dark-mid)";
  return (
    <header style={{ textAlign: align, maxWidth: maxw || 760, marginInline: align === "center" ? "auto" : 0 }}>
      {eyebrow && <div className="reveal"><Eyebrow idx={idx}>{eyebrow}</Eyebrow></div>}
      <h2 className="reveal" data-delay="1" style={{ fontSize: "var(--fs-2xl)", color, marginTop: 18, textWrap: "balance", fontWeight: 500 }}>
        {title}
      </h2>
      {lede && <p className="reveal" data-delay="2" style={{ fontSize: "var(--fs-md)", lineHeight: "var(--lh-relaxed)", color: ledeColor, marginTop: 20, maxWidth: 620, marginInline: align === "center" ? "auto" : 0, textWrap: "pretty" }}>{lede}</p>}
    </header>
  );
}

/* Light "tool window" chrome — represents the Stair System Manager app surface. */
function AppWindow({ title, sub, children, style, tabs, activeTab, onTab, statusRight, flush }) {
  return (
    <div style={{
      background: "var(--surface-panel)", borderRadius: "var(--r-lg)",
      boxShadow: "var(--shadow-panel)", overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.06)", ...style,
    }}>
      {/* titlebar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderBottom: "1px solid var(--line-on-light)", background: "var(--surface-sunken)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#E0E3E9" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#E0E3E9" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#E0E3E9" }} />
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginLeft: 4 }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13.5, color: "var(--text-strong)", letterSpacing: "-0.01em" }}>{title}</span>
          {sub && <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>{sub}</span>}
        </div>
        <div style={{ marginLeft: "auto" }}>{statusRight}</div>
      </div>
      {/* tabs */}
      {tabs && (
        <div style={{ display: "flex", gap: 2, padding: "0 10px", borderBottom: "1px solid var(--line-on-light)", background: "var(--surface-panel)" }}>
          {tabs.map((t) => (
            <button key={t} onClick={() => onTab && onTab(t)} style={{
              appearance: "none", border: 0, background: "none", cursor: "pointer",
              fontFamily: "var(--font-sans)", fontSize: 12.5, fontWeight: 500,
              padding: "11px 12px", color: t === activeTab ? "var(--accent-strong)" : "var(--text-muted)",
              borderBottom: t === activeTab ? "2px solid var(--accent)" : "2px solid transparent",
              marginBottom: -1, transition: "color var(--dur-fast) var(--ease-out)",
            }}>{t}</button>
          ))}
        </div>
      )}
      <div style={{ padding: flush ? 0 : 0 }}>{children}</div>
    </div>
  );
}

/* Button */
function Btn({ children, variant = "primary", size = "md", icon, onClick, style, disabled }) {
  const sizes = { sm: { p: "7px 12px", fs: 12.5 }, md: { p: "10px 16px", fs: 13.5 }, lg: { p: "13px 22px", fs: 15 } };
  const s = sizes[size];
  const variants = {
    primary: { background: "var(--accent)", color: "#fff", border: "1px solid var(--accent)" },
    strong:  { background: "var(--accent-strong)", color: "#fff", border: "1px solid var(--accent-strong)" },
    ghost:   { background: "transparent", color: "var(--text-body)", border: "1px solid var(--line-on-light-2)" },
    ghostDark:{ background: "rgba(255,255,255,0.06)", color: "var(--text-on-dark-hi)", border: "1px solid var(--line-on-dark-2)" },
    warn:    { background: "var(--warn-500)", color: "#fff", border: "1px solid var(--warn-500)" },
    quiet:   { background: "var(--surface-inset)", color: "var(--text-body)", border: "1px solid transparent" },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      appearance: "none", cursor: disabled ? "default" : "pointer", borderRadius: "var(--r-sm)",
      fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: s.fs, padding: s.p,
      display: "inline-flex", alignItems: "center", gap: 7, lineHeight: 1,
      opacity: disabled ? 0.5 : 1, transition: "filter var(--dur-fast), transform var(--dur-fast)",
      ...variants[variant], ...style,
    }}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = "translateY(1px)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "none")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}>
      {icon}{children}
    </button>
  );
}

/* Parameter row used in property panels */
function ParamRow({ label, value, status, overridden, locked, onHover, active }) {
  const statusColor = status === "warn" ? "var(--warn-500)" : status === "exception" ? "var(--exception-500)" : "var(--text-strong)";
  return (
    <div onMouseEnter={onHover}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "9px 12px", borderRadius: "var(--r-sm)", gap: 12,
        background: active ? "var(--accent-tint)" : "transparent",
        cursor: onHover ? "pointer" : "default",
        transition: "background var(--dur-fast) var(--ease-out)",
      }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "var(--text-body)", fontFamily: "var(--font-sans)" }}>
        {locked && <Icon name="lock" size={12} color="var(--text-faint)" />}
        {label}
      </span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
        {overridden && <span className="tag tag--exception" style={{ padding: "2px 6px" }}>override</span>}
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: statusColor, fontWeight: overridden ? 600 : 400 }}>{value}</span>
      </span>
    </div>
  );
}

/* Minimal inline icon set (stroke, 1.6) — geometric to match the tool */
function Icon({ name, size = 16, color = "currentColor", style }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", style };
  const paths = {
    tree: <g><path d="M12 4v6M12 14v6M6 14v2M18 14v2"/><circle cx="12" cy="4" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M6 16v-2h12v2"/></g>,
    target: <g><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/></g>,
    branch: <g><circle cx="6" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="8" r="2.2"/><path d="M6 8.2v7.6M8.2 6h5.2a2.6 2.6 0 0 1 2.6 2.6v.2"/></g>,
    eye: <g><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></g>,
    lock: <g><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></g>,
    warn: <g><path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17.5v.2"/></g>,
    check: <path d="M5 12.5 10 17 19 7"/>,
    layers: <g><path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="M3 13l9 5 9-5M3 18l9 5 9-5"/></g>,
    arrowR: <path d="M5 12h14M13 6l6 6-6 6"/>,
    sliders: <g><path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/></g>,
    sparkle: <g><path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"/></g>,
    grid: <g><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></g>,
    plus: <path d="M12 5v14M5 12h14"/>,
    clock: <g><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></g>,
    copy: <g><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></g>,
  };
  return <svg {...p}>{paths[name] || null}</svg>;
}

/* ---- Slide foreground head: index + eyebrow + big title + copy ---- */
function SlideHead({ idx, eyebrow, title, copy, copy2, align = "left", max = 680, accent }) {
  return (
    <header style={{ textAlign: align, maxWidth: max, marginInline: align === "center" ? "auto" : 0 }}>
      <div className="reveal" style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: align === "center" ? "center" : "flex-start" }}>
        {idx && <span style={{ fontFamily: "var(--font-mono)", fontSize: "var(--fs-mono-sm)", letterSpacing: "0.14em", color: "var(--text-on-dark-lo)" }}>{idx}</span>}
        {eyebrow && <Eyebrow style={{ color: accent || "var(--accent)" }}>{eyebrow}</Eyebrow>}
      </div>
      <h2 className="reveal" data-delay="1" style={{ fontSize: "clamp(2rem, 1.3rem + 2.8vw, 3.4rem)", fontWeight: 500, color: "#fff", marginTop: 18, lineHeight: 1.06, letterSpacing: "-0.025em", textWrap: "balance" }}>{title}</h2>
      {copy && <p className="reveal" data-delay="2" style={{ fontSize: "clamp(1.05rem, 0.95rem + 0.5vw, 1.3rem)", lineHeight: 1.5, color: "var(--text-on-dark-mid)", marginTop: 22, maxWidth: 600, marginInline: align === "center" ? "auto" : 0, textWrap: "pretty" }}>{copy}</p>}
      {copy2 && <p className="reveal" data-delay="3" style={{ fontSize: "clamp(1.05rem, 0.95rem + 0.5vw, 1.3rem)", lineHeight: 1.5, color: "var(--text-on-dark-hi)", marginTop: 16, maxWidth: 600, marginInline: align === "center" ? "auto" : 0, fontWeight: 500, textWrap: "pretty" }}>{copy2}</p>}
    </header>
  );
}

/* ---- Visual placeholder: dashed zone the user will replace with video / a UI screenshot ---- */
function Placeholder({ label, sub, kind = "ui", style, minHeight }) {
  const meta = {
    video:    { icon: "eye",     tone: "var(--typical-400)", tag: "VIDEO" },
    model:    { icon: "layers",  tone: "var(--typical-400)", tag: "3D" },
    ui:       { icon: "grid",    tone: "var(--accent)",      tag: "UI" },
    evidence: { icon: "tree",    tone: "var(--exception-400)", tag: "REF" },
    abstract: { icon: "sparkle", tone: "var(--ok-400)",      tag: "ABSTRACT" },
  }[kind] || { icon: "grid", tone: "var(--accent)", tag: "UI" };
  return (
    <div className="ph" style={{ ...(minHeight ? { minHeight } : {}), ...style }}>
      <div className="ph__inner">
        <span className="ph__tag" style={{ color: meta.tone, borderColor: meta.tone }}>
          <Icon name={meta.icon} size={13} color={meta.tone} />{meta.tag}
        </span>
        <span className="ph__label">{label}</span>
        {sub && <span className="ph__sub">{sub}</span>}
      </div>
      <span className="ph__corner ph__corner--tl" /><span className="ph__corner ph__corner--tr" />
      <span className="ph__corner ph__corner--bl" /><span className="ph__corner ph__corner--br" />
    </div>
  );
}

Object.assign(window, { Eyebrow, SectionHead, SlideHead, AppWindow, Btn, ParamRow, Icon, Placeholder });
