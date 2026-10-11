# Editorial Motion — optional Remotion scene template

**Template ID:** `editorial-motion` · **Version:** `1.0.0` · **Selection:** explicit opt-in only.

This is **one** flexible editorial template, with three scene modes derived from *general* visual qualities in the supplied reference videos. It is not the global Flashcut AI look. Keep other templates available. Do not claim the reference creators used Remotion or copy their proprietary project files.

## Design system and colour palette

| Token | Hex | Use |
|---|---|---|
| Ivory | `#F2EFE7` | Dominant warm off-white editorial background |
| Paper | `#FFFEFA` | Notification and SaaS card surfaces |
| Ink | `#171717` | Serif headlines, interface text, outlines |
| Muted | `#77766F` | Labels, subtitles and secondary data |
| Highlight yellow | `#F9D746` | One important word or visual emphasis |
| Mint | `#DDF4EA` | Subtle lower gradient and success accents |
| Peach | `#FBE7D6` | Soft upper gradient |
| Lilac | `#EDE6FF` | Neutral pastel supporting highlight |
| Editorial red | `#C8453C` | Contrast, comparison focus, warnings |
| Green | `#178363` | Verified success status only |
| Dark card | `#1A1721` | Dark comparison cards |
| Outline | `#202020` | Illustrated notification borders |

**Typography:** Georgia / Times New Roman serif for editorial headlines; Arial / Helvetica for the readable dashboard UI and kinetic caption overlays. These are system-safe placeholders. An editor may provide licensed local fonts (do not download fonts from an unverified source).

**Visual language:** generous negative space, clear headline hierarchy, purposeful warm/pastel backgrounds, high-contrast black type, soft SaaS card shadows, hard offset shadow only for illustrated notifications. Avoid generic neon cyberpunk effects and randomly changing palettes.

## The three scene modes (one template)

1. `illustrated-explainer`: editorial serif headline with selective yellow highlight; 1–3 floating, verified product icons (or obvious generic placeholders); bold outlined notification; an **original illustrative** pixel mascot. Useful for concepts, developer risks, privacy or educational stories. No claims about real lawsuits without evidence.
2. `saas-ui`: pastel gradient and card-based simulated product UI; line-by-line status, number counter, inactive approval toggle, plus bold concluding typography. Useful for explaining *how* a software workflow behaves. If the scene imitates a real product, label it a simulation unless directly grounded in actual captures.
3. `product-comparison`: prominent serif question followed by staggered tall logo/name cards, restrained emphasis and conclusion. Useful for source-backed comparisons. Never invent performance figures, winners, partnerships or endorsements.

## Animation method / direction for AI agents

- Use frame-based Remotion animation, **not CSS transitions that depend on wall clock time**: `useCurrentFrame()`, `spring()`, `interpolate()` and `Sequence`.
- Base output **1080 × 1920, 30 fps**. Scene entrances roughly **16–25 frames**, product-card staggers **8–13 frames**, no constant camera shakes or uncontrolled bounces.
- Build visuals progressively: (1) headline/scene premise, (2) related icons/cards, (3) main UI or concept event, (4) clear conclusion. Delay secondary objects until the narrator reaches their idea.
- Use high-information moments for UI micro-animations: number count-up, state badge, cursor/zoom on *actual* screenshots, card expansion, highlight sweep, and connecting workflow nodes.
- Keep transitions understated: slide/fade, simple card re-layout, or a deliberate hard cut when context changes. No unrelated B-roll fill.
- Timing is determined by approved voice/audio timestamps, not predetermined segment lengths. The demo uses fixed 4-second segments **only for showcasing**.
- Only use a yellow highlight on one selected key phrase at a time. Avoid captions obscuring UI. Respect editor-owned caption and avatar layers.
- Assets must be cited/permission-checked. `logoSrc` points to a legitimate imported image; without it the template renders generic letter-mark placeholders. The sample mascot is original, not a pixel-art extraction from the references.
- Keep copy readable on mobile: allow adequate time to read, never shrink the whole 1080px composition into a tiny unreadable box.
- If a scene requires screenshots, use real recorded/sourced images; never label AI-invented UI, news or metrics as genuine.

## Usage

Register `EditorialMotionDemo` in Remotion Studio and try the sample. It is independent of the existing `MotionKitDemo`.

```bash
npm install
npm run typecheck
npm run studio
npm run render:editorial
```

```tsx
import { EditorialMotion } from './templates/editorial-motion/EditorialMotion';

<EditorialMotion
  mode="product-comparison"
  layout="upper"
  headline="Which agent should you use?"
  products={[
    { name: 'Agent A', logoSrc: '/legit-assets/a.png', label: 'SOURCE VERIFIED' },
    { name: 'Agent B', logoSrc: '/legit-assets/b.png', label: 'SOURCE VERIFIED' },
  ]}
/>
```

For GitHub-logo product scenes, resolve the requested brand against `assets/brands/index.json` and import appropriately. The above asset paths are only examples, **not** files that are bundled here. Use Remotion `staticFile()` or project-appropriate verified local imports when wiring assets.

## HeyGen / Flashcut AI combination

- `layout="upper"` reserves only the **top 1160 pixels** for motion content and leaves the rest transparent, so a downstream editor can render/place the HeyGen presenter in the lower part.
- `layout="full"` uses all 1920 pixels, useful for visual takeovers. The consuming editor is responsible for temporarily hiding/cropping the presenter if approved.
- Keep the presenter’s audio as the canonical timing track; use word/phrase alignment to drive start frames and holds. Preserve existing caption layers and their timings.
- This repository is an **asset library**, not Flashcut AI. Nothing here automatically imports itself into Flashcut's current UI or selects the style. Integrate explicitly via a registry entry `templateId: "editorial-motion"` and editable props. Do **not** modify every video preset to use this design.

## Verification and rights

The reference material contains third-party brand imagery and creators' creative direction. This implementation uses generic placeholders and original vector shapes. Validate legitimate logo sources, factual product content, asset licenses and rendering before publication. Running `npm run render:editorial` is the final integration check.

**Key files:** `EditorialMotion.tsx` (live scene template), `palette.ts` (tokens), `manifest.json` (machine-readable method), `preview/EditorialMotionDemo.tsx` (3-mode preview).
