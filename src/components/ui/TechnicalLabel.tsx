interface TechnicalLabelProps {
  children: React.ReactNode;
  blue?: boolean;
  className?: string;
}

/** Mono uppercase micro-label, e.g. `CELL BALANCING / ACTIVE` */
export function TechnicalLabel({ children, blue, className = "" }: TechnicalLabelProps) {
  return (
    <p className={`micro-label ${blue ? "micro-label--blue" : ""} ${className}`}>
      {children}
    </p>
  );
}

export function SectionIntro({
  label,
  title,
  lead,
  className = "",
}: {
  label: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <TechnicalLabel blue className="mb-5">
        {label}
      </TechnicalLabel>
      <h2 className="type-h2 max-w-[16ch]">{title}</h2>
      {lead ? <p className="type-lead mt-6">{lead}</p> : null}
    </div>
  );
}
