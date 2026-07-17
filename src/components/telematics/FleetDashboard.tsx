import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

/**
 * Coded EV fleet-management dashboard.
 *
 * Rendered rather than screenshotted, so it stays crisp at any size, weighs
 * almost nothing, and can be corrected in code when the real product changes.
 *
 * Everything shown maps to a capability Webber actually ships (4G/IoT
 * telematics: live location, geofencing, battery state, cell balancing,
 * temperature-based fault detection). Predictive maintenance is on the roadmap,
 * so it is labelled as such rather than presented as live.
 *
 * All values are fixed demo data: no Math.random or Date.now, which would
 * desync between the server and client render.
 */

/** 16S pack, one cell low and actively balancing. */
const CELLS = [
  3.94, 3.95, 3.93, 3.96, 3.95, 3.94, 3.96, 3.72, 3.95, 3.94, 3.96, 3.95, 3.93,
  3.95, 3.94, 3.96,
];
const BALANCING_CELL = 7;
const CELL_MIN = 3.6;
const CELL_MAX = 4.0;

const SOC = 78;
const RING_R = 34;
const RING_C = 2 * Math.PI * RING_R;

/** Pack current trace, duplicated so the scroll loops seamlessly. */
const TRACE = [
  18, 22, 19, 26, 31, 28, 24, 20, 23, 29, 34, 30, 25, 21, 19, 24, 27, 23, 20, 22,
];

const EVENTS = [
  { id: "WB-1188", text: "Cell 11 over-temperature. Pack isolated.", time: "14:32", level: "fault" },
  { id: "WB-2041", text: "Charging started. Balancing active.", time: "14:28", level: "info" },
  { id: "WB-0673", text: "Geofence exit, Zone A-4.", time: "14:11", level: "warn" },
] as const;

const FLEET = [
  { label: "2W", value: "912" },
  { label: "3W", value: "268" },
  { label: "ESS", value: "54" },
  { label: "DRONES", value: "14" },
] as const;

const ROUTE = "M 24 168 C 78 132, 128 150, 176 108 S 268 74, 312 106 S 372 150, 388 132";

function tracePoints(offsetX: number) {
  return TRACE.map((v, i) => `${offsetX + i * 8},${44 - v}`).join(" ");
}

export function FleetDashboard() {
  return (
    <div
      className="overflow-hidden rounded-[6px] border border-grey-200 bg-white/60 backdrop-blur-xl backdrop-saturate-150"
      role="img"
      aria-label="Webber fleet dashboard: live asset locations with a geofence, pack state of charge at 78 percent, pack current, 16 cell voltages with one cell balancing, and a feed of fault and geofence events."
    >
      {/* title bar */}
      <div className="flex items-center justify-between gap-4 border-b border-grey-200 px-4 py-3">
        <TechnicalLabel>WEBBER FLEET / LIVE</TechnicalLabel>
        <span className="flex items-center gap-2">
          <span className="dash-live h-1.5 w-1.5 rounded-full bg-blue-600" aria-hidden="true" />
          <span className="micro-label">1,248 ASSETS ONLINE</span>
        </span>
      </div>

      <div className="grid gap-px bg-grey-100 lg:grid-cols-[1.35fr_1fr]" aria-hidden="true">
        {/* ---------------- map ---------------- */}
        <div className="relative bg-white/70 p-4">
          <svg viewBox="0 0 400 200" className="h-full w-full">
            <defs>
              <pattern id="dash-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0 H0 V20" fill="none" stroke="var(--grey-100)" strokeWidth="1" />
              </pattern>
              <radialGradient id="dash-glow">
                <stop offset="0%" stopColor="rgba(46,123,255,.45)" />
                <stop offset="100%" stopColor="rgba(46,123,255,0)" />
              </radialGradient>
            </defs>
            <rect width="400" height="200" fill="url(#dash-grid)" />

            {/* geofence */}
            <polygon
              points="56,44 214,30 300,74 268,158 108,168"
              fill="rgba(46,123,255,.05)"
              stroke="var(--blue-500)"
              strokeWidth="1"
              strokeDasharray="5 4"
            />
            <text x="62" y="26" style={{ font: "500 8px var(--font-mono)", letterSpacing: ".08em", fill: "var(--blue-600)" }}>
              GEOFENCE / ZONE A-4
            </text>

            {/* route + assets tracking it */}
            <path d={ROUTE} fill="none" stroke="var(--blue-200)" strokeWidth="1.5" />
            {[0, -5, -9].map((delay, i) => (
              <g key={i} className="dash-asset" style={{ offsetPath: `path("${ROUTE}")`, animationDelay: `${delay}s` }}>
                <circle r="7" fill="url(#dash-glow)" />
                <circle r="3" fill="var(--blue-600)" />
              </g>
            ))}

            {/* the asset that raised the fault */}
            <g>
              <circle cx="330" cy="150" r="9" fill="rgba(185,56,50,.12)" />
              <circle cx="330" cy="150" r="3.5" fill="var(--error)" />
              <text x="340" y="153" style={{ font: "500 8px var(--font-mono)", letterSpacing: ".06em", fill: "var(--error)" }}>
                WB-1188
              </text>
            </g>
            <circle cx="120" cy="60" r="3" fill="var(--grey-400)" />
            <circle cx="250" cy="120" r="3" fill="var(--grey-400)" />
          </svg>
        </div>

        {/* ---------------- right column ---------------- */}
        <div className="space-y-px bg-grey-100">
          {/* SoC + current */}
          <div className="flex items-center gap-4 bg-white/70 p-4">
            <svg width="84" height="84" viewBox="0 0 84 84" className="shrink-0">
              <circle cx="42" cy="42" r={RING_R} fill="none" stroke="var(--grey-100)" strokeWidth="7" />
              <circle
                className="dash-ring"
                cx="42"
                cy="42"
                r={RING_R}
                fill="none"
                stroke="var(--blue-600)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={RING_C}
                strokeDashoffset={RING_C * (1 - SOC / 100)}
                transform="rotate(-90 42 42)"
              />
              <text x="42" y="40" textAnchor="middle" style={{ font: "500 17px var(--font-mono)", fill: "var(--ink)" }}>
                {SOC}
              </text>
              <text x="42" y="53" textAnchor="middle" style={{ font: "500 7px var(--font-mono)", letterSpacing: ".1em", fill: "var(--grey-500)" }}>
                % SOC
              </text>
            </svg>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between">
                <TechnicalLabel>PACK CURRENT</TechnicalLabel>
                <span className="spec-value !text-blue-700">24 A</span>
              </div>
              <div className="mt-2 overflow-hidden rounded-[3px] border border-grey-100 bg-grey-50">
                <svg viewBox="0 0 160 44" className="h-11 w-full" preserveAspectRatio="none">
                  <g className="dash-trace">
                    <polyline points={tracePoints(0)} fill="none" stroke="var(--blue-500)" strokeWidth="1.5" />
                    <polyline points={tracePoints(160)} fill="none" stroke="var(--blue-500)" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* cell balance */}
          <div className="bg-white/70 p-4">
            <div className="flex items-baseline justify-between">
              <TechnicalLabel>CELL VOLTAGES / 16S</TechnicalLabel>
              <span className="micro-label micro-label--blue">BALANCING</span>
            </div>
            <div className="mt-3 flex h-16 items-end gap-[3px]">
              {CELLS.map((v, i) => {
                const h = ((v - CELL_MIN) / (CELL_MAX - CELL_MIN)) * 100;
                const low = i === BALANCING_CELL;
                return (
                  <span
                    key={i}
                    className={`flex-1 rounded-[1px] ${low ? "dash-balancing bg-blue-600" : "bg-blue-200"}`}
                    style={{ height: `${h}%` }}
                  />
                );
              })}
            </div>
            <div className="mt-2 flex justify-between">
              <span className="micro-label">Δ 240 mV</span>
              <span className="micro-label">CELL 08 / 3.72 V</span>
            </div>
          </div>

          {/* events */}
          <div className="bg-white/70 p-4">
            <TechnicalLabel>EVENT FEED</TechnicalLabel>
            <ul className="mt-3 space-y-2">
              {EVENTS.map((e) => (
                <li key={e.id} className="flex items-start gap-2">
                  <span
                    className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full ${
                      e.level === "fault"
                        ? "bg-error"
                        : e.level === "warn"
                          ? "bg-blue-300"
                          : "bg-grey-300"
                    }`}
                  />
                  <span className="min-w-0 flex-1 text-[0.8125rem] leading-snug text-ink-soft">
                    <span className="spec-value !text-[0.75rem]">{e.id}</span> {e.text}
                  </span>
                  <span className="micro-label shrink-0">{e.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* fleet split */}
      <div className="grid grid-cols-4 divide-x divide-grey-200 border-t border-grey-200" aria-hidden="true">
        {FLEET.map((f) => (
          <div key={f.label} className="px-4 py-3">
            <p className="spec-value !text-[1.05rem] text-ink">{f.value}</p>
            <p className="micro-label mt-0.5">{f.label}</p>
          </div>
        ))}
      </div>

      <p className="border-t border-grey-200 px-4 py-2 text-[0.6875rem] text-grey-400">
        Representative interface. Predictive maintenance is in development.
      </p>
    </div>
  );
}
