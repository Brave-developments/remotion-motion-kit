# Single consolidated report — Remotion asset upgrades for FlashCut AI

**10 October 2026.** Goal: modern, evidence-driven animated AI-news Reels and FiveM tutorial Shorts using existing FlashCut AI + Remotion.

## Actual code findings
- package.json — React 19.2.0; Remotion 4.0.534.
- src/remotion/Scene.tsx — scene layouts full, split, picture-in-picture, card. Entrance effects generally fade and slide.
- src/remotion/Overlays.tsx — text, highlight, underline, arrow, media, reveal/zoom.
- src/remotion/Reel.tsx — timed Sequences, overlays, subtitles, narration track, branding and progress.
- README.md — local editor, screenshot/media discovery, HeyGen, AI director, FFmpeg/MP4. These are documented capabilities, not freshly runtime-tested here.

## Main deficiency
A limited grammar for animation, camera movement, evidence framing and source-backed graphics. Installable component libraries and a visual asset catalogue will improve output much more than merely adding extra screenshots.

## Resource acquisition strategy
All seven researched libraries/skills are indexed in catalog/sources.json. Download the five source collections with clear MIT statements into vendor/ via the provided scripts. The script **does not** install dependencies, copy source into the live editor, or automatically update existing clones. RVE is reference-only pending further licence notice checks; official Remotion skills are installed through the skills command. Every copied upstream component retains its notices and commit provenance.

## Target motion-graphics library
1. Article/evidence cards, social post capture framing and source chips.
2. Browser and product-demo windows with screenshot focus.
3. Kinetic headlines, lower thirds and elegant title cards.
4. Statistics, charts and diagram motion for *real, verified* values.
5. Cursor callouts, editable annotations and screenshot zooms.
6. Supporting backgrounds, particles and subtle glows used sparingly.
7. Readable landscape/FiveM gameplay presentation in vertical output.
8. User-licensed or original transition sound effects, synced to frames.

## System architecture
**MotionAssetRegistry:** id, label, category, source project, upstream revision, licence, dependencies, default props, editable schema, duration limits, aspect support, preview.

**MotionAssetGallery:** searchable tag filters, embedded Remotion previews, inspect props, click to add.

**Timeline support:** introduce a versioned motion-overlay clip, keep existing clip.kind values and old project JSON intact, give it independent Sequence timing and editable props.

**AI visual director:** map narration beats to real media + vetted component id + validated props. Offer three candidate visual treatments for key scenes; allow manual selection and locks. Never invent a real-looking article, tweet, source quote or statistic.

**Rights review:** preserve publisher/creator, source URL, capture date, usage rights and status for actual media. Public availability does not mean open distribution.

## Build order
- P0: baseline tests and non-breaking Remotion preview composition.
- P1: original graphics in this kit + searchable metadata registry and previews.
- P2: vet/port 8–12 upstream components from RemotionUI, Scenes, Onda, Bits and RenderComp; preserve notices.
- P3: editor inspector, versioned timeline integration, media focus/highlights.
- P4: AI selection and structured shot-plan generation with human approval.
- P5: audio cues, preflight rights checks, mobile readability and rendering benchmarks.

## Suggested 60-second news reel
| Time | Actual content | Visual treatment |
| --- | --- | --- |
| 0–4s | HeyGen speaker hook | Clear large animated headline |
| 4–12s | Genuine official announcement | Browser/article framing, highlight |
| 12–23s | Real product screen recording | Zoomed relevant UI |
| 23–33s | Verified number or comparison | Animated metric/chart with cited source |
| 33–43s | Official article quote | Motion evidence card and source label |
| 43–53s | Before/after feature demo | Clean split-screen |
| 53–60s | Summary/CTA | Avatar with minimal exit |

## QA and practical constraints
- 1080x1920 30fps; reserve safe areas for captions and Instagram overlays.
- Avoid CSS keyframes and CSS transitions for frame-critical motion; use Remotion frame interpolation/springs.
- Test React 19 compatibility: upstream projects sometimes assume React 18 or add three.js/3D.
- Render source screenshot from local files (URL capture alone is not evidence/licence clearance).
- Do not claim the whole library is integrated until every component typechecks/renders.
- Remotion itself has separate licensing: https://www.remotion.dev/license .
