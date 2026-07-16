/**
 * Static hero composition — used as the LCP-safe poster behind the WebGL
 * canvas, and as the full hero on mobile / reduced-motion / no-WebGL.
 * Pure inline SVG so it renders even before generated assets exist;
 * the raster poster from IMAGE-ASSETS.md §2 layers on top when present.
 */
export function HeroPoster({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1280 720"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <radialGradient id="hero-bloom" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(46,123,255,0.30)" />
            <stop offset="42%" stopColor="rgba(46,123,255,0.08)" />
            <stop offset="72%" stopColor="rgba(46,123,255,0)" />
          </radialGradient>
          <radialGradient id="hero-core" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#eaf4ff" />
            <stop offset="35%" stopColor="#82b2ff" />
            <stop offset="100%" stopColor="rgba(46,123,255,0)" />
          </radialGradient>
        </defs>

        {/* faint grid coordinates */}
        <g stroke="#edf1f6" strokeWidth="1">
          {Array.from({ length: 13 }, (_, i) => (
            <line key={`v${i}`} x1={i * 106} y1="0" x2={i * 106} y2="720" />
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 103} x2="1280" y2={i * 103} />
          ))}
        </g>

        {/* atmospheric bloom right of centre */}
        <circle cx="880" cy="330" r="330" fill="url(#hero-bloom)" />

        {/* BMS board linework, lower right third */}
        <g stroke="#bac4d1" strokeWidth="1.25" fill="none">
          <rect x="780" y="380" width="380" height="200" rx="4" />
          <rect x="820" y="420" width="52" height="30" />
          <rect x="900" y="500" width="70" height="26" />
          <rect x="1030" y="430" width="46" height="46" />
          <rect x="990" y="530" width="90" height="22" />
          <circle cx="810" cy="560" r="6" />
          <circle cx="1140" cy="400" r="6" />
        </g>
        <g stroke="#94a0b2" strokeWidth="1" fill="none">
          <path d="M780 470 h-60" />
          <path d="M846 450 v40 h54" />
          <path d="M970 513 h20 v-40 h40" />
          <path d="M1076 453 h40 v60" />
        </g>

        {/* illuminated conductor path + pulse */}
        <path
          d="M120 560 H 520 L 600 480 H 720 L 780 470"
          stroke="#2e7bff"
          strokeWidth="1.5"
          fill="none"
          opacity="0.9"
        />
        <circle cx="520" cy="560" r="26" fill="url(#hero-core)" />
        <circle cx="520" cy="560" r="4" fill="#eaf4ff" />
      </svg>
    </div>
  );
}
