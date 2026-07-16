# Webber Hero — Scroll-Sequence Keyframe Spec (Image Agent Prompt)

The homepage hero is a pinned, scroll-scrubbed sequence of **13 rendered keyframes** that
crossfade with subtle scale drift. The code is already wired to these exact paths — drop the
files in and the cinematic hero activates automatically (it currently falls back to the static
poster because these frames don't exist yet).

**Read `IMAGE-ASSETS.md` §1 for global art direction first.** Everything there applies.

---

## Non-negotiable global rules (apply to every frame)

1. **Canvas:** 2560×1440, WebP quality ~80, **≤250 KB per frame**, sRGB.
2. **Edges must be pure white `#FFFFFF`** on all four sides (at minimum the outer 5% border of
   every frame) so crossfades between frames are invisible and the frame blends into the page.
3. **One continuous camera language.** The 13 frames must read as a single camera move:
   drift in → dive to macro → travel across the board → pull out → wide. Each frame should look
   like a plausible next moment after the previous one — same board, same lighting, same
   perspective family (slight top-down 3/4 view, ~30° pitch). Never flip direction or style.
4. **Same hero object throughout:** the Webber BMS board. Base it on the real render used in
   `public/images/products/wbms-sw-16s/front.webp` (navy-blue solder mask, Webber silkscreen
   logo, MOSFET/busbar region, JST cell-tap headers, screw terminals). The SAME board appears in
   every board frame — components must not teleport between frames.
5. **Light:** soft neutral studio key from upper left, gentle contact shadow, matte — no glossy
   HDRI reflections, no lens flare, no depth-of-field blur stronger than very subtle.
6. **Blue budget:** electric blue (`#0B5FFF`/`#2E7BFF` family, soft glow `#82B2FF`) appears ONLY
   as: the energy pulse, illuminated trace paths, charge state, and network routes. Everything
   else is white / grey (`#BAC4D1`–`#465366`) / navy board. No blue washes over whole frames.
7. **The energy pulse** is a small bright core (white-blue `#EAF4FF` centre, ~60–90 px radial
   glow falling to transparent) travelling along a visible trace. It appears in frames 01–08
   at the positions given per frame (the site also overlays a live CSS pulse — the baked pulse
   should be subtle, more "glow on the trace" than "bright ball").
8. **No text anywhere** in the frames — no labels, no numbers, no baked captions. The site
   overlays live HTML labels. (Board silkscreen like `J2`, `CAN-H`, the Webber logo is fine.)
9. **Text-safe zone, frames 01–02 only:** the LEFT 45% of frames 01 and 02 must stay clean
   near-white (faint grid ok) — the headline "Rewire the Planet." sits there.
10. **No:** lightning arcs, dark backgrounds, sci-fi HUDs, world-map globes, purple gradients,
    photoreal humans, fictional gibberish text.

---

## The 13 frames

Save to `public/images/hero/seq/` with these exact names.

### `scene-01-white-field.webp` — The white field
Near-empty white field. Faint 2%-opacity engineering grid. A soft atmospheric blue bloom
slightly right of centre (like the existing poster). One thin conductor trace enters from the
left mid-frame and runs toward the right third; the energy pulse sits on it around x 40%, y 55%,
drifting. Nothing else. Left 45% clean for headline.

### `scene-02-board-approach.webp` — The board resolves
Camera has drifted right and down: the Webber BMS board appears small in the lower-right third
(about 25% of frame width), seen from high above at 3/4 angle, partially "resolving" — its far
edge can fade into white haze. The conductor trace from scene 01 continues and visibly connects
toward the board's connector edge. Pulse on the trace at x 55%, y 50%. Left 45% still clean.

### `scene-03-sensing-macro.webp` — Into the sensing traces
First macro frame: camera is now low over the board surface (board fills ~85% of frame).
Focus region: the cell-tap / sensing area — JST headers, fine copper traces fanning out.
A few sensing traces are lit faint blue as if carrying measurement signals; the pulse glows near
x 30%, y 55%. Copper detail, resist texture, silkscreen visible. Everything crisp and clean.

### `scene-04-balancing.webp` — Balancing at work
Continue travelling right across the same board: the balancing network region — rows of small
balancing resistors/FETs beside the cell-tap header. 3–4 of the balancing channels glow warm-to-
blue subtly, as if shunting. Pulse near x 35%, y 42%. Same altitude and lighting as scene 03.

### `scene-05-thermal.webp` — Metal-core thermal zone
The camera passes the power stage: MOSFET bank and busbar area. Show the metal-core layer
visually — a clean cutaway sliver or edge-on view at the board edge where the aluminium core is
visible below the copper. A faint cool-blue gradient spreads across the copper plane away from
the MOSFETs (heat being pulled flat through the core). Muted, scientific — NOT a rainbow FLIR
overlay. Pulse near x 58%, y 55%.

### `scene-06-isolation.webp` — The isolation boundary
A visually distinct moment: the board's isolation gap — a clean routed slot / creepage boundary
splitting the frame roughly vertically at x 55%, with the isolated CAN transceiver and digital
isolator ICs bridging it. The white of the slot reads as "the gap". One blue trace crosses via
the isolator. Pulse mid-crossing at x 62%, y 45%. Slightly wider than 03–05 (camera starting to
lift).

### `scene-07-protection.webp` — Protection closes the path
The output stage: MOSFET bank / shunt / fuse region. A faint pale-grey "wrong path" trace is
visibly interrupted (open pad gap), while the main output bus trace is continuous and lit blue.
Reads as: fault path blocked, controlled path flows. Pulse at x 45%, y 48%. Camera continues to
lift — board occupies ~70% of frame.

### `scene-08-pack-assembly.webp` — Into the pack
Pull-out wide: the same board now seen seated inside an OPEN battery pack enclosure — prismatic
cell modules (grey-white, fine edges) arranged in two rows around/below it, busbars connecting.
Pack occupies centre 60% of frame on the white field. The board's blue output trace continues
into the pack busbar. Pulse fading, near x 70%, y 40%. Faint grid returns in background.

### `scene-09-pack-charged.webp` — Charged
Same pack, now closed: clean grey housing with a subtle glowing blue charge seam / cell windows
showing cells filled with a calm blue level (visually ~86%, NOT full). Identical camera position
as scene 08 (only the pack changed) so the crossfade reads as the lid closing. No pulse.

### `scene-10-vehicle-2w.webp` — Two-wheeler
The pack STAYS in exactly the same screen position and scale. Around it, a fine-line technical
silhouette of an electric scooter (single-weight 1.5px grey `#94A0B2` linework, like a CAD
outline) assembles so the pack sits where its battery bay is (under the deck). A thin blue route
runs from the pack to the hub motor. White field, faint grid.

### `scene-11-vehicle-3w.webp` — Three-wheeler
Same rule: pack fixed, the surrounding linework is now an electric three-wheeler (e-rickshaw)
outline, pack in its under-floor bay, blue route to the axle. The scooter's line language and
stroke weight carry over exactly. Slightly wider camera than scene 10.

### `scene-12-bess.webp` — Grid-scale storage
Wider again: the same pack module is now one of MANY — a BESS rack/cabinet drawn in the same
fine grey linework, with our pack highlighted (slightly stronger stroke) among rows of identical
modules. One blue route leaves the cabinet toward frame right. No world map, no city skyline.

### `scene-13-network.webp` — One confident route
Almost back to white. All linework simplified away except: a single confident blue route
travelling left-to-right across the lower third, with 3 small node points (pack, cabinet,
substation — as minimal geometric marks, not icons). Soft bloom at right where the route exits.
Grid nearly gone. This frame must sit comfortably behind the returning headline (centre-left
must be clean).

---

## Continuity checklist (verify before delivery)

- [ ] Play frames 01→13 as a flipbook: reads as ONE camera move, no jumps in board design,
      light direction, or line weight.
- [ ] All frames: pure white outer border, 2560×1440, ≤250 KB, no text, sRGB.
- [ ] Frames 01–02: left 45% clean. Frame 13: centre-left clean.
- [ ] Pack position identical across frames 09→12.
- [ ] Blue only on pulse/traces/charge/routes.
- [ ] The board matches `public/images/products/wbms-sw-16s/front.webp`.

## Delivery

```text
public/images/hero/seq/scene-01-white-field.webp
public/images/hero/seq/scene-02-board-approach.webp
public/images/hero/seq/scene-03-sensing-macro.webp
public/images/hero/seq/scene-04-balancing.webp
public/images/hero/seq/scene-05-thermal.webp
public/images/hero/seq/scene-06-isolation.webp
public/images/hero/seq/scene-07-protection.webp
public/images/hero/seq/scene-08-pack-assembly.webp
public/images/hero/seq/scene-09-pack-charged.webp
public/images/hero/seq/scene-10-vehicle-2w.webp
public/images/hero/seq/scene-11-vehicle-3w.webp
public/images/hero/seq/scene-12-bess.webp
public/images/hero/seq/scene-13-network.webp
```

No code changes needed — the hero probes for `scene-01-white-field.webp` and switches from the
static poster to the full sequence automatically once the files exist.
