@AGENTS.md

# Webber Electro Corp — project notes

See `README.md` for architecture (layout, motion, assets) and `BRAND_GUIDELINES.md`
for the full color/typography/button/icon spec extracted from
`Webber_brand_guideline.pdf`. Don't restyle colors, type or buttons without
checking that file first — it's the source of truth, not this summary.

## Product catalogue

- `/products` is the catalogue grid; `/products/[slug]` is the per-product
  detail sheet. The `Product` interface in `src/content/products.ts` mirrors
  the "Products" sheet of `Assets/Webber_BMS_Product_Data_Template.xlsx` 1:1
  (Electrical, Balancing, Architecture, Applications, Communications,
  Mechanical, Environmental, Safety, Compliance), so `SpecificationTable.tsx`
  renders the full category grid and `product.positioning` becomes the
  detail-page hero lead. The card (`ProductCard.tsx`) still only surfaces four
  fields for scanning a grid; the detail page shows all of them. **That
  workbook — not the identically-named blank one in `docs/` — is now the
  live, filled-in catalogue of 11 products**; when it's updated again, re-read
  it (its "Instructions" sheet explains the conventions) and copy values
  straight into the matching `Product` field, field names line up with its
  header row.
- Slugs are exactly what's in the workbook's `Slug` column, including mixed
  case (e.g. `SW-16S`, `SWLT-ESS`) — its Instructions sheet says not to change
  them without an explicit remapping. The workbook's product roster doesn't
  1:1 match the old render-photography folder names: some render families
  were reassigned to a different/renamed product (e.g. the `Contactor C9 BMS`
  photography is now `contactor-16S`'s images, `WBMS-SW-CAN V2 BMS` is now
  `SW-16S`'s), one product (`SWLT v1.5 120A`) was dropped entirely, and one
  (`contactor-32s-ess`) has no dedicated render yet and reuses
  `contactor-32s`'s photography since it's stated to be the same board.
- `application` is the categorical field (`"Automotive" | "BESS"`) that drives
  the Automotive/BESS catalogue filters in `ProductExplorer.client.tsx`;
  `otherApplications` is the granular free-text list (2W, 3W, Forklifts, ...)
  the Automotive sub-filters regex-match against. BESS voltage sub-filters
  band-match `nominalVoltage`; the "48V" band is widened to 40–67V because
  that's the resting/charged voltage a 16S 48V-class pack actually reports,
  not a literal "48".
- The source asset directory is `Assets/BMS Renders/`. Website-ready copies
  live in `public/images/products/bms-renders/` as `<slug>-<n>.webp`,
  generated via `sharp`/`ffmpeg` from the much larger source PNGs (kept out
  of the delivered bundle) — filenames should track the current slug, so
  rename the files (`git mv`) if a product's slug ever changes rather than
  leaving stale names.
- Never invent product specifications. Any field left blank in the workbook
  must remain `—` on the site.

## Brand & design tokens

- All color lives in `src/app/globals.css` `:root` as six brand swatches
  (`--uniform-blue`, `--aesthetic-blue`, `--spindle`, `--anchor-gray`,
  `--teal`, plus button-only `--pressed-indigo` / `--btn-disabled-gray`).
  Every other token (`--ink`, `--grey-*`, `--blue-*`, `--canvas-soft`, etc.) is
  derived from those six via `color-mix()`. **Never hardcode a hex color in a
  component** — add or reuse a token so brand changes cascade from one place.
- Primary heading font is **Space Grotesk** (`--font-display`), a free stand-in
  for Aguda Black — the brand's actual primary typeface, a paid Graviton font
  not available as a webfont. Body copy is **Roboto** (`--font-sans`). The
  guideline specifies only these two typefaces, so technical/spec
  micro-labels also alias to Roboto via `--font-mono` (a third face, IBM Plex
  Mono, was removed for this reason). Don't swap these without re-reading the
  licensing note in `BRAND_GUIDELINES.md`.
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
