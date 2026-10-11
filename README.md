# Remotion Motion Kit

**Reusable Remotion animation assets, scene templates, tech-news graphics, AI-agent resources and source-code library.**

Built for [Brave Developments](https://github.com/Brave-developments) as a **standalone** collection. It is independent of FlashCut AI and is not itself the FlashCut video editor.


## AI logos and transparent motion artwork

The asset library now contains **950 AI/LLM SVG logos**, **950 light + 950 dark PNG variants**, **76 additional developer/social icon pairs**, and **9 original transparent SVG/PNG backgrounds/overlays**. Exact files and available brand names are recorded in the manifests.

- [Browse AI SVG logos](assets/brands/lobe/svg)
- [Browse light PNG logos](assets/brands/lobe/png/light)
- [Browse dark PNG logos](assets/brands/lobe/png/dark)
- [Browse developer/social SVG + PNG](assets/brands/simple-icons)
- [Browse original motion artwork](assets/artwork)
- [Machine-readable brand catalogue](assets/brands/index.json)
- [Asset pack usage instructions](assets/ASSET_PACK.md)

The source library is Lobe Icons plus a curated set of Simple Icons. Logos belong to their respective brands and do not imply sponsorship or official partnership. For updates, run the GitHub Actions workflow titled **Import AI brand logos and artwork**.

## Explore

| Section | What's there |
| --- | --- |
| [REPORT.md](REPORT.md) | Consolidated research, selection criteria, architecture, production storyboard, roadmap |
| [catalog/sources.json](catalog/sources.json) | Seven researched libraries/skill sources with provenance and usage notes |
| [components](components) | Four original reusable frame-based motion graphics |
| [preview/MotionKitDemo.tsx](preview/MotionKitDemo.tsx) | 8-second vertical starter video demo |
| [assets/graphics](assets/graphics) | Original SVG motion graphic |
| [vendor](vendor) | Source checkouts of six upstream animation collections, imported by GitHub Actions |
| [docs/INTEGRATION.md](docs/INTEGRATION.md) | Integration into the FlashCut AI editor without breaking existing functionality |
| [docs/LICENSES.md](docs/LICENSES.md) | Licence and attribution policy |
| [THIRD_PARTY.md](THIRD_PARTY.md) | Upstream collection links, obligations and licensing caveats |
| [AGENTS.md](AGENTS.md) | Guidance for Codex/Cursor or other coding agents |

## Optional editorial motion template

[Editorial Motion](templates/editorial-motion/README.md) is **one opt-in design template** inspired by the user's editorial reference videos. It includes illustrated-explainer, SaaS-UI, and three-card product comparison scene modes, with an ivory/black/yellow/mint/peach palette and deterministic frame-based animation. It **does not** replace other styles or become the automatic default.

- [Colour palette and animation direction](templates/editorial-motion/README.md)
- [AI-readable manifest](templates/editorial-motion/manifest.json)
- [Live component](templates/editorial-motion/EditorialMotion.tsx)
- [12-second three-mode preview](preview/EditorialMotionDemo.tsx)
- Preview: `npm run studio` and select `EditorialMotionDemo`; render: `npm run render:editorial`
- Use `layout="upper"` to keep a top graphics region above a separate HeyGen presenter in Flashcut. No automatic Flashcut integration is implied.

## Original Remotion compositions — preview locally

Requires Node.js 22+ and npm. This project is only a showcase for starter components; upstream vendor projects may require their own dependencies and setup.

~~~bash
npm install
npm run studio
# select the MotionKitDemo composition
npm run typecheck
npm run render:demo
~~~

The sample is 1080x1920, 30fps, 8 seconds. It uses only original placeholders, not fake news presented as real evidence.

## Upstream source collections — copied into this repository

The automated import workflow pulls actual source files from the following six repositories into versioned directories under vendor/:

- [RemotionUI](https://github.com/riaz37/remotion-ui)
- [Remotion Scenes](https://github.com/lifeprompt-team/remotion-scenes)
- [Onda](https://github.com/degueba/onda)
- [Remotion Bits](https://github.com/av/remotion-bits)
- [RVE Remotion Templates](https://github.com/reactvideoeditor/remotion-templates)
- [RenderComp Free Templates](https://github.com/RenderComp/free-remotion-templates)

The imported assets are source collections, **not** automatically installed into this project's live Remotion demo. Individual upstream components may need extra dependencies or code adaptation. Preserve their own licenses and copyright when distributing.

[Official Remotion AI Skills](https://github.com/remotion-dev/skills) are installation instructions rather than renderable video assets; install from the official source:

~~~bash
npx skills add remotion-dev/skills
~~~

Each imported source's exact commit revision is in vendor/SOURCE_REVISIONS.tsv. To update the vendored libraries, manually run the GitHub Actions **Import Remotion asset libraries** workflow.

## Scope

The collection is for technology news shorts, animated article evidence, browser/product demonstrations, verified statistics, subtle backgrounds, video transitions, and FiveM tutorial layouts. All real screenshots, clips, audio and article quotations still need content provenance and permission review.

## Repository rights

The third-party folders retain the licensing of their respective creators; this repository does **not** relicense them as a single collection. The base Remotion renderer has a separate licence: https://www.remotion.dev/license.

The source vendor is intentionally retained independently of FlashCut AI so editors, agents and other projects can reference it without copying everything into a running application.
