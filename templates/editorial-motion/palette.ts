/**
 * Optional Editorial Motion template palette.
 * Inspired by broad editorial / product-explainer design conventions, not an
 * extraction of proprietary source from reference videos.
 */
export const editorialPalette = {
  ivory: '#F2EFE7',
  paper: '#FFFEFA',
  ink: '#171717',
  muted: '#77766F',
  yellow: '#F9D746',
  mint: '#DDF4EA',
  peach: '#FBE7D6',
  lilac: '#EDE6FF',
  red: '#C8453C',
  green: '#178363',
  darkCard: '#1A1721',
  outline: '#202020',
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
