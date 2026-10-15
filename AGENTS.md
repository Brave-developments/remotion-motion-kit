# Agent instructions — Remotion Motion Kit

## Logo and motion artwork asset policy

- The AI brand pack is at assets/brands/lobe; developer icon pack is at assets/brands/simple-icons.
- Use assets/brands/index.json to discover exact slugs and which SVG/light PNG/dark PNG files exist.
- Motion backdrops and transparent overlays are in assets/artwork with its own manifest.
- Before using images from this repo in another Remotion project, copy or import chosen assets into that project's public media path.
- Do not fabricate an official brand logo or recolor marks contrary to brand rules. Do not imply endorsements.
- Third-party logos must follow their publishers' guidelines even if the icon package's source licence is permissive.



Read README.md, REPORT.md, THIRD_PARTY.md and docs/INTEGRATION.md first.

- This is a **standalone Remotion library**. Do not treat it as FlashCut AI's app repository.
- Keep starter demo compositions working and deterministic with useCurrentFrame() / interpolate() / spring().
- Do not import large upstream dependencies into the root package unless the selected component actually needs them.
- The vendored upstream source is reference material: preserve licenses/attribution when adapting components.
- Do not pretend a clone or asset exists until validated.
- All real article screenshots, news/social posts, music and stock media require provenance and rights review.
- For additional components, register their editable props and demo view and test an MP4 render.
- In the target FlashCut editor, preserve the existing avatar narration and captions and use versioned motion clip types rather than breaking old projects.

## Optional editorial motion template (explicit opt-in only)

- Read `templates/editorial-motion/README.md`, `palette.ts` and `manifest.json` before using it.
- Template ID is `editorial-motion`; **do not** make it the default for all videos. Activate it only when the creator/script specifically requests editorial motion.
- One template contains three `mode` values: `illustrated-explainer`, `saas-ui`, `product-comparison`. Choose the mode that explains the current sentence, then supply editable copy and source-backed imagery.
- Respect the 1080x1920, 30fps editorial style; only five swatches: ivory `#F2EFE7`, paper `#FFFEFA`, mint `#DEF4EA`, peach `#FAE7D7`, lilac `#EDE6FE`; serif titles and restrained progressive `spring()` / `interpolate()` animations.
- No black or yellow backgrounds, highlights or product cards in this template. Functional legibility greys are permitted for text, outlines and subtle shadows only.
- With a HeyGen presenter below, pass `layout="upper"`; preserve audio timing and editor-owned captions. Full-screen takeovers need explicit timeline intent.
- Use licensed, verified product logos. Demo numbers, interfaces and letter-logo placeholders are **illustrations**, not documentary evidence.
- Preview via `npm run studio` or `npm run render:editorial`; verify `npm run typecheck` and a real MP4 before approving output.

## Optional healthcare nursing explainer system

- Read `templates/healthcare/README.md`, `tokens.ts` and `manifest.json` before selecting `mode`.
- Use only on medical/nursing explainer beats deliberately selecting `templateId: "healthcare"`. Never replace `editorial-motion` or the user's other styles.
- Six modes: `clinical-dashboard`, `anatomy-overlay`, `cellular-mechanism`, `comparison`, `logic-flow`, `data-morph`. Pick the most educational visual for the current narration, not all six.
- Values, ranges, ECG traces and clinical guidance require verified sources and human medical review; demo values/diagrams are illustrative and not patient advice.
- Keep bottom area transparent with `layout="upper"` for lower presenters. Narration/HeyGen and editor captions remain external. Preview with `HealthcareDemo`, typecheck and render before publishing.

## Premium healthcare and optional dimensional medical visuals

- For richer clinical UIs, choose `templates/healthcare/premium/` and consult its README + manifest. Never invent patient data or imply live-device connectivity.
- The `healthcare-3d` template is an independent **2.5D depth-style** opt-in; see `templates/healthcare-3d/README.md`, `manifest.json`. It is not photoreal 3D, nor a validated anatomical model.
- Default medical education work to clean readable visuals; use 3D extras sparingly where depth enhances understanding.
- Always check the narration, labels, biological claims and reference ranges with qualified review. Use caption-safe placement and synchronize with supplied speech/audio.
- Preview `Healthcare3DDemo` / `HealthcarePremiumDemo`; require passing TypeScript check + rendered MP4 before merging.
