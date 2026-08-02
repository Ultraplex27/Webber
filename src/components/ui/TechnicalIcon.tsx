export type TechnicalIconName =
  | "parallel"
  | "charge"
  | "balance"
  | "thermal"
  | "isolation"
  | "cells"
  | "sensing"
  | "decision"
  | "protection"
  | "can";

type TechnicalIconProps = {
  name: TechnicalIconName;
  className?: string;
  title?: string;
};

/**
 * Webber's shared icon language: thin engineering outlines, rounded joins,
 * and no filled pictograms. Icons inherit their colour through currentColor.
 */
export function TechnicalIcon({ name, className, title }: TechnicalIconProps) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 32 32" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      {name === "parallel" && (
        <g {...common}>
          <rect x="4" y="9" width="8" height="14" rx="1.5" />
          <path d="M12 13h2M12 19h2M18 13h2M18 19h2" />
          <rect x="20" y="9" width="8" height="14" rx="1.5" />
          <path d="M14 13h4M14 19h4" />
        </g>
      )}
      {name === "charge" && (
        <g {...common}>
          <path d="M18.5 3 8.5 17h7l-2 12 10-15h-7l2-11Z" />
          <path d="M5 5v4M3 7h4M27 23v4M25 25h4" opacity=".7" />
        </g>
      )}
      {name === "balance" && (
        <g {...common}>
          <path d="M5 9h22M5 16h22M5 23h22" />
          <circle cx="11" cy="9" r="2.5" fill="var(--canvas)" />
          <circle cx="21" cy="16" r="2.5" fill="var(--canvas)" />
          <circle cx="15" cy="23" r="2.5" fill="var(--canvas)" />
        </g>
      )}
      {name === "thermal" && (
        <g {...common}>
          <rect x="5" y="6" width="22" height="20" rx="2" />
          <path d="M10 10v12M14 10v12M18 10v12M22 10v12" />
          <path d="M8 3v2M16 3v2M24 3v2M8 27v2M16 27v2M24 27v2" opacity=".7" />
        </g>
      )}
      {name === "isolation" && (
        <g {...common}>
          <path d="M5 9h8M19 9h8M5 23h8M19 23h8" />
          <path d="M13 6v20M19 6v20" />
          <path d="m14.5 13 3 3-3 3" />
          <path d="M3 13v6M29 13v6" opacity=".7" />
        </g>
      )}
      {name === "cells" && <g {...common}><rect x="5" y="7" width="22" height="18" rx="2" /><path d="M9 11v10M14 11v10M19 11v10M24 11v10M12 4v3M20 4v3" /></g>}
      {name === "sensing" && <g {...common}><circle cx="16" cy="16" r="9" /><circle cx="16" cy="16" r="3" /><path d="M16 3v4M16 25v4M3 16h4M25 16h4" /></g>}
      {name === "decision" && <g {...common}><path d="M10 5h12v6h5v10h-5v6H10v-6H5V11h5Z" /><path d="M13 14h6M13 18h4" /></g>}
      {name === "protection" && <g {...common}><path d="M16 4 26 8v7c0 6-4.3 10.2-10 13-5.7-2.8-10-7-10-13V8Z" /><path d="m11 16 3 3 7-7" /></g>}
      {name === "can" && <g {...common}><path d="M7 9h18v14H7zM3 13v6M29 13v6M12 13h8M12 19h8" /><path d="M16 4v3M16 25v3" /></g>}
    </svg>
  );
}
