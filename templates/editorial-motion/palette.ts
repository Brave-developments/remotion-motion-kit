/**
 * Optional Editorial Motion template palette — user-selected pastels only.
 * Reference swatches sampled from supplied images, 2026-10-11.
 * Neutral text/edge tokens are functional accessibility colours, not accents.
 */
export const editorialPalette = {
  ivory: '#F2EFE7',
  paper: '#FFFEFA',
  mint: '#DEF4EA',
  peach: '#FAE7D7',
  lilac: '#EDE6FE',
} as const;

/** Functional legibility tokens: no solid black, no yellow and no dark cards. */
export const editorialNeutrals = {
  text: '#514D57',
  secondaryText: '#817D87',
  outline: '#CDC8D0',
  shadow: '#AEA4B4',
} as const;

export const editorialTypography = {
  editorial: "Georgia, 'Times New Roman', serif",
  interface: "Arial, Helvetica, sans-serif",
} as const;

export const editorialMotion = {
  fps: 30,
  enterFrames: 16,
  staggerFrames: 8,
  sceneHoldFrames: 12,
  spring: { damping: 20, stiffness: 145, mass: 1 },
  upperRegionHeight: 1160,
} as const;
