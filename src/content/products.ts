export interface Product {
  slug: string;
  name: string;
  /** Ordered gallery images; `images[0]` is the cover used on cards/carousel. */
  images: string[];
  // Overview
  family: string;
  status: string;
  // Electrical
  nominalVoltage: string;
  batteryCapacity: string;
  continuousCurrent: string;
  // Balancing
  balancingCurrent: string;
  // Architecture
  cellConfiguration: string;
  architecture: string;
  // Applications
  applications: string;
  // Communications
  communications: string;
  // Mechanical
  dimensions: string;
  // Environmental
  operatingTemperature: string;
  ingressProtection: string;
  // Safety
  safety: string;
  // Compliance
  certification: string;
  // Deployment
  deployment: string;
}

/**
 * The catalogue mirrors the 12 supplied BMS render families. Product names
 * and cell counts visible in the render names are retained; any field not
 * disclosed by the April 2026 company profile or confirmed in
 * `docs/Webber_BMS_Product_Data_Template.xlsx` is deliberately an em dash.
 * The field set matches that workbook's columns 1:1 so intake data can be
 * copied straight across as it's confirmed.
 */
const TBC = "—";

/** `<slug>-1.webp` .. `<slug>-N.webp`, the full set generated from Assets/BMS Renders/. */
function gallery(slug: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `/images/products/bms-renders/${slug}-${i + 1}.webp`);
}

export const products: Product[] = [
  { slug: "contactor-32s", name: "Contactor 32S BMS", images: gallery("contactor-32s", 8), family: TBC, status: TBC, nominalVoltage: TBC, batteryCapacity: TBC, continuousCurrent: TBC, balancingCurrent: TBC, cellConfiguration: "32S", architecture: TBC, applications: "3W · Forklifts", communications: TBC, dimensions: TBC, operatingTemperature: TBC, ingressProtection: TBC, safety: TBC, certification: TBC, deployment: TBC },
  { slug: "contactor", name: "WBMS-SW 16S/32S Contactor", images: ["/images/products/bms-renders/contactor-profile-transparent.png"], family: TBC, status: TBC, nominalVoltage: TBC, batteryCapacity: TBC, continuousCurrent: TBC, balancingCurrent: TBC, cellConfiguration: "16S / 32S", architecture: TBC, applications: "3W · Forklifts", communications: TBC, dimensions: TBC, operatingTemperature: TBC, ingressProtection: TBC, safety: TBC, certification: TBC, deployment: TBC },
  { slug: "contactor-c9", name: "Contactor C9 BMS", images: gallery("contactor-c9", 8), family: TBC, status: TBC, nominalVoltage: TBC, batteryCapacity: TBC, continuousCurrent: TBC, balancingCurrent: TBC, cellConfiguration: TBC, architecture: TBC, applications: TBC, communications: TBC, dimensions: TBC, operatingTemperature: TBC, ingressProtection: TBC, safety: TBC, certification: TBC, deployment: TBC },
  { slug: "swlt-20s", name: "SWLT 20S BMS", images: gallery("swlt-20s", 4), family: TBC, status: TBC, nominalVoltage: TBC, batteryCapacity: TBC, continuousCurrent: TBC, balancingCurrent: TBC, cellConfiguration: "20S", architecture: TBC, applications: TBC, communications: TBC, dimensions: TBC, operatingTemperature: TBC, ingressProtection: TBC, safety: TBC, certification: TBC, deployment: TBC },
  { slug: "swlt-24s", name: "SWLT 24S BMS", images: gallery("swlt-24s", 8), family: TBC, status: TBC, nominalVoltage: TBC, batteryCapacity: TBC, continuousCurrent: TBC, balancingCurrent: TBC, cellConfiguration: "24S", architecture: TBC, applications: TBC, communications: TBC, dimensions: TBC, operatingTemperature: TBC, ingressProtection: TBC, safety: TBC, certification: TBC, deployment: TBC },
  { slug: "swlt-8s", name: "SWLT 8S BMS", images: gallery("swlt-8s", 4), family: TBC, status: TBC, nominalVoltage: TBC, batteryCapacity: TBC, continuousCurrent: TBC, balancingCurrent: TBC, cellConfiguration: "8S", architecture: TBC, applications: TBC, communications: TBC, dimensions: TBC, operatingTemperature: TBC, ingressProtection: TBC, safety: TBC, certification: TBC, deployment: TBC },
  { slug: "swlt-ess", name: "SWLT ESS BMS", images: gallery("swlt-ess", 8), family: TBC, status: TBC, nominalVoltage: TBC, batteryCapacity: TBC, continuousCurrent: TBC, balancingCurrent: TBC, cellConfiguration: TBC, architecture: TBC, applications: "ESS", communications: TBC, dimensions: TBC, operatingTemperature: TBC, ingressProtection: TBC, safety: TBC, certification: TBC, deployment: TBC },
  { slug: "swlt-v12", name: "SWLT v1.2", images: gallery("swlt-v12", 4), family: TBC, status: TBC, nominalVoltage: TBC, batteryCapacity: TBC, continuousCurrent: TBC, balancingCurrent: TBC, cellConfiguration: TBC, architecture: TBC, applications: TBC, communications: TBC, dimensions: TBC, operatingTemperature: TBC, ingressProtection: TBC, safety: TBC, certification: TBC, deployment: TBC },
  { slug: "swlt-v13s", name: "SWLT v1.3s", images: gallery("swlt-v13s", 4), family: TBC, status: TBC, nominalVoltage: TBC, batteryCapacity: TBC, continuousCurrent: TBC, balancingCurrent: TBC, cellConfiguration: TBC, architecture: TBC, applications: TBC, communications: TBC, dimensions: TBC, operatingTemperature: TBC, ingressProtection: TBC, safety: TBC, certification: TBC, deployment: TBC },
  { slug: "swlt-v15-120a", name: "SWLT v1.5 120A", images: gallery("swlt-v15-120a", 4), family: TBC, status: TBC, nominalVoltage: TBC, batteryCapacity: TBC, continuousCurrent: TBC, balancingCurrent: TBC, cellConfiguration: TBC, architecture: TBC, applications: TBC, communications: TBC, dimensions: TBC, operatingTemperature: TBC, ingressProtection: TBC, safety: TBC, certification: TBC, deployment: TBC },
  { slug: "swlt-v15", name: "SWLT v1.5 BMS", images: gallery("swlt-v15", 4), family: TBC, status: TBC, nominalVoltage: TBC, batteryCapacity: TBC, continuousCurrent: TBC, balancingCurrent: TBC, cellConfiguration: TBC, architecture: TBC, applications: TBC, communications: TBC, dimensions: TBC, operatingTemperature: TBC, ingressProtection: TBC, safety: TBC, certification: TBC, deployment: TBC },
  { slug: "wbms-sw-can-v2", name: "WBMS-SW-CAN V2 BMS", images: gallery("wbms-sw-can-v2", 8), family: TBC, status: TBC, nominalVoltage: TBC, batteryCapacity: TBC, continuousCurrent: TBC, balancingCurrent: TBC, cellConfiguration: TBC, architecture: TBC, applications: TBC, communications: TBC, dimensions: TBC, operatingTemperature: TBC, ingressProtection: TBC, safety: TBC, certification: TBC, deployment: TBC },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const roadmapItems = [
  { name: "Chargers", note: "Charging hardware aligned with Webber balancing and charging-control algorithms." },
  { name: "Inverters", note: "Power-conversion products for mobility and stationary applications." },
  { name: "BESS analytics", note: "Lifecycle management platform for utility and C&I energy storage." },
  { name: "Predictive maintenance", note: "Predictive-maintenance models in development, built on fleet field data." },
] as const;
