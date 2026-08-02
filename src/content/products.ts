export interface Product {
  slug: string;
  name: string;
  nominalVoltage: string;
  batteryCapacity: string;
  cellConfiguration: string;
  applications: string;
  image: string;
}

/**
 * The catalogue mirrors the 12 supplied BMS render families. Product names
 * and cell counts visible in the render names are retained; any field not
 * disclosed by the April 2026 company profile is deliberately an em dash.
 */
export const products: Product[] = [
  { slug: "contactor-32s", name: "Contactor 32S BMS", nominalVoltage: "—", batteryCapacity: "—", cellConfiguration: "32S", applications: "3W · Forklifts", image: "/images/products/bms-renders/contactor-32s.png" },
  { slug: "contactor", name: "WBMS-SW 16S/32S Contactor", nominalVoltage: "—", batteryCapacity: "—", cellConfiguration: "16S / 32S", applications: "3W · Forklifts", image: "/images/products/bms-renders/contactor-profile-transparent.png" },
  { slug: "contactor-c9", name: "Contactor C9 BMS", nominalVoltage: "—", batteryCapacity: "—", cellConfiguration: "—", applications: "—", image: "/images/products/bms-renders/contactor-c9.png" },
  { slug: "swlt-20s", name: "SWLT 20S BMS", nominalVoltage: "—", batteryCapacity: "—", cellConfiguration: "20S", applications: "—", image: "/images/products/bms-renders/swlt-20s.png" },
  { slug: "swlt-24s", name: "SWLT 24S BMS", nominalVoltage: "—", batteryCapacity: "—", cellConfiguration: "24S", applications: "—", image: "/images/products/bms-renders/swlt-24s.png" },
  { slug: "swlt-8s", name: "SWLT 8S BMS", nominalVoltage: "—", batteryCapacity: "—", cellConfiguration: "8S", applications: "—", image: "/images/products/bms-renders/swlt-8s.png" },
  { slug: "swlt-ess", name: "SWLT ESS BMS", nominalVoltage: "—", batteryCapacity: "—", cellConfiguration: "—", applications: "ESS", image: "/images/products/bms-renders/swlt-ess.png" },
  { slug: "swlt-v12", name: "SWLT v1.2", nominalVoltage: "—", batteryCapacity: "—", cellConfiguration: "—", applications: "—", image: "/images/products/bms-renders/swlt-v12.png" },
  { slug: "swlt-v13s", name: "SWLT v1.3s", nominalVoltage: "—", batteryCapacity: "—", cellConfiguration: "—", applications: "—", image: "/images/products/bms-renders/swlt-v13s.png" },
  { slug: "swlt-v15-120a", name: "SWLT v1.5 120A", nominalVoltage: "—", batteryCapacity: "—", cellConfiguration: "—", applications: "—", image: "/images/products/bms-renders/swlt-v15-120a.png" },
  { slug: "swlt-v15", name: "SWLT v1.5 BMS", nominalVoltage: "—", batteryCapacity: "—", cellConfiguration: "—", applications: "—", image: "/images/products/bms-renders/swlt-v15.png" },
  { slug: "wbms-sw-can-v2", name: "WBMS-SW-CAN V2 BMS", nominalVoltage: "—", batteryCapacity: "—", cellConfiguration: "—", applications: "—", image: "/images/products/bms-renders/wbms-sw-can-v2.png" },
];

export const roadmapItems = [
  { name: "Chargers", note: "Charging hardware aligned with Webber balancing and charging-control algorithms." },
  { name: "Inverters", note: "Power-conversion products for mobility and stationary applications." },
  { name: "BESS analytics", note: "Lifecycle management platform for utility and C&I energy storage." },
  { name: "Predictive maintenance", note: "Predictive-maintenance models in development, built on fleet field data." },
] as const;
