# AI logo + motion artwork pack

## Actual downloaded assets

**AI logos:** all available SVG icons in the Lobe Icons static SVG package, and all native PNG files (light/dark variants) from the companion package. Folders:
- assets/brands/lobe/svg
- assets/brands/lobe/png/light
- assets/brands/lobe/png/dark

**Additional platforms:** curated developer, social, programming and creator logos from Simple Icons, in SVG plus 512-pixel PNG format:
- assets/brands/simple-icons/svg
- assets/brands/simple-icons/png

**Original graphics:** 9 1080x1920 SVG and transparent PNG illustrations/overlays:
- assets/artwork/svg
- assets/artwork/png

Includes an aurora, orbit rings, particle field, circuit traces, focus target, neural network, waveform, glass panel and kinetic burst.

## Find the right brand

Read assets/brands/index.json. Each entry contains a slug, provider, svg path, pngLight path, pngDark path and optional guidelines, all relative to assets/. Featured entries contain commonly used AI tools including OpenAI, Claude, Cursor, Gemini, Codex, DeepSeek, Perplexity and others if upstream provides them.

The Simple Icons curated shortlist is deliberately not the entire 3400+ Simple Icons collection. The Lobe Icons pack is the entire published Lobe static SVG/PNG distribution, which may have variant count mismatches between its independently versioned SVG and PNG packages. Every available file is committed and paths are checked in the manifest.

For exact upstream package versions and missing Simple Icons entries, see assets/brands/source-versions.json.

## Using files in Remotion

Copy the desired asset into the target project's public folder, e.g., public/media/brands/claude.png, or import into the existing media library.

~~~tsx
import { Img, staticFile } from 'remotion';

export const ClaudeBadge = () => (
  <Img
    src={staticFile('media/brands/claude.png')}
    style={{ width: 200, height: 200, objectFit: 'contain' }}
  />
);
~~~

Or use a static SVG for sharp scaling.

For videos, keep logos at natural proportions and use motion on the containing card/background rather than distorting or modifying the logo itself.

## Updating all logos

GitHub -> Actions -> Import AI brand logos and artwork -> Run workflow. The workflow fetches current Lobe static SVG/PNG release packages, writes actual SVG and PNG bytes, and regenerates the manifest and 9 original graphics. Packages are independently versioned, with exact versions in source-versions.json.

## Trademark and copyright

Lobe Icons is a third-party icon collection licensed MIT; Simple Icons publishes icon graphics under CC0 1.0. Neither licence cancels a brand owner's trademark rights. OpenAI's brand guidance, for example, limits when and how its trademarks can be used and prohibits implying endorsement. Logos are included here for accurate identification, not for creating counterfeit official advertisements, merchandise or partnerships. Always check the current brand rules before publishing.

Sources:
- https://github.com/lobehub/lobe-icons
- https://github.com/simple-icons/simple-icons
- https://openai.com/brand/
- https://www.remotion.dev/docs/

Licences are preserved in assets/brands/licenses. No official promotional banners, press artwork or unrelated copyrighted photographs are redistributed by this pack.
