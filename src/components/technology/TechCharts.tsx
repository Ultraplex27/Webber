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

export function IsolationDiagram() {
  return (
    <svg viewBox="0 0 400 220" className="w-full" role="img" aria-label="Low-voltage and high-voltage domains separated by an isolation boundary with isolated CAN crossing">
      <rect x="20" y="40" width="150" height="140" rx="4" fill="var(--grey-50)" stroke="var(--grey-300)" />
      <rect x="230" y="40" width="150" height="140" rx="4" fill="var(--blue-50)" stroke="var(--blue-200)" />
      <text x="45" y="70" style={{ font: "500 10px var(--font-mono)", letterSpacing: "0.08em", fill: "var(--grey-500)" }}>
        LOW VOLTAGE
      </text>
      <text x="252" y="70" style={{ font: "500 10px var(--font-mono)", letterSpacing: "0.08em", fill: "var(--blue-700)" }}>
        HIGH VOLTAGE
      </text>
      {/* isolation gap */}
      <line x1="200" y1="30" x2="200" y2="190" stroke="var(--grey-400)" strokeDasharray="6 4" />
      <text x="178" y="22" style={{ font: "500 9px var(--font-mono)", letterSpacing: "0.08em", fill: "var(--grey-500)" }}>
        ISOLATION
      </text>
      {/* isolated CAN crossing */}
      <path d="M170 110 H 230" stroke="var(--blue-600)" strokeWidth="2" />
      <circle cx="200" cy="110" r="6" fill="var(--canvas)" stroke="var(--blue-600)" strokeWidth="1.5" />
      <text x="150" y="135" style={{ font: "500 10px var(--font-mono)", letterSpacing: "0.08em", fill: "var(--blue-700)" }}>
        ISOLATED CAN
      </text>
      {/* insulation monitor */}
      <rect x="255" y="130" width="100" height="30" rx="3" fill="var(--canvas)" stroke="var(--blue-300)" />
      <text x="263" y="149" style={{ font: "500 9px var(--font-mono)", letterSpacing: "0.06em", fill: "var(--ink-soft)" }}>
        INSULATION MON.
      </text>
    </svg>
  );
}

export function ArchitectureFlow() {
  const layers = [
    "CELLS",
    "SENSING",
    "DECISION LAYER",
    "PROTECTION + BALANCING",
    "VEHICLE / STORAGE CONTROLLER",
    "TELEMATICS + ANALYTICS",
  ];
  return (
    <ol className="mx-auto flex max-w-md flex-col items-stretch gap-0">
      {layers.map((layer, i) => (
        <li key={layer} className="flex flex-col items-center">
          <div
            className={`w-full rounded-[3px] border px-6 py-4 text-center ${
              i === 2 || i === 3
                ? "border-blue-200 bg-blue-50"
                : "border-grey-200 bg-white"
            }`}
          >
            <span className={`micro-label ${i === 2 || i === 3 ? "micro-label--blue" : "!text-ink-soft"}`}>
              {layer}
            </span>
          </div>
          {i < layers.length - 1 && (
            <span className="py-1 text-blue-600" aria-hidden="true">
              ↓
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
