# Brand pack

All assets are actual committed SVG and PNG files, not remote image links.

- Complete available Lobe Icons static SVG + light/dark PNG distributions: lobe/
- Extra creator/developer/social logos in SVG and PNG: simple-icons/
- Machine-readable catalogue: index.json
- Source package version numbers and omissions: source-versions.json
- Third-party package licence documents: licenses/

For tools and AI coding agents, search index.json for a slug. Use the matching path relative to assets/. If a specific file is unavailable, never invent it.

Brand logos remain trademarks of their owners. Editorial identification does not imply sponsorship.

To search by brand or product name from a checkout:

~~~bash
node scripts/find-brand-asset.mjs "ChatGPT"
node scripts/find-brand-asset.mjs "Claude Code"
node scripts/find-brand-asset.mjs "Cursor"
~~~

See aliases.json for documented alternative spellings and product-name fallbacks.
