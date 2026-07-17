export interface Differentiator {
  id: string;
  label: string;
  headline: string;
  problem: string;
  approach: string;
  advantage: string;
  /** legal status: never publish "patentable" as a right */
  ipStatus: string;
  ipPending?: boolean;
}

export const differentiators: Differentiator[] = [
  {
    id: "paralleling",
    label: "BATTERY PARALLELING",
    headline: "Paralleling without CAN dependency.",
    problem: "Swappable packs can have meaningful state-of-charge differences.",
    approach:
      "A proprietary paralleling architecture that does not depend on inter-pack CAN communication.",
    advantage: "Simpler swapping architecture and uninterrupted power delivery.",
    ipStatus: "Proprietary architecture, patent status to be confirmed",
    ipPending: true,
  },
  {
    id: "charging",
    label: "CHARGING CONTROL",
    headline: "Charge with the cell state, not only the pack voltage.",
    problem: "Voltage-only charging leaves capacity on the table and stresses outlier cells.",
    approach:
      "Enhanced charging algorithms with charging-profile control and balancing interventions during charge.",
    advantage: "Enhanced usable capacity: the pack actually reaches full charge.",
    ipStatus: "Proprietary algorithm, patent status to be confirmed",
    ipPending: true,
  },
  {
    id: "balancing",
    label: "HIGH-CURRENT BALANCING",
    headline: "Faster cell equilibrium. More usable pack performance.",
    problem: "Low balancing currents leave large packs permanently out of equilibrium.",
    approach: "Industry-leading balancing current (up to 400 mA) with dedicated balancing algorithms.",
    advantage: "Faster equilibrium across the pack and more usable capacity per cycle.",
    ipStatus: "Proprietary method",
  },
  {
    id: "thermal",
    label: "METAL-CORE THERMAL ARCHITECTURE",
    headline: "Heat moves through the design, not into the failure mode.",
    problem: "High-current BMS hardware concentrates heat into MOSFETs and shunts.",
    approach: "Metal-core PCB construction that spreads and extracts heat structurally.",
    advantage:
      "2× better thermal performance and extended peak performance under sustained load.",
    ipStatus: "Patented",
  },
  {
    id: "isolation",
    label: "ISOLATION + MONITORING",
    headline: "High-voltage aware by design.",
    problem: "High-voltage systems fail unsafely when isolation is an afterthought.",
    approach:
      "Insulation monitoring, isolated CAN communication and clear low-voltage/high-voltage boundaries.",
    advantage:
      "Industry-first isolation features with temperature-based early detection of thermal runaway.",
    ipStatus: "Industry-first feature set",
  },
];
