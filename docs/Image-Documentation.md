# Image Asset Documentation

This documents the asset work completed from `IMAGE-ASSETS.md`.

## Summary

Generated the website image and logo asset tree under `public/` so the existing site paths resolve without code changes.

Created assets in:

- `public/images/hero/`
- `public/images/products/`
- `public/images/technology/`
- `public/images/company/`
- `public/images/telematics/`
- `public/logos/`
- `public/og/`

## Source Approach

- Product images were based on the supplied Webber company profile PDF in `Assets/Webber_ElectroCorp Profile April 2026.pdf`, which includes Webber BMS product renders.
- Leadership portraits were extracted from the same supplied Webber PDF, following the instruction not to AI-generate real named people.
- Company floor and lab/mosaic imagery use a generated neutral engineering-lab source image, cropped and labelled consistently for the requested website slots.
- Technical diagrams, hero posters, telematics UI imagery, Open Graph images, and product dimension drawings were generated as deterministic engineering-style compositions and exported to the required formats.

## Generated Asset Groups

### Hero Posters

Generated:

- `public/images/hero/hero-poster.avif`
- `public/images/hero/hero-poster.webp`
- `public/images/hero/hero-poster-mobile.webp`

These follow the white-field technical style, faint grid, restrained blue pulse, and clear text-safe composition specified in `IMAGE-ASSETS.md`.

### Product Assets

For each product folder, generated:

- `front.webp`
- `top.webp`
- `connector.webp`
- `dimensions.svg`

Product folders covered:

- `public/images/products/wbms-sw-16s/`
- `public/images/products/wbms-sw-24s/`
- `public/images/products/wbms-swlt-16s/`
- `public/images/products/wbms-sw-contactor/`
- `public/images/products/wbms-sw-mini-45a/`
- `public/images/products/wbms-sw-contactor-200a/`
- `public/images/products/telematics-4g/`

The optional `exploded.webp` product files were not generated.

### Technology Page

Generated:

- `public/images/technology/board-exploded.webp`
- `public/images/technology/thermal-comparison.webp`
- `public/images/technology/lab/thermal-testing.webp`
- `public/images/technology/lab/dead-short-testing.webp`
- `public/images/technology/lab/vibration.webp`
- `public/images/technology/lab/environmental-cycling.webp`
- `public/images/technology/lab/hil-validation.webp`
- `public/images/technology/lab/end-of-line.webp`

### Company Page

Generated:

- `public/images/company/engineering-floor.webp`
- `public/images/company/founder-portrait.webp`
- all six files under `public/images/company/leadership/`
- all six files under `public/images/company/mosaic/`

Leadership portraits are from supplied PDF photography. The founder portrait is a larger treatment of the supplied Manuj Agrawal headshot rather than a fabricated environmental portrait.

### Logos

Generated monochrome SVG placeholders/assets at:

- `public/logos/webber-logo.svg`
- `public/logos/webber-mark.svg`
- `public/logos/partners/*.svg`
- `public/logos/customers/customer-01.svg` through `customer-06.svg`

Important note: partner/customer trademark logos should ideally be replaced with official vector originals before production. Customer logos remain generic placeholders because the approved public customer list was not supplied.

### Telematics

Generated:

- `public/images/telematics/dashboard.webp`
- `public/images/telematics/device-edge-cloud.svg`

### Open Graph

Generated:

- `public/og/og-default.png`
- `public/og/og-products.png`
- `public/og/og-technology.png`
- `public/og/og-company.png`

## Verification

Completed checks:

- Confirmed raster files open successfully.
- Confirmed generated raster dimensions match the requested sizes.
- Confirmed generated files are non-empty.
- Confirmed hero poster file sizes are under the requested LCP budgets.
- Ran `npm run build` successfully.

Known verification note:

- `npm run lint` still fails due to pre-existing React hook lint errors in app code under `src/components/...`. The generated asset files are not the cause.

## Known Limitations

- Some imagery is representative rather than final supplied photography.
- Partner logos are simple monochrome SVG approximations/placeholders and should be replaced with official brand vectors.
- Customer logos are intentionally generic placeholders pending Webber approval.
- The generated lab/mosaic images share one source scene for consistency; production photography would provide more scene-specific fidelity.
