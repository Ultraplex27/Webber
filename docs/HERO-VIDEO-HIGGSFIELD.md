# Webber Hero — Higgsfield AI Video Generation Spec

We are producing the scroll hero as **12 short image-to-video clips**, each anchored on the
existing keyframes in `public/images/hero/seq/`. The clips are never played as video on the
site — they are extracted to a scrubbed frame sequence (the site already has the scrubber and
an extraction script; see "Handoff" at the bottom). Your job is only to generate clean clips.

## Why anchored image-to-video (read before generating)

The single biggest failure mode is the model reinventing the hardware. Every clip therefore
uses **START FRAME and END FRAME conditioning from our existing renders** — the same real
Webber board everywhere. The model's only freedom is the camera move and subtle energy glow.
If a take warps the board, silkscreen text, or connectors — reject it and re-roll. Do not
deliver a take with melted hardware "because the motion is nice."

## Global settings (every clip)

| Setting | Value |
|---|---|
| Mode | Image-to-video with start + end frame (keyframe) conditioning |
| Start / end frames | The two `scene-XX` files named per clip below |
| Resolution | Highest available, minimum 1920×1080 landscape |
| Duration | 4–6 s |
| Motion strength | LOW (≈0.3) — this is a precision camera move, not action footage |
| Camera preset | Per clip below (Higgsfield camera controls) |
| Takes | Generate 3, deliver the cleanest 1 per clip |

**Universal prompt suffix (append to every clip prompt):**

> clean white studio background, engineering product render, matte navy-blue PCB with white
> silkscreen, precise mechanical camera move, constant soft studio lighting, no flicker,
> minimal motion, photorealistic hardware stays perfectly rigid and unchanged

**Universal negative prompt (every clip):**

> text morphing, warping components, melting, extra connectors appearing, color shift,
> background darkening, lens flare, lightning, sparks, people, hands, camera shake, motion
> blur, fast motion, cuts, fades, logo distortion

**Acceptance checklist per take (reject if any fail):**
- [ ] Board/pack geometry identical at first and last frame vs the anchor images
- [ ] All silkscreen text (Webber logo, `J1`, `C16`…) stays crisp and unwarped throughout
- [ ] Background stays pure white edge-to-edge, no vignette or grey drift
- [ ] One smooth continuous camera move, no speed pumping, no hidden cut
- [ ] Blue appears only as trace glow / pulse / charge, and only subtly

---

## The 12 clips

Anchors refer to files in `public/images/hero/seq/`.

### clip-01 — Drift to the board
- **Start:** `scene-01-white-field.webp` → **End:** `scene-02-board-approach.webp`
- **Camera:** slow dolly right + descend (crane down)
- **Prompt:** A faint blue energy pulse drifts along a thin conductor line across a white
  engineering grid; the camera drifts right and descends as a navy-blue electronics board
  gradually resolves from the white haze in the lower right.

### clip-02 — Dive to macro
- **Start:** `scene-02-board-approach.webp` → **End:** `scene-03-sensing-macro.webp`
- **Camera:** dolly in / controlled crash zoom
- **Prompt:** The camera dives smoothly toward the navy BMS circuit board until fine copper
  traces and white connectors fill the frame; a soft blue signal glow travels into the
  board's edge connector.

### clip-03 — Across the sensing traces
- **Start:** `scene-03-sensing-macro.webp` → **End:** `scene-04-balancing.webp`
- **Camera:** lateral tracking shot (truck right), constant height
- **Prompt:** Low macro glide across the circuit board surface, passing rows of cell-tap
  connector pins; faint blue light runs along a few copper traces beneath the camera.

### clip-04 — The balancing network
- **Start:** `scene-04-balancing.webp` → **End:** `scene-05-thermal.webp`
- **Camera:** continue lateral track right, very slight rise
- **Prompt:** Continuing macro glide over the board's balancing resistor network toward the
  power stage; a few components carry a subtle warm-to-blue glow shift as balancing settles.

### clip-05 — Metal-core thermal plane
- **Start:** `scene-05-thermal.webp` → **End:** `scene-06-isolation.webp`
- **Camera:** lateral track + slow lift (crane up slightly)
- **Prompt:** Gliding past the MOSFET power bank, a faint cool blue gradient spreads flat
  across the copper plane as heat draws down into the metal core; camera begins lifting
  toward a routed isolation slot ahead.

### clip-06 — Crossing the isolation gap
- **Start:** `scene-06-isolation.webp` → **End:** `scene-07-protection.webp`
- **Camera:** lateral track across the gap
- **Prompt:** The camera crosses a clean white routed isolation slot in the board; a single
  blue trace bridges the gap through an isolator chip, the pulse crossing with the camera.

### clip-07 — Protection closes the path
- **Start:** `scene-07-protection.webp` → **End:** `scene-08-pack-assembly.webp`
- **Camera:** pull back / dolly out + crane up
- **Prompt:** The camera pulls up and back from the board's output stage; the lit blue output
  trace stays continuous while a faint grey side-path remains visibly interrupted; the full
  board and its surroundings come into view.

### clip-08 — Seated in the pack
- **Start:** `scene-08-pack-assembly.webp` → **End:** `scene-09-pack-charged.webp`
- **Camera:** slow dolly out, minimal
- **Prompt:** The open battery pack around the board closes: grey prismatic cell modules and
  housing panels settle into place with precise mechanical motion; a calm blue charge level
  becomes visible, filling most but not all of the cells.

### clip-09 — The two-wheeler (optional if budget is tight — site can crossfade)
- **Start:** `scene-09-pack-charged.webp` → **End:** `scene-10-vehicle-2w.webp`
- **Camera:** dolly out
- **Prompt:** Fine grey technical linework draws itself around the fixed battery pack,
  assembling the outline of an electric scooter with the pack seated in its battery bay; a
  thin blue route runs from pack to wheel hub. The pack itself does not move or change.

### clip-10 — The three-wheeler (optional)
- **Start:** `scene-10-vehicle-2w.webp` → **End:** `scene-11-vehicle-3w.webp`
- **Camera:** static camera, slight dolly out at end
- **Prompt:** The scooter linework smoothly re-draws into an electric three-wheeler outline
  around the same fixed battery pack — lines retract and re-extend mechanically, like a CAD
  drawing rebuilding. No liquid morphing; strokes move like drafted lines.

### clip-11 — Grid-scale storage (optional)
- **Start:** `scene-11-vehicle-3w.webp` → **End:** `scene-12-bess.webp`
- **Camera:** dolly out + crane up
- **Prompt:** The vehicle linework dissolves into a grid as the camera pulls back; identical
  pack modules multiply into rows inside a drawn battery-storage cabinet outline, our pack
  highlighted among them; one blue route exits the cabinet.

### clip-12 — One confident route
- **Start:** `scene-12-bess.webp` → **End:** `scene-13-network.webp`
- **Camera:** slow dolly out to near-white
- **Prompt:** All linework simplifies and fades toward white, leaving one confident blue route
  travelling across the lower third between three small node marks; a soft blue bloom where
  the route exits frame right.

---

## Handoff

1. Name files exactly `clip-01.mp4` … `clip-12.mp4` (H.264 MP4, highest quality export).
2. Drop them in **`Assets/hero-video/`** (create the folder).
3. That's it — do not touch `public/`. Frame extraction into the site
   (`scripts/extract-hero-frames.mjs`) and integration are handled on the code side; the site
   scrubs the extracted frames by scroll and falls back to the current 13-keyframe crossfade
   until extraction runs.
4. If a clip can't pass the acceptance checklist after several re-rolls, deliver the clips
   that do pass — the site can mix scrubbed video segments with crossfaded stills per chapter.
