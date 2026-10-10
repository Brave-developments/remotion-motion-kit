# Non-breaking FlashCut integration plan

1. Inspect actual current src/remotion/Root.tsx, Reel.tsx, Scene.tsx, Overlays.tsx, src/types.ts and src/presets.ts before changes.
2. Register the optional preview/MotionKitDemo.tsx with a 1080x1920, fps 30, durationInFrames 240 Composition; leave all existing registrations intact.
3. Run typecheck, unit tests and real Remotion render. These starter assets have not yet been validated in the user's environment.
4. Build MotionAssetRegistry with string ids and validated props, previews, licence/source/upstream commit. Do not evaluate AI-generated arbitrary JSX.
5. Add gallery browser and editor inspector. Add a distinct versioned overlay type instead of changing existing media/text semantics.
6. Port vetted assets gradually; RemotionUI init/add and Onda commands should first run in a separate scratch project/branch, not automatically in production.
7. Expand the existing director to choose template id, source-backed media, crop, text, animation and duration. Preserve user approval/override.
8. Test avatar timing, narration, captions, footage crop and source links, export and performance.

## Ready-to-use Codex prompt

~~~text
Inspect the current repo and read motion-kit/README.md, motion-kit/REPORT.md
and motion-kit/docs/INTEGRATION.md. Add preview-only compositions for the
original motion-kit components, without refactoring existing FlashCut AI
scenes, overlays, captions, avatar or export code. Typecheck, test, and render
a vertical sample. For subsequent work, plan a versioned motion component
registry and Animations tab. Integrate upstream assets only after source,
licence and React/Remotion compatibility review. Never fabricate sources.
~~~
