/** Small technical SVG charts for the differentiator modules. */

export function ChargingCurveChart() {
  return (
    <svg viewBox="0 0 400 220" className="w-full" role="img" aria-label="Charging curve with controlled balancing interventions">
      <line x1="40" y1="180" x2="380" y2="180" stroke="var(--grey-300)" />
      <line x1="40" y1="20" x2="40" y2="180" stroke="var(--grey-300)" />
      {/* pack-voltage-only curve */}
      <path d="M40 170 C 120 90, 200 70, 370 62" fill="none" stroke="var(--grey-400)" strokeWidth="1.5" strokeDasharray="5 4" />
      {/* cell-state curve with balancing interventions */}
      <path d="M40 170 C 110 85, 160 70, 210 58 L 225 60 C 270 48, 310 42, 370 36" fill="none" stroke="var(--blue-600)" strokeWidth="2" />
      {[210, 225].map((x, i) => (
        <circle key={i} cx={x} cy={i === 0 ? 58 : 60} r="3.5" fill="var(--canvas)" stroke="var(--blue-600)" strokeWidth="1.5" />
      ))}
      <text x="250" y="30" style={{ font: "500 10px var(--font-mono)", letterSpacing: "0.08em", fill: "var(--blue-700)" }}>
        CELL-STATE CONTROL
      </text>
      <text x="240" y="92" style={{ font: "500 10px var(--font-mono)", letterSpacing: "0.08em", fill: "var(--grey-500)" }}>
        PACK-VOLTAGE ONLY
      </text>
      <text x="44" y="200" style={{ font: "500 10px var(--font-mono)", letterSpacing: "0.08em", fill: "var(--grey-400)" }}>
        CHARGE TIME →
      </text>
    </svg>
  );
}

export function DispersionChart() {
  const before = [62, 118, 45, 96, 74, 128, 55, 102];
  const after = [86, 92, 84, 90, 87, 93, 85, 90];
  return (
    <svg viewBox="0 0 400 220" className="w-full" role="img" aria-label="Cell voltage dispersion before and after high-current balancing">
      {before.map((h, i) => (
        <rect key={`b${i}`} x={30 + i * 20} y={180 - h} width="12" height={h} fill="var(--grey-300)" />
      ))}
      {after.map((h, i) => (
        <rect key={`a${i}`} x={230 + i * 20} y={180 - h} width="12" height={h} fill="var(--blue-500)" />
      ))}
      <line x1="20" y1="180" x2="390" y2="180" stroke="var(--grey-300)" />
      <text x="30" y="205" style={{ font: "500 10px var(--font-mono)", letterSpacing: "0.08em", fill: "var(--grey-500)" }}>
        BEFORE
      </text>
      <text x="230" y="205" style={{ font: "500 10px var(--font-mono)", letterSpacing: "0.08em", fill: "var(--blue-700)" }}>
        AFTER / 400 mA BALANCING
      </text>
    </svg>
  );
}

/**
 * The signal path from cell to fleet, as a schematic rather than a stack of
 * boxes: each stage carries what it actually does and the signal leaving it,
 * and the stages Webber owns are marked as the core. A pulse runs the spine so
 * the direction of flow is legible without arrowheads.
 *
 * Every descriptor maps to a real spec (16S to 32S, 400 mA balancing, isolated
 * CAN, 4G/IoT).
 */
const ARCHITECTURE = [
  {
    label: "CELLS",
    note: "16S to 32S packs, 12V to 1200V systems.",
    tag: "mV",
  },
  {
    label: "SENSING",
    note: "Cell voltage, pack current and temperature channels.",
    tag: "ANALOG",
  },
  {
    label: "DECISION LAYER",
    note: "State of charge and power, charging control, fault logic.",
    tag: "FIRMWARE",
    core: true,
  },
  {
    label: "PROTECTION + BALANCING",
    note: "Over/under voltage, over-current, short circuit, open wire. Up to 400 mA balancing.",
    tag: "MOSFET / CONTACTOR",
    core: true,
  },
  {
    label: "VEHICLE / STORAGE CONTROLLER",
    note: "Isolated CAN across the low- to high-voltage boundary.",
    tag: "ISOLATED CAN",
  },
  {
    label: "TELEMATICS + ANALYTICS",
    note: "4G/IoT uplink: live location, geofencing, fleet visibility.",
    tag: "4G",
  },
];

export function ArchitectureFlow() {
  return (
    <ol className="mx-auto max-w-2xl">
      {ARCHITECTURE.map((l, i) => (
        <li key={l.label}>
          {/* spine between stages, with the pulse showing flow direction */}
          {i > 0 && (
            <div
              className="relative ml-[30px] h-7 w-px overflow-hidden bg-grey-300"
              aria-hidden="true"
            >
              <span
                className="arch-pulse absolute inset-x-[-1px] top-0 block h-3"
                style={{
                  background: "linear-gradient(to bottom, transparent, var(--blue-500))",
                  animationDelay: `${i * 0.28}s`,
                }}
              />
            </div>
          )}
          <div
            className={`flex items-start gap-4 rounded-[6px] border p-4 backdrop-blur-xl ${
              l.core ? "border-blue-200 bg-blue-50/60" : "border-grey-200 bg-white/60"
            }`}
          >
            <span
              className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border text-[11px] font-[550] leading-none ${
                l.core
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-grey-300 text-grey-500"
              }`}
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`micro-label ${l.core ? "micro-label--blue" : "!text-ink-soft"}`}>
                {l.label}
                {l.core && <span className="ml-2 text-grey-400">/ WEBBER</span>}
              </p>
              <p className="type-body mt-1 !max-w-none !text-[0.875rem]">{l.note}</p>
            </div>
            <span className="micro-label hidden shrink-0 pt-0.5 sm:block">{l.tag}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
