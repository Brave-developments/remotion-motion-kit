# Healthcare — reusable nursing explainer motion library

**Template ID:** `healthcare` · **v1.0.0** · **optional; explicit selection only**

Six original, frame-driven Remotion scene modes for accessible nursing education. This lives in `templates/healthcare/` alongside `templates/editorial-motion/`; neither template replaces the other.

## Six scene modes

| Mode | Best for | Built-in illustrative example |
| --- | --- | --- |
| `clinical-dashboard` | SpO₂, vitals, blood pressure, shock and perfusion | SpO₂ vs oxygen delivery |
| `anatomy-overlay` | Conduction, blood flow, ventilation | Schematic heart + ECG, or alveolus |
| `cellular-mechanism` | Drug receptors, transport and ions | Insulin signalling + glucose uptake |
| `comparison` | Normal vs abnormal physiology | Normal vs reduced alveolar perfusion |
| `logic-flow` | ABGs and clinical reasoning frameworks | pH → PaCO₂ → HCO₃⁻ → compensation |
| `data-morph` | Change over time and physiologic cascades | Infection → systemic response → dysfunction |

All illustrations are original simplified SVGs (not to scale), no external assets or new dependencies. Frames are deterministic using Remotion's `useCurrentFrame`, `interpolate` and `spring`; no wall-clock CSS keyframes. Use the main component in full-screen 1080 × 1920 or top-region-only `layout="upper"` for a presenter below.

## Design tokens

- Base: canvas `#F5F3EC`, paper `#FFFDF8`, text `#172E37`
- Teal `#0C988D` and blue `#3279BE` for medical UI; cyan for oxygen schematic
- Functional status: green/normal `#238466`, amber/caution `#BB772B`, red/critical `#C94E54`
- Sans UI / monospaced values, clear contrast, rounded paper panels, restrained shadows
- Medical color coding is **illustrative**, not a universal clinical severity scale.
- One concept per beat; captions and presenter timing remain controlled by the consuming editor.

## Quick start

```bash
npm install
npm run typecheck
npm run studio
# select HealthcareDemo
npm run render:healthcare
```

```tsx
import { HealthcareMotion } from './templates/healthcare/HealthcareMotion';

<HealthcareMotion
  mode="clinical-dashboard"
  headline="Why SpO₂ doesn't tell the whole story"
  eyebrow="OXYGEN DELIVERY"
  focusLabel="SpO₂"
  focusValue="98%"
  metrics={[
    {label:'SpO₂',value:'98%',detail:'Example saturation',tone:'normal'},
    {label:'Haemoglobin',value:'Reduced',detail:'Illustrative',tone:'caution'},
    {label:'Cardiac output',value:'Reduced',detail:'Illustrative',tone:'caution'},
  ]}
  takeaway="Oxygen delivery is influenced by blood oxygen content and cardiac output."
  demoWatermark
/>
```

### Editable properties

- Common: `headline`, `eyebrow`, `subheadline`, `takeaway`, `sourceNote`, `layout`, `demoWatermark`
- Dashboard: `focusValue`, `focusLabel`, `focusTone`, `metrics[]` (`label`, `value`, `detail`, `tone`)
- Anatomy: `anatomy: 'heart'|'lungs'`
- Cellular: `mechanism: 'insulin-glucose'` (the first specialized diagram, not a generic molecular simulator)
- Comparison: `comparison: {left,right,leftDetail,rightDetail}`
- Logic flow: `steps: [{label,description}]`
- Data progression: `stages: string[]`

## Important medical + visual QA

- The default 98% is **illustrative**, not a real observed value or a clinical assessment.
- Example ECG is a stylised wave, **not a diagnostic trace**; the heart and conduction labels are simplified.
- The alveolus and cell-membrane drawings are conceptual; e.g. insulin-stimulated glucose transport is drawn for muscle tissue.
- Replace generic demonstration text with clinically checked copy and local guidelines for each Reel.
- Add authoritative sources to the script/production brief; `sourceNote` is contextual text, **not** proof by itself.
- Have qualified medical reviewers check factual claims, dose/range numbers, electrocardiography and sequence timing before publication.
- Use only licensed, provenance-checked external photographs/diagrams if added later.
- Preserve room for platform UI and captions, especially on narrow phone displays.

## Production direction for AI agents

1. Pick **one** mode per explanatory beat. Never insert all six in a single Reel merely to show them off.
2. Sync visual reveals to narration timestamps; the bundled 4-second mode demonstrations are design QA only.
3. Prefer diagrams and UI that explain the mechanism over generic hospital stock footage.
4. Keep clinically meaningful data grounded; set `demoWatermark` for sample scenarios.
5. For HeyGen or other presenter-underlay workflows choose `layout="upper"`, preserving transparent lower space. No integration with FlashCut or automatic style selection is implied.
6. Run `npm run typecheck` and render via `npm run render:healthcare` before reuse.

**Files:** `tokens.ts`, `MedicalComponents.tsx`, `HealthcareMotion.tsx`, `manifest.json`, `preview/HealthcareDemo.tsx`.
