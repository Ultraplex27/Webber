# Webber Electro Corp

Marketing site for Webber Electro Corp: battery management systems from 12V to 1200V.

Next.js (App Router) + TypeScript + Tailwind v4. All content is server-rendered;
motion is a progressive enhancement layered on top.

## Running

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

## Layout

```
src/
  app/                     routes; one folder per page, plus sitemap/robots
  components/
    hero/                  home hero: scroll-scrubbed frame sequence
    home/                  home-page sections
    product/               catalogue, filters, comparison, spec tables
    technology/            exploded board, technical charts
    contact/               enquiry + careers forms
    motion/                shared motion primitives and the motion provider
    ui/                    header, footer, cards, logos, CTAs
  content/                 typed content (products, company, differentiators)
docs/                      asset briefs and generation specs
Assets/                    source material (not served): PDFs, logos, video
public/                    served assets
```

## Design system

Tokens live in `src/app/globals.css`: colour, type scale, spacing, easing.

Two ideas drive the visual language, and most layout decisions follow from them:

- **Drafting paper.** Pages sit on `.pencil-grid`, a faint modular grid, and
  `BlueprintMeasure` draws a CAD dimension line down each section. Panels are
  frosted rather than opaque so the grid reads through and stays continuous.
- **The modular grid.** `--module` is the content column divided by 11/23/35/47
  depending on breakpoint. Those divisors (all ≡ 11 mod 12) are what let 2-, 3-
  and 4-up card grids land on the rules with a one-module gutter (`.gap-module`).
  Changing them breaks card alignment.

## Motion

`MotionProvider` owns the reduced-motion decision and starts Lenis (desktop,
fine pointer only). Everything checks `useMotion()`; under reduced motion,
animations resolve to their finished state rather than being skipped, and there
is a persistent "Reduce motion" toggle in the footer that overrides the OS
setting.

Lenis owns the scroll position on desktop, so programmatic scrolling goes
through `lenisInstance`, never `window.scrollTo`.

## Assets

Imagery is generated/sourced against the briefs in `docs/`. `SmartImage` renders
a technical placeholder when a file is missing, so assets can land incrementally.

The hero is a video (`Assets/hero-video/`) extracted to a still sequence at
`public/images/hero/frames/` with a `manifest.json` giving the frame count; the
hero scrubs those on a canvas. To swap the footage, re-extract at 24fps and
update the count. Same pattern for the exploded board on the technology page.

## Before launch

- Wire the contact form to a real backend (it currently validates and confirms
  client-side only)
- Confirm patent statuses, AIS 156 certificate references and the timeline dates
  marked `DATE TBC`
- Founder quote needs approval; privacy policy is a placeholder
- Product specs marked `TBC` need confirming against controlled product data
- Partner and customer logos should be replaced with official vector originals
  where available
