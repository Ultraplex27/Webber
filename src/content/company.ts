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
    logos: ["/logos/partners/icreate.png"],
  },
  {
    role: "Semiconductor and design ecosystem",
    names: ["STMicroelectronics", "Texas Instruments"],
    logos: [
      "/logos/partners/stmicroelectronics.svg",
      "/logos/partners/texas-instruments.png",
    ],
  },
  {
    role: "Electronics manufacturing",
    names: ["Kinetic Communications", "PG Electroplast"],
    logos: [
      "/logos/partners/kinetic-communications.png",
      "/logos/partners/PG Electroplast.png",
    ],
  },
] as const;

export const customerLogos = [
  { name: "Greaves Electric Mobility", logo: "/logos/customers/greaves-electric-mobility.png", scale: 1.3 },
  { name: "Kinetic Green", logo: "/logos/customers/kinetic-green.png" },
  { name: "EKA Mobility", logo: "/logos/customers/eka.png", scale: 0.75 },
  { name: "Terra Motors", logo: "/logos/customers/terra-motors.png" },
  { name: "BAXY Mobility", logo: "/logos/customers/baxy-mobility.png" },
  { name: "General Aeronautics", logo: "/logos/customers/general-aeronautics.png" },
  { name: "Eastman", logo: "/logos/customers/eastman.png" },
  { name: "Replus Green", logo: "/logos/customers/replus.png" },
  { name: "Trontek", logo: "/logos/customers/trontek.png" },
  { name: "Inverted", logo: "/logos/customers/inverted.png" },
] as const;

export const timeline = [
  { year: "2019", event: "Company founded", detail: "Webber Electro Corp incorporated." },
  { year: "2021", event: "Second Runner-up, EVangelise ’21", detail: "Early recognition for first-principle BMS design." },
  { year: "2022", event: "First production BMS deployments", detail: "WBMS-SW family enters series production." },
  { year: "2023", event: "AIS 156 Phase 2 milestone", detail: "Certified variant with µSD and buzzer integration." },
  { year: "2024", event: "Major OEM programmes scale", detail: "Deployments accelerate across 2W and 3W platforms." },
  { year: "2025", event: "Best Technology Partner Award", detail: "Greaves Electric Mobility / Ampere." },
  { year: "2026", event: "75,000th deployment · BESS portfolio", detail: "48–1200 V storage architecture introduced." },
] as const;

export const contact = {
  email: "connect@webberec.com",
  phone: "+91 94254 08221",
  address: "Plot No 4/25, Sector 10, PCNTDA, Bhosari, Pimpri-Chinchwad, Pune, Maharashtra 411026",
} as const;

