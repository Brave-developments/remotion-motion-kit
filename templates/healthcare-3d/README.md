# Healthcare 3D Extras — optional 2.5D medical visual pack

**ID:** `healthcare-3d` · **v1.0.0** · **Explicit opt-in only**

This folder extends the existing `templates/healthcare/` with original, high-depth vector illustrations. Technically they are **2.5D / faux-3D SVG** scenes, not physically reconstructed 3D models or photoreal anatomy. No Three.js or model downloads are needed. This choice keeps rendering and licensing lightweight while delivering visually dimensional anatomy.

## Available scenes

| Mode | Component | Educational use |
| --- | --- | --- |
| `heart-hero` | `HeartHero3D` | Heart overview, conduction, cardiac output |
| `lungs-gas-exchange` | `LungGasExchange3D` | Lung movement, alveoli, V/Q mismatch |
| `kidney-perfusion` | `KidneyPerfusion3D` | Renal blood flow, filtration, nephron |
| `circulation-flow` | `CirculationFlow3D` | Oxygen delivery, systemic circulation, perfusion |
| `micro-mechanism` | `MicroMechanism3D` | Insulin / sodium-potassium ions / osmosis / receptor binding |
| `comparison-3d` | `Comparison3D` | Same-camera comparison: normal vs reduced perfusion |
| `dashboard-hybrid` | `HoloMetricPanel` + heart | Combined dimensional anatomy and live-style clinical metrics |

Shared components: `DepthStage`, `Surface`, `OrbitingDots`, `SchematicNote`.

All modules are deterministic with `useCurrentFrame()`, `spring()`, or `interpolate()`. No CSS-time animations. Prefer stable camera movement and single-point highlighting; avoid random transitions and overloaded screens.

## Preview and render

```bash
npm install
npm run typecheck
npm run studio # choose Healthcare3DDemo
npm run render:healthcare3d
```

```tsx
import { Healthcare3D } from './templates/healthcare-3d/Healthcare3D';
<Healthcare3D
  mode="heart-hero"
  layout="full"
  title="What is an ECG actually measuring?"
  subtitle="Visualise electrical signals travelling through the heart."
  takeaway="An ECG records electrical activity, not blood flow."
  demoWatermark
/>
```

The `layout="upper"` option reserves the upper 1160px area for visuals and leaves the lower presenter section transparent. All existing Remotion and FlashCut templates remain unchanged. This repository does not automatically plug the module into another editor.

## Medical safety and rights

- SVG diagrams are **purposeful conceptual simplifications**, not anatomically validated, not to scale, and not substitutes for licensed clinical anatomical 3D meshes.
- The stylised ECG and monitor metrics do **not** represent authentic recordings or diagnoses.
- Any claim concerning haemoglobin, blood gases, ECG findings, kidneys or pharmacology requires expert clinical verification before publishing.
- In particular, sodium and potassium are shown schematically, not as exact transporter selectivity simulations. The medication mode is a generic binding analogy, not a specific drug mechanism.
- If later upgrading to real 3D, use licensed GLB/GLTF anatomical models and a separate optional rendering dependency, keeping these fast fallback visuals available.
- Do not show demonstration values as real patient observations.

## AI creative direction

Pick **one** visual system for each narration beat. Alternate a hero organ close-up with the plain healthcare dashboard only when the concept benefits. Hook with a single dynamic medical model; synchronize callouts to the narration, do not fill every scene with labels. Use 3D accents sparingly and reserve sufficient space for subtitles.

See `manifest.json` for machine-readable selectors and capabilities.
