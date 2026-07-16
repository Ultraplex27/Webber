import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

/** Pale blue-grey interface panel — live asset status mock, pure HTML/CSS. */
export function TelematicsPanel() {
  return (
    <div
      className="rounded-[6px] border border-grey-200 bg-blue-50 p-4 md:p-6"
      role="img"
      aria-label="Telematics interface showing live asset status, geofencing, battery state, a fault event and a maintenance prediction"
    >
      <div className="rounded-[4px] border border-grey-200 bg-white">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-grey-200 px-4 py-3">
          <TechnicalLabel>WEBBER FLEET / LIVE</TechnicalLabel>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600" aria-hidden="true" />
            <span className="micro-label">1,248 ASSETS ONLINE</span>
          </span>
        </div>

        <div className="grid gap-px bg-grey-100 md:grid-cols-[1.4fr_1fr]">
          {/* Map region */}
          <div className="grid-bg relative min-h-[220px] bg-white p-4">
            <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden="true">
              {/* geofence */}
              <polygon
                points="60,40 200,28 260,90 210,150 90,140"
                fill="rgba(46,123,255,0.06)"
                stroke="var(--blue-500)"
                strokeDasharray="4 3"
                strokeWidth="1"
              />
              {/* route */}
              <path
                d="M70 130 C 110 110, 150 120, 180 80 S 240 60, 250 92"
                fill="none"
                stroke="var(--blue-600)"
                strokeWidth="1.5"
              />
              {/* assets */}
              <circle cx="70" cy="130" r="4" fill="var(--blue-600)" />
              <circle cx="180" cy="80" r="4" fill="var(--blue-600)" />
              <circle cx="250" cy="92" r="5" fill="var(--error)" />
              <circle cx="120" cy="60" r="4" fill="var(--grey-400)" />
            </svg>
            <span className="micro-label absolute left-4 top-4">GEOFENCE / ZONE A-4</span>
          </div>

          {/* Status column */}
          <div className="space-y-px bg-grey-100">
            <div className="bg-white p-4">
              <TechnicalLabel>BATTERY STATE / WB-2041</TechnicalLabel>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="spec-value !text-[1.4rem] text-ink">78%</span>
                <span className="micro-label micro-label--blue">CHARGING</span>
              </div>
              <div className="mt-2 h-1 rounded bg-grey-100">
                <div className="h-1 w-[78%] rounded bg-blue-600" />
              </div>
            </div>
            <div className="bg-white p-4">
              <TechnicalLabel className="!text-error">FAULT EVENT / WB-1188</TechnicalLabel>
              <p className="type-small mt-1 text-ink-soft">
                Cell 11 over-temperature · pack isolated · 14:32 IST
              </p>
            </div>
            <div className="bg-white p-4">
              <TechnicalLabel>MAINTENANCE PREDICTION</TechnicalLabel>
              <p className="type-small mt-1 text-ink-soft">
                WB-0673 — connector wear trend detected. Service window suggested within 3 weeks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
