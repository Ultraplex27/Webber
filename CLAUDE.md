@AGENTS.md

# Webber Electro Corp — project notes

See `README.md` for architecture (layout, motion, assets) and `BRAND_GUIDELINES.md`
for the full color/typography/button/icon spec extracted from
`Webber_brand_guideline.pdf`. Don't restyle colors, type or buttons without
checking that file first — it's the source of truth, not this summary.

## Product catalogue

- Products are intentionally a **single page** at `/products`; do not recreate
  `/products/[slug]` detail routes unless explicitly requested. The sitemap has
  no per-product URLs.
- The live catalogue is defined in `src/content/products.ts` and currently
  mirrors the 12 supplied BMS render families. Cards render their data through
  `ProductCard.tsx` and use a consistent centred, contained 4:3 image stage.
- The source asset directory is `Assets/BMS Renders/`. Website-ready copies
  live in `public/images/products/bms-renders/`. The WBMS-SW 16S/32S Contactor
  image is extracted from `Assets/Webber_ElectroCorp Profile April 2026.pdf`
  and uses `contactor-profile-transparent.png` so it does not show a black
  matte.
- Never invent product specifications. Any field not confirmed by the April
  2026 profile or a controlled datasheet must remain `—` on the site. The
  active profile reference is `Assets/Webber_ElectroCorp Profile April 2026.pdf`.
- `docs/Webber_BMS_Product_Data_Template.xlsx` is the intake source for missing
  catalogue data and later detail pages. Yellow cells are user-editable;
  unknown values stay blank in the workbook / `—` on the website, and the
  Source / notes column should accompany every new specification.
- Vehicle and ESS controls in `ProductExplorer.client.tsx` are active compact
  filters. They derive their results from the current `applications` strings;
  keep them small technical chips and do not add status text beside them.

## Brand & design tokens

- All color lives in `src/app/globals.css` `:root` as six brand swatches
  (`--uniform-blue`, `--aesthetic-blue`, `--spindle`, `--anchor-gray`,
  `--teal`, plus button-only `--pressed-indigo` / `--btn-disabled-gray`).
  Every other token (`--ink`, `--grey-*`, `--blue-*`, `--canvas-soft`, etc.) is
  derived from those six via `color-mix()`. **Never hardcode a hex color in a
  component** — add or reuse a token so brand changes cascade from one place.
- Primary heading font is **Space Grotesk** (`--font-display`), a free stand-in
  for Aguda Black — the brand's actual primary typeface, a paid Graviton font
  not available as a webfont. Body copy is **Roboto** (`--font-sans`). IBM Plex
  Mono remains for technical/spec micro-labels (`--font-mono`), predating the
  brand pass. Don't swap these without re-reading the licensing note in
  `BRAND_GUIDELINES.md`.
- `.btn-primary` / `.btn-secondary` active/hover/click/disabled colors are
  sampled directly from the guideline's button artwork — don't restyle button
  states from first principles, match the table in `BRAND_GUIDELINES.md`.
- `.band-dark` / `.band-gradient` (in `globals.css`) invert a section to the
  brand's dark register (solid Uniform Blue / the `#215090 → #0F253F`
  gradient) by locally redefining the shared `--ink`/`--grey-*`/`--blue-*`
  tokens, so any component already built from those tokens inverts for free.
  **Only apply them to sections without `.card` / `.spec-card` / `.spec-panel`
  children** — those tiles have an opaque/frosted white background that won't
  invert, so their text (which does invert) can end up white-on-white.
