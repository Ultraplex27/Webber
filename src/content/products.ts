export interface Product {
  slug: string;
  name: string;
  /** Ordered gallery images; `images[0]` is the cover used on cards/carousel. */
  images: string[];
  // Electrical
  nominalVoltage: string;
  variants: string;
  batteryCapacity: string;
  continuousCurrent: string;
  // Balancing
  balancingCurrent: string;
  // Architecture
  cellConfiguration: string;
  architecture: string;
  // Applications — `application` powers the Automotive/BESS catalogue filter,
  // `otherApplications` is the granular list (2W, 3W, Forklifts, ...).
  application: "Automotive" | "BESS";
  otherApplications: string;
  // Communications
  communications: string;
  dataStorage: string;
  // Mechanical
  dimensions: string;
  // Environmental
  operatingTemperature: string;
  // Safety
  safety: string;
  // Compliance
  certification: string;
  // Overview
  positioning: string;
}

/**
 * Mirrors `Assets/Webber_BMS_Product_Data_Template.xlsx` ("Products" sheet)
 * 1:1 — field names line up with its header row so intake data can be
 * copied straight across. Slugs are exactly what's in the workbook (its
 * "Instructions" sheet: "do not change... unless the product mapping
 * changes"), including mixed case. Any field left blank in the workbook is
 * an em dash here, never invented. `Dimensions (L x W x H)` is blank for
 * every current row.
 */
const TBC = "—";

/** `<slug>-<n>.webp` for the numbers in `order`, generated from Assets/BMS Renders/. */
function gallery(slug: string, order: number[]): string[] {
  return order.map((n) => `/images/products/bms-renders/${slug}-${n}.webp`);
}

export const products: Product[] = [
  {
    slug: "contactor-32s",
    name: "WBMS-SW-32S-Contactor",
    images: gallery("contactor-32s", [2, 1, 3, 4, 5, 6, 7, 8]),
    nominalVoltage: "72V/96V/102V",
    variants: "250A and 500A",
    batteryCapacity: "150Ah-500Ah",
    continuousCurrent: "250A/500A",
    balancingCurrent: "~400mA",
    cellConfiguration: "32S LFP / 28S NMC",
    architecture: "High Side Dual Contactor and Low Side Shunt",
    application: "Automotive",
    otherApplications: "L5-3W, Forklifts, Marine",
    communications: "Isolated CAN, BLE/RS485",
    dataStorage: "micro SD Card",
    dimensions: TBC,
    operatingTemperature: "-40°C to 85°C",
    safety:
      "SF: COV, CUV, OCD-L1, OCD-L2, OCC-L1, OCC-L2, OTD, OTC, UTD, UTC, SCD\nPF: SCDL, OCDL, Cell Open Wire, Contactor Weld",
    certification: "AIS-004",
    positioning: "Advance Communication, Fault Detection and Control for High Current Applications",
  },
  {
    slug: "contactor-16S",
    name: "WBMS-SW-16S-Contactor",
    images: gallery("contactor-16S", [6, 1, 2, 3, 4, 5, 7, 8]),
    nominalVoltage: "51V/60V",
    variants: "250A and 500A",
    batteryCapacity: "150Ah-500Ah",
    continuousCurrent: "250A/500A",
    balancingCurrent: "~400mA",
    cellConfiguration: "16S LFP / 16S NMC",
    architecture: "High Side Dual Contactor and Low Side Shunt",
    application: "Automotive",
    otherApplications: "L5-3W, Forklifts, Marine",
    communications: "Isolated CAN, BLE/RS485",
    dataStorage: "micro SD Card",
    dimensions: TBC,
    operatingTemperature: "-40°C to 85°C",
    safety:
      "SF: COV, CUV, OCD-L1, OCD-L2, OCC-L1, OCC-L2, OTD, OTC, UTD, UTC, SCD\nPF: SCDL, OCDL, Cell Open Wire, Contactor Weld",
    certification: "AIS-004",
    positioning: "Advance Communication, Fault Detection and Control for High Current Applications",
  },
  {
    slug: "SW-16S",
    name: "WBMS-SW-16S-60A/80A",
    images: gallery("SW-16S", [1, 2, 3, 4, 5, 6, 7, 8]),
    nominalVoltage: "51V/60V",
    variants: "60A and 80A",
    batteryCapacity: "40Ah-100Ah",
    continuousCurrent: "60A/80A",
    balancingCurrent: "~400mA",
    cellConfiguration: "16S LFP / 16S NMC",
    architecture: "High Side MOSFETs and Low Side Shunt",
    application: "Automotive",
    otherApplications: "2W",
    communications: "Isolated CAN, BLE/RS485",
    dataStorage: "micro SD Card/EEPROM",
    dimensions: TBC,
    operatingTemperature: "-40°C to 85°C",
    safety:
      "SF: COV, CUV, OCD-L1, OCD-L2, OCC-L1, OCC-L2, OTD, OTC, UTD, UTC, SCD\nPF: SCDL, OCDL, Cell Open Wire, MOSFET Failure",
    certification: "AIS-004",
    positioning: "Advance Communications, Fault Detection and Control for 2W Applications",
  },
  {
    slug: "SW-24S",
    name: "WBMS-SW-24S-60A/80A",
    images: gallery("SW-24S", [5, 1, 2, 3, 4, 6, 7, 8]),
    nominalVoltage: "72V",
    variants: "60A and 80A",
    batteryCapacity: "40Ah-100Ah",
    continuousCurrent: "60A/80A",
    balancingCurrent: "~200mA",
    cellConfiguration: "24S LFP / 20S NMC",
    architecture: "High Side MOSFETs and Low Side Shunt",
    application: "Automotive",
    otherApplications: "2W",
    communications: "Isolated CAN, BLE/RS485",
    dataStorage: "micro SD Card/EEPROM",
    dimensions: TBC,
    operatingTemperature: "-40°C to 85°C",
    safety:
      "SF: COV, CUV, OCD-L1, OCD-L2, OCC-L1, OCC-L2, OTD, OTC, UTD, UTC, SCD\nPF: SCDL, OCDL, Cell Open Wire, MOSFET Failure",
    certification: "AIS-004",
    positioning: "Advance Communications, Fault Detection and Control for 2W Applications",
  },
  {
    slug: "swlt-v15",
    name: "WBMS-SWLT-16S-V1.5-80A/125A",
    images: gallery("swlt-v15", [1, 2, 3, 4]),
    nominalVoltage: "51V/60V",
    variants: "45/60/80A and 125A",
    batteryCapacity: "40Ah-200Ah",
    continuousCurrent: "60A/80A/120A",
    balancingCurrent: "~150mA",
    cellConfiguration: "16S LFP / 16S NMC",
    architecture: "High Side MOSFETs and Low Side Shunt",
    application: "Automotive",
    otherApplications: "2W/3W",
    communications: "Dual Non Isolated CAN, BLE, RS485",
    dataStorage: "micro SD Card/EEPROM",
    dimensions: TBC,
    operatingTemperature: "-40°C to 85°C",
    safety:
      "SF: COV, CUV, OCD-L1, OCD-L2, OCC-L1, OCC-L2, OTD, OTC, UTD, UTC, SCD\nPF: SCDL, OCDL, Cell Open Wire, MOSFET Failure",
    certification: "AIS-004",
    positioning: "More Communications and Control for 2W and 3W Applications",
  },
  {
    slug: "swlt-20s",
    name: "WBMS-SWLT-20S-80A/125A",
    images: gallery("swlt-20s", [1, 2, 3, 4]),
    nominalVoltage: "60V",
    variants: "45/60/80A and 125A",
    batteryCapacity: "40Ah-200Ah",
    continuousCurrent: "60A/80A/120A",
    balancingCurrent: "~150mA",
    cellConfiguration: "20S LFP / 17S NMC",
    architecture: "High Side MOSFETs and Low Side Shunt",
    application: "Automotive",
    otherApplications: "2W/3W",
    communications: "Dual Non Isolated CAN, BLE, RS485",
    dataStorage: "micro SD Card/EEPROM",
    dimensions: TBC,
    operatingTemperature: "-40°C to 85°C",
    safety:
      "SF: COV, CUV, OCD-L1, OCD-L2, OCC-L1, OCC-L2, OTD, OTC, UTD, UTC, SCD\nPF: SCDL, OCDL, Cell Open Wire, MOSFET Failure",
    certification: "AIS-004",
    positioning: "More Communications and Control for 2W and 3W Applications",
  },
  {
    slug: "swlt-v12",
    name: "WBMS-SWLT-16S-V1.2S-45A",
    images: gallery("swlt-v12", [1, 2, 3, 4]),
    nominalVoltage: "51V/60V",
    variants: "30/45A",
    batteryCapacity: "30Ah-45Ah",
    continuousCurrent: "30A/45A",
    balancingCurrent: "~150mA",
    cellConfiguration: "16S LFP / 16S NMC",
    architecture: "High Side MOSFETs and Low Side Shunt",
    application: "Automotive",
    otherApplications: "2W",
    communications: "Non Isolated CAN, BLE",
    dataStorage: "EEPROM",
    dimensions: TBC,
    operatingTemperature: "-40°C to 85°C",
    safety:
      "SF: COV, CUV, OCD-L1, OCD-L2, OCC-L1, OCC-L2, OTD, OTC, UTD, UTC, SCD\nPF: SCDL, OCDL, Cell Open Wire, MOSFET Failure",
    certification: "AIS-004",
    positioning: "Compact and Cost Efficient Platform for low speed 2W Batteries",
  },
  {
    slug: "swlt-v13s",
    name: "WBMS-SWLT-16S-V1.3S-80A/125A",
    images: gallery("swlt-v13s", [1, 2, 3, 4]),
    nominalVoltage: "51V/60V",
    variants: "80A and 125A",
    batteryCapacity: "60Ah-150Ah",
    continuousCurrent: "80A/120A",
    balancingCurrent: "~150mA",
    cellConfiguration: "16S LFP / 16S NMC",
    architecture: "High Side MOSFETs and Low Side Shunt",
    application: "Automotive",
    otherApplications: "2W/3W",
    communications: "Non Isolated CAN, BLE, RS485",
    dataStorage: "EEPROM",
    dimensions: TBC,
    operatingTemperature: "-40°C to 85°C",
    safety:
      "SF: COV, CUV, OCD-L1, OCD-L2, OCC-L1, OCC-L2, OTD, OTC, UTD, UTC, SCD\nPF: SCDL, OCDL, Cell Open Wire, MOSFET Failure",
    certification: "AIS-004",
    positioning: "Compact and Cost Efficient Platform for 3W Batteries",
  },
  {
    slug: "swlt-8s",
    name: "WBMS-SWLT-ESS-8S-100A",
    images: gallery("swlt-8s", [1, 2, 3, 4]),
    nominalVoltage: "12V/24V",
    variants: "100A and 125A",
    batteryCapacity: "60Ah-150Ah",
    continuousCurrent: "100A/150A",
    balancingCurrent: "~150mA",
    cellConfiguration: "8S LFP / 7S NMC",
    architecture: "High Side MOSFETs and Low Side Shunt",
    application: "BESS",
    otherApplications: "Inverter",
    communications: "Non Isolated CAN, BLE, RS485",
    dataStorage: "EEPROM",
    dimensions: TBC,
    operatingTemperature: "-40°C to 85°C",
    safety:
      "SF: COV, CUV, OCD-L1, OCD-L2, OCC-L1, OCC-L2, OTD, OTC, UTD, UTC, SCD\nPF: SCDL, OCDL, Cell Open Wire, MOSFET Failure",
    certification: TBC,
    positioning: "Parallel Stackable Platform for 12V/24V Inverter Batteries",
  },
  {
    slug: "SWLT-ESS",
    name: "WBMS-SWLT-ESS-16S-100A/150A",
    images: gallery("SWLT-ESS", [1, 2, 3, 4, 5, 6, 7, 8]),
    nominalVoltage: "51V/60V",
    variants: "100A and 150A",
    batteryCapacity: "100Ah-150Ah",
    continuousCurrent: "100A/150A",
    balancingCurrent: "~150mA",
    cellConfiguration: "16S LFP / 16S NMC",
    architecture: "High Side MOSFETs and Low Side Shunt",
    application: "BESS",
    otherApplications: "Inverter / Telecom",
    communications: "Non Isolated CAN, BLE, RS485",
    dataStorage: "micro SD Card/EEPROM",
    dimensions: TBC,
    operatingTemperature: "-40°C to 85°C",
    safety:
      "SF: COV, CUV, OCD-L1, OCD-L2, OCC-L1, OCC-L2, OTD, OTC, UTD, UTC, SCD\nPF: SCDL, OCDL, Cell Open Wire, MOSFET Failure",
    certification: "IEC61000",
    positioning: "Parallel Stackable Platform for 48V Inverter and Telecom Batteries",
  },
  {
    // No dedicated render exists yet (workbook lists "image.png", not a real
    // asset) — reuses the WBMS-SW-32S-Contactor photography since it's the
    // same physical board, just configured/marketed for BESS.
    slug: "contactor-32s-ess",
    name: "WBMS-SW-32S-Contactor-ESS",
    images: gallery("contactor-32s", [2, 1, 3, 4, 5, 6, 7, 8]),
    nominalVoltage: "72V/96V/102V",
    variants: "250A and 500A",
    batteryCapacity: "150Ah-500Ah",
    continuousCurrent: "250A",
    balancingCurrent: "~400mA",
    cellConfiguration: "32S LFP / 28S NMC",
    architecture: "High Side Dual Contactor and Low Side Shunt",
    application: "BESS",
    otherApplications: "72V/96V/102V Inverter/UPS",
    communications: "Isolated CAN, BLE/RS485",
    dataStorage: "micro SD Card",
    dimensions: TBC,
    operatingTemperature: "-40°C to 85°C",
    safety:
      "SF: COV, CUV, OCD-L1, OCD-L2, OCC-L1, OCC-L2, OTD, OTC, UTD, UTC, SCD\nPF: SCDL, OCDL, Cell Open Wire, MOSFET Failure",
    certification: "AIS-004",
    positioning: "Advance Communication, Fault Detection and Control for High Current Applications",
  },
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
