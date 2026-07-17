# Webber ElectroCorp — Image & Asset Generation Spec

This document is the **single source of truth** for every visual asset the website references.
Generate each asset at the **exact path and filename** listed — the code already points at these
paths. Drop a file in and it appears on the site; no code changes needed.

The site ships with automatic technical-placeholder fallbacks (`SmartImage` component renders a
grey schematic tile when a file is missing), so assets can be delivered incrementally in any order.

---

## 1. Global art direction (applies to every asset)

- **Palette:** white `#FFFFFF` / soft canvas `#F7F9FC` backgrounds; structure in greys
  `#BAC4D1`–`#465366`; electric blue `#0B5FFF` (accents `#2E7BFF`, glow `#82B2FF`) used **only**
  where energy, data, or intelligence is actively flowing. Never blue-purple gradients.
- **Mood:** precision engineering drawing, not consumer-tech gloss. Controlled trace illumination,
  never exposed lightning arcs. No lens flares, no dark "gamer" aesthetics.
- **Lighting (photo/render):** neutral studio, single soft key + fill, colour-neutral white
  sweep background, no coloured gels.
- **Hardware accuracy:** BMS boards are rectangular FR-4/metal-core PCBs with MOSFET banks, shunt
  resistors, cell-tap connector headers (16S/24S/32S), CAN transceivers, and screw terminals.
  Reference real BMS photography from webberec.com where possible. **Never invent port layouts
  that contradict real Webber hardware if real photos are available.**
- **No AI-artifact tells:** no melted text, no fictional silkscreen gibberish — if silkscreen text
  is visible it should read plausibly (`WBMS-SW`, `16S`, `CAN-H`, `B+`, `P-`, `NTC1`…).
- **Formats:** photography/renders → **WebP quality ~82** (plus AVIF where noted); line drawings
  and logos → **SVG** (true vector, `currentColor` where specified). sRGB colour space.
- **Naming:** all lowercase, hyphen-separated, exactly as listed. No spaces, no underscores.

---

## 2. Hero posters (critical — LCP images)

| Path | Size | Format | Description |
|---|---|---|---|
| `public/images/hero/hero-poster.avif` | 2560×1440 | AVIF ≤120KB | Desktop static hero fallback. A white field with a faint blue atmospheric bloom right-of-centre; a single small white-blue energy pulse (glowing dot ~40px with soft radial falloff `rgba(46,123,255,.34)→transparent`) travelling along one thin illuminated copper trace toward a partially-resolved BMS board in the lower-right third, drawn in fine grey linework (`#BAC4D1`, 1px equivalent). Barely-visible grid coordinates in the background (2% opacity). Composition must leave the **left 45% clear** for HTML headline text. |
| `public/images/hero/hero-poster.webp` | 2560×1440 | WebP ≤180KB | Identical composition, WebP fallback. |
| `public/images/hero/hero-poster-mobile.webp` | 1080×1620 (2:3 portrait) | WebP ≤140KB | Mobile vertical layered composition, top→bottom: (1) glowing blue trace entering a fine-line BMS board, (2) that board seated inside a battery pack drawn as grey linework, (3) faint fine-line silhouettes of a scooter, three-wheeler and BESS cabinet behind/below. Top 35% must stay near-white for the HTML headline. |

## 3. Product photography / renders

One folder per product slug. **Required per product:** `front.webp` (three-quarter),
`top.webp`, `connector.webp`. Optional: `exploded.webp`. Plus `dimensions.svg` line drawing.

- Render/photo size: **1600×1200**, product fills ~70% of frame, transparent-feel white
  (`#FFFFFF`) seamless background, soft contact shadow only (no reflections).
- Angle for `front.webp`: front three-quarter, ~30° yaw, ~15° pitch down.
- `dimensions.svg`: orthographic outline drawing, 1px `#465366` strokes, dimension arrows and
  mono labels (e.g. `128 mm`), transparent background.

| Product | Folder |
|---|---|
| WBMS-SW 16S (60/80A MOSFET BMS, 2W/E-rickshaw) | `public/images/products/wbms-sw-16s/` |
| WBMS-SW 24S (60/80A MOSFET BMS) | `public/images/products/wbms-sw-24s/` |
| WBMS-SWLT 16S (45/60A compact BMS) | `public/images/products/wbms-swlt-16s/` |
| WBMS-SW 16S/32S Contactor (100–250A, 3W/forklift) | `public/images/products/wbms-sw-contactor/` |
| WBMS-SW-Mini 45A (compact MOSFET BMS) | `public/images/products/wbms-sw-mini-45a/` |
| WBMS-SW-Contactor 200A (high-current contactor BMS) | `public/images/products/wbms-sw-contactor-200a/` |
| 4G/IoT Telematics unit (compact IP-rated enclosure, antenna, connector) | `public/images/products/telematics-4g/` |

So e.g. the full required set for the first product is:

```text
public/images/products/wbms-sw-16s/front.webp
public/images/products/wbms-sw-16s/top.webp
public/images/products/wbms-sw-16s/connector.webp
public/images/products/wbms-sw-16s/dimensions.svg
public/images/products/wbms-sw-16s/exploded.webp   (optional)
```

Contactor-family boards must visibly include a contactor/relay block and pre-charge circuitry;
MOSFET-family boards show a MOSFET bank + busbar. SWLT/Mini are visibly smaller boards.

## 4. Technology page

| Path | Size | Format | Description |
|---|---|---|---|
| `public/images/technology/board-exploded.webp` | 2000×1500 | WebP | Exploded vertical stack of a BMS board: copper layer, metal-core (aluminium) layer, FR-4, component layer — separated vertically with thin grey leader lines and small zones tinted blue-50 `#EFF5FF` marking isolation boundaries and protection zones. White background, engineering-render style (matte, no glossy studio HDRI). |
| `public/images/technology/thermal-comparison.webp` | 1600×900 | WebP | Side-by-side thermal map: standard FR-4 board (warm grey hotspots) vs metal-core board (cooler, even, blue-tinted). Muted scientific colour ramp — grey→blue, **not** rainbow FLIR. Mono labels `FR-4` / `METAL-CORE`. |
| `public/images/technology/lab/thermal-testing.webp` | 1600×1067 | WebP | Documentary photo: engineer running thermal test, thermal camera pointed at powered board on bench. |
| `public/images/technology/lab/dead-short-testing.webp` | 1600×1067 | WebP | Short-circuit test rig — heavy copper busbars, safety enclosure, scope in background. |
| `public/images/technology/lab/vibration.webp` | 1600×1067 | WebP | BMS fixture mounted on an electrodynamic vibration table. |
| `public/images/technology/lab/environmental-cycling.webp` | 1600×1067 | WebP | Environmental/thermal chamber with boards racked inside, door open. |
| `public/images/technology/lab/hil-validation.webp` | 1600×1067 | WebP | Hardware-in-loop bench: cell simulator, DUT board, laptop with test software. |
| `public/images/technology/lab/end-of-line.webp` | 1600×1067 | WebP | Production end-of-line test station, operator with fixture, pass/fail indicator. |

Lab photos: real-photography look, neutral colour, Indian engineering-lab context, no faces in
sharp focus required (hands/equipment fine). Consistent white-balance across the set.

## 5. Company page

| Path | Size | Format | Description |
|---|---|---|---|
| `public/images/company/engineering-floor.webp` | 2400×1350 | WebP | Wide documentary shot of the engineering floor — benches, scopes, boards, people working. Natural light, honest, not stock-photo staged. |
| `public/images/company/leadership/manuj-agrawal.webp` | 800×1000 (4:5) | WebP | Portrait, Founder & CEO. Neutral light-grey background, consistent crop across all portraits (head + shoulders, eyes at upper third). |
| `public/images/company/leadership/bhanu-marwaha.webp` | 800×1000 | WebP | Portrait, COO / Partner. |
| `public/images/company/leadership/ajay-kumar.webp` | 800×1000 | WebP | Portrait, VP Growth & Programme. |
| `public/images/company/leadership/jyoti-ranjan-swain.webp` | 800×1000 | WebP | Portrait, Senior Software Engineer. |
| `public/images/company/leadership/nishant-anurag.webp` | 800×1000 | WebP | Portrait, Senior Hardware Design Engineer. |
| `public/images/company/leadership/suyog-aundhe.webp` | 800×1000 | WebP | Portrait, Manager Product Integration. |
| `public/images/company/founder-portrait.webp` | 1200×1500 | WebP | Larger environmental portrait of Manuj Agrawal in the lab/floor for the founder-narrative section. |
| `public/images/company/mosaic/hardware.webp` | 1200×900 | WebP | Engineer probing a board at an oscilloscope. |
| `public/images/company/mosaic/firmware.webp` | 1200×900 | WebP | Developer at dual monitors — embedded C, debugger attached to a board. |
| `public/images/company/mosaic/systems.webp` | 1200×900 | WebP | Whiteboard/system-schematic review session. |
| `public/images/company/mosaic/validation.webp` | 1200×900 | WebP | Test rig with cell simulator and DUT. |
| `public/images/company/mosaic/integration.webp` | 1200×900 | WebP | BMS being fitted into a real battery pack / vehicle. |
| `public/images/company/mosaic/operations.webp` | 1200×900 | WebP | Production-quality check, boards in ESD trays. |

**Portraits must be real photographs supplied by Webber — do not AI-generate faces of real,
named people.** Until supplied, the site renders initials-based placeholders automatically.

## 6. Logos

All logos as **monochrome SVG**, single colour `#465366` (or `currentColor`), horizontal
lockups, normalised to 32px cap-height on a transparent background. Source official brand
assets — **do not redraw or AI-generate trademarked logos**; obtain vector originals.

```text
public/logos/webber-logo.svg              (primary logo, currentColor)
public/logos/webber-mark.svg              (square mark only, currentColor, used in footer/favicons)

# Engineered-with partners
public/logos/partners/icreate.svg
public/logos/partners/stmicroelectronics.svg
public/logos/partners/texas-instruments.svg
public/logos/partners/kinetic-communications.svg
public/logos/partners/arrow.svg

# Deployed-with customers / OEMs — confirm the public-approval list with Webber first
public/logos/customers/customer-01.svg … customer-06.svg
```

Once the approved customer list is confirmed, rename files to real slugs (e.g.
`greaves-ampere.svg`) **and update `src/content/partners.ts`** (the one file that maps logos).

## 7. Interface / dashboard imagery

| Path | Size | Format | Description |
|---|---|---|---|
| `public/images/telematics/dashboard.webp` | 2000×1250 | WebP | Screenshot-style render of a fleet-telematics dashboard on a pale blue-grey UI (`#EFF5FF`/white): map with geofence polygon, asset list with battery state, one highlighted fault event, maintenance-prediction card. Use the site's tokens (blue `#0B5FFF` accents, mono micro-labels). If a real Webber dashboard screenshot exists, prefer it (sanitise customer data). |
| `public/images/telematics/device-edge-cloud.svg` | vector | SVG | Three-layer diagram ASSET → EDGE DEVICE → WEBBER CLOUD/API, thin-line technical style, 1px `#94A0B2` strokes, blue only on data paths. |

## 8. Open Graph / SEO

| Path | Size | Format | Description |
|---|---|---|---|
| `public/og/og-default.png` | 1200×630 | PNG | White field, faint grid, single blue trace with pulse, `WEBBER ELECTRO CORP` + `BATTERY INTELLIGENCE / 12V—1200V` in mono caps, "Rewire the Planet." headline. |
| `public/og/og-products.png` | 1200×630 | PNG | Same template, product family lineup silhouette in grey linework. |
| `public/og/og-technology.png` | 1200×630 | PNG | Same template, exploded board stack linework. |
| `public/og/og-company.png` | 1200×630 | PNG | Same template, `75+ PEOPLE / 75K+ DEPLOYMENTS / 12V—1200V` metric row. |

## 9. 3D hero (optional upgrade — site currently runs a procedural Three.js scene)

The scroll hero is implemented procedurally (no external model needed). If/when real geometry is
produced in Blender, export a single GLB to:

```text
public/models/hero.glb        (≤1.5MB: Meshopt or Draco compressed, KTX2 textures ≤1024px,
                               baked AO, instanced cells, named nodes below)
```

Required named nodes/markers so code can bind to them: `electron_path` (curve), `pcb_board`,
`trace_sensing`, `trace_balancing`, `zone_thermal`, `zone_isolation`, `zone_protection`,
`bus_output`, `cell_module` (instanced), `pack_housing`, `lines_2w`, `lines_3w`, `lines_bess`,
`network_paths`. Morph/visibility animation markers: `enter_board`, `balancing`, `thermal`,
`isolation`, `protection`, `pack_assembly`, `charge`, `vehicle_2w`, `vehicle_3w`, `bess`, `network`.

## 10. Things NOT to generate

- Faces of real named individuals (leadership portraits) — must be supplied photography.
- Trademarked partner/customer logos redrawn by AI — source official vectors.
- Exposed lightning/electric-arc imagery — off art-direction.
- Dark-background hero scenes — the system is white-field.
- Any image embedding specification numbers not present in `src/content/products.ts`
  (numbers live in HTML, not pixels, so they stay correctable).

## Delivery checklist

1. File at the exact path/name above (create folders as needed).
2. Correct dimensions and format; photography ≤300KB each after compression (posters per their own budgets).
3. sRGB, no embedded EXIF/GPS.
4. Visually consistent with §1 art direction.
5. Nothing else in `public/` needs touching — the site picks files up automatically.
