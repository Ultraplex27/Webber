export const team = [
  {
    slug: "manuj-agrawal",
    name: "Manuj Agrawal",
    role: "Founder & CEO",
    credentials: "B.Tech + M.Tech, IIT Kharagpur",
    focus: "Product strategy · battery systems · company building",
  },
  {
    slug: "bhanu-marwaha",
    name: "Bhanu Marwaha",
    role: "COO / Partner",
    credentials: "Formerly Simple Energy and Maxwell",
    focus: "Operations · scale-up · programme execution",
  },
  {
    slug: "ajay-kumar",
    name: "Ajay Kumar",
    role: "VP, Growth & Programme",
    credentials: "B.Tech, IIT Kanpur · 10+ years experience",
    focus: "OEM programmes · growth · commercialisation",
  },
  {
    slug: "jyoti-ranjan-swain",
    name: "Jyoti Ranjan Swain",
    role: "Founding Team · Senior Software Engineer",
    credentials: "Founding team member",
    focus: "Embedded systems · software architecture",
  },
  {
    slug: "nishant-anurag",
    name: "Dr. Nishant Anurag",
    role: "Senior Hardware Design Engineer",
    credentials: "PhD, IIT Guwahati",
    focus: "Power electronics · hardware design",
  },
  {
    slug: "suyog-aundhe",
    name: "Suyog Aundhe",
    role: "Manager, Product Integration",
    credentials: "Product integration",
    focus: "Validation · customer integration · field deployment",
  },
] as const;

export const awards = [
  {
    title: "Best Technology Partner Award 2025",
    issuer: "Greaves Electric Mobility / Ampere",
  },
  {
    title: "Top 10 Finalist",
    issuer: "Uber Green Mobility Innovation Challenge",
  },
  {
    title: "Second Runner-up",
    issuer: "EVangelise ’21",
  },
] as const;

export const partners = [
  {
    role: "Incubation and investment",
    names: ["iCreate"],
    logos: ["/logos/partners/icreate.svg"],
  },
  {
    role: "Semiconductor and design ecosystem",
    names: ["STMicroelectronics", "Texas Instruments"],
    logos: [
      "/logos/partners/stmicroelectronics.svg",
      "/logos/partners/texas-instruments.svg",
    ],
  },
  {
    role: "Electronics manufacturing",
    names: ["Kinetic Communications"],
    logos: ["/logos/partners/kinetic-communications.svg"],
  },
  {
    role: "Semiconductor supply chain",
    names: ["Arrow"],
    logos: ["/logos/partners/arrow.svg"],
  },
] as const;

/** Customer/OEM logo slots — replace with approved list (see IMAGE-ASSETS.md §6). */
export const customerLogos = [
  { name: "Customer 01", logo: "/logos/customers/customer-01.svg" },
  { name: "Customer 02", logo: "/logos/customers/customer-02.svg" },
  { name: "Customer 03", logo: "/logos/customers/customer-03.svg" },
  { name: "Customer 04", logo: "/logos/customers/customer-04.svg" },
  { name: "Customer 05", logo: "/logos/customers/customer-05.svg" },
  { name: "Customer 06", logo: "/logos/customers/customer-06.svg" },
] as const;

export const timeline = [
  { year: "2019", event: "Company founded", detail: "Webber Electro Corp incorporated.", pending: true },
  { year: "2021", event: "Second Runner-up, EVangelise ’21", detail: "Early recognition for first-principle BMS design." },
  { year: "2022", event: "First production BMS deployments", detail: "WBMS-SW family enters series production.", pending: true },
  { year: "2023", event: "AIS 156 Phase 2 milestone", detail: "Certified variant with µSD and buzzer integration.", pending: true },
  { year: "2024", event: "Major OEM programmes scale", detail: "Deployments accelerate across 2W and 3W platforms.", pending: false },
  { year: "2025", event: "Best Technology Partner Award", detail: "Greaves Electric Mobility / Ampere." },
  { year: "2026", event: "75,000th deployment · BESS portfolio", detail: "48–1200 V storage architecture introduced." },
] as const;

export const contact = {
  email: "connect@webberec.com",
  phone: "+91 94254 08221",
} as const;

export const jobs = [
  {
    slug: "embedded-firmware-engineer",
    role: "Embedded Firmware Engineer",
    department: "Software",
    location: "India",
    experience: "2–6 years",
    type: "Full-time",
    posted: "2026-06-01",
  },
  {
    slug: "power-electronics-hardware-engineer",
    role: "Power Electronics Hardware Engineer",
    department: "Hardware",
    location: "India",
    experience: "3–8 years",
    type: "Full-time",
    posted: "2026-06-15",
  },
  {
    slug: "battery-algorithms-engineer",
    role: "Battery Algorithms Engineer",
    department: "Systems",
    location: "India",
    experience: "2–5 years",
    type: "Full-time",
    posted: "2026-07-01",
  },
] as const;
