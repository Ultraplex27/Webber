export type Application =
  | "2W"
  | "3W"
  | "ESS"
  | "Drones"
  | "Inverters"
  | "Telecom"
  | "Forklifts";

export type Architecture = "MOSFET" | "Contactor" | "Telematics";
export type Comms = "CAN" | "Isolated CAN" | "Bluetooth" | "UART" | "4G";
export type ProductStatus = "Production" | "Upcoming";

/**
 * Deployment disclosure levels — exact counts are commercially sensitive.
 * Use rounded public figures ("10K+"), "Series production", or hide entirely.
 */
export type DeploymentDisclosure =
  | { kind: "rounded"; label: string }
  | { kind: "series-production" }
  | { kind: "field-deployed" }
  | { kind: "hidden" };

export interface SpecRow {
  category:
    | "Electrical"
    | "Balancing"
    | "Architecture"
    | "Communications"
    | "Sensing"
    | "Safety"
    | "Environmental"
    | "Mechanical"
    | "Compliance"
    | "Deployment";
  field: string;
  value: string;
  /** true when the value must be confirmed from controlled product data before launch */
  pendingVerification?: boolean;
}

export interface Product {
  slug: string;
  name: string;
  family: string;
  positioning: string;
  applications: Application[];
  architecture: Architecture;
  cellCount: string;
  systemVoltage: string;
  continuousCurrent: string;
  balancingCurrent: string;
  comms: Comms[];
  status: ProductStatus;
  certificationNote?: string;
  deployment: DeploymentDisclosure;
  keyMetrics: { label: string; value: string }[];
  specs: SpecRow[];
  imageDir: string;
}

const sharedSafetyFeatures: SpecRow[] = [
  { category: "Safety", field: "Protections", value: "OV · UV · OC · short circuit · open wire" },
  {
    category: "Safety",
    field: "Thermal",
    value: "Temperature-sensor-based early detection of thermal runaway",
  },
  {
    category: "Safety",
    field: "Additional",
    value: "Deep-discharge prevention · MOSFET failure detection · pre-discharge control",
  },
];

export const products: Product[] = [
  {
    slug: "wbms-sw-16s",
    name: "WBMS-SW 16S",
    family: "Performance BMS",
    positioning:
      "High-side MOSFET battery management for high-performance two-wheelers and e-rickshaws.",
    applications: ["2W", "3W"],
    architecture: "MOSFET",
    cellCount: "16S",
    systemVoltage: "48–60 V",
    continuousCurrent: "60 A / 80 A",
    balancingCurrent: "~200 mA",
    comms: ["CAN", "Isolated CAN", "Bluetooth"],
    status: "Production",
    certificationNote: "AIS 156 PH-2 variant available",
    deployment: { kind: "rounded", label: "45K+" },
    keyMetrics: [
      { label: "Cells", value: "16S" },
      { label: "Continuous current", value: "60 / 80 A" },
      { label: "Balancing", value: "~200 mA" },
      { label: "Compliance", value: "AIS 156 PH-2 variant" },
    ],
    specs: [
      { category: "Electrical", field: "Cell count", value: "16S" },
      { category: "Electrical", field: "System voltage", value: "48–60 V", pendingVerification: true },
      { category: "Electrical", field: "Continuous current", value: "60 A / 80 A" },
      { category: "Balancing", field: "Balancing current", value: "~200 mA" },
      { category: "Balancing", field: "Method", value: "Charging-profile control for faster balancing" },
      { category: "Architecture", field: "Switching", value: "High-side MOSFET" },
      { category: "Architecture", field: "Paralleling", value: "Parallel pack operation without intercommunication" },
      { category: "Communications", field: "Interfaces", value: "CAN · Isolated CAN · Bluetooth" },
      { category: "Sensing", field: "Diagnostics", value: "Cell open-wire detection · State-of-Power control" },
      ...sharedSafetyFeatures,
      { category: "Compliance", field: "Certification", value: "AIS 156 PH-2 certified variant (µSD card + buzzer integration)" },
      { category: "Deployment", field: "Field status", value: "Series production" },
    ],
    imageDir: "/images/products/wbms-sw-16s",
  },
  {
    slug: "wbms-sw-24s",
    name: "WBMS-SW 24S",
    family: "Performance BMS",
    positioning:
      "Extended-series MOSFET battery management for higher-voltage two- and three-wheeler platforms.",
    applications: ["2W", "3W"],
    architecture: "MOSFET",
    cellCount: "24S",
    systemVoltage: "72–84 V",
    continuousCurrent: "60 A / 80 A",
    balancingCurrent: "~200 mA",
    comms: ["CAN", "Isolated CAN", "Bluetooth"],
    status: "Production",
    certificationNote: "AIS 156 PH-2 variant available",
    deployment: { kind: "series-production" },
    keyMetrics: [
      { label: "Cells", value: "24S" },
      { label: "Continuous current", value: "60 / 80 A" },
      { label: "Balancing", value: "~200 mA" },
      { label: "Compliance", value: "AIS 156 PH-2 variant" },
    ],
    specs: [
      { category: "Electrical", field: "Cell count", value: "24S" },
      { category: "Electrical", field: "System voltage", value: "72–84 V", pendingVerification: true },
      { category: "Electrical", field: "Continuous current", value: "60 A / 80 A" },
      { category: "Balancing", field: "Balancing current", value: "~200 mA" },
      { category: "Architecture", field: "Switching", value: "High-side MOSFET" },
      { category: "Communications", field: "Interfaces", value: "CAN · Isolated CAN · Bluetooth" },
      ...sharedSafetyFeatures,
      { category: "Compliance", field: "Certification", value: "AIS 156 PH-2 certified variant" },
      { category: "Deployment", field: "Field status", value: "Series production" },
    ],
    imageDir: "/images/products/wbms-sw-24s",
  },
  {
    slug: "wbms-swlt-16s",
    name: "WBMS-SWLT 16S",
    family: "Compact BMS",
    positioning: "Lighter MOSFET battery management for compact mobility and inverter applications.",
    applications: ["2W", "Inverters", "Drones"],
    architecture: "MOSFET",
    cellCount: "16S",
    systemVoltage: "48–60 V",
    continuousCurrent: "45 A / 60 A",
    balancingCurrent: "120 mA",
    comms: ["CAN", "Bluetooth", "UART"],
    status: "Production",
    deployment: { kind: "field-deployed" },
    keyMetrics: [
      { label: "Cells", value: "16S" },
      { label: "Continuous current", value: "45 / 60 A" },
      { label: "Balancing", value: "120 mA" },
      { label: "Form factor", value: "Compact" },
    ],
    specs: [
      { category: "Electrical", field: "Cell count", value: "16S" },
      { category: "Electrical", field: "System voltage", value: "48–60 V", pendingVerification: true },
      { category: "Electrical", field: "Continuous current", value: "45 A / 60 A" },
      { category: "Balancing", field: "Balancing current", value: "120 mA" },
      { category: "Architecture", field: "Switching", value: "High-side MOSFET" },
      { category: "Communications", field: "Interfaces", value: "CAN · Bluetooth · UART", pendingVerification: true },
      ...sharedSafetyFeatures,
      { category: "Deployment", field: "Field status", value: "Field deployed" },
    ],
    imageDir: "/images/products/wbms-swlt-16s",
  },
  {
    slug: "wbms-sw-contactor",
    name: "WBMS-SW 16S/32S Contactor",
    family: "High-Current BMS",
    positioning:
      "Contactor-based battery management for high-performance three-wheelers and forklifts.",
    applications: ["3W", "Forklifts", "ESS"],
    architecture: "Contactor",
    cellCount: "16S / 32S",
    systemVoltage: "48–120 V",
    continuousCurrent: "100–250 A",
    balancingCurrent: "400 mA",
    comms: ["CAN", "Isolated CAN"],
    status: "Production",
    deployment: { kind: "series-production" },
    keyMetrics: [
      { label: "Cells", value: "16S / 32S" },
      { label: "Continuous current", value: "100–250 A" },
      { label: "Balancing", value: "400 mA" },
      { label: "Architecture", value: "Contactor" },
    ],
    specs: [
      { category: "Electrical", field: "Cell count", value: "16S / 32S" },
      { category: "Electrical", field: "System voltage", value: "48–120 V", pendingVerification: true },
      { category: "Electrical", field: "Continuous current", value: "100–250 A" },
      { category: "Balancing", field: "Balancing current", value: "400 mA" },
      { category: "Architecture", field: "Switching", value: "Contactor with pre-charge / pre-discharge control" },
      { category: "Communications", field: "Interfaces", value: "CAN · Isolated CAN" },
      ...sharedSafetyFeatures,
      { category: "Deployment", field: "Field status", value: "Series production" },
    ],
    imageDir: "/images/products/wbms-sw-contactor",
  },
  {
    slug: "wbms-sw-mini-45a",
    name: "WBMS-SW-Mini 45A",
    family: "Compact BMS",
    positioning: "Miniaturised MOSFET battery management for space-constrained packs.",
    applications: ["2W", "Drones", "Inverters", "Telecom"],
    architecture: "MOSFET",
    cellCount: "Up to 16S",
    systemVoltage: "48 V class",
    continuousCurrent: "45 A",
    balancingCurrent: "120 mA",
    comms: ["CAN", "UART"],
    status: "Production",
    deployment: { kind: "rounded", label: "5K+" },
    keyMetrics: [
      { label: "Continuous current", value: "45 A" },
      { label: "Form factor", value: "Mini" },
      { label: "Balancing", value: "120 mA" },
      { label: "Architecture", value: "MOSFET" },
    ],
    specs: [
      { category: "Electrical", field: "Cell count", value: "Up to 16S", pendingVerification: true },
      { category: "Electrical", field: "Continuous current", value: "45 A" },
      { category: "Balancing", field: "Balancing current", value: "120 mA", pendingVerification: true },
      { category: "Architecture", field: "Switching", value: "High-side MOSFET" },
      { category: "Communications", field: "Interfaces", value: "CAN · UART", pendingVerification: true },
      ...sharedSafetyFeatures,
      { category: "Deployment", field: "Field status", value: "Deployed / 5K+ systems" },
    ],
    imageDir: "/images/products/wbms-sw-mini-45a",
  },
  {
    slug: "wbms-sw-contactor-200a",
    name: "WBMS-SW-Contactor 200A",
    family: "High-Current BMS",
    positioning:
      "200 A contactor battery management for heavy-duty mobility and stationary storage.",
    applications: ["3W", "ESS", "Forklifts"],
    architecture: "Contactor",
    cellCount: "16S / 32S",
    systemVoltage: "48–120 V",
    continuousCurrent: "200 A",
    balancingCurrent: "400 mA",
    comms: ["CAN", "Isolated CAN"],
    status: "Production",
    deployment: { kind: "rounded", label: "25K+" },
    keyMetrics: [
      { label: "Continuous current", value: "200 A" },
      { label: "Cells", value: "16S / 32S" },
      { label: "Balancing", value: "400 mA" },
      { label: "Architecture", value: "Contactor" },
    ],
    specs: [
      { category: "Electrical", field: "Cell count", value: "16S / 32S", pendingVerification: true },
      { category: "Electrical", field: "Continuous current", value: "200 A" },
      { category: "Balancing", field: "Balancing current", value: "400 mA", pendingVerification: true },
      { category: "Architecture", field: "Switching", value: "Contactor with pre-charge / pre-discharge control" },
      { category: "Communications", field: "Interfaces", value: "CAN · Isolated CAN" },
      ...sharedSafetyFeatures,
      { category: "Deployment", field: "Field status", value: "Deployed / 25K+ systems" },
    ],
    imageDir: "/images/products/wbms-sw-contactor-200a",
  },
  {
    slug: "telematics-4g",
    name: "4G/IoT Telematics",
    family: "Connectivity",
    positioning:
      "The connection above the BMS — live location, geofencing, system health and remote visibility.",
    applications: ["2W", "3W", "ESS", "Telecom"],
    architecture: "Telematics",
    cellCount: "—",
    systemVoltage: "12–96 V input",
    continuousCurrent: "—",
    balancingCurrent: "—",
    comms: ["4G", "CAN", "Bluetooth"],
    status: "Production",
    deployment: { kind: "field-deployed" },
    keyMetrics: [
      { label: "Network", value: "4G / IoT" },
      { label: "Geofencing", value: "Supported" },
      { label: "Live monitoring", value: "Supported" },
      { label: "Interface", value: "CAN" },
    ],
    specs: [
      { category: "Communications", field: "Uplink", value: "4G cellular" },
      { category: "Communications", field: "Local interfaces", value: "CAN · Bluetooth", pendingVerification: true },
      { category: "Sensing", field: "Capabilities", value: "Live location · geofencing · battery state · fault events" },
      { category: "Electrical", field: "Supply", value: "12–96 V input", pendingVerification: true },
      { category: "Deployment", field: "Field status", value: "Field deployed" },
    ],
    imageDir: "/images/products/telematics-4g",
  },
];

export const roadmapItems = [
  {
    name: "Chargers",
    note: "Charging hardware aligned with Webber balancing and charging-control algorithms.",
  },
  {
    name: "Inverters",
    note: "Power-conversion products for mobility and stationary applications.",
  },
  {
    name: "BESS analytics",
    note: "Lifecycle management platform for utility and C&I energy storage.",
  },
  {
    name: "Predictive maintenance",
    note: "Predictive-maintenance models in development, built on fleet field data.",
  },
] as const;

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const applicationFilters: Application[] = [
  "2W",
  "3W",
  "ESS",
  "Drones",
  "Inverters",
  "Telecom",
  "Forklifts",
];
