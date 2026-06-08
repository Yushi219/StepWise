// lib/StairStack.jsx — the core reusable building-section / stair-stack diagram.
// Renders a vertical stack of floors as a clean architectural section, with a
// stepped stair flight per floor. Status-colored (typical / exception / warn).
const { useMemo: _useMemo } = React;

const STATUS_STROKE = {
  ok:        "var(--typical-500)",
  typical:   "var(--typical-500)",
  exception: "var(--exception-500)",
  warn:      "var(--warn-500)",
  dim:       "var(--ink-400)",
};
const STATUS_FILL = {
  ok:        "rgba(61,125,255,0.10)",
  typical:   "rgba(61,125,255,0.10)",
  exception: "rgba(245,132,31,0.13)",
  warn:      "rgba(242,68,56,0.13)",
  dim:       "rgba(255,255,255,0.02)",
};

/* Build a stepped stair flight path inside a floor band. */
function flightPath(x0, yBottom, w, h, steps, dir) {
  const sx = w / steps;
  const sy = h / steps;
  let d = `M ${x0} ${yBottom}`;
  let x = x0, y = yBottom;
  for (let i = 0; i < steps; i++) {
    y -= sy; d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;   // riser (up)
    x += sx; d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;   // tread (over)
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
    floors = [], width = 360, floorHeight = 46,
    activeIndex = -1, affected = [], showLabels = true,
    showGrid = true, dimUnhighlighted = false, drawProgress = 1,
    onFloorClick, compact = false, ghostOverlay = null,
  } = props;

  const padT = 18, padB = 18;
  const labelW = showLabels ? 52 : 8;
  const rightPad = 18;
  const n = floors.length;
  const H = padT + padB + n * floorHeight;
  const stairX0 = labelW + 18;
  const stairW = width - stairX0 - rightPad - (compact ? 0 : 70);
  const steps = compact ? 5 : 7;
  const affectedSet = new Set(affected);

  // y of a floor's bottom line (floor i sits above line i)
  const lineY = (i) => H - padB - i * floorHeight;

  const flightsToDraw = Math.round(drawProgress * n);

  return (
    <svg viewBox={`0 0 ${width} ${H}`} width="100%" style={{ display: "block", overflow: "visible" }} role="img" aria-label="Building section showing a multi-level stair system">
      {/* grid level lines */}
      {showGrid && floors.map((f, i) => {
        const y = lineY(i);
        return (
          <line key={"g"+i} x1={labelW} y1={y} x2={width - rightPad} y2={y}
            stroke="var(--line-on-dark)" strokeWidth="1" />
        );
      })}
      {/* top cap line */}
      {showGrid && <line x1={labelW} y1={lineY(n)} x2={width - rightPad} y2={lineY(n)} stroke="var(--line-on-dark)" strokeWidth="1" />}

      {floors.map((f, i) => {
        const yB = lineY(i);
        const yT = lineY(i + 1);
        const fh = yB - yT;
        const isActive = i === activeIndex;
        const isAffected = affectedSet.has(i);
        const status = f.status || "typical";
        const stroke = STATUS_STROKE[status];
        const dimmed = dimUnhighlighted && !isActive && !isAffected && activeIndex >= 0;
        const drawn = i < flightsToDraw;
        const opacity = drawn ? (dimmed ? 0.22 : 1) : 0;

        return (
          <g key={i} style={{ transition: "opacity 360ms var(--ease-out)", opacity }}
             onClick={onFloorClick ? () => onFloorClick(i) : undefined}
             cursor={onFloorClick ? "pointer" : "default"}>
            {/* active / affected band fill */}
            {(isActive || isAffected) && (
              <rect x={labelW} y={yT} width={width - rightPad - labelW} height={fh}
                fill={STATUS_FILL[status]} />
            )}
            {/* affected outline */}
            {isAffected && (
              <rect x={labelW + 0.5} y={yT + 0.5} width={width - rightPad - labelW - 1} height={fh - 1}
                fill="none" stroke={stroke} strokeWidth="1.25" strokeDasharray={status === "exception" ? "0" : "0"} opacity="0.8" />
            )}
            {/* the stair flight */}
            <path d={flightPath(stairX0, yB, stairW, fh, steps, 1)}
              fill="none" stroke={stroke} strokeWidth={isActive ? 2.4 : 1.7}
              strokeLinejoin="round" strokeLinecap="round"
              strokeDasharray={f.ghost ? "3 4" : "0"}
              opacity={f.ghost ? 0.7 : 1}
              style={{ filter: isActive ? "drop-shadow(0 0 6px " + stroke + ")" : "none" }} />
            {/* landing slab at top of flight */}
            <line x1={stairX0 + stairW} y1={yT} x2={stairX0 + stairW + 26} y2={yT}
              stroke={stroke} strokeWidth={isActive ? 2.4 : 1.7} strokeLinecap="round"
              opacity={f.ghost ? 0.6 : 1} />
            {/* status node on the level line */}
            <circle cx={labelW} cy={yB} r="2.5" fill={stroke} opacity={dimmed ? 0.3 : 1} />
          </g>
        );
      })}

      {/* ghost overlay flights (proposed change preview) */}
      {ghostOverlay && ghostOverlay.map((g, k) => {
        const i = g.index; const yB = lineY(i); const yT = lineY(i+1); const fh = yB - yT;
        return (
          <path key={"gh"+k} d={flightPath(stairX0, yB, stairW, fh, steps, 1)}
            fill="none" stroke="var(--ghost-line)" strokeWidth="2" strokeDasharray="4 4"
            strokeLinejoin="round" opacity="0.9" />
        );
      })}

      {/* labels */}
      {showLabels && floors.map((f, i) => {
        const yB = lineY(i);
        const isActive = i === activeIndex;
        const isAffected = affectedSet.has(i);
        const status = f.status || "typical";
        const dimmed = dimUnhighlighted && !isActive && !isAffected && activeIndex >= 0;
        const drawn = i < flightsToDraw;
        return (
          <text key={"l"+i} x={labelW - 10} y={yB - floorHeight/2 + 3} textAnchor="end"
            fontFamily="var(--font-mono)" fontSize="9.5"
            fill={isActive || isAffected ? STATUS_STROKE[status] : "var(--text-on-dark-lo)"}
            opacity={drawn ? (dimmed ? 0.3 : 1) : 0}
            style={{ transition: "opacity 360ms var(--ease-out)" }}>
            {f.label}
          </text>
        );
      })}
    </svg>
  );
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
    if (warnAt.has(levelNum)) status = "warn";
    else if (exceptionEvery && levelNum % exceptionEvery === 0 && levelNum !== count) status = "exception";
    const label = levelNum === 1 ? "L01" : "L" + String(levelNum).padStart(2, "0");
    arr.push({ label, status, level: levelNum });
  }
  return arr;
}

Object.assign(window, { StairStack, makeTower });
