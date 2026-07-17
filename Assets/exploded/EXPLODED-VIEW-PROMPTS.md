# BMS Board — Representative Exploded View (Nano Banana Pro)

A **representative** (not datasheet-accurate) exploded view of the Webber BMS board for the
Technology page. The model invents the internal layers, so this is a marketing visual — the
4-layer split is chosen to illustrate the metal-core PCB / 2× thermal differentiator.

## Reference image (upload for ALL 5 generations)

`Assets/exploded/board-reference.png` — real Webber board render, caption cropped, branding intact.

## Settings

- Model: **Nano Banana Pro**, **2K**
- Aspect: **4:3 landscape** for all 5 (matches the site slot). Optionally 3:4 for the combined shot.
- Generate the **combined view first**; then the 4 layers. Optional: add the combined result as a
  second reference when generating the layers, to lock consistency.

## Style base (identical in every prompt)

> Product visualization of a rectangular battery management system (BMS) circuit board, matching
> the uploaded reference board exactly in outline, proportions, and navy-blue colour with the white
> "Webber" silkscreen branding. Pure white studio background, soft even studio lighting, subtle
> contact shadow, matte finish, slight 3/4 top-down camera angle, photorealistic engineering
> render. No text labels, no dimension lines, no annotations, no people. Board shape and branding
> stay rigid and consistent.

## Prompts

**1 — Combined exploded view** → save as `public/images/technology/board-exploded.webp`
> …[style base]… Create a technical EXPLODED VIEW: the board separated into four flat layers
> floating apart along the vertical axis with even gaps, in perfect registration one above the
> other, slight 3/4 angle so every layer is visible. TOP to BOTTOM: (1) populated top layer — navy
> soldermask with the MOSFET power bank, white JST cell connectors, screw terminals, ICs and the
> white "Webber" logo; (2) a copper circuit layer — bright copper/gold traces, pads and pours, no
> components; (3) a thin matte off-white dielectric insulation sheet, plain; (4) a brushed-silver
> aluminium metal-core base plate, slightly thicker, with mounting holes. All four share the
> identical board outline.

**2 — Layer 1 (components)** → `public/images/technology/exploded/layer-1-components.webp`
> …[style base]… Show ONLY the top populated layer floating alone, centred: navy soldermask face
> with the MOSFET power bank, white JST cell connectors, screw terminals, ICs and the white
> "Webber" logo, matching the reference. No other layers.

**3 — Layer 2 (copper)** → `public/images/technology/exploded/layer-2-copper.webp`
> …[style base]… Show ONLY a single copper circuit layer floating alone, centred: the same board
> outline as bright copper/gold traces, pads and pours forming the routing pattern, thin and flat,
> no components, no soldermask.

**4 — Layer 3 (dielectric)** → `public/images/technology/exploded/layer-3-dielectric.webp`
> …[style base]… Show ONLY a single dielectric insulation layer floating alone, centred: a thin
> flat matte off-white/cream fibreglass (FR-4 style) sheet in the same board outline, plain, no
> traces, no components.

**5 — Layer 4 (metal core)** → `public/images/technology/exploded/layer-4-metal-core.webp`
> …[style base]… Show ONLY the aluminium metal-core base plate floating alone, centred: a
> brushed-silver aluminium plate in the same board outline, slightly thicker than the other layers,
> with mounting holes and screw bosses, matte metallic finish.

## Negative prompt (if available)

> warped board outline, changed proportions, garbled text, coloured or dark background, lens flare,
> people, hands, extra boards, cluttered scene

## Delivery

Drop the 5 exports (any format) at the paths above — code side handles conversion/optimization and
wires the combined image into the Technology hero plus an optional 4-layer scroll reveal.
